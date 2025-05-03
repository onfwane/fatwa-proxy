export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "الطريقة غير مسموحة" });
  }

  const { message } = req.body;

  if (!message || message.trim() === "") {
    return res.status(400).json({ error: "نص السؤال مطلوب" });
  }

  try {
    const apiRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openchat/openchat-7b:free",
        messages: [
          { role: "system", content: "أجب عن الأسئلة الشرعية باللغة العربية فقط" },
          { role: "user", content: message }
        ]
      })
    });

    const data = await apiRes.json();

    if (data.choices && data.choices[0]?.message?.content) {
      return res.status(200).json({ result: data.choices[0].message.content.trim() });
    } else {
      return res.status(500).json({ error: "لم يتم الحصول على رد مناسب من النموذج." });
    }

  } catch (err) {
    console.error("خطأ:", err);
    return res.status(500).json({ error: "فشل في الاتصال بـ OpenRouter." });
  }
}
