namespace AIResumeAnalyser.Models
{
    public class ResumeAnalyseModel
    {
        public List<string> DetectedSkills { get; set; }
        public List<string> MissingSkills { get; set; }
        public double Score { get; set; }
    }
}
