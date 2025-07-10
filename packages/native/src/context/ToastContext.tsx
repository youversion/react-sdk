// import { createContext, useContext, useState, ReactNode } from "react";

// interface ToastContextType {
//   showToast: (message: string, duration?: number) => void;
// }

// const ToastContext = createContext<ToastContextType | undefined>(undefined);

// export const useToast = () => {
//   const context = useContext(ToastContext);
//   if (!context) {
//     throw new Error("useToast must be used within a ToastProvider");
//   }
//   return context;
// };

// interface ToastProviderProps {
//   children: ReactNode;
// }

// export const ToastProvider = ({ children }: ToastProviderProps) => {
//   const [toast, setToast] = useState<{ message: string; visible: boolean }>({
//     message: "",
//     visible: false,
//   });

//   const showToast = (message: string, duration = 2000) => {
//     setToast({ message, visible: true });
//     setTimeout(() => {
//       setToast({ message: "", visible: false });
//     }, duration);
//   };

//   const toastElement = toast.visible ? (
//     <div
//       className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded-lg shadow-lg"
//       style={{ zIndex: 9999 }}
//     >
//       {toast.message}
//     </div>
//   ) : null;

//   return (
//     <ToastContext.Provider value={{ showToast }}>
//       {children}
//       {typeof document !== "undefined" && toastElement && createPortal(toastElement, document.body)}
//     </ToastContext.Provider>
//   );
// };
