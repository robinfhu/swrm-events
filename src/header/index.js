
import React from 'react'
import {Link,NavLink} from 'react-router-dom';

export default class Header extends React.Component {
    constructor(props) {
        super(props) 

        this.state = {
            navItems: [
                {name: 'Sessions by Day', path: "/by-day"}
            ,
                {name: 'Sessions by Room', path: '/by-room'}
            ],
            active: 'Home'
        }
    }
    render() {
        const navItems = this.state.navItems.map((d)=> {
            return <li className='nav-item mr-3' key={d.name}>
                <NavLink to={d.path} className="btn btn-secondary session-group-button">{d.name}</NavLink>
            </li>
        })
        return <header>
            <div>
                <a href="/#">
                    <img src="swrm-logo.png" className='w-100'></img>
                </a>
            </div>
            <div className='navbar navbar-expand-sm navbar-dark bg-dark shadow-sm'>
                <div className='container-fluid justify-content-start'>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarAppHeader" aria-controls="navbarAppHeader" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarAppHeader">
                        <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                            {navItems}
                        </ul>
                    </div>
                    
                </div>
            </div>
        </header>
    }
}