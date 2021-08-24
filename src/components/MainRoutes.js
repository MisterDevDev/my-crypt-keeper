import React from 'react'
import Friends from './main/Friends'
import Currency from './main/Currency'
import Landing from './main/Landing'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'

const MainRoutes = () => {
    return(
        <div>
        <Switch>
            <Route path='/friends' component={ Friends } />
            <Route path='/currency' component={ Currency } />
            <Route path='/home' component={ Landing } />
        </Switch> 
        </div>
        
    )
}

export default MainRoutes