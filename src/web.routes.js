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
import UserDirectory from "./ui/containers/web/UserDirectory";
import ViewDoc from "./ui/containers/web/ViewDoc";
const PrivateRoute = ({ component: Component, userRoles, authenticate, ...rest }) => (
  <Route {...rest} render={props => (authenticate(userRoles) ? <Layout component={Component} {...props} /> :  <Redirect to={`${process.env.PUBLIC_URL}/logout`} />)} />
);

class AppRoutes extends React.Component {
  authenticateUser = (allowedRoles) => {
    let count = 0;
    const token = localStorage.getItem("token");
    if(localStorage.getItem("roles")){
    const userRoles = JSON.parse(localStorage.getItem("roles"))
    if (token) {
      if (allowedRoles && Array.isArray(allowedRoles)) {
        allowedRoles.map((allowedRole) => {
          userRoles.map((userRole) => {
            if (userRole == allowedRole) {
              count = count + 1
            }
          })
        })
        if (count > 0) {
          return true;
        }
      }
      else {
        return true;
      }
    }
    return false;
  }else{
    alert('Something Went wrong. Please try again')
  }
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
            <PrivateRoute path="/userdirectory" component={UserDirectory} userRoles={['admin']} authenticate={this.authenticateUser} />
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
