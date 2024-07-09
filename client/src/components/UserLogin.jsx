import React from "react";

function UserLogin() {
  return (
    <div>
      <div>
        <input type="text" placeholder="Username" className="custom-border" />
      </div>
      <div>
        <input type="text" placeholder="Password" className="custom-border" />
      </div>
      <div>Forgot password?</div>
    </div>
  );
}

export default UserLogin;
