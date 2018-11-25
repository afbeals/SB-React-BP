import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";

class Navigation extends React.Component {
  render() {
    const { handleNavigation } = this.props;
    return (
      <AppBar>
        <Toolbar>
          <Icon
            className={"fas fa-home"}
            aria-label="go home"
            alt="home"
            onClick={() => handleNavigation("/home")}
          />
          <Typography
            variant="h5"
            color="inherit"
            aria-label="Basic Title"
            alt="Title"
          >
            Basic Title
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  handleNavigation: route => {
    dispatch(push(route));
  },
});

Navigation.propTypes = {
  handleNavigation: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);
