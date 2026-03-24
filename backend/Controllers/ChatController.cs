using AIResumeAnalyser.Models;
using AIResumeAnalyser.Services;
using AIResumeAnalyser.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace AIResumeAnalyser.Controllers
{
    [Authorize]
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
        public async Task<IActionResult> SendMessage([FromBody] ChatRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Message))
                return BadRequest("Message is empty");


            var history = HttpContext.Session.GetObject<List<ChatMessage>>("history")
                          ?? new List<ChatMessage>();

            var context = HttpContext.Session.GetObject<ResumeContext>("resumeContext")
               ?? new ResumeContext
               {
                   Skills = "Not available",
                   MissingSkills = "Not available",
                   Experience = "Not available",
                   Summary = "Not available"
               };
            if (string.IsNullOrEmpty(context?.Skills))
            {
                return BadRequest("Please upload and analyze your resume first.");
            }

            var reply = await _chatService.ChatAsync(history, context, request.Message);

            history.Add(new ChatMessage { Role = "user", Content = request.Message });
            history.Add(new ChatMessage { Role = "assistant", Content = reply });

            HttpContext.Session.SetObject("history", history);

            return Ok(reply);
        }
    }
}