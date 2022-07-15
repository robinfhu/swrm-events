import React from 'react'
import { NavLink, Route, Redirect, Switch, useParams, useRouteMatch } from 'react-router-dom';
import EventItem from './event';
import {formatDate} from './utils';


function EventsList(props) {
    let { query } = useParams();
    let timezone = props.sessions.config.timezone.short;
    let eventsList = props.sessions.searchFilter(query).map((item) => {
        return <EventItem data={item} key={item.SessionID} timezone={timezone}></EventItem>;
    });
    
    if (eventsList.length === 0) {
        eventsList = <strong>No results found.</strong>
    }
    return <div>
        {eventsList}
    </div>
}

// Renders list of events based on search query.
export default function SearchResults(props) {
    let {path, url} = useRouteMatch();
    
    return (
        <React.Fragment>
            <Switch>
                <Route path={`${path}/:query`}>
                    <EventsList sessions={props.sessions}/>
                </Route>

                <Route exact path={path}>
                    <div>No results found.</div>
                </Route>
            </Switch>
        </React.Fragment>
    );
}


