/*
 * @Author: zhangjw zhangjiaowei@newgrand.cn
 * @Date: 2024-08-02 16:31:49
 * @LastEditors: zhangjw
 * @LastEditTime: 2024-08-06 20:16:20
 * @Description: file content
 */

import ProfileForm from "./ui/profile-form";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 ">
      <div className="flex w-4/5  mx-auto flex-wrap p-2">
        <ProfileForm></ProfileForm>
      </div>
    </main>
  );
}
