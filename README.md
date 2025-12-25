# 📚 RAG Application with Node.js & Google Gemini

> A **Retrieval-Augmented Generation (RAG)** application built with **Node.js backend**, **Google Gemini API**, and **ReactJS frontend**.
> The system answers questions **based only on provided documents**, reducing hallucinations.

---

## 🚀 Overview

Retrieval-Augmented Generation (RAG) combines:

* **Information Retrieval** (searching relevant documents)
* **Large Language Models (LLMs)** (generating answers)

This project demonstrates how to build a **document-based chatbot** using **Google Gemini** without fine-tuning the model.

---

## 🧠 System Architecture

```
User (ReactJS)
      │
      ▼
Backend API (Node.js / Express)
      │
      ├─ Load & split documents (docs.txt)
      ├─ Generate embeddings (Gemini Embedding API)
      ├─ Vector similarity search
      └─ Generate answer (Gemini 1.5 Pro)
```

<img width="1094" height="640" alt="image" src="https://github.com/user-attachments/assets/188b232e-b45c-498f-bebe-d55d6e08e8be" />

---

## 🛠 Technologies

### Backend

* Node.js
* Express.js
* Google Gemini REST API (v1)
* dotenv
* node-fetch

### Frontend

* ReactJS
* Fetch API

### AI Models

| Purpose                  | Model                   |
| ------------------------ | ----------------------- |
| Chat / Answer generation | `gemini-2.5-flash` |
| Embeddings               | `text-embedding-004`    |

---



## 📄 Example `docs.txt`

```
Artificial Intelligence (AI) is a field of computer science.
It focuses on building systems that can learn, reason,
and make decisions similar to humans.
```

---

## ⚙️ Backend Setup

### 1️⃣ Install dependencies

```bash
cd backend
npm install
```

### 2️⃣ Create `.env` file

```env
GEMINI_API_KEY=YOUR_API_KEY_HERE
```

### 3️⃣ Run the server

```bash
node src/index.js
```

Server will run at:

```
http://localhost:3000
```

---

## 🔍 API Endpoint

### `POST /chat`

**Request**

```json
{
  "question": "What is AI?"
}
```

**Response**

```json
{
  "answer": "Artificial Intelligence is a field of computer science..."
}
```

---

## 🧪 Backend Testing

You can test the API using:

* Postman
* Thunder Client
* curl

```bash
curl -X POST http://localhost:3000/chat \
-H "Content-Type: application/json" \
-d '{"question":"What is AI?"}'
```

---
## DEMO
1. Home

LightMode

<img width="1883" height="902" alt="image" src="https://github.com/user-attachments/assets/dfb10ecd-de27-4e3c-aad6-a33c89195a68" />

DarkMode

<img width="1882" height="901" alt="image" src="https://github.com/user-attachments/assets/e6212b3b-88b5-4a19-a41b-957b7e8bfbe3" />

3. Chat

<img width="1905" height="910" alt="image" src="https://github.com/user-attachments/assets/662b2055-91cf-4e24-9c9a-488b149b48b8" />

4. Management Document
   
<img width="1886" height="613" alt="image" src="https://github.com/user-attachments/assets/e4c68ea1-5502-4305-b301-f5f7b9a077b1" />

5.
<img width="1888" height="840" alt="image" src="https://github.com/user-attachments/assets/9337f3e8-163f-4a22-ae2b-4890548d48c3" />

---
## 🧠 Why RAG?

✅ Reduces hallucinations
✅ Uses updatable documents
✅ No model fine-tuning required
✅ Ideal for internal Q&A systems

---

## ⚠️ Important Notes

* ❌ Do NOT use `@google/generative-ai` SDK (outdated, v1beta issues)
* ✅ Use **Google Gemini REST API v1**
* ✅ Always verify available models using `ListModels`

---

## 📌 Future Improvements

* PDF / DOCX upload support
* Persistent vector database (LanceDB / Chroma)
* Streaming responses
* Authentication & user sessions
* Improved chatbot UI

---

## 👨‍💻 Author

* **Quốc Đạt**
* Project for learning and research purposes

---

If you want, I can also:

* ✨ Adapt this README for **academic reports**
* 📖 Add a **theory section about RAG**
* 📊 Create **architecture diagrams**
* 🌐 Provide a **Vietnamese–English bilingual version**
