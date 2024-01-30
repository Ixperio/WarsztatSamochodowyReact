interface DisplayDataProps {
    children: React.ReactNode;
    value: string | undefined;
}


const DisplayData: React.FC<DisplayDataProps> = (props) =>{
    return(
        <div>
            <h4 className="display_data_name" style={{width: "100%", textAlign: "left"}}>{props.children}</h4>
            <h3 className="display_data_value" style={{width: "100%", textAlign: "left"}}>{props.value}</h3>
        </div>
        
    )
}
export default DisplayData;