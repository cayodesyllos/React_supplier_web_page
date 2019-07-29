import React, { Component } from 'react';
import logo from './logo.svg';
import './config/reactotron';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store'
import Menu from './Components/Menu';
import 'antd/dist/antd.css';
class App extends Component {
    
    componentDidMount = () => {
        
    }

    render() {
    return (
    <Provider store = {store}>
        <BrowserRouter>        
            <Menu></Menu>
        </BrowserRouter>
    </Provider>
      
        
    );
  }
}

export default App;
