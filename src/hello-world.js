const hello = <span>Hello</span>


export default class HelloWorld extends React.Component {
    render() {
        return <h1>{hello}, {this.props.name}</h1>;
    }
}

