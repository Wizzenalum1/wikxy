import React, { Component } from "react";
import PropTypes from "prop-types";

class Setting extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  };

  render() {
    return <div>Setting</div>;
  }
}

export default Setting;
