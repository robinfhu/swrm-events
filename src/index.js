import React from 'react'
import ReactDOM from 'react-dom'
import Header from "./header"
import {UserGrid, generateData} from "./user-mgmt-example.js"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import HelloWorld from "./hello-world.js"

const users = generateData()

const layout = <React.Fragment>
    <Header brand='SWRM 2021' />
    <HelloWorld users={users} name="Robin" />
    </React.Fragment>


ReactDOM.render(
    layout,
    document.getElementById('root')
)