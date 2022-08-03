import React from "react";
import NavTab from "./navTab";

class MenuContainer extends React.Component {
  render() {
    return (
      <div className="menu_container">
        <NavTab value="WOMEN" />
        <NavTab value="MEN" />
        <NavTab value="KIDS" />
      </div>
    );
  }
}

export default MenuContainer;
