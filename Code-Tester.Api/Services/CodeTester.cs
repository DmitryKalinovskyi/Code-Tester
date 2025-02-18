using Code_Tester.Api.DTOs;
using Code_Tester.Api.Services.Testers;

namespace Code_Tester.Api.Services
{
    public class CodeTester : ICodeTester
    {
        private readonly Dictionary<string, ICodeTestStrategy> _concreteCodeTesters = new()
        {
            { "Python", new PythonStrategy() },
            { "C++", new CPlusPlusStrategy() },
            { "Java", new JavaStrategy() },
        };

        public string[] GetSupportedLanguages()
        {
            return [.. _concreteCodeTesters.Keys];
        }

        public async Task<CodeTestResponse> TestAsync(CodeTestRequest request)
        {
            if (_concreteCodeTesters.TryGetValue(request.Language, out ICodeTestStrategy? value))
            {
                return await value.Test(request);
            }

            return new CodeTestResponse()
            {
                Output = "",
                Error = $"{request.Language} language is not supported"
            };
        }
    }
}
