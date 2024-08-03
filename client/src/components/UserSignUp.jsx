import React, { useContext, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";

function UserSignUp() {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .post(
          "http://localhost:5002/auth/api/checkTokenUser",
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
        firstName: "",
        lastName: "",
        email: "",
        zipCode: "",
        password: "",
      }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
        lastName: Yup.string()
          .max(20, "Must be 20 characters or less")
          .required("Required"),
        email: Yup.string().email("Invalid email address").required("Required"),
        zipCode: Yup.string()
          .matches(/^[0-9]{5}$/, "Must be a valid zip code")
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
        const encryptedValues = {
          ...values,
          password: encryptedPassword,
        };

        // Call to send the data to backend
        axios
          .post("http://localhost:5002/auth/api/userSignup", encryptedValues)
          .then((response) => {
            console.log("Response:", response.data);
            // Extract the token from the response data
            // const { token } = response.data;

            // Store token in local storage
            // if (token) {
            //   localStorage.setItem("authToken", token);
            // }

            // Redirect the user to profile page
            navigate("/login");
          })
          .catch((error) => {
            console.error("Error during signup:", error);
            // Handle error: TO BE IMPLEMENTED
          })
          .finally(() => {
            setSubmitting(false);
          });
      }}
    >
      {(formik) => (
        <form onSubmit={formik.switchRender}>
          <div className="field">
            <input
              id="firstName"
              type="text"
              {...formik.getFieldProps("firstName")}
              className="custom-border"
              placeholder="First Name"
              style={{ padding: "10px", margin: "5px" }}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div>{formik.errors.firstName}</div>
            ) : null}

            <input
              id="lastName"
              type="text"
              {...formik.getFieldProps("lastName")}
              className="custom-border"
              placeholder="Last Name"
              style={{ padding: "10px", margin: "5px" }}
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div>{formik.errors.lastName}</div>
            ) : null}
          </div>

          <div className="container">
            <div>
              <div className="field">
                <input
                  id="zipCode"
                  type="text"
                  {...formik.getFieldProps("zipCode")}
                  className="custom-border"
                  placeholder="Zip Code"
                  style={{ padding: "10px", margin: "5px" }}
                />
                {formik.touched.zipCode && formik.errors.zipCode ? (
                  <div>{formik.errors.zipCode}</div>
                ) : null}
              </div>

              <div className="field">
                <input
                  id="email"
                  type="email"
                  {...formik.getFieldProps("email")}
                  className="custom-border"
                  placeholder="Email Address"
                  style={{ padding: "10px", margin: "5px" }}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div>{formik.errors.email}</div>
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
            <div>
              <h3>Password Requirements</h3>
              <p>
                - One letter (a-z)
                <br />
                - One number (0-9)
                <br />
                - One special character
                <br />
                - One special character
                <br />
                - A minimum of 8 characters
                <br />
                - No more than 2 repeated <br />
                &nbsp; characters in a row <br />
                &nbsp; ('aa' works but not 'aaa')
              </p>
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

export default UserSignUp;
