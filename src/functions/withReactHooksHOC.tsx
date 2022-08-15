import React from "react";

export const withReactHooksHOC = (
  Component: any,
  useHook,
  propName: string
) => {
  return (props: any) => {
    let additionalProps = {};
    additionalProps[propName] = useHook();
    return <Component {...additionalProps} {...props} />;
  };
};
