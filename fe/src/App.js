import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Box from "./components/game/Box";
import Game from "./components/admin/Game";
import NotFound from "./components/notfound/NotFound";

export class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact>
            <Box />
          </Route>
          <Route path="/playgame">
            <Game />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
