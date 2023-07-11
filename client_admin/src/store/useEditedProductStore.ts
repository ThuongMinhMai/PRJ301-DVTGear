import {create} from "zustand";

type State = {
  editedProduct: Product | undefined;
};

export const useEditedProductStore = create<State>((set) => ({
  editedProduct: undefined,
}));
