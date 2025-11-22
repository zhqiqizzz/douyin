import { IconPlay, IconPause } from "@douyinfe/semi-icons";
import {
  MdPictureInPicture,
  MdWatchLater,
  MdAspectRatio,
  MdCropFree,
} from "react-icons/md";
import { Switch, Tooltip, Slider } from "@douyinfe/semi-ui";
import { useAtom } from "jotai";
import {
  isPlayingAtom,
  currentTimeAtom,
  durationAtom,
  formattedCurrentTimeAtom,
  formattedDurationAtom,
  playbackRateAtom,
} from "../store/playerStore";
import VolumeControl from "./VolumeControl";
import { useRef } from "react";
import { Dropdown } from "@douyinfe/semi-ui";
import { useState } from "react";
interface VideoControlsProps {
  autoPlayChecked: boolean;
  onAutoPlayChange: (checked: boolean) => void;
  clearScreenChecked: boolean;
  onClearScreenChange: (checked: boolean) => void;
}

function VideoControls({
  autoPlayChecked,
  onAutoPlayChange,
  clearScreenChecked,
  onClearScreenChange,
}: VideoControlsProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying] = useAtom(isPlayingAtom);
  const [currentTime, setCurrentTime] = useAtom(currentTimeAtom);
  const [duration] = useAtom(durationAtom);
  const [formattedCurrentTime] = useAtom(formattedCurrentTimeAtom);
  const [formattedDuration] = useAtom(formattedDurationAtom);
  const [playbackRate, setPlaybackRate] = useAtom(playbackRateAtom);

  // 播放/暂停切换
  const togglePlay = () => {
    const player = (window as any).player;
    if (player) {
      if (isPlaying) {
        player.pause();
      } else {
        player.play();
      }
    }
  };

  // 进度条拖动
  const handleProgressChange = (value: number | number[] | undefined) => {
    const player = (window as any).player;
    if (player && duration > 0 && typeof value === "number") {
      const newTime = (value / 100) * duration;
      player.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // 倍速选项
  const speeds = [
    { label: "0.5x", value: 0.5 },
    { label: "0.75x", value: 0.75 },
    { label: "1.0x", value: 1 },
    { label: "1.25x", value: 1.25 },
    { label: "1.5x", value: 1.5 },
    { label: "2.0x", value: 2 },
  ];

  // 倍速切换（改用 Dropdown）
  const handleSpeedChange = (value: number) => {
    const player = (window as any).player;
    if (player) {
      player.playbackRate = value;
      setPlaybackRate(value);
    }
  };

  // 网页全屏
  const handleWebFullscreen = () => {
    const container = document.querySelector(
      ".flex-1.overflow-hidden.flex.flex-row"
    );
    if (container) {
      if (!document.fullscreenElement) {
        (container as any).requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  };

  // 浏览器全屏
  const handleFullscreen = () => {
    const player = (window as any).player;
    if (player) {
      if (player.fullscreen) {
        player.exitFullscreen();
      } else {
        player.getFullscreen();
      }
    }
  };

  // 画中画
  const handlePictureInPicture = () => {
    const player = (window as any).player;
    if (player && player.video) {
      if (document.pictureInPictureElement) {
        document.exitPictureInPicture();
      } else {
        player.video.requestPictureInPicture().catch((err: any) => {
          console.error("画中画失败:", err);
        });
      }
    }
  };

  // 计算进度百分比
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  // 清晰度状态
  const [quality, setQuality] = useState("智能");

  const qualities = [
    { label: "超清 1080P", value: "1080p" },
    { label: "高清 720P", value: "720p" },
    { label: "标清 540P", value: "540p" },
    { label: "智能", value: "auto" },
  ];
  // 清晰度切换
  const handleQualityChange = (label: string, value: string) => {
    setQuality(label);
    console.log("切换清晰度:", value);
  };

  return (
    <div
      className="absolute bottom-4 rounded-b-2xl bg-[#1b1b1d] backdrop-blur-md flex flex-col px-4 z-40 transition-colors peer-hover:bg-black hover:bg-black group peer-hover:[&_*]:!text-white"
      style={{
        left: "0",
        right: "64px",
        paddingTop: "0",
        paddingBottom: "8px",
      }}
    >
      {/* 进度条 */}
      <div className="w-full -mt-1">
        <Slider
          value={progress}
          onChange={handleProgressChange}
          size="small"
          tooltipVisible={false}
          className="video-progress-slider"
        />
      </div>

      {/* 控制按钮 */}
      <div className="flex items-center justify-between">
        {/* 左侧播放控制 */}
        <div className="flex items-center gap-3">
          <button
            onClick={togglePlay}
            className="text-[#837f7fa6] group-hover:text-white hover:scale-110 transition-all"
          >
            {isPlaying ? (
              <IconPause size="default" />
            ) : (
              <IconPlay size="default" />
            )}
          </button>

          <span className="text-[#837f7fa6] group-hover:text-white text-sm font-bold transition-colors">
            {formattedCurrentTime} / {formattedDuration}
          </span>

          {/* 弹幕输入框 */}
          <div className="relative flex-1 max-w-[300px]">
            <input
              type="text"
              placeholder="发一条友好的弹幕吧"
              className="w-full bg-[#FFFFFF14] text-[#363741] placeholder-[#FFFFFFA6] pl-3 pr-10 py-1.5 rounded-full outline-none focus:bg-[#FFFFFF1F] transition-colors text-xs border border-[#FFFFFF1A]"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-[#FFFFFFA6] hover:text-white transition-colors">
              😊
            </button>
          </div>
        </div>

        {/* 右侧功能按钮 */}
        <div className="flex items-center gap-2">
          <Tooltip content="自动连播 K" showArrow={false}>
            <button
              className="text-[#837f7fa6] flex items-center gap-2 group-hover:text-white text-sm font-bold px-2 py-1 rounded transition-all"
              onClick={() => onAutoPlayChange(!autoPlayChecked)}
            >
              <Switch
                checked={autoPlayChecked}
                size="small"
                aria-label="连播开关"
                style={{
                  backgroundColor: autoPlayChecked ? "#fe2c55" : "#d9d9d9",
                }}
              />
              <span>连播</span>
            </button>
          </Tooltip>
          <Tooltip content="清屏 J" showArrow={false}>
            <button
              onClick={() => onClearScreenChange(!clearScreenChecked)}
              className="flex items-center gap-2 text-[#837f7fa6] group-hover:text-white text-sm font-bold px-2 py-1 rounded transition-all"
            >
              <Switch
                checked={clearScreenChecked}
                size="small"
                aria-label="清屏开关"
                style={{
                  backgroundColor: clearScreenChecked ? "#fe2c55" : "#d9d9d9",
                }}
              />
              <span>清屏</span>
            </button>
          </Tooltip>
          {/* 清晰度选择器 */}
          <Dropdown
            className="!bg-[#5e5c5c]"
            trigger="hover"
            position="top"
            render={
              <Dropdown.Menu>
                {qualities.map((item) => (
                  <Dropdown.Item
                    className="!text-[#a7a1a1]"
                    key={item.value}
                    active={quality === item.label} // 高亮当前选中项
                    onClick={() => handleQualityChange(item.label, item.value)}
                    style={{
                      color: quality === item.label ? "#fff font-bold" : "#fff",
                      backgroundColor:
                        quality === item.label ? "#ffffff0a" : "transparent",
                    }}
                  >
                    {item.label}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            }
          >
            <button className="text-[#837f7fa6] group-hover:text-white text-sm font-bold px-2 py-1 rounded transition-all">
              {quality}
            </button>
          </Dropdown>

          {/* 倍速选择器 */}
          <Dropdown
            trigger="hover"
            position="top"
            render={
              <Dropdown.Menu className="!bg-[#5e5c5c] !border-none !p-2">
                {speeds.map((item) => (
                  <Dropdown.Item
                    key={item.value}
                    onClick={() => handleSpeedChange(item.value)}
                    className="!p-0 !bg-transparent"
                  >
                    <span
                      className={`
                      block w-full px-4 py-2 text-center rounded mb-1 last:mb-0
                      transition-all cursor-pointer
                      ${
                        playbackRate === item.value
                          ? "bg-[#ffffff0a] text-[#fff]"
                          : "border border-transparent hover:bg-[#ffffff0a] text-[#a7a1a1]"
                      }
                    `}
                    >
                      {item.label}
                    </span>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            }
          >
            <button className="text-[#837f7fa6] group-hover:text-white text-sm font-bold px-2 py-1 rounded transition-all">
              {playbackRate === 1 ? "倍速" : `${playbackRate}x`}
            </button>
          </Dropdown>
          <Tooltip content="稍后再看" showArrow={false}>
            <button className="text-[#837f7fa6] group-hover:text-white text-sm font-bold px-2 py-1 rounded transition-all">
              <MdWatchLater size={20} />
            </button>
          </Tooltip>

          <Tooltip content="小窗模式" showArrow={false}>
            <button
              onClick={handlePictureInPicture}
              className="text-[#837f7fa6] group-hover:text-white text-sm font-bold px-2 py-1 rounded transition-all"
            >
              <MdPictureInPicture size={20} />
            </button>
          </Tooltip>

          <VolumeControl videoRef={videoRef} />

          <Tooltip content="网页全屏" showArrow={false}>
            <button
              onClick={handleWebFullscreen}
              className="text-[#837f7fa6] group-hover:text-white text-sm font-bold px-2 py-1 rounded transition-all"
            >
              <MdAspectRatio size={20} />
            </button>
          </Tooltip>

          <Tooltip content="进入全屏 F" showArrow={false}>
            <button
              onClick={handleFullscreen}
              className="text-[#837f7fa6] group-hover:text-white text-sm font-bold px-2 py-1 rounded transition-all"
            >
              <MdCropFree size={20} />
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default VideoControls;
