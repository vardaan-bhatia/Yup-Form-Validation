import React from "react";
import ValidationWithoutYup from "./ValidationWithoutYup";
import YupValidation from "./YupValidation";
import ValidationWithFormik from "./FormikYup";

const App = () => {
  return (
    <div>
      {/* <ValidationWithoutYup /> */}
      {/* <YupValidation /> */}
      <ValidationWithFormik />
    </div>
  );
};

export default App;
