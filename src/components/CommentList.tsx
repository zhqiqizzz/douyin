// components/CommentList.tsx
import type { CommentItem } from "../types";
import { formatTime, formatNumber } from "../utils/formatNumber";
import {
  IconHeartStroked,
  IconLikeHeart,
  IconForward,
} from "@douyinfe/semi-icons";
import { PiHeartBreak, PiHeartBreakFill } from "react-icons/pi";
import { useState } from "react";
import { Toast } from "@douyinfe/semi-ui";

interface CommentListProps {
  comments: CommentItem[];
  onLike: (commentId: string) => void;
  onReply?: (comment: CommentItem) => void;
}

function CommentList({ comments, onReply }: CommentListProps) {
  const [likesChange, setLikesChange] = useState<Map<string, number>>(
    new Map()
  );
  const [hiddenComments, setHiddenComments] = useState<Set<string>>(new Set());
  const [expandedComments, setExpandedComments] = useState<Set<string>>(
    new Set()
  );

  const handleLike = (commentId: string) => {
    if (hiddenComments.has(commentId)) return;

    const newLikesChange = new Map(likesChange);
    const currentChange = newLikesChange.get(commentId) || 0;

    if (currentChange === 1) {
      newLikesChange.set(commentId, 0);
    } else {
      newLikesChange.set(commentId, 1);
    }

    setLikesChange(newLikesChange);
  };

  const getLikesCount = (commentId: string, originalLikes: number) => {
    const change = likesChange.get(commentId) || 0;
    return originalLikes + change;
  };

  const isLiked = (commentId: string) => {
    return (likesChange.get(commentId) || 0) === 1;
  };

  const handleCopyComment = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      Toast.success({ content: "复制成功", duration: 2 });
    } catch (error) {
      const textArea = document.createElement("textarea");
      textArea.value = content;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        Toast.success({ content: "复制成功", duration: 2 });
      } catch (err) {
        Toast.error({ content: "复制失败", duration: 2 });
      }
      document.body.removeChild(textArea);
    }
  };

  const toggleHideComment = (commentId: string) => {
    const newHidden = new Set(hiddenComments);
    if (newHidden.has(commentId)) {
      newHidden.delete(commentId);
      Toast.info({ content: "评论已恢复", duration: 2 });
    } else {
      newHidden.add(commentId);
      Toast.info({ content: "评论已隐藏", duration: 2 });
    }
    setHiddenComments(newHidden);
  };

  const toggleExpand = (commentId: string) => {
    const newExpanded = new Set(expandedComments);
    if (newExpanded.has(commentId)) {
      newExpanded.delete(commentId);
    } else {
      newExpanded.add(commentId);
    }
    setExpandedComments(newExpanded);
  };

  if (comments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <div className="text-6xl mb-4">💬</div>
        <p className="text-sm">还没有评论，快来抢沙发吧~</p>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {comments.map((comment) => {
        const isHidden = hiddenComments.has(comment.id);
        const commentIsLiked = isLiked(comment.id);
        const hasReplies = comment.replies && comment.replies.length > 0;
        const isExpanded = expandedComments.has(comment.id);
        const replyCount = comment.replies?.length || 0;

        return (
          <div
            key={comment.id}
            className={`py-4 border-b border-[#FFFFFF08] transition-all duration-300 ${
              isHidden ? "opacity-50" : ""
            }`}
          >
            {/* 主评论 */}
            <div className="flex gap-3">
              <img
                src={comment.user.avatar}
                alt={comment.user.name}
                className={`w-10 h-10 rounded-full flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity ${
                  isHidden ? "grayscale" : ""
                }`}
              />

              <div className="flex-1 min-w-0">
                {/* 用户名和时间 */}
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`text-[13px] font-medium cursor-pointer hover:text-[#fe2c55] transition-colors ${
                      isHidden ? "text-gray-600" : "text-[#FFFFFFCC]"
                    }`}
                  >
                    {comment.user.name}
                  </span>
                  <span className="text-[12px] text-[#FFFFFF60]">
                    {formatTime(comment.createTime)}
                  </span>
                </div>

                {/* 评论内容 */}
                {isHidden ? (
                  <p className="text-sm text-gray-600 italic mb-2">
                    该评论已被隐藏
                  </p>
                ) : (
                  <p className="text-[14px] text-[#FFFFFFD9] leading-[22px] mb-3 whitespace-pre-wrap break-words">
                    {comment.content}
                  </p>
                )}

                {/* 操作栏 */}
                <div className="flex items-center gap-6 mb-3">
                  {/* 点赞 */}
                  <button
                    onClick={() => handleLike(comment.id)}
                    disabled={isHidden}
                    className={`flex items-center gap-1.5 group transition-all ${
                      isHidden
                        ? "text-gray-700 cursor-not-allowed"
                        : commentIsLiked
                        ? "text-[#fe2c55]"
                        : "text-[#FFFFFF99] hover:text-[#fe2c55]"
                    }`}
                  >
                    {commentIsLiked ? (
                      <IconLikeHeart className="text-[16px] animate-likeHeart" />
                    ) : (
                      <IconHeartStroked className="text-[16px] group-hover:scale-110 transition-transform" />
                    )}
                    <span
                      className={`text-[13px] ${
                        commentIsLiked ? "animate-likeNumber" : ""
                      }`}
                    >
                      {getLikesCount(comment.id, comment.likes) > 0
                        ? formatNumber(getLikesCount(comment.id, comment.likes))
                        : "赞"}
                    </span>
                  </button>

                  {/* 回复 */}
                  {!isHidden && (
                    <button
                      onClick={() => onReply?.(comment)}
                      className="text-[#FFFFFF99] hover:text-white transition-colors text-[13px]"
                    >
                      回复
                    </button>
                  )}

                  {/* 复制 */}
                  {!isHidden && (
                    <button
                      onClick={() => handleCopyComment(comment.content)}
                      className="flex items-center gap-1.5 text-[#FFFFFF99] hover:text-white transition-colors group"
                    >
                      <IconForward className="text-[14px] group-hover:scale-110 transition-transform" />
                    </button>
                  )}

                  {/* 隐藏/恢复 */}
                  <button
                    onClick={() => toggleHideComment(comment.id)}
                    className={`flex items-center gap-1.5 transition-colors group ${
                      isHidden
                        ? "text-gray-600 hover:text-green-500"
                        : "text-[#FFFFFF99] hover:text-[#fe2c55]"
                    }`}
                  >
                    {isHidden ? (
                      <PiHeartBreakFill className="text-[14px] group-hover:scale-110 transition-transform" />
                    ) : (
                      <PiHeartBreak className="text-[14px] group-hover:scale-110 transition-transform" />
                    )}
                  </button>
                </div>

                {/* 展开/收起按钮 */}
                {!isHidden && hasReplies && (
                  <button
                    onClick={() => toggleExpand(comment.id)}
                    className="flex items-center gap-1.5 text-[#0FACF3] hover:text-[#3DC0FF] text-[13px] mb-3 transition-colors group"
                  >
                    <span>
                      {isExpanded ? "收起回复" : `展开 ${replyCount} 条回复`}
                    </span>
                    <span
                      className={`text-xs transform transition-transform duration-200 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>
                )}

                {/* 二级评论区域 */}
                {!isHidden && hasReplies && isExpanded && (
                  <div className="relative pl-5 space-y-4">
                    {/* 左侧竖线 */}
                    <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#FFFFFF0A]" />

                    {comment.replies!.map((reply) => {
                      const isReplyHidden = hiddenComments.has(reply.id);
                      const replyIsLiked = isLiked(reply.id);

                      return (
                        <div
                          key={reply.id}
                          className={`flex gap-2.5 transition-all duration-300 ${
                            isReplyHidden ? "opacity-50" : ""
                          }`}
                        >
                          <img
                            src={reply.user.avatar}
                            alt={reply.user.name}
                            className={`w-8 h-8 rounded-full flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity ${
                              isReplyHidden ? "grayscale" : ""
                            }`}
                          />

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span
                                className={`text-[12px] font-medium cursor-pointer hover:text-[#fe2c55] transition-colors ${
                                  isReplyHidden
                                    ? "text-gray-600"
                                    : "text-[#FFFFFFCC]"
                                }`}
                              >
                                {reply.user.name}
                              </span>
                              <span className="text-[11px] text-[#FFFFFF60]">
                                {formatTime(reply.createTime)}
                              </span>
                            </div>

                            {isReplyHidden ? (
                              <p className="text-xs text-gray-600 italic mb-2">
                                该评论已被隐藏
                              </p>
                            ) : (
                              <p className="text-[13px] text-[#FFFFFFD9] leading-[20px] mb-2 whitespace-pre-wrap break-words">
                                {reply.content}
                              </p>
                            )}

                            <div className="flex items-center gap-5">
                              <button
                                onClick={() => handleLike(reply.id)}
                                disabled={isReplyHidden}
                                className={`flex items-center gap-1 group transition-all ${
                                  isReplyHidden
                                    ? "text-gray-700 cursor-not-allowed"
                                    : replyIsLiked
                                    ? "text-[#fe2c55]"
                                    : "text-[#FFFFFF99] hover:text-[#fe2c55]"
                                }`}
                              >
                                {replyIsLiked ? (
                                  <IconLikeHeart className="text-[14px] animate-likeHeart" />
                                ) : (
                                  <IconHeartStroked className="text-[14px] group-hover:scale-110 transition-transform" />
                                )}
                                <span
                                  className={`text-[12px] ${
                                    replyIsLiked ? "animate-likeNumber" : ""
                                  }`}
                                >
                                  {getLikesCount(reply.id, reply.likes) > 0
                                    ? formatNumber(
                                        getLikesCount(reply.id, reply.likes)
                                      )
                                    : "赞"}
                                </span>
                              </button>

                              {!isReplyHidden && (
                                <button
                                  onClick={() => onReply?.(comment)}
                                  className="text-[#FFFFFF99] hover:text-white transition-colors text-[12px]"
                                >
                                  回复
                                </button>
                              )}

                              {!isReplyHidden && (
                                <button
                                  onClick={() =>
                                    handleCopyComment(reply.content)
                                  }
                                  className="flex items-center gap-1 text-[#FFFFFF99] hover:text-white transition-colors group"
                                >
                                  <IconForward className="text-[12px] group-hover:scale-110 transition-transform" />
                                </button>
                              )}

                              <button
                                onClick={() => toggleHideComment(reply.id)}
                                className={`flex items-center gap-1 transition-colors group ${
                                  isReplyHidden
                                    ? "text-gray-600 hover:text-green-500"
                                    : "text-[#FFFFFF99] hover:text-[#fe2c55]"
                                }`}
                              >
                                {isReplyHidden ? (
                                  <PiHeartBreakFill className="text-[12px] group-hover:scale-110 transition-transform" />
                                ) : (
                                  <PiHeartBreak className="text-[12px] group-hover:scale-110 transition-transform" />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CommentList;
