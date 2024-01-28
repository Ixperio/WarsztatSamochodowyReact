import apiService from "../services/apiService"
import DisplayData from "../components/DisplayDataComponent/DisplayData"
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

const Profile = () =>{
    return(
        <div>
            <div className="user_data">
                <DisplayData value={userdata.name}>Imię:</DisplayData>
                <DisplayData value={userdata.surname}>Nazwisko:</DisplayData>
                <DisplayData value={userdata.email}>Email:</DisplayData>
                <DisplayData value={userdata.phone}>Nr. Telefonu:</DisplayData>
                <DisplayData value={userdata.city}>Miasto:</DisplayData>
                <DisplayData value={userdata.postCode}>Kod Pocztowy:</DisplayData>
                <DisplayData value={userdata.adress}>Adres:</DisplayData>
                <DisplayData value={userdata.birthday}>Data urodzin:</DisplayData>
            </div>
            <Button link={"/User/Edit"}>Edytuj</Button><br />
            <Button link={"/User/Delete"}>Usuń Konto</Button>
        </div>
    )
}

export default Profile;