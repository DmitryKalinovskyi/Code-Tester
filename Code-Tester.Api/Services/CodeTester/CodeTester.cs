using Code_Tester.Api.Services.CodeTester.DTOs;

namespace Code_Tester.Api.Services.CodeTester
{
    public class CodeTester : ICodeTester
    {
        private readonly Dictionary<string, ICodeTestStrategy> _codeTestStrategies;

        public CodeTester()
        {
            _codeTestStrategies = [];
        }

        public CodeTester(Dictionary<string, ICodeTestStrategy> codeTestStrategies)
        {
            _codeTestStrategies = codeTestStrategies;
        }

        public string[] GetSupportedLanguages()
        {
            return [.. _codeTestStrategies.Keys];
        }

        public async Task<CodeTestResult> TestAsync(CodeTestOptions request)
        {
            if (_codeTestStrategies.TryGetValue(request.Language, out ICodeTestStrategy? value))
            {
                return await value.Test(request);
            }

            return new CodeTestResult()
            {
                Error = $"{request.Language} language is not supported"
            };
        }
    }
}
