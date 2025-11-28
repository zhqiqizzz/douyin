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
      console.log("播放");
      setIsPlaying(true);
    });

    // 监听暂停事件
    player.on("pause", () => {
      console.log("暂停");
      setIsPlaying(false);
    });

    // 监听时间更新
    player.on("timeupdate", () => {
      setCurrentTime(player.currentTime);
    });

    // 监听视频加载完成
    player.on("loadedmetadata", () => {
      setDuration(player.duration);
      console.log(`视频时长: ${Math.floor(player.duration)}秒`);
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
      console.log("播放完成");
      setIsPlaying(false);
      onEnded?.();
    });

    // 监听错误
    player.on("error", (error: any) => {
      console.error("视频加载失败:", error);
    });

    // 暴露 player 实例到全局（方便调试和外部控制）
    (window as any).player = player;

    // --- 动态背景绘制逻辑 ---
    let animationFrameId: number;

    // 始终在播放器内部创建 canvas，以支持全屏模式
    const canvas = document.createElement("canvas");
    // 模仿 Home.tsx 中的样式，放大 canvas 以避免边缘模糊问题
    canvas.className =
      "absolute inset-[-20%] w-[140%] h-[140%] object-cover blur-[80px] scale-125 pointer-events-none bg-cover bg-center bg-no-repeat";
    canvas.style.backgroundImage = `url(${coverUrl})`;
    canvas.style.filter = "brightness(0.6)";
    canvas.style.zIndex = "0";
    canvas.style.position = "absolute";

    // 插入到播放器容器的最前面
    if (player.root) {
      player.root.insertBefore(canvas, player.root.firstChild);
      // 确保播放器容器 overflow hidden，否则放大的背景会溢出
      player.root.style.overflow = "hidden";
    }

    // 确保视频元素在背景之上
    if (player.video) {
      const videoElement = player.video as HTMLElement;
      videoElement.style.zIndex = "1";
      // 某些情况下 xgplayer 会重置样式，这里强制一下
      videoElement.style.position = "absolute";
    }

    const ctx = canvas.getContext("2d", { alpha: false });
    // 设置低分辨率以提高性能，模糊后看不出区别
    canvas.width = 60;
    canvas.height = 60;

    const render = () => {
      if (player.video && ctx) {
        // 即使暂停也绘制，以支持拖动进度条时的背景更新
        // 只有当视频有数据时才绘制
        const videoElement = player.video as HTMLVideoElement;
        if (videoElement.readyState >= 2) {
          ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        }
      }
      animationFrameId = requestAnimationFrame(render);
    };
    render();
    // -----------------------

    // 清理
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      // 移除 canvas
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [videoId]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full mx-auto relative z-10 !bg-transparent"
    />
  );
}

export default VideoPlayer;
