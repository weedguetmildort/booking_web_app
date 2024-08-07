import React, { useState, useContext, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";
import CryptoJS from "crypto-js";

function UserProfilePassword() {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  const currUser = JSON.parse(localStorage.getItem("user"));

  const encryptPassword = (password) => {
    const secretkey = process.env.REACT_APP_SECRET_KEY;
    const encryptedPassword = CryptoJS.AES.encrypt(
      password,
      secretkey
    ).toString();
    return encryptedPassword;
  };

  useEffect(() => {
    if (!currUser) {
      navigate("/login");
    }
  }, [currUser, navigate]);

  const [initialValues] = useState({
    password: "",
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        password: Yup.string()
          .min(8, "Password must be at least 8 characters")
          .required("Password is required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        // Encrypt the password
        const encryptedPassword = encryptPassword(values.password);

        // Update the password value with the encrypted one
        const encryptedValues = {
          password: encryptedPassword,
        };

        // Call to send the data to backend
        axios
          .post("http://localhost:5002/db/api/updatePassword", {
            encryptedValues,
            uID: currUser.id,
          })
          .then((response) => {
            console.log("Response:", response.data);

            logout();

            // Redirect the user to profile page
            navigate("/login");
          })
          .catch((error) => {
            console.error("Error during update:", error);
            // Handle error: TO BE IMPLEMENTED
          })
          .finally(() => {
            setSubmitting(false);
          });
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <div className="field">
            <h3>User ID: {currUser.id}</h3>
            <h3>Password</h3>

            <input
              id="password"
              type="password"
              {...formik.getFieldProps("password")}
              className="custom-border"
              placeholder="New Password"
              style={{ padding: "10px", margin: "5px" }}
            />
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
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
              Save Changes
            </button>
            <button
              type="button"
              style={{
                padding: "10px",
                margin: "5px",
                cursor: "pointer",
              }}
              onClick={() => navigate("/profile")}
            >
              Go Back
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
}

export default UserProfilePassword;
