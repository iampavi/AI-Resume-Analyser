using AIResumeAnalyser.Models;

namespace AIResumeAnalyser.Services
{
    public interface IResumeService
    {
        Task<ResumeAnalysisResult> AnalyzeResumeAsync(IFormFile file, string role);
    }
}
