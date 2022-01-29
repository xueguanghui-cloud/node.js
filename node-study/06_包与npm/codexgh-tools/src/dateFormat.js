// 处理时间
// 定义格式化时间函数dateFormat
function dateFormat(dataStr) {
  var dt  = new Date(dataStr);

  const y = dt.getFullYear();
  const m = padZero(dt.getMonth() + 1);
  const d = padZero(dt.getDate());

  const HH = padZero(dt.getHours());
  const mm = padZero(dt.getMinutes());
  const ss = padZero(dt.getSeconds());

  return `${y}-${m}-${d} ${HH}:${mm}:${ss}`;
}

// 定义补零的函数padZero
function padZero(n) {
  return n = n < 10 ? '0' + n : n;
}

module.exports = {
  dateFormat,
}