import React, { Component } from "react";
import { clearAuthState, login } from "../actions/auth";
import { connect } from "react-redux";
import { Redirect } from "react-router";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }
  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };
  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };
  handleFormSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    if (email && password) {
      const dispatch = this.props.dispatch;
      dispatch(login(email, password));
    }
  };

  componentWillUnmount() {
    this.props.dispatch(clearAuthState());
  }

  render() {
    const { error, inProgress, isLogging } = this.props.auth;
    // redirecting if logged in
    if (isLogging) {
      return <Redirect to="/" />;
    }
    return (
      <form className="signin-up-form">
        <h1 className="login-signup-header">Log In</h1>
        {error && <div className="alert error-dialog">{error}</div>}
        <div className="field">
          <input
            type="email"
            placeholder="Email"
            required
            onChange={this.handleEmailChange}
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="password"
            required
            onChange={this.handlePasswordChange}
          />
        </div>
        <div className="field">
          {inProgress ? (
            <button
              onClick={this.handleFormSubmit}
              disabled={inProgress}
              type="submit"
            >
              loging in...
            </button>
          ) : (
            <button
              onClick={this.handleFormSubmit}
              disabled={inProgress}
              type="submit"
            >
              login
            </button>
          )}
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Login);
