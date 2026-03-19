using AIResumeAnalyser.Models;
using System.Text;
using System.Text.Json;

namespace AIResumeAnalyser.Services
{
    public class AiResumeContextService : IAiResumeContextService
    {
        private readonly HttpClient _http;
        private readonly IConfiguration _config;

        public AiResumeContextService(HttpClient http, IConfiguration config)
        {
            _http = http;
            _config = config;
        }

        public async Task<ResumeContext> AnalyzeResumeAsync(string resumeText)
        {
            var apiKey = _config["Groq:ApiKey"];

            if (string.IsNullOrWhiteSpace(apiKey))
                return new ResumeContext();

            var snippet = resumeText[..Math.Min(1500, resumeText.Length)];

            var prompt = """
You are a resume parser.

Return ONLY valid JSON:

{
    "skills": "comma separated skills",
    "missingSkills": "comma separated missing skills",
    "experience": "short experience summary",
    "summary": "short professional summary"
}
""" + $"\nResume:\n{snippet}";

            var body = JsonSerializer.Serialize(new
            {
                model = "llama-3.3-70b-versatile",
                messages = new[]
                {
                    new { role = "user", content = prompt }
                },
                max_tokens = 300,
                temperature = 0.2
            });

            try
            {
                var request = new HttpRequestMessage(HttpMethod.Post,
                    "https://api.groq.com/openai/v1/chat/completions");

                request.Headers.Add("Authorization", $"Bearer {apiKey}");
                request.Content = new StringContent(body, Encoding.UTF8, "application/json");

                var response = await _http.SendAsync(request);

                if (!response.IsSuccessStatusCode)
                    return new ResumeContext();

                var json = await response.Content.ReadAsStringAsync();

                using var doc = JsonDocument.Parse(json);

                var text = doc.RootElement
                    .GetProperty("choices")[0]
                    .GetProperty("message")
                    .GetProperty("content")
                    .GetString();

                if (string.IsNullOrWhiteSpace(text))
                    return new ResumeContext();

                // 🔥 Clean response
                text = text.Trim();

                if (text.StartsWith("```"))
                {
                    text = text.Replace("```json", "")
                               .Replace("```", "")
                               .Trim();
                }

                // 🔥 Safe parsing
                var options = new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                };

                return JsonSerializer.Deserialize<ResumeContext>(text, options)
                       ?? new ResumeContext();
            }
            catch
            {
                return new ResumeContext();
            }
        }
    }
}