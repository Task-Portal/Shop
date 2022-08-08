import React from "react";
import { capitalizeFirstLetter } from "../../functions/functions";
import { GET_ITEMS } from "../../apollo/queries";
import { IProduct } from "../../interfaces/product";
import { getLocals } from "../../apollo/getLocals";

interface NavProp {
  value: string;
}

interface IState {
  items: IProduct[];
  currency: string;
}

class Nav extends React.Component<NavProp, IState> {
  // this.props.value
  state = {
    items: [] as IProduct[],
    currency: getLocals("selectedCurrency"),
  };
  componentDidMount() {
    this.getItems();
    let b = getLocals("selectedCurrency");
    // console.log("Get Locals: ", b);
  }
  componentDidUpdate(
    prevProps: Readonly<NavProp>,
    prevState: Readonly<IState>,
    snapshot?: any
  ) {
    if (prevProps.value !== this.props.value) {
      this.getItems();
    }
    console.log("Get Locals: ", this.state.currency);
  }

  getItems() {
    GET_ITEMS(this.props.value).then((r) => {
      console.log(r.data.category.products);
      this.setState({ items: r.data.category.products });
    });
  }

  render() {
    return (
      <div className="nav">
        <div className="categoryName">
          {capitalizeFirstLetter(this.props.value)}
        </div>

        <section className="goods">
          {this.state.items?.map((i) => {
            return (
              <div className="item" key={i.name}>
                <div>
                  <img className="item-image" src={i.gallery[0]} alt="" />
                </div>

                <div className="item-name">{i.name}</div>
                <div className="item-price">{i.prices[0].amount}</div>
              </div>
            );
          })}
        </section>
      </div>
    );
  }
}

export default Nav;
