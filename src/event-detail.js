import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { formatDate } from './utils';

export default function EventDetail(props) {
    let {id} = useParams();
    const timezone = props.sessions.config.timezone.long;
    const session = props.sessions.getSession(id);
    const childSessions = props.sessions.getChildSessions(id);

    window.scrollTo(0,0);

    const childSessionsElem = childSessions.map((item) => {
        let {SessionTitle,SessionDescription,StartTime,EndTime} = item;
        let mediaLink = null;
        let speakers = null;
        if (item.Media) {
            mediaLink = <NavLink to={`/media/${item.Media}`} className="btn btn-sm small-text btn-secondary">View Abstract</NavLink>
        }
        if (item.Speakers) {
            speakers = item.Speakers.map((s)=> {
                return <div key={s["Speaker ID"]}>
                    <span className="text-capitalize">{s["First Name"]} {s["Last Name"]}</span>
                    <em className="ml-3">({s["Organization"]})</em>
                </div>
            });
        }
        return <div className="card mb-1" key={item.SessionID}>
            <div className="card-header py-2">
                <h6 className='m-0'>{SessionTitle}</h6>
            </div>
            <div className="card-body small-text py-2">
                <strong>Time:</strong> {StartTime} - {EndTime}<br/>
                {speakers}
                <div className='text-left mt-1'>{mediaLink}</div>
            </div>
        </div>
    });

    let description = session["SessionDescription"];
    description = {
        __html: description.replace("Presiders:","<strong>Presiders:</strong>")
    };

    return <div>
        <div className="card">
            <div className="card-header">
                <h3>{session["SessionTitle"]}</h3>
            </div>
            <div className="card-body">
                <strong>Date: </strong> 
                {formatDate(session["DateKey"])} <br/>
                <strong>Time: </strong>
                {session["StartTime"]} - {session["EndTime"]} ({timezone})
                
                <br/>
                <strong>Location:</strong> {session["Location"]}
                <div dangerouslySetInnerHTML={description}></div>
            </div>
        </div>
        <h3 className="ml-3 mt-3">Presentations</h3>
        {childSessionsElem}
    </div>
    
}