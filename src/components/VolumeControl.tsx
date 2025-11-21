import React, { useState, useEffect, useRef } from "react";
import {
  MdVolumeUp,
  MdVolumeDown,
  MdVolumeMute,
  MdVolumeOff,
} from "react-icons/md";

interface VolumeControlProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
}

const VolumeControl: React.FC<VolumeControlProps> = ({ videoRef }) => {
  const [volume, setVolume] = useState(() => {
    const savedVolume = localStorage.getItem("videoVolume");
    return savedVolume ? parseInt(savedVolume) : 50;
  });

  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(50);
  const [showSlider, setShowSlider] = useState(false);
  const sliderTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    localStorage.setItem("videoVolume", volume.toString());
    if (videoRef?.current) {
      videoRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted, videoRef]);

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return <MdVolumeOff size={20} />;
    if (volume < 30) return <MdVolumeMute size={20} />;
    if (volume < 70) return <MdVolumeDown size={20} />;
    return <MdVolumeUp size={20} />;
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      if (volume === 0) {
        setVolume(previousVolume || 50);
      }
    } else {
      setPreviousVolume(volume);
      setIsMuted(true);
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        if (sliderTimeoutRef.current) {
          clearTimeout(sliderTimeoutRef.current);
        }
        setShowSlider(true);
      }}
      onMouseLeave={() => {
        sliderTimeoutRef.current = setTimeout(() => {
          setShowSlider(false);
        }, 100);
      }}
      onWheel={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const delta = e.deltaY > 0 ? -5 : 5;
        setVolume((prev) => {
          const newVolume = Math.max(0, Math.min(100, prev + delta));
          if (newVolume > 0) setIsMuted(false);
          if (newVolume === 0) setIsMuted(true);
          return newVolume;
        });
      }}
    >
      <button
        className="text-[#837f7fa6] group-hover:text-white text-sm font-bold px-2 py-1 rounded transition-all"
        onClick={toggleMute}
      >
        {getVolumeIcon()}
      </button>

      {/* 音量滑块弹出面板 */}
      {showSlider && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2">
          <div className="p-3 bg-[#1a1a1a] rounded flex flex-col items-center shadow-xl">
            <div className="text-center text-white text-sm font-semibold mb-3">
              {isMuted ? 0 : volume}
            </div>
            {/* 自定义垂直滑块 */}
            <div
              className="relative h-[120px] w-6 flex items-center justify-center cursor-pointer"
              onMouseDown={(e) => {
                e.preventDefault();
                const sliderTrack = e.currentTarget.querySelector(
                  ".slider-track"
                ) as HTMLElement;
                if (!sliderTrack) return;

                const updateVolume = (clientY: number) => {
                  const rect = sliderTrack.getBoundingClientRect();
                  const y = rect.bottom - clientY;
                  const percent = Math.max(
                    0,
                    Math.min(100, (y / rect.height) * 100)
                  );
                  setVolume(Math.round(percent));
                  if (percent > 0) setIsMuted(false);
                  if (percent === 0) setIsMuted(true);
                };

                updateVolume(e.clientY);

                const handleMouseMove = (moveEvent: MouseEvent) => {
                  updateVolume(moveEvent.clientY);
                };

                const handleMouseUp = () => {
                  document.removeEventListener("mousemove", handleMouseMove);
                  document.removeEventListener("mouseup", handleMouseUp);
                };

                document.addEventListener("mousemove", handleMouseMove);
                document.addEventListener("mouseup", handleMouseUp);
              }}
            >
              {/* 滑块轨道 */}
              <div className="slider-track relative h-full w-1 bg-gray-600 rounded-full">
                {/* 底部红色部分 */}
                <div
                  className="absolute bottom-0 w-full bg-red-500 rounded-full transition-all duration-100"
                  style={{ height: `${isMuted ? 0 : volume}%` }}
                />
                {/* 白色圆点滑块 */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full shadow-lg transition-all duration-100"
                  style={{ bottom: `calc(${isMuted ? 0 : volume}% - 6px)` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VolumeControl;
