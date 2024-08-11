/*
 * @Author: zhangjw zhangjiaowei@newgrand.cn
 * @Date: 2024-08-10 16:58:07
 * @LastEditors: zhangjw
 * @LastEditTime: 2024-08-10 17:54:33
 * @Description: file content
 */
module.exports = {
  apps: [
    {
      name: "jw3",
      script: "next start", // 使用 next start 命令
      instances: 1, // 应用实例的数量，设置为 1 表示单实例运行
      autorestart: true, // 应用崩溃后自动重启
      watch: false, // 不监视文件更改并自动重启
      max_memory_restart: "1G", // 当应用使用内存超过 1GB 时自动重启
      env: {
        NODE_ENV: "production", // 设置环境变量 NODE_ENV 为 production
        PORT: 3000, // 设置端口为 3001
      },
      log_level: "info", // 设置日志级别为 info
      log_date_format: "YYYY-MM-DD HH:mm:ss", // 设置日志时间格式
    },
  ],
  // TODO 自动部署
  deploy: {
    production: {
      user: "username",
      host: "your-server-ip",
      ref: "origin/main",
      repo: "git@github.com:repo/repo.git",
      path: "/var/www/your-app-name",
      "post-deploy":
        "npm install && npm run build && pm2 reload ecosystem.config.js --env production",
    },
  },
};
