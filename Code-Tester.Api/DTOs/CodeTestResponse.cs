namespace Code_Tester.Api.DTOs
{
    public class CodeTestResponse
    {
        public required string Output { get; set; }
        public required string Error { get; set; }
        public long ExecutionTimeMilliseconds { get; set; } = 0;
        public long MemoryUsedBytes { get; set; } = 0;
    }
}
