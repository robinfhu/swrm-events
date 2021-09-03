import React from 'react'
import { NavLink, Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import EventItem from './event';

function EventsList(props) {
    let { day } = useParams();
    
    let eventsList = props.sessions.getData().slice(0, 10).map((item) => {
        return <EventItem data={item} key={item.SessionID}></EventItem>;
    })
    return <div>Events for {day}
        <hr/>
        {eventsList}
    </div>
}

export default function GroupedByDay(props) {
    let {path, url} = useRouteMatch();
    let dates = props.sessions.getDates().map((date) => {
        return <NavLink to={`${url}/${date}`} className="btn btn-primary">{date}</NavLink>
    });
    
    return (
        <React.Fragment>
            {dates}
            <hr/>
            <Switch>
                <Route path={`${path}/:day`}>
                    <EventsList sessions={props.sessions}/>
                </Route>
            </Switch>
        </React.Fragment>
    );
}


