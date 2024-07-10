import React from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

const Auth0ProviderWithHistory = ({ children }) => {
    const domain = "dev-gh4kxlfpg0ce2ig2.us.auth0.com";
    const clientId = "uhG6sTlvPPqVI20BiVb4NjA84PBTUPug";

    const navigate = useNavigate();

    const onRedirectCallback = (appState) => {
        navigate(appState?.returnTo || window.location.pathname);
    };

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{
                redirect_uri: window.location.origin
            }}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    );
};

export default Auth0ProviderWithHistory;