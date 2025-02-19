using Code_Tester.Api.Services.CodeTester.Builders;

namespace Code_Tester.Api.Services.CodeTester.Dependency
{
    public static class CodeTesterServiceExtensions
    {
        public static IServiceCollection AddCodeTester(this IServiceCollection services, Func<ICodeTesterBuilder, ICodeTesterBuilder> buildFunc)
        {
            services.AddTransient<ICodeTesterBuilder, CodeTesterBuilder>();

            services.AddSingleton(services =>
            {
                var builder = services.GetRequiredService<ICodeTesterBuilder>();
                return buildFunc(builder).Build();
            });

            return services;
        }
    }
}
