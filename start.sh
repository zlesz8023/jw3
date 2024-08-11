#!/bin/bash


# 确保脚本在遇到任何命令失败时立即退出，并打印执行的每个命令
set -ex
# 设置环境变量以确保使用 UTF-8 字符集
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8

# 检查 PM2 是否已安装
if ! command -v pm2 &> /dev/null
then
  echo "未找到 PM2。正在安装..."
  npm install -g pm2
fi

# 安装 Node.js 生产环境依赖
echo "正在安装 Node.js 生产环境依赖..."
pnpm install --prod

# 启动应用
echo "正在启动应用..."
pnpm pm2 start ecosystem.config.js --env production

# 检查启动状态
if pm2 describe app > /dev/null 2>&1; then
  echo "应用启动成功。"
else
  echo "启动应用失败。"
  exit 1
fi

# 清理
echo "正在清理..."
pm2 save
pm2 startup