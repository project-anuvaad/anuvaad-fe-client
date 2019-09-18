import React from "react";
import { Route, Redirect, Switch, Router } from "react-router-dom";

import { connect } from "react-redux";
import Home from "./ui/containers/web/Home";
import Callback from "./ui/containers/web/Callback";
import SignUp from "./ui/containers/web/SignUp";
import Logout from "./ui/containers/web/Logout";
import Layout from "./ui/containers/web/Layout";

import NotFound from "./ui/containers/web/NotFound";
import UserProfile from "./ui/containers/web/UserProfile";
import history from "./web.history";
import Translate from "./ui/containers/web/PdfTranslate";
import EditTranslate from "./ui/containers/web/EditTranslate";
import ViewTranslate from "./ui/containers/web/ViewTranslate";
import ViewDoc from "./ui/containers/web/ViewDoc";
const PrivateRoute = ({ component: Component, authenticate, ...rest }) => (
  <Route {...rest} render={props => (authenticate() ? <Layout component={Component} {...props} /> : <Redirect to={{ pathname: "/" }} />)} />
);

class AppRoutes extends React.Component {
  authenticateUser = () => {
    const token = localStorage.getItem("token");
    if (token) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <Router history={history}>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/callback" component={Callback} />
            <Route exact path="/logout" component={Logout} />
            <PrivateRoute path='/profile' title="Profile" component={UserProfile} authenticate={this.authenticateUser} />
            <PrivateRoute path="/pdftranslate" component={Translate} authenticate={this.authenticateUser} />
            <PrivateRoute path="/edittranslate" component={EditTranslate} authenticate={this.authenticateUser} />
            <PrivateRoute path="/viewtranslate" component={ViewTranslate} authenticate={this.authenticateUser} />
            <PrivateRoute path="/view-doc/:basename" component={ViewDoc} authenticate={this.authenticateUser} />
            <Route path="/signup" component={SignUp} />
            <PrivateRoute path="/*" component={NotFound} authenticate={this.authenticateUser} />
          </Switch>
        </div>
      </Router>
    );
  }
}


const mapStateToProps = state => ({
  user: state.login,
  apistatus: state.apistatus
});

export default connect(
  mapStateToProps,
  null
)(AppRoutes);
