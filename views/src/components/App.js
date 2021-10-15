import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPosts } from "../actions/posts";
import { NavBar, Home, Page404, Login, Signup, Setting } from "./";
import propTypes from "prop-types";
import jwt_decode from "jwt-decode"; // to decode the jwt token
// imports for routing
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { authenticateUser } from "../actions/auth";

//these path only accesible if the user is
const PrivateRoute = (privateProps) => {
  const { isLoggedin, path, component: Component } = privateProps;
  return (
    <Route
      path={path}
      render={(props) => {
        return isLoggedin ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    />
  );
};

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
    const token = localStorage.getItem("wikxy-token");
    if (token) {
      var user = jwt_decode(token);
      this.props.dispatch(authenticateUser(user));
    }
  }
  // setting props type to be strict
  static propTypes = {
    posts: propTypes.array.isRequired,
    auth: propTypes.object.isRequired,
  };

  render() {
    const { posts, auth } = this.props;
    return (
      <Router>
        <div>
          <NavBar />
          <Switch>
            <Route
              exact={true}
              path="/"
              render={(props) => <Home {...props} posts={posts} />}
            />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <PrivateRoute
              path="/setting"
              component={Setting}
              isLoggedin={auth.isLoggedin}
            />
            <Route component={Page404} />
          </Switch>
        </div>
      </Router>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    posts: state.posts,
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(App);
