using Code_Tester.Api.DTOs;
using Code_Tester.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Code_Tester.Api.Controllers
{
    [ApiController]
    [Route("api/code-tester")]
    public class CodeTesterController(ICodeTester codeTester) : ControllerBase
    {
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(CodeTestResponse), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<CodeTestResponse>> TestCode(CodeTestRequest request)
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
