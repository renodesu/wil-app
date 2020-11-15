import React, { Component } from "react";
import "./App.css";
import { Switch, Route, Link, HashRouter } from "react-router-dom";
import Home from "./components/Home";
import Campaign from "./components/Campaign";
import About from "./components/About";
import Login from "./components/Login";
import Register from "./components/Register";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./routes/PrivateRoute";
import Manage from "./components/Manage";
import AuthRoute from "./routes/AuthRoute";

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
                <Link to="/auth/manage">Manage</Link>
              </li>
            </ul>
            <div className="content">
              <Switch>
                {/* TODO: Change to normal Route when moving user details to manage site */}
                <PrivateRoute exact path="/" component={Home} /> 
                <Route exact path="/campaigns" component={Campaign} />
                <Route exact path="/about" component={About} />
                <AuthRoute exact path="/login" component={Login} />
                <PrivateRoute exact path="/auth/manage" component={Manage} />
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
