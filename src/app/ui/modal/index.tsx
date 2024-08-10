"use client";
/*
 * @Author: zhangjw zhangjiaowei@newgrand.cn
 * @Date: 2024-08-04 23:22:50
 * @LastEditors: zhangjw
 * @LastEditTime: 2024-08-06 20:18:23
 * @Description: file content
 */
import React, { forwardRef, ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDisclosure, UseDisclosureProps } from "@/hooks";

type PressEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;

interface ButtonCallback {
  (close: () => void, e: PressEvent): void;
}

export interface BaseModalProps
  extends Pick<UseDisclosureProps, "defaultOpen" | "isOpen"> {
  title?: ReactNode;
  content?: ReactNode;
  onOk?: ButtonCallback;
  onCancel?: ButtonCallback;
}

export function AlertDialogDemo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          {/* <AlertDialogTitle>标题 </AlertDialogTitle> */}
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>取消</AlertDialogCancel>
          <AlertDialogAction>确认</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

const BaseModal = ({
  title,
  content,
  onCancel,
  onOk,
  ...other
}: BaseModalProps) => {
  const { isOpen, onOpenChange, onClose } = useDisclosure(other);

  const handleClose = (cb?: ButtonCallback) => (e: PressEvent) => {
    if (cb) {
      return cb(onClose, e);
    }
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          {title ? <AlertDialogTitle>{title} </AlertDialogTitle> : null}
          <AlertDialogDescription>{content}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleClose(onCancel)}>
            取消
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleClose(onOk)}>
            确认
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    // </>
  );
};

export default BaseModal;
