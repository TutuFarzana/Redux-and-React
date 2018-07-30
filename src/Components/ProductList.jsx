import React from "react";
import Product from "./Product";
import AddToCartButton from "./Button";

export default ({ products, addToCart }) => (
  <React.Fragment>
    <h2>Products List</h2>
    <ul>
      {products.map(product => (
        <Product key={product.id} {...product}>
          <AddToCartButton
            onClick={addToCart.bind(null, product.id)}
            message="Add to Cart"
          />
        </Product>
      ))}
    </ul>
  </React.Fragment>
);
