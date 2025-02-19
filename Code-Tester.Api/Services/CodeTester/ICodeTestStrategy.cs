using Code_Tester.Api.Services.CodeTester.DTOs;

namespace Code_Tester.Api.Services.CodeTester
{
    public interface ICodeTestStrategy
    {
        public Task<CodeTestResult> Test(CodeTestOptions request);
    }
}
