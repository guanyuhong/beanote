# MINDPALACES.AI Official Website

这是 MINDPALACES.AI 的官方网站源代码。我们致力于为每个人打造一个私密、智能的思维空间。

## 特性

- 🔒 隐私优先：数据本地存储，设备端AI推理
- 🏰 结构化思维：多模态输入，智能标签和链接
- 🤖 AI驱动：语音识别、总结、创意助手

## 开发

本项目是一个纯静态网站，使用现代HTML、CSS和Three.js构建。

### 本地运行

由于使用了 Three.js，需要通过 HTTP 服务器来运行网站。你可以选择以下任一方式：

```bash
# 使用 Python 3
python -m http.server 8000

# 或使用 Python 2
python -m SimpleHTTPServer 8000
```

然后访问 http://localhost:8000

## 部署

本网站使用 GitHub Pages 部署。要部署你自己的版本：

1. Fork 这个仓库
2. 进入仓库设置
3. 在 "Pages" 设置中，选择 "main" 分支作为源
4. 保存后等待几分钟，你的网站就会在 `https://[你的用户名].github.io/mindpalaces` 上线

## 技术栈

- Three.js - 3D背景渲染
- Font Awesome - 图标
- 现代CSS特性
  - Grid Layout
  - Flexbox
  - CSS Variables
  - Backdrop Filter

## 许可

© 2025 MINDPALACES.AI. All rights reserved. 