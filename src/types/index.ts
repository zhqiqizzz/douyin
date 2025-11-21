// 视频数据的类型定义
export interface VideoItem {
  id: string; // 视频ID
  videoUrl: string; // 视频地址
  coverUrl: string; // 封面图片
  author: {
    id: string; // 作者ID
    name: string; // 作者名字
    avatar: string; // 作者头像
    isFollowed: boolean; // 是否已关注
  };
  description: string; // 视频描述
  tags: string[]; // 话题标签（如 #美妆 #教程）
  music: {
    name: string; // 背景音乐名称
    author: string; // 音乐作者
  };
  stats: {
    likes: number; // 点赞数
    comments: number; // 评论数
    shares: number; // 分享数
    favorites: number; // 收藏数
  };
  createTime: string; // 发布时间
  location?: string; // 拍摄地点（可选）
}

// 评论数据的类型定义
export interface CommentItem {
  id: string; // 评论ID
  user: {
    id: string; // 用户ID
    name: string; // 用户名
    avatar: string; // 用户头像
  };
  content: string; // 评论内容
  createTime: string; // 评论时间
  likes: number; // 点赞数
  replies?: CommentItem[]; // 回复（可选，递归结构）
}

// 用户信息类型
export interface UserInfo {
  id: string;
  name: string;
  avatar: string;
  signature: string; // 个性签名
  followersCount: number; // 粉丝数
  followingCount: number; // 关注数
  likesCount: number; // 获赞数
}
