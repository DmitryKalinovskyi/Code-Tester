using Code_Tester.Api.Services.CodeTester.Context;
using Code_Tester.Api.Services.CodeTester.DTOs;

namespace Code_Tester.Api.Services.CodeTester.Testers
{
    public class CPlusPlusStrategy : ICodeTestStrategy
    {
        public async Task<CodeTestResult> Test(CodeTestOptions request)
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
