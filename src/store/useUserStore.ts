import { create, StoreApi, UseBoundStore } from "zustand";

import { User } from "../UserType";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { temporal } from "zundo";

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S
) => {
  const store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (const k of Object.keys(store.getState())) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
  }

  return store;
};

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

export const _useUserStoreBase = create<UserStore>()(
  devtools(
    immer(
      temporal((set) => ({
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
  )
);

export const useUserStore = createSelectors(_useUserStoreBase);

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
