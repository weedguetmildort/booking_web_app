import React, { useState, useContext, useEffect } from "react";
import Banner from "components/Banner";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import axios from "axios";

function ProfileUser() {
  const { user, token, login } = useUser();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    uID: "",
    firstName: "",
    lastName: "",
    zip: "",
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      setInitialValues({
        uID: user.id,
        firstName: user.firstname,
        lastName: user.lastname,
        zip: user.zip,
      });
    }
  }, [user, navigate]);

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    zipCode: Yup.string()
      .matches(/^[0-9]{5}$/, "Must be a valid zip code")
      .required("Required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        "http://localhost:5002/db/api/updateuser",
        {
          ...values,
          token,
        }
      );

      if (response.status === 200) {
        login(response.data.user, token);
        alert("Profile updated successfully");
      } else {
        alert("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating the profile");
    }
    setSubmitting(false);
  };

  // Previous Code
  // const [user, setUser] = useState(null);
  // const { logout } = useContext(UserContext);
  // const navigate = useNavigate();

  // // Retrieve user information from local storage when the component mounts
  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   if (!storedUser) {
  //     navigate("/login"); // Redirect to login page if not authenticated
  //   }
  //   setUser(JSON.parse(storedUser));
  //   console.log(storedUser);
  // }, [navigate]);

  // // Validation schema for the form
  // const validationSchema = Yup.object({
  //   firstName: Yup.string().required("Required"),
  //   lastName: Yup.string().required("Required"),
  //   zipCode: Yup.string()
  //     .matches(/^[0-9]{5}$/, "Must be a valid zip code")
  //     .required("Required"),
  // });

  // // Handle form submission

  // const handleSubmit = async (values, { setSubmitting }) => {
  //   try {
  //     console.log("progress?");
  //     const response = await axios.post(
  //       "http://localhost:5002/db/api/updateuser",
  //       {
  //         ...values,
  //         // token, // Include token if required for authentication
  //       }
  //     );

  //     if (response.status === 200) {
  //       // Update the user context with the new data
  //       logout();
  //       alert("Profile updated successfully");
  //     } else {
  //       alert("Failed to update profile");
  //     }
  //   } catch (error) {
  //     console.error("Error updating profile:", error);
  //     alert("An error occurred while updating the profile");
  //   }
  //   setSubmitting(false);

  // Call to send the data to backend
  // axios
  //   .post("http://localhost:5002/db/api/updateuser", values)
  //   .then((response) => {
  //     console.log("Response:", response.data);
  //     logout();

  //     // Redirect the user to profile page
  //     navigate("/profile");
  //   })
  //   .catch((error) => {
  //     console.error("Error during update:", error);
  //     // Handle error: TO BE IMPLEMENTED
  //   })
  //   .finally(() => {
  //     setSubmitting(false);
  //   });

  // // API call to update user data
  // fetch("http://localhost:5002/db/api/updateuser", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${localStorage.getItem("token")}`,
  //   },
  //   body: JSON.stringify(values),
  // })
  //   .then((response) => {
  //     response.json();
  //   })
  //   .then((data) => {
  //     setUser(data);

  //     logout();

  //     // Redirect the user to profile page
  //     navigate("/profile");
  //   })
  //   .catch((error) => {
  //     console.error("Error updating user data:", error);
  //     setSubmitting(false);
  //   });
  // };

  // Previous Return
  // return (
  //   <div>
  //     <Banner />

  //     <h1 className="center">User Profile Page</h1>

  //     <Formik
  //       initialValues={{
  //         uID: user.id,
  //         firstName: user.firstname,
  //         lastName: user.lastname,
  //         zip: user.zip,
  //       }}
  //       validationSchema={validationSchema}
  //       onSubmit={handleSubmit}
  //     >
  //       {({ isSubmitting }) => (
  //         <Form>
  //           <div className="field center">
  //             <p>User ID: {user.id}</p>
  //           </div>
  //           <div className="field center">
  //             <label htmlFor="firstName">First Name</label>
  //             <Field
  //               name="firstName"
  //               type="text"
  //               className="custom-border"
  //               style={{ padding: "10px", margin: "5px" }}
  //             />
  //           </div>
  //           <div className="field center">
  //             <label htmlFor="lastName">Last Name</label>
  //             <Field
  //               name="lastName"
  //               type="text"
  //               className="custom-border"
  //               style={{ padding: "10px", margin: "5px" }}
  //             />
  //           </div>
  //           <div className="field center">
  //             <label htmlFor="zip">Zip Code</label>
  //             <Field
  //               name="zip"
  //               type="text"
  //               className="custom-border"
  //               style={{ padding: "10px", margin: "5px" }}
  //             />
  //           </div>
  //           <div className="center">
  //             <button type="submit" disabled={isSubmitting}>
  //               Save Changes
  //             </button>
  //           </div>
  //         </Form>
  //       )}
  //     </Formik>
  //   </div>
  // );

  return (
    <div>
      <Banner />

      <h1 className="center">User Profile Page</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="field center">
              <p>User ID: </p>
            </div>
            <div className="field center">
              <label htmlFor="firstName">First Name</label>
              <Field
                name="firstName"
                type="text"
                className="custom-border"
                style={{ padding: "10px", margin: "5px" }}
              />
            </div>
            <div className="field center">
              <label htmlFor="lastName">Last Name</label>
              <Field
                name="lastName"
                type="text"
                className="custom-border"
                style={{ padding: "10px", margin: "5px" }}
              />
            </div>
            <div className="field center">
              <label htmlFor="zip">Zip Code</label>
              <Field
                name="zip"
                type="text"
                className="custom-border"
                style={{ padding: "10px", margin: "5px" }}
              />
            </div>
            <div className="center">
              <button type="submit" disabled={isSubmitting}>
                Save Changes
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ProfileUser;
