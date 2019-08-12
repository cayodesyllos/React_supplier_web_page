import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAuthUserRequest, getAuthUserRequestFornecedor} from '../../store/ducks/login';
import Loading from '../Loading';
import {Creators as LoginSupplierActions} from "../../store/ducks/login";

class PrivateRoute extends Component {
  state = {
    loading: true,
  };
  
  async componentDidMount() {
    let cnpj = await localStorage.getItem('cnpj');
    let token = await localStorage.getItem('token');

    if(this.props.login.loading !== true){
      if(cnpj === null)
        await this.props.loginActions.getAuthUserRequest(); // -> check for local storage -> fornecedor ou colaborador
      else
        await this.props.loginSupplierActions.postLoginSupplierRequestToken({cnpj : cnpj, token : token})
    }
    
    
    this.setState({ loading: false });
  }  

  render() {
    const RenderComponent = this.props.component;
    const login = this.props.login;
    console.tron.log('private routeeee----> pegar nome componente', this.props.path)
    if(this.props.path !== '/portal' && login.grupo_acesso === 'fornecedor'){
      return (login.loading === true || this.state.loading === true) ? (
        <Loading />
      ) : (
        <Redirect to="/portal" />
      );
    }
    else{
      return (login.loading === true || this.state.loading === true) ? (
        <Loading />
      ) : (
        <Route render={props => (login.logged ? <RenderComponent {...props} /> : <Redirect to="/login" />)} />
      );
    }
    
  }
}

const mapState = state => ({
  login: state.login,
});

const mapActions = dispatch => ({
  loginSupplierActions: bindActionCreators(LoginSupplierActions, dispatch),
  loginActions: bindActionCreators({getAuthUserRequest}, dispatch)
})
export default connect(
  mapState,
  mapActions,
)(PrivateRoute);
