import { useUserStore } from "./useUserStore";

describe("useUserStore test", () => {
  it("should start with active as true", () => {
    expect(useUserStore.getState().active).toBe(true);
  });

  it("should update user data", () => {
    expect(useUserStore.getState().user.name).toBe("John");
    expect(useUserStore.getState().user.email).toBe("john@involves.com");
    expect(useUserStore.getState().user.remember).toBe(true);
  });
});
