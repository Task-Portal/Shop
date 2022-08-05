import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./components/css/components/index.scss";
import App from "./App";
import Nav from "./components/routes/nav";
import NotFound from "./components/routes/notFound";
import { ApolloClient, ApolloProvider, gql } from "@apollo/client";
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
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);
