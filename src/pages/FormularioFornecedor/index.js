
import React, { Component } from 'react'
import CadastroFornecedor from '../../Components/CadastroFornecedor';
import './style.css';

class FormularioFornecedorPage extends Component { 
    render() {
        return (

    <div>       
        <h2 className="title">Formulário de cadastro</h2>
        <CadastroFornecedor acesso={''}/> 
    </div>)
    }
}



export default (FormularioFornecedorPage);
  