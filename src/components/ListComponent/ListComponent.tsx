import "./ListComponent.module.css"
import React from "react";

interface ListComponentProps{
    // children: React.ReactNode;
    id: number;
    name: string;
    rejestracja: string;
}


const ListComponent: React.FC<ListComponentProps> = (props) =>{
    return(
        <tr className="list_item">
            <td className="list_value">{props.id}</td>
            <td className="list_value">{props.name}</td>
            <td className="list_value">{props.rejestracja}</td>
        </tr>
    )
}
export default ListComponent;