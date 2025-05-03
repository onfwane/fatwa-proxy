export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Only POST allowed");
  }

  const { question } = req.body;
  const API_KEY = "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"; // استبدله بمفتاحك من OpenRouter

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://onfwane.github.io/fatwa-proxy/", // اختياري للتصنيف
        "X-Title": "Fatwa AI Helper" // اختياري للتصنيف
      },
      body: JSON.stringify({
        model: "mistral/mistral-8b",
        messages: [
          {
            role: "system",
            content: "أجب عن الأسئلة الشرعية بدقة ووضوح استنادًا إلى القرآن والسنة وآراء العلماء المعتبرين."
          },
          {
            role: "user",
            content: question
          }
        ]
      })
    });

    const data = await response.json();
    res.status(200).json({ result: data.choices?.[0]?.message?.content || "لا يوجد رد." });
  } catch (error) {
    res.status(500).send("فشل الاتصال بالخادم.");
  }
}
