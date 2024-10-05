import { useState } from "react";

const ValidationWithoutYup = () => {
  const [formData, setformData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      console.log("Form submitted:", formData);
      setformData({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmpassword: "",
      });

      // Optionally, you can also clear the errors if needed
      setErrors({});
      // Further submission logic here (e.g., API call)
    } else {
      setErrors(validationErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!formData.firstname) newErrors.firstname = "First name is required";
    if (!formData.lastname) newErrors.lastname = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.confirmpassword)
      newErrors.confirmpassword = "confirm password is required";
    if (formData.password !== formData.confirmpassword)
      newErrors.confirmpassword = "Passwords do not match";

    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors["email"] = "Email is not valid";
    }

    // Validate password strength
    // if (formData.password && !passwordRegex.test(formData.password)) {
    //   newErrors["password"] =
    //     "Password must be at least 8 characters long and include at least one letter and one number";
    // }

    return newErrors;
  };
  return (
    <div style={{ display: "flex" }}>
      <form
        onSubmit={handleSubmit}
        action=""
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
        />{" "}
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
        />{" "}
        {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
        />{" "}
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
        />{" "}
        {errors.confirmpassword && (
          <span style={{ color: "red" }}>{errors.confirmpassword}</span>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ValidationWithoutYup;
