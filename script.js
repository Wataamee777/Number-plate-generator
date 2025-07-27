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
    // ひらがなチェック
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
      alert(
        `米軍モードでは次の文字のみ使用可能です: ${validRoman.join(", ")}`
      );
      return;
    }
  }

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  // 背景
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 地名（通常フォント）
  ctx.fillStyle = "black";
  ctx.font = "bold 24px sans-serif";
  ctx.fillText(area, 20, 40);

  // 分類番号＋ひらがな or ローマ字（ナンバーフォント）
  ctx.font = "bold 48px NumberFont, sans-serif";
  ctx.fillText(`${classNo} ${kana}`, 20, 90);

  // 一連番号（ナンバーフォントで大きめ）
  ctx.font = "bold 72px NumberFont, sans-serif";
  ctx.fillText(serial, 20, 160);
}

function download() {
  const canvas = document.getElementById("canvas");
  const a = document.createElement("a");
  a.href = canvas.toDataURL("image/png");
  a.download = "numberplate.png";
  a.click();
}
