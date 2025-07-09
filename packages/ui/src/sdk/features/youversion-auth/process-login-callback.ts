export const processLoginCallback = (): void => {
  const params = new URLSearchParams(window.location.search);

  const data = {
    lat: params.get("lat"),
    status: params.get("status"),
    yvp_user_id: params.get("yvp_user_id"),
    grants: params.get("grants"),
    session: params.get("session"),
  };

  if (window.opener) {
    window.opener.postMessage(
      { type: "yv-login-callback", data },
      window.location.origin
    );
    window.close();
  } else {
    console.error(
      "No opener window found. This page should be opened as a popup."
    );
  }
};
