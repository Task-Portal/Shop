import React from "react";
import "normalize.css";
import "./components/css/styles";
import Header from "./components/head/header";
import { Outlet } from "react-router-dom";
import { GET_CURRENCIES } from "./apollo/queries";

class App extends React.Component {
  componentDidMount() {
    GET_CURRENCIES().then((r) => console.log("R: ", r));
  }

  render() {
    return (
      <div>
        <Header />
        <Outlet />
      </div>
    );
  }
}

export default App;
