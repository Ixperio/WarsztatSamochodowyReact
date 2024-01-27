import NavBarItem from '../NavBarItem/NavBarItem';
import './NavBar.module.css'

const NavBar = () =>{
    return(
        <nav>
            <div className='navbar'>
                <p className='fat'></p>
                <p><NavBarItem link ="/home">Home Page</NavBarItem></p>
                <p><NavBarItem link ="/details">Details</NavBarItem></p>
                <p><NavBarItem link ="User/Login">Login/Register</NavBarItem></p>
                <p className='fat'></p>
            </div>
        </nav>

    )
}

export default NavBar;