namespace Code_Tester.Api.DTOs
{
    public class CodeTestResponse
    {
        public string? Output { get; set; }
        public string? Error { get; set; }
        public long? ExecutionTimeMilliseconds { get; set; }
        public long? MemoryUsedBytes { get; set; }
    }
}
