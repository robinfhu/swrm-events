import React from 'react'
import ReactDOM from 'react-dom'
import Header from "./header"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import '../styles/main.css'
import GroupedByDay from './grouped-by-day'
import GroupedByRoom from './grouped-by-room'
import SearchResults from './search-results'
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
        <Header brand='SWRM 2021 Sessions' />
        <Switch>
            <Route path="/by-day">
                <GroupedByDay sessions={sessionsData}></GroupedByDay>
            </Route>
            
            <Route path="/by-room">
                <GroupedByRoom sessions={sessionsData}></GroupedByRoom>
            </Route>

            <Route path="/search">
                <SearchResults sessions={sessionsData}></SearchResults>
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
        <footer className='text-center py-4'>
            <hr/>
            <span>&copy; 2021 {sessionsData.config.copyright}</span>
        </footer>
    </Router>

    ReactDOM.render(
        layout,
        document.getElementById('root')
    )
}

const configPromise = fetch("config.json").then((response)=> response.json());
const sessionsPromise = fetch("sessions.json").then((response)=> response.json());
const socialPromise = fetch("social.json").then((response)=> response.json());
const speakersPromise = fetch("speakers.json").then((response)=> response.json());
const mediaPromise = fetch("media.json").then((response)=> response.json());

Promise.all([configPromise,sessionsPromise,socialPromise,speakersPromise,mediaPromise])
.then( ([config,sessions,social,speakers,media]) => {
    sessions = sessions.concat(social);
    start(new Sessions(config,sessions,speakers,media));
}).catch((e) => {
    console.log(e);
});



