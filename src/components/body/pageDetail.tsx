import React from "react";
import { addedItemsVar, selectedCurrencyVar } from "../../apollo/cache";
import { IProduct } from "../../interfaces/product";
import { withHooksHoc } from "../../functions/withHooksHoc";
import { useReactiveVar } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_PRODUCT } from "../../apollo/queries";
import Attribute from "./Attribute";
import { IOrderedProducts } from "../../interfaces/orderedProducts";
import { IAttribute } from "../../interfaces/attributes";

interface DetailProps {
  id: string;
  currencySymbol: string;
  orderedProducts: IOrderedProducts;
  // selectProduct: IProduct;
}

interface DetailState {
  selectedProduct: IProduct;
  selPhoto: string;
  selectedAttributes: IAttribute[];
}

class PageDetail extends React.Component<DetailProps, DetailState> {
  state = {
    selectedProduct: {} as IProduct,
    selPhoto: "",
    selectedAttributes: [] as IAttribute[],
  };

  //region CDM
  componentDidMount() {
    // console.log("Props111: ", this.props);
    this.getItem();
    console.log("Page Details: CDM");
  }
  //endregion

  //region getItems()
  getItem() {
    GET_PRODUCT(this.props["id"]["id"]).then((p) => {
      this.setState({
        selectedProduct: p.data.product,
        selPhoto: p.data.product.gallery[0],
      });
    });
  }
  //endregion

  getSelectedAttributes = (childData: IAttribute[]) => {
    this.setState({ selectedAttributes: childData });
  };

  //region Add to Cart
  addToCart() {
    let id = this.state.selectedProduct.id;
    let flag = true;
    let orderedProducts = [...addedItemsVar()];

    orderedProducts.forEach((f) => {
      if (f.id === id) {
        f.quantity++;
        f.attributes = this.state.selectedAttributes;
        flag = false;
      }
    });

    if (flag) {
      orderedProducts.push({
        id: id,
        quantity: 1,
        attributes: this.state.selectedAttributes,
      });
    }
    addedItemsVar(orderedProducts);
  }
  //endregion

  //region Render
  render() {
    return (
      <div className="pageDetailContainer">
        {/*region Photos*/}
        <div className="collectionPhotos">
          {this.state.selectedProduct &&
            this.state.selectedProduct.gallery?.map((p, i) => {
              return (
                <img
                  className="miniPhoto"
                  src={p}
                  alt=""
                  onClick={() => this.setState({ selPhoto: p })}
                  key={p}
                />
              );
            })}
        </div>
        {/*endregion*/}
        {/*region Main Photo*/}
        <div className="mainPhoto">
          <img className="mainPhotoImg" src={this.state.selPhoto} alt="" />
        </div>
        {/*endregion*/}
        <div className="info">
          {/*region Brand Title*/}
          <div className="brand">{this.state.selectedProduct.brand}</div>
          <div className="title">{this.state.selectedProduct.name}</div>
          {/*endregion*/}
          <div className="attributes">
            <Attribute
              orderedProducts={this.props.orderedProducts}
              product={this.state.selectedProduct}
              styles={[
                "priceTitle",
                "attributeItemValue",
                "attributeItemColor",
              ]}
              name={"PageDetail"}
              selectedAttributes={this.state.selectedAttributes}
              gettingAttributes={this.getSelectedAttributes}
            />
          </div>
          <div className="price">
            {/*region Price*/}
            <div className="priceTitle">Price:</div>

            <div className="priceBody">
              {this.props.currencySymbol}
              {this.state.selectedProduct &&
                this.state.selectedProduct?.prices?.filter(
                  (p) => p.currency.symbol === this.props.currencySymbol
                )[0]?.amount}
            </div>
            {/*endregion*/}
            {/*region Button*/}
            <button className="addBtn" onClick={() => this.addToCart()}>
              ADD TO CART
            </button>
            {/*endregion  */}
          </div>
          {/*region Description*/}
          <div
            dangerouslySetInnerHTML={{
              __html: this.state.selectedProduct.description,
            }}
          ></div>
          {/*endregion*/}
        </div>
      </div>
    );
  }
  //  endregion
}

export default withHooksHoc(PageDetail, [
  { hook: useParams, propName: "id" },
  {
    hook: useReactiveVar,
    name: selectedCurrencyVar,
    propName: "currencySymbol",
  },
  {
    hook: useReactiveVar,
    name: addedItemsVar,
    propName: "orderedProducts",
  },
]);
