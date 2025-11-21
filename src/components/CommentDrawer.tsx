import { useEffect } from "react";
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
import type { CommentSortType } from "../store/commentStore";
import CommentList from "./CommentList";
import { IconClose, IconSend, IconLoading } from "@douyinfe/semi-icons";
import { Spin } from "@douyinfe/semi-ui";

interface CommentDrawerProps {
  videoId: string;
}

function CommentDrawer({ videoId }: CommentDrawerProps) {
  const [showComments, setShowComments] = useAtom(showCommentsAtom);
  const [comments] = useAtom(commentsAtom);
  const [loading] = useAtom(commentsLoadingAtom);
  const [commentInput, setCommentInput] = useAtom(commentInputAtom);
  const [sortType, setSortType] = useAtom(commentSortAtom);

  const loadComments = useSetAtom(loadCommentsAtom);
  const sendComment = useSetAtom(sendCommentAtom);
  const likeComment = useSetAtom(likeCommentAtom);

  // 加载评论
  useEffect(() => {
    if (showComments && videoId) {
      loadComments(videoId);
    }
  }, [showComments, videoId]);

  // 关闭抽屉
  const handleClose = () => {
    setShowComments(false);
  };

  // 发送评论
  const handleSend = () => {
    sendComment(videoId);
  };

  // 回复评论
  const handleReply = (comment: any) => {
    setCommentInput(`回复 @${comment.user.name}: `);
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
      <div className="fixed right-0 top-0 bottom-0 w-[400px] bg-[#1a1b1f] z-50 flex flex-col shadow-2xl animate-slide-in-right">
        {/* 头部 */}
        <div className="h-14 flex items-center justify-between px-4 border-b border-gray-800">
          <div className="flex items-center gap-4">
            <h3 className="text-white font-medium">
              评论{" "}
              <span className="text-gray-500 text-sm">({comments.length})</span>
            </h3>

            {/* 排序切换 */}
            <div className="flex gap-2">
              <button
                onClick={() => setSortType("hot")}
                className={`text-xs px-2 py-1 rounded transition-colors ${
                  sortType === "hot"
                    ? "bg-[#fe2c55] text-white"
                    : "text-gray-500 hover:text-white"
                }`}
              >
                最热
              </button>
              <button
                onClick={() => setSortType("time")}
                className={`text-xs px-2 py-1 rounded transition-colors ${
                  sortType === "time"
                    ? "bg-[#fe2c55] text-white"
                    : "text-gray-500 hover:text-white"
                }`}
              >
                最新
              </button>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-white transition-colors"
          >
            <IconClose size="large" />
          </button>
        </div>

        {/* 评论列表 */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
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

        {/* 输入框 */}
        <div className="h-16 border-t border-gray-800 px-4 flex items-center gap-2">
          <input
            type="text"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="说点什么..."
            className="flex-1 bg-gray-800 text-white text-sm px-4 py-2 rounded-full outline-none focus:bg-gray-700 transition-colors placeholder-gray-500"
          />
          <button
            onClick={handleSend}
            disabled={!commentInput.trim()}
            className="w-9 h-9 rounded-full bg-[#fe2c55] text-white flex items-center justify-center hover:bg-[#ff0058] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <IconSend size="small" />
          </button>
        </div>
      </div>
    </>
  );
}

export default CommentDrawer;
