using AIResumeAnalyser.Models;

namespace AIResumeAnalyser.Services
{
    public interface IAiResumeContextService
    {
        Task<ResumeContext> AnalyzeResumeAsync(string resumeText);
    }
}
