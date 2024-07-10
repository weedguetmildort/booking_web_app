// 
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const SignUpButton = () => {
    const { isLoading, isAuthenticated, error, loginWithRedirect } = useAuth0();

    if (error) {
        return <div>Oops... {error.message}</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    console.log(isAuthenticated);

    return (!isLoading && !isAuthenticated && (
        <button onClick={() => loginWithRedirect({
            authorizationParams:{
                screen_hint: "signup"
            }
        })}>Sign up</button>
    )
    );
};

export default SignUpButton;