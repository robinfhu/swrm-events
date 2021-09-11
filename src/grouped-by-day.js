import React from 'react'
import { NavLink, Route, Redirect, Switch, useParams, useRouteMatch } from 'react-router-dom';
import EventItem from './event';
import {formatDate} from './utils';

function DayButton(props) {
    let {path, url} = useRouteMatch();
    return <NavLink to={`${url}/${props.date}`} className="btn btn-primary mr-3">{formatDate(props.date)}</NavLink>
}

function EventsList(props) {
    let { date } = useParams();
    let eventsList = props.sessions.getParentSessions()
    .filter((item)=> item.DateKey === date).map((item) => {
        return <EventItem data={item} key={item.SessionID}></EventItem>;
    })
    return <div>
        {eventsList}
    </div>
}

export default function GroupedByDay(props) {
    let {path, url} = useRouteMatch();
    let defaultDate = null;
    let dates = props.sessions.getDates().map((date) => {
        if (!defaultDate) {
            defaultDate = date;
        }
        return <DayButton date={date} key={date}></DayButton>
    });

    
    return (
        <React.Fragment>
            <div className="mb-1">{dates}</div>
            <Switch>
                <Route path={`${path}/:date`}>
                    <EventsList sessions={props.sessions}/>
                </Route>

                <Route exact path={path}>
                    <Redirect to={`${path}/${defaultDate}`}></Redirect>
                </Route>
            </Switch>
        </React.Fragment>
    );
}


