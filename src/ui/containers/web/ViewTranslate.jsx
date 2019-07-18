import React from 'react';
import { withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';
import DeleteOutlinedIcon from '@material-ui/icons/VerticalAlignBottom';
import ViewIcon from '@material-ui/icons/ArrowRightAltOutlined';

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
import { withStyles } from '@material-ui/core/styles';
import { CSVLink, CSVDownload } from "react-csv";
import Typography from '@material-ui/core/Typography';


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
            englishFile: {}
        }
    }

    componentDidMount() {

        const { APITransport } = this.props;
        const apiObj = new FetchTranslations();
        APITransport(apiObj);


    }

    componentDidUpdate(prevProps,nextProps) {
        if (prevProps.translations !== this.props.translations) {
            console.log(prevProps.translations)
            this.setState({ translations: this.props.translations })

        }
    }

    handleDownload = () => {
        console.log('clicked')
        let sentences = this.state.sentences
        let downloadDataHeader = ['Hindi', 'English']
        let downloadData = []
        downloadData.push(downloadDataHeader)

        this.setState({
            downloadData: downloadData,
            download: true,
        })
    }

    render() {

        const { user, classes, location } = this.props;

        return (


            <Grid container spacing={24} style={{ paddingTop: '2.5%', marginLeft: '-3%' }}>

                <Grid
                    container
                    direction="row"
                    justify="flex-end"
                    alignItems="right"

                >

                    <Grid item xs={10} sm={10} lg={10} xl={10} style={{ paddingLeft: '.8%', marginBottom: '3%' }}>
                        <Typography gutterBottom variant="title" component="h2">
                            Translation List
                        </Typography>
                    </Grid>
                    <Grid item xs={2} sm={2} lg={2} xl={2} style={{ paddingLeft: '7%' }}>

                        <Button variant="extendedFab" color="secondary" aria-label="Add" onClick={() => { history.push("/pdftranslate") }}>
                            <AddIcon /> Translate
                        </Button>
                    </Grid>

                </Grid>





                <Grid item xs={12} sm={12} lg={12} xl={12}>
                        <Paper >
                            <Table >
                                <TableHead style={{ backgroundColor: '#335995', color: '#335995' }}>
                                    <TableRow style={{ backgroundColor: '#335995', padding: '5%' }}>

                                        <TableCell align="left" style={{ color: 'white' }}>Translated Files</TableCell>
                                        <TableCell align="left" style={{ color: 'white' }}>Dates</TableCell>
                                        <TableCell align="left" style={{ color: 'white' }}>Status</TableCell>
                                        <TableCell align="center" style={{ color: 'white' }}>Download</TableCell>
                                        <TableCell align="center" style={{ color: 'white' }}>View</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.translations && Array.isArray(this.state.translations) && this.state.translations.map((row) => (
                                        <TableRow key={row.created_on}>
                                            <TableCell align="left">{row.name}</TableCell>
                                            <TableCell align="left">{row.created_on.split(',')[0]}</TableCell>
                                            <TableCell align="left">{row.status}</TableCell>
                                            <TableCell align="center">{row.status == 'COMPLETED' ? <a href={"http://nlp-nmt-160078446.us-west-2.elb.amazonaws.com/corpus/download-docx?filename="+row.basename+'_t.docx'} target="_blank"><DeleteOutlinedIcon style={{ width: "24", height: "24" }} /></a> : ''}</TableCell>
                                            <TableCell align="center">{row.status == 'COMPLETED' ? <ViewIcon style={{ width: "24", height: "24",cursor:'pointer' }} onClick={()=>{history.push('/view-doc/'+row.basename)}} />: ''}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>
                </Grid>
            </Grid>

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
