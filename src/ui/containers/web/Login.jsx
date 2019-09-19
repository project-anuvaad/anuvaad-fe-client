import { Typography, withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from '@material-ui/core/Grid';
// import {Link} from 'react-router';
import Link from '@material-ui/core/Link';
import Paper from "@material-ui/core/Paper";
import { MuiThemeProvider } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import LoginAPI from "../../../flux/actions/apis/login";
import APITransport from "../../../flux/actions/apitransport/apitransport";
import history from "../../../web.history";
import TextField from '../../components/web/common/TextField';
import LoginStyles from "../../styles/web/LoginStyles";
import ThemeDefault from "../../theme/web/theme-default";



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
                <Typography style={{marginTop:'3%', marginBottom:'8%', fontSize:'24px'}} >Sign In</Typography>
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

                  <FormControlLabel style={{marginTop:'2%'}}
                    control={
                      <Checkbox
                        className={classes.checkRemember.className}
                        labelclassName={classes.checkRemember.labelclassName}
                        iconclassName={classes.checkRemember.iconclassName}
                      />
                    }
                    label="Remember me"
                  />


<Grid container style={{marginBottom:'5%',marginTop:'3%'}}>
                <Grid item xs={6} sm={6} lg={6} xl={6}>
                <Link  onClick={() => {{history.push("/signup")}}}><Typography color ='primary'>Register</Typography></Link>
                  </Grid>
                  <Grid item xs={6} sm={6} lg={6} xl={6} align='end'>
                  <Link onClick={() => {{history.push("/signup")}}}><Typography color ='primary'>Forgot Password?</Typography></Link>
                  </Grid>
                  </Grid>
                  
                  
       
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
