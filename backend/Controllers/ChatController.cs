using AIResumeAnalyser.Models;
using AIResumeAnalyser.Services;
using AIResumeAnalyser.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace AIResumeAnalyser.Controllers
{
    [ApiController]
    [Route("api/chat")]
    public class ChatController : ControllerBase
    {
        private readonly GroqChatService _chatService;

        public ChatController(GroqChatService chatService)
        {
            _chatService = chatService;
        }

        [HttpPost]
        public async Task<IActionResult> SendMessage([FromBody] string message)
        {
            if (string.IsNullOrWhiteSpace(message))
                return BadRequest("Message is empty");

            // 🧠 Get chat history from session
            var history = HttpContext.Session.GetObject<List<ChatMessage>>("history")
                          ?? new List<ChatMessage>();

            // 🧠 Get resume context
            var context = HttpContext.Session.GetObject<ResumeContext>("resumeContext")
                          ?? new ResumeContext();

            // 🤖 Call AI
            var reply = await _chatService.ChatAsync(history, context, message);

            // 💾 Save conversation
            history.Add(new ChatMessage { Role = "user", Content = message });
            history.Add(new ChatMessage { Role = "assistant", Content = reply });

            HttpContext.Session.SetObject("history", history);

            return Ok(reply);
        }
    }
}