import React from "react";

// Cart component (is a Stateless component)
export default ({ id, name, price, individualCount, children }) => (
  <li className="cart">
    <div className="inline">
      Product: {name} <br />
      Price: {price} <br />
      Quantity: {individualCount}
      <br />
      {children}
    </div>
  </li>
);
