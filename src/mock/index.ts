// 导出所有模拟数据
export { mockVideoData } from "./videoData";
export { mockCommentData } from "./commentData";

// 导出所有工具函数
export {
  mockRequest,
  fetchVideoList,
  fetchVideoById,
  fetchCommentsByVideoId,
  likeVideo,
  favoriteVideo,
  followUser,
  postComment,
} from "../utils/mockRequest";
