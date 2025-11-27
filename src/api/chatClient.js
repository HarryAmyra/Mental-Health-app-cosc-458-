export async function askAthleteAssistant({ messages, userProfile }) {
  const res = await fetch("/api/athlete-assistant", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, userProfile }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || "Chat request failed – is the server running?");
  }

  const data = await res.json();
  return data.reply;
}
