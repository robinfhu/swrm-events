import React from 'react';
import { useParams } from 'react-router-dom';
import { formatDate } from './utils';
// Loads the media content, which is just an HTML blob.
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