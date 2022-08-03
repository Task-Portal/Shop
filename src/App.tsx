import React from "react";
import "normalize.css";
import "./components/css/styles";
import Header from "./components/head/header";
import { Outlet } from "react-router-dom";

class App extends React.Component {
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
