export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Only POST allowed");

  const { question } = req.body;
  const API_KEY = process.env.OPENROUTER_API_KEY; // استخدم متغير بيئة للحماية

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "qwen/qwen3-0.6b-04-28:free",

        messages: [
          {
            role: "system",
            content: "أنت مساعد شرعي ذكي"
          },
          {
            role: "user",
            content: question
          }
        ]
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "لا يوجد رد";
    res.status(200).json({ result: reply });
  } catch (e) {
    res.status(500).json({ result: "حدث خطأ أثناء الاتصال بالخادم." });
  }
}
