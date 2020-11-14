import React, { Component } from "react";
import "./App.css";
import { Switch, Route, Link, HashRouter } from "react-router-dom";
import Home from "./components/Home";
import Campaign from "./components/Campaign";
import About from "./components/About";
import Login from "./components/Login";
import Register from "./components/Register";
import { AuthProvider } from "./contexts/AuthContext";

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <HashRouter>
          <div>
            <h1>Recycling 6</h1>
            <ul className="header">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/campaigns">Campaigns</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
            <div className="content">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/campaigns" component={Campaign} />
                <Route exact path="/about" component={About} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
              </Switch>
            </div>
          </div>
        </HashRouter>
      </AuthProvider>
    );
  }
}

export default App;
