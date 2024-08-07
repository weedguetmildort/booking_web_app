import React, { useState, useContext, useEffect } from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { json, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";
import { states } from "../assets/locationData";

function BusinessProfile() {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  const currUser = JSON.parse(localStorage.getItem("user"));

  // Check credentials before pulling business info
  const validateAdmin = async (user) => {
    try {
      const uid = user.id;
      const response = await axios
        .post("http://localhost:5002/auth/api/partnerIsAdmin", { uid })
        .then((response) => {
          if (response.data === 0) {
            navigate("/partnerprofile");
          }
        });
    } catch (error) {
      console.error("Error validating user", error);
      return { address: "User validation error." };
    }
  };

  useEffect(() => {
    if (!currUser) {
      navigate("/partnerlogin");
    } else {
      validateAdmin(currUser);
    }
  }, [currUser, navigate]);

  // Initialize business services
  const [initialValues] = useState({
    name: currUser.serviceName,
    duration: currUser.duration,
    cost: currUser.cost,
    description: currUser.description,
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        name: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
        description: Yup.string()
          .max(30, "Must be 15 characters or less")
          .required("Required"),
        cost: Yup.number()
          .typeError("Must be a number")
          .required("Float is required"),
        duration: Yup.number()
          .typeError("Must be a number")
          .integer("Must be an integer")
          .required("Integer is required"),
      })}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        // Call to send the data to backend

        axios
          .post("http://localhost:5002/db/api/updateService", {
            ...values,
            pID: currUser.pid,
            sID: currUser.sid,
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
          <h3 className="center">User PID: {currUser.pid}</h3>

          <div className="container field">
            <div>
              <h3>Duration</h3>
              <input
                id="duration"
                type="text"
                {...formik.getFieldProps("duration")}
                className="custom-border"
                style={{ padding: "10px", margin: "5px" }}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.touched.duration && formik.errors.duration ? (
                <div>{formik.errors.duration}</div>
              ) : null}
            </div>

            <div>
              <h3>Cost</h3>
              <input
                id="cost"
                type="text"
                {...formik.getFieldProps("cost")}
                className="custom-border"
                style={{ padding: "10px", margin: "5px" }}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.touched.cost && formik.errors.cost ? (
                <div>{formik.errors.cost}</div>
              ) : null}
            </div>
          </div>

          <div className="container field">
            <div>
              <h3>Service Name</h3>
              <input
                id="name"
                type="text"
                {...formik.getFieldProps("name")}
                className="custom-border"
                style={{ padding: "10px", margin: "5px" }}
              />
              {formik.touched.name && formik.errors.name ? (
                <div>{formik.errors.name}</div>
              ) : null}
            </div>
          </div>

          <div></div>

          <div className="field">
            <h3>Description</h3>
            <input
              id="description"
              type="text"
              {...formik.getFieldProps("description")}
              className="custom-border custom-box-2"
              style={{ padding: "10px", margin: "5px" }}
            />
            {formik.touched.description && formik.errors.description ? (
              <div>{formik.errors.description}</div>
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
