import React, { Component, Fragment } from "react";
import { Input, Button, Row, Col, Divider, Tabs } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import FacebookLogin from "react-facebook-login";
import { handleSubmit, handleFacebookLogin, getAuthUserRequest } from "../../store/ducks/login"
import {Creators as LoginSupplierActions} from "../../store/ducks/login";
import { Route, Redirect, withRouter } from 'react-router-dom';
import Loading from '../Loading';
import { Error, Success } from '../Feedback/ShortFeedBack';
import InputMask from 'react-input-mask';
import {Link} from 'react-router-dom';

const { TabPane } = Tabs;
class Login extends Component {
  state = {
    input: {
      email: "",
      password: ""
    },

    inputFornecedor: {
      cnpj: "",
      password: ""
    },

    email_error : false,
    password_error : false,

    cnpj_error : false,
    password_fornecedor_error : false,

    loading : false,
    error : false,

    done : false,
  };

  async componentDidMount() {
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {

    if(prevProps != this.props){

      if(prevProps.login.loading != this.props.login.loading )
        await this.setState({loading : this.props.login.loading});

      if (this.props.login.error === true && this.props.login.loading === false) {            
        await this.setState({ error : this.props.login.error})
        setTimeout(() => {this.setState({error : false})}, 3000);
      }

      else if (this.props.login.error === 'done' && this.props.login.grupo_acesso === 'fornecedor' && this.state.done === false) {      
        //set senha e cnpj local storage
        await this.setState({done : true})
        await this.props.history.push('/portal');
      }
    }
  }

  handleSubmit = async () => {
    await this.handleCheckEmail(this.state.input.email) === true ?  await this.setState({email_error : false}) : this.setState({email_error : true})
    await this.state.input.password.length > 3 === true ?  await this.setState({password_error : false}) : this.setState({password_error : true})
    
    if(this.state.email_error === false && this.state.password_error === false)
      this.props.loginActions.handleSubmit(this.state.input.email, this.state.input.password);
  }

  handleSubmitFornecedor = async () => {
    await this.handleCheckCNPJ(this.state.inputFornecedor.cnpj) === true ?  await this.setState({cnpj_error : false}) : this.setState({cnpj_error : true})
    await this.state.inputFornecedor.password.length > 3 === true ?  await this.setState({password_fornecedor_error : false}) : this.setState({password_fornecedor_error : true})
    
    if(this.state.password_fornecedor_error === false && this.state.cnpj_error === false)
      await this.props.loginSupplierActions.postLoginSupplierRequest({cnpj : this.state.inputFornecedor.cnpj, senha : this.state.inputFornecedor.password})
  }

  handleCheckEmail = async (email) => {
    var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let test = await reg.test(email);
    console.tron.log(test);
    return test;
  }

  handleCheckCNPJ = (cnpj) => {
    cnpj = cnpj.replace(/[^\d]+/g, "");

    if (cnpj === "") return false;
    if (cnpj.length !== 14) return false;
    // Elimina CNPJs invalidos conhecidos
    if (
      cnpj === "00000000000000" ||
      cnpj === "11111111111111" ||
      cnpj === "22222222222222" ||
      cnpj === "33333333333333" ||
      cnpj === "44444444444444" ||
      cnpj === "55555555555555" ||
      cnpj === "66666666666666" ||
      cnpj === "77777777777777" ||
      cnpj === "88888888888888" ||
      cnpj === "99999999999999"
    )
      return false;

    // Valida DVs
    var tamanho = cnpj.length - 2;
    var numeros = cnpj.substring(0, tamanho);
    var digitos = cnpj.substring(tamanho);
    var soma = 0;
    var pos = 5;

    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    var resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

    if (resultado != digitos[0]) {
      return false;
    }

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = 6;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(1)) return false;
    return true;
  }

    
  render() {
    return (
      this.state.loading ? <Loading></Loading> :
      <div>
        {this.state.error ? Error("Erro ao validar login, tente novamente...") : ''}
        <div className="background-login">
        <Tabs className="tabs" defaultActiveKey="1"  onChange={() => {}}>
            <TabPane tab="Fornecedor" key="1">
            <Row className="row">
                <Col span={24}>
                  <label className={this.state.cnpj_error ? 'label_error' : 'label'} >CNPJ {this.state.cnpj_error ? ' *' : ''}</label>
                  <InputMask placeholder="CNPJ" value={this.state.inputFornecedor.cnpj} onChange={(e) => this.setState({
                      inputFornecedor: { ...this.state.inputFornecedor, cnpj: e.target.value }
                    })} className="ant-input input" {...this.props} mask="99.999.999/9999-99" maskChar=" " />                        
                </Col>
              </Row>
                  
              <Row className="row">
                <Col span={24}>
                  <label className={this.state.password_fornecedor_error ? 'label_error' : 'label'} >Senha {this.state.password_fornecedor_error ? ' *' : ''}</label>
                  <Input
                    className="ant-input input"
                    placeholder="Password"
                    type="password"
                    style={{}}
                    value={this.state.inputFornecedor.password}
                    onChange={(e) => this.setState({
                      inputFornecedor: { ...this.state.inputFornecedor, password: e.target.value }
                    })}
                  />
                </Col>
              </Row>

              <Row>
                <Col span={24}>
                  <Button onClick={this.handleSubmitFornecedor} className="button login-button">Login</Button> 
                </Col>
              </Row>
              <Row className="row">           
                <Col span={24}>
                  <Divider>OU</Divider>
                </Col> 
              </Row>
              <Row>
                <Col span={8}></Col>
                <Col span={8}>
                  <Button onClick={() => this.props.history.push('/cadastro') } className="button cadastro-button">Cadastre-se</Button> 
                </Col>
                <Col span={8}></Col>
              </Row>
            </TabPane>
            <TabPane tab="Colaborador" key="2">
            <Row className="row">       
                <Col span={6}></Col>    
                <Col span={12}>
                  <FacebookLogin
                    appId="667154123468908"
                    autoLoad={false}
                    callback={this.props.loginActions.handleFacebookLogin}
                    fields="name,email,picture"
                  />
                </Col> 
                <Col span={6}></Col>   
              </Row>
              <Row className="row">           
                <Col span={24}>
                  <Divider>OU</Divider>
                </Col> 
              </Row>

              <Row className="row">
                <Col span={24}>
                  <label className={this.state.email_error ? 'label_error' : 'label'} >E-mail {this.state.email_error ? ' *' : ''}</label>
                  <Input
                    className="ant-input input"
                    placeholder="Email"
                    name="email"
                    type="email"
                    value={this.state.input.email}
                    onChange={(e) => this.setState({
                      input: { ...this.state.input, email: e.target.value }
                    })}
                  />
                </Col>
              </Row>
                  
              <Row className="row">
                <Col span={24}>
                  <label className={this.state.password_error ? 'label_error' : 'label'} >Senha {this.state.password_error ? ' *' : ''}</label>
                  <Input
                    className="ant-input input"
                    placeholder="Password"
                    name="password"
                    type="password"
                    style={{}}
                    value={this.state.input.password}
                    onChange={(e) => this.setState({
                      input: { ...this.state.input, password: e.target.value }
                    })}
                  />
                </Col>
              </Row>   
              <Row>
                <Col span={24}>
                  <Button onClick={this.handleSubmit} className="button login-button">Login</Button> 
                </Col>
              </Row>
            </TabPane>
          </Tabs>
      </div>      

      </div>
      
    );
  }
}

const mapState = state => ({
  login: state.login,
});

const mapActions = dispatch => ({
  loginSupplierActions: bindActionCreators(LoginSupplierActions, dispatch),
  loginActions: bindActionCreators({ handleSubmit, handleFacebookLogin, getAuthUserRequest}, dispatch)
})
  

export default connect(mapState, mapActions)(withRouter(Login));
