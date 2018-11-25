import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { push } from "connected-react-router";
//Local
import * as selectors from "../modules/user/selectors";
import { actions } from "../modules/user/";
import StyledButton from "../components/StyledButton";

class Signup extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      changed: {
        username: false,
        password: false,
        first_name: false,
        last_name: false,
        email: false
      },
      values: {
        username: ``,
        password: ``,
        first_name: ``,
        last_name: ``,
        email: ``
      }
    };

    this.registerUser = this.registerUser.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.hasValidChanges = this.hasValidChanges.bind(this);
  }

  getClassName() {
    return "signupPage";
  }

  hasValidChanges(field) {
    if (field === "username" && this.state.values[field].length > 2) {
      return true;
    }
    if (field === "password" && this.state.values[field].length > 2) {
      return true;
    }
    if (field === "first_name" && this.state.values[field].length > 2) {
      return true;
    }
    if (field === "last_name" && this.state.values[field].length > 2) {
      return true;
    }
    if (field === "email" && this.state.values[field].length > 2) {
      return true;
    }
    return false;
  }

  updateValue(field, val) {
    this.setState(
      {
        ...this.state, 
        values: {
          ...this.state.values, 
          [field]: val
        },
        changed:{
          ...this.state.changed, 
          [field]: true
        }
      }
    );
  }

  registerUser() {
    const { values, changed } = this.state,
      loginData = {};
    [...Object.keys(changed)].forEach(field => {
      if (this.hasValidChanges(field)) {
        loginData[field] = values[field];
      }
    });
    if (loginData.username && loginData.password && loginData.first_name && loginData.last_name && loginData.email) {
      this.props.handleRegisterUser(loginData);
    }
  }

  render() {
    return (
      <div className={`${this.getClassName()}`}>
        <Card className={`${this.getClassName()}__card`}>
          <CardContent>
            <Typography
              variant={`h6`}
              className={`${this.getClassName()}__card__title`}
            >
              Welcome To Your Awesome Ledger
            </Typography>
            <div className={`${this.getClassName()}__card__form `}>
              <form noValidate autoComplete="off">
                <TextField
                  required
                  id="outlined-suername"
                  label="Username"
                  defaultValue=""
                  margin="normal"
                  variant="outlined"
                  error={this.props.getUserError ? true : false}
                  helperText={
                    this.props.getUserError
                      ? "Error registering username"
                      : ""
                  }
                  onChange={e => this.updateValue("username", e.target.value)}
                />
                <TextField
                  required
                  id="outlined-password-input"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  margin="normal"
                  variant="outlined"
                  error={this.props.getUserError ? true : false}
                  helperText={
                    this.props.getUserError
                      ? "Error registering with password"
                      : ""
                  }
                  onChange={e => this.updateValue("password", e.target.value)}
                />


                <TextField
                  required
                  id="outlined-firstname"
                  label="First Name"
                  defaultValue=""
                  margin="normal"
                  variant="outlined"
                  error={this.props.getUserError ? true : false}
                  helperText={
                    this.props.getUserError
                      ? "Error registering first name"
                      : ""
                  }
                  onChange={e => this.updateValue("first_name", e.target.value)}
                />
                <TextField
                  required
                  id="outlined-lastname"
                  label="Last name"
                  defaultValue=""
                  margin="normal"
                  variant="outlined"
                  error={this.props.getUserError ? true : false}
                  helperText={
                    this.props.getUserError
                      ? "Error registering last name"
                      : ""
                  }
                  onChange={e => this.updateValue("last_name", e.target.value)}
                />
                <TextField
                  required
                  id="outlined-email"
                  label="email"
                  defaultValue=""
                  type="email"
                  margin="normal"
                  variant="outlined"
                  error={this.props.getUserError ? true : false}
                  helperText={
                    this.props.getUserError
                      ? "Error registering with email"
                      : ""
                  }
                  onChange={e => this.updateValue("email", e.target.value)}
                />

                <div className={`buttonWrapper`}>
                  <StyledButton
                    onClick={e => {
                      e.preventDefault();
                      this.props.handleGoToLogin();
                    }}
                  >
                    Login
                  </StyledButton>
                  <StyledButton
                    onClick={e => {
                      e.preventDefault();
                      this.registerUser();
                    }}
                    disabled={
                      !this.hasValidChanges("username") ||
                        !this.hasValidChanges("password") ||
                        !this.hasValidChanges("first_name") ||
                        !this.hasValidChanges("last_name") ||
                        !this.hasValidChanges("email")
                        ? true
                        : false
                    }
                  >
                    {this.props.getIsUserLoading ? (
                      <i className="fas fa-spinner fa-pulse" />
                    ) : (
                        "Register"
                      )}
                  </StyledButton>

                </div>

              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  getUser: selectors.getUser(state),
  getIsUserLoaded: selectors.getIsUserLoaded(state),
  getIsUserLoading: selectors.getIsUserLoading(state),
  getUserError: selectors.getUserError(state),
  getState: state
});

const mapDispatchToProps = dispatch => ({
  handleRegisterUser: (data) => {
    dispatch(actions.registerUserRequest(data));
  },
  handleGoToLogin: () => {
    dispatch(push('/'));
  }
});

Signup.propTypes = {
  getUser: PropTypes.object,
  getIsUserLoaded: PropTypes.bool.isRequired,
  getIsUserLoading: PropTypes.bool.isRequired,
  getUserError: PropTypes.string,
  handleRegisterUser: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
