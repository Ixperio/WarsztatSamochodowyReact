import { useState } from "react";
import DisplayData from "../components/DisplayDataComponent/DisplayData";
import UpdateButton from "../components/ButtonComponent/UpdateButton";


const DeleteUser = () =>{

    const [password, setPassword] = useState(""); // State to manage the input value

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    };


    return(
        <div className="user_delete">
             <DisplayData value={""}>Podaj Hasło:</DisplayData>
             <input type="password" name="password" value={password} onChange={handlePasswordChange}/><br />
             <UpdateButton style="red" value="DeleteUser" data={password}>Usuń Konto</UpdateButton>
        </div>
    )
}

export default DeleteUser;