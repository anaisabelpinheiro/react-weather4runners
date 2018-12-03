import React from "react";
import ReactDom from "react-dom";
import App from "./App";

ReactDom.render(<App />, document.querySelector("#vizela"));
ReactDom.render(<App city="Porto" />, document.querySelector("#porto"));
ReactDom.render(<App city="Lisboa" />, document.querySelector("#lisboa"));

