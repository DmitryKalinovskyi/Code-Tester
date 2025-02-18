using Code_Tester.Api.DTOs;

namespace Code_Tester.Api.Services.Testers
{
    public class PythonStrategy : ICodeTestStrategy
    {
        public async Task<CodeTestResponse> Test(CodeTestRequest request)
        {
            using var context = new CodeTestContext(request.Input);
            await context.SaveInput();
            await context.SaveContent("program.py", request.SourceCode);

            return await context.Execute("python3", "program.py");
        }
    }
}
