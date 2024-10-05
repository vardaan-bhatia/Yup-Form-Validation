import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Step 1: Define the validation schema
const validationSchema = Yup.object().shape({
  firstname: Yup.string().required("First name is required"),
  lastname: Yup.string().required("Last name is required"),
  email: Yup.string().email("Email is not valid").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /(?=.*[A-Za-z])(?=.*\d)/,
      "Password must contain at least one letter and one number"
    )
    .required("Password is required"),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const ValidationWithFormik = () => {
  return (
    <Formik
      initialValues={{
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmpassword: "",
      }}
      validationSchema={validationSchema} // Step 2: Use the validation schema
      onSubmit={(values, { resetForm }) => {
        console.log("Form submitted:", values);
        resetForm(); // Reset the form after submission
      }}
    >
      {() => (
        <Form style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <label htmlFor="firstname">First name</label>
          <Field type="text" name="firstname" id="firstname" />
          <ErrorMessage
            name="firstname"
            component="span"
            style={{ color: "red" }}
          />

          <label htmlFor="lastname">Last name</label>
          <Field type="text" name="lastname" id="lastname" />
          <ErrorMessage
            name="lastname"
            component="span"
            style={{ color: "red" }}
          />

          <label htmlFor="email">Email</label>
          <Field type="email" name="email" id="email" />
          <ErrorMessage
            name="email"
            component="span"
            style={{ color: "red" }}
          />

          <label htmlFor="password">Password</label>
          <Field type="password" name="password" id="password" />
          <ErrorMessage
            name="password"
            component="span"
            style={{ color: "red" }}
          />

          <label htmlFor="confirmpassword">Confirm Password</label>
          <Field type="password" name="confirmpassword" id="confirmpassword" />
          <ErrorMessage
            name="confirmpassword"
            component="span"
            style={{ color: "red" }}
          />

          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default ValidationWithFormik;
