// components/Toast.tsx
'use client';

import { toast, ToastContainer, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ToastProps {
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error' | 'default';
}

export const showToast = ({ message, type = 'default' }: ToastProps) => {
  const config: ToastOptions = {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  };

  switch (type) {
    case 'success':
      toast.success(message, config);
      break;
    case 'error':
      toast.error(message, config);
      break;
    case 'info':
      toast.info(message, config);
      break;
    case 'warning':
      toast.warning(message, config);
      break;
    default:
      toast(message, config); // "default" toast
      break;
  }
};

export const ToastProvider = () => <ToastContainer />;
