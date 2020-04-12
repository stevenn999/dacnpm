import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Player from "./components/player/Player";
import Game from "./components/host/Game";
import NotFound from "./components/notfound/NotFound";
import Login from "./components/accounts/Login";
import Register from "./components/accounts/Register";

export class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact>
            <Player />
          </Route>
          <Route path="/playgame" exact>
            <Game />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/register" exact>
            <Register />
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
