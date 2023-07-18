import {create} from "zustand";

type State = {
  status: boolean;
  type: AlertType;
  message: string;
};

type Action = {
  setShowAlert: (val: State) => void;
  clearAlertTimeout: () => void;
};

export const useAlertStore = create<State & Action>((set) => {
  let timeoutId: NodeJS.Timeout | null = null;

  const clearAlertTimeout = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return {
    status: false,
    type: "info",
    message: "",

    setShowAlert: (alert) => {
      clearAlertTimeout();

      set((state) => ({
        ...state,
        status: alert.status,
        type: alert.type,
        message: alert.message,
      }));

      if (alert.status) {
        timeoutId = setTimeout(() => {
          set((state) => ({
            ...state,
            status: false,
            type: "info",
            message: "",
          }));
        }, 3000);
      }
    },

    clearAlertTimeout,
  };
});
