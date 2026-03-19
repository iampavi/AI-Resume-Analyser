using Microsoft.EntityFrameworkCore;
using AIResumeAnalyser.Models;

namespace AIResumeAnalyser.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
    }
}