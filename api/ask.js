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
    res.status(200).json(data);
  } catch (e) {
res.status(200).json({ result: data.choices?.[0]?.message?.content || "لا يوجد رد" });
  }
}
