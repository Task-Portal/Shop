import React from "react";
import cart from "../images/shoppingCart.png";
import { withHooksHOC } from "../../functions/withHooksHOC";
import { addedItemsVar } from "../../apollo/cache";
import { IOrderedProducts } from "../../interfaces/orderedProducts";

interface CartProp {
  products: IOrderedProducts;
}

class Cart extends React.Component<CartProp> {
  calculateOrderedItems() {
    return this.props.products?.reduce((accumulator, val) => {
      return accumulator + val.quantity;
    }, 0);
  }

  render() {
    return (
      <div>
        <button onClick={() => console.log("hello")}>
          <img className="shop-cart" src={cart} alt="shopping cart" />
          {this.calculateOrderedItems() > 0 && (
            <div className="circle">{this.calculateOrderedItems()}</div>
          )}
        </button>
      </div>
    );
  }
}

export default withHooksHOC(Cart, addedItemsVar, "products");
