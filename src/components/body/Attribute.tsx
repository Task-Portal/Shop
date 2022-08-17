import React from "react";
import { IAttribute } from "../../interfaces/attributes";

interface AttributeProp {
  attributes: IAttribute[];
}

class Attribute extends React.Component<AttributeProp> {
  render() {
    return (
      <>
        {this.props.attributes &&
          this.props.attributes.map((a, i) => {
            return (
              <span key={`${a.id}`}>
                <div className="attribute-item-name" key={`${a.id}${a.name}`}>
                  {a.name}
                </div>
                <div className="item-group">
                  {a.items.map((i) => {
                    if (a.name === "Color") {
                      return (
                        <div
                          key={i.value}
                          className="color-box"
                          style={{
                            backgroundColor: `${i.value}`,
                          }}
                        />
                      );
                    }
                    return (
                      <div key={i.value} className="attribute-value">
                        {i.value}
                      </div>
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
