using Code_Tester.Api.DTOs;
using System.Diagnostics;
using System.Text;

namespace Code_Tester.Api.Services.Testers
{
    public class CodeTestContext : IDisposable
    {
        public Guid Id { get; private set; }

        public string ContextPath => $"./runner/{Id}";

        public string? Input { get; private set; }

        public CodeTestContext(string? input)
        {
            Id = Guid.NewGuid();
            Input = input;
            Directory.CreateDirectory(ContextPath);
        }

        public async Task SaveInput()
        {
            await SaveContent("input.txt", Input);
        }

        public async Task SaveContent(string fileName, string? content)
        {
            content ??= string.Empty;

            using var inputFileStream = File.Create(Path.Combine(ContextPath, fileName));
            byte[] inputBytes = Encoding.UTF8.GetBytes(content);
            await inputFileStream.WriteAsync(inputBytes);
            await inputFileStream.FlushAsync();
        }

        public async Task<CodeTestResponse> Execute(string fileName)
        {
            return await Execute(fileName, "");
        }

        public async Task<CodeTestResponse> Execute(string fileName, string arguments)
        {
            var stopwatch = new Stopwatch();

            var process = new Process
            {
                StartInfo = new ProcessStartInfo
                {
                    WorkingDirectory = ContextPath,
                    FileName = fileName,
                    Arguments = arguments,
                    RedirectStandardInput = true,
                    RedirectStandardOutput = true,
                    RedirectStandardError = true,
                    UseShellExecute = false,
                    CreateNoWindow = true,
                }
            };

            stopwatch.Start();

            process.Start();

            await process.StandardInput.WriteAsync(Input);
            process.StandardInput.Close();
            long peakWorkingSet64 = process.PeakWorkingSet64;

            string output = await process.StandardOutput.ReadToEndAsync();
            string error = await process.StandardError.ReadToEndAsync();

            await process.WaitForExitAsync();
            stopwatch.Stop();

            return new CodeTestResponse()
            {
                Error = error,
                Output = output,
                ExecutionTimeMilliseconds = stopwatch.ElapsedMilliseconds,
                MemoryUsedBytes = peakWorkingSet64
            };
        }

        public async Task Run(string fileName)
        {
            await Run(fileName, "");
        }

        public async Task Run(string fileName, string arguments)
        {
            var process = new Process
            {
                StartInfo = new ProcessStartInfo
                {
                    WorkingDirectory = ContextPath,
                    FileName = fileName,
                    Arguments = arguments,
                    UseShellExecute = false,
                    CreateNoWindow = true,
                }
            };

            process.Start();

            await process.WaitForExitAsync();
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            Directory.Delete(ContextPath, true);
        }
    }
}
