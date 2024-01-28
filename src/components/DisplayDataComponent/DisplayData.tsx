interface DisplayDataProps {
    children: React.ReactNode;
    value: string;
}


const DisplayData: React.FC<DisplayDataProps> = (props) =>{
    return(
        <div>
            <h4 className="display_data_name">{props.children}</h4>
            <h3 className="display_data_value">{props.value}</h3>
        </div>
        
    )
}
export default DisplayData;