import React from 'react'
import {formatDate} from './utils';

export default class EventItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {SessionTitle,DateKey,StartTime,EndTime,Location,SessionDescription} = this.props.data;
        return <div className="event-item shadow-sm mb-3 border p-1">
            <strong>{SessionDescription}</strong><br/>
            <span className="small-text">{StartTime} - {EndTime} | <span className="text-muted">{formatDate(DateKey)}</span></span>
             <br/>
            <span>{Location}</span>
        </div>
    }
}