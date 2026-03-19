namespace AIResumeAnalyser.Services
{
    public interface IAiSuggestionService
    {
        Task<List<string>> GetAiSuggestionsAsync(
            string resumeText,
            string role,
            List<string> missingSkills,
            int experienceYears,
            int requiredExperience);
    }
}