import type { VideoItem } from "../types";

// 模拟视频数据
export const mockVideoData: VideoItem[] = [
  {
    id: "1",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // 示例视频
    coverUrl: "https://picsum.photos/400/600?random=1",
    author: {
      id: "user1",
      name: "@苏漫坐（美妆版）",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie",
      isFollowed: false,
    },
    description:
      "第19集：上镜日常妆15分钟保姆级跟练丨出片又自然丨 长视频戳主出击！",
    tags: ["#新手化妆教程", "#今日妆容", "#妆教", "#新手化妆"],
    music: {
      name: "一首友好的键盘曲",
      author: "音乐人",
    },
    stats: {
      likes: 280,
      comments: 446,
      shares: 27,
      favorites: 170,
    },
    createTime: "10月5日",
    location: "四川阿坝",
  },
  {
    id: "2",
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    coverUrl: "https://picsum.photos/400/600?random=2",
    author: {
      id: "user2",
      name: "@COEXIST",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
      isFollowed: false,
    },
    description:
      "心之所向 身之所往 #coexistence 治愈系视频，送给正在努力的你！",
    tags: ["#coexistence", "#治愈", "#正能量"],
    music: {
      name: "星辰大海",
      author: "云朵乐队",
    },
    stats: {
      likes: 238,
      comments: 358,
      shares: 1205,
      favorites: 182,
    },
    createTime: "5天前",
    location: "四川阿坝",
  },
  {
    id: "3",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    coverUrl: "https://picsum.photos/400/600?random=3",
    author: {
      id: "user3",
      name: "@小林同学",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Xiaolin",
      isFollowed: true,
    },
    description: "今天教大家做超简单的快手菜！10分钟搞定晚餐！",
    tags: ["#美食教程", "#快手菜", "#家常菜", "#下饭菜"],
    music: {
      name: "轻松的一天",
      author: "美食BGM",
    },
    stats: {
      likes: 156,
      comments: 234,
      shares: 567,
      favorites: 890,
    },
    createTime: "昨天",
    location: "北京",
  },
  {
    id: "4",
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    coverUrl: "https://picsum.photos/400/600?random=4",
    author: {
      id: "user4",
      name: "@旅行日记",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Travel",
      isFollowed: false,
    },
    description: "西藏自驾游第10天，终于到达珠峰大本营！太震撼了！",
    tags: ["#西藏旅游", "#自驾游", "#珠峰", "#旅行日记"],
    music: {
      name: "漫步云端",
      author: "旅行音乐",
    },
    stats: {
      likes: 2345,
      comments: 345,
      shares: 890,
      favorites: 1230,
    },
    createTime: "2天前",
    location: "西藏",
  },
  {
    id: "5",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    coverUrl: "https://picsum.photos/400/600?random=5",
    author: {
      id: "user5",
      name: "@健身教练王老师",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Coach",
      isFollowed: true,
    },
    description: "7天练出腹肌！每天10分钟腹肌训练，适合新手！",
    tags: ["#健身教程", "#腹肌训练", "#居家健身", "#新手健身"],
    music: {
      name: "燃脂节奏",
      author: "运动音乐",
    },
    stats: {
      likes: 567,
      comments: 890,
      shares: 1200,
      favorites: 2340,
    },
    createTime: "1周前",
    location: "上海",
  },
];
