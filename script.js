const invalidKanaNormal = ["お", "し", "へ"];
const validRoman = ["Y", "A", "B", "C", "E", "H", "K", "M", "T"];

function generate() {
  const area = document.getElementById("area").value;
  const mode = document.getElementById("mode").value;
  const plateType = document.getElementById("plateType")?.value || "white";
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
  } else {
    kana = kana.toUpperCase();
    if (!validRoman.includes(kana)) {
      alert(`米軍モードでは使用できる文字は: ${validRoman.join(", ")}`);
      return;
    }
  }

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  // キャンバス拡張おすすめ
  canvas.width = 500;
  canvas.height = 150;

  // 色反映
  const bgColor = bgColors[plateType] || "#ffffff";
  const textColor = textColors[plateType] || "#000000";

  // 背景
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 文字色
  ctx.fillStyle = textColor;

  // 地名
  ctx.font = "bold 28px sans-serif";
  ctx.textBaseline = "bottom";
  ctx.fillText(area, 30, 140);

  // 分類番号 + ひらがな（左寄せ）
  ctx.font = "bold 60px NumberFont, sans-serif";
  ctx.textBaseline = "middle";
  ctx.fillText(`${classNo} ${kana}`, 50, 70);

  // 一連番号（右寄せ）
  ctx.font = "bold 70px NumberFont, sans-serif";
  ctx.textBaseline = "bottom";
  const serialWidth = ctx.measureText(serial).width;
  const serialX = canvas.width - serialWidth - 40;
  ctx.fillText(serial, serialX, 140);
}

function download() {
  const canvas = document.getElementById("canvas");
  const a = document.createElement("a");
  a.href = canvas.toDataURL("image/png");
  a.download = "numberplate.png";
  a.click();
}
