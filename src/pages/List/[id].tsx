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
    console.log(currentId)
    console.log(typeof(currentId))
  
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
        <input type="text" placeholder="Podaj szczegóły"/><br />
        <select name="" id=""></select><br />
        <UpdateButton value="test" data="test">Zamów Usługę</UpdateButton>
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