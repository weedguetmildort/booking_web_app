import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const UserSignUp = () => {
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        zipCode: "",
        password: "",
        retypePassword: "",
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
        retypePassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Retype Password is required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
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
                  <div>
                    <input
                      id="retypePassword "
                      type="retypePassword "
                      {...formik.getFieldProps("retypePassword ")}
                      className="custom-border"
                      placeholder="Retype Password"
                      style={{ padding: "10px", margin: "5px" }}
                    />
                    {formik.touched.retypePassword &&
                    formik.errors.retypePassword ? (
                      <div>{formik.errors.retypePassword}</div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
            <div>
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
};

export default UserSignUp;
