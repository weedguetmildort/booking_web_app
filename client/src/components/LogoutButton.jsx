import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
    const { isLoading, isAuthenticated, error, logout } = useAuth0();

    if (error) {
        return <div>Oops... {error.message}</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    return ( !isLoading && isAuthenticated &&(
        <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
            Log Out
        </button>
        )
    );
};

export default LogoutButton;