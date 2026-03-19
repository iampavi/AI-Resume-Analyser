using AIResumeAnalyser.Models;
using System.Text;
using System.Text.Json;

namespace AIResumeAnalyser.Services
{
    public class GroqChatService
    {
        private readonly HttpClient _http;
        private readonly IConfiguration _config;

        public GroqChatService(HttpClient http, IConfiguration config)
        {
            _http = http;
            _config = config;
        }

        public async Task<string> ChatAsync(
            List<ChatMessage> history,
            ResumeContext context,
            string userMessage)
        {
            var apiKey = _config["Groq:ApiKey"];

            // 🔥 SYSTEM PROMPT (cost optimized)
            var systemPrompt = $"""
        You are a professional resume assistant.

        Candidate Info:
        Skills: {context.Skills}
        Missing Skills: {context.MissingSkills}
        Experience: {context.Experience}
        Summary: {context.Summary}

        Give short, practical, job-winning advice.
        """;

            var messages = new List<object>
        {
            new { role = "system", content = systemPrompt }
        };

            // 🔥 Limit history (COST CONTROL)
            foreach (var msg in history.TakeLast(6))
            {
                messages.Add(new { role = msg.Role, content = msg.Content });
            }

            messages.Add(new { role = "user", content = userMessage });

            var body = JsonSerializer.Serialize(new
            {
                model = "llama-3.3-70b-versatile",
                messages,
                max_tokens = 300,
                temperature = 0.7
            });

            var request = new HttpRequestMessage(HttpMethod.Post,
                "https://api.groq.com/openai/v1/chat/completions");

            request.Headers.Add("Authorization", $"Bearer {apiKey}");
            request.Content = new StringContent(body, Encoding.UTF8, "application/json");
            var response = await _http.SendAsync(request);

            var raw = await response.Content.ReadAsStringAsync();

            Console.WriteLine("GROQ RESPONSE:");
            Console.WriteLine(raw);

            if (!response.IsSuccessStatusCode)
            {
                return $"AI ERROR: {raw}";
            }

            var json = await response.Content.ReadAsStringAsync();

            using var doc = JsonDocument.Parse(json);

            return doc.RootElement
                .GetProperty("choices")[0]
                .GetProperty("message")
                .GetProperty("content")
                .GetString() ?? "";
        }
    }
}
