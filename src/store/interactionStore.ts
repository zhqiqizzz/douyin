import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

// 点赞状态（按视频ID存储）
export const likedVideosAtom = atomWithStorage<Set<string>>(
  "likedVideos",
  new Set(),
  {
    getItem: (key): Set<string> => {
      const storedValue = localStorage.getItem(key);
      if (!storedValue) return new Set();
      return new Set(JSON.parse(storedValue));
    },
    setItem: (key, value) => {
      localStorage.setItem(key, JSON.stringify(Array.from(value)));
    },
    removeItem: (key) => localStorage.removeItem(key),
  }
);

// 收藏状态（按视频ID存储）
export const favoritedVideosAtom = atomWithStorage<Set<string>>(
  "favoritedVideos",
  new Set(),
  {
    getItem: (key): Set<string> => {
      const storedValue = localStorage.getItem(key);
      if (!storedValue) return new Set();
      return new Set(JSON.parse(storedValue));
    },
    setItem: (key, value) => {
      localStorage.setItem(key, JSON.stringify(Array.from(value)));
    },
    removeItem: (key) => localStorage.removeItem(key),
  }
);

// 关注状态（按用户ID存储）
export const followedUsersAtom = atomWithStorage<Set<string>>(
  "followedUsers",
  new Set(),
  {
    getItem: (key): Set<string> => {
      const storedValue = localStorage.getItem(key);
      if (!storedValue) return new Set();
      return new Set(JSON.parse(storedValue));
    },
    setItem: (key, value) => {
      localStorage.setItem(key, JSON.stringify(Array.from(value)));
    },
    removeItem: (key) => localStorage.removeItem(key),
  }
);

// 切换点赞
export const toggleLikeAtom = atom(null, (get, set, videoId: string) => {
  const liked = new Set(get(likedVideosAtom));
  if (liked.has(videoId)) {
    liked.delete(videoId);
    console.log(`取消点赞视频: ${videoId}`);
  } else {
    liked.add(videoId);
    console.log(`点赞视频: ${videoId}`);
  }
  set(likedVideosAtom, liked);
  return !get(likedVideosAtom).has(videoId);
});

// 切换收藏
export const toggleFavoriteAtom = atom(null, (get, set, videoId: string) => {
  const favorited = new Set(get(favoritedVideosAtom));
  if (favorited.has(videoId)) {
    favorited.delete(videoId);
    console.log(`取消收藏视频: ${videoId}`);
  } else {
    favorited.add(videoId);
    console.log(`收藏视频: ${videoId}`);
  }
  set(favoritedVideosAtom, favorited);
  return !get(favoritedVideosAtom).has(videoId);
});

// 切换关注
export const toggleFollowAtom = atom(null, (get, set, userId: string) => {
  const followed = new Set(get(followedUsersAtom));
  if (followed.has(userId)) {
    followed.delete(userId);
    console.log(`取消关注用户: ${userId}`);
  } else {
    followed.add(userId);
    console.log(`关注用户: ${userId}`);
  }
  set(followedUsersAtom, followed);
  return !get(followedUsersAtom).has(userId);
});
