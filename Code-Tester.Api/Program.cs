using Code_Tester.Api.Services.CodeTester;
using Code_Tester.Api.Services.CodeTester.Builders;
using Code_Tester.Api.Services.CodeTester.Dependency;
using Code_Tester.Api.Services.CodeTester.Testers;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddTransient<PythonStrategy>();
builder.Services.AddTransient<CPlusPlusStrategy>();
builder.Services.AddTransient<JavaStrategy>();

builder.Services.AddCodeTester(builder => builder
    .AddLanguage("Python", new PythonStrategy())
    .AddLanguage("C++", new CPlusPlusStrategy())
    .AddLanguage("Java", new JavaStrategy())
);

builder.Services.AddCors(options =>
    options.AddDefaultPolicy(p => p
        .AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod()
    )
);

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseCors();
app.UseHttpsRedirection();
app.MapControllers();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

await app.RunAsync();
