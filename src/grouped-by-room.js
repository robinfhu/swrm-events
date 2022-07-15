import React from 'react'
import { NavLink, Route, Redirect, Switch, useParams, useRouteMatch } from 'react-router-dom';
import EventItem from './event';

function RoomButton(props) {
    let {path, url} = useRouteMatch();
    return <NavLink to={`${url}/${props.room}`} 
    className="btn btn-primary mr-1 room-button">{props.room}</NavLink>
}

function EventsList(props) {
    let { room } = useParams();
    
    let timezone = props.sessions.config.timezone.short;
    let eventsList = props.sessions.getParentSessions()
    .filter((item)=> item.Location === room).map((item) => {
        return <EventItem data={item} key={item.SessionID} timezone={timezone}></EventItem>;
    })
    return <div>
        {eventsList}
    </div>
}

// Shows all events grouped by the location they are in.
export default function GroupedByRoom(props) {
    let {path, url} = useRouteMatch();
    let defaultRoom = null;
    let roomButtons = props.sessions.getRooms().map((room)=> {
        if (!defaultRoom) {
            defaultRoom = room;
        }
        return <RoomButton key={room} room={room}></RoomButton>
    });
    return (
        <React.Fragment>
            <div className="text-center">{props.sessions.getBaseLocation()}</div>
            {roomButtons}
            <hr/>
            <Switch>
                <Route path={`${path}/:room`}>
                    <EventsList sessions={props.sessions}/>
                </Route>

                <Route exact path={path}>
                    <Redirect to={`${path}/${defaultRoom}`}></Redirect>
                </Route>
            </Switch>
        </React.Fragment>
    );
}
