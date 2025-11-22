// store/commentStore.ts
import { atom } from "jotai";
import type { CommentItem } from "../types";

export const showCommentsAtom = atom(false);
export const commentsAtom = atom<CommentItem[]>([]);
export const commentsLoadingAtom = atom(false);
export const commentInputAtom = atom("");
export const commentSortAtom = atom<"hot" | "time">("hot");

// ✅ localStorage 键名
const COMMENTS_STORAGE_KEY = "video_comments_";
const VIRTUAL_COUNT_STORAGE_KEY = "video_virtual_count_";

// ✅ 虚拟评论总数（初始值从视频 stats 获取）
export const virtualCommentCountAtom = atom(0);

// 从 localStorage 读取评论
const getCommentsFromStorage = (videoId: string): CommentItem[] => {
  try {
    const stored = localStorage.getItem(COMMENTS_STORAGE_KEY + videoId);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("读取评论失败:", error);
    return [];
  }
};

// 保存评论到 localStorage
const saveCommentsToStorage = (videoId: string, comments: CommentItem[]) => {
  try {
    localStorage.setItem(
      COMMENTS_STORAGE_KEY + videoId,
      JSON.stringify(comments)
    );
  } catch (error) {
    console.error("保存评论失败:", error);
  }
};

// ✅ 从 localStorage 读取虚拟评论数
const getVirtualCountFromStorage = (videoId: string): number | null => {
  try {
    const stored = localStorage.getItem(VIRTUAL_COUNT_STORAGE_KEY + videoId);
    return stored ? parseInt(stored, 10) : null;
  } catch (error) {
    console.error("读取虚拟评论数失败:", error);
    return null;
  }
};

// ✅ 保存虚拟评论数到 localStorage
const saveVirtualCountToStorage = (videoId: string, count: number) => {
  try {
    localStorage.setItem(VIRTUAL_COUNT_STORAGE_KEY + videoId, count.toString());
  } catch (error) {
    console.error("保存虚拟评论数失败:", error);
  }
};

// ✅ 计算实际评论数（一级 + 二级）
export const actualCommentCountAtom = atom((get) => {
  const comments = get(commentsAtom);
  let total = comments.length;
  comments.forEach((comment) => {
    if (comment.replies) {
      total += comment.replies.length;
    }
  });
  return total;
});

// ✅ 初始化虚拟评论数
export const initVirtualCountAtom = atom(
  null,
  (get, set, params: { videoId: string; initialCount: number }) => {
    const { videoId, initialCount } = params;

    // 先尝试从 localStorage 读取
    const storedCount = getVirtualCountFromStorage(videoId);

    if (storedCount !== null) {
      set(virtualCommentCountAtom, storedCount);
    } else {
      // 没有缓存，使用初始值
      set(virtualCommentCountAtom, initialCount);
      saveVirtualCountToStorage(videoId, initialCount);
    }
  }
);

// ✅ 加载评论
export const loadCommentsAtom = atom(
  null,
  async (get, set, videoId: string) => {
    set(commentsLoadingAtom, true);
    try {
      // 从 localStorage 读取
      const storedComments = getCommentsFromStorage(videoId);

      if (storedComments.length > 0) {
        set(commentsAtom, storedComments);
        set(commentsLoadingAtom, false);
        return;
      }

      // Mock 数据
      await new Promise((resolve) => setTimeout(resolve, 500));

      const mockComments: CommentItem[] = [
        {
          id: "1",
          user: {
            id: "user1",
            name: "张三",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
          },
          content: "这个视频太精彩了！学到了很多东西，感谢分享！👍",
          likes: 128,
          createTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          replies: [
            {
              id: "1-1",
              user: {
                id: "user2",
                name: "李四",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
              },
              content: "同感！已经收藏了，准备多看几遍",
              likes: 32,
              createTime: new Date(
                Date.now() - 1 * 60 * 60 * 1000
              ).toISOString(),
              replies: [],
            },
            {
              id: "1-2",
              user: {
                id: "user3",
                name: "王五",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=3",
              },
              content: "确实讲得很好，期待更新",
              likes: 15,
              createTime: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
              replies: [],
            },
          ],
        },
        {
          id: "2",
          user: {
            id: "user4",
            name: "赵六",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=4",
          },
          content: "讲解得很详细，每一步都很清楚，赞👍\n非常实用的教程",
          likes: 56,
          createTime: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
          replies: [],
        },
        {
          id: "3",
          user: {
            id: "user5",
            name: "孙七",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=5",
          },
          content: "太棒了！正是我需要的内容",
          likes: 23,
          createTime: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
          replies: [
            {
              id: "3-1",
              user: {
                id: "user6",
                name: "周八",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=6",
              },
              content: "+1，很有帮助",
              likes: 8,
              createTime: new Date(
                Date.now() - 8 * 60 * 60 * 1000
              ).toISOString(),
              replies: [],
            },
          ],
        },
      ];

      set(commentsAtom, mockComments);
      saveCommentsToStorage(videoId, mockComments);
    } catch (error) {
      console.error("加载评论失败:", error);
    } finally {
      set(commentsLoadingAtom, false);
    }
  }
);

// ✅ 发送评论（虚拟数 +1）
export const sendCommentAtom = atom(
  null,
  async (
    get,
    set,
    params: { videoId: string; content: string; parentId?: string }
  ) => {
    const { videoId, content, parentId } = params;
    if (!content.trim()) return;

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const currentComments = get(commentsAtom);
      let updatedComments: CommentItem[];

      if (parentId) {
        // 添加二级评论
        const newReply: CommentItem = {
          id: `temp-reply-${Date.now()}`,
          user: {
            id: "current-user",
            name: "我",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=current",
          },
          content: content.trim(),
          likes: 0,
          createTime: new Date().toISOString(),
          replies: [],
        };

        updatedComments = currentComments.map((comment) => {
          if (comment.id === parentId) {
            return {
              ...comment,
              replies: [newReply, ...(comment.replies || [])],
            };
          }
          return comment;
        });
      } else {
        // 添加一级评论
        const newComment: CommentItem = {
          id: `temp-${Date.now()}`,
          user: {
            id: "current-user",
            name: "我",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=current",
          },
          content: content.trim(),
          likes: 0,
          createTime: new Date().toISOString(),
          replies: [],
        };

        updatedComments = [newComment, ...currentComments];
      }

      set(commentsAtom, updatedComments);
      saveCommentsToStorage(videoId, updatedComments);

      // ✅ 虚拟评论数 +1
      const currentVirtualCount = get(virtualCommentCountAtom);
      const newVirtualCount = currentVirtualCount + 1;
      set(virtualCommentCountAtom, newVirtualCount);
      saveVirtualCountToStorage(videoId, newVirtualCount);
    } catch (error) {
      console.error("发送评论失败:", error);
      throw error;
    }
  }
);

// ✅ 删除评论（虚拟数 -1）
export const deleteCommentAtom = atom(
  null,
  (
    get,
    set,
    params: { videoId: string; commentId: string; parentId?: string }
  ) => {
    const { videoId, commentId, parentId } = params;
    const currentComments = get(commentsAtom);
    let updatedComments: CommentItem[];

    if (parentId) {
      // 删除二级评论
      updatedComments = currentComments.map((comment) => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: (comment.replies || []).filter(
              (reply) => reply.id !== commentId
            ),
          };
        }
        return comment;
      });
    } else {
      // 删除一级评论（包括其所有回复）
      const deletedComment = currentComments.find((c) => c.id === commentId);
      const deletedCount = 1 + (deletedComment?.replies?.length || 0);

      updatedComments = currentComments.filter((c) => c.id !== commentId);

      // ✅ 虚拟评论数 - 删除的评论数（包括回复）
      const currentVirtualCount = get(virtualCommentCountAtom);
      const newVirtualCount = Math.max(0, currentVirtualCount - deletedCount);
      set(virtualCommentCountAtom, newVirtualCount);
      saveVirtualCountToStorage(videoId, newVirtualCount);

      set(commentsAtom, updatedComments);
      saveCommentsToStorage(videoId, updatedComments);
      return;
    }

    set(commentsAtom, updatedComments);
    saveCommentsToStorage(videoId, updatedComments);

    // ✅ 虚拟评论数 -1（只删除二级评论）
    const currentVirtualCount = get(virtualCommentCountAtom);
    const newVirtualCount = Math.max(0, currentVirtualCount - 1);
    set(virtualCommentCountAtom, newVirtualCount);
    saveVirtualCountToStorage(videoId, newVirtualCount);
  }
);

export const likeCommentAtom = atom(null, (get, set, commentId: string) => {
  console.log("点赞评论:", commentId);
});
