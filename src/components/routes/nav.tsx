import React from "react";
import { capitalizeFirstLetter } from "../../functions/functions";
import { GET_ITEMS } from "../../apollo/queries";
import { IProduct } from "../../interfaces/product";
import { addedItemsVar, selectedCurrencyVar } from "../../apollo/cache";
import circleCartBtn from "../images/circleIcon.png";
import { withApolloHooksHOC } from "../../functions/withApolloHooksHOC";

interface NavProp {
  value: string;
  currency: string;
}

interface IState {
  items: IProduct[];
  currency: string;
}

class Nav extends React.Component<NavProp, IState> {
  //region ctor
  constructor(props) {
    super(props);

    this.onAdd = this.onAdd.bind(this);

    //region state
    this.state = {
      items: [] as IProduct[],
      currency: this.props.currency,
    };
    //endregion
  }
  //endregion

  //region CDM
  componentDidMount() {
    this.getItems();
  }
  //endregion
  //region CDU
  componentDidUpdate(
    prevProps: Readonly<NavProp>,
    prevState: Readonly<IState>,
    snapshot?: any
  ) {
    if (
      prevProps.value !== this.props.value ||
      prevProps.currency !== this.props.currency
    ) {
      this.getItems();
      this.setState({ currency: this.props.currency });
    }
  }
  //endregion

  //region onAdd
  onAdd(value: string) {
    let flag = true;
    let orderedProducts = [...addedItemsVar()];

    orderedProducts.forEach((f) => {
      if (f.id === value) {
        f.quantity++;
        flag = false;
      }
    });

    if (flag) {
      orderedProducts.push({ id: value, quantity: 1 });
    }
    addedItemsVar(orderedProducts);
  }
  //endregion

  //region getItems()
  getItems() {
    GET_ITEMS(this.props.value).then((r) => {
      console.log(r.data.category.products);
      this.setState({ items: r.data.category.products });
    });
  }
  //endregion

  render() {
    return (
      <div className="nav">
        <div className="categoryName">
          {capitalizeFirstLetter(this.props.value)}
        </div>

        <section className="goods">
          {this.state.items?.map((i) => {
            return (
              <div
                key={i.name}
                className={i.inStock ? "" : "item-out-of-stock"}
              >
                <div className="item">
                  <div className="image-out-item-container">
                    <img
                      className="item-image"
                      src={i.gallery[0]}
                      alt="image"
                    />
                    {i.inStock || (
                      <div className="out-of-stock-title">Out of stock</div>
                    )}
                  </div>

                  {i.inStock && (
                    <img
                      onClick={() => this.onAdd(i.id)}
                      className="item-image-shop-cartBtn"
                      alt="order"
                      src={circleCartBtn}
                    />
                  )}

                  <div className="item-name">{i.name}</div>
                  <div className="item-price">
                    {this.state.currency}
                    {
                      i.prices.filter(
                        (p) => p.currency.symbol === this.state.currency
                      )[0]?.amount
                    }
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      </div>
    );
  }
}

// export default withApolloHooksHOC(Nav, selectedCurrencyVar, "currency");
export default withApolloHooksHOC(Nav, [selectedCurrencyVar], ["currency"]);
