"use client";

import React, { useState } from "react";
import {
  YouVersionLoginButton,
  useYouVersionLogin,
  LoginSuccess,
  LoginError,
} from "@youversion/bible-ui";

const Login = () => {
  const [loginData, setLoginData] = useState<LoginSuccess | null>();
  const [error, setError] = useState<LoginError | null>(null);

  const { login } = useYouVersionLogin({
    onSuccess: (result) => {
      setLoginData(result);
      setError(null);
      // localStorage.setItem("yv_lat", result.lat); // Store LAT in localStorage
      console.log("Login successful! You can now use the LAT:", result.lat);
    },
    onError: (error) => {
      setError(error);
      console.error("Login failed:", error);
    },
  });

  const handleSignOut = () => {
    localStorage.removeItem("yv_lat");
    setLoginData(null);
    setError(null);
  };

  return (
    <div>
      <h2>Sign In</h2>
      {loginData ? (
        <div onClick={handleSignOut}>
          <p>Sign Out</p>
        </div>
      ) : (
        <YouVersionLoginButton onClick={login} />
      )}
      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
    </div>
  );
};

export default Login;
