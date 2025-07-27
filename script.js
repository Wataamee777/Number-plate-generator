const invalidKanaNormal = ["お", "し", "へ"];
const validRoman = ["Y", "A", "B", "C", "E", "H", "K", "M", "T"];

function generate() {
  const area = document.getElementById("area").value;
  const mode = document.getElementById("mode").value;
  const plateType = document.getElementById("plateType").value;
  const classNo = document.getElementById("classNo").value.trim();
  let kana = document.getElementById("kana").value.trim();
  const serial = document.getElementById("serial").value.trim();

  const bgColors = {
    white: "#ffffff",
    yellow: "#ffff99",
    green: "#228B22",
    pink: "#ffc0cb",
  };

  const textColors = {
    white: "#000000",
    yellow: "#000000",
    green: "#ffffff",
    pink: "#000000",
  };

  if (!classNo.match(/^\d{2,3}$/)) {
    alert("分類番号は2〜3桁の数字を入力してください。");
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

  const bgColor = bgColors[plateType] || "#ffffff";
  const textColor = textColors[plateType] || "#000000";

  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = textColor;

  // 地名（左下）
  ctx.font = "bold 30px sans-serif";
  ctx.textBaseline = "bottom";
  ctx.fillText(area, 25, 125);

  // 分類番号＋ひらがな（左中央）
  ctx.font = "bold 60px NumberFont, sans-serif";
  ctx.textBaseline = "middle";
  ctx.fillText(`${classNo} ${kana}`, 50, 65); // ←左に寄せた！

  // 一連番号（右寄せ固定）
  ctx.font = "bold 70px NumberFont, sans-serif";
  ctx.textBaseline = "bottom";
  const serialWidth = ctx.measureText(serial).width;
  const serialX = canvas.width - serialWidth - 25; // ←右端から25px内側
  ctx.fillText(serial, serialX, 125); // ←Y位置合わせた
}

function download() {
  const canvas = document.getElementById("canvas");
  const a = document.createElement("a");
  a.href = canvas.toDataURL("image/png");
  a.download = "numberplate.png";
  a.click();
}
