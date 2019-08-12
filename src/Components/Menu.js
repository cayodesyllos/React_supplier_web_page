import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Routes from '../routes';
import {Link} from 'react-router-dom';
import {Icon} from 'antd';
import {connect} from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { bindActionCreators } from "redux";
import { handleLogout } from "../store/ducks/login"
import { Button } from '@material-ui/core';
const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

class PersistentDrawerLeft extends React.Component {
  state = {
    open: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, theme } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          style={{backgroundColor : '#CF0072'}}
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar disableGutters={!open}>
            {this.props.login.logged ?
            <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={this.handleDrawerOpen}
            className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>:''}
            
            <Typography onClick={() => { window.location.href = '../portal/'}} variant="h5" style={{'margin-left': '1%', 'width': '50%'}} color="inherit" noWrap>
             <Button style={{'backgroung-color': 'transparent', 'fontSize' : '20px'}} variant="h5" color="inherit" >Portal dos Fornecedores</Button> 
            </Typography>
            <Typography variant="h8" style={{'margin-right': '1%', 'width': '50%', 'text-align': 'right'}} color="inherit" noWrap>
              {this.props.login.nome}   {this.props.login.grupo_acesso === 'gp' ? 'central de compras' : this.props.login.grupo_acesso}
            </Typography>
          </Toolbar>
        </AppBar>
       
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          {!this.props.login.loading ? 
          <List>
            {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))} */}
            {this.props.login.grupo_acesso != 'fornecedor' ?
            <ListItem onClick={() => window.location.href = '../pendencias/'} button key={'Pendencias'}>
                <ListItemIcon>  <Icon type="reconciliation" /> </ListItemIcon>
                <ListItemText primary={'Pendências'} />     
            </ListItem> : ''}
            
            <ListItem button key={'Logout'} onClick={() => this.props.handleLogout() }>
                    <ListItemIcon>  <Icon type="logout" /> </ListItemIcon>
                    <ListItemText primary={'Logout'} />                
             </ListItem>
            <Divider/>          
          </List> : ''}
          
          
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <Routes></Routes>
        </main>
      </div>
    );
  }
}

PersistentDrawerLeft.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  login : state.login,
});

const mapActions = dispatch =>
  bindActionCreators({ handleLogout }, dispatch);

export default connect(mapStateToProps,
  mapActions) (withStyles(styles, { withTheme: true })(PersistentDrawerLeft));