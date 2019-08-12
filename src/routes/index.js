import React from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';

import FormularioFornecedorPage from '../pages/FormularioFornecedor';
import FormularioPage from '../pages/Formulario';
import Pendencias from '../pages/Pendencias';
import Login from '../pages/Login';
import LoginCreationPage from '../pages/LoginCreation'
import PrivateRoute from '../Components/PrivateRoute';
import PublicRoute from '../Components/PublicRoute';
import PortalPage from '../pages/Portal';
import AguardePage from '../pages/Aguarde';

import { BrowserRouter } from 'react-router-dom';

const Routes = () => (
    <div>
         <BrowserRouter>
            <Switch>
                <PrivateRoute exact path = "/pendencias" component={Pendencias}/>
                <PrivateRoute exact path = "/formulario" component={FormularioPage}/>   
                <PrivateRoute exact path = "/portal" component={PortalPage}/>
                <PublicRoute exact path = "/cadastro" component={FormularioFornecedorPage}/>
                <PublicRoute exact path = "/aguarde" component={AguardePage}/>
                <PublicRoute path="/login" exact component={Login} />   
                <Route path="/login/create" exact component={LoginCreationPage} />     
                <Route path="/" render={() => <Redirect to="/login" />} exact /> 
            </Switch>
        </BrowserRouter>
        
    </div>
    
);

export default Routes;