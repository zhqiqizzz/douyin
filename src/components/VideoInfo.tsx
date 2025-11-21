import type { VideoItem } from "../types";

interface VideoInfoProps {
  video: VideoItem;
}

function VideoInfo({ video }: VideoInfoProps) {
  return (
    <div className="absolute left-4 bottom-16 z-10 max-w-[420px]">
      <div className="text-white space-y-1.5 drop-shadow-2xl">
        {/* 作者名和发布时间 */}
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold">{video.author.name}</h3>
          <span className="text-[11px] text-[#FFFFFFCC]">
            · {video.createTime}
          </span>
        </div>

        {/* 视频描述 */}
        <p className="text-xs leading-relaxed text-[#FFFFFFE6]">
          {video.description}
        </p>

        {/* 话题标签 */}
        <div className="flex flex-wrap gap-1.5 text-[11px]">
          {video.tags.map((tag, index) => (
            <span
              key={index}
              className="text-[#00D7C0] hover:underline cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VideoInfo;
