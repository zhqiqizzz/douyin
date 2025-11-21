import { atom } from "jotai";
import type { VideoItem } from "../types";
import { mockVideoData } from "../mock/videoData";

// 视频列表
export const videoListAtom = atom<VideoItem[]>(mockVideoData);

// 当前播放的视频索引
export const currentVideoIndexAtom = atom<number>(0);

// 当前视频（派生状态）
export const currentVideoAtom = atom((get) => {
  const list = get(videoListAtom);
  const index = get(currentVideoIndexAtom);
  return list[index];
});

// 切换到下一个视频
export const nextVideoAtom = atom(null, (get, set) => {
  const list = get(videoListAtom);
  const currentIndex = get(currentVideoIndexAtom);
  const nextIndex = (currentIndex + 1) % list.length;
  set(currentVideoIndexAtom, nextIndex);
});

// 切换到上一个视频
export const prevVideoAtom = atom(null, (get, set) => {
  const list = get(videoListAtom);
  const currentIndex = get(currentVideoIndexAtom);
  const prevIndex = currentIndex === 0 ? list.length - 1 : currentIndex - 1;
  set(currentVideoIndexAtom, prevIndex);
});
