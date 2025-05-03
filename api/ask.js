export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Only POST allowed");

  const { question } = req.body;
  const API_KEY = process.env.OPENROUTER_API_KEY;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "qwen/qwen1.5-0.5b-chat:free",
        messages: [
          { role: "system", content: "أجب عن الأسئلة الشرعية باختصار ودقة، مستندًا إلى القرآن والسنة وآراء العلماء المعتبرين." },
          { role: "user", content: question }
        ]
      })
    });

    const data = await response.json();
    res.status(200).json({ result: data.choices?.[0]?.message?.content || "لا يوجد رد." });
  } catch (e) {
    res.status(500).json({ result: "خطأ في الاتصال بالخادم أو في إعدادات النموذج." });
  }
}
