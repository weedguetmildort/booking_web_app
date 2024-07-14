import React, { useEffect } from "react";

const Callback = () => {
  useEffect(() => {
    const loadAuth0Script = () => {
      const script = document.createElement("script");
      script.src = "https://cdn.auth0.com/js/auth0/9.11/auth0.min.js";
      script.async = true;
      script.onload = () => {
        const auth0Client = new window.auth0.WebAuth({
          clientID: "z19frJEwGXkFQdzavbdnZohsW8Yjjr3c",
          domain: "https://booking-web-app-api/",
        });
        auth0Client.crossOriginVerification();
      };
      document.head.appendChild(script);
    };

    loadAuth0Script();
  }, []);

  return (
    <div>
      <h1>Callback Cross Auth</h1>
    </div>
  );
};

export default Callback;
