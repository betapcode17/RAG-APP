using Google.GenAI;
using RagApp.Controllers;

namespace RagApp.Services.Llm
{
    public class GeminiChatProvider : ILlmChatProvider
    {
        private readonly GenAIClient _client;

        public GeminiChatProvider(GenAIClient client)
        {
            _client = client;
        }

        public async Task<string> AskAsync(
            string system,
            string username,
            CancellationToken cancellationToken = default)
        {
            var prompt = $"{system}\n\nUser: {username}";

            var result = await _client.GenerateContentAsync(
                model: "gemini-1.5-flash",
                prompt: prompt,
                cancellationToken: cancellationToken
            );

            return result?.Text ?? string.Empty;
        }
    }
}
