import React from "react";
import ValidationWithoutYup from "./ValidationWithoutYup";
import YupValidation from "./YupValidation";

const App = () => {
  return (
    <div>
      <ValidationWithoutYup />
      <YupValidation />
    </div>
  );
};

export default App;
