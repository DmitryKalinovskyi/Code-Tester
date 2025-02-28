using Code_Tester.Api.Services.CodeTester;
using Code_Tester.Api.Services.CodeTester.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace Code_Tester.Api.Controllers
{
    [ApiController]
    [Route("api/code-tester")]
    public class CodeTesterController(ICodeTester codeTester) : ControllerBase
    {
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(CodeTestResult), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<CodeTestResult>> TestCode(CodeTestOptions request)
        {
            var result = await codeTester.TestAsync(request);

            if (!string.IsNullOrEmpty(result.Error))
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        [HttpGet("languages")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public string[] GetSupportedLanguages()
        {
            return codeTester.GetSupportedLanguages();
        }
    }
}
