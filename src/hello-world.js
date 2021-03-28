import React from 'react'
const hello = <span>Hello 123</span>


export default class HelloWorld extends React.Component {
    render() {
        return <h1>{hello}, {this.props.name}</h1>;
    }
}

