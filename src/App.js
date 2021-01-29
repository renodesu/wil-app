import React, { Component } from "react";
import "./App.css";
import { Switch, HashRouter } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import AddPosts from "./components/AddPosts";
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
            <div className="content">
              <Switch>
                {/* TODO: Change to normal Route when moving user details to manage site */}
                <PrivateRoute exact path="/" component={Home} /> 
                <AuthRoute exact path="/login" component={Login} />
                <PrivateRoute exact path="/auth/manage" component={Manage} />
                <AuthRoute exact path="/register" component={Register} />
                <PrivateRoute exact path="/addposts" component={AddPosts} />
              </Switch>
            </div>
          </div>
        </HashRouter>
      </AuthProvider>
    );
  }
}

export default App;
