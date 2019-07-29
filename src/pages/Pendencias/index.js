import React from 'react';
import Pendencias from '../../Components/Pendencias';
import './style.css';

const PendenciasPage = () =>  

    <div>       
        <h2 className="title">Pendencias</h2>
        <Pendencias acesso={'fiscal'} /> 
    </div>

export default PendenciasPage;