import React from "react";
import PropTypes from "prop-types";
import { push } from "connected-react-router";
import { connect } from "react-redux";

import StyledButton from "../components/StyledButton";

class Welcome extends React.Component {
  getClassName() {
    return `welcome`;
  }
  render() {
    return (
      <div className={`${this.getClassName()}`}>
        Welcome!
        <br />
        <StyledButton onClick={()=>this.props.handleNavigation('/home')}>Go Home</StyledButton>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  
});

const mapDispatchToProps = dispatch => ({
    handleNavigation: route => {
        dispatch(push(route));
    }
});

Welcome.propTypes = {
    handleNavigation: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Welcome);