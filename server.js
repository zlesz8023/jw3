/*
 * @Author: zhangjw zhangjiaowei@newgrand.cn
 * @Date: 2024-08-10 16:44:43
 * @LastEditors: zhangjw
 * @LastEditTime: 2024-08-10 16:47:24
 * @Description: file content
 */
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
