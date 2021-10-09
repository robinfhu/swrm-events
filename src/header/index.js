
import React from 'react'
import {Link,NavLink, useHistory} from 'react-router-dom';

function SearchForm() {
    let history = useHistory();
    let handleSearch = (e) => {
        e.preventDefault();
        let form = new FormData(e.target);
        history.push(`/search/${form.get('query')}`);
    };

    return <form onSubmit={handleSearch}>
        <input 
            type='text' 
            name='query'
            className='form-control' 
            aria-label='Search' 
            placeholder="Search..."/>
    </form>
}

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

    handleSearch (e) {
        e.preventDefault();
        let form = new FormData(e.target);
        let history = useHistory();
        history.push(`/search/${form.get('query')}`);
    }
    render() {
        const navItems = this.state.navItems.map((d)=> {
            return <li className='nav-item mr-3' key={d.name}>
                <NavLink to={d.path} className="btn btn-secondary session-group-button">{d.name}</NavLink>
            </li>
        })
        return <header>
            <div>
                <NavLink to="/">
                    <img src="swrm-logo.png" className='w-100'></img>
                </NavLink>
            </div>
            <div className='navbar navbar-expand-sm navbar-dark bg-dark p-0 shadow-sm'>
                <div className='justify-content-start'>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarAppHeader" aria-controls="navbarAppHeader" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarAppHeader">
                        <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                            {navItems}
                            
                            <li className='nav-item'>
                                <SearchForm/>
                                
                            </li>
                        </ul>
                        
                    </div>
                    
                </div>
            </div>
        </header>
    }
}