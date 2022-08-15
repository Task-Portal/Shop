import React from "react";
import "normalize.css";
import "./components/css/styles";
import Header from "./components/head/header";
import { Route, Routes } from "react-router-dom";
import { GET_CATEGORIES, GET_CURRENCIES } from "./apollo/queries";
import Nav from "./components/routes/nav";
import { ICategories } from "./interfaces/categories";
import ItemDescription from "./components/body/itemDescription";
import { routes } from "./components/routes/routes";

interface IState {
  categories: ICategories[];
}

class App extends React.Component<{}, IState> {
  state = {
    categories: [] as ICategories[],
  };
  componentDidMount() {
    GET_CURRENCIES().then((r) => console.log("App, currencies: ", r));
    GET_CATEGORIES().then((r) => {
      this.setState({ categories: r.data.categories });
    });
  }

  render() {
    return (
      <div>
        <Header />
        <div id="portal">
          <Routes>
            {this.state.categories.map((r: { name: string }, index) => {
              return (
                <Route
                  key={r.name}
                  path={`/${index === 0 ? "" : r.name}`}
                  element={<Nav value={`${r.name}`} />}
                />
              );
            })}
            <Route path={routes.Description} element={<ItemDescription />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
