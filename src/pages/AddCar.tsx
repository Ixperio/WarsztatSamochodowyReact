import { useEffect, useState } from "react";
import apiService from "../services/apiService";
import DisplayData from "../components/DisplayDataComponent/DisplayData";
import UpdateButton from "../components/ButtonComponent/UpdateButton";
import Button from "../components/ButtonComponent/Button";

interface FuelCarTypes{
    id: number,
    name: string
}

interface WersjaMarkaPaliwo{
    name: string
  }

interface CarModelOutput{
    id: number;
    name: string;
    wersjaNadwozia: WersjaMarkaPaliwo;
    marka: WersjaMarkaPaliwo;
}

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


const AddCar = () => {
    const [carModelsTypes, setCarModelsTypes] = useState<FuelCarTypes[]>([]);
    const [selectedCarModelTypes, setSelectedCarModelTypes] = useState<string>("");
    
    const [fuelTypes, setFuelTypes] = useState<FuelCarTypes[]>([]);
    const [selectedFuelType, setSelectedFuelType] = useState<string>("");
    
    const [carBrands, setCarBrands] = useState<FuelCarTypes[]>([]);
    const [selectedCarBrands, setSelectedCarBrands] = useState<string>("");

    const [carModels, setCarModels] = useState<CarModelOutput[]>([]);
    const [selectedCarModels, setSelectedCarModels] = useState<string>("");
    // State variables
    const [inputValue, setInputValue] = useState<string>("");
    const [inputSurname, setInputSurname] = useState<string>("");
    const [inputPhone, setInputPhone] = useState<string>("");
    const [inputAddress, setInputAddress] = useState<string>("");
    const [inputCity, setInputCity] = useState<string>("");
    const [inputPost, setinputPost] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiService.getFuelTypes();
                if (Array.isArray(response)) {
                  setFuelTypes(response);
                } else {
                  console.error("Invalid response format for fuel types.");
                }
              } catch (error) {
                console.error("Error fetching fuel types:", error);
              }
            };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiService.getCarModelTypes();
                if (Array.isArray(response)) {
                    setCarModelsTypes(response);
                } else {
                  console.error("Invalid response format for fuel types.");
                }
              } catch (error) {
                console.error("Error fetching fuel types:", error);
              }
            };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiService.getCarBrand();
                if (Array.isArray(response)) {
                    setCarBrands(response);
                } else {
                  console.error("Invalid response format for fuel types.");
                }
              } catch (error) {
                console.error("Error fetching fuel types:", error);
              }
            };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (selectedCarModelTypes && selectedCarBrands) {
                    const response = await apiService.getCarModels(
                        selectedCarModelTypes,
                        selectedCarBrands
                    );

                    if (Array.isArray(response)) {
                        setCarModels(response);
                    } else {
                        console.error("Invalid response format for car models.");
                    }
                }
            } catch (error) {
                console.error("Error fetching car models:", error);
            }
        };

        fetchData();
    }, [selectedCarModelTypes, selectedCarBrands]);

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

    const handleFuelTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedFuelType(event.target.value);
    };

    const handleModelTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCarModelTypes(event.target.value);
    };

    const handleBrandChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCarBrands(event.target.value);
    };

    const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCarModels(event.target.value);
    };

    const createAddNewCarObject = (): AddNewCar | undefined => {
        if (
            inputValue.trim() === "" ||
            inputSurname.trim() === "" ||
            selectedCarModels.trim() === "" ||
            inputAddress.trim() === "" ||
            inputPost.trim() === "" ||
            selectedFuelType.trim() === "" ||
            inputCity.trim() === "" ||
            inputPhone.trim() === ""
            // selectedCarModelTypes.trim() === "" ||
            // selectedCarBrands.trim() === ""
        ) {
            // If any required value is missing, return null
            return undefined;
        }else{
            return {
                vin: inputValue,
                nazwa: inputSurname,
                modelSamochoduId: Number(selectedCarModels), // Convert to number if needed
                rokProdukcji: Number(inputAddress), // Convert to number if needed
                pojemnoscSkokowa: Number(inputPost), // Convert to number if needed
                rodzajPaliwaId: Number(selectedFuelType), // Convert to number if needed
                przebieg: Number(inputCity), // Convert to number if needed
                nr_rejestracyjny: inputPhone,
            };
        }

    };


    // console.log(carModels)
    return(
        <div>
            <div className="user_data">
                <DisplayData value={""}>VIN:</DisplayData>
                <DisplayData value={""}>Nazwa:</DisplayData>
                <input type="text" name="vin" className="update_input" value={inputValue} onChange={handleInputChange}/>
                <input type="text" name="name" className="update_input" value={inputSurname}  onChange={handleSurnameChange}/>
                <DisplayData value={""}>Model Samochodu:</DisplayData>
                <DisplayData value={""}>Rok Produkcji:</DisplayData>
                {/* <input type="text" name="model" className="update_input" value={inputPhone}  onChange={handlePhoneChange}/> */}
                <select
                    name="fuelType"
                    className="update_input"
                    value={selectedCarModels}
                    onChange={handleModelChange}
                    >
                    <option value="">Wybierz...</option>
                    {carModels.map((model) => (
                        <option key={model.id} value={model.id}>
                        {model.name}
                        </option>
                    ))}
                </select>
                <input type="number" name="year" className="update_input" value={inputAddress}  onChange={handleAddressChange}/>
                <DisplayData value={""}>Pojemność Skokowa:</DisplayData>
                <DisplayData value={""}>Rodzaj Paliwa:</DisplayData>
                <input type="number" name="capacity" className="update_input" value={inputPost}  onChange={handlePostChange}/>
                <select
                    name="fuelType"
                    className="update_input"
                    value={selectedFuelType}
                    onChange={handleFuelTypeChange}
                    >
                    <option value="">Wybierz...</option>
                    {fuelTypes.map((fuelType) => (
                        <option key={fuelType.id} value={fuelType.id}>
                        {fuelType.name}
                        </option>
                    ))}
                </select>
                {/* <input type="text" name="fuelType" className="update_input" value={inputCity}  onChange={handleCityChange}/> */}
                <DisplayData value="">Przebieg:</DisplayData>
                <DisplayData value="">Nr Rejestracyjny:</DisplayData>
                <input type="number" name="mileage" className="update_input" value={inputCity}  onChange={handleCityChange}/>
                <input type="text" name="registration" className="update_input" value={inputPhone}  onChange={handlePhoneChange}/>
                <DisplayData value={""}>Typ samochodu:</DisplayData>
                <DisplayData value={""}>Marka Samochodu:</DisplayData>
                <select
                    name="model"
                    className="update_input"
                    value={selectedCarModelTypes}
                    onChange={handleModelTypeChange}
                    >
                    <option value="">Wybierz...</option>
                    {carModelsTypes.map((modelType) => (
                        <option key={modelType.id} value={modelType.id}>
                        {modelType.name}
                        </option>
                    ))}
                </select>
                <select
                    name="brand"
                    className="update_input"
                    value={selectedCarBrands}
                    onChange={handleBrandChange}
                    >
                    <option value="">Wybierz...</option>
                    {carBrands.map((brand) => (
                        <option key={brand.id} value={brand.id}>
                        {brand.name}
                        </option>
                    ))}
                </select>
            </div>
            <UpdateButton data="Add" long_data={createAddNewCarObject()} value="AddCar">Dodaj Samochód</UpdateButton><br />
            <Button link="/List">Powrót</Button>
        </div>
    )
}

export default AddCar;