using Code_Tester.Api.DTOs;

namespace Code_Tester.Api.Services.Testers
{
    public class JavaStrategy : ICodeTestStrategy
    {
        public async Task<CodeTestResponse> Test(CodeTestRequest request)
        {
            using var context = new CodeTestContext(request.Input);
            await context.SaveInput();
            await context.SaveContent("Main.java", request.SourceCode);

            var result = await context.Execute("javac", "Main.java");
            if (!string.IsNullOrEmpty(result.Error))
            {   
                return result;
            }

            return await context.Execute("java", "Main");
        }
    }
}
