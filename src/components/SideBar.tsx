// components/Sidebar.tsx
import { useState } from "react";
import { IconRefresh } from "@douyinfe/semi-icons";
import { Tooltip } from "@douyinfe/semi-ui";

interface SidebarProps {
  onRefresh?: () => void;
}

function Sidebar({ onRefresh }: SidebarProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    onRefresh?.();

    // 模拟刷新动画
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <div className="w-[240px] bg-[#1b1b1d] h-full flex flex-col group/sidebar">
      {/* 顶部刷新区域 */}
      <div className="relative h-16 flex items-center justify-center">
        <Tooltip content="刷新视频列表" position="right" showArrow={false}>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className={`
              opacity-0 group-hover/sidebar:opacity-100 
              transition-all duration-300
              w-10 h-10 rounded-full 
              flex items-center justify-center
              bg-[#252632] hover:bg-[#2f303d]
              active:scale-95
              ${isRefreshing ? "animate-spin" : ""}
            `}
          >
            <IconRefresh className="text-white text-xl" />
          </button>
        </Tooltip>
      </div>

      {/* 侧边栏内容区域 */}
      <div className="flex-1 overflow-y-auto px-4">
        {/* 这里放视频列表等内容 */}
      </div>
    </div>
  );
}

export default Sidebar;
