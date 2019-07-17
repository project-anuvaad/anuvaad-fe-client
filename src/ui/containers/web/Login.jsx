import React from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
// import {Link} from 'react-router';
import Link from '@material-ui/core/Link';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withStyles, Typography } from "@material-ui/core";
import ThemeDefault from "../../theme/web/theme-default";

import LoginStyles from "../../styles/web/LoginStyles";

import LoginAPI from "../../../flux/actions/apis/login";
import APITransport from "../../../flux/actions/apitransport/apitransport";
import history from "../../../web.history";
import TextField from '../../components/web/common/TextField';
import SignUp from './SignUp';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  componentDidMount() {
    localStorage.removeItem("token");
  }

  /**
   * user input handlers
   * captures text provided in email and password fields
   */

  processInputReceived = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  /**
   * user input handlers
   * captures form submit request
   */
  processLoginButtonPressed = () => {
    const { email, password } = this.state;
    const { APITransporter } = this.props;
    
    const apiObj = new LoginAPI(email, password);
    if((email == 'aroop' || email =='ajitesh' || email == 'kd' || email =='vivek' )&& password =='test')
    {
      console.log("sajish",this.state.email,password);
      localStorage.setItem('token','123')
      setTimeout(()=>{history.push("/viewtranslate")}, 1000);
    }
    else{
      alert('Wrong credentials')
    }
    // APITransporter(apiObj);
  };

  render() {
    const { user, classes, location } = this.props;
    return (
      <MuiThemeProvider theme={ThemeDefault}>
        <div>
          <div className={classes.loginContainer}>
            <Paper className={classes.paper}>
              <form method="post">
                <Typography style={{marginTop:'3%', marginBottom:'8%'}}>Sign In</Typography>
                <FormControl fullWidth>
                <TextField value={"UserName"} id="outlined-required"
              margin="normal" varient="outlined" onChange={this.processInputReceived("email")} style={{width:'100%', marginBottom:'4%'}}
              />
                  
                </FormControl>
                <FormControl fullWidth>
                <TextField value={"Password"} id="outlined-required" type="password"
              margin="normal" varient="outlined" onChange={this.processInputReceived("password")} style={{width:'100%', marginBottom:'4%'}}
              />                </FormControl>
                <div>
                  

                  {/* <Link to="/"> */}
                  <Button variant="contained" onClick={this.processLoginButtonPressed} color="secondary" aria-label="edit" style={{width:'100%', marginBottom:'4%', marginTop:'4%'}}>
                    Login
                  </Button>

                  <FormControlLabel
                    control={
                      <Checkbox
                        className={classes.checkRemember.className}
                        labelclassName={classes.checkRemember.labelclassName}
                        iconclassName={classes.checkRemember.iconclassName}
                      />
                    }
                    label="Remember me"
                  />
                  <Link onClick={() => {{history.push("/signup")}}}>Register</Link>
       
                  {/* </Link> */}
                </div>
              </form>
            </Paper>

           
            <div className={classes.buttonsDiv} />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

Login.propTypes = {
  user: PropTypes.object.isRequired,
  APITransporter: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.login
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      APITransporter: APITransport
    },
    dispatch
  );

export default withRouter(
  withStyles(LoginStyles)(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Login)
  )
);
