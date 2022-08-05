import React from "react";
import { capitalizeFirstLetter } from "../../functions/functions";
import { GET_ITEMS } from "../../apollo/queries";

interface NavProp {
  value: string;
}

class Nav extends React.Component<NavProp> {
  // this.props.value
  componentDidMount() {
    GET_ITEMS(this.props.value).then((r) => {
      console.log(r.data);
    });
  }

  render() {
    return (
      <div className="nav">
        <div className="categoryName">
          {capitalizeFirstLetter(this.props.value)}
        </div>

        <section className="items"></section>
      </div>
    );
  }
}

export default Nav;
