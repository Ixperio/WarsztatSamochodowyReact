import apiService from "../services/apiService"
import DisplayData from "../components/DisplayDataComponent/DisplayData"
import UpdateButton from "../components/ButtonComponent/UpdateButton"
import Button from "../components/ButtonComponent/Button"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"


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

// let iflogged:boolean = true
// let userdata :UserData
// let userdatahelp: undefined | UserData
// const testiong = async () =>{
//     console.log(await apiService.getUserData())
//     userdatahelp = await apiService.getUserData();
//     if (userdatahelp !== undefined) {
//         userdata = userdatahelp;
//         iflogged = true;
//     }else{
//        iflogged = false
//     }
// }

// await testiong();

const Edit: React.FC = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState<UserData | undefined>(undefined);
  
    // Function to fetch user data
    const getUserData = async () => {
      try {
        const fetchedUserData = await apiService.getUserData();
        return fetchedUserData;
      } catch (error) {
        // Handle error if needed
        console.error("Error fetching user data", error);
        return undefined;
      }
    };
  
    // Use useEffect to handle redirection and fetch user data
    useEffect(() => {
      const fetchData = async () => {
        const fetchedUserData = await getUserData();
  
        if (fetchedUserData !== undefined) {
          // Set the user data
          setUserData(fetchedUserData);
        } else {
          // Redirect to home if user is not logged in
          navigate("/home");
        }
      };
  
      fetchData(); // Invoke the fetchData function inside useEffect
    }, [navigate]); // Add navigate as a dependency to useEffect if it's used inside
  
    // State variables
    const [inputValue, setInputValue] = useState<string | undefined>(userData?.name || "");
    const [inputSurname, setInputSurname] = useState<string>("");
    const [inputPhone, setInputPhone] = useState<string>("");
    const [inputAddress, setInputAddress] = useState<string>("");
    const [inputCity, setInputCity] = useState<string>("");
    const [inputPost, setinputPost] = useState<string>("");
  
    // Event handlers
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
    };
    const handleSurnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputSurname(event.target.value);
    };
    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputPhone(event.target.value);
    };
    const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputAddress(event.target.value);
    };
    const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputCity(event.target.value);
    };
    const handlePostChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setinputPost(event.target.value);
    };
    

    return(
        <div>
            <div className="user_data">
                <DisplayData value={""}>Imię:</DisplayData>
                <DisplayData value={""}>Nazwisko:</DisplayData>
                <input type="text" name="name" className="update_input" value={inputValue} onChange={handleInputChange}/>
                <input type="text" name="surname" className="update_input" value={inputSurname}  onChange={handleSurnameChange}/>
                <UpdateButton data={inputValue} value="UpdateName">Aktualizuj</UpdateButton>
                <UpdateButton data={inputSurname} value="UpdateSurname">Aktualizuj</UpdateButton>
                <DisplayData value={""}>Nr. Telefonu:</DisplayData>
                <DisplayData value={""}>Adres:</DisplayData>
                <input type="text" name="phone" className="update_input" value={inputPhone}  onChange={handlePhoneChange}/>
                <input type="text" name="address" className="update_input" value={inputAddress}  onChange={handleAddressChange}/>
                <UpdateButton data={inputPhone} value="UpdatePhone">Aktualizuj</UpdateButton>
                <UpdateButton data={inputAddress} value="UpdateAdress">Aktualizuj</UpdateButton>
                <DisplayData value={""}>Miasto:</DisplayData>
                <DisplayData value={""}>Kod Pocztowy:</DisplayData>
                <input type="text" name="city" className="update_input" value={inputCity}  onChange={handleCityChange}/>
                <input type="text" name="postcode" className="update_input" value={inputPost}  onChange={handlePostChange}/>
                <UpdateButton data={inputCity} value="UpdateCity">Aktualizuj</UpdateButton>
                <UpdateButton data={inputPost} value="UpdatePost">Aktualizuj</UpdateButton>
                <DisplayData value={userData?.birthday}>Data urodzin:</DisplayData>
                <DisplayData value={userData?.email}>Email:</DisplayData>
            </div>
            <Button link="/User/Profile">Powrót</Button>
        </div>
    )
}

export default Edit;