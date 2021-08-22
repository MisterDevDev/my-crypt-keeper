import React from 'react'
import Auth from './components/Auth'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'

const Routes = () => {
    return(
        <div>
        <Switch>
            <Route path='/' exact component={ Auth } />
        </Switch> 
        </div>
        
    )
}

export default Routes