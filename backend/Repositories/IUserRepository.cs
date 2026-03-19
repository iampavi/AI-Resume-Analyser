using AIResumeAnalyser.Models;

namespace AIResumeAnalyser.Repositories
{
    public interface IUserRepository
    {
        User GetUserByEmail(string email);

        void CreateUser(User user);
    }
}