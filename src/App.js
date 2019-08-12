import React, { Component } from 'react';
import './config/reactotron';

import Menu from './Components/Menu';
import 'antd/dist/antd.css';
import Login from './pages/Login'
import {connect} from 'react-redux';

class App extends Component {
    
    componentDidMount = () => {
        console.tron.log(this.props);
    }

    render() {
    return (
    
            <Menu></Menu>   
      
        
    );
  }
}

const mapStateToProps = state => ({
    login : state.login,
});


export default connect(mapStateToProps)(App);
