using Code_Tester.Api.Services.CodeTester.DTOs;

namespace Code_Tester.Api.Services.CodeTester
{
    public interface ICodeTester
    {
        Task<CodeTestResult> TestAsync(CodeTestOptions request);
        string[] GetSupportedLanguages();
    }
}