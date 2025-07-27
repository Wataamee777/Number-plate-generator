const invalidKanaNormal = ["お", "し", "へ"];
const validRoman = ["Y", "A", "B", "C", "E", "H", "K", "M", "T"];

function generate() {
  const area = document.getElementById("area").value;
  const mode = document.getElementById("mode").value;
  const plateType = document.getElementById("plateType").value;
  const classNo = document.getElementById("classNo").value.trim();
  let kana = document.getElementById("kana").value.trim();
  const serial = document.getElementById("serial").value.trim();

  // プレート背景色・文字色
  const bgColors = {
    white: "#ffffff",   // 自家用普通
    yellow: "#ffff99",  // 軽自動車
    green: "#228B22",   // 事業用
    pink: "#ffc0cb",    // バイク
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

  // 背景塗りつぶし
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // テキスト色セット
  ctx.fillStyle = textColor;

  // 地名（左下寄せ）
  ctx.font = "bold 30px sans-serif";
  ctx.textBaseline = "bottom";
  ctx.fillText(area, 25, 125);

  // 分類番号＋ひらがな（中央寄せ）
  ctx.font = "bold 70px NumberFont, sans-serif";
  ctx.textBaseline = "middle";
  ctx.fillText(`${classNo} ${kana}`, 130, 70);

  // 一連番号（やや右寄せ、中央下寄せ）
  ctx.font = "bold 70px NumberFont, sans-serif";
  ctx.textBaseline = "bottom";
  const serialWidth = ctx.measureText(serial).width;
  const serialX = 260; // 左端固定で整える
  ctx.fillText(serial, serialX, 125);
}

function download() {
  const canvas = document.getElementById("canvas");
  const a = document.createElement("a");
  a.href = canvas.toDataURL("image/png");
  a.download = "numberplate.png";
  a.click();
}
