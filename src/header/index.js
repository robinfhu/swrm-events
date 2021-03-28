
import React from 'react'

export default class Header extends React.Component {
    constructor(props) {
        super(props) 

        console.log(props)

        this.state = {
            navItems: [
                {name: 'Home'}
            ,
                {name: 'About'}
            ],
            active: 'Home'
        }
    }
    render() {
        const navItems = this.state.navItems.map((d)=> {
            const active = (this.state.active === d.name) ? 'active' : ''

            return <li className='nav-item mr-3' key={d.name}>
                <a className={`nav-link ${active}`}>{d.name}</a>
            </li>
        })
        return <header>
            <div className='navbar navbar-dark bg-dark shadow-sm'>
                <div className='container-fluid justify-content-start'>
                    <a href="#" className='navbar-brand d-flex align-items-center'>
                        {this.props.brand || "React Boilerplate"}
                    </a>

                    <div>
                        <ul className='navbar-nav flex-row'>
                            {navItems}
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    }
}