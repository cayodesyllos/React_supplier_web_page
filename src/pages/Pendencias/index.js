import React, { Component } from 'react'
import Pendencias from '../../Components/Pendencias';
import { connect } from "react-redux";
import './style.css';

class PendenciasPage extends Component { 
    render() {
        return (
            <div>       
                <h2 className="title">Pendências</h2>
                <Pendencias acesso={this.props.login.grupo_acesso} /> 
            </div>
        )
    }
}

const mapStateToProps = state => ({
    login: state.login
});

export default connect(mapStateToProps)(PendenciasPage);