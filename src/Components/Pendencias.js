import { List, Tabs, Button} from 'antd';
import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Creators as FornecedoresActions} from '../store/ducks/fornecedores';
import Loading from './Loading';
import {Link} from 'react-router-dom';

const { TabPane } = Tabs;

class Pendencias extends Component {

  componentDidMount() {
    this.props.fornecedoresActions.getGpFornecedoresRequest();
    this.props.fornecedoresActions.getFiscalFornecedoresRequest();
    this.props.fornecedoresActions.getAprovedFornecedoresRequest();
    console.tron.log(this.props.fornecedores);
  }

  handleReprovar = (cnpj) => {
    this.props.fornecedoresActions.deleteFornecedoresRequest(cnpj);
  }

  render() {
    return (
        this.props.fornecedores.loading_gp || this.props.fornecedores.loading_fiscal || this.props.fornecedores.loading_aproved || this.props.fornecedores.loading ?
        <Loading></Loading> :
        <Tabs className="tabs" defaultActiveKey="1"  onChange={() => {}}>
            <TabPane tab="Aguardando enriquecimento" key="1">
                <List
                className="background-form demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={this.props.fornecedores.data_gp}
                renderItem={item => (
                    this.props.acesso === 'gp' || this.props.acesso === 'admin' ?
                    <List.Item actions={[<Button className="button forward" onClick={() => this.handleReprovar(item.cnpj)}>Reprovar</Button>, <Button  className="button forward"><Link style={{ textDecoration: 'none' }}  
                    to={{ pathname :'/formulario', state: {tipo : 'gp', fornecedor : this.props.fornecedores.data_gp.filter((elem) => elem.cnpj === item.cnpj)[0]}}}>Enriquecer</Link></Button>]}>
                        <List.Item.Meta
                            title={item.nome_fantasia}
                            description={(new Date(item.createdAt.split('T')[0]).getDate()).toString() + '/' + (new Date(item.createdAt.split('T')[0]).getMonth() + 1).toString() + '/' + new Date(item.createdAt.split('T')[0]).getFullYear().toString()}
                        />
                    </List.Item> :
                    <List.Item actions={[]}>
                    <List.Item.Meta
                        title={item.nome_fantasia}
                        description={(new Date(item.createdAt.split('T')[0]).getDate()).toString() + '/' + (new Date(item.createdAt.split('T')[0]).getMonth() + 1).toString() + '/' + new Date(item.createdAt.split('T')[0]).getFullYear().toString()}
                    />
                    </List.Item>
                )}
                />
            </TabPane>
            <TabPane  tab="Aguardando aprovação fiscal" key="2">
                <List
                className="background-form demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={this.props.fornecedores.data_fiscal}
                renderItem={item => (
                    this.props.acesso === 'fiscal'  || this.props.acesso === 'admin' ?
                    <List.Item actions={[ <Button  className="button forward"><Link style={{ textDecoration: 'none' }}  
                    to={{ pathname :'/formulario', state: {tipo : 'fiscal', fornecedor : this.props.fornecedores.data_fiscal.filter((elem) => elem.cnpj === item.cnpj)[0]}}}>Verificar</Link></Button>]}>
                        <List.Item.Meta
                            title={item.nome_fantasia}
                            description={(new Date(item.updatedAt.split('T')[0]).getDate()).toString() + '/' + (new Date(item.updatedAt.split('T')[0]).getMonth() + 1).toString() + '/' + new Date(item.updatedAt.split('T')[0]).getFullYear().toString()}
                        />
                    </List.Item> : 
                    <List.Item actions={[]}>
                    <List.Item.Meta
                        title={item.nome_fantasia}
                        description={(new Date(item.updatedAt.split('T')[0]).getDate()).toString() + '/' + (new Date(item.updatedAt.split('T')[0]).getMonth() + 1).toString() + '/' + new Date(item.updatedAt.split('T')[0]).getFullYear().toString()}
                    />
                    </List.Item>
                )}
                />
            </TabPane>
            <TabPane tab="Aprovados" key="3">
                <List
                className="background-form demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={this.props.fornecedores.data_aproved}
                renderItem={item => (
                <List.Item actions={[]}>
                    <List.Item.Meta
                        title={item.nome_fantasia}
                        description={(new Date(item.updatedAt.split('T')[0]).getDate()).toString() + '/' + (new Date(item.updatedAt.split('T')[0]).getMonth() + 1).toString() + '/' + new Date(item.updatedAt.split('T')[0]).getFullYear().toString()}
                    />
                </List.Item>
                )}
                />
            </TabPane>
        </Tabs>
      
    );
  }
}

const mapStateToProps = state => ({
    fornecedores : state.fornecedores,
});

const mapDispatchToProps = dispatch => ({
    fornecedoresActions: bindActionCreators(FornecedoresActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Pendencias);