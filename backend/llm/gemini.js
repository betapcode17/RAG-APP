import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function askGemini(prompt) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash", // Model stable mới nhất, thay thế cho 1.5-pro
  });

  const result = await model.generateContent(prompt);
  return result.response.text();
}

// Hàm list models dùng REST API (vì SDK Node.js không có built-in)
export async function listModels() {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`
    );
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    const geminiModels = data.models
      .filter((m) => m.name.includes("gemini"))
      .map((m) => m.name.replace("models/", "")); // Loại bỏ prefix nếu có
    console.log("Available Gemini models:", geminiModels);
    return geminiModels;
  } catch (error) {
    console.error("Error listing models:", error.message);
  }
}

// Để test listModels, gọi thủ công ở nơi khác, ví dụ trong index.js:
// await listModels();
