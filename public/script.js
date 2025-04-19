import { Groq } from "groq-sdk";

const groq = new Groq();
async function main() {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content:
          "I am going to give a song in the next message. I want you to recommend another song similar to the one I've provided that matches the genre and mood of the original song.",
      },
      {
        role: "assistant",
        content:
          "I'm ready to help. What's the song you'd like me to find a similar match for?",
      },
      {
        role: "user",
        content: "Baby One More Time - Tenacious D cover",
      },
      {
        role: "assistant",
        content:
          'The Tenacious D cover of "Baby One More Time" is a humorous, high-energy rock take on the original Britney Spears song. With that in mind, I\'d recommend checking out the song "Tribute" by Tenacious D. It\'s another comedic, over-the-top rock song that matches the energetic and playful vibe of their "Baby One More Time" cover.\n\nIf you\'d like a song from a different artist, I\'d suggest "Song 2" by Blur, also known as "Woo-Hoo". It\'s a short, high-energy song with a similar blend of humor, rock, and catchy hooks.\n\nLet me know if you\'d like more recommendations or have any other preferences!',
      },
    ],
    model: "llama-3.3-70b-versatile",
    temperature: 1,
    max_completion_tokens: 1024,
    top_p: 1,
    stream: true,
    stop: null,
  });

  for await (const chunk of chatCompletion) {
    process.stdout.write(chunk.choices[0]?.delta?.content || "");
  }
}

main();
