import { useEffect, useState } from "react";
import apiService from "../../services/apiService";
import DisplayData from "../../components/DisplayDataComponent/DisplayData";
import { useParams } from "react-router-dom";
import UpdateButton from "../../components/ButtonComponent/UpdateButton";

interface WersjaMarkaPaliwo{
    name: string
}
 
interface ModelSamochodu{
    name: string;
    wersjaNadwozia: WersjaMarkaPaliwo;
    marka: WersjaMarkaPaliwo;
}

interface AddWork{
    samochodId: number;
    rodzajUslugiId: number;
    dataPrzekazaniaPojazdu: Date;
    opisZdarzenia: string;
    trustString?: string;
}  

interface MyCar{
    id: number;
    vin: string;
    nazwa: string;
    modelSamochodu: ModelSamochodu
    rokProdukcji: string;
    rodzajPaliwa: WersjaMarkaPaliwo;
    pojemnoscSkokowa: string;
    przebieg: string
    nr_rejestracyjny: string;
}

const CarDetails = () => {
    const { id } = useParams();
    const [cars, setCars] = useState<MyCar[] | undefined>(undefined);
    const [currentId, setCurrentId] = useState<number>(0);

    const [addWorkData, setAddWorkData] = useState<AddWork>({
        samochodId: 1,
        rodzajUslugiId: 0,
        dataPrzekazaniaPojazdu: new Date(),
        opisZdarzenia: "",
        trustString: undefined,
      });
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await apiService.getMyCars();
          setCars(data as MyCar[] | undefined);
  
          if (id) {
            const parsedId = +id;
            console.log("ID jest:", parsedId);
            setCurrentId(parsedId);
          } else {
            console.log("ID nie ma");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, [id]); // Run whenever the 'id' parameter changes

    const handleDetailsInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddWorkData((prevData) => ({
          ...prevData,
          opisZdarzenia: e.target.value,
        }));
      };
    
      const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddWorkData((prevData) => ({
          ...prevData,
          dataPrzekazaniaPojazdu: new Date(e.target.value),
        }));
      };
    
      const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setAddWorkData((prevData) => ({
          ...prevData,
          rodzajUslugiId: parseInt(e.target.value),
        }));
      };
    return (
      <div>
        <div className="list_title">Szczegóły pojazdu:</div>
        {cars ? (
  cars.length > 0 ? (
    <div>
        <div className="user_data">
            <DisplayData value={cars.find(car => car.id === currentId)?.nazwa || "No cars found"}>Nazwa</DisplayData>
            <DisplayData value={cars.find(car => car.id === currentId)?.nr_rejestracyjny || "No cars found"}>Nr. Rejestracyjny</DisplayData>
            <DisplayData value={cars.find(car => car.id === currentId)?.vin || "No cars found"}>Vin</DisplayData>
            <DisplayData value={cars.find(car => car.id === currentId)?.rodzajPaliwa.name || "No cars found"}>Rodzaj paliwa</DisplayData>
            <DisplayData value={cars.find(car => car.id === currentId)?.modelSamochodu.marka.name || "No cars found"}>Marka</DisplayData>
            <DisplayData value={cars.find(car => car.id === currentId)?.modelSamochodu.wersjaNadwozia.name || "No cars found"}>Wersja Nadwozia:</DisplayData>
            <DisplayData value={cars.find(car => car.id === currentId)?.przebieg || "No cars found"}>Przebieg</DisplayData>
            <DisplayData value={cars.find(car => car.id === currentId)?.pojemnoscSkokowa || "No cars found"}>Pojemność skokowa:</DisplayData>
            <DisplayData value={cars.find(car => car.id === currentId)?.rokProdukcji || "No cars found"}>Rok produkcji</DisplayData>
        </div>
        <input
        type="text"
        placeholder="Podaj szczegóły"
        value={addWorkData.opisZdarzenia}
        onChange={handleDetailsInputChange}
      />
      <br />
      <input
        type="date"
        name="date"
        value={addWorkData.dataPrzekazaniaPojazdu.toISOString().split("T")[0]}
        onChange={handleDateInputChange}
      />
      <select
        name="workName"
        className="xd"
        value={addWorkData.rodzajUslugiId.toString()}
        onChange={handleSelectChange}
      >
        <option value="2">Naprawa</option>
        <option value="3">Lakierowanie</option>
      </select>
      <br />
      <UpdateButton
        value="AddWork"
        long_data2 = {addWorkData}
        data="bruh"
      >
        Zamów Usługę
      </UpdateButton>
    </div>
  ) : (
    "No cars found"
  )
) : (
  <p>Loading...</p>
)}

        <div className="list_items">
        </div>
      </div>
    );
  };
  
export default CarDetails;