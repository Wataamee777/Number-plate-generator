const invalidKanaNormal = ["お", "し", "へ"];
const validRoman = ["Y", "A", "B", "C", "E", "H", "K", "M", "T"];

function generate() {
  const area = document.getElementById("area").value;
  const mode = document.getElementById("mode").value;
  const classNo = document.getElementById("classNo").value.trim();
  let kana = document.getElementById("kana").value.trim();
  const serial = document.getElementById("serial").value.trim();

  if (!classNo.match(/^\d{3}$/)) {
    alert("分類番号は3桁の数字を入力してください。");
    return;
  }

  if (!serial.match(/^\d{2}-\d{2}$/)) {
    alert("一連番号は「12-34」の形式で入力してください。");
    return;
  }

  if (mode === "normal") {
    if (!kana.match(/^[ぁ-ん]$/)) {
      alert("ひらがな1文字を入力してください。");
      return;
    }
    if (invalidKanaNormal.includes(kana)) {
      alert(`「${kana}」は通常モードでは使用できません。`);
      return;
    }
  } else if (mode === "military") {
    kana = kana.toUpperCase();
    if (!validRoman.includes(kana)) {
      alert(`米軍モードでは次の文字のみ使用可能です: ${validRoman.join(", ")}`);
      return;
    }
  }

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  // 背景クリア
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 地名（左寄せ、下寄せ気味）
  ctx.fillStyle = "black";
  ctx.font = "bold 30px sans-serif";
  ctx.textBaseline = "bottom";
  ctx.fillText(area, 25, 110);

  // 分類番号＋かな（やや左、中央寄せ）
  ctx.font = "bold 70px NumberFont, sans-serif";
  ctx.textBaseline = "middle";
  ctx.fillText(`${classNo} ${kana}`, 110, 70);

  // 一連番号（右寄せ）
  ctx.font = "bold 70px NumberFont, sans-serif";
  ctx.textBaseline = "bottom";
  const serialWidth = ctx.measureText(serial).width;
  const rightMargin = 370; // ここで右寄せ位置調整
  ctx.fillText(serial, rightMargin - serialWidth, 110);
}
