import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import logo from "../images/logo.png";
import dumy_user from "../images/dumy_user.png";
import { logOut } from "../actions/auth";

class NavBar extends Component {
  handlelogOut = () => {
    localStorage.removeItem("wikxy-token");
    this.props.dispatch(logOut());
  };
  render() {
    const { user, isLoggedin } = this.props.auth;
    return (
      <nav className="nav">
        {/* company logo that move to home  */}
        <div className="left-div">
          <Link to="/">
            <img src={logo} alt="WIZZY" />
          </Link>
        </div>
        {/* search box  */}
        <div className="search-container">
          {/* serch image and input  */}
          <div>
            <svg
              focusable="false"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
            </svg>
            <input type="text" placeholder="Search" />
          </div>
          {/* search items */}
          <ul style={{ display: "none" }} className="search-results">
            <li className="search-results-row">
              <img src={user.avatar} alt="user-dp" />
              <span>ghansyam</span>
            </li>
            <li className="search-results-row">
              <img src={user.avatar} alt="user-dp" />
              <span>ghansyam</span>
            </li>
          </ul>
        </div>
        {/* user login option and control */}
        <div className="right-nav">
          {isLoggedin && (
            <div className="user">
              <Link to="/setting">
                {user.avatar ? (
                  <img src={user.avatar} alt="user-dp" id="user-dp" />
                ) : (
                  <img src={dumy_user} alt="user-dp" id="user-dp" />
                )}
              </Link>

              <span> {user.name}</span>
            </div>
          )}
          <ul className="nav-links">
            {isLoggedin && <li onClick={this.handlelogOut}>Log out</li>}
            {!isLoggedin && (
              <li>
                <Link to="/login">Log in</Link>
              </li>
            )}
            {!isLoggedin && (
              <li>
                <Link to="/signup">Register</Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth,
  };
};
export default connect(mapStateToProps)(NavBar);
