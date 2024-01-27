import "./ListComponent.module.css"
import React from "react";

interface ListComponentProps{
    // children: React.ReactNode;
    id: number;
    name: string;
    done: boolean;
}

const ListComponent: React.FC<ListComponentProps> = (props) =>{
    let isdone: string
    if(props.done){
        isdone = "Tak"
    }else{
        isdone = "Nie"
    }
    return(
        <>
        <h3>ID: {props.id}</h3>
        <h3>Nazwa: {props.name}</h3>
        <h3>Czy zrobione: {isdone}</h3><br />
        </>
    )
}
export default ListComponent;