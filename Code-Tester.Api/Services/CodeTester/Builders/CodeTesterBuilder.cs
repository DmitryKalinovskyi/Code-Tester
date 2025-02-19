using System.ComponentModel.Design;

namespace Code_Tester.Api.Services.CodeTester.Builders
{
    public class CodeTesterBuilder : ICodeTesterBuilder
    {
        private readonly Dictionary<string, ICodeTestStrategy> _codeTestStrategies = [];

        public ICodeTesterBuilder AddLanguage(string language, ICodeTestStrategy strategy)
        {
            _codeTestStrategies.Add(language, strategy);
            return this;
        }

        public ICodeTester Build()
        {
            return new CodeTester(_codeTestStrategies);
        }
    }
}
