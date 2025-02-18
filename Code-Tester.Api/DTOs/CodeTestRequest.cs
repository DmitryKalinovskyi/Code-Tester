using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Code_Tester.Api.DTOs
{
    public class CodeTestRequest
    {
        [Required]
        [DefaultValue("Python3")]
        public required string Language { get; set; }

        [Required]
        [DefaultValue("a = input()\nprint(a)")]
        public required string SourceCode { get; set; }

        [DefaultValue("Hi!")]
        public string? Input { get; set; }
    }
}
