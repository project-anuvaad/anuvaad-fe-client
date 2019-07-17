import React from 'react';
import { withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Stepper from '../../components/web/common/Stepper';
import APITransport from '../../../flux/actions/apitransport/apitransport';
import Button from "../../components/web/common/Button";
import Paper from '../../components/web/common/Paper';
import CircularProgress from '../../components/web/common/Loader';

import Typography from '../../components/web/common/Typography';
import TextField from '../../components/web/common/TextField';
import Select from '../../components/web/common/Select';
import DropZone from '../../components/web/common/DropZone';
import history from "../../../web.history";
import PdfTranslation from "../../../flux/actions/apis/translation";



class PdfTranslate extends React.Component {
  state = {
    sourceLanguage: "",
    targetLanguage: '',
    name: "",
    files: [],
    activeStep: 0,
    steps: ['Add', 'Edit', 'Download']
  };


  handleSelectChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChange = (event) => {
    // console.log(acceptedFiles.getAsBinary())
    this.setState({
      files: event.target.files[0]
    });
  }
  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleSubmit = () => {
    const { APITransport } = this.props;
    const apiObj = new PdfTranslation(this.state.sourceLanguage, this.state.targetLanguage, this.state.files);
    APITransport(apiObj);
    history.push("/viewtranslate")
  }




  render() {

    const { } = this.props;
    return (
      <div>
        <Paper value={
          <div>

            <Typography value='Translate PDF in 3 Steps' variant="title" gutterBottom="true" style={{ marginLeft: '28%', paddingTop: '5%' }} />
            <Stepper steps={this.state.steps} activeStep={this.state.activeStep} alternativeLabel={true} style={{ paddingTop: '8%', width: '80%', marginLeft: '5%' }} />
            {/* <CircularProgress color='secondary'/> */}

            {/* <TextField value={"First Name"} id="outlined-required"
              margin="normal" varient="outlined"
              />  */}
            <Grid container spacing={4} >
              <Grid item xs={7} sm={7} lg={7} xl={7}>
                <Typography value='Source Language' variant="title" gutterBottom="true" style={{ marginLeft: '30%', paddingTop: '5%' }} />
              </Grid>
              <Grid item xs={3} sm={3} lg={3} xl={3}>
                <Select id={"outlined-age-simple"} MenuItemValues={['English']} handleChange={this.handleSelectChange} value={this.state.sourceLanguage} name="sourceLanguage" style={{ minWidth: '120', marginRight: '50%', marginLeft: '30%', marginBottom: '5%' }} />
              </Grid>
            </Grid><br /><br />
            <Grid container spacing={2}>
              <Grid item xs={7} sm={7} lg={7} xl={7}>
                <Typography value='Target Language' variant="title" gutterBottom="true" style={{ marginLeft: '30%', paddingTop: '5%', marginBottom: '15%' }} /><br />
              </Grid>
              <Grid item xs={3} sm={3} lg={3} xl={3}>
                <Select id={"outlined-age-simple"} MenuItemValues={['Hindi']} handleChange={this.handleSelectChange} value={this.state.targetLanguage} name="targetLanguage" style={{ minWidth: 120, marginLeft: '30%', marginTop: '30' }} />
              </Grid>
            </Grid>
            <DropZone handleChange={this.handleChange} />

            <Button value={"Submit"} color={'secondary'} variant={"contained"} onClick={this.handleSubmit} style={{ marginTop: '5%', width: '100%', marginTop: '5%' }} />
            {/* }}  */}
          </div>} style={{ width: '35%', marginLeft: '29%', marginTop: '2%', paddingBottom: '1%', minWidth: '400px' }}
        />
      </div>

    );
  }
}

const mapStateToProps = state => ({
  user: state.login,
  apistatus: state.apistatus,
  translate: state.translate
});

const mapDispatchToProps = dispatch => bindActionCreators({
  APITransport,
  PdfTranslation: APITransport,
}, dispatch);


export default (connect(mapStateToProps, mapDispatchToProps)(PdfTranslate));
