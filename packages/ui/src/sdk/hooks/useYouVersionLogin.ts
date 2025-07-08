import { useEffect, useCallback, useContext } from "react";
import { YouVersionLoginOptions } from "../authentication/types";
import { generateSession } from "../authentication/generate-session";
import { BibleKitContext } from "../context/BibleKitContext";

const YV_SESSION_KEY = "yv_login_session";
const LOGIN_POPUP_FEATURES =
  "width=600,height=800,scrollbars=yes,resizable=yes";
const API_BASE_URL = "https://api-dev.youversion.com";

export const useYouVersionLogin = ({
  language = "en",
  requiredPerms = [],
  optionalPerms = [],
  onSuccess,
  onError,
}: YouVersionLoginOptions) => {
  const context = useContext(BibleKitContext);

  if (!context) {
    throw new Error(
      "useYouVersionLogin must be used within a BibleKitProvider"
    );
  }

  const { appId } = context;

  const login = useCallback(() => {
    const session = generateSession();
    localStorage.setItem(YV_SESSION_KEY, session);

    const params = new URLSearchParams({
      app_id: appId,
      language,
      session,
    });

    if (requiredPerms.length > 0) {
      params.append("required_perms", requiredPerms.join(","));
    }
    if (optionalPerms.length > 0) {
      params.append("opt_perms", optionalPerms.join(","));
    }

    const loginUrl = `${API_BASE_URL}/auth/login?${params.toString()}`;
    window.open(loginUrl, "yv-login-popup", LOGIN_POPUP_FEATURES);
  }, [appId, language, requiredPerms, optionalPerms]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) {
        return;
      }

      const { type, data } = event.data;

      if (type !== "yv-login-callback") {
        return;
      }

      const storedSession = localStorage.getItem(YV_SESSION_KEY);
      localStorage.removeItem(YV_SESSION_KEY);

      if (data.session !== storedSession) {
        onError({ message: "Session mismatch - authentication failed" });
        return;
      }

      if (data.status === "success") {
        onSuccess({
          lat: data.lat,
          yvpUserId: data.yvp_user_id,
          grants: data.grants ? data.grants.split(",") : [],
          session: data.session,
        });
      } else {
        onError({
          message: "Login failed",
          session: data.session,
        });
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [onSuccess, onError]);

  return { login };
};
