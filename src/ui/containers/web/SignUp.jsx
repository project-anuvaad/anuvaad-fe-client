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

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withStyles, Typography } from "@material-ui/core";
import ThemeDefault from "../../theme/web/theme-default";

import LoginStyles from "../../styles/web/LoginStyles";
import Grid from '@material-ui/core/Grid';
import LoginAPI from "../../../flux/actions/apis/login";
import APITransport from "../../../flux/actions/apitransport/apitransport";
import history from "../../../web.history";
import TextField from '../../components/web/common/TextField';
import Link from '@material-ui/core/Link';

import ButtonV from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

import Signup from "../../../flux/actions/apis/signup";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      firstname:'',
      lastname:'',
      email:'',
      password:'',
      checkedA: false,
      email1: '',
    }
   
  }

  componentDidMount() {
    localStorage.removeItem("token");
  }


  
  handleTextChange(key, event) {
    console.log(event.target.value)
    this.setState({
        [key]: event.target.value
    })
}

handleSubmit = () => {
  const { APITransport } = this.props;
  const apiObj = new Signup(this.state.firstname, this.state.lastname, this.state.email, this.state.password);
  APITransport(apiObj);
  this.setState({showLoader:true})
  setTimeout(()=>{history.push("/")},2000)
  
}

handleChangemail = (event) => {
  const email = event.target.value;
  this.setState({ email });
}

handleChange = name => event => {
  console.log(this.state.checkedA)
  this.setState({ [name]: event.target.checked });
};

  /**
   * user input handlers
   * captures text provided in email and password fields
   */


  render() {
    const { user, classes, location } = this.props;
    return (
      <MuiThemeProvider theme={ThemeDefault}>
        <div>
          <div className={classes.signUpContainer}>
            <Paper className={classes.paperSign}>
              <form method="post">
              <Typography style={{marginTop:'3%', marginBottom:'8%', fontSize:'24px'}}>Create New Account</Typography>
                <FormControl fullWidth>
                <TextField value={'first Name*'} id="outlined-required" onChange={(event) => {this.handleTextChange('firstname', event)}}
              margin="normal" varient="outlined" style={{width:'100%', marginBottom:'4%'}}
              />
                  
                </FormControl>
                <FormControl fullWidth>
                <TextField value={"Last Name*"} id="outlined-required" onChange={(event) => {this.handleTextChange('lastname', event)}}
              margin="normal" varient="outlined" style={{width:'100%', marginBottom:'4%'}}
              />
                  
                </FormControl>
                <FormControl fullWidth>
                <TextField value={"mail1*"} id="outlined-required" onChange={(event) => {this.handleTextChange('email1', event)}}
              margin="normal" varient="outlined" style={{width:'100%', marginBottom:'4%'}}
              />
                  
                </FormControl>
                <FormControl fullWidth>
                <TextField value={"password*"} id="outlined-required" type="password" onChange={(event) => {this.handleTextChange('password', event)}}
              margin="normal" varient="outlined"  style={{width:'100%', marginBottom:'4%'}}
              />                </FormControl>
                <div>
                  

                <FormControlLabel
                    control={
                      <Checkbox
                        className={classes.checkRemember.className}
                        labelclassName={classes.checkRemember.labelclassName}
                        iconclassName={classes.checkRemember.iconclassName}

                        checked={this.state.checkedA}
                        onChange={this.handleChange('checkedA')}
                        value="checkedA"
                      />
                    }
                    label="I have read the Terms and Conditions"
                  />
                  <Button variant="contained" disabled={this.state.firstname && this.state.lastname && this.state.email && this.state.password && this.state.checkedA ? false : true} onClick={this.handleSubmit} color="secondary" aria-label="edit" style={{width:'100%', marginBottom:'4%', marginTop:'4%'}}>
                    Sign Up Now
                  </Button>


                  {/* <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
                onError={errors => console.log(errors)}
            >
                <TextValidator
                    label="Email"
                    onChange={this.handleChangemail}
                    name="email"
                    value={this.state.email}
                    validators={['isEmail']}
                    errorMessages={[ 'email is not valid']}
                />
                <ButtonV type="submit">Submit</ButtonV>
            </ValidatorForm> */}

                  <Grid container spacing={24} style={{marginTop:'2%',marginBottom:'4%'}}>
                <Grid item xs={5} sm={5} lg={5} xl={5}>
                  <Typography >Have an Account ?</Typography>
                  </Grid>
                  <Grid item xs={5} sm={5} lg={5} xl={5} align="start">
                  <Link onClick={() => {{history.push("/")}}}><Typography  color ='primary'>SignIn</Typography></Link>
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


const mapStateToProps = state => ({
  user: state.login,
  signup: state.signup
});

const mapDispatchToProps = dispatch => bindActionCreators({
  APITransport,
  PdfTranslation: APITransport,
}, dispatch);

export default withRouter(
  withStyles(LoginStyles)(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(SignUp)
  )
);
