import React from 'react';
import { withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';
import DeleteOutlinedIcon from '@material-ui/icons/VerticalAlignBottom';
import ViewIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import APITransport from '../../../flux/actions/apitransport/apitransport';
import FetchTranslations from "../../../flux/actions/apis/translate";
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import history from "../../../web.history";
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import { CSVLink, CSVDownload } from "react-csv";
import Typography from '@material-ui/core/Typography';
import DeleteFile from "../../../flux/actions/apis/deletefile";
import MUIDataTable from "mui-datatables";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';



var  file="";
class ViewTranslate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            translations: [],
            apiCalled: false,
            hindi: [],
            english: [],
            hindi_score: [],
            english_score: [],
            file: {},
            corpus_type: 'single',
            hindiFile: {},
            englishFile: {},
            open:false,
            value:'',
            filename:''

        }
    }


    handleSubmit = (value,filename) => {
        file=value;
        console.log(filename);
        this.setState({open:true,
            value,filename
        });
        
                
      }
      handleClickOpen = (basename) => {
          console.log("click",basename)
        const { APITransport } = this.props;
        const apiObj = new DeleteFile(basename);
        APITransport(apiObj);
            this.setState({open: false,showLoader:true})
            const apiObj1 = new FetchTranslations();
            this.setState({showLoader:true})
        APITransport(apiObj1);
        
        return false;
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };
    
    componentDidMount() {

        const { APITransport } = this.props;
        const apiObj = new FetchTranslations();
        APITransport(apiObj);


    }

    componentDidUpdate(prevProps,nextProps) {
        
        if (prevProps.translations !== this.props.translations) {
            this.setState({ translations: this.props.translations })

        }
    }

    render() {

        const { user, classes, location } = this.props;

        const columns = [
            {
             name: "basename",
             label: "basename",
             options: {
                display: 'excluded',
             }
            },
            {
                name: "name",
                label: "Transfer Files",
                options: {
                 filter: true,
                 sort: true,
                }
               },
            {
             name: "created_on",
             label: "Timestamp",
             options: {
              filter: true,
             
              sort: true,
              sortDirection: 'desc'
             }
            },
            {
             name: "sourceLang",
             label: "Source Language",
             options: {
              filter: true,
              sort: false,
             }
            },
            {
             name: "targetLang",
             label: "Target Language",
             options: {
              filter: true,
              sort: false,
             
             }
            },
            {
                name: "status",
                label: "Status",
                options: {
                 filter: true,
                 sort: true,
                }
               },
                  {
                    name: "Action",
                    options: {
                      filter: true,
                      sort: false,
                      empty: true,
                      customBodyRender: (value, tableMeta, updateValue) => {

                                    
                              if(tableMeta.rowData){
                                return (
                                    <a>
                                    {tableMeta.rowData[5] == 'COMPLETED' ? <a href={"http://nlp-nmt-160078446.us-west-2.elb.amazonaws.com/corpus/download-docx?filename="+tableMeta.rowData[0]+'_t.docx'} target="_blank"><Tooltip title="Download"><DeleteOutlinedIcon style={{ width: "24", height: "24", marginRight:'8%',color: 'black'}} /></Tooltip></a> : ''}
                                    {tableMeta.rowData[5] == 'COMPLETED' ? <Tooltip title="View"><ViewIcon style={{ width: "24", height: "24",cursor:'pointer', marginLeft:'10%',marginRight:'8%' }} onClick={()=>{history.push('/view-doc/'+tableMeta.rowData[0])} } > </ViewIcon></Tooltip>: ''}
                                    {tableMeta.rowData[5] == 'COMPLETED' ?<Tooltip title="View"><DeleteIcon style={{ width: "24", height: "24",cursor:'pointer', marginLeft:'10%' }} onClick={(event) =>{this.handleSubmit(tableMeta.rowData[0],tableMeta.rowData[1])}}  > </DeleteIcon></Tooltip>:''}
                                    </a>
                                );}
                        
                      }
                    }
                  },
           ];
        
        
           const options = {
            filterType: 'checkbox',
            download: false,
            print: false,
            fixedHeader: true,
            filter:false
          };
        

        return (
            <div>
                    <Button variant="extendedFab" color="secondary" aria-label="Add" style={{marginLeft:'-4%', marginTop:'1%'}} onClick={() => { history.push("/pdftranslate") }}>
                        <AddIcon /> Translate
                    </Button>
 
                    <div style={{marginLeft: '-4%', marginRight: '3%', marginTop: '40px'}}>
                        <MUIDataTable title={"Documents"} data={this.state.translations} columns={columns} options={options}/>
                    </div>
                    <Dialog
          open={this.state.open}
          
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
           Delete
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Are you sure you want to delete {this.state.filename} file?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              No
            </Button>
            <Button onClick={(event) =>{this.handleClickOpen(file)}} color="primary">
              Yes
            </Button>
          </DialogActions>
        </Dialog>
            </div>

        );
    }
}

const mapStateToProps = state => ({
    user: state.login,
    apistatus: state.apistatus,
    translations: state.translations,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    APITransport,
    CreateCorpus: APITransport,
}, dispatch);


export default withRouter((connect(mapStateToProps, mapDispatchToProps)(ViewTranslate)));
