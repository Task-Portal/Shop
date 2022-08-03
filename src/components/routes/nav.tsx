import React from "react";

interface NavProp {
  value: string;
}

class Nav extends React.Component<NavProp> {
  render() {
    return <div className="nav">Hello from Nav: {this.props.value}</div>;
  }
}

export default Nav;
