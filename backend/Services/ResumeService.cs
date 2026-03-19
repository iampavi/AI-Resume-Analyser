using AIResumeAnalyser.Data;
using AIResumeAnalyser.Models;
using AIResumeAnalyser.Repositories;
using Microsoft.Extensions.Options;
using System.Text.RegularExpressions;
using UglyToad.PdfPig;

namespace AIResumeAnalyser.Services
{
    public class ResumeService : IResumeService
    {
        private readonly IResumeRepository _repository;
        private readonly IAiSuggestionService _aiService;
        private readonly ScoringWeights _weights;

        public ResumeService(
            IResumeRepository repository,
            IAiSuggestionService aiService,
            IOptions<ScoringWeights> weights)
        {
            _repository = repository;
            _aiService = aiService;
            _weights = weights.Value;
        }

        public async Task<ResumeAnalysisResult> AnalyzeResumeAsync(IFormFile file, string role)
        {
            string resumeText = ExtractTextFromPdf(file);

            var roles = _repository.GetRoles();

            if (!roles.ContainsKey(role))
                throw new ArgumentException($"Invalid role: '{role}'. Valid roles: {string.Join(", ", roles.Keys)}");

            var roleRequirement = roles[role];

            int experience = ExtractExperience(resumeText);

            var detectedRequiredSkills = roleRequirement.RequiredSkills
                .Where(skill => SkillExists(resumeText, skill))
                .ToList();

            var detectedOptionalSkills = roleRequirement.OptionalSkills
                .Where(skill => SkillExists(resumeText, skill))
                .ToList();

            var missingSkills = roleRequirement.RequiredSkills
                .Except(detectedRequiredSkills)
                .ToList();

            var sectionResult = DetectResumeSections(resumeText);

            double skillsScore = CalculateSkillsScore(detectedRequiredSkills, detectedOptionalSkills, roleRequirement);
            double atsScore = CalculateAtsScore(sectionResult.FoundSections);
            double structureScore = CalculateStructureScore(resumeText);
            double keywordScore = CalculateKeywordScore(resumeText, roleRequirement);
            double impactScore = CalculateImpactScore(resumeText);

            double finalScore =
                skillsScore * _weights.Skills +
                atsScore * _weights.Ats +
                structureScore * _weights.Structure +
                keywordScore * _weights.Keyword +
                impactScore * _weights.Impact;

            var ruleSuggestions = GenerateRuleSuggestions(
                missingSkills,
                experience,
                roleRequirement.MinExperienceYears,
                roleRequirement.OptionalSkills,
                detectedOptionalSkills,
                resumeText,
                sectionResult.MissingSections);

            var aiSuggestions = await _aiService.GetAiSuggestionsAsync(
                resumeText,
                role,
                missingSkills,
                experience,
                roleRequirement.MinExperienceYears);

            var allSuggestions = ruleSuggestions.Concat(aiSuggestions).ToList();

            var issues = GenerateIssues(resumeText, sectionResult.MissingSections);

            return new ResumeAnalysisResult
            {
                Role = role,
                ExperienceYears = experience,
                Score = Math.Round(finalScore, 2),
                Grade = GetGrade(finalScore),
                Verdict = GetVerdict(finalScore),

                SkillsScore = Math.Round(skillsScore, 2),
                AtsScore = Math.Round(atsScore, 2),
                StructureScore = Math.Round(structureScore, 2),
                KeywordScore = Math.Round(keywordScore, 2),
                ImpactScore = Math.Round(impactScore, 2),

                DetectedRequiredSkills = detectedRequiredSkills,
                DetectedOptionalSkills = detectedOptionalSkills,
                MissingSkills = missingSkills,
                ResumeSections = sectionResult.FoundSections,
                MissingSections = sectionResult.MissingSections,
                Suggestions = allSuggestions,
                Issues = issues
            };
        }

        // ─── PDF ──────────────────────────────────────────────────────────────

        private string ExtractTextFromPdf(IFormFile file)
        {
            using var stream = file.OpenReadStream();
            using var document = PdfDocument.Open(stream);

            var sb = new System.Text.StringBuilder();
            foreach (var page in document.GetPages())
                sb.Append(page.Text);

            return sb.ToString();
        }

        // ─── Experience ───────────────────────────────────────────────────────

        private int ExtractExperience(string text)
        {
            // "5 years", "5+ years", "5 yrs"
            var directMatch = Regex.Match(text,
                @"(\d+)\s*\+?\s*(years?|yrs?)\s*(of\s+experience)?",
                RegexOptions.IgnoreCase);

            if (directMatch.Success)
                return int.Parse(directMatch.Groups[1].Value);

            // Date ranges: "2020 - 2024" or "2019 – Present"
            var dateRanges = Regex.Matches(text,
                @"\b(20\d{2}|19\d{2})\s*[-–]\s*(20\d{2}|Present|Current)",
                RegexOptions.IgnoreCase);

            if (dateRanges.Count > 0)
            {
                int totalMonths = 0;
                int currentYear = DateTime.Now.Year;

                foreach (Match m in dateRanges)
                {
                    int start = int.Parse(m.Groups[1].Value);
                    int end = m.Groups[2].Value.ToLower() is "present" or "current"
                        ? currentYear
                        : int.Parse(m.Groups[2].Value);

                    if (end > start)
                        totalMonths += (end - start) * 12;
                }

                return totalMonths / 12;
            }

            return 0;
        }

        // ─── Skills ───────────────────────────────────────────────────────────

        private bool SkillExists(string text, string skill)
        {
            if (text.Contains(skill, StringComparison.OrdinalIgnoreCase))
                return true;

            if (SkillSynonymStore.SkillSynonyms.TryGetValue(skill, out var synonyms))
                return synonyms.Any(s => text.Contains(s, StringComparison.OrdinalIgnoreCase));

            return false;
        }

        // ─── Scoring ──────────────────────────────────────────────────────────

        private double CalculateSkillsScore(
            List<string> detectedRequired,
            List<string> detectedOptional,
            RoleRequirement role)
        {
            double requiredScore = role.RequiredSkills.Count == 0 ? 0 :
                (double)detectedRequired.Count / role.RequiredSkills.Count * 70;

            double optionalScore = role.OptionalSkills.Count == 0 ? 0 :
                (double)detectedOptional.Count / role.OptionalSkills.Count * 30;

            return requiredScore + optionalScore;
        }

        private double CalculateAtsScore(List<string> foundSections)
        {
            const int importantSections = 4;
            return Math.Min((double)foundSections.Count / importantSections * 100, 100);
        }

        private double CalculateStructureScore(string text)
        {
            double score = 0;
            if (text.Contains("experience", StringComparison.OrdinalIgnoreCase)) score += 30;
            if (text.Contains("education", StringComparison.OrdinalIgnoreCase)) score += 25;
            if (text.Contains("skills", StringComparison.OrdinalIgnoreCase)) score += 25;
            if (text.Contains("project", StringComparison.OrdinalIgnoreCase)) score += 20;
            return score;
        }

        private double CalculateKeywordScore(string text, RoleRequirement role)
        {
            var keywords = role.RequiredSkills.Concat(role.OptionalSkills).ToList();
            if (keywords.Count == 0) return 0;

            int found = keywords.Count(skill => SkillExists(text, skill));
            return (double)found / keywords.Count * 100;
        }

        private double CalculateImpactScore(string text)
        {
            double score = 0;

            // Quantified metrics
            if (Regex.IsMatch(text, @"\d+%")) score += 25;
            if (Regex.IsMatch(text, @"\d+\+")) score += 15;
            if (Regex.IsMatch(text, @"\$\d+")) score += 20;
            if (Regex.IsMatch(text, @"\d+[xX]\s*(faster|better)")) score += 10;

            // Strong action verbs
            var actionVerbs = new[] {
                "developed", "implemented", "designed", "led", "built",
                "optimized", "reduced", "increased", "managed", "delivered",
                "architected", "launched", "automated", "improved", "scaled"
            };

            int verbCount = actionVerbs.Count(v =>
                text.Contains(v, StringComparison.OrdinalIgnoreCase));

            score += Math.Min(verbCount * 5, 30);

            return Math.Min(score, 100);
        }

        // ─── Sections ─────────────────────────────────────────────────────────

        private SectionDetectionResult DetectResumeSections(string text)
        {
            var sections = new List<string>
            {
                "Education", "Experience", "Projects", "Skills", "Certifications"
            };

            var found = sections.Where(s => text.Contains(s, StringComparison.OrdinalIgnoreCase)).ToList();
            var missing = sections.Except(found).ToList();

            return new SectionDetectionResult
            {
                FoundSections = found,
                MissingSections = missing
            };
        }

        // ─── Grade / Verdict ──────────────────────────────────────────────────

        private string GetGrade(double score) => score switch
        {
            >= 85 => "A",
            >= 70 => "B",
            >= 55 => "C",
            >= 40 => "D",
            _ => "F"
        };

        private string GetVerdict(double score) => score switch
        {
            >= 75 => "Strong Match",
            >= 55 => "Moderate Match",
            >= 40 => "Weak Match",
            _ => "Not Suitable"
        };

        // ─── Rule-based Suggestions ───────────────────────────────────────────

        private List<string> GenerateRuleSuggestions(
            List<string> missingSkills,
            int experience,
            int requiredExperience,
            List<string> optionalSkills,
            List<string> detectedOptionalSkills,
            string text,
            List<string> missingSections)
        {
            var suggestions = new List<string>();

            foreach (var skill in missingSkills)
                suggestions.Add($"Consider adding experience with {skill} to meet the role's requirements.");

            if (detectedOptionalSkills.Count < optionalSkills.Count / 2)
                suggestions.Add("Consider learning modern tools such as cloud platforms, containers, or CI/CD pipelines.");

            if (experience < requiredExperience)
                suggestions.Add("Gain more practical experience through internships, open-source contributions, or personal projects.");

            if (missingSections.Contains("Projects"))
                suggestions.Add("Add a Projects section to showcase real-world work and problem-solving ability.");

            if (missingSections.Contains("Certifications"))
                suggestions.Add("Including relevant certifications can strengthen your profile significantly.");

            if (text.Length < 1500)
                suggestions.Add("Your resume looks short. Add more detail about your achievements and technical contributions.");

            return suggestions;
        }

        // ─── Issues ───────────────────────────────────────────────────────────

        private List<Issue> GenerateIssues(string text, List<string> missingSections)
        {
            var issues = new List<Issue>();

            if (!Regex.IsMatch(text, @"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}"))
                issues.Add(new Issue
                {
                    Title = "Email Not Found",
                    IssueText = "Your resume does not contain an email address.",
                    Why = "Recruiters must be able to contact you via email.",
                    Fix = "Add your email address at the top of the resume.",
                    Severity = "Critical"
                });

            if (!Regex.IsMatch(text, @"\+?\d[\d\s\-]{8,}"))
                issues.Add(new Issue
                {
                    Title = "Contact Number Missing",
                    IssueText = "Phone number not detected.",
                    Why = "Recruiters often call candidates directly.",
                    Fix = "Add your phone number below your name.",
                    Severity = "Critical"
                });

            if (!text.Contains("linkedin", StringComparison.OrdinalIgnoreCase))
                issues.Add(new Issue
                {
                    Title = "LinkedIn Missing",
                    IssueText = "LinkedIn profile not detected.",
                    Why = "Recruiters verify professional profiles on LinkedIn.",
                    Fix = "Add your LinkedIn profile URL.",
                    Severity = "Warning"
                });

            if (!text.Contains("github", StringComparison.OrdinalIgnoreCase))
                issues.Add(new Issue
                {
                    Title = "GitHub Missing",
                    IssueText = "GitHub profile not detected.",
                    Why = "Developers should showcase their code publicly.",
                    Fix = "Add your GitHub profile URL.",
                    Severity = "Warning"
                });

            foreach (var section in missingSections)
                issues.Add(new Issue
                {
                    Title = $"{section} Section Missing",
                    IssueText = $"{section} section not detected in your resume.",
                    Why = $"ATS systems look for a {section} section.",
                    Fix = $"Add a clearly labelled {section} section.",
                    Severity = "Warning"
                });

            var hasActionVerbs = new[] { "developed", "implemented", "designed", "built", "led" }
                .Any(v => text.Contains(v, StringComparison.OrdinalIgnoreCase));

            if (!hasActionVerbs)
                issues.Add(new Issue
                {
                    Title = "Weak Action Verbs",
                    IssueText = "Strong action verbs not detected.",
                    Why = "Action verbs demonstrate impact and initiative.",
                    Fix = "Use verbs like Developed, Designed, Built, Led, Delivered.",
                    Severity = "Info"
                });

            return issues;
        }

        public ResumeContext BuildContext(ResumeAnalysisResult result)
        {
            return new ResumeContext
            {
                Skills = string.Join(", ", result.DetectedRequiredSkills.Concat(result.DetectedOptionalSkills)),
                MissingSkills = string.Join(", ", result.MissingSkills),
                Experience = $"{result.ExperienceYears} years",
                Summary = $"Score: {result.Score}, Grade: {result.Grade}, Verdict: {result.Verdict}"
            };
        }
    }
}