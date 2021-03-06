import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Route, Redirect, Switch } from "react-router";
import Auth from "./components/Auth";
import { Home, Welcome  } from "./pages";
import PageLoader from "./components/PageLoader.jsx";
import { history } from "./config";

const HomePage = () => <PageLoader Component={Home} />;

class AppContainer extends React.Component {
  render() {
    return (
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" exact component={Welcome} />
          <Auth
            path="/home"
            exact
            component={props => <HomePage {...props} />}
          />
          <Redirect from="*" to="/home" />
        </Switch>
      </ConnectedRouter>
    );
  }
}

export default AppContainer;
