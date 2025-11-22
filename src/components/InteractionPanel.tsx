import { useAtom, useSetAtom } from "jotai";
import {
  IconHeartStroked,
  IconComment,
  IconStar,
  IconStarStroked,
  IconForward as IconShare,
  IconMusic,
  IconMoreStroked as IconMore,
  IconSetting,
  IconLikeHeart,
} from "@douyinfe/semi-icons";
import type { VideoItem } from "../types";
import { formatNumber } from "../utils/formatNumber";
import { showSharePanel, reportVideo } from "../utils/shareUtils";
import {
  likedVideosAtom,
  favoritedVideosAtom,
  followedUsersAtom,
  toggleLikeAtom,
  toggleFavoriteAtom,
  toggleFollowAtom,
} from "../store/interactionStore";

interface InteractionPanelProps {
  video: VideoItem;
  onCommentClick?: () => void;
}

function InteractionPanel({ video, onCommentClick }: InteractionPanelProps) {
  // 获取状态
  const [likedVideos] = useAtom(likedVideosAtom);
  const [favoritedVideos] = useAtom(favoritedVideosAtom);
  const [followedUsers] = useAtom(followedUsersAtom);

  // 获取切换函数
  const toggleLike = useSetAtom(toggleLikeAtom);
  const toggleFavorite = useSetAtom(toggleFavoriteAtom);
  const toggleFollow = useSetAtom(toggleFollowAtom);

  // 判断当前状态
  const isLiked = likedVideos.has(video.id);
  const isFavorited = favoritedVideos.has(video.id);
  const isFollowed = followedUsers.has(video.author.id);

  // 点赞处理
  const handleLike = () => {
    toggleLike(video.id);
  };

  // 收藏处理
  const handleFavorite = () => {
    toggleFavorite(video.id);
  };

  // 关注处理
  const handleFollow = () => {
    toggleFollow(video.author.id);
  };

  // 分享处理
  const handleShare = () => {
    showSharePanel(video);
  };

  // 音乐处理
  const handleMusic = () => {
    console.log("查看音乐:", video.music.name);
    alert(`音乐信息\n\n歌曲: ${video.music.name}\n作者: ${video.music.author}`);
  };

  // 更多操作
  const handleMore = () => {
    const choice = confirm(
      `更多操作\n\n视频: ${video.description.slice(0, 30)}...\n作者: ${
        video.author.name
      }\n\n` + "确定：不感兴趣\n取消：举报视频"
    );

    if (choice) {
      console.log("不感兴趣");
      alert("已标记为不感兴趣");
    } else {
      reportVideo(video);
    }
  };

  return (
    <div
      className="w-[72px] flex-shrink-0 flex flex-col justify-center items-center z-10 pointer-events-auto"
      style={{ height: "calc(100% - 4rem)" }}
    >
      <div className="flex flex-col items-center gap-3.5">
        {/* 设置按钮 */}
        <button
          onClick={() => alert("设置功能开发中...")}
          className="w-10 h-10 bg-[#FFFFFF14] backdrop-blur-md rounded-full flex items-center justify-center hover:bg-[#FFFFFF20] transition-all"
        >
          <IconSetting className="text-white text-lg" />
        </button>

        {/* 头像和关注按钮 */}
        <div className="flex flex-col items-center cursor-pointer group">
          <div
            className="w-11 h-11 rounded-full overflow-hidden border-2 border-white shadow-lg transition-transform hover:scale-110"
            onClick={() => alert(`查看 ${video.author.name} 的主页`)}
          >
            <img
              src={video.author.avatar}
              alt={video.author.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* 关注按钮 */}
          {!isFollowed ? (
            <button
              onClick={handleFollow}
              className="w-5 h-5 bg-[#fe2c55] rounded-full flex items-center justify-center -mt-2.5 cursor-pointer hover:scale-110 transition-transform"
            >
              <span className="text-white text-xs font-bold leading-none">
                +
              </span>
            </button>
          ) : (
            <button
              onClick={handleFollow}
              className="w-5 h-5 bg-[#666] rounded-full flex items-center justify-center -mt-2.5 cursor-pointer hover:scale-110 transition-transform"
            >
              <span className="text-white text-xs font-bold leading-none">
                ✓
              </span>
            </button>
          )}
        </div>

        {/* 点赞 */}
        <button
          onClick={handleLike}
          className="flex flex-col items-center cursor-pointer group"
        >
          {isLiked ? (
            <IconLikeHeart className="text-[#fe2c55] text-[28px] drop-shadow-lg group-hover:scale-110 transition-transform animate-pulse" />
          ) : (
            <IconHeartStroked className="text-white text-[28px] drop-shadow-lg group-hover:scale-110 transition-transform" />
          )}
          <span
            className={`text-[11px] mt-0.5 font-medium drop-shadow-lg transition-colors ${
              isLiked ? "text-[#fe2c55]" : "text-white"
            }`}
          >
            {formatNumber(video.stats.likes + (isLiked ? 1 : 0))}
          </span>
        </button>

        {/* 评论 */}
        <button
          onClick={onCommentClick}
          className="flex flex-col items-center cursor-pointer group"
        >
          <IconComment className="text-white text-[28px] drop-shadow-lg group-hover:scale-110 transition-transform" />
          <span className="text-white text-[11px] mt-0.5 font-medium drop-shadow-lg">
            {formatNumber(video.stats.comments)}
          </span>
        </button>

        {/* 收藏 */}
        <button
          onClick={handleFavorite}
          className="flex flex-col items-center cursor-pointer group"
        >
          {isFavorited ? (
            <IconStar className="text-[#FFD700] text-[28px] drop-shadow-lg group-hover:scale-110 transition-transform animate-pulse" />
          ) : (
            <IconStarStroked className="text-white text-[28px] drop-shadow-lg group-hover:scale-110 transition-transform" />
          )}
          <span
            className={`text-[11px] mt-0.5 font-medium drop-shadow-lg transition-colors ${
              isFavorited ? "text-[#FFD700]" : "text-white"
            }`}
          >
            {formatNumber(video.stats.favorites + (isFavorited ? 1 : 0))}
          </span>
        </button>

        {/* 分享 */}
        <button
          onClick={handleShare}
          className="flex flex-col items-center cursor-pointer group"
        >
          <IconShare className="text-white text-[28px] drop-shadow-lg group-hover:scale-110 transition-transform" />
          <span className="text-white text-[11px] mt-0.5 font-medium drop-shadow-lg">
            {formatNumber(video.stats.shares)}
          </span>
        </button>

        {/* 音乐 */}
        <button
          onClick={handleMusic}
          className="flex flex-col items-center cursor-pointer group mt-1"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center group-hover:rotate-[360deg] transition-all duration-700">
            <IconMusic className="text-white text-[20px]" />
          </div>
          <span className="text-white text-[10px] mt-0.5 drop-shadow-lg">
            听抖音
          </span>
        </button>

        {/* 更多 */}
        <button
          onClick={handleMore}
          className="flex flex-col items-center cursor-pointer group"
        >
          <IconMore className="text-white text-[20px] drop-shadow-lg group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </div>
  );
}

export default InteractionPanel;
