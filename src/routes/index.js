import React from 'react';
import { Switch, Route} from 'react-router-dom';
import CadastroFornecedor from '../pages/FormularioFornecedor';
import Pendencias from '../pages/Pendencias';

const Routes = () => (
    <div>
        
        <Switch>
            <Route exact path = "/pendencias" component={Pendencias}/>
            <Route exact path = "/" component={CadastroFornecedor}/>            
        </Switch>
    </div>
    
);

export default Routes;