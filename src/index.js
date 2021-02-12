import { StrictMode } from "react";
import ReactDOM from "react-dom";

import Timer from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Timer />
  </StrictMode>,
  rootElement
);
