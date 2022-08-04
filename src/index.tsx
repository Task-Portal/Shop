import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./components/css/index.scss";
import App from "./App";
import Nav from "./components/routes/nav";
import NotFound from "./components/routes/notFound";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import { cache } from "./apollo/cache";

export const typeDefs = gql`
  extend type Query {
    selectedCurrency: String!
  }
`;

export const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: cache,
  typeDefs,
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="women" element={<Nav value="women" />} />
            <Route path="men" element={<Nav value="men" />} />
            <Route path="kids" element={<Nav value="kids" />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);
