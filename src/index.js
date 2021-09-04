import React from 'react'
import ReactDOM from 'react-dom'
import Header from "./header"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import '../styles/main.css'
import GroupedByDay from './grouped-by-day'
import GroupedByRoom from './grouped-by-room'
import {
    HashRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";
  
import Sessions from './sessions'
import EventDetail from './event-detail'

function start(sessionsData) {
    const layout = <Router>
        <Header brand='SWRM 2021 Events' />
        <Switch>
            <Route path="/by-day">
                <GroupedByDay sessions={sessionsData}></GroupedByDay>
            </Route>
            
            <Route path="/by-room">
                <GroupedByRoom></GroupedByRoom>
            </Route>

            <Route path="/event/:id">
                <EventDetail sessions={sessionsData}></EventDetail>
            </Route>

            <Route exact path="/">
                <Redirect to="/by-day"></Redirect>
            </Route>
        </Switch>
    </Router>

    ReactDOM.render(
        layout,
        document.getElementById('root')
    )
}


fetch("test.json").then((response)=> {
    response.json().then((j)=> {
        start(new Sessions(j));
    });
}).catch((e) => {
    console.log(e);
});


