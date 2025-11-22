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
  // 使用 Map 记录每个评论的点赞变化（0: 未点赞, 1: 已点赞）
  const [likesChange, setLikesChange] = useState<Map<string, number>>(
    new Map()
  );
  const [hiddenComments, setHiddenComments] = useState<Set<string>>(new Set());

  // 点赞/取消点赞
  const handleLike = (commentId: string) => {
    if (hiddenComments.has(commentId)) return;

    const newLikesChange = new Map(likesChange);
    const currentChange = newLikesChange.get(commentId) || 0;

    if (currentChange === 1) {
      // 已点赞 → 取消点赞（-1）
      newLikesChange.set(commentId, 0);
    } else {
      // 未点赞 → 点赞（+1）
      newLikesChange.set(commentId, 1);
    }

    setLikesChange(newLikesChange);
  };

  // 计算点赞数
  const getLikesCount = (commentId: string, originalLikes: number) => {
    const change = likesChange.get(commentId) || 0;
    return originalLikes + change;
  };

  // 判断是否已点赞
  const isLiked = (commentId: string) => {
    return (likesChange.get(commentId) || 0) === 1;
  };

  // 复制评论到剪贴板
  const handleCopyComment = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      Toast.success({
        content: "复制成功",
        duration: 2,
      });
    } catch (error) {
      const textArea = document.createElement("textarea");
      textArea.value = content;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        Toast.success({
          content: "复制成功",
          duration: 2,
        });
      } catch (err) {
        Toast.error({
          content: "复制失败",
          duration: 2,
        });
      }
      document.body.removeChild(textArea);
    }
  };

  // 切换隐藏/显示评论
  const toggleHideComment = (commentId: string) => {
    const newHidden = new Set(hiddenComments);
    if (newHidden.has(commentId)) {
      newHidden.delete(commentId);
      Toast.info({
        content: "评论已恢复",
        duration: 2,
      });
    } else {
      newHidden.add(commentId);
      Toast.info({
        content: "评论已隐藏",
        duration: 2,
      });
    }
    setHiddenComments(newHidden);
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
    <div className="space-y-4">
      {comments.map((comment) => {
        const isHidden = hiddenComments.has(comment.id);
        const commentIsLiked = isLiked(comment.id);

        return (
          <div
            key={comment.id}
            className={`
              flex gap-3 transition-all duration-300
              ${isHidden ? "opacity-50" : ""}
            `}
          >
            {/* 头像 */}
            <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 bg-gray-700">
              <img
                src={comment.user.avatar}
                alt={comment.user.name}
                className={`w-full h-full object-cover transition-all duration-300 ${
                  isHidden ? "grayscale" : ""
                }`}
              />
            </div>

            {/* 评论内容 */}
            <div className="flex-1">
              {/* 用户名和时间 */}
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`text-sm font-medium transition-colors ${
                    isHidden ? "text-gray-600" : "text-white"
                  }`}
                >
                  {comment.user.name}
                </span>
                <span className="text-xs text-gray-500">
                  {formatTime(comment.createTime)}
                </span>
              </div>

              {/* 评论文字 */}
              {isHidden ? (
                <p className="text-sm text-gray-600 italic mb-2">
                  该评论已被隐藏
                </p>
              ) : (
                <p className="text-sm text-gray-300 leading-relaxed mb-2">
                  {comment.content}
                </p>
              )}

              {/* 操作按钮 */}
              <div className="flex items-center gap-4 text-xs">
                {/* 点赞按钮 */}
                <button
                  onClick={() => handleLike(comment.id)}
                  disabled={isHidden}
                  className={`
                    flex items-center gap-1 transition-all
                    ${
                      isHidden
                        ? "text-gray-700 cursor-not-allowed"
                        : commentIsLiked
                        ? "text-[#fe2c55]"
                        : "text-gray-500 hover:text-[#fe2c55]"
                    }
                  `}
                >
                  {commentIsLiked ? (
                    <IconLikeHeart size="small" />
                  ) : (
                    <IconHeartStroked size="small" />
                  )}
                  <span>
                    {formatNumber(getLikesCount(comment.id, comment.likes))}
                  </span>
                </button>

                {/* 复制按钮 */}
                {!isHidden && (
                  <button
                    onClick={() => handleCopyComment(comment.content)}
                    className="flex items-center gap-1 text-gray-500 hover:text-white transition-colors"
                  >
                    <IconForward size="small" />
                  </button>
                )}

                {/* 隐藏/恢复按钮 */}
                <button
                  onClick={() => toggleHideComment(comment.id)}
                  className={`
                    flex items-center gap-1 transition-colors group
                    ${
                      isHidden
                        ? "text-gray-600 hover:text-green-500"
                        : "text-gray-500 hover:text-[#fe2c55]"
                    }
                  `}
                >
                  {isHidden ? (
                    <PiHeartBreakFill className="text-white text-sm group-hover:scale-110 transition-transform" />
                  ) : (
                    <PiHeartBreak className="text-sm group-hover:scale-110 transition-transform" />
                  )}
                </button>

                {/* 回复按钮 */}
                {onReply && !isHidden && (
                  <button
                    onClick={() => onReply(comment)}
                    className="text-gray-500 hover:text-white transition-colors"
                  >
                    回复
                  </button>
                )}
              </div>

              {/* 回复列表 */}
              {!isHidden && comment.replies && comment.replies.length > 0 && (
                <div className="mt-3 space-y-3 pl-4 border-l-2 border-gray-800">
                  {comment.replies.map((reply) => {
                    const isReplyHidden = hiddenComments.has(reply.id);
                    const replyIsLiked = isLiked(reply.id);

                    return (
                      <div
                        key={reply.id}
                        className={`flex gap-2 transition-all duration-300 ${
                          isReplyHidden ? "opacity-50" : ""
                        }`}
                      >
                        <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 bg-gray-700">
                          <img
                            src={reply.user.avatar}
                            alt={reply.user.name}
                            className={`w-full h-full object-cover transition-all duration-300 ${
                              isReplyHidden ? "grayscale" : ""
                            }`}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className={`text-xs font-medium transition-colors ${
                                isReplyHidden ? "text-gray-600" : "text-white"
                              }`}
                            >
                              {reply.user.name}
                            </span>
                            <span className="text-xs text-gray-500">
                              {formatTime(reply.createTime)}
                            </span>
                          </div>

                          {isReplyHidden ? (
                            <p className="text-xs text-gray-600 italic mb-1">
                              该评论已被隐藏
                            </p>
                          ) : (
                            <p className="text-xs text-gray-300 leading-relaxed mb-1">
                              {reply.content}
                            </p>
                          )}

                          <div className="flex items-center gap-3">
                            {/* 回复的点赞按钮 */}
                            <button
                              onClick={() => handleLike(reply.id)}
                              disabled={isReplyHidden}
                              className={`
                                flex items-center gap-1 text-xs transition-all
                                ${
                                  isReplyHidden
                                    ? "text-gray-700 cursor-not-allowed"
                                    : replyIsLiked
                                    ? "text-[#fe2c55]"
                                    : "text-gray-500 hover:text-[#fe2c55]"
                                }
                              `}
                            >
                              {replyIsLiked ? (
                                <IconLikeHeart size="extra-small" />
                              ) : (
                                <IconHeartStroked size="extra-small" />
                              )}
                              <span>
                                {formatNumber(
                                  getLikesCount(reply.id, reply.likes)
                                )}
                              </span>
                            </button>

                            {/* 回复的复制按钮 */}
                            {!isReplyHidden && (
                              <button
                                onClick={() => handleCopyComment(reply.content)}
                                className="flex items-center gap-1 text-gray-500 hover:text-white transition-colors text-xs"
                              >
                                <IconForward size="extra-small" />
                              </button>
                            )}

                            {/* 回复的隐藏/恢复按钮 */}
                            <button
                              onClick={() => toggleHideComment(reply.id)}
                              className={`
                                flex items-center gap-1 transition-colors group text-xs
                                ${
                                  isReplyHidden
                                    ? "text-gray-600 hover:text-green-500"
                                    : "text-gray-500 hover:text-[#fe2c55]"
                                }
                              `}
                            >
                              {isReplyHidden ? (
                                <PiHeartBreakFill className="text-white text-xs group-hover:scale-110 transition-transform" />
                              ) : (
                                <PiHeartBreak className="text-xs group-hover:scale-110 transition-transform" />
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
        );
      })}
    </div>
  );
}

export default CommentList;
