import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAuthUserRequest, getAuthUserRequestFornecedor} from '../../store/ducks/login';
import Loading from '../Loading';
import {Creators as LoginSupplierActions} from "../../store/ducks/login";
import Login from '../../pages/Login';
class PublicRoute extends Component {
  state = {
    loading: true,
    logged : false,
  };
  
  async componentDidMount() {
    let cnpj = await localStorage.getItem('cnpj');
    let senha = await localStorage.getItem('token');
    let token = await localStorage.getItem('auth_token');

    console.tron.log(cnpj, token, 'ulele');
    
    if(cnpj != null || senha != null || token != null)  
      await this.setState({ loading: false, logged : true });
    else
      await this.setState({ loading: false, logged : false });

  }  

  render() {
    const RenderComponent = this.props.component;
    const login = this.state;
    console.tron.log('publiccc routeeee', login)
    return (login.loading === true || this.state.loading === true) ? (
      <Loading />
    ) : (
      <Route render={props => (login.logged === false ? <RenderComponent {...props} /> : <Redirect to="/portal" />)} />
    );
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
)(PublicRoute);
