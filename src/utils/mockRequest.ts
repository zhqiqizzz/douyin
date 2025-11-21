import type { VideoItem, CommentItem } from "../types";
import { mockVideoData } from "../mock/videoData";
import { mockCommentData } from "../mock/commentData.ts";

// 通用的模拟请求函数
export const mockRequest = <T>(data: T, delay = 300): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
};

// 获取视频列表
export const fetchVideoList = (): Promise<VideoItem[]> => {
  return mockRequest(mockVideoData, 500);
};

// 根据ID获取单个视频
export const fetchVideoById = (id: string): Promise<VideoItem | undefined> => {
  const video = mockVideoData.find((v) => v.id === id);
  return mockRequest(video, 300);
};

// 获取视频的评论列表
export const fetchCommentsByVideoId = (
  videoId: string
): Promise<CommentItem[]> => {
  const comments = mockCommentData[videoId] || [];
  return mockRequest(comments, 400);
};

// 模拟点赞操作
export const likeVideo = (videoId: string): Promise<{ success: boolean }> => {
  console.log(`点赞视频: ${videoId}`);
  return mockRequest({ success: true }, 200);
};

// 模拟收藏操作
export const favoriteVideo = (
  videoId: string
): Promise<{ success: boolean }> => {
  console.log(`收藏视频: ${videoId}`);
  return mockRequest({ success: true }, 200);
};

// 模拟关注操作
export const followUser = (userId: string): Promise<{ success: boolean }> => {
  console.log(`关注用户: ${userId}`);
  return mockRequest({ success: true }, 200);
};

// 模拟发送评论
export const postComment = (
  videoId: string,
  content: string
): Promise<{ success: boolean; comment: CommentItem }> => {
  const newComment: CommentItem = {
    id: `c${Date.now()}`,
    user: {
      id: "currentUser",
      name: "当前用户",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=current",
    },
    content,
    createTime: "刚刚",
    likes: 0,
  };

  console.log(`发送评论到视频 ${videoId}: ${content}`);
  return mockRequest({ success: true, comment: newComment }, 300);
};
