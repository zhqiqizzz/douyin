/**
 * 格式化数字显示
 * @param num 数字
 * @returns 格式化后的字符串（如 28000 -> "2.8万"）
 */
export function formatNumber(num: number): string {
  if (num >= 100000000) {
    // 超过1亿
    return (num / 100000000).toFixed(1) + "亿";
  } else if (num >= 10000) {
    // 超过1万
    return (num / 10000).toFixed(1) + "万";
  } else if (num >= 1000) {
    // 超过1千
    return (num / 1000).toFixed(1) + "k";
  }
  return num.toString();
}

/**
 * 格式化时间显示
 * @param dateString 时间字符串
 * @returns 相对时间（如 "2小时前"）
 */
export function formatTime(dateString: string): string {
  // 如果已经是相对时间格式，直接返回
  if (
    dateString.includes("前") ||
    dateString.includes("天") ||
    dateString.includes("月")
  ) {
    return dateString;
  }

  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) return `${years}年前`;
  if (months > 0) return `${months}个月前`;
  if (days > 0) return `${days}天前`;
  if (hours > 0) return `${hours}小时前`;
  if (minutes > 0) return `${minutes}分钟前`;
  return "刚刚";
}

/**
 * 格式化视频时长
 * @param seconds 秒数
 * @returns 格式化后的时长（如 "10:25"）
 */
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}
