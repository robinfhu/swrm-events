import React from 'react'
import {formatDate} from './utils';
import { NavLink } from 'react-router-dom';

// Renders an event card that appears in the event lists.
export default class EventItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {SessionID,DateKey,
            StartTime,EndTime,
            EventType,
            Location,SessionDescription,SessionTitle} = this.props.data;
        SessionTitle = SessionTitle || "Untitled";

        let room = (this.props.data["Room"]) ? `, ${this.props.data["Room"]}` : '';
        let socialBadge = (EventType) ? <span className='badge badge-primary ml-3'>{EventType}</span> : '';
        return <div className="event-item shadow-sm mb-3 border p-1">
            <strong>
                <NavLink to={`/event/${SessionID}`}>{SessionTitle}</NavLink>
                {socialBadge}
            </strong><br/>
            
            <strong className="small-text">{formatDate(DateKey)}</strong>
            
            <strong className="text-muted small-text ml-3">{StartTime} - {EndTime} ({this.props.timezone})</strong>
            <br/>
            <div className="small-text border-bottom text-muted">{Location} {room}</div>
             
            <span className="small-text">{SessionDescription}</span>
            
        </div>
    }
}