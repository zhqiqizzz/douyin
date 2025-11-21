import { useEffect } from "react";
import { useSetAtom, useAtom } from "jotai";
import { nextVideoAtom, prevVideoAtom } from "../store/videoStore";
import {
  isPlayingAtom,
  volumeAtom,
  currentTimeAtom,
  durationAtom,
} from "../store/playerStore";
import { showCommentsAtom } from "../store/commentStore";

export function useKeyboardShortcuts() {
  const goToNext = useSetAtom(nextVideoAtom);
  const goToPrev = useSetAtom(prevVideoAtom);
  const [isPlaying] = useAtom(isPlayingAtom);
  const [volume, setVolume] = useAtom(volumeAtom);
  const [currentTime] = useAtom(currentTimeAtom);
  const [duration] = useAtom(durationAtom);
  const setShowComments = useSetAtom(showCommentsAtom);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const player = (window as any).player;
      if (!player) return;

      // 如果在输入框中，不处理快捷键
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
        return;
      }

      switch (e.key.toLowerCase()) {
        case " ":
        case "k":
          // 空格或K键：播放/暂停
          e.preventDefault();
          if (isPlaying) {
            player.pause();
          } else {
            player.play();
          }
          break;

        case "arrowup":
          // 上箭头：上一个视频
          e.preventDefault();
          goToPrev();
          break;

        case "arrowdown":
          // 下箭头：下一个视频
          e.preventDefault();
          goToNext();
          break;

        case "arrowleft":
          // 左箭头：后退5秒
          e.preventDefault();
          player.currentTime = Math.max(0, currentTime - 5);
          break;

        case "arrowright":
          // 右箭头：前进5秒
          e.preventDefault();
          player.currentTime = Math.min(duration, currentTime + 5);
          break;

        case "j":
          // J键：后退10秒
          e.preventDefault();
          player.currentTime = Math.max(0, currentTime - 10);
          break;

        case "l":
          // L键：前进10秒
          e.preventDefault();
          player.currentTime = Math.min(duration, currentTime + 10);
          break;

        case "m":
          // M键：静音/取消静音
          e.preventDefault();
          player.volume = player.volume > 0 ? 0 : 0.6;
          break;

        case "+":
        case "=":
          // +键：增加音量
          e.preventDefault();
          player.volume = Math.min(1, volume + 0.1);
          break;

        case "-":
          // -键：减少音量
          e.preventDefault();
          player.volume = Math.max(0, volume - 0.1);
          break;

        case "f":
          // F键：全屏
          e.preventDefault();
          if (player.fullscreen) {
            player.exitFullscreen();
          } else {
            player.getFullscreen();
          }
          break;

        case "c":
          // C键：打开评论
          e.preventDefault();
          setShowComments(true);
          break;

        case "escape":
          // ESC键：关闭评论
          e.preventDefault();
          setShowComments(false);
          break;

        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
          // 数字键：跳转到视频的 n×10% 位置
          e.preventDefault();
          const percent = parseInt(e.key) * 10;
          player.currentTime = (duration * percent) / 100;
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPlaying, volume, currentTime, duration]);
}
