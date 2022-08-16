import React from "react";
import cart from "../images/shoppingCart.png";
import { withApolloHooksHOC } from "../../functions/withApolloHooksHOC";
import { addedItemsVar, selectedCurrencyVar } from "../../apollo/cache";
import { IOrderedProducts } from "../../interfaces/orderedProducts";
import { GET_PRODUCT } from "../../apollo/queries";
import { IProduct } from "../../interfaces/product";
import Attribute from "../body/Attribute";

interface CartProp {
  orderedProducts: IOrderedProducts;
  currencySymbol: string;
}

interface CartState {
  isOpen: boolean;
  productsFromDB: IProduct[];
}

class Cart extends React.Component<CartProp, CartState> {
  state = {
    isOpen: false,
    productsFromDB: [],
  };

  //region CDU
  componentDidUpdate(
    prevProps: Readonly<CartProp>,
    prevState: Readonly<CartState>,
    snapshot?: any
  ) {
    if (
      prevProps.orderedProducts.length !== this.props.orderedProducts.length
    ) {
      this.getItems();
    }
  }
  //endregion

  //region getItems()
  getItems() {
    GET_PRODUCT(
      this.props.orderedProducts[this.props.orderedProducts.length - 1].id
    ).then((p) => {
      let arr = [...this.state.productsFromDB];
      // @ts-ignore
      arr.push(p.data.product);
      this.setState({ productsFromDB: arr });
      console.log("state: ", this.state);
      console.log("Product: ", p);
    });
  }
  //endregion

  //region CalculateOrderedItems
  calculateOrderedItems() {
    return this.props.orderedProducts?.reduce((accumulator, val) => {
      return accumulator + val.quantity;
    }, 0);
  }
  //endregion

  //region Render
  render() {
    return (
      <>
        <button onClick={() => this.setState({ isOpen: !this.state.isOpen })}>
          <img className="shop-cart" src={cart} alt="shopping cart" />
          {this.calculateOrderedItems() > 0 && (
            <div className="circle">{this.calculateOrderedItems()}</div>
          )}
        </button>

        {this.state.isOpen && (
          <>
            <div className="overlay"></div>
            <div className="cart-container">
              {/*region Title My Bag*/}

              <div className="title">
                <b>My Bag</b> , {this.calculateOrderedItems()} items
              </div>
              {/*endregion*/}

              {/*region Items*/}
              <div className="items">
                {this.state.productsFromDB.map((p: IProduct) => {
                  return (
                    <div className="item-box" key={p.id}>
                      {/*region Brand*/}
                      <div className="grid-item1">{p.brand}</div>
                      {/*endregion*/}
                      {/*region Buttons Plus Minus Quantity*/}
                      <div className="grid-item2">
                        <button className="sign">+</button>
                        <div>2</div>
                        <button className="sign">-</button>
                      </div>
                      {/*endregion*/}

                      {/*region Image Name*/}
                      <div className="grid-item3">
                        <img className="cart-image" src={p.gallery[0]} alt="" />
                      </div>
                      {/*endregion */}

                      {/*region Name Currency*/}
                      <div className="grid-item4">{p.name}</div>
                      <div className="grid-item5">
                        {this.props.currencySymbol}
                        {
                          p.prices.filter(
                            (p) =>
                              p.currency.symbol === this.props.currencySymbol
                          )[0]?.amount
                        }
                      </div>
                      {/*endregion*/}

                      {/*region Attributes*/}
                      <div className="grid-item6">
                        <Attribute
                          attributes={p.attributes}
                          key={`${p.id}atr`}
                        />
                      </div>
                      {/*endregion  */}
                    </div>
                  );
                })}
              </div>
              {/*endregion*/}
              {/*region Total*/}
              <div className="total">Total</div>
              {/*endregion*/}
              {/*region Buttons*/}
              <div className="buttons">
                <button>VIEW BAG</button>
                <button>CHECK OUT</button>
              </div>
              {/*endregion*/}
            </div>
          </>
        )}
      </>
    );
  }
  //endregion
}

// export default withApolloHooksHOC(Cart, addedItemsVar, "orderedProducts");
export default withApolloHooksHOC(
  Cart,
  [addedItemsVar, selectedCurrencyVar],
  ["orderedProducts", "currencySymbol"]
);
