import React, { Component } from 'react'
import CadastroFornecedor from '../../Components/CadastroFornecedor';
import { connect } from "react-redux";
import './style.css';

class FormularioPage extends Component { 
    render() {
        return (
        <div>       
            <h2 className="title">Formulário de cadastro</h2>
            <CadastroFornecedor acesso={this.props.login.grupo_acesso}/> 
        </div>)
    }
}

const mapStateToProps = state => ({
    login: state.login
});

export default connect(mapStateToProps)(FormularioPage);
  