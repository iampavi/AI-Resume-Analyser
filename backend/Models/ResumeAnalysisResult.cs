namespace AIResumeAnalyser.Models
{
    public class ResumeAnalysisResult
    {
        public string Role { get; set; }
        public int ExperienceYears { get; set; }

        public double Score { get; set; }
        public string Grade { get; set; }
        public string Verdict { get; set; }

        public double SkillsScore { get; set; }
        public double AtsScore { get; set; }
        public double StructureScore { get; set; }
        public double KeywordScore { get; set; }
        public double ImpactScore { get; set; }

        public List<string> DetectedRequiredSkills { get; set; } = new();
        public List<string> DetectedOptionalSkills { get; set; } = new();
        public List<string> MissingSkills { get; set; } = new();

        public List<string> ResumeSections { get; set; } = new();
        public List<string> MissingSections { get; set; } = new();

        public List<string> Suggestions { get; set; } = new();
        public List<Issue> Issues { get; set; } = new();
    }
}