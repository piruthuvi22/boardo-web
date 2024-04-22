// import React = require("react");
// export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
// declare const src: string;
// export default src;

declare module "*.svg" {
  import * as React from "react";

  const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  export default ReactComponent;
}
