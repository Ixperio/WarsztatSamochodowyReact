import apiService from "../../services/apiService";

interface AddNewCar{
    vin: string;
    nazwa: string;
    modelSamochoduId: number;
    rokProdukcji: number;
    pojemnoscSkokowa: number;
    rodzajPaliwaId: number;
    przebieg: number;
    nr_rejestracyjny: string;
    trustString?: string;
}

interface ButtonProps{
    // children: React.ReactNode;
    value: string;
    children: string;
    data: string | undefined;
    style?: React.CSSProperties | string;
    long_data?: AddNewCar | undefined;
}

const deleteusek = async (data: string) =>{
    if(await apiService.delete(data)){
        alert("Usunięto!")
    }else{
        alert("Błąd usuwania")
    }
}

const Button: React.FC<ButtonProps> = (props) =>{

//stylowanie Przycisku
    const buttonStyle: React.CSSProperties | undefined =
    typeof props.style === 'string'
      ? { backgroundColor: props.style } // Assuming the string is a color value
      : props.style;

    let x: number = 0;
    switch (props.value){
        case "DeleteUser":
            x = 0
            break;
        case "UpdateName":
            x = 1
            break;
        case "UpdateSurname":
            x = 2
            break;
        case "UpdatePhone":
            x = 3
            break;
        case "UpdateAdress":
            x = 4
            break;
         case "UpdateCity":
            x = 5
            break;
        case "UpdatePost":
            x = 6
            break;
        case "AddCar":
            x = 10
            break;
        default:
            console.error("Value not declared")
            break;
    }
    const handleClick = () => {
        if(props.data !== undefined){
            if (props.long_data !== undefined) {
                switch (x) {
                    case 1:
                        apiService.updateName(props.data)
                        break;
                    case 2:
                        apiService.updateSurname(props.data)
                        break;
                    case 3:
                        apiService.updatePhone(props.data)
                        break;
                    case 4:
                        apiService.updateAddress(props.data)
                        break;
                    case 5:
                        apiService.updateCity(props.data)
                        break;
                    case 6:
                        apiService.updatePost(props.data)
                        break;
                    case 10:
                        apiService.addCar(props.long_data)
                        break;
                    case 0:
                        deleteusek(props.data)
                        break;
                    default:
                        console.error("Updating index wrong!")
                        break;
                }
                console.log("Update")
            }else{
                console.log("Wartość nie może być pusta!")
            }
        }else{
            console.log("Wartość nie może być pusta!")
        }
    };
    return(
        <button type="button"  className="update_button" onClick={handleClick} style={buttonStyle}>{props.children}</button>
    )
}

export default Button;