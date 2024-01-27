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
        navigate(props.link);
      };
    return(
        <a onClick={handleClick} className="navItemStyle">{props.children}</a>
    )
}

export default NavBarItem;