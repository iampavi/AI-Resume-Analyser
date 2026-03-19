using AIResumeAnalyser.Data;
using AIResumeAnalyser.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});


var jwtKey = builder.Configuration["Jwt:Key"];

// ? allow EF migrations to run without JWT
if (string.IsNullOrEmpty(jwtKey))
{
    jwtKey = "TEMP_DEV_KEY_123456789"; // fallback for migration
}

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=resume.db"));

builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IResumeService, ResumeService>();

builder.Services.AddAuthentication("Bearer")
    .AddJwtBearer("Bearer", options =>
    {
        options.TokenValidationParameters =
            new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,

                ValidIssuer = builder.Configuration["Jwt:Issuer"],
                ValidAudience = builder.Configuration["Jwt:Audience"],

                IssuerSigningKey =
                    new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(jwtKey)
                    )
            };
    });

builder.Services.AddSession();
builder.Services.AddDistributedMemoryCache();

var app = builder.Build();

app.UseCors("AllowReact");
app.UseAuthentication();
app.UseAuthorization();
app.UseSession();

app.MapControllers();

// Render port
var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";
app.Urls.Add($"http://*:{port}");

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated(); // ?? ADD THIS
}

app.Run();
