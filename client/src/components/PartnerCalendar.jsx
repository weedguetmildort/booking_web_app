import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";

function PartnerCalendar() {
  let oldArray = [
    [OPEN, CLOSE],
    [OPEN, CLOSE],
    [DATE1, DATE2],
    [DATE1, DATE2],
    [DATE1, DATE2],
    [DATE1, DATE2],
    [DATE1, DATE2],
  ];
  let newArray = [
    [OPEN, CLOSE],
    [OPEN, CLOSE],
    [DATE1, DATE2],
    [DATE1, DATE2],
    [DATE1, DATE2],
    [DATE1, DATE2],
    [DATE1, DATE2],
  ];

  useState();
  function getHoursOfOperation() {
    // get from db
  }
  function doChange() {
    // verify that the input is good to go
    // save it in the array, or a separate array
  }
  function doSubmit() {
    // make sure that the newArray looks, has 7 items
    // post to database, push the new hours of operation
  }
  <Formik
    initialValues={{
      availabilityStatus: "",
    }}
    validationSchema={Yup.object({
      availabilityStatus: Yup.string()
        .oneOf(["Open", "Closed"], "Option must be Open or Closed")
        .required("Please select an availability status"),
    })}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 400);
    }}
  >
    <input onChange={doChange} defaultText={array[0][0]}></input>
    <input onChange={doChange} defaultText={array[0][0]}></input>
    <input onChange={doChange} defaultText={array[0][1]}></input>
    <input onChange={doChange} defaultText={array[0][0]}></input>
    <input onChange={doChange} defaultText={array[0][1]}></input>
    <input onChange={doChange} defaultText={array[0][0]}></input>
    <input onChange={doChange} defaultText={array[0][1]}></input>
    <input onChange={doChange} defaultText={array[0][0]}></input>
    <input onChange={doChange} defaultText={array[0][1]}></input>
    <input onChange={doChange} defaultText={array[0][0]}></input>
    <input onChange={doChange} defaultText={array[0][1]}></input>
    <input onChange={doChange} defaultText={array[0][0]}></input>
    <input onChange={doChange} defaultText={array[0][1]}></input>
    <input onChange={doChange} defaultText={array[0][0]}></input>
  </Formik>;
}

export default PartnerCalendar;
