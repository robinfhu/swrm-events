import React from 'react'
import ReactDOM from 'react-dom'
import Header from "./header"
import HelloWorld from "./hello-world.js"

const list = [1,2,3]

const layout = <div>
    <Header brand='My App' nvData={list} />
    <HelloWorld name='Robin'/>
    </div>


ReactDOM.render(
    layout,
    document.getElementById('root')
)