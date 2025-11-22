// components/CommentDrawer.tsx
import { useEffect, useRef, useState } from "react";
import { useAtom, useSetAtom } from "jotai";
import {
  commentsAtom,
  commentsLoadingAtom,
  commentInputAtom,
  showCommentsAtom,
  loadCommentsAtom,
  sendCommentAtom,
  likeCommentAtom,
  commentSortAtom,
} from "../store/commentStore";
import CommentList from "./CommentList";
import { IconClose, IconSend } from "@douyinfe/semi-icons";
import { Spin, Toast } from "@douyinfe/semi-ui";
import type { CommentItem } from "../types";

interface CommentDrawerProps {
  videoId: string;
}

function CommentDrawer({ videoId }: CommentDrawerProps) {
  const [showComments, setShowComments] = useAtom(showCommentsAtom);
  const [comments] = useAtom(commentsAtom);
  const [loading] = useAtom(commentsLoadingAtom);
  const [commentInput, setCommentInput] = useAtom(commentInputAtom);
  const [sortType, setSortType] = useAtom(commentSortAtom);
  const [isSending, setIsSending] = useState(false);

  // 记录当前回复的评论
  const [replyingTo, setReplyingTo] = useState<CommentItem | null>(null);

  const loadComments = useSetAtom(loadCommentsAtom);
  const sendComment = useSetAtom(sendCommentAtom);
  const likeComment = useSetAtom(likeCommentAtom);

  const commentsContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 加载评论
  useEffect(() => {
    if (showComments && videoId) {
      loadComments(videoId);
    }
  }, [showComments, videoId, loadComments]);

  // 打开抽屉时自动聚焦
  useEffect(() => {
    if (showComments) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [showComments]);

  // 关闭抽屉
  const handleClose = () => {
    setShowComments(false);
    setCommentInput("");
    setReplyingTo(null);
  };

  // 发送评论
  const handleSend = async () => {
    if (!commentInput.trim() || isSending) return;

    setIsSending(true);

    try {
      await sendComment({
        videoId,
        content: commentInput.trim(),
        parentId: replyingTo?.id, // 如果是回复，传入父评论ID
      });

      setCommentInput("");
      setReplyingTo(null);

      // 滚动到顶部
      setTimeout(() => {
        if (commentsContainerRef.current) {
          commentsContainerRef.current.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
      }, 100);

      Toast.success({
        content: replyingTo ? "回复成功" : "评论发布成功",
        duration: 2,
      });

      inputRef.current?.focus();
    } catch (error) {
      Toast.error({
        content: "发送失败，请重试",
        duration: 2,
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    } else if (e.key === "Escape") {
      setReplyingTo(null);
      setCommentInput("");
    }
  };

  // 回复评论
  const handleReply = (comment: CommentItem) => {
    setReplyingTo(comment);
    setCommentInput(`@${comment.user.name} `);
    inputRef.current?.focus();
  };

  // 排序评论
  const sortedComments = [...comments].sort((a, b) => {
    if (sortType === "hot") {
      return b.likes - a.likes;
    } else {
      return (
        new Date(b.createTime).getTime() - new Date(a.createTime).getTime()
      );
    }
  });

  if (!showComments) return null;

  return (
    <>
      {/* 遮罩层 */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
        onClick={handleClose}
      />

      {/* 抽屉主体 */}
      <div className="fixed right-0 top-0 bottom-0 w-[460px] bg-[#1a1b1f] z-50 flex flex-col shadow-2xl animate-slide-in-right">
        {/* 头部 */}
        <div className="h-14 flex items-center justify-between px-5 border-b border-gray-800">
          <div className="flex items-center gap-4">
            <h3 className="text-white font-medium text-base">
              评论{" "}
              <span className="text-gray-500 text-sm font-normal">
                {comments.length}
              </span>
            </h3>

            {/* 排序切换 */}
            <div className="flex gap-2">
              <button
                onClick={() => setSortType("hot")}
                className={`text-xs px-3 py-1 rounded-full transition-all ${
                  sortType === "hot"
                    ? "bg-[#fe2c55] text-white"
                    : "text-gray-500 hover:text-white hover:bg-gray-800"
                }`}
              >
                最热
              </button>
              <button
                onClick={() => setSortType("time")}
                className={`text-xs px-3 py-1 rounded-full transition-all ${
                  sortType === "time"
                    ? "bg-[#fe2c55] text-white"
                    : "text-gray-500 hover:text-white hover:bg-gray-800"
                }`}
              >
                最新
              </button>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-white transition-colors p-1"
          >
            <IconClose size="large" />
          </button>
        </div>

        {/* 评论列表 */}
        <div
          ref={commentsContainerRef}
          className="flex-1 overflow-y-auto px-4 py-3 comments-scroll-container"
        >
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <Spin size="large" />
            </div>
          ) : (
            <CommentList
              comments={sortedComments}
              onLike={likeComment}
              onReply={handleReply}
            />
          )}
        </div>

        {/* 底部输入区域 */}
        <div className="border-t border-gray-800 bg-[#1a1b1f]">
          {/* 回复提示条 */}
          {replyingTo && (
            <div className="px-4 pt-3 pb-2 flex items-center justify-between bg-[#252632]">
              <span className="text-sm text-gray-400">
                回复{" "}
                <span className="text-[#0FACF3]">@{replyingTo.user.name}</span>
              </span>
              <button
                onClick={() => {
                  setReplyingTo(null);
                  setCommentInput("");
                }}
                className="text-gray-500 hover:text-white text-xs"
              >
                取消
              </button>
            </div>
          )}

          <div className="p-4">
            <div className="flex items-center gap-3">
              {/* 当前用户头像 */}
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=current"
                alt="当前用户"
                className="w-9 h-9 rounded-full flex-shrink-0"
              />

              {/* 输入框 */}
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="说点什么..."
                  disabled={isSending}
                  className="w-full bg-[#252632] text-white text-sm px-4 py-2.5 rounded-full outline-none focus:ring-2 focus:ring-[#fe2c55] transition-all placeholder-gray-500 disabled:opacity-50"
                />
              </div>

              {/* 发布按钮 */}
              <button
                onClick={handleSend}
                disabled={!commentInput.trim() || isSending}
                className={`
                  px-5 py-2.5 rounded-full text-sm font-medium transition-all flex-shrink-0 flex items-center gap-2
                  ${
                    commentInput.trim() && !isSending
                      ? "bg-[#fe2c55] text-white hover:bg-[#ff4069] active:scale-95 shadow-lg shadow-[#fe2c55]/30"
                      : "bg-[#252632] text-[#FFFFFF40] cursor-not-allowed"
                  }
                `}
              >
                {isSending ? (
                  <>
                    <span className="inline-block w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>发送中</span>
                  </>
                ) : (
                  <>
                    <IconSend size="small" />
                    <span>发布</span>
                  </>
                )}
              </button>
            </div>

            {/* 提示文字 */}
            <p className="text-xs text-gray-600 mt-2 ml-12">
              按 Enter 发送{replyingTo ? "，Esc 取消回复" : ""}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CommentDrawer;
