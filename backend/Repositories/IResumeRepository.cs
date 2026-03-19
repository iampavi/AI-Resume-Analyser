using AIResumeAnalyser.Models;

namespace AIResumeAnalyser.Repositories
{
    public interface IResumeRepository
    {
        Dictionary<string, RoleRequirement> GetRoles();
    }
}
