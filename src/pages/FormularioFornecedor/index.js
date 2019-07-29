import React from 'react';
import CadastroFornecedor from '../../Components/CadastroFornecedor';
import './style.css';

const CadastroFornecedorPage = () =>  

    <div>       
        <h2 className="title">Formulário de cadastro</h2>
        <CadastroFornecedor acesso={'fiscal'}/> 
    </div>

export default CadastroFornecedorPage;