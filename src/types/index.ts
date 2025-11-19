// 视频数据的类型定义
export interface VideoItem {
  id: string;                    // 视频ID
  videoUrl: string;              // 视频地址
  coverUrl: string;              // 封面图片
  author: {
    name: string;                // 作者名字
    avatar: string;              // 作者头像
  };
  description: string;           // 视频描述
  music: string;                 // 背景音乐名称
  likes: number;                 // 点赞数
  comments: number;              // 评论数
  shares: number;                // 分享数
  favorites: number;             // 收藏数
}

// 评论数据的类型定义
export interface CommentItem {
  id: string;                    // 评论ID
  user: {
    name: string;                // 用户名
    avatar: string;              // 用户头像
  };
  content: string;               // 评论内容
  time: string;                  // 评论时间
  likes: number;                 // 点赞数
  replies?: CommentItem[];       // 回复（可选）
}