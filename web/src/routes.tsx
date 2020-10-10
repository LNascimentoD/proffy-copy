import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Landing from './pages/Landing'
import TeacherList from './pages/TeacherList'
import TeacherForm from './pages/TeacherForm'

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Landing} exact/>
                <Route path="/give-classes" component={TeacherForm} />
                <Route path="/study" component={TeacherList} />
            </Switch>
        </BrowserRouter>
    )
} 