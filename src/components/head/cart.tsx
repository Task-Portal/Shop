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
    productsFromDB: [] as IProduct[],
  };

  //region CDU
  componentDidUpdate(
    prevProps: Readonly<CartProp>,
    prevState: Readonly<CartState>,
    snapshot?: any
  ) {
    if (prevProps.orderedProducts.length < this.props.orderedProducts.length) {
      this.getItems();
    }
  }
  //endregion

  //region getItems()
  getItems() {
    GET_PRODUCT(
      this.props.orderedProducts[this.props.orderedProducts.length - 1]?.id
    ).then((p) => {
      let arr = [...this.state.productsFromDB];
      // @ts-ignore
      arr.push(p.data.product);
      this.setState({ productsFromDB: arr });
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

  //region getItemQuantity
  getItemQuantity(id: string) {
    return this.props?.orderedProducts?.filter((p) => p.id === id)[0]?.quantity;
  }
  //endregion

  //region onClick
  onClick(sign: string, id: string) {
    let items = addedItemsVar();
    let newArr = [] as IOrderedProducts;
    items.forEach((p) => {
      if (p.id === id) {
        sign === "+" ? p.quantity++ : p.quantity--;
      }
      if (p.quantity !== 0) {
        newArr.push(p);
      } else {
        let products = this.state.productsFromDB.filter((i) => i.id !== p.id);
        this.setState({ productsFromDB: products });
      }
    });

    addedItemsVar(newArr);
  }
  //endregion

  //region getTotal
  getTotal() {
    let symbol = this.props.currencySymbol;
    let price = this.state.productsFromDB.reduce((accumulator, p) => {
      return (
        accumulator +
        +p.prices.filter((p) => p.currency.symbol === symbol)[0].amount *
          this.getItemQuantity(p.id)
      );
    }, 0);
    return `${symbol}${price}`;
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
                        <button
                          className="sign"
                          onClick={() => this.onClick("+", p.id)}
                        >
                          +
                        </button>
                        <div>{this.getItemQuantity(p.id)}</div>
                        <button
                          className="sign"
                          onClick={() => this.onClick("-", p.id)}
                        >
                          -
                        </button>
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
              <div className="total">
                <div>Total</div>
                <div>{this.getTotal()}</div>
              </div>
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

export default withApolloHooksHOC(
  Cart,
  [addedItemsVar, selectedCurrencyVar],
  ["orderedProducts", "currencySymbol"]
);
