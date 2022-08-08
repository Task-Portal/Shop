import React from "react";
import "normalize.css";
import "./components/css/styles";
import Header from "./components/head/header";
import { Navigate, Route, Routes } from "react-router-dom";
import { GET_CATEGORIES, GET_CURRENCIES } from "./apollo/queries";
import Nav from "./components/routes/nav";
import NotFound from "./components/routes/notFound";
import { ICategories } from "./interfaces/categories";

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
        <Routes>
          {this.state.categories.map((r: { name: string }) => {
            return (
              <Route
                key={r.name}
                path={`/${r.name}`}
                element={<Nav value={`${r.name}`} />}
              />
            );
          })}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    );
  }
}

export default App;
