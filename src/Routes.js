import React from 'react'
import Auth from './components/Auth'
import Home from './components/Home'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'

const Routes = () => {
    //need to set up is logged in. if not, redirect to Auth for re-auth
    return(
        <div>
        <Switch>
            <Route path='/' exact component={ Auth } />
            <Route path='/auth' exact component={ Auth } />
            <Route path='/home' exact component={ Home }/>
            <Route path='*' component={ Home }/>
        </Switch> 
        </div>
        
    )
}

export default Routes