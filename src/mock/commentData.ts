import type { CommentItem } from "../types";

// 模拟评论数据（按视频ID分组）
export const mockCommentData: Record<string, CommentItem[]> = {
  1: [
    {
      id: "c1",
      user: {
        id: "u101",
        name: "小美爱化妆",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user1",
      },
      content: "太实用了！跟着博主学会了日常妆，感谢分享！",
      createTime: "2小时前",
      likes: 128,
      replies: [
        {
          id: "c1-1",
          user: {
            id: "user1",
            name: "@苏漫坐（美妆版）",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie",
          },
          content: "谢谢支持！多多练习就能画得更好啦～",
          createTime: "1小时前",
          likes: 45,
        },
      ],
    },
    {
      id: "c2",
      user: {
        id: "u102",
        name: "新手小白",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user2",
      },
      content: "请问用的什么牌子的粉底液呀？",
      createTime: "3小时前",
      likes: 56,
    },
    {
      id: "c3",
      user: {
        id: "u103",
        name: "化妆达人",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user3",
      },
      content: "手法很细腻，适合新手学习！已收藏",
      createTime: "5小时前",
      likes: 89,
    },
  ],
  2: [
    {
      id: "c4",
      user: {
        id: "u104",
        name: "追光者",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user4",
      },
      content: "太治愈了，看完心情都变好了！",
      createTime: "1天前",
      likes: 234,
    },
    {
      id: "c5",
      user: {
        id: "u105",
        name: "旅行者",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user5",
      },
      content: "四川阿坝的风景真的太美了！",
      createTime: "1天前",
      likes: 167,
    },
  ],
  3: [
    {
      id: "c6",
      user: {
        id: "u106",
        name: "吃货一号",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user6",
      },
      content: "太简单了！今晚就试试！",
      createTime: "昨天",
      likes: 445,
    },
  ],
  4: [
    {
      id: "c7",
      user: {
        id: "u107",
        name: "旅游爱好者",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user7",
      },
      content: "一直想去西藏，看了你的视频更想去了！",
      createTime: "2天前",
      likes: 678,
    },
  ],
  5: [
    {
      id: "c8",
      user: {
        id: "u108",
        name: "健身小白",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user8",
      },
      content: "跟着练了3天，已经有点效果了！",
      createTime: "3天前",
      likes: 1234,
    },
  ],
};
