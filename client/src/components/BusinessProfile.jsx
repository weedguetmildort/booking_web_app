import React, { useState, useContext, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";

function BusinessProfile() {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  const currUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!currUser) {
      navigate("/login");
    }
  }, [currUser, navigate]);

  const [initialValues] = useState({
    firstName: currUser.firstName,
    lastName: currUser.lastName,
    zip: currUser.zip,
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
        lastName: Yup.string()
          .max(20, "Must be 20 characters or less")
          .required("Required"),
        zip: Yup.string()
          .matches(/^[0-9]{5}$/, "Must be a valid zip code")
          .required("Required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        // Call to send the data to backend
        axios
          .post("http://localhost:5002/db/api/updateUser", {
            ...values,
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
            <h3>First Name</h3>

            <input
              id="firstName"
              type="text"
              {...formik.getFieldProps("firstName")}
              className="custom-border"
              style={{ padding: "10px", margin: "5px" }}
              //placeholder={initialValues.firstName}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div>{formik.errors.firstName}</div>
            ) : null}
          </div>

          <div className="field">
            <h3>Last Name</h3>

            <input
              id="lastName"
              type="text"
              {...formik.getFieldProps("lastName")}
              className="custom-border"
              style={{ padding: "10px", margin: "5px" }}
              //placeholder={initialValues.lastName}
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div>{formik.errors.lastName}</div>
            ) : null}
          </div>

          <div className="field">
            <h3>Zip Code</h3>

            <input
              id="zip"
              type="text"
              {...formik.getFieldProps("zip")}
              className="custom-border"
              style={{ padding: "10px", margin: "5px" }}
              //placeholder={initialValues.zip}
            />
            {formik.touched.zip && formik.errors.zip ? (
              <div>{formik.errors.zip}</div>
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
              onClick={() => navigate("/partnerprofile")}
            >
              Go Back
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
}

export default BusinessProfile;
