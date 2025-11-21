import { useEffect, useRef } from "react";
import { useSetAtom } from "jotai";
import Player from "xgplayer";
import "xgplayer/dist/index.min.css";
import {
  isPlayingAtom,
  currentTimeAtom,
  durationAtom,
  volumeAtom,
  playbackRateAtom,
} from "../store/playerStore";

interface VideoPlayerProps {
  videoUrl: string;
  coverUrl: string;
  videoId: string;
  onEnded?: () => void;
}

function VideoPlayer({
  videoUrl,
  coverUrl,
  videoId,
  onEnded,
}: VideoPlayerProps) {
  const playerRef = useRef<Player | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 状态更新函数
  const setIsPlaying = useSetAtom(isPlayingAtom);
  const setCurrentTime = useSetAtom(currentTimeAtom);
  const setDuration = useSetAtom(durationAtom);
  const setVolume = useSetAtom(volumeAtom);
  const setPlaybackRate = useSetAtom(playbackRateAtom);

  useEffect(() => {
    if (!containerRef.current) return;

    // 销毁旧播放器
    if (playerRef.current) {
      playerRef.current.destroy();
    }

    // 创建新播放器
    playerRef.current = new Player({
      el: containerRef.current,
      url: videoUrl,
      poster: coverUrl,
      autoplay: true,
      loop: false,
      volume: 0.6,
      width: "100%",
      height: "100%",
      fitVideoSize: "fixHeight",
      fluid: true,
      controls: false, // 使用自定义控制栏
      playbackRate: [0.5, 0.75, 1, 1.25, 1.5, 2],
    });

    const player = playerRef.current;

    // 监听播放事件
    player.on("play", () => {
      console.log("▶️ 播放");
      setIsPlaying(true);
    });

    // 监听暂停事件
    player.on("pause", () => {
      console.log("⏸️ 暂停");
      setIsPlaying(false);
    });

    // 监听时间更新
    player.on("timeupdate", () => {
      setCurrentTime(player.currentTime);
    });

    // 监听视频加载完成
    player.on("loadedmetadata", () => {
      setDuration(player.duration);
      console.log(`📹 视频时长: ${Math.floor(player.duration)}秒`);
    });

    // 监听音量变化
    player.on("volumechange", () => {
      setVolume(player.volume);
    });

    // 监听倍速变化
    player.on("ratechange", () => {
      setPlaybackRate(player.playbackRate);
    });

    // 监听播放完成
    player.on("ended", () => {
      console.log("✅ 播放完成");
      setIsPlaying(false);
      onEnded?.();
    });

    // 监听错误
    player.on("error", (error: any) => {
      console.error("❌ 视频加载失败:", error);
    });

    // 暴露 player 实例到全局（方便调试和外部控制）
    (window as any).player = player;

    // 清理
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [videoId]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: "#000" }}
    />
  );
}

export default VideoPlayer;
