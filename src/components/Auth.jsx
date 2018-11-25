import React from "react";
import { Route, Redirect } from "react-router";
//import PropTypes from "prop-types";
import { connect } from "react-redux";

const Auth = ({ component: Component, authenticator = true, ...rest }) => {
  if (authenticator) { //define auth method
    return <Route {...rest} component={Component} />;
  }
  return <Redirect to="/" />;
};

const mapStateToProps = state => ({
  
});

const mapDispatchToProps = dispatch => ({});

Auth.propTypes = {
  
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
