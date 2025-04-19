// server.js
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import { Groq } from "groq-sdk";

const app = express();
const PORT = process.env.PORT || 3001;

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/api/song-recommendation", async (req, res) => {
  const { song } = req.body;

  if (!song) {
    return res.status(400).json({ error: "Song input is required" });
  }

  const messages = [
    {
      role: "user",
      content:
        "I am going to give a song or a music genre in the next message. If I provide a song as an input, I want you to recommend another song similar to the one I've provided that matches the genre and mood of the original song. If I provide a genre as an input, I want you to output a list of songs that match the genre I've provided. Please do not italicize or bold anything.",
    },
    {
      role: "assistant",
      content:
        "I'm ready to help. What's the song you'd like me to recommend something similar to?",
    },
    {
      role: "user",
      content: song,
    },
  ];

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages,
      model: "llama-3.3-70b-versatile",
      temperature: 1,
      max_completion_tokens: 1024,
      top_p: 1,
      stream: false, // simpler for now
    });

    const response =
      chatCompletion.choices[0]?.message?.content || "No response.";
    res.json({ result: response });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Failed to get a recommendation" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
