"use client";
/*
 * @Author: zhangjw zhangjiaowei@newgrand.cn
 * @Date: 2024-08-06 10:10:58
 * @LastEditors: zhangjw
 * @LastEditTime: 2024-08-06 10:20:32
 * @Description: file content
 */
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * 用于管理受控和非受控组件状态的 hook。
 * @param value - 受控值。
 * @param defaultValue - 非受控组件的默认值。
 * @param onChange - 当值改变时触发的回调。
 * @returns 包含当前值和设置值函数的元组。
 */
export function useControlledState<T, C = T>(
  value: T | undefined,
  defaultValue: T,
  onChange?: (v: C, ...args: any[]) => void
): [T, (value: T) => void] {
  const [stateValue, setStateValue] = useState<T>(() => value ?? defaultValue);

  const isControlledRef = useRef(value !== undefined);
  const isControlled = value !== undefined;

  useEffect(() => {
    const wasControlled = isControlledRef.current;
    if (wasControlled !== isControlled) {
      console.warn(
        `警告: 组件从${wasControlled ? "受控" : "非受控"}变为${
          isControlled ? "受控" : "非受控"
        }.`
      );
    }
    isControlledRef.current = isControlled;
  }, [isControlled]);

  let currentValue = isControlled ? value! : stateValue;
  const setValue = useCallback(
    (newValue: T | ((prev: T) => T), ...args: any[]) => {
      const onChangeCaller = (value: T, ...onChangeArgs: any[]) => {
        if (onChange && !Object.is(currentValue, value)) {
          onChange(value as any, ...onChangeArgs);
        }
        if (!isControlled) {
          currentValue = value; // 更新 currentValue 变量以便于函数更新
        }
      };

      if (typeof newValue === "function") {
        const updateFunction = (prevValue: T) => {
          const updatedValue = (newValue as Function)(prevValue);
          onChangeCaller(updatedValue, ...args);
          if (!isControlled) {
            return updatedValue;
          }
          return prevValue;
        };
        setStateValue(updateFunction);
      } else {
        if (!isControlled) {
          setStateValue(newValue);
        }
        onChangeCaller(newValue, ...args);
      }
    },
    [isControlled, currentValue, onChange]
  );

  return [currentValue, setValue];
}
