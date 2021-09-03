import React from 'react'

export default class EventItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {SessionTitle,Date} = this.props.data;
        return <div className="event-item">
            <strong>{SessionTitle}</strong>
            <span>{Date}</span>
        </div>
    }
}