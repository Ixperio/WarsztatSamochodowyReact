import { Link } from 'react-router-dom';

const NavBar = () =>{
    return(
        <nav>
            <h1>Navabr</h1>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
            </ul>
        </nav>

    )
}

export default NavBar;