import React from "react";

// Button component (is a Stateless component)
export default ({ onClick, message = "Click Me", className = "" }) => (
  <button className={`${className} custom-btn`} onClick={onClick}>
    {message}
  </button>
);
