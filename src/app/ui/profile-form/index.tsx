"use client";
/*
 * @Author: zhangjw zhangjiaowei@newgrand.cn
 * @Date: 2024-08-06 20:04:40
 * @LastEditors: zhangjw
 * @LastEditTime: 2024-08-10 14:59:32
 * @Description: file content
 */
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { asyncConfirm } from "../confirm";
import { shopTestAction } from "@/servers/shop";
import { Jw3Schema, jw3Schema } from "@/acttion-schema/jw3-schema";
import { useToast } from "@/components/ui/use-toast";

export default function ProfileForm() {
  const form = useForm<Jw3Schema>({
    resolver: zodResolver(jw3Schema),
    defaultValues: {
      cookies: "",
    },
  });

  const { toast } = useToast();

  const { execute, result, status, hasErrored } = useAction(shopTestAction, {
    onSuccess: ({ data }) => {
      if (data?.success) {
        toast({
          title: "提示",
          description: data.msg,
        });
      }
    },
    onError: (...args) => {
      console.log("onError", args);
    },
  });

  // console.log(" result, status", result, status);

  function onSubmit(values: Jw3Schema) {
    console.log(values);
  }

  const onRun = (values: Jw3Schema) => {
    asyncConfirm().then(() => {
      console.log("confirm", values);
      execute(values);
    });
  };
  // 添加关注
  const handleFollow = (values: Jw3Schema) => {
    console.log("values", values);
  };
  // 移除关注
  const handleUnfollow = (values: Jw3Schema) => {
    console.log("values", values);
  };

  const handleClick = (cb: (val: Jw3Schema) => void) => form.handleSubmit(cb);
  // const handleClick = (cb: (val: Jw3Schema) => void) => {
  //   return () => cb(form.getValues());
  // };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-4/5">
        <FormField
          control={form.control}
          name="cookies"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Username</FormLabel> */}
              <FormControl>
                <Textarea
                  className="w-4/5"
                  placeholder="输入网站cookie"
                  {...field}
                />
              </FormControl>
              <FormDescription>输入网站cookie</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <Button type="submit">Submit</Button> */}
        <div className="flex gap-2 mt-2">
          <Button
            // type="submit"
            // color="primary"
            onClick={handleClick(onRun)}
          >
            执行
          </Button>
          <Button type="button" onClick={handleClick(handleFollow)}>
            添加关注
          </Button>
          <Button type="button" onClick={handleClick(handleUnfollow)}>
            移除关注
          </Button>
        </div>
      </form>
    </Form>
  );
}
