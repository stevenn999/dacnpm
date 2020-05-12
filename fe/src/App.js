import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Player from "./components/player/Player";
import Game from "./components/host/Game";
import NotFound from "./components/notfound/NotFound";
import Login from "./components/accounts/Login";
import Register from "./components/accounts/Register";
import Home from "./components/home/Home"
import CreateQuiz from "./components/create_quiz/CreateQuiz"
import OptionPlay from "./components/option_play/OptionPlay"


export class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact>
            <Player />
          </Route>
          <Route path="/home" exact>
            <Home />
          </Route>
          <Route path="/create" exact>
            <CreateQuiz />
          </Route>
          <Route path="/play_game" exact>
            <Game />
          </Route>
          <Route path="/option_play" exact>
            <OptionPlay />
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
