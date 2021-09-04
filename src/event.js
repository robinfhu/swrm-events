import React from 'react'
import {formatDate} from './utils';
import { NavLink } from 'react-router-dom';

export default class EventItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {SessionID,DateKey,StartTime,EndTime,Location,SessionDescription} = this.props.data;
        return <div className="event-item shadow-sm mb-3 border p-1">
            <strong>
                <NavLink to={`/event/${SessionID}`}>{SessionDescription}</NavLink>
            </strong><br/>
            <span className="small-text">{StartTime} - {EndTime} | <span className="text-muted">{formatDate(DateKey)}</span></span>
             <br/>
            <span>{Location}</span>
        </div>
    }
}