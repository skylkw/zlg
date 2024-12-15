# 株齿电机控制上位机

株齿电机控制上位机是一款用于监控和控制电机状态的应用程序。通过实时数据可视化和用户友好的界面，帮助用户高效管理电机运行情况。

## 目录

- [安装](#安装)
- [快速开始](#快速开始)
- [项目结构](#项目结构)
- [功能特性](#功能特性)
- [技术栈](#技术栈)
- [贡献](#贡献)
- [许可证](#许可证)
- [联系方式](#联系方式)

## 安装

### 先决条件

确保已安装以下软件：

- [Node.js](https://nodejs.org/) v14 或以上
- [pnpm](https://pnpm.io/) v6 或以上

### 克隆仓库

```sh
git clone https://github.com/skylkw/zlg.git
cd zlg
```

### 安装 pnpm
如果你还没有安装 pnpm，请先全局安装 pnpm：
```sh
npm install -g pnpm
```

### 安装依赖项
使用 pnpm 安装项目的所有依赖项：
```sh
pnpm install
```

## 快速开始

### 运行开发服务器
启动开发服务器以在本地运行项目：
```sh
pnpm dev
```

### 构建项目
构建生产版本：
```sh
pnpm build
```

### 运行测试
执行单元测试：
```sh
pnpm test
```

## 项目结构

```
.
├── .gitignore
├── .prettierrc.json
├── .vscode/
│   ├── extensions.json
│   └── settings.json
├── auto-imports.d.ts
├── components.d.ts
├── components.json
├── env.d.ts
├── index.html
├── package.json
├── pnpm-lock.yaml
├── postcss.config.js
├── public/
├── README.md
├── src/
│   ├── api/
│   │   ├── index.ts
│   │   └── methods/
│   │       └── ...
│   ├── App.vue
│   ├── assets/
│   │   └── index.css
│   ├── components/
│   │   ├── form/
│   │   └── ui/
│   ├── layouts/
│   │   ├── icon/
│   │   └── index.vue
│   ├── lib/
│   │   └── utils.ts
│   ├── main.ts
│   ├── router/
│   │   └── index.ts
│   ├── stores/
│   │   └── useAppStore.ts
│   └── views/
│       └── ...
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## 功能特性

- 侧边栏导航：提供直观的导航菜单，方便用户在不同模块和页面之间切换。
- 主题切换：支持暗黑和明亮模式的切换，提升用户体验。
- 实时数据可视化：使用 ECharts 展示电机速度和位置的实时数据折线图，帮助用户监控电机状态。
- 响应式设计：确保应用在各种设备和屏幕尺寸下都能良好显示和操作。
- 用户信息展示：在侧边栏底部展示用户头像和基本信息，提供个性化体验。
- 集成单元测试：保障代码质量，确保功能的稳定性和可靠性。
- 优化性能：通过代码分割和懒加载等技术手段优化应用性能。

## 技术栈

- Vue 3
- TypeScript
- Vite
- Pinia
- Tailwind CSS
- ECharts
- PostCSS
- Vue Router

## 贡献

欢迎贡献！请遵循以下步骤：

1. Fork 本仓库
2. 创建你的特性分支 (git checkout -b feature/新特性)
3. 提交你的更改 (git commit -m '添加新特性')
4. 推送到分支 (git push origin feature/新特性)
5. 创建一个新的 Pull Request

详细信息请参阅 CONTRIBUTING.md。

## 许可证

本项目采用 MIT 许可证。详情请参阅 LICENSE 文件。

## 联系方式

如有任何问题或建议，请联系 lkw@example.com 或访问 GitHub Issues 页面提交。
