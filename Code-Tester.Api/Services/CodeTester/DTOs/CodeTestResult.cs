namespace Code_Tester.Api.Services.CodeTester.DTOs
{
    public class CodeTestResult
    {
        public string? Output { get; set; }
        public string? Error { get; set; }
        public long? ExecutionTimeMilliseconds { get; set; }
        public long? MemoryUsedBytes { get; set; }
    }
}
