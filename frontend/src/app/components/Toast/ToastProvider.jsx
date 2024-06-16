import { useState } from "react";
import ToastContext from "./ToastService";
import { X } from "react-feather"

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const open = (component, timeout = 3000) => {
    const id = Date.now();
    setToasts((toasts) => [...toasts, { id, component }]);
    setTimeout(() => close(id), timeout);
  };

  const close = (id) => setToasts((toasts) => toasts.filter((toast) => toast.id !== id));

  return (
    <ToastContext.Provider value={{ open, close }}>
      {children}
      <div className="space-y-2 fixed bottom-4 right-4">
        {toasts.map(({ id, component }) => (
          <div
            key={id}
           className="relative max-w-xs bg-white border border-gray-200 rounded-xl shadow-2xl dark:bg-neutral-800 dark:border-neutral-700 flex gap-4 items-center"
  onAnimationEnd={() => {
    close(id);
  }}
          >
            {component}
            <X className="w-4 h-4 me-4 hover:cursor-pointer" onClick={() => close(id)}></X>
            
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
