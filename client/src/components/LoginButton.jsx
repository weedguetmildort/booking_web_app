// 
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
    const { isLoading, isAuthenticated, error, loginWithRedirect } = useAuth0();
    
    if (error) {
        return <div>Oops... {error.message}</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (!isLoading && !isAuthenticated && (
        <button onClick={loginWithRedirect}>Log in</button>
        )
    );
};

export default LoginButton;