# 第一阶段：构建阶段
FROM node:18 AS builder

# 设置工作目录
WORKDIR /app

# 将 pnpm-lock.yaml 和 package.json 复制到容器中
COPY pnpm-lock.yaml ./
COPY package.json ./

# 安装 pnpm
RUN npm install -g pnpm

# 安装依赖
RUN pnpm install --frozen-lockfile

# 将项目源代码复制到容器中
COPY . .

# 构建 Next.js 应用
RUN pnpm run build

# 第二阶段：运行阶段
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制构建好的文件到新的镜像中
COPY --from=builder /app/.next .
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# 安装生产环境所需的依赖
RUN pnpm install --only=prod --frozen-lockfile

# 暴露端口
EXPOSE 3000

# 启动 Next.js 应用
CMD ["next", "start"]