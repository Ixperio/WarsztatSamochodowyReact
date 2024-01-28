import { useState, useEffect } from 'react'; 
import apiService from '../../services/apiService';
import NavBarItem from '../NavBarItem/NavBarItem';
import './NavBar.module.css'

const NavBar = () => {
    const [isLogged, setIsLogged] = useState(false);
  
    const testing = async () => {
      try {
        const apiStatus = await apiService.getTestPerson();
  
        if (apiStatus === 'Success') {
          const userLogged = await apiService.isUserLogged();
          setIsLogged(userLogged);
        }
  
        console.log(apiStatus);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    useEffect(() => {
      testing();
    }, []); 
  
    return (
      <nav>
        <div className='navbar'>
          <p className='fat'></p>
          <p><NavBarItem link="/home">Home Page</NavBarItem></p>
          <p><NavBarItem link="/details">Details</NavBarItem></p>
          {isLogged ? (
            <p><NavBarItem link="User/Profile">User Profile</NavBarItem></p>
          ) : (
            <p><NavBarItem link="User/Login">Login/Register</NavBarItem></p>
          )}
          <p className='fat'></p>
        </div>
      </nav>
    );
  };
  
  export default NavBar;