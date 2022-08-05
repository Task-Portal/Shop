import React from "react";
import cart from "../images/shoppingCart.png";

class Cart extends React.Component {
  render() {
    return (
      <button>
        <img src={cart} alt="shopping cart" />
      </button>
    );
  }
}

export default Cart;
