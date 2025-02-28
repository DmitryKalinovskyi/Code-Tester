using Code_Tester.Api.DTOs;
using Code_Tester.Api.Services.CodeTester;
using Code_Tester.Api.Services.CodeTester.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace Code_Tester.Api.Controllers
{
    [ApiController]
    [Route("api/code-tester")]
    [Produces("application/json")]
    public class CodeTesterController(ICodeTester codeTester) : ControllerBase
    {
        /// <summary>
        /// Executes source code with specified parameters
        /// </summary>
        /// <param name="request">Request parameters</param>
        /// <returns>Code execution result</returns>
        /// <response code="200">Code executed successfully</response>
        /// <response code="400">There is error during executing</response>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(CodeTestResponse), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<CodeTestResponse>> TestCode(CodeTestRequest request)
        {
            var rawResult = await codeTester.TestAsync(new CodeTestOptions {
                Language = request.Language,
                SourceCode = request.SourceCode,
                Input = request.Input
            });

            var result = new CodeTestResponse
            {
                Error = rawResult.Error,
                ExecutionTimeMilliseconds = rawResult.ExecutionTimeMilliseconds,
                MemoryUsedBytes = rawResult.MemoryUsedBytes,
                Output = rawResult.Output
            };

            if (!string.IsNullOrEmpty(result.Error))
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        /// <summary>
        /// Returns supported languages in code tester
        /// </summary>
        /// <returns>Supported languages</returns>
        [HttpGet("languages")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public string[] GetSupportedLanguages()
        {
            return codeTester.GetSupportedLanguages();
        }
    }
}
