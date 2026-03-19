namespace AIResumeAnalyser.Models
{
    public class ScoringWeights
    {
        public double Skills { get; set; } = 0.35;
        public double Ats { get; set; } = 0.20;
        public double Structure { get; set; } = 0.15;
        public double Keyword { get; set; } = 0.20;
        public double Impact { get; set; } = 0.10;
    }
}
