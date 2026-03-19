namespace AIResumeAnalyser.Data
{
    public static class SkillSynonymStore
    {
        public static readonly Dictionary<string, List<string>> SkillSynonyms = new()
        {
            { "C#",             new() { "csharp", "c sharp", ".net" } },
            { "ASP.NET Core",   new() { "aspnet", "asp.net", "dotnet core", ".net core" } },
            { "SQL",            new() { "t-sql", "mysql", "postgresql", "mssql", "sqlite", "pl/sql" } },
            { "REST API",       new() { "restful", "web api", "http api", "rest services" } },
            { "JavaScript",     new() { "js", "es6", "ecmascript", "node.js", "nodejs" } },
            { "React",          new() { "reactjs", "react.js" } },
            { "Docker",         new() { "containerization", "containers", "dockerfile" } },
            { "Kubernetes",     new() { "k8s", "container orchestration" } },
            { "CI/CD",          new() { "continuous integration", "continuous deployment", "github actions", "gitlab ci", "pipelines" } },
            { "AWS",            new() { "amazon web services", "ec2", "s3", "lambda", "aws cloud" } },
            { "Azure",          new() { "microsoft azure", "azure cloud", "azure devops" } },
            { "Python",         new() { "python3", "py" } },
            { "Machine Learning", new() { "ml", "supervised learning", "unsupervised learning" } },
            { "TensorFlow",     new() { "tf", "keras" } },
            { "Power BI",       new() { "powerbi", "power-bi", "bi dashboard" } },
            { "Git",            new() { "github", "gitlab", "version control", "bitbucket" } },
            { "Android",        new() { "android development", "android sdk" } },
            { "Mobile Development", new() { "mobile apps", "cross-platform", "app development" } },
        };
    }
}