import { toast } from "react-toastify";

// Success Notification
export const showSuccessNotification = (message) => {
  toast.success(message, {
    position: "bottom-right",
    autoClose: 3000, // Auto close after 3 seconds
  });
};

// Error Notification
export const showErrorNotification = (message) => {
  toast.error(message, {
    position: "bottom-right",
    autoClose: 3000,
  });
};

// Warning Notification
export const showWarningNotification = (message) => {
  toast.warn(message, {
    position: "bottom-right",
    autoClose: 3000,
  });
};

// Info Notification
export const showInfoNotification = (message) => {
  toast.info(message, {
    position: "bottom-right",
    autoClose: 3000,
  });
};
