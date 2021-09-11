import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { formatDate } from './utils';

export default function EventDetail(props) {
    let {id} = useParams();
    const session = props.sessions.getSession(id);
    const childSessions = props.sessions.getChildSessions(id);

    const childSessionsElem = childSessions.map((item) => {
        let {SessionTitle,SessionDescription,StartTime,EndTime} = item;
        let mediaLink = null;
        if (item.Media) {
            mediaLink = <NavLink to={`/media/${item.Media}`}>See Media</NavLink>
        }
        return <div className="card mb-3" key={item.SessionID}>
            <div className="card-header">
                <h6>{SessionTitle}</h6>
            </div>
            <div className="card-body">
                <strong>Time:</strong> {StartTime} - {EndTime}<br/>
                <span>{SessionDescription}</span>
                <br/>
                {mediaLink}
            </div>
        </div>
    })

    return <div>
        <div className="card">
            <div className="card-header">
                <h3>{session["SessionTitle"]}</h3>
            </div>
            <div className="card-body">
                <strong>Date and Time:</strong> {formatDate(session["DateKey"])} {session["StartTime"]} - {session["EndTime"]} (Central Time)
                <br/>
                <strong>Location:</strong> {session["Location"]}
                <br/>
                <span>{session["SessionDescription"]}</span>
            </div>
        </div>
        <h3>Presentations</h3>
        {childSessionsElem}
    </div>
    
}