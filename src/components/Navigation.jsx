import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import ToolTip from "./ToolTip.jsx";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";

import {actions as userActions} from "../modules/user/";

class Navigation extends React.Component {
  render() {
    const { handleNavigation, handleLogoutUser } = this.props;
    return (
      <AppBar>
        <Toolbar>
          <ToolTip displayWhen={true} tip={`Home`}>
            <Icon
              className={"fas fa-home"}
              aria-label="go home"
              alt="home"
              onClick={() => handleNavigation("/home")}
            />
          </ToolTip>
          <Typography
            variant="h5"
            color="inherit"
            aria-label="Your Awesome Ledger"
            alt="Ledger"
          >
            Your Awesome Ledger
          </Typography>
          <div className={`userActions`}>
            <ToolTip displayWhen={true} tip={`Logout`}>
              <Icon
                className={"fas fa-sign-out-alt"}
                aria-label="Logout"
                alt="logout"
                onClick={() => handleLogoutUser()}
              />
            </ToolTip>
          </div>
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
  handleLogoutUser: () => {
    dispatch(userActions.logoutUserRequest());
  }
});

Navigation.propTypes = {
  handleNavigation: PropTypes.func.isRequired,
  handleLogoutUser: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);
