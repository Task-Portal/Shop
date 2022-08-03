import React from "react";
import { NavLink } from "react-router-dom";

interface NavTabProp {
  value: string;
}

class NavTab extends React.Component<NavTabProp> {
  render() {
    return (
      <div className="navTab">
        <NavLink to={`${this.props.value.toLowerCase()}`}>
          {this.props.value}
        </NavLink>
      </div>
    );
  }
}

export default NavTab;
