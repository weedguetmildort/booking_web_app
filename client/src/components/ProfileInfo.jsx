import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function Profile() {
    const { user } = useAuth0();

    return (
        <div>
            <div>Hello {user.name}</div><br />
            <div>User Information: </div> 
            <div>   Address: {user.address}</div>
            <div>   Email: {user.email}</div>
        </div>
    );
}

export default Profile;