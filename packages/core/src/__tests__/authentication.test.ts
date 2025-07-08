import { describe, it, expect, beforeEach } from "@jest/globals";
import { ApiClient } from "../client";
import { AuthClient } from "../authentication";

describe("AuthClient", () => {
  let apiClient: ApiClient;
  let authClient: AuthClient;

  beforeEach(() => {
    apiClient = new ApiClient({
      baseUrl: "https://api-dev.youversion.com",
      appId: "test-app",
      version: "v1",
    });
    authClient = new AuthClient(apiClient);
  });

  describe("getUser", () => {
    it("should fetch user information", async () => {
      const user = await authClient.getUser("US");

      expect(user).toEqual({
        id: 1,
        first_name: "Test",
        last_name: "User",
        avatar_url: "https://example.com/avatar.jpg",
      });
    });
  });
});
