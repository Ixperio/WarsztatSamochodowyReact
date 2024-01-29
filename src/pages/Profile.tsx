import apiService from "../services/apiService"
import DisplayData from "../components/DisplayDataComponent/DisplayData"
import Button from "../components/ButtonComponent/Button"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

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
//         iflogged = true
//     }else{
//         iflogged = false
//     }
// }

// await testiong();

const Profile = () => {
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
  
    // Conditional rendering based on whether user data is available
    if (userData === undefined) {
      // You might want to render a loading state or something else here
      return <div>Loading...</div>;
    }
  
    // Render the component JSX using the user data
    return (
      <div>
        <div className="user_data">
          <DisplayData value={userData.name}>Imię:</DisplayData>
          <DisplayData value={userData.surname}>Nazwisko:</DisplayData>
          <DisplayData value={userData.email}>Email:</DisplayData>
          <DisplayData value={userData.phone}>Nr. Telefonu:</DisplayData>
          <DisplayData value={userData.city}>Miasto:</DisplayData>
          <DisplayData value={userData.postCode}>Kod Pocztowy:</DisplayData>
          <DisplayData value={userData.adress}>Adres:</DisplayData>
          <DisplayData value={userData.birthday}>Data urodzin:</DisplayData>
        </div>
        <Button link={"/User/Edit"}>Edytuj</Button><br />
        <Button style="red" link={"/User/Delete"}>Usuń Konto</Button>
      </div>
    );
  };
  
  export default Profile;