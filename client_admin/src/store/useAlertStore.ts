import {create} from "zustand";

type State = {
  status: boolean;
  type: AlertType;
  message: string;
};

type Action = {
  setShowAlert: (val: State) => void;
};

export const useAlertStore = create<State & Action>((set) => ({
  status: false,
  type: "info",
  message: "",

  setShowAlert: (alert) => {
    set((state) => ({
      ...state,
      status: alert.status,
      type: alert.type,
      message: alert.message,
    }));

    if (alert.status) {
      setTimeout(() => {
        set((state) => ({...state, status: false, type: "info", message: ""}));
      }, 3000);
    }
  },
}));
