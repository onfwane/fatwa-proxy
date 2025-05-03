export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).send("Only POST requests are allowed");

  const { question } = req.body;
  const apiKey = process.env.OPENROUTER_API_KEY;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "opengvlab/internvl3-14b:free",
        messages: [
          {
            role: "system",
            content:
              "أجب عن الأسئلة الشرعية بدقة وفق القرآن والسنة وآراء العلماء الموثوقين باللغة العربية الفصحى فقط. ولا تزيد الرد على 10 توكن"
          },
          {
            role: "user",
            content: question
          }
        ]
      })
    });

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content;
    res.status(200).json({ result: result || "لا يوجد رد." });
  } catch (error) {
    res.status(500).json({ result: "حدث خطأ في الاتصال بالخادم." });
  }
}
