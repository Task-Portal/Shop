import React from "react";
import { IAttribute } from "../../interfaces/attributes";
import { IProduct } from "../../interfaces/product";
import { addedItemsVar } from "../../apollo/cache";
import { IOrderedProducts } from "../../interfaces/orderedProducts";

interface AttributeProp {
  orderedProducts: IOrderedProducts | undefined;
  product: IProduct;
  styles: string[];

  // addSelectedAttributesFun: Function | undefined;
}

interface AttrState {
  selectedAttributes: IAttribute[];
}

class Attribute extends React.Component<AttributeProp, AttrState> {
  state = {
    selectedAttributes: [] as IAttribute[],
  };

  componentDidMount() {
    let prodId = this.props.product.id;
    if (this.props.orderedProducts?.some((i) => i.id === prodId)) {
      let attributes = this.props.orderedProducts?.filter(
        (f) => f.id === prodId
      )[0]?.attributes;
      if (attributes) {
        this.setState({ selectedAttributes: attributes });
      }
    }
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.orderedProducts !== this.props.orderedProducts) {
  //     console.log("Changed: ");
  //   }
  //
  //
  //   console.log("prevProps.orderedProducts", prevProps.orderedProducts);
  //   console.log("this.props.orderedProducts", this.props.orderedProducts);
  // }

  //region AddSelectedAttributes
  addSelectedAttributes(atrName: string, value: string) {
    let atr = [...this.state.selectedAttributes];
    if (this.state.selectedAttributes.some((f) => f.name === atrName)) {
      atr.forEach((a) => {
        if (a.name === atrName) {
          a.items.forEach((p) => {
            if (p.value !== value) {
              p.value = value;
            }
          });
        }
      });
    } else {
      atr.push({ name: atrName, items: [{ value: value }] });
    }
    this.setState({ selectedAttributes: atr });

    let items = this.props.orderedProducts;

    if (items && items.some((i) => i.id === this.props.product.id)) {
      items.forEach((i) => {
        if (i.id === this.props.product.id) {
          //if the same attribute exist
          // if there is not such attribute
          // atr.forEach(a=>{
          //   if (i.attributes?.some(i=>i.name===a.name)){
          //
          //   }
          // })
          // i.attributes = atr;
        }
      });

      addedItemsVar(items);
    }
  }
  //endregion

  //region checkSelectedAttribute
  checkSelectedAttribute(atrName: string, value: string, index: number) {
    let result = false;
    if (this.state.selectedAttributes.length === 0) {
      result = false;
    } else {
      this.state.selectedAttributes.forEach((p) => {
        if (p.name === atrName) {
          p.items.forEach((v) => {
            if (v.value === value) result = true;
          });
        }
      });
    }

    let attributes = this.props?.orderedProducts?.filter(
      (f) => f.id === this.props.product.id
    )[0]?.attributes;

    if (attributes !== undefined) {
      attributes?.forEach((a) => {
        if (a.name === atrName) {
          a.items.forEach((i) => {
            if (i.value === value) result = true;
          });
        }
      });
    }

    return result;
  }
  //endregion

  render() {
    return (
      <>
        {this.props.product.attributes &&
          this.props.product.attributes.map((a, i) => {
            return (
              <span key={`${a.id}`}>
                <div
                  className={`attribute-item-name ${this.props.styles[0]}`}
                  key={`${a.id}${a.name}`}
                >
                  {a.name}:
                </div>
                {/*<div className={`item-group ${this.props.styles[1]}`}>*/}
                <div className={`item-group`}>
                  {a.items.map((i, index) => {
                    //region attribute Color
                    if (a.name === "Color") {
                      return (
                        <div
                          key={i.value}
                          className={`colorContainer ${
                            this.checkSelectedAttribute(
                              a.name,
                              i.value,
                              index
                            ) && "selectedAttributeColor"
                          }`}
                          // selectedAttributeColor
                        >
                          <div
                            onClick={() =>
                              this.addSelectedAttributes(a.name, i.value)
                            }
                            className="color-box "
                            style={{
                              backgroundColor: `${i.value}`,
                            }}
                          />
                        </div>
                      );
                    }
                    //endregion
                    //region attribute Text
                    return (
                      <div
                        onClick={() =>
                          this.addSelectedAttributes(a.name, i.value)
                        }
                        key={i.value}
                        className={`attribute-value ${this.props.styles[1]} ${
                          this.checkSelectedAttribute(a.name, i.value, index) &&
                          "selectedAttributeTxt"
                        }`}
                        // className={`"attribute-value" ${this.props.styles[1]}`}
                        // selectedAttributeTxt
                      >
                        {i.value}
                      </div>
                      //endregion
                    );
                  })}
                </div>
              </span>
            );
          })}
      </>
    );
  }
}

export default Attribute;
