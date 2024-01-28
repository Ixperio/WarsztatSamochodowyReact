import apiService from "../services/apiService"
import DisplayData from "../components/DisplayDataComponent/DisplayData"
import UpdateButton from "../components/ButtonComponent/UpdateButton"
import Button from "../components/ButtonComponent/Button"


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

const Edit = () =>{
    return(
        <div>
            <div className="user_data">
                <DisplayData value={""}>Imię:</DisplayData>
                <DisplayData value={""}>Nazwisko:</DisplayData>
                <input type="text" name="name" className="update_input" value={userdata.name}/>
                <input type="text" name="surname" className="update_input" value={userdata.surname}/>
                <UpdateButton value="/UpdateName">Aktualizuj</UpdateButton>
                <UpdateButton value="/UpdateSurname">Aktualizuj</UpdateButton>
                <DisplayData value={""}>Nr. Telefonu:</DisplayData>
                <DisplayData value={""}>Adres:</DisplayData>
                <input type="text" name="phone" className="update_input" value={userdata.phone}/>
                <input type="text" name="address" className="update_input" value={userdata.adress}/>
                <UpdateButton value="/UpdatePhone">Aktualizuj</UpdateButton>
                <UpdateButton value="/UpdateAdress">Aktualizuj</UpdateButton>
                <DisplayData value={""}>Miasto:</DisplayData>
                <DisplayData value={""}>Kod Pocztowy:</DisplayData>
                <input type="text" name="city" className="update_input" value={userdata.city}/>
                <input type="text" name="postcode" className="update_input" value={userdata.postCode}/>
                <UpdateButton value="/UpdatCity">Aktualizuj</UpdateButton>
                <UpdateButton value="/UpdatePost">Aktualizuj</UpdateButton>
                <DisplayData value={userdata.birthday}>Data urodzin:</DisplayData>
                <DisplayData value={userdata.email}>Email:</DisplayData>
            </div>
            <Button link="/User/Profile">Powrót</Button>
        </div>
    )
}

export default Edit;