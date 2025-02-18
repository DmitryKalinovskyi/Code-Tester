using Code_Tester.Api.DTOs;
using System.Diagnostics;
using System.Text;

namespace Code_Tester.Api.Services
{
    public class CodeTester : ICodeTester
    {
        public string[] GetSupportedLanguages()
        {
            return ["python3"];
        }

        public async Task<CodeTestResponse> TestAsync(CodeTestRequest request)
        {
            if (!GetSupportedLanguages().Contains(request.Language))
            {
                return new CodeTestResponse() {
                    Output = "",
                    Error = $"{request.Language} language is not supported"
                };
            }

            // at first time leave this in the same container
            // consider that our user is very friendly and don't want to break our system :)
            // ensure security in the later stages

            // should we return raw data or stream of data?
            // keep interaction logic to the future

            var testId = Guid.NewGuid();
            var testPath = $"./running/{testId}";
            const string inputFileName = "input.txt";
            const string programFileName = "program.py";
            const string executor = "python3";

            var inputPath = Path.Combine(testPath, inputFileName);
            var programPath = Path.Combine(testPath, programFileName);

            Directory.CreateDirectory(testPath);

            using var inputFileStream = File.Create(inputPath);
            byte[] inputBytes = request.Input is null ? [] : Encoding.UTF8.GetBytes(request.Input);
            await inputFileStream.WriteAsync(inputBytes);
            await inputFileStream.FlushAsync();

            using var codeFileStream = File.Create(programPath);
            byte[] codeBytes = Encoding.UTF8.GetBytes(request.SourceCode);
            await codeFileStream.WriteAsync(codeBytes);
            await codeFileStream.FlushAsync();

            var process = new Process
            {
                StartInfo = new ProcessStartInfo
                {
                    WorkingDirectory = testPath,
                    FileName = executor,
                    Arguments = programFileName,
                    RedirectStandardInput = request.ForwardInput,
                    RedirectStandardOutput = true,
                    RedirectStandardError = true,
                    UseShellExecute = false,
                    CreateNoWindow = true,
                }
            };

            process.Start();

            if (request.ForwardInput)
            {
                await process.StandardInput.WriteAsync(request.Input);
                process.StandardInput.Close();
            }

            string output = await process.StandardOutput.ReadToEndAsync();
            string error = await process.StandardError.ReadToEndAsync();
            await process.WaitForExitAsync();

            Directory.Delete(testPath, true);

            return new CodeTestResponse()
            {
                Output = output,
                Error = error
            };
        }
    }
}
