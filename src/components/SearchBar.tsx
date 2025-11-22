// components/SearchBar.tsx
import { useState, useEffect, useRef } from "react";
import { IconSearch, IconClose, IconHistogram } from "@douyinfe/semi-icons";

function SearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false); // ✅ 搜索状态
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 从 localStorage 加载历史记录
  useEffect(() => {
    const history = localStorage.getItem("searchHistory");
    if (history) {
      try {
        setSearchHistory(JSON.parse(history));
      } catch (error) {
        console.error("加载搜索历史失败:", error);
      }
    }
  }, []);

  // 点击外部关闭弹窗
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowHistory(false);
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 保存搜索历史到 localStorage
  const saveToHistory = (keyword: string) => {
    if (!keyword.trim()) return;

    const trimmedKeyword = keyword.trim();
    const newHistory = [
      trimmedKeyword,
      ...searchHistory.filter((item) => item !== trimmedKeyword),
    ].slice(0, 10);

    setSearchHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
  };

  // ✅ 执行搜索（只做样式，不跳转）
  const handleSearch = () => {
    if (!searchValue.trim()) return;

    // 保存历史
    saveToHistory(searchValue.trim());

    // 视觉反馈：搜索动画
    setIsSearching(true);
    setShowHistory(false);

    // 模拟搜索过程
    setTimeout(() => {
      setIsSearching(false);
      setIsFocused(false);
      inputRef.current?.blur();

      // 可选：清空搜索框
      // setSearchValue("");

      console.log("搜索完成（仅样式效果）:", searchValue);
    }, 800);
  };

  // 按下 Enter 键
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    } else if (e.key === "Escape") {
      setShowHistory(false);
      setIsFocused(false);
      inputRef.current?.blur();
    }
  };

  // 点击历史记录
  const handleHistoryClick = (keyword: string) => {
    setSearchValue(keyword);

    // 延迟执行搜索，让用户看到填充效果
    setTimeout(() => {
      handleSearch();
    }, 100);
  };

  // 删除单条历史
  const deleteHistory = (keyword: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newHistory = searchHistory.filter((item) => item !== keyword);
    setSearchHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
  };

  // 清空历史
  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem("searchHistory");
  };

  // 聚焦搜索框
  const handleFocus = () => {
    setIsFocused(true);
    setShowHistory(true);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {/* 搜索框 */}
      <div
        className={`
          relative flex items-center bg-[#252632] rounded-full
          transition-all duration-200
          ${isFocused ? "ring-2 ring-[#fe2c55]" : ""}
          ${isSearching ? "ring-2 ring-[#fe2c55] animate-pulse" : ""}
        `}
      >
        <IconSearch
          className={`ml-4 transition-all ${
            isSearching ? "text-[#fe2c55] animate-spin" : "text-[#FFFFFF80]"
          }`}
          size="large"
        />
        <input
          ref={inputRef}
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          disabled={isSearching}
          placeholder={isSearching ? "搜索中..." : "搜索你感兴趣的视频"}
          className="flex-1 bg-transparent px-3 py-2.5 text-white placeholder-[#FFFFFF80] outline-none text-sm disabled:cursor-not-allowed"
        />
        {searchValue && !isSearching && (
          <button
            onClick={() => setSearchValue("")}
            className="text-[#FFFFFF80] hover:text-white transition-colors"
          >
            <IconClose />
          </button>
        )}
        <button
          onClick={handleSearch}
          disabled={isSearching || !searchValue.trim()}
          className={`
            px-4 py-2 mr-1 ml-2 rounded-full text-sm font-medium 
            transition-all active:scale-95
            ${
              isSearching
                ? "bg-[#FFFFFF20] text-[#FFFFFF60] cursor-not-allowed"
                : "bg-[#fe2c55] text-white hover:bg-[#ff4069]"
            }
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        >
          {isSearching ? (
            <span className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              搜索中
            </span>
          ) : (
            "搜索"
          )}
        </button>
      </div>

      {/* 历史记录弹窗 */}
      {showHistory && !isSearching && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#252632] rounded-2xl shadow-2xl py-3 z-50 max-h-[400px] overflow-y-auto border border-[#FFFFFF1A]">
          {searchHistory.length > 0 ? (
            <>
              {/* 标题栏 */}
              <div className="flex items-center justify-between px-5 py-2 mb-2">
                <div className="flex items-center gap-2 text-white">
                  <IconHistogram style={{ fontSize: 16 }} />
                  <span className="text-sm font-medium">搜索历史</span>
                </div>
                <button
                  onClick={clearHistory}
                  className="text-xs text-[#FFFFFF80] hover:text-[#fe2c55] transition-colors"
                >
                  清空
                </button>
              </div>

              {/* 分割线 */}
              <div className="border-t border-[#FFFFFF0A] mb-2"></div>

              {/* 历史记录列表 */}
              <div className="px-2">
                {searchHistory.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleHistoryClick(item)}
                    className="flex items-center justify-between px-3 py-2.5 hover:bg-[#FFFFFF0A] rounded-lg cursor-pointer group transition-all"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <IconSearch
                        className="text-[#FFFFFF60] flex-shrink-0"
                        style={{ fontSize: 14 }}
                      />
                      <span className="text-white text-sm truncate">
                        {item}
                      </span>
                    </div>
                    <button
                      onClick={(e) => deleteHistory(item, e)}
                      className="opacity-0 group-hover:opacity-100 text-[#FFFFFF60] hover:text-[#fe2c55] transition-all p-1 flex-shrink-0"
                    >
                      <IconClose style={{ fontSize: 14 }} />
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            // 空状态
            <div className="px-5 py-8 text-center text-[#FFFFFF60] text-sm">
              <IconHistogram style={{ fontSize: 32, margin: "0 auto 8px" }} />
              <p>暂无搜索历史</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
