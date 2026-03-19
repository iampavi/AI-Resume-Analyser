using AIResumeAnalyser.Models;

namespace AIResumeAnalyser.Services
{
    public interface IAuthService
    {
        string Register(RegisterRequest request);

        string Login(LoginRequest request);
        string GenerateToken(User user);
    }
}