import {
  IconHome,
  IconStar,
  IconUserGroup,
  IconUser,
  IconLive,
  IconVideoListStroked,
  IconDesktop,
  IconSearch,
  IconHeartStroked,
  IconComment,
  IconShareStroked as IconShare,
  IconMusic,
  IconMoreStroked as IconMore,
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

function Home() {
  const [autoPlayChecked, setAutoPlayChecked] = React.useState(false);
  const [clearScreenChecked, setClearScreenChecked] = React.useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  return (
    <div className="w-screen h-screen bg-[#16181F] overflow-hidden flex">
      {/* 左侧导航栏 - 紧凑型 */}
      <aside className="w-[135px] bg-[#16181F] flex flex-col py-4 flex-shrink-0">
        {/* 抖音Logo */}
        <div className="flex items-center mb-4 px-2 justify-center cursor-pointer">
          {/* <IconTiktokLogo size="default" className="text-white"/>*/}
          <img
            src="https://p-pc-weboff.byteimg.com/tos-cn-i-9r5gewecjs/favicon.png"
            alt="抖音图标"
            className="w-9 h-9 mix-blend-lighten"
          />
          <span className="text-white font-bold mt-1 ml-1 text-[20px] font-sans tracking-widest">
            抖音
          </span>
        </div>
        {/* 导航菜单 - 紧凑无滚动 */}
        <nav className="flex-1 flex flex-col items-center gap-1 px-2">
          {/* 精选 */}
          <div className="w-full flex flex-row items-center gap-3 py-3 px-4 text-[#FFFFFFA6] hover:text-white hover:bg-[#FFFFFF0A] rounded-xl cursor-pointer transition-all">
            <IconHome size="default" style={{ fontSize: 16, color: "white" }} />
            <span className="text-[15px] font-light tracking-wide">精选</span>
          </div>

          {/* 推荐 */}
          <div className="w-full flex flex-row items-center gap-3 py-3 px-4 text-white bg-[#FFFFFF1A] rounded-xl cursor-pointer transition-all">
            <IconStar size="default" style={{ fontSize: 16, color: "white" }} />
            <span className="text-[15px] font-light tracking-wide">推荐</span>
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
            <IconUserGroup
              size="default"
              style={{ fontSize: 16, color: "white" }}
            />
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
        {/* 底部按钮 */}
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
          {/* 搜索框 - 绝对居中 */}
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

          {/* 右侧按钮 - 紧凑无角标 */}
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

          {/* 头像 - 与右侧侧边栏对齐 */}
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

        {/* 内容容器 - 包含主内容区域、切换按钮、底部控制栏 */}
        <div className="flex-1 flex flex-row overflow-hidden relative bg-[#16181F] group/container">
          {/* 主内容区域 */}
          <div className="flex-1 overflow-hidden flex flex-row rounded-tl-3xl rounded-tr-3xl peer">
            {/* 左侧占位 - 与右侧互动区等宽 */}
            <div
              className="w-[72px] flex-shrink-0 bg-black hover:bg-black"
              style={{ height: "calc(100% - 4rem)" }}
            ></div>

            {/* 视频播放器区域 - 红色框大小 */}
            <main
              ref={videoContainerRef}
              className="flex-1 relative bg-[#16181F] overflow-hidden group hover:bg-[#16181F]"
              style={{ height: "calc(100% - 4rem)" }}
            >
              {/* 视频背景 */}
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#2d1b3d] via-[#1a1625] to-[#0a0612]">
                {/* 视频占位 */}
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mb-4 mx-auto backdrop-blur-sm border border-purple-500/30">
                    <IconVideoListStroked
                      style={{ fontSize: "48px" }}
                      className="text-purple-300"
                    />
                  </div>
                  <div className="text-gray-400 text-lg font-medium">
                    视频播放器区域
                  </div>
                  <div className="text-gray-600 text-xs mt-1">
                    （步骤5实现）
                  </div>
                </div>
              </div>
              {/* 左下角视频信息 - 更小 */}
              <div className="absolute left-4 bottom-16 z-10 max-w-[420px]">
                <div className="text-white space-y-1.5 drop-shadow-2xl">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold">@苏漫坐（美妆版）</h3>
                    <span className="text-[11px] text-[#FFFFFFCC]">
                      · 10月5日
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-[#FFFFFFE6]">
                    第19集：上镜日常妆15分钟保姆级跟练丨出片又自然丨
                    长视频戳主出击!
                  </p>
                  <div className="flex flex-wrap gap-1.5 text-[11px]">
                    <span className="text-[#FFD700]">#新手化妆教程</span>
                    <span className="text-[#FFD700]">#今日妆容</span>
                    <span className="text-[#FFD700]">#妆教</span>
                    <span className="text-[#FFD700]">#新手化妆</span>
                  </div>
                  <button className="flex items-center gap-1.5 text-[11px] text-[#FFFFFFCC] bg-[#00000040] backdrop-blur-sm px-2.5 py-1 rounded-full mt-2 hover:bg-[#00000060] transition-colors">
                    <span>🎬</span>
                    <span>识别画面</span>
                  </button>
                </div>
              </div>
            </main>

            {/* 右侧互动区 */}
            <div
              className="w-[72px] flex-shrink-0 bg-black flex flex-col justify-center items-center z-10 hover:bg-black"
              style={{ height: "calc(100% - 4rem)" }}
            >
              <div className="flex flex-col items-center gap-3.5">
                {/* 设置按钮 */}
                <button className="w-10 h-10 bg-[#FFFFFF14] backdrop-blur-md rounded-full flex items-center justify-center hover:bg-[#FFFFFF20] transition-all">
                  <IconSetting className="text-white text-lg" />
                </button>

                {/* 头像 */}
                <div className="flex flex-col items-center cursor-pointer group">
                  <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-white shadow-lg transition-transform">
                    <img
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* 关注按钮 - 小 */}
                  <div className="w-5 h-5 bg-[#fe2c55] rounded-full flex items-center justify-center -mt-2.5 cursor-pointer hover:scale-110 transition-transform">
                    <span className="text-white text-xs font-bold leading-none">
                      +
                    </span>
                  </div>
                </div>

                {/* 点赞 */}
                <div className="flex flex-col items-center cursor-pointer group">
                  <IconHeartStroked className="text-white text-[28px] drop-shadow-lg group-hover:scale-110 transition-transform" />
                  <span className="text-white text-[11px] mt-0.5 font-medium drop-shadow-lg">
                    2.8万
                  </span>
                </div>

                {/* 评论 */}
                <div className="flex flex-col items-center cursor-pointer group">
                  <IconComment className="text-white text-[28px] drop-shadow-lg group-hover:scale-110 transition-transform" />
                  <span className="text-white text-[11px] mt-0.5 font-medium drop-shadow-lg">
                    446
                  </span>
                </div>

                {/* 收藏 */}
                <div className="flex flex-col items-center cursor-pointer group">
                  <IconStar className="text-white text-[28px] drop-shadow-lg group-hover:scale-110 transition-transform" />
                  <span className="text-white text-[11px] mt-0.5 font-medium drop-shadow-lg">
                    1.7万
                  </span>
                </div>

                {/* 分享 */}
                <div className="flex flex-col items-center cursor-pointer group">
                  <IconShare className="text-white text-[28px] drop-shadow-lg group-hover:scale-110 transition-transform" />
                  <span className="text-white text-[11px] mt-0.5 font-medium drop-shadow-lg">
                    2712
                  </span>
                </div>

                {/* 音乐 */}
                <div className="flex flex-col items-center cursor-pointer group mt-1">
                  <IconMusic className="text-white text-[24px] drop-shadow-lg group-hover:rotate-[360deg] transition-all duration-700" />
                  <span className="text-white text-[10px] mt-0.5 drop-shadow-lg">
                    听抖音
                  </span>
                </div>

                {/* 更多 */}
                <div className="flex flex-col items-center cursor-pointer group">
                  <IconMore className="text-white text-[20px] drop-shadow-lg rotate-90" />
                </div>
              </div>
            </div>
          </div>
          {/* 底部控制栏 - 精简紧凑 */}
          <div
            className="absolute bottom-4 rounded-b-2xl h-12 bg-[#1b1b1d] backdrop-blur-md flex items-center justify-between px-4 z-40 transition-colors peer-hover:bg-black hover:bg-black group peer-hover:[&_*]:!text-white"
            style={{ left: "0", right: "64px" }}
          >
            {/* 左侧播放控制 */}
            <div className="flex items-center gap-3">
              <button className="text-[#837f7fa6] group-hover:text-white hover:scale-110 transition-all">
                <IconPlay size="default" />
              </button>
              <span className="text-[#837f7fa6] group-hover:text-white text-sm font-bold transition-colors">
                00:02 / 15:15
              </span>
              <VolumeControl videoRef={videoRef} />
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
              <button
                className="text-[#837f7fa6] flex items-center gap-2 group-hover:text-white text-sm font-bold px-2 py-1 rounded transition-all"
                onClick={() => setAutoPlayChecked(!autoPlayChecked)}
              >
                <Switch
                  checked={autoPlayChecked}
                  size="small"
                  aria-label="a switch for demo"
                  style={{
                    backgroundColor: autoPlayChecked ? "#fe2c55" : "#d9d9d9",
                  }}
                ></Switch>
                <span>连播</span>
              </button>
              <button
                onClick={() => setClearScreenChecked(!clearScreenChecked)}
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
              <button className="w-10 h-10 bg-[#252632] rounded-full flex items-center justify-center transition-all">
                <IconChevronUp className="text-[#FFFFFF80] group-hover:text-white text-xl" />
              </button>
              <button className="w-10 h-10 bg-[#252632] rounded-full flex items-center justify-center transition-all">
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
