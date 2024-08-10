/*
 * @Author: zhangjw zhangjiaowei@newgrand.cn
 * @Date: 2024-08-08 17:24:29
 * @LastEditors: zhangjw
 * @LastEditTime: 2024-08-10 16:29:55
 * @Description: file content
 */
"use server";
import { jw3Schema } from "@/acttion-schema/jw3-schema";
import { createSafeActionClient } from "next-safe-action";

const action = createSafeActionClient();
export const shopTestAction = action
  .schema(jw3Schema)
  .action(async ({ parsedInput: { cookies } }) => {
    console.log("cookis", cookies);

    return { success: true, msg: "操作成功" };
  });
