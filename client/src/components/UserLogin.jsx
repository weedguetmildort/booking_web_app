import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import CryptoJS from "crypto-js";
import { UserContext } from "../UserContext";

function UserLogin() {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in
    const token = localStorage.getItem("token");

    if (token) {
      fetch("http://localhost:5002/auth/api/check-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.valid) {
            login(data.user); // Update the user state with the logged-in user
            navigate("/profile"); // Redirect to the profile page
          }
        })
        .catch((error) => {
          console.error("Error verifying token:", error);
        });
    }
  }, [login, navigate]);

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validationSchema={Yup.object({
        username: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
        password: Yup.string()
          .min(8, "Password must be at least 8 characters")
          .required("Password is required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        // Encrypt the password
        const encryptedPassword = CryptoJS.AES.encrypt(
          values.password,
          process.env.REACT_APP_SECRET_KEY
        ).toString();

        // Update the password value with the encrypted one
        const encryptedValues = { ...values, password: encryptedPassword };

        // Request to send data to backend
        axios
          .post("http://localhost:5002/auth/api/user-login", encryptedValues)
          .then((response) => {
            // Extract token and user data from the response
            if (response.data) {
              const { token, user } = response.data;
              //localStorage.setItem("token", token);
              login(user, token);

              // Redirect to profile page
              navigate("/Profile");
            } else {
              console.error("Invalid login response:");
              // Handle invalid login response: TO BE IMPLEMENTED
            }
          })
          .catch((error) => {
            console.error("Error during login:", error);
            // Handle error: TO BE IMPLEMENTED
          })
          .finally(() => {
            setSubmitting(false);
          });
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <div className="container">
            <div>
              <div className="field">
                <input
                  id="username"
                  type="username"
                  {...formik.getFieldProps("username")}
                  className="custom-border"
                  placeholder="Username"
                  style={{ padding: "10px", margin: "5px" }}
                />
                {formik.touched.username && formik.errors.username ? (
                  <div>{formik.errors.username}</div>
                ) : null}
              </div>

              <div>
                <div>
                  <div>
                    <input
                      id="password"
                      type="password"
                      {...formik.getFieldProps("password")}
                      className="custom-border"
                      placeholder="Password"
                      style={{ padding: "10px", margin: "5px" }}
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <div>{formik.errors.password}</div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              style={{
                padding: "10px",
                margin: "5px",
                cursor: "pointer",
              }}
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
}

export default UserLogin;
