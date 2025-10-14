"use client";
import * as Dialog from "@radix-ui/react-dialog";
import React from "react";

export default function Drawer({ children, trigger }: { children: React.ReactNode; trigger: React.ReactNode }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      
      <Dialog.Overlay className="fixed inset-0 bg-black/50" />
      <Dialog.Content className="fixed top-0 left-0 h-full w-80 bg-white shadow p-4 overflow-y-auto">
        {children}
      </Dialog.Content>
    </Dialog.Root>
  );
}
