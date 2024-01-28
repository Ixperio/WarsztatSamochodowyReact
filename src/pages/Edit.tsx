import apiService from "../services/apiService"
import DisplayData from "../components/DisplayDataComponent/DisplayData"
import UpdateButton from "../components/ButtonComponent/UpdateButton"
import Button from "../components/ButtonComponent/Button"
import { useState } from "react"


interface UserData{
    name: string,
    surname: string,
    birthday: string,
    email: string,
    city: string,
    postCode: string,
    adress: string,
    phone: string
}

let userdata :UserData
const testiong = async () =>{
    console.log(await apiService.getUserData())
    userdata = await apiService.getUserData();
}

await testiong();

const Edit: React.FC = () =>{
    const [inputValue, setInputValue] = useState(userdata.name);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
    };
    

    return(
        <div>
            <div className="user_data">
                <DisplayData value={""}>Imię:</DisplayData>
                <DisplayData value={""}>Nazwisko:</DisplayData>
                <input type="text" name="name" className="update_input" value={inputValue} onChange={handleInputChange}/>
                <input type="text" name="surname" className="update_input" value={userdata.surname}  onChange={handleInputChange}/>
                <UpdateButton data={inputValue} value="UpdateName">Aktualizuj</UpdateButton>
                <UpdateButton data={userdata.surname} value="UpdateSurname">Aktualizuj</UpdateButton>
                <DisplayData value={""}>Nr. Telefonu:</DisplayData>
                <DisplayData value={""}>Adres:</DisplayData>
                <input type="text" name="phone" className="update_input" value={userdata.phone}  onChange={handleInputChange}/>
                <input type="text" name="address" className="update_input" value={userdata.adress}  onChange={handleInputChange}/>
                <UpdateButton data={userdata.phone} value="UpdatePhone">Aktualizuj</UpdateButton>
                <UpdateButton data={userdata.adress} value="UpdateAdress">Aktualizuj</UpdateButton>
                <DisplayData value={""}>Miasto:</DisplayData>
                <DisplayData value={""}>Kod Pocztowy:</DisplayData>
                <input type="text" name="city" className="update_input" value={userdata.city}  onChange={handleInputChange}/>
                <input type="text" name="postcode" className="update_input" value={userdata.postCode}  onChange={handleInputChange}/>
                <UpdateButton data={userdata.city} value="UpdateCity">Aktualizuj</UpdateButton>
                <UpdateButton data={userdata.postCode} value="UpdatePost">Aktualizuj</UpdateButton>
                <DisplayData value={userdata.birthday}>Data urodzin:</DisplayData>
                <DisplayData value={userdata.email}>Email:</DisplayData>
            </div>
            <Button link="/User/Profile">Powrót</Button>
        </div>
    )
}

export default Edit;