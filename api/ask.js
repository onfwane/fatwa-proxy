async function askFatwa() {
  const input = document.getElementById("question").value;
  const responseBox = document.getElementById("response");
  responseBox.innerText = "...جاري إرسال السؤال";

  try {
    const res = await fetch("/api/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: input  // ✅ هذا هو التعديل الصحيح
      })
    });

    const data = await res.json();
    responseBox.innerText = data.result || "❌ لم يتم استلام رد.";
  } catch (err) {
    responseBox.innerText = "حدث خطأ أثناء الاتصال بالخادم.";
  }
}
