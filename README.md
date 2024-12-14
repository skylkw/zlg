根据你的项目结构和 `package.json` 文件内容，以下是项目的运行步骤：

1. **安装 pnpm**
   如果你还没有安装 pnpm，请先全局安装 pnpm：
   ```sh
   npm install -g pnpm
   ```

2. **克隆仓库**
   克隆 GitHub 仓库到本地：
   ```sh
   git clone https://github.com/skylkw/zlg.git
   cd zlg
   ```

3. **安装依赖项**
   使用 pnpm 安装项目的所有依赖项：
   ```sh
   pnpm install
   ```

4. **运行开发服务器**
   启动开发服务器以在本地运行项目：
   ```sh
   pnpm run dev
   ```

5. **构建项目**
   如果你需要构建项目，请运行以下命令：
   ```sh
   pnpm run build
   ```

6. **预览构建结果**
   构建完成后，可以预览构建结果：
   ```sh
   pnpm run preview
   ```

7. **运行单元测试**
   运行项目的单元测试：
   ```sh
   pnpm run test:unit
   ```

请根据需要在 README.md 文件中添加这些步骤。
