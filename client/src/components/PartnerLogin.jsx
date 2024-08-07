import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import CryptoJS from "crypto-js";
import { UserContext } from "../UserContext";

function PartnerLogin() {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const encryptPassword = (password) => {
    const secretkey = process.env.REACT_APP_SECRET_KEY;
    const encryptedPassword = CryptoJS.AES.encrypt(
      password,
      secretkey
    ).toString();
    return encryptedPassword;
  };

  useEffect(() => {
    // Check if the user is already logged in
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .post(
          "http://localhost:5002/auth/api/checkTokenPartner",
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
          if (response.data.valid) {
            // login(data.user, token); // Update the user state with the logged-in user
            navigate("/partnerProfile"); // Redirect to the profile page
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
        email: "",
        password: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string()
          .min(8, "Password must be at least 8 characters")
          .required("Password is required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        // Encrypt the password
        const encryptedPassword = encryptPassword(values.password);

        // Update the password value with the encrypted one
        const encryptedValues = { ...values, password: encryptedPassword };

        // Request to send data to backend
        axios
          .post("http://localhost:5002/auth/api/partnerLogin", encryptedValues)
          .then((response) => {
            // Extract token and user data from the response
            if (response.data) {
              const { user, token } = response.data;
              //localStorage.setItem("token", token);
              login(user, token);

              // Redirect to profile page
              navigate("/partnerProfile");
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
              <div>
                <input
                  id="email"
                  type="email"
                  {...formik.getFieldProps("email")}
                  className="custom-border"
                  placeholder="Email"
                  style={{ padding: "10px", margin: "5px" }}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div>{formik.errors.email}</div>
                ) : null}
              </div>

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

          <div className="center">
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

export default PartnerLogin;
