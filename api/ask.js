export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Only POST allowed");

  const { messages } = req.body;

  const API_KEY = process.env.OPENROUTER_API_KEY; // استخدم متغير بيئة لحماية المفتاح

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "opengvlab/internvl3-14b:free", // نموذج جيد ومجاني ويدعم العربية
        messages
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "لا يوجد رد.";
    res.status(200).json({ result: reply });
  } catch (e) {
    console.error("خطأ في الاتصال:", e);
    res.status(500).json({ result: "حدث خطأ أثناء الاتصال بالخادم." });
  }
}
