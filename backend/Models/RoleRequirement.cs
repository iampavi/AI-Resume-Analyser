namespace AIResumeAnalyser.Models
{
    public class RoleRequirement
    {
        public int MinExperienceYears { get; set; }
        public List<string> RequiredSkills { get; set; }
        public List<string> OptionalSkills { get; set; }
    }
}
