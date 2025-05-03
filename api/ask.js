export default async function handler(req, res) {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ result: "⚠️ لا يوجد سؤال مُرسل." });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`, // تأكد من وجود هذا المفتاح في إعدادات Vercel
      },
      body: JSON.stringify({
        model: "openchat/openchat-7b:free", // أو أي موديل تدعمه مجانًا
        messages: [
          { role: "system", content: "أجب عن الأسئلة الشرعية باللغة العربية فقط." },
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();

    if (data.choices && data.choices[0]?.message?.content) {
      res.status(200).json({ result: data.choices[0].message.content });
    } else {
      res.status(500).json({ result: "❌ لم يتم استلام رد من المزود." });
    }
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ result: "🚫 حدث خطأ في الخادم." });
  }
}
