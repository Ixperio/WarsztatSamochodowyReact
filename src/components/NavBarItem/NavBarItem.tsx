import React from "react";
import { Link } from 'react-router-dom'

interface NavBarItemProps {
    children: React.ReactNode;
    link: string;
  }

  const NavBarItem: React.FC<NavBarItemProps> = (props) => {
    return(
        <>
        <Link to = {props.link}>
            <h2>{props.children}</h2>
        </Link>

        </>
    )
}

export default NavBarItem;