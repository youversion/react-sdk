"use client";

import { useEffect } from 'react';
import { processLoginCallback } from '@repo/ui';

const CallbackPage = () => {
  useEffect(() => {
    // This function handles communication with the main window and closes the popup.
    processLoginCallback();
  }, []);

  return <p>Processing login, please wait...</p>;
};

export default CallbackPage;