import { create, StoreApi } from "zustand";

import { User } from "../UserType";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type UserStore = {
  active: boolean;
  user: User;
  countWithRedo: number;
  countWithoutRedo: number;
  updateUser: (input: User) => void;
  resetUser: () => void;
  incCountWithRedo: () => void;
  incCountWithoutRedo: () => void;
};

export const useUserStore = create<UserStore>()(
  devtools(
    immer((set) => ({
      active: true,
      user: {},
      countWithRedo: 0,
      countWithoutRedo: 0,
      updateUser: (input: User) => actionUpdateUser(input, set),
      resetUser: () => actionResetUser(set),
      incCountWithRedo: () => actionIncCountWithRedo(set),
      incCountWithoutRedo: () => actionIncCountWithoutRedo(set),
    }))
  )
);

function actionUpdateUser(input: User, set: StoreApi<UserStore>["setState"]) {
  set((state) => {
    state.user = input;
    return state;
  });
}

function actionResetUser(set: StoreApi<UserStore>["setState"]) {
  set((state) => {
    state.user = {};
    return state;
  });
}

function actionIncCountWithRedo(set: StoreApi<UserStore>["setState"]) {
  set((state) => {
    state.countWithRedo++;
    return state;
  });
}

function actionIncCountWithoutRedo(set: StoreApi<UserStore>["setState"]) {
  set((state) => {
    state.countWithoutRedo++;
    return state;
  });
}
