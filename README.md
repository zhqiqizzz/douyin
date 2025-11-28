# Douyin Clone (仿抖音)

这是一个基于 React + TypeScript + Vite 构建的短视频平台仿制项目。

## 特性

- **沉浸式视频播放**: 使用 `xgplayer` 实现流畅的视频播放体验。
- **视频切换**: 支持通过按钮点击或键盘快捷键（上下方向键）切换视频。
- **交互功能**: 支持点赞、评论、分享等基础交互。
- **评论系统**: 底部弹出的评论抽屉，支持查看和发布评论。
- **响应式布局**: 使用 Tailwind CSS 构建，适配移动端体验。
- **状态管理**: 使用 `jotai` 进行轻量级全局状态管理。

## 技术栈

- **核心框架**: [React 18](https://react.dev/)
- **构建工具**: [Vite](https://vitejs.dev/)
- **语言**: [TypeScript](https://www.typescriptlang.org/)
- **样式**: [Tailwind CSS](https://tailwindcss.com/)
- **UI 组件库**:
  - [@douyinfe/semi-ui](https://semi.design/)
- **状态管理**: [Jotai](https://jotai.org/)
- **视频播放器**: [xgplayer](https://h5player.bytedance.com/)
- **图标库**:
  - [React Icons](https://react-icons.github.io/react-icons/)
  - [@douyinfe/semi-icons](https://semi.design/zh-CN/other/icons)

## 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/zhqiqizzz/douyin.git
cd douyin
```

### 2. 安装依赖

```bash
npm install
# 或者
yarn
# 或者
pnpm install
```

### 3. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173 查看效果。

### 4. 构建生产版本

```bash
npm run build
```

## 目录结构

```
src/
├── assets/         # 静态资源
├── components/     # 公共组件 (评论、侧边栏、视频控制等)
├── hooks/          # 自定义 Hooks (如键盘快捷键)
├── mock/           # 模拟数据
├── pages/          # 页面组件
├── store/          # Jotai 状态管理
├── types/          # TypeScript 类型定义
├── utils/          # 工具函数
├── App.tsx         # 根组件
└── main.tsx        # 入口文件
```

## 待办事项

- [ ] 搜索功能完善
- [ ] 视频播放功能优化
- [ ] 视频精选区
