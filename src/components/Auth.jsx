import React from "react";
import { Route, Redirect } from "react-router";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as UserSelectors from "../modules/user/selectors";

const Auth = ({ component: Component, getUser, ...rest }) => {
  if (getUser) {
    return <Route {...rest} component={Component} />;
  }
  return <Redirect to="/" />;
};

const mapStateToProps = state => ({
  getUser: UserSelectors.getUser(state)
});

const mapDispatchToProps = dispatch => ({});

Auth.propTypes = {
  getUser: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
