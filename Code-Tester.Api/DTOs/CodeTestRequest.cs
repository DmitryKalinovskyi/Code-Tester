using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Annotations;

namespace Code_Tester.Api.DTOs
{
    public class CodeTestRequest
    {
        /// <summary>
        /// Language of program
        /// </summary>
        /// <example>Python</example>
        public required string Language { get; set; }

        /// <summary>
        /// Source code of program
        /// </summary>
        /// <example>print(1 + 2)</example>
        public required string SourceCode { get; set; }

        /// <summary>
        /// Input that will be forwarded to program
        /// </summary>
        /// <example>null</example>
        public string? Input { get; set; }
    }
}
