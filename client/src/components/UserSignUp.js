import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const UserSignUp = () => {
  return (
    <Formik
      initialValues={{ firstName: "", lastName: "", email: "", zipCode: "" }}
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
          <div>
            <input
              id="firstName"
              type="text"
              {...formik.getFieldProps("firstName")}
              className="custom-border"
              placeholder="First Name"
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
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div>{formik.errors.lastName}</div>
            ) : null}
          </div>

          <div>
            <input
              id="zipCode"
              type="text"
              {...formik.getFieldProps("zipCode")}
              className="custom-border"
              placeholder="Zip Code"
            />
            {formik.touched.zipCode && formik.errors.zipCode ? (
              <div>{formik.errors.zipCode}</div>
            ) : null}
          </div>

          <div>
            <input
              id="email"
              type="email"
              {...formik.getFieldProps("email")}
              className="custom-border"
              placeholder="Email Address"
            />
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="flex items-center justify-center pt-3">
            <button type="submit">Submit</button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default UserSignUp;
