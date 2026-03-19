using AIResumeAnalyser.Extensions;
using AIResumeAnalyser.Models;
using AIResumeAnalyser.Services;
using Microsoft.AspNetCore.Mvc;

namespace AIResumeAnalyser.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResumeController : ControllerBase
    {
        private readonly IResumeService _resumeService;

        public ResumeController(IResumeService resumeService)
        {
            _resumeService = resumeService;
        }

        [HttpPost("analyze")]
       
        public async Task<IActionResult> AnalyzeResume([FromForm] ResumeRequest request)
        {
            if (request.File == null || request.File.Length == 0)
                return BadRequest(new { error = "No file uploaded." });

            if (!request.File.FileName.EndsWith(".pdf", StringComparison.OrdinalIgnoreCase))
                return BadRequest(new { error = "Only PDF files are supported." });

            if (string.IsNullOrWhiteSpace(request.Role))
                return BadRequest(new { error = "Role is required." });

            try
            {
                var result = await _resumeService.AnalyzeResumeAsync(request.File, request.Role);

                // ✅ BUILD CONTEXT FROM YOUR EXISTING RESULT
                var context = new ResumeContext
                {
                    Skills = string.Join(", ", result.DetectedRequiredSkills.Concat(result.DetectedOptionalSkills)),
                    MissingSkills = string.Join(", ", result.MissingSkills),
                    Experience = $"{result.ExperienceYears} years",
                    Summary = $"Score: {result.Score}, Grade: {result.Grade}, Verdict: {result.Verdict}"
                };

                // ✅ STORE IN SESSION (VERY IMPORTANT)
               // HttpContext.Session.SetObject("resumeContext", context);

                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    error = "An error occurred while analysing the resume.",
                    detail = ex.Message
                });
            }
        }

        [HttpGet("roles")]
        public IActionResult GetAvailableRoles(
            [FromServices] AIResumeAnalyser.Repositories.IResumeRepository repo)
        {
            var roles = repo.GetRoles();
            return Ok(roles.Keys);
        }

    }
}