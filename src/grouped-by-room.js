import React from 'react'
import { NavLink, Route, Switch, useParams, useRouteMatch } from 'react-router-dom';

function EventsList() {
    let { room } = useParams();
    return <div>Events in {room}</div>
}

export default function GroupedByRoom() {
    let {path, url} = useRouteMatch();
    return (
        <React.Fragment>
            <NavLink to={`${url}/iron`} className="btn btn-primary">Zinc</NavLink>
            <NavLink to={`${url}/zinc`} className="btn btn-primary">Iron</NavLink>
            <hr/>
            <Switch>
                <Route path={`${path}/:room`}>
                    <EventsList/>
                </Route>
            </Switch>
        </React.Fragment>
    );
}
