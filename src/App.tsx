import "./App.css";
import Home from "./pages/Home";
import { useEffect } from "react";
import { fetchVideoList } from "./mock";

function App() {
  // 测试：在页面加载时获取视频数据
  useEffect(() => {
    fetchVideoList().then((videos) => {
      console.log("📹 获取到的视频数据:", videos);
      console.log(`✅ 共有 ${videos.length} 个视频`);
    });
  }, []);

  return <Home />;
}

export default App;
