import Header from "./header.js"
import HelloWorld from "./hello-world.js"
const layout = <div>
    <Header brand='My App' />
    <HelloWorld name='Robin'/>
    </div>


ReactDOM.render(
    layout,
    document.getElementById('root')
)