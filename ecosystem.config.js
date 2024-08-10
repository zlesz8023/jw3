/*
 * @Author: zhangjw zhangjiaowei@newgrand.cn
 * @Date: 2024-08-10 16:58:07
 * @LastEditors: zhangjw
 * @LastEditTime: 2024-08-10 17:11:44
 * @Description: file content
 */
module.exports = {
  apps: [
    {
      name: "jw3",
      script: "./server.js",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
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
