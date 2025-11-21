import { useEffect, useRef } from "react";
import Player from "xgplayer";
import "xgplayer/dist/index.min.css";

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
      controls: false, // 隐藏默认控制条
    });

    // 监听播放完成
    playerRef.current.on("ended", () => {
      console.log("视频播放完成");
      onEnded?.();
    });

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
