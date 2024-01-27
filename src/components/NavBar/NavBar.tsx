import NavBarItem from '../NavBarItem/NavBarItem';
import './NavBar.module.css'

const NavBar = () =>{
    return(
        <nav>
            <div className='navbar'>
                <p className='fat'></p>
                <NavBarItem link ="/home">Home Page</NavBarItem>
                <NavBarItem link ="/details">Details</NavBarItem>
                <NavBarItem link ="User/Login">Login/Register</NavBarItem>
                <p className='fat'></p>
            </div>
        </nav>

    )
}

export default NavBar;