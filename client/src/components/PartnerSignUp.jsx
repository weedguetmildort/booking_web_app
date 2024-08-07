import React, { useContext, useEffect } from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";
import { states } from "../assets/locationData";

function PartnerSignUp() {
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

  // Encrypter
  const encryptPassword = (password) => {
    const secretkey = process.env.REACT_APP_SECRET_KEY;
    const encryptedPassword = CryptoJS.AES.encrypt(
      password,
      secretkey
    ).toString();
    return encryptedPassword;
  };

  // const validateAddress = async (values) => {
  //   try {
  //     const response = await fetch(
  //       "http://localhost:5002/address/api/checkAddress",
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(values),
  //       }
  //     );
  //     const result = await response.json();
  //     return result.data.status
  //       ? {}
  //       : {
  //           street: result.data.street,
  //           city: result.data.city,
  //           state: result.data.state,
  //           zip: result.data.zip,
  //         };
  //   } catch (error) {
  //     console.error("Error validating address:", error);
  //     return { address: "Address validation error." };
  //   }
  // };

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
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        zipCode: "",
        password: "",
        businessName: "",
        category: "",
        address: "",
        state: "",
        city: "",
        aboutUs: "",
        isAdmin: false,
        serviceName: "",
        duration: "",
        cost: "",
        description: "",
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
        businessName: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
        password: Yup.string()
          .min(8, "Password must be at least 8 characters")
          .required("Password is required"),
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
        serviceName: Yup.string()
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
          // Address is valid, proceed with form submission

          // Encrypt the password -- MAJOR PROBLEMS
          const encryptedPassword = await encryptPassword(values.password);

          // Update the password value with the encrypted one
          const encryptedValues = {
            ...values,
            password: encryptedPassword,
            address: validatedAddress.street,
            state: validatedAddress.state,
            city: validatedAddress.city,
            zipCode: validatedAddress.zip,
          };

          // // Call to send the data to backend
          axios
            .post(
              "http://localhost:5002/auth/api/partnerSignup",
              encryptedValues
            )
            .then((response) => {
              console.log("Response:", response.data);
              // Extract the token from the response data
              // const { token } = response.data;

              // Store token in local storage
              // if (token) {
              //   localStorage.setItem("authToken", token);
              // }

              // Redirect the user to profile page
              navigate("/partnerlogin");
            })
            .catch((error) => {
              console.error("Error during signup:", error);
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

          <div className="field">
            <input
              id="address"
              type="text"
              {...formik.getFieldProps("address")}
              className="custom-border"
              placeholder="Address"
              style={{ padding: "10px", margin: "5px" }}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik.touched.address && formik.errors.address ? (
              <div>{formik.errors.address}</div>
            ) : null}

            <input
              id="city"
              type="text"
              {...formik.getFieldProps("city")}
              className="custom-border"
              placeholder="City"
              style={{ padding: "10px", margin: "5px" }}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik.touched.city && formik.errors.city ? (
              <div>{formik.errors.city}</div>
            ) : null}
          </div>

          <div className="field">
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

            <input
              id="zipCode"
              type="text"
              {...formik.getFieldProps("zipCode")}
              className="custom-border"
              placeholder="Business Zip Code"
              style={{ padding: "10px", margin: "5px" }}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik.touched.zipCode && formik.errors.zipCode ? (
              <div>{formik.errors.zipCode}</div>
            ) : null}
          </div>

          <div className="container">
            <div>
              <div className="field">
                <input
                  id="businessName"
                  type="text"
                  {...formik.getFieldProps("businessName")}
                  className="custom-border"
                  placeholder="Business Name"
                  style={{ padding: "10px", margin: "5px" }}
                />
                {formik.touched.businessName && formik.errors.businessName ? (
                  <div>{formik.errors.businessName}</div>
                ) : null}
              </div>

              <div className="field">
                <input
                  id="category"
                  type="text"
                  {...formik.getFieldProps("category")}
                  className="custom-border"
                  placeholder="Category"
                  style={{ padding: "10px", margin: "5px" }}
                />
                {formik.touched.category && formik.errors.category ? (
                  <div>{formik.errors.category}</div>
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
                <input
                  id="password"
                  type="password"
                  {...formik.getFieldProps("password")}
                  className="custom-border"
                  placeholder="Password"
                  style={{ padding: "10px", margin: "5px" }}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div>{formik.errors.password}</div>
                ) : null}
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
          <div className="field">
            <input
              id="aboutUs"
              type="text"
              {...formik.getFieldProps("aboutUs")}
              className="custom-border custom-box"
              placeholder="About Us"
              style={{ padding: "10px", margin: "5px" }}
            />
            {formik.touched.aboutUs && formik.errors.aboutUs ? (
              <div>{formik.errors.aboutUs}</div>
            ) : null}
          </div>

          <div>
            <label>
              <Field type="checkbox" name="isAdmin" />
              Administrator
            </label>
          </div>

          <h3 className="center">Service Provided</h3>

          <div className="container field">
            <div>
              <input
                id="duration"
                type="text"
                {...formik.getFieldProps("duration")}
                className="custom-border"
                placeholder="Duration"
                style={{ padding: "10px", margin: "5px" }}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.touched.duration && formik.errors.duration ? (
                <div>{formik.errors.duration}</div>
              ) : null}
            </div>

            <div>
              <input
                id="cost"
                type="text"
                {...formik.getFieldProps("cost")}
                className="custom-border"
                placeholder="Cost"
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
              <input
                id="serviceName"
                type="text"
                {...formik.getFieldProps("serviceName")}
                className="custom-border"
                placeholder="Service Name"
                style={{ padding: "10px", margin: "5px" }}
              />
              {formik.touched.serviceName && formik.errors.serviceName ? (
                <div>{formik.errors.serviceName}</div>
              ) : null}
            </div>
          </div>

          <div className="field">
            <input
              id="description"
              type="text"
              {...formik.getFieldProps("description")}
              className="custom-border custom-box-2"
              placeholder="Service Description"
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
              Submit
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
}

export default PartnerSignUp;
