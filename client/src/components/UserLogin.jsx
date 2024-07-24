import { React, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CryptoJS from "crypto-js";

import axios from "axios";

function UserLogin() {
  const secretKey = process.env.REACT_APP_SECRET_KEY;

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
        const encryptedPassword = CryptoJS.AES.encrypt(
          values.password,
          secretKey
        ).toString();

        // Example axios request to send the data to your backend
        axios
          .post("http://localhost:5002/auth/quick-login", {
            email: values.email,
            password: encryptedPassword,
          })
          .then((response) => {
            console.log("Response:", response);
          })
          .catch((error) => {
            console.error("Error:", error);
          });

        // setTimeout(() => {
        //   alert(JSON.stringify(encryptedPassword, null, 2));
        //   setSubmitting(false);
        // }, 400);
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <div className="container">
            <div>
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
