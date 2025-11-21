import { atom } from "jotai";

// 播放状态
export const isPlayingAtom = atom<boolean>(false);

// 视频当前时间（秒）
export const currentTimeAtom = atom<number>(0);

// 视频总时长（秒）
export const durationAtom = atom<number>(0);

// 音量（0-1）
export const volumeAtom = atom<number>(0.6);

// 是否静音
export const isMutedAtom = atom<boolean>(false);

// ✅ 播放速度
export const playbackRateAtom = atom<number>(1);

// 格式化时间工具函数
function formatTime(seconds: number): string {
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

// 格式化当前时间（派生状态）
export const formattedCurrentTimeAtom = atom((get) => {
  const seconds = get(currentTimeAtom);
  return formatTime(seconds);
});

// 格式化总时长（派生状态）
export const formattedDurationAtom = atom((get) => {
  const seconds = get(durationAtom);
  return formatTime(seconds);
});
