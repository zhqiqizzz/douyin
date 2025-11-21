import {
  IconHome,
  IconStar,
  IconUserGroup,
  IconUser,
  IconLive,
  IconVideoListStroked,
  IconDesktop,
  IconSearch,
  IconChevronUp,
  IconChevronDown,
  IconSetting,
  IconGridSquare,
  IconHelpCircle,
  IconBell,
  IconMail,
  IconGift,
  IconCamera,
  IconPlay,
  IconAIStrokedLevel1,
} from "@douyinfe/semi-icons";
import {
  MdPictureInPicture,
  MdWatchLater,
  MdAspectRatio,
  MdCropFree,
} from "react-icons/md";
import { Switch, Tooltip } from "@douyinfe/semi-ui";
import React, { useRef } from "react";
import VolumeControl from "../components/VolumeControl";
import { useAtom, useSetAtom } from "jotai";
import {
  currentVideoAtom,
  nextVideoAtom,
  prevVideoAtom,
} from "../store/videoStore";
import VideoPlayer from "../components/VideoPlayer";
import InteractionPanel from "../components/InteractionPanel";
import VideoInfo from "../components/VideoInfo"; // ✅ 新增导入

function Home() {
  const [autoPlayChecked, setAutoPlayChecked] = React.useState(false);
  const [clearScreenChecked, setClearScreenChecked] = React.useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  // 视频状态管理
  const [currentVideo] = useAtom(currentVideoAtom);
  const goToNext = useSetAtom(nextVideoAtom);
  const goToPrev = useSetAtom(prevVideoAtom);

  // 视频播放完成
  const handleVideoEnded = () => {
    if (autoPlayChecked) {
      goToNext();
    }
  };

  // 打开评论区
  const handleCommentClick = () => {
    console.log("打开评论区");
  };

  return (
    <div className="w-screen h-screen bg-[#16181F] overflow-hidden flex">
      {/* 左侧导航栏 */}
      <aside className="w-[135px] bg-[#16181F] flex flex-col py-4 flex-shrink-0">
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

        <nav className="flex-1 flex flex-col items-center gap-1 px-2">
          <div className="w-full flex flex-row items-center gap-3 py-3 px-4 text-[#FFFFFFA6] hover:text-white hover:bg-[#FFFFFF0A] rounded-xl cursor-pointer transition-all">
            <IconHome size="default" style={{ fontSize: 16, color: "white" }} />
            <span className="text-[15px] font-light tracking-wide">精选</span>
          </div>

          <div className="w-full flex flex-row items-center gap-3 py-3 px-4 text-white bg-[#FFFFFF1A] rounded-xl cursor-pointer transition-all">
            <IconStar size="default" style={{ fontSize: 16, color: "white" }} />
            <span className="text-[15px] font-light tracking-wide">推荐</span>
          </div>

          <div className="w-full flex flex-row items-center gap-3 py-3 px-4 text-[#FFFFFFA6] hover:text-white hover:bg-[#FFFFFF0A] rounded-xl cursor-pointer transition-all">
            <IconAIStrokedLevel1
              size="default"
              style={{ fontSize: 16, color: "white" }}
            />
            <span className="text-[15px] font-light tracking-wide">AI抖音</span>
          </div>

          <div className="w-full h-[1px] bg-[#FFFFFF14] my-1"></div>

          <div className="w-full flex flex-row items-center gap-3 py-3 px-4 text-[#FFFFFFA6] hover:text-white hover:bg-[#FFFFFF0A] rounded-xl cursor-pointer transition-all">
            <IconUserGroup
              size="default"
              style={{ fontSize: 16, color: "white" }}
            />
            <span className="text-[15px] font-light tracking-wide">关注</span>
          </div>

          <div className="w-full flex flex-row items-center gap-3 py-3 px-4 text-[#FFFFFFA6] hover:text-white hover:bg-[#FFFFFF0A] rounded-xl cursor-pointer transition-all">
            <IconUserGroup
              size="default"
              style={{ fontSize: 16, color: "white" }}
            />
            <span className="text-[15px] font-light tracking-wide">朋友</span>
          </div>

          <div className="w-full flex flex-row items-center gap-3 py-3 px-4 text-[#FFFFFFA6] hover:text-white hover:bg-[#FFFFFF0A] rounded-xl cursor-pointer transition-all">
            <IconUser size="default" style={{ fontSize: 16, color: "white" }} />
            <span className="text-[15px] font-light tracking-wide">我的</span>
          </div>

          <div className="w-full h-[1px] bg-[#FFFFFF14] my-1"></div>

          <div className="w-full flex flex-row items-center gap-3 py-3 px-4 text-[#FFFFFFA6] hover:text-white hover:bg-[#FFFFFF0A] rounded-xl cursor-pointer transition-all">
            <IconLive size="default" style={{ fontSize: 16, color: "white" }} />
            <span className="text-[15px] font-light tracking-wide">直播</span>
          </div>

          <div className="w-full flex flex-row items-center gap-3 py-3 px-4 text-[#FFFFFFA6] hover:text-white hover:bg-[#FFFFFF0A] rounded-xl cursor-pointer transition-all">
            <IconDesktop
              size="default"
              style={{ fontSize: 16, color: "white" }}
            />
            <span className="text-[15px] font-light tracking-wide">放映厅</span>
          </div>

          <div className="w-full flex flex-row items-center gap-3 py-3 px-4 text-[#FFFFFFA6] hover:text-white hover:bg-[#FFFFFF0A] rounded-xl cursor-pointer transition-all">
            <IconVideoListStroked
              size="default"
              style={{ fontSize: 16, color: "white" }}
            />
            <span className="text-[15px] font-light tracking-wide">短剧</span>
          </div>
        </nav>

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
          <div className="absolute left-1/2 -translate-x-1/2 w-full max-w-[520px] px-6">
            <div className="relative">
              <input
                type="text"
                placeholder="搜索你感兴趣的内容"
                className="w-full bg-[#1F2024] text-white placeholder-[#FFFFFF66] pl-10 pr-16 py-2 rounded-full outline-none focus:bg-[#25262B] transition-colors text-[13px] border border-[#FFFFFF14]"
              />
              <IconSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#FFFFFF66] text-sm" />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#FFFFFF14] hover:bg-[#FFFFFF1F] text-white text-xs px-3 py-1 rounded-full transition-colors flex items-center gap-1">
                <IconSearch size="extra-small" />
                搜索
              </button>
            </div>
          </div>

          <div className="absolute right-[70px] flex items-center gap-3">
            <button className="text-[#FFFFFFA6] hover:text-white transition-colors text-xs flex items-center gap-1">
              <IconGift size="small" />
              <span>充钻石</span>
            </button>
            <button className="text-[#FFFFFFA6] hover:text-white transition-colors text-xs flex items-center gap-1">
              <IconCamera size="small" />
              <span>客户端</span>
            </button>
            <button className="text-[#FFFFFFA6] hover:text-white transition-colors text-xs flex items-center gap-1">
              <IconLive size="small" />
              <span>直播</span>
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
          <div className="flex-1 overflow-hidden flex flex-row rounded-tl-3xl rounded-tr-3xl peer">
            {/* 左侧占位 */}
            <div
              className="w-[72px] flex-shrink-0 bg-black hover:bg-black"
              style={{ height: "calc(100% - 4rem)" }}
            ></div>

            {/* 视频播放器区域 */}
            <main
              ref={videoContainerRef}
              className="flex-1 relative bg-[#16181F] overflow-hidden group hover:bg-[#16181F]"
              style={{ height: "calc(100% - 4rem)" }}
            >
              {/* 视频播放器 */}
              {currentVideo && (
                <VideoPlayer
                  videoUrl={currentVideo.videoUrl}
                  coverUrl={currentVideo.coverUrl}
                  videoId={currentVideo.id}
                  onEnded={handleVideoEnded}
                />
              )}

              {/* ✅ 视频信息 - 用组件替换 */}
              {currentVideo && <VideoInfo video={currentVideo} />}
            </main>

            {/* 右侧互动区 */}
            {currentVideo && (
              <InteractionPanel
                video={currentVideo}
                onCommentClick={handleCommentClick}
              />
            )}
          </div>

          {/* 底部控制栏 */}
          <div
            className="absolute bottom-4 rounded-b-2xl h-12 bg-[#1b1b1d] backdrop-blur-md flex items-center justify-between px-4 z-40 transition-colors peer-hover:bg-black hover:bg-black group peer-hover:[&_*]:!text-white"
            style={{ left: "0", right: "64px" }}
          >
            <div className="flex items-center gap-3">
              <button className="text-[#837f7fa6] group-hover:text-white hover:scale-110 transition-all">
                <IconPlay size="default" />
              </button>
              <span className="text-[#837f7fa6] group-hover:text-white text-sm font-bold transition-colors">
                00:02 / 15:15
              </span>
              <VolumeControl videoRef={videoRef} />
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

            <div className="flex items-center gap-2">
              <button
                className="text-[#837f7fa6] flex items-center gap-2 group-hover:text-white text-sm font-bold px-2 py-1 rounded transition-all"
                onClick={() => setAutoPlayChecked(!autoPlayChecked)}
              >
                <Switch
                  checked={autoPlayChecked}
                  size="small"
                  style={{
                    backgroundColor: autoPlayChecked ? "#fe2c55" : "#d9d9d9",
                  }}
                />
                <span>连播</span>
              </button>
              <button
                onClick={() => setClearScreenChecked(!clearScreenChecked)}
                className="flex items-center gap-2 text-[#837f7fa6] group-hover:text-white text-sm font-bold px-2 py-1 rounded transition-all"
              >
                <Switch
                  checked={clearScreenChecked}
                  size="small"
                  style={{
                    backgroundColor: clearScreenChecked ? "#fe2c55" : "#d9d9d9",
                  }}
                />
                <span>清屏</span>
              </button>
              <button className="text-[#837f7fa6] group-hover:text-white text-sm font-bold px-2 py-1 rounded transition-all">
                智能
              </button>
              <button className="text-[#837f7fa6] group-hover:text-white text-sm font-bold px-2 py-1 rounded transition-all">
                倍速
              </button>
              <Tooltip content="稍后再看" showArrow={false}>
                <button className="text-[#837f7fa6] group-hover:text-white text-sm font-bold px-2 py-1 rounded transition-all">
                  <MdWatchLater size={20} />
                </button>
              </Tooltip>
              <Tooltip content="小窗模式" showArrow={false}>
                <button className="text-[#837f7fa6] group-hover:text-white text-sm font-bold px-2 py-1 rounded transition-all">
                  <MdPictureInPicture size={20} />
                </button>
              </Tooltip>
              <VolumeControl videoRef={videoRef} />
              <Tooltip content="网页全屏" showArrow={false}>
                <button className="text-[#837f7fa6] group-hover:text-white text-sm font-bold px-2 py-1 rounded transition-all">
                  <MdAspectRatio size={20} />
                </button>
              </Tooltip>
              <Tooltip content="进入全屏" showArrow={false}>
                <button className="text-[#837f7fa6] group-hover:text-white text-sm font-bold px-2 py-1 rounded transition-all">
                  <MdCropFree size={20} />
                </button>
              </Tooltip>
            </div>
          </div>

          {/* 右侧切换按钮栏 */}
          <div className="w-[64px] flex-shrink-0 bg-[#16181F] flex flex-col justify-center items-center z-20 pb-4">
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
