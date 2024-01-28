import apiService from "../../services/apiService";

interface ButtonProps{
    // children: React.ReactNode;
    value: string;
    children: string;
    data: string;
}

const Button: React.FC<ButtonProps> = (props) =>{
    let x: number = 0;
    switch (props.value){
        case "UpdateName":
            console.log(props.data)
            x = 1
            break;
        case "UpdateSurname":
            x = 2
            break;
        case "UpdatePhone":
            x = 3
            break;
        case "UpdateAddress":
            x = 4
            break;
         case "UpdateCity":
            x = 5
            break;
        case "UpdatePost":
            x = 6
            break;
        default:
            console.error("Value not declared")
            break;
    }
    const handleClick = () => {
        switch (x) {
            case 1:
                apiService.updateName(props.data)
                break;
        
            default:
                console.error("Updating index wrong!")
                break;
        }
        console.log("Update")
    };
    return(
        <button type="button"  className="update_button" onClick={handleClick}>{props.children}</button>
    )
}

export default Button;