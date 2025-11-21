import type { VideoItem } from "../types";

/**
 * 分享到微信
 */
export function shareToWeChat(video: VideoItem) {
  const text = `【抖音】${video.description}\n来自 ${video.author.name}`;
  console.log("分享到微信:", text);

  // 实际项目中调用微信分享API
  alert("分享到微信功能开发中...\n" + text);
}

/**
 * 分享到QQ
 */
export function shareToQQ(video: VideoItem) {
  const text = `【抖音】${video.description}`;
  console.log("分享到QQ:", text);

  alert("分享到QQ功能开发中...\n" + text);
}

/**
 * 复制链接
 */
export function copyLink(video: VideoItem) {
  const link = `https://www.douyin.com/video/${video.id}`;

  // 复制到剪贴板
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        console.log("链接已复制:", link);
        alert("链接已复制到剪贴板！");
      })
      .catch((err) => {
        console.error("复制失败:", err);
        alert("复制失败，请手动复制:\n" + link);
      });
  } else {
    // 兼容旧浏览器
    const textarea = document.createElement("textarea");
    textarea.value = link;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    alert("链接已复制到剪贴板！");
  }
}

/**
 * 下载视频
 */
export function downloadVideo(video: VideoItem) {
  console.log("下载视频:", video.id);

  // 创建下载链接
  const a = document.createElement("a");
  a.href = video.videoUrl;
  a.download = `${video.author.name}_${video.id}.mp4`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  console.log("开始下载视频");
}

/**
 * 举报视频
 */
export function reportVideo(video: VideoItem) {
  console.log("举报视频:", video.id);
  alert("举报功能开发中...\n您可以举报不当内容");
}

/**
 * 显示分享面板
 */
export function showSharePanel(video: VideoItem) {
  const options = [
    { name: "微信", icon: "💬", action: () => shareToWeChat(video) },
    { name: "QQ", icon: "🐧", action: () => shareToQQ(video) },
    { name: "复制链接", icon: "🔗", action: () => copyLink(video) },
    { name: "下载", icon: "📥", action: () => downloadVideo(video) },
  ];

  // 简易版：使用 confirm
  const choice = prompt(
    "选择分享方式:\n" +
      options.map((opt, i) => `${i + 1}. ${opt.icon} ${opt.name}`).join("\n") +
      "\n\n输入数字选择 (1-4):"
  );

  const index = parseInt(choice || "0") - 1;
  if (index >= 0 && index < options.length) {
    options[index].action();
  }
}
