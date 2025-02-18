using Code_Tester.Api.DTOs;

namespace Code_Tester.Api.Services
{
    public interface ICodeTester
    {
        Task<CodeTestResponse> TestAsync(CodeTestRequest request);

        string[] GetSupportedLanguages();
    }
}