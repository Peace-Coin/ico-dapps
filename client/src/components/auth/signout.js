import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/index";
import Signin from './signin';

class Signout extends Component {
  componentWillMount() {
    this.props.signoutUser();
  }

  render() {
    return <Signin />;
  }
}

export default connect(null, actions)(Signout);
