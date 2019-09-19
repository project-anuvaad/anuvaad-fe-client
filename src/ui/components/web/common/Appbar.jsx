import AppBar from "@material-ui/core/AppBar";
import Fab from '@material-ui/core/Fab';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { withStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Toolbar from "@material-ui/core/Toolbar";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import SearchIcon from "@material-ui/icons/Search";
import Pagination from "material-ui-flat-pagination";
import PropTypes from "prop-types";
import React from "react";
import history from "../../../../web.history";
import AppStyles from "../../../styles/web/EditPdfStyles";
import Button from './Button';


class PrimarySearchAppBar extends React.Component {
  state = {
    value: '',
    offset: 0
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };
  handleClick(offset) {
    this.setState({ offset });
  }
  render() {
    const { classes } = this.props;
    return (
      <div >
        <AppBar position="fixed" color="default" className={classes.appBar}>
          <Toolbar>
            <Grid container spacing={6} >
              <Grid item xs={1} sm={1} lg={1} xl={1}>
                <Fab onClick={() => { history.push("/pdftranslate") }} ><ChevronLeftIcon /></Fab>

              </Grid>
              <Grid item xs={3} sm={3} lg={3} xl={3}>
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="position"
                    name="position"
                    value={this.state.value}
                    onChange={this.handleChange}
                    position="fixed"
                    row
                    style={{ minWidth: '500px' }}
                  >

                    <FormControlLabel
                      value="start"
                      control={<Radio color="primary" />}
                      label="Show Both"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value="bottom"
                      control={<Radio color="primary" />}
                      label="Source PDF"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value="end"
                      control={<Radio color="primary" />}
                      label="Edit Window"
                      labelPlacement="end"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={4} sm={4} lg={4} xl={4}>
                <Pagination
                  limit={1}
                  offset={this.state.offset}
                  total={100}
                  onClick={(e, offset) => this.handleClick(offset)}

                />
              </Grid>
              <Grid item xs={2} sm={2} lg={2} xl={2}>
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment>
                        <IconButton>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  placeholder="Search..."
                />
              </Grid>
              <Grid item xs={2} sm={2} lg={2} xl={2}>
                <Grid item container spacing={6}>
                  <Grid item xs={6} sm={6} lg={6} xl={6}>
                    <Button style={{ width: '70%' }} value={'Edit'} color='secondary'
                      variant="contained" />
                  </Grid>
                  <Grid item xs={6} sm={6} lg={6} xl={6}>
                    <Button style={{ width: '70%' }} value={'Export'} color='secondary'
                      variant="contained" />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>

        </AppBar>
      </div>
    );
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(AppStyles)(PrimarySearchAppBar);
