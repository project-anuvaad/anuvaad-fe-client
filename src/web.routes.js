import React from "react";
import { Route, Redirect, Switch, Router } from "react-router-dom";

import { connect } from "react-redux";
import Login from "./ui/containers/web/Login";
import SignUp from "./ui/containers/web/SignUp";
import Layout from "./ui/containers/web/Layout";

import NotFound from "./ui/containers/web/NotFound";

import history from "./web.history";
import Translate from "./ui/containers/web/PdfTranslate";
import EditTranslate from "./ui/containers/web/EditTranslate";
import ViewTranslate from "./ui/containers/web/ViewTranslate";
const PrivateRoute = ({ component: Component, authenticate, ...rest }) => (
  <Route {...rest} render={props => (authenticate ? <Layout component={Component} {...props} /> : <Redirect to={{ pathname: "/" }} />)} />
);

class AppRoutes extends React.Component {
  authenticateUser = () => 
    // const { user } = this.props;
    // const token = localStorage.getItem("token");
    // if (user.token || token) {
       true
    // }
    // return false;
  ;

  render() {
    return (
      <Router history={history}>
        <div>
          <Switch>
            <Route exact path="/" component={Login} />
            <PrivateRoute path="/pdftranslate" component={Translate} authenticate={this.authenticateUser()} />
            <PrivateRoute path="/edittranslate" component={EditTranslate} authenticate={this.authenticateUser()} />
            <PrivateRoute path="/viewtranslate" component={ViewTranslate} authenticate={this.authenticateUser()} />
            <PrivateRoute path="/signup" component={SignUp} authenticate={this.authenticateUser()} />

            <PrivateRoute path="/*" component={NotFound} authenticate={this.authenticateUser()} />
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
