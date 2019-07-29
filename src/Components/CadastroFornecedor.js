import React, { Component } from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Creators as FornecedoresActions} from '../store/ducks/fornecedores';
import {Creators as EnderecoActions} from '../store/ducks/endereco';
import {Creators as BancosActions} from '../store/ducks/bancos';
import {Creators as GruposEconomicosActions} from '../store/ducks/grupos_economicos';
import {Row, Upload, message, Icon, Divider, Checkbox, Input, Table, Button, Select, Col, Steps} from 'antd';
import CurrencyInput from 'react-currency-input';
import './style.css';
import { Error, Success } from './Feedback/ShortFeedBack';
import '../config/reactotron';
import InputMask from 'react-input-mask';
import { file } from '@babel/types';
import Loading from './Loading';
import { withRouter } from 'react-router-dom' 

const { Step } = Steps;
const { Column } = Table;
const Option = Select.Option;

class CadastroFornecedor extends Component {

    state = {
        fail : false,
        step : 0,

        //step 0
        gp : '',
        gp_error : false,

        cnpj : '',
        cnpj_error : false,

        nome_fantasia : '',
        nome_fantasia_error : false,

        razao_social : '',
        razao_social_error : false,

        cep : '',
        cep_error : false,

        endereco : '',
        endereco_error : false,

        bairro : '',
        bairro_error : false,

        numero : '',
        numero_error : false,

        estado : '',
        estado_error : false,

        cidade : '',
        cidade_error : false,
        
        telefone : '',
        telefone_error : false,
        
        celular : '',
        celular_error : false,
        
        site : '',
        site_error : false,
        
        email : '',
        email_error : false,


        //step 1
        nome_responsavel_recebimento : '',
        nome_responsavel_recebimento_error : false,

        email_responsavel_recebimento : '',
        email_responsavel_recebimento_error : false,
        
        telefone_responsavel_recebimento : '',
        telefone_responsavel_recebimento_error : false,

        nome_contato_comercial : '',
        nome_responsavel_recebimento_error : false,

        email_contato_comercial : '',
        email_contato_comercial_error : false,

        cargo_contato_comercial : '',
        cargo_contato_comercial_error : false,

        telefone_contato_comercial : '',
        telefone_contato_comercial_error : false,

        //step 2
        setor_industrial : "",
        setor_industrial_error : false,

        regime_tributario : "",
        regime_tributario_error : false,

        codigo_banco : null,
        codigo_banco_error : false,

        agencia : "",
        agencia_error : false,

        conta : "",
        conta_error : false,

        prazo_pagamento : 90,

        forma_pagamento : "crédito em conta corrente",

        prazo_entrega : null,
        prazo_entrega_error : false,

        valor_minimo_pedido : 9,
        valor_minimo_pedido_error : false,

        frete : "CIF",


        //step 3
        certificados : false,

        possui_certificado_qualidade : false,
        certificado_qualidade_name : '',
        certificado_qualidade : '',
        certificado_qualidade_error : false,

        possui_certificado_ibama : false,
        certificado_ibama_name : '',
        certificado_ibama : '',
        certificado_ibama_error : false,

        possui_certificado_policia_civil : false,
        certificado_policia_civil_name : '',
        certificado_policia_civil : '',
        certificado_policia_civil_error : false,

        possui_certificado_bombeiros : false,
        certificado_bomberios_name : '',
        certificado_bombeiros : '',
        certificado_bombeiros_error : false,

        possui_certificado_policia_federal : false,
        certificado_policia_federal_name : '',
        certificado_policia_federal : '',
        certificado_policia_federal_error : false,

        possui_certificado_exercito : false,
        certificado_exercito_name : '',
        certificado_exercito : '',
        certificado_exercito_error : false,

        possui_certificado_inmetro : false,
        certificado_inmetro_name : '',
        certificado_inmetro : '',
        certificado_inmetro_error : false,

        possui_certificado_anvisa : false,
        certificado_anvisa_name : '',
        certificado_anvisa : '',
        certificado_anvisa_error : false,

        possui_certificado_mapa : false,
        certificado_mapa_name : '',
        certificado_mapa : '',
        certificado_mapa_error : false,


        //step 4

        estatuto_social : '',
        estatuto_social_name : '',
        

        cartao_cnpj : '',
        cartao_cnpj_name : '',
        cartao_cnpj_error : false,

        procuracao : '',
        procuracao_name : '',

        comprovante_bancario : '',
        comprovante_bancario_name : '',
        comprovante_bancario_error : false,

        falencia_concordata : '',
        falencia_concordata_name : '',
        falencia_concordata_error : false,

        //step 5

        grupo_economico : '',
        grupo_economico_error : '',
        has_grupo_economico : false,

        supplier_leroy : false,

        rappel_faixa_1 : 0,
        rappel_faixa_2 : 0,
        rappel_faixa_3 : 0,
        rappel_faixa_4 : 0,
        rappel_faixa_1_error : false,
        rappel_faixa_2_error : false,
        rappel_faixa_3_error : false,
        rappel_faixa_4_error : false,

        rappel_desconto_1 : 0,
        rappel_desconto_2 : 0,
        rappel_desconto_3 : 0,
        rappel_desconto_4 : 0,
        rappel_desconto_1_error : false,
        rappel_desconto_2_error : false,
        rappel_desconto_3_error : false,
        rappel_desconto_4_error : false,
    

        //step 6

        contrato : '',
        contrato_name : '',
        contrato_error : false,
        
        status_contrato : '',      
        status_contrato_error : false,   


        //step 7

        taxa_antecipacao : 0,
        taxa_antecipacao_error : false,

        pedido_enxoval : false,

        pedido_espelho : false,

        pedido_exposicao : false,

        teto_pedido_enxoval : 0,
        teto_pedido_enxoval_error : false,

        duracao_contrato : null,
        duracao_contrato_error : false,

        desconto_abertura : 0,      
        desconto_abertura_error : false,    
    }

   
    async componentDidMount() {
       
        console.tron.log('!!!!!', this.props.location.state.fornecedor.endereco, this.props.location.state.fornecedor.endereco.split(',')[1])
        await this.setState({
            gp : this.props.location.state.fornecedor.gp,
            razao_social : this.props.location.state.fornecedor.razao_social,
            nome_fantasia : this.props.location.state.fornecedor.nome_fantasia,
            numero: parseFloat(this.props.location.state.fornecedor.endereco.split(',')[1]),
            cep: this.props.location.state.fornecedor.cep,
            telefone: this.props.location.state.fornecedor.telefone,
            celular: this.props.location.state.fornecedor.celular,
            site: this.props.location.state.fornecedor.site,
            email: this.props.location.state.fornecedor.email,
            nome_responsavel_recebimento: this.props.location.state.fornecedor.nome_responsavel_recebimento,
            email_responsavel_recebimento: this.props.location.state.fornecedor.email_responsavel_recebimento,
            telefone_responsavel_recebimento: this.props.location.state.fornecedor.telefone_responsavel_recebimento,
            cnpj: this.props.location.state.fornecedor.cnpj,
            setor_industrial: this.props.location.state.fornecedor.setor_industrial,
            regime_tributario: this.props.location.state.fornecedor.regime_tributario,
            codigo_banco: this.props.location.state.fornecedor.codigo_banco,
            agencia: this.props.location.state.fornecedor.agencia,
            conta: this.props.location.state.fornecedor.conta,
            prazo_pagamento: this.props.location.state.fornecedor.prazo_pagamento,
            forma_pagamento: this.props.location.state.fornecedor.forma_pagamento,
            prazo_entrega: this.props.location.state.fornecedor.prazo_entrega,
            valor_minimo_pedido: this.props.location.state.fornecedor.valor_minimo_pedido,
            frete: this.props.location.state.fornecedor.frete,
            nome_contato_comercial: this.props.location.state.fornecedor.nome_contato_comercial,
            email_contato_comercial: this.props.location.state.fornecedor.email_contato_comercial,
            cargo_contato_comercial: this.props.location.state.fornecedor.cargo_contato_comercial,
            telefone_contato_comercial: this.props.location.state.fornecedor.telefone_contato_comercial,

        });

        if(this.props.acesso === 'fiscal'){
            this.setState({
                taxa_antecipacao : this.props.location.state.fornecedor.taxa_antecipacao,
                pedido_enxoval : this.props.location.state.fornecedor.pedido_enxoval,
                pedido_espelho : this.props.location.state.fornecedor.pedido_espelho,
                pedido_exposicao : this.props.location.state.fornecedor.pedido_exposicao,
                teto_pedido_enxoval : this.props.location.state.fornecedor.teto_pedido_enxoval,
                duracao_contrato : this.props.location.state.fornecedor.duracao_contrato,
                desconto_abertura : this.props.location.state.fornecedor.desconto_abertura,
            });
        }

        await this.handleGetAdress();

        console.tron.log('------>>>>', this.state);
        this.props.bancosActions.getBancosRequest();     
        this.props.gruposEconomicosActions.getGruposEconomicosRequest(); 
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps != this.props){
            console.tron.log('*********')
            if (this.props.fornecedores.error === true && this.props.fornecedores.loading === false) {            
                this.setState({fail : true});
                setTimeout(() => {this.setState({fail : false})}, 3000);
            }
            else if(this.props.fornecedores.error === 'done' && this.props.fornecedores.loading === false){
                // redirect to instructions page (email when aproved...)
                console.tron.log('great!!')
            }
        }
    }

    handleGetCep = async (e) => {
        await this.setState({cep : e.target.value});
    }

    handleGetAdress = () => {
        this.props.enderecoActions.getEnderecoRequest(this.state.cep);
    }

    handleForward = async () => {
        let limit = 7;

        if(this.props.acesso === 'fornecedor')
            limit = 4;

        if(this.state.step < limit){
            if(this.props.acesso == 'gp'){
                if(this.state.step === 2){
                    let step_gp = this.state.step + 3;
                    await this.setState({step : step_gp});
                }
                else{
                    let success = await this.handleCheckFields(this.state.step);
                    console.tron.log(success, '######()')
                    if(success === true){
                        let step = this.state.step + 1;
                        await this.setState({step : step});
                    }
                }
            }
            else if(this.props.acesso == 'fiscal'){
                if(this.state.step === 2){
                    let step_gp = this.state.step + 5;
                    await this.setState({step : step_gp});
                }
                else{
                    let success = await this.handleCheckFields(this.state.step);
                    console.tron.log(success, '######()')
                    if(success === true){
                        let step = this.state.step + 1;
                        await this.setState({step : step});
                    }
                }

            }
            else{
                let success = await this.handleCheckFields(this.state.step);
                console.tron.log(success, '######()')
                if(success === true){
                    let step = this.state.step + 1;
                    await this.setState({step : step});
                }
            }
        }
        else{
            let success = await this.handleCheckFields(this.state.step);
            if(success === true)
                this.handleSubmit();
        }
    }

    handleBackward = async () => {
        if(this.props.acesso == 'gp'){
            if(this.state.step === 5){
                let step_gp = this.state.step - 3;
                await this.setState({step : step_gp});
            }
            else{
                let step = this.state.step - 1;
                await this.setState({step : step});
            }
        }
        else if(this.props.acesso == 'fiscal'){
            if(this.state.step === 6){
                let step_gp = this.state.step - 5;
                await this.setState({step : step_gp});
            }
            else{
                let step = this.state.step - 1;
                await this.setState({step : step});
            }

        }
        else if(this.state.step > 0){
            let step = this.state.step - 1;
            await this.setState({step : step});
        }
    }
    

    handleSubmit = async () => {    
        if(this.props.acesso === 'fornecedor'){
            let fornecedor = {
                gp : this.state.gp,
                razao_social : this.state.razao_social,
                nome_fantasia : this.state.nome_fantasia,
                endereco : this.state.endereco + ',' + this.state.numero,
                bairro : this.state.bairro,
                cidade : this.state.cidade,
                estado : this.state.estado,
                cep : this.state.cep,
                telefone : this.state.telefone,
                celular : this.state.celular,
                site : this.state.site,
                email : this.state.email,
                nome_responsavel_recebimento : this.state.nome_responsavel_recebimento,
                email_responsavel_recebimento : this.state.email_responsavel_recebimento,
                telefone_responsavel_recebimento : this.state.telefone_responsavel_recebimento,
                cnpj : this.state.cnpj,
                setor_industrial : this.state.setor_industrial,
                regime_tributario : this.state.regime_tributario,
                codigo_banco : this.state.codigo_banco.toString(),
                agencia : this.state.agencia,
                conta : this.state.conta,
                prazo_pagamento : this.state.prazo_pagamento,
                forma_pagamento : this.state.forma_pagamento,
                prazo_entrega : this.state.prazo_entrega,
                valor_minimo_pedido : this.state.valor_minimo_pedido,
                frete : this.state.frete,
                nome_contato_comercial : this.state.nome_contato_comercial,
                email_contato_comercial : this.state.email_contato_comercial,
                cargo_contato_comercial : this.state.cargo_contato_comercial,
                telefone_contato_comercial : this.state.telefone_contato_comercial,
                certificado_qualidade : this.state.certificado_qualidade,
                certificado_ibama : this.state.certificado_ibama,
                certificado_policia_civil : this.state.certificado_policia_civil,
                certificado_bombeiros : this.state.certificado_bombeiros,
                certificado_policia_federal : this.state.certificado_policia_federal,
                certificado_exercito : this.state.certificado_exercito,
                certificado_inmetro : this.state.certificado_inmetro,
                certificado_anvisa : this.state.certificado_anvisa,
                certificado_mapa : this.state.certificado_mapa,
                contrato_estatuto_social : this.state.estatuto_social,
                cartao_cnpj : this.state.cartao_cnpj,
                procuracao : this.state.procuracao,
                comprovante_bancario : this.state.comprovante_bancario,
                certidao_falencia_concordata : this.state.falencia_concordata,
            }
            this.props.fornecedoresActions.addFornecedoresRequest(fornecedor);
        }
        else if(this.props.acesso === 'gp'){

            if(!this.state.has_grupo_economico){
                let rappel = {
                    nome : this.state.grupo_economico,
                    fornecedor_leroy : this.state.supplier_leroy,
                    rappel_faixa_1 : !this.state.supplier_leroy ? this.state.rappel_faixa_1 : 0,
                    rappel_faixa_2 : !this.state.supplier_leroy ? this.state.rappel_faixa_2 : 0,
                    rappel_faixa_3 : !this.state.supplier_leroy ? this.state.rappel_faixa_3 : 0,
                    rappel_faixa_4 : !this.state.supplier_leroy ? this.state.rappel_faixa_4 : 0,
                    rappel_desconto_1 : !this.state.supplier_leroy ? this.state.rappel_desconto_1 : 0,
                    rappel_desconto_2 : !this.state.supplier_leroy ? this.state.rappel_desconto_2 : 0,
                    rappel_desconto_3 : !this.state.supplier_leroy ? this.state.rappel_desconto_3 : 0,
                    rappel_desconto_4 : !this.state.supplier_leroy ? this.state.rappel_desconto_4 : 0,
                }
                
                this.props.gruposEconomicosActions.addGruposEconomicosRequest(rappel);
            }

            let fornecedor = {
                gp : this.state.gp,
                razao_social : this.state.razao_social,
                nome_fantasia : this.state.nome_fantasia,
                endereco :  this.state.endereco + ',' + this.state.numero,
                bairro : this.state.bairro,
                cidade : this.state.cidade,
                estado : this.state.estado,
                cep : this.state.cep,
                telefone : this.state.telefone,
                celular : this.state.celular,
                site : this.state.site,
                email : this.state.email,
                nome_responsavel_recebimento : this.state.nome_responsavel_recebimento,
                email_responsavel_recebimento : this.state.email_responsavel_recebimento,
                telefone_responsavel_recebimento : this.state.telefone_responsavel_recebimento,
                cnpj : this.state.cnpj,
                setor_industrial : this.state.setor_industrial,
                regime_tributario : this.state.regime_tributario,
                codigo_banco : this.state.codigo_banco.toString(),
                agencia : this.state.agencia,
                conta : this.state.conta,
                prazo_pagamento : this.state.prazo_pagamento,
                forma_pagamento : this.state.forma_pagamento,
                prazo_entrega : this.state.prazo_entrega,
                valor_minimo_pedido : this.state.valor_minimo_pedido,
                frete : this.state.frete,
                nome_contato_comercial : this.state.nome_contato_comercial,
                email_contato_comercial : this.state.email_contato_comercial,
                cargo_contato_comercial : this.state.cargo_contato_comercial,
                telefone_contato_comercial : this.state.telefone_contato_comercial,                
                grupo_economico : this.state.grupo_economico,
                contrato : this.state.contrato,
                status_contrato : this.state.status_contrato,
                taxa_antecipacao : this.state.taxa_antecipacao,
                pedido_enxoval : this.state.pedido_enxoval,
                pedido_espelho : this.state.pedido_espelho,
                pedido_exposicao : this.state.pedido_exposicao,
                teto_pedido_enxoval : this.state.teto_pedido_enxoval,
                duracao_contrato : this.state.duracao_contrato,
                desconto_abertura : this.state.desconto_abertura,        
                pendencia : 'gp',
            }
            this.props.fornecedoresActions.updateFornecedoresRequest(fornecedor);
        }


        else if(this.props.acesso === 'fiscal'){

            let fornecedor = {
                gp : this.state.gp,
                razao_social : this.state.razao_social,
                nome_fantasia : this.state.nome_fantasia,
                endereco :  this.state.endereco + ',' + this.state.numero,
                bairro : this.state.bairro,
                cidade : this.state.cidade,
                estado : this.state.estado,
                cep : this.state.cep,
                telefone : this.state.telefone,
                celular : this.state.celular,
                site : this.state.site,
                email : this.state.email,
                nome_responsavel_recebimento : this.state.nome_responsavel_recebimento,
                email_responsavel_recebimento : this.state.email_responsavel_recebimento,
                telefone_responsavel_recebimento : this.state.telefone_responsavel_recebimento,
                cnpj : this.state.cnpj,
                setor_industrial : this.state.setor_industrial,
                regime_tributario : this.state.regime_tributario,
                codigo_banco : this.state.codigo_banco.toString(),
                agencia : this.state.agencia,
                conta : this.state.conta,
                prazo_pagamento : this.state.prazo_pagamento,
                forma_pagamento : this.state.forma_pagamento,
                prazo_entrega : this.state.prazo_entrega,
                valor_minimo_pedido : this.state.valor_minimo_pedido,
                frete : this.state.frete,
                nome_contato_comercial : this.state.nome_contato_comercial,
                email_contato_comercial : this.state.email_contato_comercial,
                cargo_contato_comercial : this.state.cargo_contato_comercial,
                telefone_contato_comercial : this.state.telefone_contato_comercial,                
                taxa_antecipacao : this.state.taxa_antecipacao,
                pedido_enxoval : this.state.pedido_enxoval,
                pedido_espelho : this.state.pedido_espelho,
                pedido_exposicao : this.state.pedido_exposicao,
                teto_pedido_enxoval : this.state.teto_pedido_enxoval,
                duracao_contrato : this.state.duracao_contrato,
                desconto_abertura : this.state.desconto_abertura,        
                pendencia : 'fiscal',
            }
            this.props.fornecedoresActions.updateFornecedoresRequest(fornecedor);
        }

        
    }

    handleCheckFields = async (step) => {
        if(step === 0){
            if(this.props.endereco != null)
                await this.setState({endereco : this.props.endereco.logradouro, bairro : this.props.endereco.bairro, cidade : this.props.endereco.localidade, estado : this.props.endereco.uf});
            console.tron.log('cep', this.state.cep.length)
            let success = true;

            if(this.state.gp.length > 0){this.setState({gp_error : false});} else{this.setState({gp_error : true});success = false;}  
            if(await this.handleCheckCNPJ(this.state.cnpj) === true){this.setState({cnpj_error : false});} else{this.setState({cnpj_error : true});success = false;}  
            if( this.state.nome_fantasia.length > 0){this.setState({nome_fantasia_error : false});} else{this.setState({nome_fantasia_error : true});success = false;} 
            if(this.state.razao_social.length > 0){this.setState({razao_social_error: false});} else{this.setState({razao_social_error : true});success = false;}
            if(this.state.cep.replace('-', '').length === 8){this.setState({cep_error : false});} else{this.setState({cep_error : true});success = false;}  
            if(this.state.endereco.length > 0){this.setState({endereco_error : false});} else{this.setState({endereco_error : true});success = false;}
            if(this.state.bairro.length > 0){this.setState({bairro_error : false});} else{this.setState({bairro_error : true});success = false;}
            if(this.state.numero > 0){this.setState({numero_error : false});} else{this.setState({numero_error : true});success = false;}
            if(this.state.estado.length > 0){this.setState({estado_error : false});} else{this.setState({estado_error : true});success = false;}  
            if(this.state.cidade.length > 0){this.setState({cidade_error : false});} else{this.setState({cidade_error : true});success = false;}             
            if(this.state.celular.length > 9){this.setState({celular_error : false});} else{this.setState({celular_error : true});success = false;}  
            if(this.state.telefone.length > 9){this.setState({telefone_error : false});} else{this.setState({telefone_error : true});success = false;}  
            if(this.state.site.length > 0){this.setState({site_error : false});} else{this.setState({site_error : true});success = false;}  
            if(await this.handleCheckEmail(this.state.email) === true){console.log("acertou"); this.setState({email_error : false});} else{console.log("errouuu");  this.setState({email_error : true});success = false;}  
            //success = true;
            return success;
        }

        if(step === 1){
            let success = true;

            if(this.state.nome_responsavel_recebimento.length > 0){this.setState({nome_responsavel_recebimento_error : false});} else{this.setState({nome_responsavel_recebimento_error : true});success = false;}  
            if(await this.handleCheckEmail(this.state.email_responsavel_recebimento) === true){this.setState({email_responsavel_recebimento_error : false});} else{this.setState({email_responsavel_recebimento_error : true});success = false;}  
            if(this.state.telefone_responsavel_recebimento.length > 9){this.setState({telefone_responsavel_recebimento_error : false});} else{this.setState({telefone_responsavel_recebimento_error : true});success = false;}  
            if(this.state.nome_contato_comercial.length > 0){this.setState({nome_contato_comercial_error : false});} else{this.setState({nome_contato_comercial_error : true});success = false;}  
            if(await this.handleCheckEmail(this.state.email_contato_comercial) === true){this.setState({email_contato_comercial_error : false});} else{this.setState({email_contato_comercial_error : true});success = false;}  
            if(this.state.cargo_contato_comercial.length > 0){this.setState({cargo_contato_comercial_error : false});} else{this.setState({cargo_contato_comercial_error : true});success = false;}  
            if(this.state.telefone_contato_comercial.length > 9){this.setState({telefone_contato_comercial_error : false});} else{this.setState({telefone_contato_comercial_error : true});success = false;}  
            //success = true;
            return success;
        }

        if(step === 2){
            let success = true;
            
            if(this.state.setor_industrial.length > 0){this.setState({setor_industrial_error : false});} else{this.setState({setor_industrial_error : true});success = false;}  
            if(this.state.regime_tributario.length > 0){this.setState({regime_tributario_error : false});} else{this.setState({regime_tributario_error : true});success = false;}  
            if(this.state.codigo_banco != null){this.setState({codigo_banco_error : false});} else{this.setState({codigo_banco_error : true});success = false;}  
            if(this.state.agencia.length == 4){this.setState({agencia_error : false});} else{this.setState({agencia_error : true});success = false;}  
            if(this.state.conta.length == 7){this.setState({conta_error : false});} else{this.setState({conta_error : true});success = false;}  
            // if(this.state.prazo_pagamento.length > 0){this.setState({prazo_pagamento_error : false});} else{this.setState({prazo_pagamento_error : true});success = false;}  
            // if(this.state.forma_pagamento.length > 0){this.setState({forma_pagamento_error : false});} else{this.setState({forma_pagamento_error : true});success = false;}  
            if(this.state.prazo_entrega != null && this.state.prazo_entrega > 0){this.setState({prazo_entrega_error : false});} else{this.setState({prazo_entrega_error : true});success = false;} 
            if(this.state.valor_minimo_pedido > 0){this.setState({valor_minimo_pedido_error : false});} else{this.setState({valor_minimo_pedido_error : true});success = false;} 
            // if(this.state.frete.length > 0){this.setState({frete_error : false});} else{this.setState({frete_error : true});success = false;} 

            console.tron.log( success, 'sucesso')
            //success = true;
            return success;
        }

        if(step === 3){
            let success = true;
            
            if(this.state.possui_certificado_qualidade === true){
                if(this.state.certificado_qualidade.length > 0){this.setState({certificado_qualidade_error : false});} else{this.setState({certificado_qualidade_error : true});success = false;}  
            }
            else{
                this.setState({certificado_qualidade_error : false});
            }

            if(this.state.possui_certificado_ibama === true){
                if(this.state.certificado_ibama.length > 0){this.setState({certificado_ibama_error : false});} else{this.setState({certificado_ibama_error : true});success = false;}  
            }
            else{
                this.setState({certificado_ibama_error : false});
            }

            if(this.state.possui_certificado_policia_civil === true){
                if(this.state.certificado_policia_civil.length > 0){this.setState({certificado_policia_civil_error : false});} else{this.setState({certificado_policia_civil_error : true});success = false;}  
            }
            else{
                this.setState({certificado_policia_civil_error : false});
            }

            if(this.state.possui_certificado_bombeiros === true){
                if(this.state.certificado_bombeiros.length > 0){this.setState({certificado_bombeiros_error : false});} else{this.setState({certificado_bombeiros_error : true});success = false;}  
            }
            else{
                this.setState({certificado_bombeiros_error : false});
            }

            if(this.state.possui_certificado_policia_federal === true){
                if(this.state.certificado_policia_federal.length > 0){this.setState({certificado_policia_federal_error : false});} else{this.setState({certificado_policia_federal_error : true});success = false;}  
            }
            else{
                this.setState({certificado_policia_federal_error : false});
            }
            
            if(this.state.possui_certificado_exercito === true){
                if(this.state.certificado_exercito.length > 0){this.setState({certificado_exercito_error : false});} else{this.setState({certificado_exercito_error : true});success = false;}  
            }
            else{
                this.setState({certificado_exercito_error : false});
            }

            if(this.state.possui_certificado_anvisa === true){
                if(this.state.certificado_anvisa.length > 0){this.setState({certificado_anvisa_error : false});} else{this.setState({certificado_anvisa_error : true});success = false;}  
            }
            else{
                this.setState({certificado_anvisa_error : false});
            }

            if(this.state.possui_certificado_inmetro === true){
                if(this.state.certificado_inmetro.length > 0){this.setState({certificado_inmetro_error : false});} else{this.setState({certificado_inmetro_error : true});success = false;}  
            }
            else{
                this.setState({certificado_inmetro_error : false});
            }

            if(this.state.possui_certificado_mapa === true){
                if(this.state.certificado_mapa.length > 0){this.setState({certificado_mapa_error : false});} else{this.setState({certificado_mapa_error : true});success = false;}  
            }
            else{
                this.setState({certificado_mapa_error : false});
            }

            return success;
        }

        if(step === 4){
            let success = true;

            if(this.state.cartao_cnpj.length > 0){this.setState({cartao_cnpj_error : false});} else{this.setState({cartao_cnpj_error : true});success = false;} 
            if(this.state.comprovante_bancario.length > 0){this.setState({comprovante_bancario_error : false});} else{this.setState({comprovante_bancario_error : true});success = false;}   
            if(this.state.falencia_concordata.length > 0){this.setState({falencia_concordata_error : false});} else{this.setState({falencia_concordata_error : true});success = false;}   
            //success = true;
            return success;
        }

        if(step === 5){
            let success = true;

            if(this.state.grupo_economico.length > 0){this.setState({grupo_economico_error : false});} else{this.setState({grupo_economico_error : true});success = false;}

            if(!this.state.supplier_leroy){
                if(this.state.rappel_desconto_1 > 0){this.setState({rappel_desconto_1_error : false});} else{this.setState({rappel_desconto_1_error : true});success = false;} 
                if(this.state.rappel_desconto_2 > 0){this.setState({rappel_desconto_2_error : false});} else{this.setState({rappel_desconto_2_error : true});success = false;}
                if(this.state.rappel_desconto_3 > 0){this.setState({rappel_desconto_3_error : false});} else{this.setState({rappel_desconto_3_error : true});success = false;}   
                if(this.state.rappel_desconto_4 > 0){this.setState({rappel_desconto_4_error : false});} else{this.setState({rappel_desconto_4_error : true});success = false;}

                if(this.state.rappel_faixa_1 > 0){this.setState({rappel_faixa_1_error : false});} else{this.setState({rappel_faixa_1_error : true});success = false;} 
                if(this.state.rappel_faixa_2 > 0){this.setState({rappel_faixa_2_error : false});} else{this.setState({rappel_faixa_2_error : true});success = false;}
                if(this.state.rappel_faixa_3 > 0){this.setState({rappel_faixa_3_error : false});} else{this.setState({rappel_faixa_3_error : true});success = false;}   
                if(this.state.rappel_faixa_4 > 0){this.setState({rappel_faixa_4_error : false});} else{this.setState({rappel_faixa_4_error : true});success = false;}
            }
            else{
                this.setState({rappel_desconto_1_error : false});
                this.setState({rappel_desconto_2_error : false});
                this.setState({rappel_desconto_3_error : false});
                this.setState({rappel_desconto_4_error : false});
                this.setState({rappel_faixa_1_error : false});
                this.setState({rappel_faixa_2_error : false});
                this.setState({rappel_faixa_3_error : false});
                this.setState({rappel_faixa_4_error : false});
            }
            
            
            //success = true;
            return success;
        }

        if(step === 6){
            let success = true;

            if(this.state.contrato.length > 0 || this.state.status_contrato === 'SEM CONTRATO'){this.setState({contrato_error : false});} else{this.setState({contrato_error : true});success = false;}
            if(this.state.status_contrato.length > 0){this.setState({status_contrato_error : false});} else{this.setState({status_contrato_error : true});success = false;}
            
            //success = true;
            return success;
        }

        if(step === 7){
            let success = true;

            if(this.state.taxa_antecipacao > 0){this.setState({taxa_antecipacao_error : false});} else{this.setState({taxa_antecipacao_error : true});success = false;}
            
            if (this.state.pedido_enxoval){
                if(this.state.teto_pedido_enxoval > 0){this.setState({teto_pedido_enxoval_error : false});}
                else{this.setState({teto_pedido_enxoval_error : true});success = false;}
            }
            else{
                this.setState({pedido_enxoval_error : false});
            }

            if(this.state.duracao_contrato > 0){this.setState({duracao_contrato_error : false});} else{this.setState({duracao_contrato_error : true});success = false;}
            if(this.state.desconto_abertura > 0){this.setState({desconto_abertura_error : false});} else{this.setState({desconto_abertura_error : true});success = false;}

            //success = true;
            return success;
        }
    }

    handleCheckEmail = async (email) => {
        var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let test = await reg.test(email);
        console.log(test);
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
            this.props.fornecedores.loading || this.props.grupos_economicos.loading ?
            <Loading></Loading> :
            <div>
                {this.state.fail ? Error("Erro no envio dos dados, tente novamente...") : ''}
                <Steps current={this.state.step}>
                    <Step title="Básico            "/>
                    <Step title="Contatos          "/>
                    <Step title="Financeiro        "/>
                    <Step title="Certificados      "/>
                    <Step title="Documentos        "/>
                    {this.props.acesso != 'fornecedor' ?
                    <Step title="Rappel      "/> : ''}
                    {this.props.acesso != 'fornecedor' ?
                    <Step title="Contrato           "/> : ''}
                    {this.props.acesso != 'fornecedor' ?
                    <Step title="Inauguração        "/> : ''}
                </Steps>

            {/* informacoes basicas */}

                {this.state.step === 0 ?
                    <div className="background-form">
                        <Row className="row">
                            <Col span={11}>
                                <label className={this.state.gp_error ? 'label_error' : 'label'} >Gerente Responsável {this.state.gp_error ? ' *' : ''}</label>
                                <Select value={this.state.gp} className="select" onChange={(e) => { this.setState({gp : e})}}>
                                    <Option value="Bruna">Bruna</Option>
                                    <Option value="Carla">Carla</Option>
                                    <Option value="Daniela">Daniela</Option>
                                    <Option value="Thais">Thais</Option>
                                </Select>
                            </Col>
                            <Col span={2}></Col>
                            <Col span={11}>      
                            <label className={this.state.cnpj_error ? 'label_error' : 'label'} >CNPJ {this.state.cnpj_error ? ' *' : ''}</label>
                                <InputMask disabled={this.props.acesso === 'fornecedor' ? false : true} value={this.state.cnpj} onChange={(e) => { this.setState({cnpj : e.target.value})}} className="ant-input input" {...this.props} mask="99.999.999/9999-99" maskChar=" " />                           
                            </Col>
                        </Row>
                        <Row className="row">
                            <Col span={11}>
                                <label className={this.state.nome_fantasia_error ? 'label_error' : 'label'} >Nome Fantasia {this.state.nome_fantasia_error ? ' *' : ''}</label>
                                <Input value={this.state.nome_fantasia} onChange={(e) => { this.setState({nome_fantasia : e.target.value})}} className="input"></Input>
                            </Col>
                            <Col span={2}></Col>
                            <Col span={11}>
                                <label className={this.state.razao_social_error ? 'label_error' : 'label'} >Razao Social {this.state.razao_social_error ? ' *' : ''}</label>
                                <Input  value={this.state.razao_social} onChange={(e) => { this.setState({razao_social : e.target.value})}} className="input"></Input>                            
                            </Col>
                        </Row>                    
                        <Row className="row">                        
                            <Col span={4}>
                                <label className={this.state.cep_error ? 'label_error' : 'label'} >CEP {this.state.cep_error ? ' *' : ''}</label>
                                <InputMask  value={this.state.cep}  onBlur={() => { this.handleGetAdress() }} onChange={(e) => { this.handleGetCep(e) }} className="ant-input input" {...this.props} mask="99999-999" maskChar=" " />                            
                            </Col>                        
                            <Col span={1}></Col>
                            <Col span={7}>
                                <label className={this.state.endereco_error ? 'label_error' : 'label'} >Endereco {this.state.endereco_error ? ' *' : ''}</label>
                                <Input value={this.props.endereco === null ? '' : this.props.endereco.logradouro} disabled className="input"></Input>
                            </Col>
                            <Col span={1}></Col>
                            <Col span={7}>
                                <label className={this.state.bairro_error ? 'label_error' : 'label'} >Bairro {this.state.bairro_error ? ' *' : ''}</label>
                                <Input value={this.props.endereco === null ? '' : this.props.endereco.bairro} disabled className="input"></Input>
                            </Col>
                            <Col span={1}></Col>
                            <Col span={3}>
                                <label className={this.state.numero_error ? 'label_error' : 'label'} >Numero {this.state.numero_error ? ' *' : ''}</label>
                                <InputMask  value={this.state.numero} onChange={(e) => { this.setState({numero : e.target.value})}} className="ant-input input" {...this.props} mask="999999" maskChar=" " />  
                            </Col>
                        </Row>
                        <Row className="row">                        
                            <Col span={11}>
                                <label className={this.state.estado_error ? 'label_error' : 'label'} >Estado {this.state.estado_error ? ' *' : ''}</label>
                                <Input value={this.props.endereco === null ? '' : this.props.endereco.uf} disabled className="input"></Input>
                            </Col>                        
                            <Col span={2}></Col>
                            <Col span={11}>
                                <label className={this.state.cidade_error ? 'label_error' : 'label'} >Cidade {this.state.cidade_error ? ' *' : ''}</label>
                                <Input value={this.props.endereco === null ? '' : this.props.endereco.localidade} disabled className="input"></Input>
                            </Col>
                        </Row>
                        <Row className="row">                        
                            <Col span={11}>
                                <label className={this.state.telefone_error ? 'label_error' : 'label'} >Telefone {this.state.telefone_error ? ' *' : ''}</label>
                                <InputMask  value={this.state.telefone} onChange={(e) => { this.setState({telefone : e.target.value})}} className="ant-input input" {...this.props} mask="+5\5 99 9999 99999" maskChar=" " />
                            </Col>                        
                            <Col span={2}></Col>
                            <Col span={11}>
                                <label className={this.state.celular_error ? 'label_error' : 'label'} >Celular {this.state.celular_error ? ' *' : ''}</label>
                                <InputMask  value={this.state.celular} onChange={(e) => { this.setState({celular : e.target.value})}} className="ant-input input" {...this.props} mask="+5\5 99 9999 99999" maskChar=" " />
                            </Col>
                        </Row>
                        <Row className="row">                        
                            <Col span={11}>
                                <label className={this.state.site_error ? 'label_error' : 'label'} >Site {this.state.site_error ? ' *' : ''}</label>
                                <Input  value={this.state.site} onChange={(e) => { this.setState({site : e.target.value})}} className="input"></Input>
                            </Col>                        
                            <Col span={2}></Col>
                            <Col span={11}>
                                <label className={this.state.email_error ? 'label_error' : 'label'} >E-mail {this.state.email_error ? ' *' : ''}</label>
                                <Input  value={this.state.email} onChange={(e) => { this.setState({email : e.target.value})}} className="input" type="email" ></Input>
                            </Col>
                        </Row>                      
                        
                    </div>
                : ''}


                {/* Contatos */}

                {this.state.step === 1 ?
                    <div className="background-form">
                        <Row className="row">
                            <Col span={11}>
                                <label className={this.state.nome_responsavel_recebimento_error ? 'label_error' : 'label'} >Nome responsável recebimento{this.state.nome_responsavel_recebimento_error ? ' *' : ''}</label>
                                <Input  value={this.state.nome_responsavel_recebimento}  onChange={(e) => { this.setState({nome_responsavel_recebimento : e.target.value})}} className="input"></Input>
                            </Col>
                            <Col span={2}></Col>
                            <Col span={11}>   
                                <label className={this.state.email_responsavel_recebimento_error ? 'label_error' : 'label'} >E-mail responsável recebimento{this.state.email_responsavel_recebimento_error ? ' *' : ''}</label> 
                                <Input  value={this.state.email_responsavel_recebimento} onChange={(e) => { this.setState({email_responsavel_recebimento : e.target.value})}} className="input" type="email" ></Input>                      
                            </Col>
                        </Row>
                        <Row className="row">
                            <Col span={11}>
                                <label className={this.state.telefone_responsavel_recebimento_error ? 'label_error' : 'label'} >Telefone responsável recebimento{this.state.telefone_responsavel_recebimento_error ? ' *' : ''}</label> 
                                <InputMask  value={this.state.telefone_responsavel_recebimento} onChange={(e) => { this.setState({telefone_responsavel_recebimento : e.target.value})}} className="ant-input input" {...this.props} mask="+5\5 99 9999 99999" maskChar=" " />
                            </Col>
                            <Col span={2}></Col>
                            <Col span={11}>                           
                            </Col>
                        </Row>                    
                        <Row className="row">                        
                            <Col span={11}>
                                <label className={this.state.nome_contato_comercial_error ? 'label_error' : 'label'} >Nome contato comercial{this.state.nome_contato_comercial_error ? ' *' : ''}</label>
                                <Input  value={this.state.nome_contato_comercial} onChange={(e) => { this.setState({nome_contato_comercial : e.target.value})}} className="input"></Input>                            
                            </Col>                        
                            <Col span={2}></Col>
                            <Col span={11}>
                                <label className={this.state.email_contato_comercial_error ? 'label_error' : 'label'} >E-mail contato comercial{this.state.email_contato_comercial_error ? ' *' : ''}</label>
                                <Input  value={this.state.email_contato_comercial} onChange={(e) => { this.setState({email_contato_comercial : e.target.value})}} className="input" type="email"></Input>   
                            </Col>
                        </Row>
                        <Row className="row">                        
                            <Col span={11}>
                                <label className={this.state.telefone_contato_comercial_error ? 'label_error' : 'label'} >Telefone contato comercial{this.state.telefone_contato_comercial_error ? ' *' : ''}</label>
                                <InputMask value={this.state.telefone_contato_comercial} onChange={(e) => { this.setState({telefone_contato_comercial : e.target.value})}}  className="ant-input input" {...this.props} mask="+5\5 99 9999 99999" maskChar=" " />
                            </Col>                        
                            <Col span={2}></Col>
                            <Col span={11}>
                                <label className={this.state.cargo_contato_comercial_error ? 'label_error' : 'label'} >Cargo contato comercial{this.state.cargo_contato_comercial_error ? ' *' : ''}</label>
                                <Input  value={this.state.cargo_contato_comercial} onChange={(e) => { this.setState({cargo_contato_comercial : e.target.value})}} className="input"></Input>
                            </Col>
                        </Row>                                 
                        
                    </div>
                : ''}

                  {/* Financeiro */}

                  {this.state.step === 2 ?
                    <div className="background-form">
                        <Row className="row">
                            <Col span={11}>
                                <label className={this.state.setor_industrial_error ? 'label_error' : 'label'} >Setor industrial{this.state.setor_industrial_error ? ' *' : ''}</label>
                                <Select  value={this.state.setor_industrial} className="select" onChange={(e) => { this.setState({setor_industrial : e})}}>
                                    <Option value="distribuidor">Distribuidor</Option>
                                    <Option value="fabricante">Fabricante</Option>
                                    <Option value="fabricante simples">Fabricante simples</Option>
                                    <Option value="importador">Importador</Option>
                                </Select>
                            </Col>
                            <Col span={2}></Col>
                            <Col span={11}>
                                <label className={this.state.regime_tributario_error ? 'label_error' : 'label'} >Regime tributário{this.state.regime_tributario_error ? ' *' : ''}</label>
                                <Select  value={this.state.regime_tributario} className="select" onChange={(e) => { this.setState({regime_tributario : e})}}>
                                    <Option value="normal">Normal</Option>
                                    <Option value="microempresa">Microempresa</Option>
                                    <Option value="epp">Epp</Option>
                                    <Option value="outros">Outros</Option>
                                </Select>
                            </Col>
                        </Row>
                        <Row className="row">
                            <Col span={7}>
                                <label className={this.state.codigo_banco_error ? 'label_error' : 'label'} >Banco{this.statecodigo_banco_error ? ' *' : ''}</label>
                                <Select  value={this.state.codigo_banco} className="select" onChange={(e) => { this.setState({codigo_banco : e})}}>
                                    {this.props.bancos === null ? <Option value=""></Option> : 
                                    this.props.bancos.map((banco) => <Option value={banco.Codigo}>{banco.Nome}</Option>)}                                    
                                </Select>
                            </Col>
                            <Col span={2}></Col>
                            <Col span={7}>
                                <label className={this.state.agencia_error ? 'label_error' : 'label'} >Agencia{this.state.agencia_error ? ' *' : ''}</label>
                                <InputMask  value={this.state.agencia} onChange={(e) => { this.setState({agencia : e.target.value})}} className="ant-input input" {...this.props} mask="9999" maskChar=" " />                               
                            </Col>   
                            <Col span={1}></Col>
                            <Col span={7}>
                                <label className={this.state.conta_error ? 'label_error' : 'label'} >Conta{this.state.conta_error ? ' *' : ''}</label>
                                <InputMask  value={this.state.conta} onChange={(e) => { this.setState({conta : e.target.value})}} className="ant-input input" {...this.props} mask="99999-9" maskChar=" " />                           
                            </Col>  
                        </Row>
                        <Row className="row">
                            <Col span={4}>                                
                                <label className="label">Prazo de pagamento</label>
                                <Input  value={this.state.prazo_pagamento} className="ant-input input" disabled />  
                            </Col>
                            <Col span={1}></Col>
                            <Col span={4}>
                                <label className="label">Forma de pagamento</label>
                                <Input value={this.state.forma_pagamento} className="ant-input input" disabled />   
                            </Col>
                            <Col span={1}></Col>
                            <Col span={4}>
                                <label className={this.state.prazo_entrega_error ? 'label_error' : 'label'}>Prazo de entrega{this.state.prazo_entrega_error ? ' *' : ''}</label>
                                <InputMask  value={this.state.prazo_entrega} onChange={(e) => { this.setState({prazo_entrega : parseFloat(e.target.value)})}} className="ant-input input" {...this.props} mask="999" maskChar=" " />   
                            </Col>
                            <Col span={1}></Col>
                            <Col span={4}>
                                <label className={this.state.valor_minimo_pedido_error ? 'label_error' : 'label'} >Valor minimo pedido{this.state.valor_minimo_pedido_error ? ' *' : ''}</label>
                                <CurrencyInput className="ant-input input" value={this.state.valor_minimo_pedido} onChange={(event, maskedvalue, floatvalue) => { this.setState({valor_minimo_pedido :maskedvalue})}} prefix="R$" decimalSeparator="," thousandSeparator="." />
                            </Col>
                            <Col span={1}></Col>
                            <Col span={4}>
                                <label className="label">Frete</label>
                                <Input value={this.state.frete} className="ant-input input" disabled />   
                            </Col>
                        </Row>                       
                                             
                        
                    </div>
                : ''}

                 {/* Certificados */}

                 {this.state.step === 3 ?
                    <div className="background-form">
                        <Checkbox checked={this.state.certificados}  onChange={(e) => { this.setState({certificados : e.target.checked})}}>FORNECE PRODUTOS CONTROLADOS, NORMATIZADOS, CERTIFICADOS, QUÍMICOS, PERECÍVEIS OU PERIGOSOS?</Checkbox>
                        
                        {this.state.certificados ? 
                            <div>
                                <br></br>
                                <Row><Divider >Insira TODOS certificados aplicáveis a seus produtos</Divider></Row>
                                <br></br>
                                <Row className="row">                                                              
                                    <Col span={12}>
                                        <Checkbox  className={this.state.certificado_qualidade_error ? 'label_error' : 'label'} checked={this.state.possui_certificado_qualidade} onChange={(e) => { this.setState({possui_certificado_qualidade : e.target.checked})}}>Empresa possui CERTIFICADO DE QUALIDADE? Exemplo ISO, SGS, ETC … ?</Checkbox>
                                    </Col>
                                    <Col span={2}>
                                        <Divider type="vertical" />
                                    </Col>  
                                    <Col span={10}>
                                        {this.state.possui_certificado_qualidade ?
                                            <div>
                                                <input
                                                // accept="application/pdf"
                                                multiple
                                                className="invisible"
                                                id="selecao-arquivo-1"
                                                type="file"
                                                onChange={async event => {
                                                    let files = event.target.files;
                                                    
                                                    let file_names = [];
                                                    let file_contents = [];
                                                    console.tron.log(files.length);
                                                    for (let i = 0; i < files.length; i++) {
                                                        let reader = new FileReader();
                                                        await reader.readAsDataURL(files[i]);
                                                        file_names.push(files[i].name);
                                                        reader.onload = async e => {await file_contents.push(e.target.result)};
                                                    }                                                    
                                                    await this.setState({
                                                        certificado_qualidade_name: file_names,
                                                        certificado_qualidade: file_contents,
                                                    });
                                                }}
                                                />
                                                <label className="documentos button ant-btn" for="selecao-arquivo-1" >
                                                Upload Certificado(s) de Qualidade &#187;
                                                {this.state.certificado_qualidade_name.length >= 1 ? <span> Arquivos Processados ({this.state.certificado_qualidade_name.length}) </span> : '' }
                                                </label>
                                            </div>
                                        : ''}
                                    </Col>
                                    
                                </Row>
                                <Row><Divider></Divider></Row>
                                <Row className="row">                                                              
                                    <Col span={12}>
                                        <Checkbox className={this.state.certificado_ibama_error ? 'label_error' : 'label'} checked={this.state.possui_certificado_ibama} onChange={(e) => { this.setState({possui_certificado_ibama : e.target.checked})}}>Fornece produtos sob vigilância, controle e/ou fiscalização do IBAMA?</Checkbox>
                                    </Col>
                                    <Col span={2}>
                                        <Divider type="vertical" />
                                    </Col>  
                                    <Col span={10}>
                                        {this.state.possui_certificado_ibama ?
                                        <div>
                                            <input
                                            // accept="application/pdf"
                                            className="invisible"
                                            id="selecao-arquivo-2"
                                            type="file"
                                            onChange={event => {
                                                let files = event.target.files;
                                                let reader = new FileReader();
                                                reader.readAsDataURL(files[0]);
                                                reader.onload = e => {
                                                this.setState({
                                                    certificado_ibama_name: files[0].name,
                                                    certificado_ibama: e.target.result,
                                                });
                                                };
                                            }}
                                            />
                                           <label className="documentos  button ant-btn" for="selecao-arquivo-2" >
                                            Upload Certificado Ibama &#187;
                                            <span>{this.state.certificado_ibama_name}</span>
                                            </label>
                                        </div> : ''}
                                    </Col>                                    
                                </Row>
                                <Row><Divider></Divider></Row>
                                <Row className="row">                                                              
                                    <Col span={12}>
                                        <Checkbox className={this.state.certificado_policia_civil_error ? 'label_error' : 'label'} checked={this.state.possui_certificado_policia_civil} onChange={(e) => { this.setState({possui_certificado_policia_civil : e.target.checked})}}>Fornece produtos sob vigilância, controle e/ou fiscalização da POLÍCIAL CIVIL?</Checkbox>
                                    </Col>
                                    <Col span={2}>
                                        <Divider type="vertical" />
                                    </Col>  
                                    <Col span={10}>
                                        {this.state.possui_certificado_policia_civil ?
                                        <div>
                                            <input
                                            // accept="application/pdf"
                                            className="invisible"
                                            id="selecao-arquivo-3"
                                            type="file"
                                            onChange={event => {
                                                let files = event.target.files;
                                                let reader = new FileReader();
                                                reader.readAsDataURL(files[0]);
                                                reader.onload = e => {
                                                this.setState({
                                                    certificado_policia_civil_name: files[0].name,
                                                    certificado_policia_civil: e.target.result,
                                                });
                                                };
                                            }}
                                            />
                                            <label className="documentos button ant-btn" for="selecao-arquivo-3">
                                            Upload Certificado Policia Civil &#187;
                                            <span>{this.state.certificado_policia_civil_name}</span>
                                            </label>
                                        </div> 
                                    : ''}
                                        
                                    </Col>                                    
                                </Row>
                                <Row><Divider></Divider></Row>
                                <Row className="row">                                                              
                                    <Col span={12}>
                                        <Checkbox className={this.state.certificado_bombeiros_error ? 'label_error' : 'label'} checked={this.state.possui_certificado_bombeiros} onChange={(e) => { this.setState({possui_certificado_bombeiros : e.target.checked})}}>Fornece produtos sob vigilância, controle e/ou fiscalização do CORPO DE BOMBEIROS?</Checkbox>
                                    </Col>
                                    <Col span={2}>
                                        <Divider type="vertical" />
                                    </Col>  
                                    <Col span={10}>
                                        {this.state.possui_certificado_bombeiros ?
                                        <div>
                                            <input
                                            // accept="application/pdf"
                                            className="invisible"
                                            id="selecao-arquivo-4"
                                            type="file"
                                            onChange={event => {
                                                let files = event.target.files;
                                                let reader = new FileReader();
                                                reader.readAsDataURL(files[0]);
                                                reader.onload = e => {
                                                this.setState({
                                                    certificado_bombeiros_name: files[0].name,
                                                    certificado_bombeiros: e.target.result,
                                                });
                                                };
                                            }}
                                            />
                                            <label className="documentos button ant-btn" for="selecao-arquivo-4" >
                                            Upload Certificado Bombeiros &#187;
                                            <span>{this.state.certificado_bombeiros_name}</span>
                                            </label>
                                        </div> 
                                    : ''}
                                        
                                    </Col>                                    
                                </Row>
                                <Row><Divider></Divider></Row>
                                <Row className="row">                                                              
                                    <Col span={12}>
                                        <Checkbox className={this.state.certificado_policia_federal_error ? 'label_error' : 'label'} checked={this.state.possui_certificado_policia_federal} onChange={(e) => { this.setState({possui_certificado_policia_federal : e.target.checked})}}>Fornece produtos sob vigilância, controle e/ou fiscalização da POLÍCIAL FEDERAL?</Checkbox>
                                    </Col>
                                    <Col span={2}>
                                        <Divider type="vertical" />
                                    </Col>  
                                    <Col span={10}>
                                        {this.state.possui_certificado_policia_federal ?
                                        <div>
                                            <input
                                            // accept="application/pdf"
                                            className="invisible"
                                            id="selecao-arquivo-5"
                                            type="file"
                                            onChange={event => {
                                                let files = event.target.files;
                                                let reader = new FileReader();
                                                reader.readAsDataURL(files[0]);
                                                reader.onload = e => {
                                                this.setState({
                                                    certificado_policia_federal_name: files[0].name,
                                                    certificado_policia_federal: e.target.result,
                                                });
                                                };
                                            }}
                                            />
                                            <label className="documentos button ant-btn" for="selecao-arquivo-5" >
                                            Upload Certificado Policia Federal &#187;
                                            <span>{this.state.certificado_policia_federal_name}</span>
                                            </label>
                                        </div> 
                                    : ''}
                                        
                                    </Col>                                    
                                </Row>
                                <Row><Divider></Divider></Row>
                                <Row className="row">                                                              
                                    <Col span={12}>
                                        <Checkbox className={this.state.certificado_inmetro_error ? 'label_error' : 'label'} checked={this.state.possui_certificado_inmetro} onChange={(e) => { this.setState({possui_certificado_inmetro : e.target.checked})}}>Fornece produtos sob vigilância, controle e/ou fiscalização do INMETRO?</Checkbox>
                                    </Col>
                                    <Col span={2}>
                                        <Divider type="vertical" />
                                    </Col>  
                                    <Col span={10}>
                                        {this.state.possui_certificado_inmetro ?
                                        <div>
                                            <input
                                            // accept="application/pdf"
                                            className="invisible"
                                            id="selecao-arquivo-6"
                                            type="file"
                                            onChange={event => {
                                                let files = event.target.files;
                                                let reader = new FileReader();
                                                reader.readAsDataURL(files[0]);
                                                reader.onload = e => {
                                                this.setState({
                                                    certificado_inmetro_name: files[0].name,
                                                    certificado_inmetro: e.target.result,
                                                });
                                                };
                                            }}
                                            />
                                           <label className="documentos button ant-btn" for="selecao-arquivo-6" >
                                            Upload Certificado Inmetro &#187;
                                            <span>{this.state.certificado_inmetro_name}</span>
                                            </label>
                                        </div> 
                                    : ''}
                                        
                                    </Col>                                    
                                </Row>
                                <Row><Divider></Divider></Row>
                                <Row className="row">                                                              
                                    <Col span={12}>
                                        <Checkbox className={this.state.certificado_anvisa_error ? 'label_error' : 'label'} checked={this.state.possui_certificado_anvisa} onChange={(e) => { this.setState({possui_certificado_anvisa : e.target.checked})}}>Fornece produtos sob vigilância, controle e/ou fiscalização do ANVISA?</Checkbox>
                                    </Col>
                                    <Col span={2}>
                                        <Divider type="vertical" />
                                    </Col>  
                                    <Col span={10}>
                                        {this.state.possui_certificado_anvisa ?
                                        <div>
                                            <input
                                            // accept="application/pdf"
                                            className="invisible"
                                            id="selecao-arquivo-7"
                                            type="file"
                                            onChange={event => {
                                                let files = event.target.files;
                                                let reader = new FileReader();
                                                reader.readAsDataURL(files[0]);
                                                reader.onload = e => {
                                                this.setState({
                                                    certificado_anvisa_name: files[0].name,
                                                    certificado_anvisa: e.target.result,
                                                });
                                                };
                                            }}
                                            />
                                            <label className="documentos button ant-btn" for="selecao-arquivo-7" >
                                            Upload Certificado Anvisa &#187;
                                            <span>{this.state.certificado_anvisa_name}</span>
                                            </label>
                                        </div> 
                                    : ''}
                                        
                                    </Col>                                    
                                </Row>
                                <Row><Divider></Divider></Row>
                                <Row className="row">                                                              
                                    <Col span={12}>
                                        <Checkbox className={this.state.certificado_exercito_error ? 'label_error' : 'label'} checked={this.state.possui_certificado_exercito} onChange={(e) => { this.setState({possui_certificado_exercito : e.target.checked})}}>Fornece produtos sob vigilância, controle e/ou fiscalização do EXÉRCITO?</Checkbox>
                                    </Col>
                                    <Col span={2}>
                                        <Divider type="vertical" />
                                    </Col>  
                                    <Col span={10}>
                                        {this.state.possui_certificado_exercito ?
                                        <div>
                                            <input
                                            // accept="application/pdf"
                                            className="invisible"
                                            id="selecao-arquivo-8"
                                            type="file"
                                            onChange={event => {
                                                let files = event.target.files;
                                                let reader = new FileReader();
                                                reader.readAsDataURL(files[0]);
                                                reader.onload = e => {
                                                this.setState({
                                                    certificado_exercito_name: files[0].name,
                                                    certificado_exercito: e.target.result,
                                                });
                                                };
                                            }}
                                            />
                                            <label className="documentos button ant-btn"  for="selecao-arquivo-8" >
                                            Upload Certificado Exercito &#187;
                                            <span>{this.state.certificado_exercito_name}</span>
                                            </label>
                                        </div> 
                                    : ''}
                                        
                                    </Col>                                    
                                </Row>
                                <Row><Divider></Divider></Row>
                                <Row className="row">                                                              
                                    <Col span={12}>
                                        <Checkbox className={this.state.certificado_mapa_error ? 'label_error' : 'label'} checked={this.state.possui_certificado_mapa} onChange={(e) => { this.setState({possui_certificado_mapa : e.target.checked})}}>Fornece produtos sob vigilância, controle e/ou fiscalização do MAPA?</Checkbox>
                                    </Col>
                                    <Col span={2}>
                                        <Divider type="vertical" />
                                    </Col>  
                                    <Col span={10}>
                                        {this.state.possui_certificado_mapa ?
                                        <div>
                                            <input
                                            // accept="application/pdf"
                                            className="invisible"
                                            id="selecao-arquivo-9"
                                            type="file"
                                            onChange={event => {
                                                let files = event.target.files;
                                                let reader = new FileReader();
                                                reader.readAsDataURL(files[0]);
                                                reader.onload = e => {
                                                this.setState({
                                                    certificado_mapa_name: files[0].name,
                                                    certificado_mapa: e.target.result,
                                                });
                                                };
                                            }}
                                            />
                                            <label className="documentos button ant-btn"  for="selecao-arquivo-9">
                                            Upload Certificado Mapa &#187;
                                            <span>{this.state.certificado_mapa_name}</span>
                                            </label>
                                        </div> 
                                    : ''}
                                        
                                    </Col>                                    
                                </Row>
                            </div>
                            
                        
                        : ''}                      
                                              
                        
                    </div>
                : ''}

                {
                    this.state.step === 4 ? 
                    
                    <div className="background-form">
                        <Row className="row">
                            <Col span={24}>
                                <div>
                                    <input
                                    // accept="application/pdf"
                                    className="invisible"
                                    id="selecao-arquivo-10"
                                    type="file"
                                    onChange={event => {
                                        let files = event.target.files;
                                        let reader = new FileReader();
                                        reader.readAsDataURL(files[0]);
                                        reader.onload = e => {
                                        this.setState({
                                            estatuto_social_name: files[0].name,
                                            estatuto_social: e.target.result,
                                        });
                                        };
                                    }}
                                    />
                                    <label className={ 'documentos button ant-btn'} for="selecao-arquivo-10" >
                                    Upload Contrato ou Estatuto Social e suas alterações (se houver) &#187;
                                    <span>{this.state.estatuto_social_name}</span>
                                    </label>
                                </div> 
                            </Col>
                        </Row>
                        <br></br>
                        <Row className="row">
                            <Col span={24}>
                                <div>
                                    <input
                                    // accept="application/pdf"
                                    className="invisible"
                                    id="selecao-arquivo-11"
                                    type="file"
                                    onChange={event => {
                                        let files = event.target.files;
                                        let reader = new FileReader();
                                        reader.readAsDataURL(files[0]);
                                        reader.onload = e => {
                                        this.setState({
                                            cartao_cnpj_name: files[0].name,
                                            cartao_cnpj: e.target.result,
                                        });
                                        };
                                    }}
                                    />
                                    <label className={this.state.cartao_cnpj_error ? 'documentos button ant-btn label_button_error' : 'documentos button ant-btn'} for="selecao-arquivo-11" >
                                    Upload Cartao CNPJ {this.state.cartao_cnpj_error ? ' *' : ''} &#187;
                                    <span>{this.state.cartao_cnpj_name}</span>
                                    </label>
                                </div> 
                            </Col>
                        </Row>
                        <br></br>
                        <Row className="row">
                            <Col span={24}>
                                <div>
                                    <input
                                    // accept="application/pdf"
                                    className="invisible"
                                    id="selecao-arquivo-12"
                                    type="file"
                                    onChange={event => {
                                        let files = event.target.files;
                                        let reader = new FileReader();
                                        reader.readAsDataURL(files[0]);
                                        reader.onload = e => {
                                        this.setState({
                                            procuracao_name: files[0].name,
                                            procuracao: e.target.result,
                                        });
                                        };
                                    }}
                                    />
                                    <label className="documentos button ant-btn" for="selecao-arquivo-12" >
                                    Upload Procuração (caso o nome não esteja listado no Contrato Social) &#187;
                                    <span>{this.state.procuracao_name}</span>
                                    </label>
                                </div> 
                            </Col>
                        </Row>
                        <br></br>
                        <Row className="row">
                            <Col span={24}>
                                <div>
                                    <input
                                    // accept="application/pdf"
                                    className="invisible"
                                    id="selecao-arquivo-13"
                                    type="file"
                                    onChange={event => {
                                        let files = event.target.files;
                                        let reader = new FileReader();
                                        reader.readAsDataURL(files[0]);
                                        reader.onload = e => {
                                        this.setState({
                                            comprovante_bancario_name: files[0].name,
                                            comprovante_bancario: e.target.result,
                                        });
                                        };
                                    }}
                                    />
                                    <label className={this.state.comprovante_bancario_error ? 'documentos button ant-btn label_button_error' : 'documentos button ant-btn'} for="selecao-arquivo-13" >
                                    Upload Comprovante bancário (cabeçalho de um extrato da conta corrente) {this.state.comprovante_bancario_error ? ' *' : ''} &#187;
                                    <span>{this.state.comprovante_bancario_name}</span>
                                    </label>
                                </div> 
                            </Col>
                        </Row>
                        <br></br>
                        <Row className="row">
                            <Col span={24}>
                                <div>
                                    <input
                                    // accept="application/pdf"
                                    className="invisible"
                                    id="selecao-arquivo-14"
                                    type="file"
                                    onChange={event => {
                                        let files = event.target.files;
                                        let reader = new FileReader();
                                        reader.readAsDataURL(files[0]);
                                        reader.onload = e => {
                                        this.setState({
                                            falencia_concordata_name: files[0].name,
                                            falencia_concordata: e.target.result,
                                        });
                                        };
                                    }}
                                    />
                                    <label className={this.state.falencia_concordata_error ? 'documentos button ant-btn label_button_error' : 'documentos button ant-btn'} for="selecao-arquivo-14" >
                                    Upload Certidão negativa de falência e concordata {this.state.falencia_concordata_error ? ' *' : ''} &#187;
                                    <span>{this.state.falencia_concordata_name}</span>
                                    </label>
                                </div> 
                            </Col>
                        </Row>
                        <br></br>
                    </div>

                :''}

                {this.state.step === 5 ? 
                    
                    <div className="background-form">
                        <Row className="row">
                            <Col span={10}>
                                <Checkbox checked={this.state.has_grupo_economico}  onChange={(e) => { this.setState({has_grupo_economico : e.target.checked, grupo_economico : '', rappel_faixa_1 : 0, rappel_faixa_2 : 0, rappel_faixa_3 : 0,
                                 rappel_faixa_4 : 0, rappel_desconto_1 : 0, rappel_desconto_2 : 0, rappel_desconto_3 : 0, rappel_desconto_4 : 0, supplier_leroy : false}); }}>POSSUI GRUPO ECONÔMICO CRIADO?</Checkbox>
                            </Col>
                            <Col span={4}></Col>
                            {this.state.has_grupo_economico ?
                            <Col span={10}>
                                <label className={this.state.grupo_economico_error ? 'label_error' : 'label'} >Grupos Econômicos {this.state.grupo_economico_error ? ' *' : ''}</label>
                                <Select  value={this.state.grupo_economico} className="select" onChange={(e) => { this.props.grupos_economicos.data.filter((elem) =>
                                {if(elem.nome === e) 
                                {this.setState({supplier_leroy : elem.fornecedor_leroy, rappel_faixa_1 : elem.rappel_faixa_1, rappel_faixa_2 : elem.rappel_faixa_2, rappel_faixa_3 : elem.rappel_faixa_3, rappel_faixa_4 : elem.rappel_faixa_4, rappel_desconto_1 : elem.rappel_desconto_1, rappel_desconto_2 : elem.rappel_desconto_2, rappel_desconto_3 : elem.rappel_desconto_3, rappel_desconto_4 : elem.rappel_desconto_4})}}) ;
                                this.setState({grupo_economico : e})}}>
                                    {this.props.grupos_economicos.data === null ? <Option value=""></Option> : 
                                    this.props.grupos_economicos.data.map((grupo) => <Option value={grupo.nome}>{grupo.nome}</Option>)}                                    
                                </Select>
                            </Col> : ''}
                        </Row>

                        <Row className="row">
                            <Col span={10}>
                                <Checkbox disabled={this.state.has_grupo_economico} checked={this.state.supplier_leroy}  onChange={(e) => { this.setState({supplier_leroy : e.target.checked, grupo_economico : '', rappel_faixa_1 : 0, rappel_faixa_2 : 0, rappel_faixa_3 : 0,
                                 rappel_faixa_4 : 0, rappel_desconto_1 : 0, rappel_desconto_2 : 0, rappel_desconto_3 : 0, rappel_desconto_4 : 0}); }}>É FORNECEDOR LEROY?</Checkbox>
                            </Col>
                            <Col span={4}></Col>
                            <Col span={10}>
                                <label className={this.state.grupo_economico_error ? 'label_error' : 'label'} >Nome grupo econômico{this.state.grupo_economico_error ? ' *' : ''}</label>
                                <Input  disabled={this.state.has_grupo_economico} className="ant-input input" value={this.state.grupo_economico} onChange={(e) => { this.setState({grupo_economico : e.target.value});}} />
                            </Col>
                        </Row>

                        <Row className="row">
                            <Col span={10}>
                                <label className={this.state.rappel_faixa_1_error ? 'label_error' : 'label'} >Faixa 1 (até){this.state.rappel_faixa_1_error ? ' *' : ''}</label>
                                <CurrencyInput  disabled={this.state.has_grupo_economico || this.state.supplier_leroy} className="ant-input input" value={this.state.rappel_faixa_1} onChange={(event, maskedvalue, floatvalue) => { this.setState({rappel_faixa_1 :maskedvalue}); this.setState({rappel_faixa_2 : (maskedvalue + 0.01)})}} prefix="R$" decimalSeparator="," thousandSeparator="." />
                            </Col>
                            <Col span={4}></Col>
                            <Col span={10}>
                                <label className={this.state.rappel_desconto_1_error ? 'label_error' : 'label'} >Desconto 1{this.state.rappel_desconto_1_error ? ' *' : ''}</label>
                                <CurrencyInput disabled={this.state.has_grupo_economico || this.state.supplier_leroy} className="ant-input input" value={this.state.rappel_desconto_1} onChange={(event, maskedvalue, floatvalue) => { this.setState({rappel_desconto_1 :maskedvalue});}} suffix="%" decimalSeparator=","  />
                            </Col>
                        </Row>

                        <Row className="row">
                            <Col span={4}>
                                <label className={this.state.rappel_faixa_2_error ? 'label_error' : 'label'} >Faixa 2 (a partir){this.state.rappel_faixa_2_error ? ' *' : ''}</label>
                                <CurrencyInput disabled={this.state.has_grupo_economico || this.state.supplier_leroy} className="ant-input input" value={this.state.rappel_faixa_2} onChange={(event, maskedvalue, floatvalue) => { this.setState({rappel_faixa_2 :maskedvalue}); this.setState({rappel_faixa_1 : (maskedvalue - 0.01)})}} prefix="R$" decimalSeparator="," thousandSeparator="." />
                            </Col>
                            <Col span={2}></Col>
                            <Col span={4}>
                                <label className={this.state.rappel_desconto_2_error ? 'label_error' : 'label'} >Desconto 2 (a partir){this.state.rappel_desconto_2_error ? ' *' : ''}</label>
                                <CurrencyInput disabled={this.state.has_grupo_economico || this.state.supplier_leroy} className="ant-input input" value={this.state.rappel_desconto_2} onChange={(event, maskedvalue, floatvalue) => { this.setState({rappel_desconto_2 :maskedvalue})}} suffix="%" decimalSeparator="," />
                            </Col>
                            <Col span={4}></Col>
                            <Col span={4}>
                                <label className={this.state.rappel_faixa_3_error ? 'label_error' : 'label'} >Faixa 3 (até){this.state.rappel_faixa_3_error ? ' *' : ''}</label>
                                <CurrencyInput disabled={this.state.has_grupo_economico || this.state.supplier_leroy} className="ant-input input" value={this.state.rappel_faixa_3} onChange={(event, maskedvalue, floatvalue) => { this.setState({rappel_faixa_3 :maskedvalue}); this.setState({rappel_faixa_4 : (maskedvalue + 0.01)})}} prefix="R$" decimalSeparator="," thousandSeparator="." />
                            </Col>
                            <Col span={2}></Col>
                            <Col span={4}>
                                <label className={this.state.rappel_desconto_3_error ? 'label_error' : 'label'} >Desconto 3 (até){this.state.rappel_desconto_3_error ? ' *' : ''}</label>
                                <CurrencyInput disabled={this.state.has_grupo_economico || this.state.supplier_leroy} className="ant-input input" value={this.state.rappel_desconto_3} onChange={(event, maskedvalue, floatvalue) => { this.setState({rappel_desconto_3 :maskedvalue})}} suffix="%" decimalSeparator="," thousandSeparator="." />
                            </Col>
                        </Row>

                        <Row className="row">
                            <Col span={10}>
                                <label className={this.state.rappel_faixa_4_error ? 'label_error' : 'label'} >Faixa 4 (a partir de){this.state.rappel_faixa_4_error ? ' *' : ''}</label>
                                <CurrencyInput disabled={this.state.has_grupo_economico || this.state.supplier_leroy} className="ant-input input" value={this.state.rappel_faixa_4} onChange={(event, maskedvalue, floatvalue) => { this.setState({rappel_faixa_4 : maskedvalue}); this.setState({rappel_faixa_3 : (maskedvalue - 0.01)});}} prefix="R$" decimalSeparator="," thousandSeparator="." />
                            </Col>
                            <Col span={4}></Col>
                            <Col span={10}>
                                <label className={this.state.rappel_desconto_4_error ? 'label_error' : 'label'} >Desconto 4{this.state.rappel_desconto_4_error ? ' *' : ''}</label>
                                <CurrencyInput disabled={this.state.has_grupo_economico || this.state.supplier_leroy} className="ant-input input" value={this.state.rappel_desconto_4} onChange={(event, maskedvalue, floatvalue) => { this.setState({rappel_desconto_4 :maskedvalue})}} suffix="%" decimalSeparator="," thousandSeparator="." />
                            </Col>
                        </Row>
                        <br></br>
                    </div>  
                    
                : ''}

                {this.state.step === 6 ? 
                    
                    <div className="background-form">
                        <Row className="row">
                            <Col span={10}>
                                <div>
                                    <input
                                    // accept="application/pdf"
                                    className="invisible"
                                    id="contrato"
                                    type="file"
                                    onChange={event => {
                                        let files = event.target.files;
                                        let reader = new FileReader();
                                        reader.readAsDataURL(files[0]);
                                        reader.onload = e => {
                                        this.setState({
                                            contrato_name: files[0].name,
                                            contrato: e.target.result,
                                        });
                                        };
                                    }}
                                    />
                                    <label className={this.state.contrato_error ? 'documentos button ant-btn label_button_error' : 'documentos button ant-btn'} for="contrato" >
                                    Upload Contrato {this.state.contrato_error ? ' *' : ''} &#187;
                                    <span>{this.state.contrato_name}</span>
                                    </label>
                                </div> 
                            </Col>
                            <Col span={4}></Col>
                            <Col span={10}>
                                <label className={this.state.status_contrato_error ? 'label_error' : 'label'} >Status contrato{this.state.status_contrato_error ? ' *' : ''}</label>
                                <Select  value={this.state.status_contrato} className="select" onChange={(e) => { this.setState({status_contrato : e})}}>
                                    <Option value="CONTRATO COMPLETO">CONTRATO COMPLETO</Option>
                                    <Option value="CONTRATO COM PROBLEMA">CONTRATO COM PROBLEMA</Option>
                                    <Option value="CONTRATO SIMPLIFICADO">CONTRATO SIMPLIFICADO</Option>
                                    <Option value="SEM CONTRATO">SEM CONTRATO</Option>
                                </Select> 
                            </Col>
                        </Row>
                    </div>

                : ''}
                {this.state.step === 7 ?                     
                    <div className="background-form">
                        <Row className="row">
                            <Col span={10}>
                                <label className={this.state.taxa_antecipacao_error ? 'label_error' : 'label'} >Taxa antecipação{this.state.taxa_antecipacao_error ? ' *' : ''}</label>
                                <CurrencyInput className="ant-input input" value={this.state.taxa_antecipacao} onChange={(event, maskedvalue, floatvalue) => { this.setState({taxa_antecipacao : maskedvalue})}} suffix="%" decimalSeparator="," thousandSeparator="." />
                            </Col>
                        </Row>
                        <Row className="row">
                            <Col span={24}>
                                <Checkbox checked={this.state.pedido_espelho}  onChange={(e) => { this.setState({pedido_espelho : e.target.checked}); }}>PEDIDO ESPELHO</Checkbox>
                            </Col>
                        </Row>
                        <Row className="row">
                            <Col span={24}>
                                <Checkbox checked={this.state.pedido_exposicao}  onChange={(e) => { this.setState({pedido_exposicao : e.target.checked}); }}>PEDIDO EXPOSIÇÃO</Checkbox>
                            </Col>
                        </Row>
                        <Row className="row">
                            <Col span={24}>
                                <Checkbox checked={this.state.pedido_enxoval}  onChange={(e) => { this.setState({pedido_enxoval : e.target.checked}); }}>PEDIDO ENXOVAL</Checkbox>
                            </Col>
                        </Row>
                        <Row className="row">
                            <Col span={10}>
                                <label className={this.state.teto_pedido_enxoval_error ? 'label_error' : 'label'} >Teto pedido enxoval{this.state.teto_pedido_enxoval_error ? ' *' : ''}</label>
                                <CurrencyInput  disabled={!this.state.pedido_enxoval} className="ant-input input" value={this.state.teto_pedido_enxoval} onChange={(event, maskedvalue, floatvalue) => { this.setState({teto_pedido_enxoval : maskedvalue});}} prefix="R$" decimalSeparator="," thousandSeparator="." />
                            </Col>
                        </Row>
                        <Row className="row">
                            <Col span={10}>
                                <label className={this.state.duracao_contrato_error ? 'label_error' : 'label'} >Duração contrato{this.state.duracao_contrato_error ? ' *' : ''}</label>
                                <InputMask  value={this.state.duracao_contrato} onChange={(e) => { this.setState({duracao_contrato : parseFloat(e.target.value)})}} className="ant-input input" {...this.props} mask="999" maskChar=" " />   
                            </Col>
                            <Col span={4}></Col>
                            <Col span={10}>
                                <label className={this.state.desconto_abertura_error ? 'label_error' : 'label'} >Desconto abertura{this.state.desconto_abertura_error ? ' *' : ''}</label>
                                <CurrencyInput className="ant-input input" value={this.state.desconto_abertura} onChange={(event, maskedvalue, floatvalue) => { this.setState({desconto_abertura : maskedvalue});}} suffix="%" decimalSeparator="," thousandSeparator="." />
                            </Col>
                        </Row>
                    </div>

                : ''}

                <Button onClick={this.handleBackward} className="backward button ">Voltar</Button>
                <Button onClick={this.handleForward} className="forward button ">  {this.props.acesso === 'fornecedor' ? (this.state.step === 4 ? 'Finalizar' : 'Avançar') : (this.state.step === 7 ? 'Finalizar' : 'Avançar')} </Button>      

            </div>
        );
    }
    
    
}
const mapStateToProps = state => ({
    endereco : state.endereco.data,
    bancos : state.bancos.data,
    fornecedores : state.fornecedores,
    grupos_economicos : state.grupos_economicos,
});

const mapDispatchToProps = dispatch => ({
    fornecedoresActions: bindActionCreators(FornecedoresActions, dispatch),
    enderecoActions: bindActionCreators(EnderecoActions, dispatch),
    bancosActions: bindActionCreators(BancosActions, dispatch),
    gruposEconomicosActions: bindActionCreators(GruposEconomicosActions, dispatch)
    
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CadastroFornecedor));