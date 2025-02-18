using Code_Tester.Api.DTOs;

namespace Code_Tester.Api.Services.Testers
{
    public class CPlusPlusStrategy : ICodeTestStrategy
    {
        public async Task<CodeTestResponse> Test(CodeTestRequest request)
        {
            using var context = new CodeTestContext(request.Input);
            await context.SaveInput();
            await context.SaveContent("main.cpp", request.SourceCode);
            var result = await context.Execute("g++", "-o main main.cpp");

            if (!string.IsNullOrEmpty(result.Error))
            {
                return result;
            }

            return await context.Execute("/bin/sh", "-c './main'");
        }
    }
}
