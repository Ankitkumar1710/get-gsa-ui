"use client";

import * as Toast from "@radix-ui/react-toast";
import React, { createContext, useContext, useState } from "react";

const ToastContext = createContext<{ showToast: (msg: string) => void }>({
  showToast: () => {},
});

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const showToast = (msg: string) => {
    setMessage(msg);
    setOpen(true);
    setTimeout(() => setOpen(false), 3000); // auto close in 3s
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Radix Toast Structure */}
      <Toast.Provider swipeDirection="right">
        <Toast.Root
          open={open}
          onOpenChange={setOpen}
          className="fixed bottom-6 right-6 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg text-sm font-medium animate-in fade-in slide-in-from-bottom-5"
        >
          {message}
        </Toast.Root>

        <Toast.Viewport className="fixed bottom-0 right-0 p-4 flex flex-col gap-2 w-96 max-w-[100vw] outline-none" />
      </Toast.Provider>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
