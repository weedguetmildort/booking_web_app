import { React, useState } from "react";

function UserLogin() {
  return (
    <div>
      <form>
        <input
          type="text"
          name="email"
          placeholder="Email"
          className="custom-border"
          style={{ padding: "10px", margin: "5px", cursor: "pointer" }}
        />
        <br />
        <input
          type="text"
          name="password"
          placeholder="Password"
          className="custom-border"
          style={{ padding: "10px", margin: "5px" }}
        />
        <br />
        <button
          type="submit"
          style={{ padding: "10px", margin: "5px", cursor: "pointer" }}
        >
          Submit
        </button>
      </form>
      <div>Forgot password?</div>
    </div>
  );
}

export default UserLogin;
