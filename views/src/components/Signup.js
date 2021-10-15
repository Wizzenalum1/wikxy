import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { clearAuthState, signup, signupFailed } from "../actions/auth";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      about: null,
      email: null,
      password: null,
      confirmPassword: null,
    };
  }
  handleNameChange = (e) => {
    console.log(e.target.value);
    this.setState({ name: e.target.value });
  };
  handleAboutChange = (e) => {
    console.log(e.target.value);

    this.setState({ about: e.target.value });
  };
  handleEmailChange = (e) => {
    console.log(e.target.value);

    this.setState({ email: e.target.value });
  };
  handlePasswordChange = (e) => {
    console.log(e.target.value);

    this.setState({ password: e.target.value });
  };
  handleConfirmPasswordChange = (e) => {
    console.log(e.target.value);

    this.setState({ confirmPassword: e.target.value });
  };
  handleFormSubmit = (event) => {
    event.preventDefault();
    const dispatch = this.props.dispatch;
    const { email, password, confirmPassword, name } = this.state;
    if (password !== confirmPassword) {
      dispatch(signupFailed("password don't match"));
    }
    // TODO add some validation here. like password length alphabates etc. email validation
    if (name && email && password) {
      dispatch(signup(this.state));
    } else {
      dispatch(signupFailed("fill all the fields"));
    }
  };

  componentWillUnmount() {
    this.props.dispatch(clearAuthState());
  }

  render() {
    const { inProgress, error, isLogging } = this.props.auth;
    if (isLogging) {
      return <Redirect to="/" />;
    }
    return (
      <form className="signin-up-form">
        <h1 className="login-signup-header">signu up</h1>
        {error && <div className="alert error-dialog">{error}</div>}
        <div className="field">
          <input
            type="text"
            onChange={this.handleNameChange}
            placeholder="Name"
            required
          />
        </div>
        <div className="field">
          <textarea
            onChange={this.handleAboutChange}
            placeholder="about your self"
          ></textarea>
        </div>
        <div className="field">
          <input
            type="email"
            onChange={this.handleEmailChange}
            placeholder="Email"
            required
          />
        </div>
        <div className="field">
          <input
            type="password"
            onChange={this.handlePasswordChange}
            placeholder="password"
            required
          />
        </div>
        <div className="field">
          <input
            type="password"
            onChange={this.handleConfirmPasswordChange}
            placeholder="confirm-password"
            required
          />
        </div>
        <div className="field">
          {inProgress ? (
            <button
              onClick={this.handleFormSubmit}
              disabled={inProgress}
              type="submit"
            >
              signing up...
            </button>
          ) : (
            <button
              onClick={this.handleFormSubmit}
              disabled={inProgress}
              type="submit"
            >
              signup
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
export default connect(mapStateToProps)(Signup);
