import { useEffect, useState } from "react";
import apiService from "../services/apiService";
import DisplayData from "../components/DisplayDataComponent/DisplayData";
import UpdateButton from "../components/ButtonComponent/UpdateButton";
import Button from "../components/ButtonComponent/Button";

interface FuelCarTypes{
    id: number,
    name: string
}

console.log(await apiService.getFuelTypes())
const AddCar = () => { 
    // State variables
    const [inputValue, setInputValue] = useState<string>("");
    const [inputSurname, setInputSurname] = useState<string>("");
    const [inputPhone, setInputPhone] = useState<string>("");
    const [inputAddress, setInputAddress] = useState<string>("");
    const [inputCity, setInputCity] = useState<string>("");
    const [inputPost, setinputPost] = useState<string>("");
    const [fuelTypes, setFuelTypes] = useState<FuelCarTypes[]>([]);

    useEffect(() => {
        const fetchFuelTypes = async () => {
          try {
            const response: FuelCarTypes = await apiService.getFuelTypes();
            setFuelTypes([response]); // Assuming the API response is an array of FuelCarTypes
          } catch (error) {
            console.error("Error fetching fuel types:", error);
          }
        };
    
        fetchFuelTypes();
      }, []);
  
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
                <DisplayData value={""}>VIN:</DisplayData>
                <DisplayData value={""}>Nazwa:</DisplayData>
                <input type="text" name="vin" className="update_input" value={inputValue} onChange={handleInputChange}/>
                <input type="text" name="name" className="update_input" value={inputSurname}  onChange={handleSurnameChange}/>
                <DisplayData value={""}>Model Samochodu:</DisplayData>
                <DisplayData value={""}>Rok Produkcji:</DisplayData>
                <input type="text" name="model" className="update_input" value={inputPhone}  onChange={handlePhoneChange}/>
                <input type="text" name="year" className="update_input" value={inputAddress}  onChange={handleAddressChange}/>
                <DisplayData value={""}>Pojemność Skokowa:</DisplayData>
                <DisplayData value={""}>Rodzaj Paliwa:</DisplayData>
                <select
                    name="fuelType"
                    className="update_input"
                    value={inputPost}
                    onChange={(event) => setinputPost(event.target.value)}
                    >
                    <option value="">Select Fuel Type</option>
                    {fuelTypes.map((fuelType) => (
                        <option key={fuelType.id} value={fuelType.name}>
                        {fuelType.name}
                        </option>
                    ))}
                </select>

                {/* <input type="text" name="capacity" className="update_input" value={inputCity}  onChange={handleCityChange}/> */}
                <input type="text" name="fuelType" className="update_input" value={inputPost}  onChange={handlePostChange}/>
                <DisplayData value="">Przebieg:</DisplayData>
                <DisplayData value="">Nr Rejestracyjny:</DisplayData>
                <input type="text" name="mileage" className="update_input" value={inputCity}  onChange={handleCityChange}/>
                <input type="text" name="registration" className="update_input" value={inputPost}  onChange={handlePostChange}/>
            </div>
            <UpdateButton data={inputValue} value="UpdateName">Aktualizuj</UpdateButton><br />
            <Button link="/List">Powrót</Button>
        </div>
    )
}

export default AddCar;