import React, { useState, useEffect } from 'react'; 
import NavBarItem from '../NavBarItem/NavBarItem';
import './NavBar.module.css'
import Cookies from 'js-cookie';

const NavBar = () => {
  const [isLogged, setIsLogged] = useState(false);

  const checkLoggedStatus = async () => {
    if (Cookies.get("trustString") !== undefined) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }

  useEffect(() => {
    checkLoggedStatus();
    const intervalId = setInterval(() => {
        checkLoggedStatus();
      }, 1000);
  
      // Czyszczenie intervalu po odmontowaniu komponentu
      return () => clearInterval(intervalId);
  }, []); // Użyj useEffect do wywołania funkcji raz po zamontowaniu komponentu

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