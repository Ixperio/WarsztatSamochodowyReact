import "./NavBarItem.css"
import React from "react";
import { useNavigate } from 'react-router-dom';

interface NavBarItemProps {
    children: React.ReactNode;
    link: string;
}

const NavBarItem: React.FC<NavBarItemProps> = (props) => {
    const navigate = useNavigate();
    const handleClick = () => {
        // Przykład użycia navigate do przekierowania do innej ścieżki
        navigate(props.link);
      };
    return(
        <a onClick={handleClick} className="navItemStyle">{props.children}</a>
    )
}

export default NavBarItem;