using Code_Tester.Api.DTOs;
using System.Diagnostics;
using System.Text;

namespace Code_Tester.Api.Services
{
    public class CodeTester : ICodeTester
    {
        public string[] GetAllowedTestLanguages()
        {
            return ["python3"];
        }

        public async Task<CodeTestResponse> TestAsync(CodeTestRequest request)
        {
            // at first time leave this in the same container
            // consider that our user is very friendly and don't want to break our system :)
            // ensure security in the later stages

            // should we return raw data or stream of data?
            // keep interaction logic to the future

            Directory.CreateDirectory("./runner");

            using var inputFileStream = File.Create("./runner/input.txt");
            byte[] inputBytes = request.Input is null ? [] : Encoding.UTF8.GetBytes(request.Input);
            await inputFileStream.WriteAsync(inputBytes);
            await inputFileStream.FlushAsync();

            using var codeFileStream = File.Create("./runner/program.py");
            byte[] codeBytes = Encoding.UTF8.GetBytes(request.SourceCode);
            await codeFileStream.WriteAsync(codeBytes);
            await codeFileStream.FlushAsync();

            // start our program and get all output

            var process = new Process
            {
                StartInfo = new ProcessStartInfo
                {
                    FileName = "python3",
                    Arguments = "./runner/program.py",
                    RedirectStandardOutput = true,
                    RedirectStandardError = true,
                    UseShellExecute = false,
                    CreateNoWindow = true
                }
            };

            process.Start();
            string output = await process.StandardOutput.ReadToEndAsync();
            string error = await process.StandardError.ReadToEndAsync();
            await process.WaitForExitAsync();

            return new CodeTestResponse()
            {
                Output = output,
                Error = error
            };
        }
    }
}
