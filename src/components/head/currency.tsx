import React, { RefObject } from "react";

import { GET_CURRENCIES } from "../../queries";
import downArrow from "../images/down-arrow.png";

import { ICurrency } from "../../interfaces/currency";

interface CurrencyProp {
  currencyType: string;
}

interface IState {
  selectedCurrency: string;
  currencies: ICurrency[];
  isSelectOpen: boolean;
}

class Currency extends React.Component<CurrencyProp, IState> {
  // {this.props.currencyType}
  buttonRef: RefObject<any>;
  constructor(props) {
    super(props);

    this.buttonRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.state = {
      selectedCurrency: "",
      currencies: [] as ICurrency[],
      isSelectOpen: false,
    };
  }

  handleClickOutside(event) {
    if (this.buttonRef && !this.buttonRef.current.contains(event.target)) {
      this.setState({ isSelectOpen: false });
    }
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);

    GET_CURRENCIES().then((r) => {
      if (r?.data?.currencies) {
        this.setState({
          currencies: r.data.currencies,
          selectedCurrency: r.data.currencies[0].symbol,
        });
      }
      console.log("Result: ", r.data.currencies);
    });
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  render() {
    return (
      <div ref={this.buttonRef}>
        <div className="wrapper">
          <div className="container">
            <button
              type="button"
              onClick={() =>
                this.setState({ isSelectOpen: !this.state.isSelectOpen })
              }
            >
              {this.state.selectedCurrency}

              <i
                className={
                  this.state.isSelectOpen
                    ? "fa-solid fa-angle-up"
                    : "fa-solid fa-angle-down"
                }
              ></i>
            </button>
            <ul className={`options ${this.state.isSelectOpen ? "show" : ""}`}>
              {this.state.currencies.map((c) => (
                <li
                  key={c.symbol}
                  onClick={() => {
                    this.setState({
                      selectedCurrency: c.symbol,
                      isSelectOpen: false,
                    });
                  }}
                >
                  {c.symbol + " " + c.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Currency;
