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

class Login extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      changed: {
        username: false,
        password: false
      },
      values: {
        username: ``,
        password: ``
      }
    };

    this.loginUser = this.loginUser.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.hasValidChanges = this.hasValidChanges.bind(this);
  }

  getClassName() {
    return "loginPage";
  }

  hasValidChanges(field) {
    if (field === "username" && this.state.values[field].length > 2) {
      return true;
    }
    if (field === "password" && this.state.values[field].length > 2) {
      return true;
    }
    return false;
  }

  updateValue(field, val) {
    this.setState(
      Object.assign({}, this.state, {
        values: Object.assign({}, this.state.values, {
          [field]: val
        }),
        changed: Object.assign({}, this.state.changed, {
          [field]: true
        })
      })
    );
  }

  loginUser() {
    const { values, changed } = this.state,
      loginData = {};
    [...Object.keys(changed)].forEach(field => {
      if (this.hasValidChanges(field)) {
        loginData[field] = values[field];
      }
    });
    if (loginData.username && loginData.password) {
      this.props.handleLoginUser(loginData);
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
                  id="outlined-name"
                  label="username"
                  defaultValue=""
                  margin="normal"
                  variant="outlined"
                  error={this.props.getUserError ? true : false}
                  helperText={
                    this.props.getUserError
                      ? "Incorrect Username/Password Combo"
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
                      ? "Incorrect Password/Username Combo"
                      : ""
                  }
                  onChange={e => this.updateValue("password", e.target.value)}
                />
                <div className={`buttonWrapper`}>
                <StyledButton
                    onClick={e => {
                      e.preventDefault();
                      this.props.handleGoToRegister();
                    }}
                  >
                    Register
                  </StyledButton>
                  <StyledButton
                    onClick={e => {
                      e.preventDefault();
                      this.loginUser();
                    }}
                    disabled={
                      !this.hasValidChanges("username") ||
                      !this.hasValidChanges("password")
                        ? true
                        : false
                    }
                  >
                    {this.props.getIsUserLoading ? (
                      <i className="fas fa-spinner fa-pulse" />
                    ) : (
                      "Login"
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
  handleLoginUser: ({ username, password }) => {
    dispatch(actions.loginUser({ username, password }));
  },
  handleGoToRegister: () => {
    dispatch(push('/signup'));
  }
});

Login.propTypes = {
  getUser: PropTypes.object,
  getIsUserLoaded: PropTypes.bool.isRequired,
  getIsUserLoading: PropTypes.bool.isRequired,
  getUserError: PropTypes.string,
  handleLoginUser: PropTypes.func.isRequired,
  handleGoToRegister: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
