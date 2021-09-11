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
import MediaContent from './media-content'

function start(sessionsData) {
    const layout = <Router>
        <Header brand='SWRM 2021 Events' />
        <Switch>
            <Route path="/by-day">
                <GroupedByDay sessions={sessionsData}></GroupedByDay>
            </Route>
            
            <Route path="/by-room">
                <GroupedByRoom sessions={sessionsData}></GroupedByRoom>
            </Route>

            <Route path="/event/:id">
                <EventDetail sessions={sessionsData}></EventDetail>
            </Route>

            <Route path="/media/:id">
                <MediaContent sessions={sessionsData}></MediaContent>
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

const sessionsPromise = fetch("sessions.json").then((response)=> response.json());
const speakersPromise = fetch("speakers.json").then((response)=> response.json());
const mediaPromise = fetch("media.json").then((response)=> response.json());

Promise.all([sessionsPromise,speakersPromise,mediaPromise]).then( ([sessions,speakers,media]) => {
    start(new Sessions(sessions,speakers,media));
}).catch((e) => {
    console.log(e);
});



