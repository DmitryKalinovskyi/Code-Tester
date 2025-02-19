namespace Code_Tester.Api.Services.CodeTester.Builders
{
    public interface ICodeTesterBuilder
    {
        ICodeTesterBuilder AddLanguage(string language, ICodeTestStrategy strategy);
        ICodeTester Build();
    }
}
