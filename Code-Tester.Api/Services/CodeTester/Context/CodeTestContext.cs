using Code_Tester.Api.Services.CodeTester.DTOs;
using System.Diagnostics;
using System.Text;

namespace Code_Tester.Api.Services.CodeTester.Context
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

        public async Task<CodeTestResult> Execute(string fileName)
        {
            return await Execute(fileName, "");
        }

        public async Task<CodeTestResult> Execute(string fileName, string arguments)
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
            long peakMemoryUsage = 0;

            do
            {
                if (!process.HasExited)
                {
                    // Refresh the current process property values.
                    process.Refresh();
                    peakMemoryUsage = Math.Max(peakMemoryUsage, process.PeakWorkingSet64);
                }
            }
            while (!process.WaitForExit(500));

            string output = await process.StandardOutput.ReadToEndAsync();
            string error = await process.StandardError.ReadToEndAsync();

            await process.WaitForExitAsync();
            stopwatch.Stop();

            return new CodeTestResult()
            {
                Error = error,
                Output = output,
                ExecutionTimeMilliseconds = stopwatch.ElapsedMilliseconds,
                MemoryUsedBytes = peakMemoryUsage
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
