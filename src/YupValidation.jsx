import React, { useState } from "react";
import * as Yup from "yup";

const YupValidation = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [errors, setErrors] = useState({});

  // Yup validation schema
  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Email is not valid")
      .required("Email is required"),
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

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      console.log("Form submitted:", formData);
      // Reset the form
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmpassword: "",
      });
      setErrors({}); // Clear any previous errors
    } else {
      setErrors(validationErrors); // Set validation errors
    }
  };

  // Validate form data using Yup
  const validateForm = () => {
    try {
      validationSchema.validateSync(formData, { abortEarly: false });
      return {}; // No errors
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      return validationErrors; // Return the errors
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div style={{ display: "flex" }}>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <label htmlFor="firstname">First name</label>
        <input
          type="text"
          name="firstname"
          id="firstname"
          value={formData.firstname}
          onChange={handleChange}
        />
        {errors.firstname && (
          <span style={{ color: "red" }}>{errors.firstname}</span>
        )}

        <label htmlFor="lastname">Last name</label>
        <input
          type="text"
          name="lastname"
          id="lastname"
          value={formData.lastname}
          onChange={handleChange}
        />
        {errors.lastname && (
          <span style={{ color: "red" }}>{errors.lastname}</span>
        )}

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && (
          <span style={{ color: "red" }}>{errors.password}</span>
        )}

        <label htmlFor="confirmpassword">Confirm Password</label>
        <input
          type="password"
          name="confirmpassword"
          id="confirmpassword"
          value={formData.confirmpassword}
          onChange={handleChange}
        />
        {errors.confirmpassword && (
          <span style={{ color: "red" }}>{errors.confirmpassword}</span>
        )}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default YupValidation;
