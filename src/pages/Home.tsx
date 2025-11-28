import {
  IconHome,
  IconStar,
  IconUserGroup,
  IconUser,
  IconLive,
  IconVideoListStroked,
  IconDesktop,
  IconChevronUp,
  IconChevronDown,
  IconSetting,
  IconGridSquare,
  IconHelpCircle,
  IconBell,
  IconMail,
  IconGift,
  IconCamera,
  IconAIStrokedLevel1,
  IconRefresh2,
  IconCrown,
} from "@douyinfe/semi-icons";
import { GrUserExpert } from "react-icons/gr";
import VideoControls from "../components/VideoControl";
import React, { useRef } from "react";
import { useState } from "react";
import { useAtom, useSetAtom } from "jotai";
import {
  currentVideoAtom,
  nextVideoAtom,
  prevVideoAtom,
} from "../store/videoStore";
import VideoPlayer from "../components/VideoPlayer";
import InteractionPanel from "../components/InteractionPanel";
import VideoInfo from "../components/VideoInfo";
import CommentDrawer from "../components/CommentDrawer";
import { showCommentsAtom } from "../store/commentStore";
import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts";
import SearchBar from "../components/SearchBar";

function Home() {
  const [autoPlayChecked, setAutoPlayChecked] = React.useState(false);
  const [clearScreenChecked, setClearScreenChecked] = React.useState(false);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  // 视频状态管理
  const [currentVideo] = useAtom(currentVideoAtom);
  const goToNext = useSetAtom(nextVideoAtom);
  const goToPrev = useSetAtom(prevVideoAtom);
  useKeyboardShortcuts();

  // 视频播放完成
  const handleVideoEnded = () => {
    if (autoPlayChecked) {
      goToNext();
    }
  };

  // 评论区状态
  const setShowComments = useSetAtom(showCommentsAtom);
  // 修改评论区
  const handleCommentClick = () => {
    setShowComments(true);
  };

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefreshVideos = async () => {
    setIsRefreshing(true);
    try {
      console.log("刷新视频列表...");
      // TODO: 调用 API 刷新视频
      // await fetchNewVideos();
    } catch (error) {
      console.error("刷新失败:", error);
    } finally {
      setTimeout(() => {
        setIsRefreshing(false);
      }, 1000);
    }
  };
  return (
    <div className="w-screen h-screen bg-[#16181F] overflow-hidden flex">
      {/* 左侧导航栏 */}
      <aside className="w-[150px] bg-[#16181F] flex flex-col py-4 flex-shrink-0">
        <div className="flex items-center mb-4 px-2 justify-center cursor-pointer">
          <img
            src="https://p-pc-weboff.byteimg.com/tos-cn-i-9r5gewecjs/favicon.png"
            alt="抖音图标"
            className="w-9 h-9 mix-blend-lighten"
          />
          <span className="text-white font-bold mt-1 ml-1 text-[20px] font-sans tracking-widest">
            抖音
          </span>
        </div>
        {/* 导航选项 */}
        <nav className="flex-1 flex flex-col items-center gap-1 px-2">
          {/* 精选 */}
          <div className="w-full flex flex-row items-center gap-3 py-3 px-4 text-[#FFFFFFA6] hover:text-white hover:bg-[#FFFFFF0A] rounded-xl cursor-pointer transition-all">
            <IconHome size="default" style={{ fontSize: 16, color: "white" }} />
            <span className="text-[15px] font-light tracking-wide">精选</span>
          </div>
          {/* 推荐 */}
          <div className="relative group/recommend">
            <div className="w-full flex flex-row items-center gap-3 py-3 px-4 text-white bg-[#FFFFFF1A] rounded-xl cursor-pointer transition-all hover:bg-[#FFFFFF25]">
              <IconStar
                size="default"
                style={{ fontSize: 16, color: "white" }}
              />
              <span className="text-[15px] font-light tracking-wide flex-1">
                推荐
              </span>

              {/* 刷新按钮 */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // 防止触发外层点击
                  handleRefreshVideos();
                }}
                disabled={isRefreshing}
                className={`
                opacity-0 group-hover/recommend:opacity-100
                transition-all duration-200
                w-7 h-7 rounded-full
                flex items-center justify-center
                bg-[#FFFFFF1A] hover:bg-[#FFFFFF33]
                active:scale-95
                ${isRefreshing ? "animate-spin opacity-100" : ""}
              `}
              >
                <IconRefresh2 style={{ fontSize: 14, color: "white" }} />
              </button>
            </div>
          </div>
          {/* AI抖音 */}
          <div className="w-full flex flex-row items-center gap-3 py-3 px-4 text-[#FFFFFFA6] hover:text-white hover:bg-[#FFFFFF0A] rounded-xl cursor-pointer transition-all">
            <IconAIStrokedLevel1
              size="default"
              style={{ fontSize: 16, color: "white" }}
            />
            <span className="text-[15px] font-light tracking-wide">AI抖音</span>
          </div>
          {/* 分割线 */}
          <div className="w-full h-[1px] bg-[#FFFFFF14] my-1"></div>
          {/* 关注 */}
          <div className="w-full flex flex-row items-center gap-3 py-3 px-4 text-[#FFFFFFA6] hover:text-white hover:bg-[#FFFFFF0A] rounded-xl cursor-pointer transition-all">
            <GrUserExpert style={{ fontSize: 16, color: "white" }} />
            <span className="text-[15px] font-light tracking-wide">关注</span>
          </div>
          {/* 朋友 */}
          <div className="w-full flex flex-row items-center gap-3 py-3 px-4 text-[#FFFFFFA6] hover:text-white hover:bg-[#FFFFFF0A] rounded-xl cursor-pointer transition-all">
            <IconUserGroup
              size="default"
              style={{ fontSize: 16, color: "white" }}
            />
            <span className="text-[15px] font-light tracking-wide">朋友</span>
          </div>
          {/* 我的 */}
          <div className="w-full flex flex-row items-center gap-3 py-3 px-4 text-[#FFFFFFA6] hover:text-white hover:bg-[#FFFFFF0A] rounded-xl cursor-pointer transition-all">
            <IconUser size="default" style={{ fontSize: 16, color: "white" }} />
            <span className="text-[15px] font-light tracking-wide">我的</span>
          </div>
          {/* 分割线 */}
          <div className="w-full h-[1px] bg-[#FFFFFF14] my-1"></div>
          {/* 直播 */}
          <div className="w-full flex flex-row items-center gap-3 py-3 px-4 text-[#FFFFFFA6] hover:text-white hover:bg-[#FFFFFF0A] rounded-xl cursor-pointer transition-all">
            <IconLive size="default" style={{ fontSize: 16, color: "white" }} />
            <span className="text-[15px] font-light tracking-wide">直播</span>
          </div>
          {/* 放映厅 */}
          <div className="w-full flex flex-row items-center gap-3 py-3 px-4 text-[#FFFFFFA6] hover:text-white hover:bg-[#FFFFFF0A] rounded-xl cursor-pointer transition-all">
            <IconDesktop
              size="default"
              style={{ fontSize: 16, color: "white" }}
            />
            <span className="text-[15px] font-light tracking-wide">放映厅</span>
          </div>
          {/* 短剧 */}
          <div className="w-full flex flex-row items-center gap-3 py-3 px-4 text-[#FFFFFFA6] hover:text-white hover:bg-[#FFFFFF0A] rounded-xl cursor-pointer transition-all">
            <IconVideoListStroked
              size="default"
              style={{ fontSize: 16, color: "white" }}
            />
            <span className="text-[15px] font-light tracking-wide">短剧</span>
          </div>
        </nav>
        {/* 底部辅助功能按钮 */}
        <div className="pt-2 px-2">
          <div className="flex justify-around text-[#FFFFFFA6]">
            <button className="hover:text-white transition-colors p-1">
              <IconSetting size="default" />
            </button>
            <button className="hover:text-white transition-colors p-1">
              <IconGridSquare size="default" />
            </button>
            <button className="hover:text-white transition-colors p-1">
              <IconHelpCircle size="default" />
            </button>
          </div>
        </div>
      </aside>

      {/* 右侧主内容区 */}
      <div className="flex-1 bg-[#16181F] flex flex-col overflow-hidden">
        {/* 顶部栏 */}
        <header className="h-[50px] bg-[#16181F] flex items-center justify-center px-6 flex-shrink-0 relative z-20">
          <div className="flex-1 min-w-0 max-w-[600px] mx-auto shrink">
            <SearchBar />
          </div>
          <div className="absolute right-[70px] flex items-center gap-3">
            <button className="text-[#FFFFFFA6] hover:text-white transition-colors text-xs flex items-center gap-1">
              <IconGift size="small" />
              <span>充钻石</span>
            </button>
            <button className="text-[#FFFFFFA6] hover:text-white transition-colors text-xs flex items-center gap-1">
              <IconDesktop size="small" />
              <span>客户端</span>
            </button>
            <button className="text-[#FFFFFFA6] hover:text-white transition-colors text-xs flex items-center gap-1">
              <IconCrown size="small" />
              <span>壁纸</span>
            </button>
            <button className="text-[#FFFFFFA6] hover:text-white transition-colors text-xs flex items-center gap-1">
              <IconBell size="small" />
              <span>通知</span>
            </button>
            <button className="text-[#FFFFFFA6] hover:text-white transition-colors text-xs flex items-center gap-1">
              <IconMail size="small" />
              <span>私信</span>
            </button>
            <button className="text-[#FFFFFFA6] hover:text-white transition-colors text-xs flex items-center gap-1">
              <IconCamera size="small" />
              <span>投稿</span>
            </button>
          </div>

          <div className="absolute right-0 top-0 h-full w-[64px] flex items-center justify-center z-30">
            <div className="w-9 h-9 rounded-full overflow-hidden cursor-pointer hover:scale-110 transition-transform border border-[#FFFFFF1F]">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </header>

        {/* 内容容器 */}
        <div className="flex-1 flex flex-row overflow-hidden relative bg-[#16181F] group/container">
          {/* 视频播放器区域 - 绝对定位居中整个可视区域（扣除右侧64px和底部控制栏） */}
          <main
            ref={videoContainerRef}
            className="absolute inset-0 right-[64px] bottom-[80px] flex items-center justify-center bg-[#16181F] overflow-hidden group peer"
          >
            {/* 动态毛玻璃背景 (Home层级) */}
            {currentVideo && (
              <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {/* 默认封面背景 (视频未加载时显示) */}
                <div
                  className="absolute inset-[-20%] w-[140%] h-[140%] bg-cover bg-center bg-no-repeat blur-[80px] transition-all duration-500"
                  style={{
                    backgroundImage: `url(${currentVideo.coverUrl})`,
                    filter: "brightness(0.6)",
                  }}
                />
                {/* 动态视频背景 (Canvas) */}
                <canvas
                  id="home-dynamic-bg-canvas"
                  className="absolute inset-[-20%] w-[140%] h-[140%] object-cover blur-[80px] scale-125"
                  style={{ filter: "brightness(0.6)" }}
                />
              </div>
            )}

            {/* 视频播放器容器 */}
            <div className="relative w-full h-full flex items-center justify-center z-10">
              {/* 视频播放器 */}
              {currentVideo && (
                <VideoPlayer
                  videoUrl={currentVideo.videoUrl}
                  coverUrl={currentVideo.coverUrl}
                  videoId={currentVideo.id}
                  onEnded={handleVideoEnded}
                />
              )}

              {/* 视频信息 - 用组件替换 */}
              {currentVideo && <VideoInfo video={currentVideo} />}
            </div>
          </main>
          {/* 右侧互动区 - 绝对定位在右侧 */}
          {currentVideo && (
            <div className="absolute right-[64px] top-0 bottom-0 z-10 pointer-events-none">
              <InteractionPanel
                video={currentVideo}
                onCommentClick={handleCommentClick}
              />
            </div>
          )}
          {/* 评论抽屉 */}
          {/* {currentVideo && <CommentDrawer videoId={currentVideo.id} />}
           */}
          <CommentDrawer videoId={currentVideo.id} video={currentVideo} />
          {/* 视频控制栏 */}
          <VideoControls
            autoPlayChecked={autoPlayChecked}
            onAutoPlayChange={setAutoPlayChecked}
            clearScreenChecked={clearScreenChecked}
            onClearScreenChange={setClearScreenChecked}
          />
          {/* 右侧切换按钮栏 */}
          <div className="absolute right-0 top-0 bottom-0 w-[64px] flex-shrink-0 bg-[#16181F] flex flex-col justify-center items-center z-20 pb-4">
            <div className="flex flex-col gap-4">
              <button
                onClick={goToPrev}
                className="w-10 h-10 bg-[#252632] rounded-full flex items-center justify-center hover:bg-[#2f303d] transition-all active:scale-95"
              >
                <IconChevronUp className="text-[#FFFFFF80] group-hover:text-white text-xl" />
              </button>
              <button
                onClick={goToNext}
                className="w-10 h-10 bg-[#252632] rounded-full flex items-center justify-center hover:bg-[#2f303d] transition-all active:scale-95"
              >
                <IconChevronDown className="text-[#FFFFFF80] hover:text-white text-xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
