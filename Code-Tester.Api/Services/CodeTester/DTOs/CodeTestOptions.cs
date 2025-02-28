namespace Code_Tester.Api.Services.CodeTester.DTOs
{
    public class CodeTestOptions
    {
        public required string Language { get; set; }

        public required string SourceCode { get; set; }

        public string? Input { get; set; }
    }
}
