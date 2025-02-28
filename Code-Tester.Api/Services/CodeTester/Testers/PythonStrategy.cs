using Code_Tester.Api.Services.CodeTester.Context;
using Code_Tester.Api.Services.CodeTester.DTOs;

namespace Code_Tester.Api.Services.CodeTester.Testers
{
    public class PythonStrategy : ICodeTestStrategy
    {
        public async Task<CodeTestResult> Test(CodeTestOptions request)
        {
            using var context = new CodeTestContext(request.Input);
            await context.SaveInput();
            await context.SaveContent("program.py", request.SourceCode);

            return await context.Execute("python3", "program.py");
        }
    }
}
