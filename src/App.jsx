import React, { Component } from "react";
import { pages } from "./Constants";
import ProductList from "./Components/ProductList";
import CartList from "./Components/CartList";
import Button from "./Components/Button";
import { getProducts, findProductById } from "./api";

var individualTotalPrice;
// App Component (is a stateful component)
export default class App extends Component {
  constructor(props) {
    super(props);
    // Sets the initial state.
    this.state = {
      currentPage: pages.PRODUCT_LIST, // Initial page is PRODUCT_LIST
      isLoading: true, // Should show loading until the products are loaded.
      products: [], // Initially the products list is empty
      cart: [], // Initially the cart list is empty
      subTotal: 0,
      totalCount: 0
    };
  }
  /**
   * componentDidMount is a React lifecycle method
   * that would be called immediately after the component is
   * mounted in the DOM.
   * Should make all the asynchronous or side effect casusing calls
   * from here.
   * Since we are using `await` inside this method
   * `async` is needed in front of this method signature.
   */
  async componentDidMount() {
    // Get the products this is an async function
    // returns a Promise
    const products = await getProducts();
    // Sets the products and isLoading to false
    this.setState({ products, isLoading: false });
  }

  /**
   * Sets the currentPage as CART_LIST
   */
  goToCart = () => {
    this.setState({
      currentPage: pages.CART_LIST
    });
  };

  /**
   * Sets the currentPage as PRODUCT_LIST
   */
  goToCatalog = () => {
    this.setState({
      currentPage: pages.PRODUCT_LIST
    });
  };

  /**
   * Add product to the cart list
   */
  addToCart = productId => {
    const { cart } = this.state;
    const product = findProductById(productId);
    if (cart.includes(product)) {
      this.setState({});
    } else {
      this.setState({
        cart: [...cart, product]
      });
    }

    product.individualCount++;
    this.setState({ subTotal: this.state.subTotal + product.price });
    this.setState({ totalCount: this.state.totalCount + 1 });
  };

  /**
   * Remove product to the cart list one by one
   */
  subtractFromCart = productId => {
    const { cart } = this.state;
    const product = findProductById(productId);
    if (product.individualCount >= 1 && this.state.totalCount > 0) {
      this.setState({
        subTotal: this.state.subTotal - product.price,
        totalCount: this.state.totalCount - 1
      });
      product.individualCount--;
      this.setState({});
    }
    if (product.individualCount === 0) {
      cart.splice(cart.indexOf(product), 1);
    }
  };

  /**
   * Remove entire product to the cart list
   */
  removeFromCart = productId => {
    const { cart } = this.state;
    const product = findProductById(productId);
    individualTotalPrice = product.price * product.individualCount;
    this.setState({ subTotal: this.state.subTotal - individualTotalPrice });
    this.setState({
      totalCount: this.state.totalCount - product.individualCount
    });
    product.individualCount = 0;
    cart.splice(cart.indexOf(product), 1);
    this.setState({});
  };

  /**
   * Update cart list using editable text feild
   */
  editCount = (updatedCount, productId) => {
    const product = findProductById(productId);

    var number = document.getElementById(productId);
    // Confirm only valid numbers are entered in the input field.
    number.onkeydown = function(e) {
      if (
        !(
          (e.keyCode > 95 && e.keyCode < 106) ||
          (e.keyCode > 47 && e.keyCode < 58) ||
          e.keyCode === 8
        )
      ) {
        return false;
      }
    };

    if (product.individualCount > updatedCount) {
      var diff = product.individualCount - updatedCount;
      var diffCost = diff * product.price;
      this.setState({
        totalCount: this.state.totalCount - diff,
        subTotal: this.state.subTotal - diffCost
      });
    } else {
      var diff = updatedCount - product.individualCount;
      var diffCost = diff * product.price;
      this.setState({
        totalCount: this.state.totalCount + diff,
        subTotal: this.state.subTotal + diffCost
      });
    }
    product.individualCount = updatedCount;
    if (product.individualCount === "0") {
      const { cart } = this.state;
      cart.splice(cart.indexOf(product), 1);
      this.setState({});
    }
  };

  render() {
    const { isLoading, currentPage, cart, products } = this.state;

    if (isLoading) {
      return <div className="loading">Loading...</div>;
    }

    const listing =
      currentPage === pages.PRODUCT_LIST ? (
        <ProductList products={products} addToCart={this.addToCart} />
      ) : (
        <CartList
          cart={cart}
          addToCart={this.addToCart}
          subtractFromCart={this.subtractFromCart}
          removeFromCart={this.removeFromCart}
          subTotal={this.state.subTotal}
          totalCount={this.state.totalCount}
          editCount={this.editCount}
        />
      );

    let navBtnMsg, navBtnFn;
    if (currentPage === pages.PRODUCT_LIST) {
      navBtnMsg = `Cart(${this.state.totalCount})`;
      navBtnFn = this.goToCart;
    } else {
      navBtnMsg = "Back";
      navBtnFn = this.goToCatalog;
    }

    return (
      <div>
        <Button
          className="goto-cart-btn"
          onClick={navBtnFn}
          message={navBtnMsg}
        />
        {listing}
      </div>
    );
  }
}
