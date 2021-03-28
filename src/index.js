import React from 'react'
import ReactDOM from 'react-dom'
import Header from "./header"
import {UserGrid, generateData} from "./user-mgmt-example.js"
import 'bootstrap/dist/css/bootstrap.min.css'

const users = generateData()

const layout = <React.Fragment>
    <Header brand='My App' />
    <UserGrid users={users} />
    </React.Fragment>


ReactDOM.render(
    layout,
    document.getElementById('root')
)