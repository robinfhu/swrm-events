import React from 'react';
import { useParams } from 'react-router-dom';
export default function EventDetail(props) {
    let {id} = useParams();
    console.log(props.sessions.getSession(id));
    return <div>
        
        <h1>Event Detail for {id}</h1>
    </div>
    
}