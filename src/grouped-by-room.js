import React from 'react'
import { NavLink, Route, Redirect, Switch, useParams, useRouteMatch } from 'react-router-dom';
import EventItem from './event';

function RoomButton(props) {
    let {path, url} = useRouteMatch();
    return <NavLink to={`${url}/${props.room}`} className="btn btn-primary mr-3">{props.room}</NavLink>
}

function EventsList(props) {
    let { room } = useParams();
    let eventsList = props.sessions.getParentSessions()
    .filter((item)=> item.Location === room).map((item) => {
        return <EventItem data={item} key={item.SessionID}></EventItem>;
    })
    return <div>
        {eventsList}
    </div>
}


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
