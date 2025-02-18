using Code_Tester.Api.DTOs;

namespace Code_Tester.Api.Services.Testers
{
    public interface ICodeTestStrategy
    {
        public Task<CodeTestResponse> Test(CodeTestRequest request);
    }
}
