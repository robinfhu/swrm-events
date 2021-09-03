import React from 'react'
import { NavLink, Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import EventItem from './event';

function EventsList(props) {
    let { day } = useParams();
    
    let eventsList = props.sessions.getData().slice(0, 10).map((item) => {
        return <EventItem data={item}></EventItem>;
    })
    return <div>Events for {day}
        <hr/>
        {eventsList}
    </div>
}

export default function GroupedByDay(props) {
    let {path, url} = useRouteMatch();

    return (
        <React.Fragment>
            <NavLink to={`${url}/oct-30`} className="btn btn-primary">Oct 30</NavLink>
            <NavLink to={`${url}/oct-31`} className="btn btn-primary">Oct 31</NavLink>
            <hr/>
            <Switch>
                <Route path={`${path}/:day`}>
                    <EventsList sessions={props.sessions}/>
                </Route>
            </Switch>
        </React.Fragment>
    );
}


