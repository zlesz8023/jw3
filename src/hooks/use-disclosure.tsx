"use client";
/*
 * @Author: zhangjw zhangjiaowei@newgrand.cn
 * @Date: 2024-08-05 20:25:58
 * @LastEditors: zhangjw
 * @LastEditTime: 2024-08-06 20:17:05
 * @Description: file content
 */
import { useCallback } from "react";

import { useControlledState } from "./use-controlled-state";

export interface UseDisclosureProps {
  // id?: string;
  defaultOpen?: boolean;
  isOpen?: boolean;
  onChange?: (isOpen: boolean) => void;
}
/**
 * 自定义 hook 用于管理披露组件的打开/关闭状态。
 * @param props - 披露组件的属性对象。
 * @returns 包含状态和管理披露的方法的对象。
 */
export const useDisclosure = (props: UseDisclosureProps = {}) => {
  const {
    // id: idProp,
    defaultOpen,
    isOpen: isOpenProp,
    onChange = () => {},
  } = props;

  const [isOpen, setIsOpen] = useControlledState(
    isOpenProp,
    defaultOpen || false,
    onChange
  );

  const isControlled = isOpenProp !== undefined;

  const onClose = useCallback(() => {
    if (!isControlled) {
      setIsOpen(false);
    }
  }, [isControlled, setIsOpen]);

  const onOpen = useCallback(() => {
    if (!isControlled) {
      setIsOpen(true);
    }
  }, [isControlled, setIsOpen]);

  const onOpenChange = useCallback(() => {
    const action = isOpen ? onClose : onOpen;
    action();
  }, [isOpen, onOpen, onClose]);

  return {
    isOpen: !!isOpen,
    onOpen,
    onClose,
    onOpenChange,
    isControlled,
  } as const;
};
