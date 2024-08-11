# 第一阶段：构建阶段
FROM public.ecr.aws/docker/library/node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app


FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

# 第二阶段：运行阶段
FROM node:18-alpine

# 设置工作目录
# WORKDIR /app

# 复制构建好的文件到新的镜像中
FROM base
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/.next /app/.next
EXPOSE 8000

# 安装生产环境所需的依赖
RUN pnpm install --only=prod --frozen-lockfile

# 暴露端口
EXPOSE 3000

# 启动 Next.js 应用
CMD ["next", "start"]