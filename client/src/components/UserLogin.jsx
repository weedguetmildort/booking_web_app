import { Button } from "@mui/material";
import { React, useState } from "react";

function UserLogin() {

  return (
    <div>
      <form>
        <input type="text" name="email" placeholder="Email" className="custom-border" /> <br/>
        <input type="text" name="password" placeholder="Password" className="custom-border" /> <br/>
        <Button>Submit</Button>
      </form>
      <div>Forgot password?</div>
    </div>
  );
}

export default UserLogin;
