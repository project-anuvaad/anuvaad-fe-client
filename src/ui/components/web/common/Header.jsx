import { Button } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import TranslateIcon from '@material-ui/icons/Translate';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import GroupIcon from '@material-ui/icons/Group';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SendIcon from '@material-ui/icons/Send';
import classNames from 'classnames';
import React from 'react';
import history from "../../../../web.history";

const styles = {
	root: {
		flexGrow: 1
	},
	flex: {
		flex: 1,
		marginLeft: '2%'
	}
};

class Header extends React.Component {
	state = {
		open: false,
		auth: true,
		anchorEl: null,
		name: localStorage.getItem('userDetails'),
		heading: 'Translation'
	};

	handleDrawerOpen = () => {
		this.setState({ open: true });
	};

	handleDrawerTranslate = () => {

		this.setState({
			open: false,
			heading: 'Translation'
		});
	};

	handleDrawerDoc = () => {

		this.setState({
			open: false,
			heading: 'Documents'
		});
	};
	handleDrawerClose = () => {

		this.setState({
			open: false
		});
	};

	handleChange = (event, checked) => {
		this.setState({ auth: checked });
	};

	handleMenu = (event) => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleClose = () => {
		this.setState({ anchorEl: null });
	};
	handleClick = () => {

	}

	render() {
		const { classes } = this.props;
		const { auth, anchorEl, open } = this.state;
		const openEl = Boolean(anchorEl);

		var role = JSON.parse(localStorage.getItem('roles'));
		var useRole = new Array();
		role.map((item,value) => (
			useRole.push(item),
			value!==role.length-1 ? useRole.push(', '):null
		))

		

		return (
			<div>
				<AppBar position="fixed" className={classNames(classes.appBar, open && classes.appBarShift)}>
					<Toolbar disableGutters={!open}>
						<Typography variant="title" color="inherit" className={classes.flex}>
							{this.state.heading}
						</Typography>
						<Typography variant="title" color="inherit" style={{
							position: 'absolute',

							textTransform: 'capitalize',
							right: '130px'
						}}>
							Welcome {this.state.name} {role.includes('admin')? '[Admin]':''}
						</Typography>
						{this.state.drawerClose}
						{auth && (
							<div style={{
								position: 'absolute',
								top: '10%',
								right: '50px'
							}}>
								<Fab
									aria-owns={openEl ? 'menu-appbar' : null}
									aria-haspopup="true"
									onClick={this.handleMenu}
									color="primary"
									size="medium">
									<AccountCircle />
								</Fab>

								<Menu
									id="menu-appbar"
									anchorEl={anchorEl}
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'right'
									}}
									transformOrigin={{
										vertical: 'top',
										horizontal: 'right'
									}}
									open={openEl}
									onClose={this.handleClose}
								>
									<MenuItem onClick={() => { this.handleClose(); history.push(`${process.env.PUBLIC_URL}/profile`) }}>My Profile</MenuItem>
									<MenuItem onClick={() => { this.handleClose(); history.push(`${process.env.PUBLIC_URL}/logout`) }}>Logout</MenuItem>
								</Menu>
							</div>
						)}
					</Toolbar>
				</AppBar>
				<div>
					<Grid container spacing={24} style={{ padding: 24 }}>
						<Drawer
							color="inherit"
							variant="persistent"
							anchor="left"
							open={open}
							classes={{
								paper: classes.drawerPaper
							}}>
							<List>
								<ListItem >

									<ListItemText
										disableTypography
										primary={(
											<Typography type="body2" style={{ color: '#FFFFFF', paddingBottom: '2%', marginLeft: '21%' }} variant="title" color="inherit" className={classes.flex}>
												Anuvaad
          							</Typography>
										)}
									/>
								</ListItem>
								<Divider />
								
								<ListItem style={{ paddingTop: '8%', paddingBottom: '8%' }} button onClick={(event) => { this.handleDrawerClose(); history.push("/pdftranslate") }}>
									<ListItemIcon>
										<TranslateIcon style={{ color: 'white' }} />
									</ListItemIcon>
									<ListItemText
										disableTypography
										primary={(
											<Typography type="body2" style={{ color: '#FFFFFF' }}>
												Translate File
          							</Typography>
										)}
									/>
								</ListItem>
								<ListItem style={{ paddingTop: '8%', paddingBottom: '8%' }} button onClick={(event) => { this.handleDrawerClose(); history.push("/viewtranslate") }}>
									<ListItemIcon>
										<SendIcon style={{ color: 'white' }} />
									</ListItemIcon>
									<ListItemText
										disableTypography
										primary={(
											<Typography type="body2" style={{ color: '#FFFFFF' }}>
												Documents
          							</Typography>
										)}
									/>
								</ListItem>
								{role.includes('admin') &&
								<ListItem style={{ paddingTop: '8%', paddingBottom: '8%' }} button onClick={(event) => { this.handleDrawerClose(); history.push("/userdirectory") }}>
									<ListItemIcon>
										<GroupIcon style={{ color: 'white' }} />
										</ListItemIcon>
									<ListItemText
										disableTypography
										primary={(
											<Typography type="body2" style={{ color: '#FFFFFF' }}>
												User Management
          							</Typography>
										)}
									/>
									</ListItem>
								}

								<ListItem style={{ paddingTop: '17%', paddingBottom: '17%', marginTop: '67%', marginLeft: '82%' ,width:'18%'}} button onClick={(event) => { this.handleDrawerClose(); }}>
									<ListItemIcon>
										<ChevronLeftIcon style={{ color: 'white' }} />
									</ListItemIcon>
								</ListItem>

								
							</List>
					</Drawer>
						<main
							className={classNames(classes.content, {
								[classes.contentShift]: open
							})}>
							{this.state.open ? '' : (
								<Button
									color='primary'
									variant="contained"
									className={classes.buttonRight}
									onClick={this.handleDrawerOpen}>
									<ChevronRightIcon />
								</Button>
							)}
							<div className={classes.drawerHeader} />
						</main>
					</Grid>
				</div>

			</div>
		);
	}
}

export default withStyles(styles)(Header);
