// 模拟网络请求的函数
// 这个函数可以假装从服务器获取数据
export const mockRequest = <T>(data: T, delay = 300): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
};