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
import Divider from '@material-ui/core/Divider';
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
    steps: ['Add', 'Edit', 'Download'],
    property:false,
    showLoader:false
  };


  handleSelectChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChange = (files) => {
    console.log(files)
    this.setState({
      files: files
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
    this.setState({showLoader:true})
    setTimeout(()=>{history.push("/viewtranslate")},2000)
    
  }




  render() {

    const { } = this.props;
    return (
      <div>
        {this.state.showLoader ? <CircularProgress /> : 
        <Paper value={
          <div>

          <Typography value='Translate docx file from source to target language' variant="h5" gutterBottom="true" style={{ marginLeft: '12%', paddingTop: '3%',marginBottom:'3%' }} />
          <Divider style={{ marginBottom:'4%' }}/>
          {/* <Stepper steps={this.state.steps} activeStep={this.state.activeStep} alternativeLabel={true} style={{ paddingTop: '8%', width: '80%', marginLeft: '5%' }} />
          <CircularProgress color='secondary'/> */}

          {/* <TextField value={"First Name"} id="outlined-required"
            margin="normal" varient="outlined"
            />  */}
          <Grid container spacing={4} >

          {/* <Grid container spacing={2}>
            <Grid item xs={8} sm={8} lg={8} xl={8}>
              <Typography value='Please select Source File(.docx)' variant="title" gutterBottom="true" style={{ marginLeft: '22%', paddingTop: '0%',marginTop:'10%',marginBottom:'10%' }} />
            </Grid>
            <Grid item xs={4} sm={4} lg={4} xl={4}> */}
          <DropZone handleChange={this.handleChange}/>
          {/* </Grid>
          </Grid> */}
            <Grid item xs={8} sm={8} lg={8} xl={8}>
              <Typography value='Please select source language' variant="title" gutterBottom="true" style={{ marginLeft: '22%', paddingTop: '8%' }} />
            </Grid>
            <Grid item xs={3} sm={3} lg={4} xl={4}><br/><br/>
              <Select id={"outlined-age-simple"} MenuItemValues={['English']} handleChange={this.handleSelectChange} value={this.state.sourceLanguage} name="sourceLanguage" style={{marginRight: '30%', marginBottom: '5%',marginTop: '4%'}} />
            </Grid>
          </Grid><br /><br />
          <Grid container spacing={2}>
            <Grid item xs={8} sm={8} lg={8} xl={8}>
              <Typography value='Please select target language' variant="title" gutterBottom="true" style={{ marginLeft: '22%', paddingTop: '3%', marginBottom: '15%' }} /><br />
            </Grid>
            <Grid item xs={3} sm={3} lg={3} xl={3}>
              <Select id={"outlined-age-simple"} MenuItemValues={['Hindi']} handleChange={this.handleSelectChange} value={this.state.targetLanguage} name="targetLanguage" style={{ minWidth: 120, marginLeft: '10%', marginTop: '30' }} />
            </Grid>
          </Grid>
           

          <Button value={"Submit"} color={'secondary'} variant={"contained"} dis={this.state.targetLanguage && this.state.sourceLanguage && this.state.files.name ? false:true} onClick={this.handleSubmit} style={{ marginTop: '2%', width: '100%'}} />
          {/* }}  */}
        </div>} style={{ width: '50%', marginLeft: '18%', marginTop: '2%', paddingBottom: '1%', minWidth: '400px' }}
      />
          }
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
