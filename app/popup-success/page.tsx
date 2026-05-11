'use client';
import { useEffect } from 'react';

export default function PopupSuccess() {
  useEffect(() => {
    if (window.opener) {
      window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS' }, '*');
      window.close();
    } else {
      window.location.href = '/';
    }
  }, []);
  
  return (
    <div className="flex h-screen w-screen items-center justify-center p-4 text-center">
      <p className="text-gray-600">Authentication successful. This window should close automatically.</p>
    </div>
  );
}
