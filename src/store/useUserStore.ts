import { create, StoreApi } from "zustand";

import { User } from "../UserType";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type UserStore = {
  active: boolean;
  user: User;
  updateUser: (input: User) => void;
  resetUser: () => void;
};

export const useUserStore = create<UserStore>()(
  devtools(
    immer((set, get) => ({
      active: true,
      user: {},
      updateUser: (input: User) => {
        return actionUpdateUser(input, set);
      },
      resetUser: () => {
        return actionResetUser(set);
      },
    }))
  )
);

function actionUpdateUser(input: User, set: StoreApi<UserStore>["setState"]) {
  set((state) => {
    state.user = input;
    return state;
  });
}

function actionResetUser(set: StoreApi<UserStore>["setState"]): void {
  set((state) => {
    state.user = {};
    return state;
  });
}
