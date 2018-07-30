import React from "react";
import Cart from "./Cart";
import AddToCartButton from "./Button";
import SubtractFromCartButton from "./Button";
import RemoveFromCartButton from "./Button";

// CartList component (is a Stateless component)
export default ({
  cart,
  addToCart,
  subtractFromCart,
  removeFromCart,
  subTotal,
  totalCount,
  editCount
}) => (
  <React.Fragment>
    <h2>Cart List ({`${totalCount}`})</h2>
    <ul>
      {cart.map(cartItem => (
        <Cart key={cartItem.id} {...cartItem}>
          <AddToCartButton
            onClick={addToCart.bind(null, cartItem.id)}
            message="+"
          />

          <input
            type="number"
            name="individualCount"
            id={cartItem.id}
            min={0}
            value={cartItem.individualCount}
            onChange={e => editCount(e.target.value, cartItem.id)}
          />

          <SubtractFromCartButton
            onClick={subtractFromCart.bind(null, cartItem.id)}
            message="-"
          />
          <RemoveFromCartButton
            onClick={removeFromCart.bind(null, cartItem.id)}
            message="Remove From Cart"
          />
        </Cart>
      ))}
    </ul>
    <div>
      <span>Subtotal: </span>
      <strong>{subTotal}</strong>
    </div>
  </React.Fragment>
);
