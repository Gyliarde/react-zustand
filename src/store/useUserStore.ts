import { create, StoreApi } from "zustand";

import { User } from "../UserType";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type UserStore = {
  active: boolean;
  user: User;
};

export const useUserStore = create<UserStore>()(
  devtools(
    immer((set, get) => ({
      active: true,
      user: {},
      updateUser: (input: User) => {
        return actionUpdateUser(input, set);
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
