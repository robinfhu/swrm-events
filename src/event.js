import React from 'react'
import {formatDate} from './utils';
import { NavLink } from 'react-router-dom';

export default class EventItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {SessionID,DateKey,
            StartTime,EndTime,
            Location,SessionDescription,SessionTitle} = this.props.data;
        return <div className="event-item shadow-sm mb-3 border p-1">
            <strong>
                <NavLink to={`/event/${SessionID}`}>{SessionTitle}</NavLink>
            </strong><br/>
            
            <strong className="small-text">{formatDate(DateKey)}</strong>
            
            <strong className="text-muted small-text ml-3">{StartTime} - {EndTime} ({this.props.timezone})</strong>
            <br/>
            <div className="small-text border-bottom text-muted">{Location}</div>
             
            <span className="small-text">{SessionDescription}</span>
            
        </div>
    }
}