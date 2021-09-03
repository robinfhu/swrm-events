import React from 'react'
import { NavLink, Route, Switch, useParams, useRouteMatch } from 'react-router-dom';

function EventsList() {
    let { day } = useParams();
    return <div>Events for {day}</div>
}

export default function GroupedByDay() {
    let {path, url} = useRouteMatch();
    console.log(path,url);
    return (
        <React.Fragment>
            <NavLink to={`${url}/oct-30`} className="btn btn-primary">Oct 30</NavLink>
            <NavLink to={`${url}/oct-31`} className="btn btn-primary">Oct 31</NavLink>
            <hr/>
            <Switch>
                <Route path={`${path}/:day`}>
                    <EventsList/>
                </Route>
            </Switch>
        </React.Fragment>
    );
}


