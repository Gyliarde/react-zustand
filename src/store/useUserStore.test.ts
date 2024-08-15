import { useUserStore } from "./useUserStore";

describe("useUserStore test", () => {
  it("should start with active as true", () => {
    expect(useUserStore.getState().active).toBe(true);
  });

  it("should update user data", () => {
    useUserStore.getState().updateUser({
      name: "John",
      email: "john@involves.com",
      remember: "true",
    });

    expect(useUserStore.getState().user.name).toBe("John");
    expect(useUserStore.getState().user.email).toBe("john@involves.com");
    expect(useUserStore.getState().user.remember).toBe("true");
  });

  it("should clean user data after resect user", () => {
    useUserStore.getState().updateUser({
      name: "John",
      email: "john@involves.com",
      remember: "true",
    });

    expect(useUserStore.getState().user.name).toBe("John");
    expect(useUserStore.getState().user.email).toBe("john@involves.com");
    expect(useUserStore.getState().user.remember).toBe("true");

    useUserStore.getState().resetUser();
    expect(useUserStore.getState().user.name).toBeUndefined;
  });

  it("should inc count with redo when exection action inc count with redo", () => {
    expect(useUserStore.getState().countWithRedo).toBe(0);

    useUserStore.getState().incCountWithRedo();
    useUserStore.getState().incCountWithRedo();
    useUserStore.getState().incCountWithRedo();

    expect(useUserStore.getState().countWithRedo).toBe(3);
  });

  it("should inc count without redo when exection action inc count without redo", () => {
    expect(useUserStore.getState().countWithoutRedo).toBe(0);

    useUserStore.getState().incCountWithoutRedo();
    useUserStore.getState().incCountWithoutRedo();
    useUserStore.getState().incCountWithoutRedo();

    expect(useUserStore.getState().countWithoutRedo).toBe(3);
  });
});
