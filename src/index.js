import React from 'react'
import ReactDOM from 'react-dom'
import Header from "./header"
import {UserGrid, generateData} from "./user-mgmt-example.js"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import HelloWorld from "./hello-world.js"
import {
    HashRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  
const users = generateData()

fetch("test.json").then((response)=> {
    response.json().then((j)=> {
        console.log("Got data back", j);
    });
}).catch((e) => {
    console.log(e);
});

const layout = <Router>
    <Header brand='SWRM 2021' />
    <Switch>
        <Route exact path="/">
            <h1>Home Page</h1>
        </Route>
        
        <Route path="/hello-world">
            <HelloWorld name="Robin"/>
        </Route>
    </Switch>
</Router>



ReactDOM.render(
    layout,
    document.getElementById('root')
)