import { atom } from "jotai";
import type { CommentItem } from "../types";
import { mockCommentData } from "../mock/commentData";
import { fetchCommentsByVideoId, postComment } from "../utils/mockRequest";

// 当前视频的评论列表
export const commentsAtom = atom<CommentItem[]>([]);

// 评论加载状态
export const commentsLoadingAtom = atom<boolean>(false);

// 评论输入框内容
export const commentInputAtom = atom<string>("");

// 是否显示评论区
export const showCommentsAtom = atom<boolean>(false);

// 评论排序方式
export type CommentSortType = "hot" | "time";
export const commentSortAtom = atom<CommentSortType>("hot");

// 获取评论列表
export const loadCommentsAtom = atom(
  null,
  async (get, set, videoId: string) => {
    set(commentsLoadingAtom, true);
    try {
      const comments = await fetchCommentsByVideoId(videoId);
      set(commentsAtom, comments);
      console.log(`💬 加载了 ${comments.length} 条评论`);
    } catch (error) {
      console.error("❌ 加载评论失败:", error);
      set(commentsAtom, []);
    } finally {
      set(commentsLoadingAtom, false);
    }
  }
);

// 发送评论
export const sendCommentAtom = atom(null, async (get, set, videoId: string) => {
  const content = get(commentInputAtom).trim();
  if (!content) {
    alert("⚠️ 请输入评论内容");
    return;
  }

  try {
    const result = await postComment(videoId, content);
    if (result.success) {
      // 添加到评论列表顶部
      const currentComments = get(commentsAtom);
      set(commentsAtom, [result.comment, ...currentComments]);
      set(commentInputAtom, ""); // 清空输入框
      console.log("✅ 评论发送成功");
    }
  } catch (error) {
    console.error("❌ 发送评论失败:", error);
    alert("❌ 发送失败，请重试");
  }
});

// 点赞评论
export const likeCommentAtom = atom(null, (get, set, commentId: string) => {
  const comments = get(commentsAtom);
  const newComments = comments.map((comment) => {
    if (comment.id === commentId) {
      return {
        ...comment,
        likes: comment.likes + 1,
      };
    }
    // 如果是回复
    if (comment.replies) {
      return {
        ...comment,
        replies: comment.replies.map((reply) =>
          reply.id === commentId ? { ...reply, likes: reply.likes + 1 } : reply
        ),
      };
    }
    return comment;
  });
  set(commentsAtom, newComments);
  console.log(`👍 点赞评论: ${commentId}`);
});
