import React from 'react';
import { useParams } from 'react-router-dom';
import { formatDate } from './utils';
export default function MediaContent(props) {
    let {id} = useParams();
    const content = props.sessions.getMedia(id);
    const markup = {
        __html: content.Description
    }

    return <div>
        <div dangerouslySetInnerHTML={markup}></div>
    </div>
}