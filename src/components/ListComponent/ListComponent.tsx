import "./ListComponent.module.css"
import React from "react";

interface ListComponentProps{
    // children: React.ReactNode;
    id: number;
    name: string;
    done: boolean;
    random: boolean;
}


const ListComponent: React.FC<ListComponentProps> = (props) =>{
    let isdone: string
    if(props.done){
        isdone = "Tak"
    }else{
        isdone = "Nie"
    }
    return(
        <tr className="list_item">
            <td className="list_value">{props.id}</td>
            <td className="list_value">{props.name}</td>
            <td className="list_value">{isdone}</td>
            { props.random ? (<td>Essa</td>):("")}
        </tr>
    )
}
export default ListComponent;