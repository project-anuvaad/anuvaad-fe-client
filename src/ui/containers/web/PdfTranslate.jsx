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
import FetchLanguage from "../../../flux/actions/apis/fetchlanguage";
import FetchModel from "../../../flux/actions/apis/fetchmodel";


class PdfTranslate extends React.Component {
  state = {
    source: "",
    target: '',
    name: "",
    files: [],
    activeStep: 0,
    steps: ['Add', 'Edit', 'Download'],
    property:false,
    showLoader:false
  };

  componentDidMount() {
    
    const { APITransport } = this.props;
      const apiObj = new FetchLanguage();
      APITransport(apiObj);
      this.setState({showLoader:true})
      const apiModel = new FetchModel();
      APITransport(apiModel);
      this.setState({showLoader:true})
  }

  componentDidUpdate(prevProps) {
    
    if (prevProps.supportLanguage !== this.props.supportLanguage) {
      console.log(this.props.supportLanguage)
      this.setState({
        language: this.props.supportLanguage
      })
    }

    if (prevProps.langModel !== this.props.langModel) {
      console.log("value",this.props.langModel)
      this.setState({
        modelLanguage: this.props.langModel
      })
    }
  }




  handleSelectChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChange = (files) => {
    console.log(files)
    this.setState({
      files: files
    });
  }

  handleSubmit = () => {
    var model='';
    if(this.state.modelLanguage){
    this.state.modelLanguage.map((item) =>(
      item.target_language_code === this.state.target.language_code &&  item.source_language_code === this.state.source.language_code?
        model= item :''))
    const { APITransport } = this.props;
    const apiObj = new PdfTranslation(this.state.source.language_name, this.state.target.language_name, this.state.files, model);
    APITransport(apiObj);
    this.setState({showLoader:true})
    setTimeout(()=>{history.push("/viewtranslate")},12000)
    }
  }

  handleSource(modelLanguage,supportLanguage){
    var result =[];
    if(modelLanguage && supportLanguage){
    modelLanguage.map((item) => 
      supportLanguage.map((value)=>(
        item.source_language_code===value.language_code?
        result.push(value):null
      )))
    }
      var value = new Set(result);
      var source_language= [...value]
    return source_language;
  }

  handleTarget(modelLanguage,supportLanguage,sourceLanguage){
    var result =[];
    if(modelLanguage && supportLanguage){
    modelLanguage.map((item) => 
    {item.source_language_code===sourceLanguage?
      supportLanguage.map((value)=>(
        item.target_language_code===value.language_code?
        result.push(value):null
      )):''})
    }
      var value = new Set(result);
      var target_language= [...value]
    return target_language;
      
  }
 



  render() {

    const { } = this.props;
    return (
      <div>
        <Paper value={
          <div>

          <Typography value='Translate docx file from source to target language' variant="h5" gutterBottom="true" style={{ marginLeft: '12%', paddingTop: '3%',marginBottom:'3%' }} />
          <Divider style={{ marginBottom:'4%' }}/>
          <Grid container spacing={4} >
          <DropZone handleChange={this.handleChange}/>
            <Grid item xs={8} sm={8} lg={8} xl={8}>
              <Typography value='Please select source language' variant="title" gutterBottom="true" style={{ marginLeft: '22%', paddingTop: '8%' }} />
            </Grid>
            <Grid item xs={3} sm={3} lg={4} xl={4}><br/><br/>
              <Select id={"outlined-age-simple"} MenuItemValues={this.handleSource(this.state.modelLanguage,this.state.language)} handleChange={this.handleSelectChange}  value={this.state.source} name="source" style={{marginRight: '30%', marginBottom: '5%',marginTop: '4%'}} />
            </Grid>
          </Grid><br /><br />
          <Grid container spacing={2}>
            <Grid item xs={8} sm={8} lg={8} xl={8}>
              <Typography value='Please select target language' variant="title" gutterBottom="true" style={{ marginLeft: '22%', paddingTop: '3%', marginBottom: '15%' }} /><br />
            </Grid>
            <Grid item xs={3} sm={3} lg={3} xl={3}>
              <Select id={"outlined-age-simple"} MenuItemValues={this.state.source.language_code ? this.handleTarget(this.state.modelLanguage,this.state.language,this.state.source.language_code):[]} handleChange={this.handleSelectChange} value={this.state.target} name="target" style={{ minWidth: 120, marginLeft: '10%', marginTop: '30' }} />
            </Grid>
          </Grid>
           

          <Button value={"Submit"} color={'secondary'} variant={"contained"} dis={this.state.target.language_code && this.state.source.language_code && this.state.files.name ? false:true} onClick={this.handleSubmit} style={{ marginTop: '2%', width: '100%'}} />
          {/* }}  */}
        </div>} style={{ width: '50%', marginLeft: '18%', marginTop: '2%', paddingBottom: '1%', minWidth: '400px' }}
      />
    </div>

    );
  }
}

const mapStateToProps = state => ({
  user: state.login,
  apistatus: state.apistatus,
  translation: state.translation,
  supportLanguage: state.supportLanguage,
  langModel: state.langModel
});

const mapDispatchToProps = dispatch => bindActionCreators({
  APITransport,
  PdfTranslation: APITransport,
}, dispatch);


export default (connect(mapStateToProps, mapDispatchToProps)(PdfTranslate));
