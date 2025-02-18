using System.ComponentModel.DataAnnotations;

namespace Code_Tester.Api.DTOs
{
    public class CodeTestRequest
    {
        [Required]
        public required string Language { get; set; }

        [Required]
        public required string SourceCode { get; set; }

        public string? Input { get; set; }
    }
}
