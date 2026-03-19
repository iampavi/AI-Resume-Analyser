using System.Text;
using System.Text.Json;

namespace AIResumeAnalyser.Services
{
    public class GroqAiSuggestionService : IAiSuggestionService
    {
        private readonly HttpClient _http;
        private readonly IConfiguration _config;

        public GroqAiSuggestionService(
            HttpClient http,
            IConfiguration config)
        {
            _http = http;
            _config = config;
        }

        public async Task<List<string>> GetAiSuggestionsAsync(
            string resumeText,
            string role,
            List<string> missingSkills,
            int experienceYears,
            int requiredExperience)
        {
            var apiKey = _config["Groq:ApiKey"]
          ?? _config["GROQ__APIKEY"];

            if (string.IsNullOrWhiteSpace(apiKey))
                return new List<string> { "AI suggestions unavailable." };

            var snippet = resumeText[..Math.Min(1500, resumeText.Length)];
            var missing = missingSkills.Count > 0
                ? string.Join(", ", missingSkills)
                : "none";

            var prompt = $"""
                You are an expert resume reviewer.
                Role applied for: {role}
                Candidate experience: {experienceYears} years (required: {requiredExperience})
                Missing required skills: {missing}

                Resume snippet:
                {snippet}

                Give exactly 4 short, specific, actionable suggestions to improve this resume.
                - Each suggestion on its own line
                - No numbering or bullet points
                - Be direct and specific
                - Focus on what will get the candidate hired
                """;

            var body = JsonSerializer.Serialize(new
            {
                model = "llama-3.3-70b-versatile",
                messages = new[]
                {
                    new { role = "user", content = prompt }
                },
                max_tokens = 400,
                temperature = 0.7
            });

            try
            {
                var request = new HttpRequestMessage(HttpMethod.Post,
                    "https://api.groq.com/openai/v1/chat/completions");

                request.Headers.Add("Authorization", $"Bearer {apiKey}");
                request.Content = new StringContent(body, Encoding.UTF8, "application/json");

                var response = await _http.SendAsync(request);
                var json = await response.Content.ReadAsStringAsync();

                if (!response.IsSuccessStatusCode)
                    return new List<string> { "AI suggestions temporarily unavailable." };

                using var doc = JsonDocument.Parse(json);
                var text = doc.RootElement
                    .GetProperty("choices")[0]
                    .GetProperty("message")
                    .GetProperty("content")
                    .GetString() ?? "";

                return text
                    .Split('\n', StringSplitOptions.RemoveEmptyEntries)
                    .Select(s => s.Trim())
                    .Where(s => s.Length > 0)
                    .ToList();
            }
            catch
            {
                return new List<string> { "AI suggestions temporarily unavailable." };
            }
        }
    }
}