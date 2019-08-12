import React, { Component, Fragment } from "react";
import { Input, Button, Row, Col, Divider, Tabs } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {Creators as LoginCreationActions} from "../store/ducks/create_login";
import Loading from './Loading';
import { Error, Success } from './Feedback/ShortFeedBack';
import ReactPasswordStrength from 'react-password-strength';
import {Link} from 'react-router-dom';
import { Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom' 

const { TabPane } = Tabs;
class LoginCreation extends Component {
  state = {
    token : '',
    token_error : false,

    senha1: '',
    senha1_error : false,

    senha2: '',
    senha2_error : false,

    loading : false,
    error : false,
  };

  componentDidMount() {
    console.tron.log(this.props);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps != this.props){
        if (this.props.login_creation.error === true && this.props.login_creation.loading === false) {            
            this.setState({error : true});
            setTimeout(() => {this.setState({error: false})}, 3000);
        }
        else if(this.props.login_creation.error === 'done'){
          this.props.history.push('/login')
        }
    }
}

  handleSubmit = async () => {
    if(await this.handleCheckFields() === true){
        let data = {
            senha : this.state.senha1,
            token : this.state.token,
        }
        this.props.loginCreationActions.addLoginCreationRequest(data);
    }
  }

  handleCheckFields = () => {
      this.state.senha1.length < 8 ? this.setState({senha1_error : true}) : this.setState({senha1_error : false})
      this.state.senha1 !== this.state.senha2 ? this.setState({senha1_error : true, senha2_error : true}) : this.setState({senha1_error : false, senha2_error : false})
      this.state.token < 2 ? this.setState({token_error : true}) : this.setState({token_error : false})
      if(this.state.senha1_error === false && this.state.senha2_error === false && this.state.token_error === false){
        return true;
      }
      else
        return false;
  }
    
  render() {
    return (
      this.props.login_creation.loading ? <Loading></Loading> :
      <div>
        {this.state.error ? Error("Erro ao validar login, tente novamente...") : ''}
        <div className="background-login"> 

             {/* <Row className="row">
                <Col span={24}>
                    <ReactPasswordStrength
                    minLength={5}
                    minScore={2}
                    scoreWords={['weak', 'okay', 'good', 'strong', 'stronger']}
                    changeCallback={() => {}}
                    inputProps={{ name: "password_input", autoComplete: "off", className: "form-control" }}
                    />     
                </Col>
              </Row>   */}

              <Row className="row">
                <Col span={24}>
                  <label className={this.state.token_error ? 'label_error' : 'label'} >Token {this.state.token_error ? ' *' : ''}</label>
                  <Input
                    className="ant-input input"
                    placeholder="Token"
                    name="token"
                    value={this.state.token}
                    onChange={(e) => this.setState({
                      token: e.target.value
                    })}
                  />
                </Col>
              </Row>
                  
              <Row className="row">
                <Col span={24}>
                  <label className={this.state.senha1_error ? 'label_error' : 'label'} >Senha {this.state.senha1_error ? ' *' : ''}</label>
                  <Input
                    className="ant-input input"
                    placeholder="Password"
                    type="password"
                    value={this.state.senha1}
                    onChange={(e) => this.setState({
                      senha1 : e.target.value
                    })}
                  />
                </Col>
              </Row>   
              <Row className="row">
                <Col span={24}>
                  <label className={this.state.senha2_error ? 'label_error' : 'label'} >Repetir senha {this.state.senha2_error ? ' *' : ''}</label>
                  <Input
                    className="ant-input input"
                    placeholder="Repeat password"
                    type="password"
                    value={this.state.senha2}
                    onChange={(e) => this.setState({
                      senha2 : e.target.value
                    })}
                  />
                </Col>
              </Row>   

              <Button onClick={this.handleSubmit} className="button login-button">Criar Login</Button> 
              
        </div>      

      </div>
      
    );
  }
}

const mapStateToProps = state => ({
    login_creation : state.create_login,
});

const mapDispatchToProps = dispatch => ({
    loginCreationActions: bindActionCreators(LoginCreationActions, dispatch),
    
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginCreation));