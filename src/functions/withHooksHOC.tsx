import { useReactiveVar } from "@apollo/client";
import React from "react";
import { addedItemsVar } from "../apollo/cache";

export const withHooksHOC = (Component: any, apolloVar, propName: string) => {
  return (props: any) => {
    let additionalProps = {};
    additionalProps[propName] = useReactiveVar(apolloVar);
    return <Component {...additionalProps} {...props} />;
  };
};
