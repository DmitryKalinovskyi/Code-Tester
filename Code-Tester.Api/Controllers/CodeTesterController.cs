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
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<CodeTestResponse> TestCode(CodeTestRequest request)
        {
            return await codeTester.TestAsync(request);
        }

        [HttpGet("languages")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public string[] GetSupportedLanguages()
        {
            return codeTester.GetSupportedLanguages();
        }
    }
}
