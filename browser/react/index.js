import React from "react";
import ReactDOM from "react-dom";
import Main from "./containers/Main";
import Albums from "./components/Albums";
import SingleAlbum from "./components/SingleAlbum";

import { BrowserRouter, Route, Switch } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Route path="/" component={Main} />
    )} />
  </BrowserRouter>,
  document.getElementById("app")
);
