async function classifyMood() {
  const input = document.getElementById("songInput").value;
  const resultDiv = document.getElementById("result");

  if (!input.trim()) {
    resultDiv.textContent = "⚠️ Please enter a song.";
    return;
  }

  resultDiv.textContent = "🎶 Thinking...";

  try {
    const response = await fetch("/api/song-recommendation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ song: input }),
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    const data = await response.json();
    resultDiv.textContent = `🎧 Recommendation: ${data.result}`;
  } catch (error) {
    console.error("Error fetching recommendation:", error);
    resultDiv.textContent = "❌ Something went wrong. Please try again later.";
  }
}
