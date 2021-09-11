import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { formatDate } from './utils';

export default function EventDetail(props) {
    let {id} = useParams();
    const session = props.sessions.getSession(id);
    const childSessions = props.sessions.getChildSessions(id);

    window.scrollTo(0,0);

    const childSessionsElem = childSessions.map((item) => {
        let {SessionTitle,SessionDescription,StartTime,EndTime} = item;
        let mediaLink = null;
        let speakers = null;
        if (item.Media) {
            mediaLink = <NavLink to={`/media/${item.Media}`} className="btn btn-secondary">View Abstract</NavLink>
        }
        if (item.Speakers) {
            speakers = item.Speakers.map((s)=> {
                return <div key={s["Speaker ID"]}>
                    <span className="text-capitalize">{s["First Name"]} {s["Last Name"]}</span>
                    <em className="ml-3">({s["Organization"]})</em>
                </div>
            });
        }
        return <div className="card mb-3" key={item.SessionID}>
            <div className="card-header">
                <h6>{SessionTitle}</h6>
            </div>
            <div className="card-body">
                <strong>Time:</strong> {StartTime} - {EndTime}<br/>
                {speakers}
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
                <strong>Date: </strong> 
                {formatDate(session["DateKey"])} <br/>
                <strong>Time: </strong>
                {session["StartTime"]} - {session["EndTime"]} (Central Time)
                
                <br/>
                <strong>Location:</strong> {session["Location"]}
                <br/>
                <span>{session["SessionDescription"]}</span>
            </div>
        </div>
        <h3 className="ml-3 mt-3">Presentations</h3>
        {childSessionsElem}
    </div>
    
}