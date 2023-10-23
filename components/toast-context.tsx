"use client"
import { createContext, useContext } from 'react';
import { useToast } from "@/components/ui/use-toast"

const ToastContext = createContext({});

export const ToastProvider = ({ children }) => {
  const toast = useToast();
  
  return (
    <ToastContext.Provider value={toast}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToastContext = () => useContext(ToastContext);
