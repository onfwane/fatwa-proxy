export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Only POST allowed");

  const { question } = req.body;
  const API_KEY = "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";

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
          { role: "system", content: "أجب عن الأسئلة الشرعية بدقة، استنادًا للقرآن والسنة وآراء العلماء المعتبرين." },
          { role: "user", content: question }
        ]
      })
    });

    const data = await response.json();
    res.status(200).json({ result: data.choices?.[0]?.message?.content || "لا يوجد رد مناسب." });
  } catch (e) {
    res.status(500).json({ result: "حدث خطأ في الاتصال بالخادم أو معالجة البيانات." });
  }
}
