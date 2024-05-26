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
           className="relative bg-gray-200 border border-gray-600 rounded-md shadow-md p-6 transition duration-300 ease-in-out animate-fadeIn"
  onAnimationEnd={() => {
    close(id);
  }}
          >
            <X className="absolute top-3 right-3 w-4 h-4" onClick={() => close(id)}></X>
            {component}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
