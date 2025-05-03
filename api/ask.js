export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Only POST allowed");

  const { question } = req.body;
  const API_KEY = process.env.OPENROUTER_API_KEY; // استخدم من المتغيرات البيئية إن كنت أضفتها في Vercel

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
    content: "أنت مساعد شرعي ذكي. أجب على الأسئلة الشرعية فقط باللغة العربية الفصحى، بدقة وموضوعية، استنادًا للقرآن الكريم والسنة النبوية وآراء العلماء الموثوقين. تجنب أي لغة أو رموز غير عربية."
  },
  {
    role: "user",
    content: question
  }
]

      })
    });

    const data = await response.json();

    const answer = data.choices?.[0]?.message?.content;
    if (!answer) {
      return res.status(200).json({ result: "لا يوجد رد من النموذج." });
    }

    res.status(200).json({ result: answer });

  } catch (e) {
    console.error("خطأ:", e);
    res.status(500).json({ result: "حدث خطأ في الاتصال بـ OpenRouter." });
  }
}
