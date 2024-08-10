/*
 * @Author: zhangjw zhangjiaowei@newgrand.cn
 * @Date: 2024-08-05 14:42:46
 * @LastEditors: zhangjw
 * @LastEditTime: 2024-08-10 15:19:57
 * @Description: file content
 */
import BaseModal, { BaseModalProps } from "../modal";
import { render } from "@/lib/dom-render";

// interface AsyncConfirmPorps
export const asyncConfirm = ({
  title = "确认框",
  content = "确定操作吗",
  ...props
}: Omit<
  BaseModalProps,
  "onOk" | "onCancel" | "isOpen" | "defaultOpen"
> = {}) => {
  return new Promise((resolve, reject) => {
    const container = document.createDocumentFragment();
    render(
      <BaseModal
        title={title}
        content={content}
        {...props}
        onOk={(close) => {
          resolve(true);
          close();
        }}
        onCancel={(close) => {
          reject("cancel");
          close();
        }}
        defaultOpen
      ></BaseModal>,
      container
    );
  });
};
