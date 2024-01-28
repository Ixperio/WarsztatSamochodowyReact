import { useNavigate } from "react-router-dom";
import "./ListComponent.module.css"
import React from "react";

interface ListComponentProps{
    // children: React.ReactNode;
    id: number;
    name: string;
    rejestracja: string;
}


const ListComponent: React.FC<ListComponentProps> = (props) =>{
    const navigate = useNavigate();

    const handleClick = () => {
        // Navigate to the specified URL when the tr element is clicked
        navigate(`${props.id}`);
      };
    return(
            <tr className="list_item" onClick={handleClick}>
                <td className="list_value">{props.id}</td>
                <td className="list_value">{props.name}</td>
                <td className="list_value">{props.rejestracja}</td>
            </tr>
    )
}
export default ListComponent;