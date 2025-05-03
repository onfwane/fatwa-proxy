export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Only POST allowed");
  }

  const { question } = req.body;
  const API_KEY = "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"; // غيّره إذا احتجت

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistralai/mistral-nemo:free",
        messages: [
          {
            role: "system",
            content: "أجب عن الأسئلة الشرعية بدقة، استنادًا للقرآن والسنة وآراء العلماء المعتبرين."
          },
          {
            role: "user",
            content: question
          }
        ]
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "لم يتم الحصول على رد مناسب.";
    res.status(200).json({ result: reply });

  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ result: "حدث خطأ أثناء الاتصال بـ OpenRouter" });
  }
}
