
export default class Header extends React.Component {
    render() {
        return <header>
            <div className='navbar navbar-dark bg-dark shadow-sm'>
                <div className='container justify-content-start'>
                    <a href="#" className='navbar-brand d-flex align-items-center'>
                        {this.props.brand || "React Boilerplate"}
                    </a>

                    <div className=''>
                        <ul className='navbar-nav'>
                            <li className='nav-item'>
                                <a className='nav-link'>Page 1</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    }
}