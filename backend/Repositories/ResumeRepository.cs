using AIResumeAnalyser.Models;
using AIResumeAnalyser.Repositories;

public class ResumeRepository : IResumeRepository
{
    private readonly IConfiguration _config;

    public ResumeRepository(IConfiguration config)
    {
        _config = config;
    }

    public Dictionary<string, RoleRequirement> GetRoles()
    {
        return _config
            .GetSection("Roles")
            .Get<Dictionary<string, RoleRequirement>>()
            ?? throw new Exception("roles.json not configured");
    }
}