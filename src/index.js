import React from 'react'
import ReactDOM from 'react-dom'
import Header from "./header"
import {UserGrid, generateData} from "./user-mgmt-example.js"
import 'bootstrap/dist/css/bootstrap.min.css'

const users = generateData()

const layout = <div>
    <Header brand='My App' />
    <UserGrid users={users} />
    </div>


ReactDOM.render(
    layout,
    document.getElementById('root')
)