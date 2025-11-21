import type { CommentItem } from "../types";
import { formatTime, formatNumber } from "../utils/formatNumber";
import { IconHeartStroked, IconLikeHeart } from "@douyinfe/semi-icons";
import { useState } from "react";

interface CommentListProps {
  comments: CommentItem[];
  onLike: (commentId: string) => void;
  onReply?: (comment: CommentItem) => void;
}

function CommentList({ comments, onLike, onReply }: CommentListProps) {
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());

  const handleLike = (commentId: string) => {
    const newLiked = new Set(likedComments);
    if (newLiked.has(commentId)) {
      newLiked.delete(commentId);
    } else {
      newLiked.add(commentId);
      onLike(commentId);
    }
    setLikedComments(newLiked);
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
      {comments.map((comment) => (
        <div key={comment.id} className="flex gap-3">
          {/* 头像 */}
          <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 bg-gray-700">
            <img
              src={comment.user.avatar}
              alt={comment.user.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* 评论内容 */}
          <div className="flex-1">
            {/* 用户名 */}
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium text-white">
                {comment.user.name}
              </span>
              <span className="text-xs text-gray-500">
                {formatTime(comment.createTime)}
              </span>
            </div>

            {/* 评论文字 */}
            <p className="text-sm text-gray-300 leading-relaxed mb-2">
              {comment.content}
            </p>

            {/* 操作按钮 */}
            <div className="flex items-center gap-4 text-xs">
              <button
                onClick={() => handleLike(comment.id)}
                className="flex items-center gap-1 text-gray-500 hover:text-[#fe2c55] transition-colors"
              >
                {likedComments.has(comment.id) ? (
                  <IconLikeHeart className="text-[#fe2c55]" size="small" />
                ) : (
                  <IconHeartStroked size="small" />
                )}
                <span>
                  {formatNumber(
                    comment.likes + (likedComments.has(comment.id) ? 1 : 0)
                  )}
                </span>
              </button>

              {onReply && (
                <button
                  onClick={() => onReply(comment)}
                  className="text-gray-500 hover:text-white transition-colors"
                >
                  回复
                </button>
              )}
            </div>

            {/* 回复列表 */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="mt-3 space-y-3 pl-4 border-l-2 border-gray-800">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="flex gap-2">
                    <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 bg-gray-700">
                      <img
                        src={reply.user.avatar}
                        alt={reply.user.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-white">
                          {reply.user.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatTime(reply.createTime)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-300 leading-relaxed mb-1">
                        {reply.content}
                      </p>
                      <button
                        onClick={() => handleLike(reply.id)}
                        className="flex items-center gap-1 text-gray-500 hover:text-[#fe2c55] transition-colors text-xs"
                      >
                        {likedComments.has(reply.id) ? (
                          <IconLikeHeart
                            className="text-[#fe2c55]"
                            size="extra-small"
                          />
                        ) : (
                          <IconHeartStroked size="extra-small" />
                        )}
                        <span>
                          {formatNumber(
                            reply.likes + (likedComments.has(reply.id) ? 1 : 0)
                          )}
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CommentList;
