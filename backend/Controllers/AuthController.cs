using AIResumeAnalyser.Data;
using AIResumeAnalyser.Models;
using AIResumeAnalyser.Services;
using Microsoft.AspNetCore.Mvc;


namespace AIResumeAnalyser.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IAuthService _authService;

        public AuthController(AppDbContext context, IAuthService authService)
        {
            _context = context;
            _authService = authService;
        }

        [HttpPost("register")]
        public IActionResult Register(RegisterRequest request)
        {
            var existingUser = _context.Users
                .FirstOrDefault(x => x.Email == request.Email);

            if (existingUser != null)
                return BadRequest("Email already exists");

            var user = new User
            {
                Email = request.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password)
                //UserName = request.UserName
            };

            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok("User registered");
        }

        [HttpPost("login")]
        public IActionResult Login(LoginRequest request)
        {
            var user = _context.Users
                .FirstOrDefault(x => x.Email == request.Email);

            if (user == null)
                return Unauthorized("null credentials");

            bool valid = BCrypt.Net.BCrypt.Verify(
                request.Password,
                user.PasswordHash
            );

            if (!valid)
                return Unauthorized("Invalid credentials");

            var token = _authService.GenerateToken(user);

            return Ok(new
            {
                token,
                user.Email
            });
        }
    }
}