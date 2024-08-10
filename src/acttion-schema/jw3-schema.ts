/*
 * @Author: zhangjw zhangjiaowei@newgrand.cn
 * @Date: 2024-08-09 16:55:18
 * @LastEditors: zhangjw
 * @LastEditTime: 2024-08-09 17:11:16
 * @Description: file content
 */

import { z } from "zod";

export const jw3Schema = z.object({
  cookies: z.string().min(1, {
    message: "cookies 必输",
  }),
  //   url: z.optional(z.string()),
});

export type Jw3Schema = z.infer<typeof jw3Schema>;
