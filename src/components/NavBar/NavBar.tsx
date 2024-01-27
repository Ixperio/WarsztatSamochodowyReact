import NavBarItem from '../NavBarItem/NavBarItem';
import './NavBar.module.css'

const NavBar = () =>{
    return(
        <nav>
            <div className='navbar'>
                <NavBarItem link ="/home">Home Page</NavBarItem>
                <NavBarItem link ="/details">Details</NavBarItem>
                <NavBarItem link ="/User/Login">Login/Register</NavBarItem>
            </div>
        </nav>

    )
}

export default NavBar;