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
  const [businessData, setBusinessData] = useState(null);

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

  // Initialize business info
  const [initialValues] = useState({
    businessName: currUser.businessName,
    category: currUser.category,
    address: currUser.address,
    city: currUser.city,
    state: currUser.state,
    zipCode: currUser.zip,
    aboutUs: currUser.aboutUs,
  });

  const validateAddress = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:5002/address/api/checkAddress",
        values,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const result = response.data;
      return result.data.status
        ? {}
        : {
            street: result.data.street,
            city: result.data.city,
            state: result.data.state,
            zip: result.data.zip,
          };
    } catch (error) {
      console.error("Error validating address:", error);
      return { address: "Address validation error." };
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        businessName: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
        address: Yup.string()
          .max(25, "Must be 25 characters or less")
          .required("Required"),
        aboutUs: Yup.string()
          .max(30, "Must be 15 characters or less")
          .required("Required"),
        city: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
        state: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
        category: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
        zipCode: Yup.string()
          .matches(/^[0-9]{5}$/, "Must be a valid zip code")
          .required("Required"),
      })}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        const addressToBeValidated = {
          street: values.address,
          city: values.city,
          state: values.state,
          zip: values.zipCode,
        };

        // Validate address with API
        const validatedAddress = await validateAddress(addressToBeValidated);

        if (Object.keys(validatedAddress).length === 0) {
          // Address is invalid, set errors
          setErrors(validatedAddress);
        } else {
          // Call to send the data to backend
          axios
            .post("http://localhost:5002/db/api/updatePartner", {
              ...values,
              pID: currUser.pid,
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
        }
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <h3 className="center">User PID: {currUser.pid}</h3>
          <div className="container field">
            <div>
              <h3>Address</h3>
              <input
                id="address"
                type="text"
                {...formik.getFieldProps("address")}
                className="custom-border"
                style={{ padding: "10px", margin: "5px" }}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.touched.address && formik.errors.address ? (
                <div>{formik.errors.address}</div>
              ) : null}
            </div>

            <div>
              <h3>City</h3>
              <input
                id="city"
                type="text"
                {...formik.getFieldProps("city")}
                className="custom-border"
                style={{ padding: "10px", margin: "5px" }}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.touched.city && formik.errors.city ? (
                <div>{formik.errors.city}</div>
              ) : null}
            </div>
          </div>

          <div className="container field">
            <div>
              <h3>State</h3>
              <Field
                as="select"
                name="state"
                onChange={(e) => {
                  const selectedState = e.target.value;
                  formik.setFieldValue("state", selectedState);
                }}
                style={{ padding: "10px", margin: "5px" }}
                className="custom-border custom-select"
                onBlur={formik.handleBlur}
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="state" component="div" />
            </div>

            <div>
              <h3>Zip Code</h3>
              <input
                id="zipCode"
                type="text"
                {...formik.getFieldProps("zipCode")}
                className="custom-border"
                style={{ padding: "10px", margin: "5px" }}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.touched.zipCode && formik.errors.zipCode ? (
                <div>{formik.errors.zipCode}</div>
              ) : null}
            </div>
          </div>

          <div className="container field">
            <div>
              <h3>Business Name</h3>
              <input
                id="businessName"
                type="text"
                {...formik.getFieldProps("businessName")}
                className="custom-border"
                style={{ padding: "10px", margin: "5px" }}
              />
              {formik.touched.businessName && formik.errors.businessName ? (
                <div>{formik.errors.businessName}</div>
              ) : null}
            </div>

            <div>
              <h3>Category</h3>
              <input
                id="category"
                type="text"
                {...formik.getFieldProps("category")}
                className="custom-border"
                style={{ padding: "10px", margin: "5px" }}
              />
              {formik.touched.category && formik.errors.category ? (
                <div>{formik.errors.category}</div>
              ) : null}
            </div>
          </div>

          <div></div>

          <div className="field">
            <h3>About Us</h3>
            <input
              id="aboutUs"
              type="text"
              {...formik.getFieldProps("aboutUs")}
              className="custom-border custom-box-2"
              style={{ padding: "10px", margin: "5px" }}
            />
            {formik.touched.aboutUs && formik.errors.aboutUs ? (
              <div>{formik.errors.aboutUs}</div>
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
