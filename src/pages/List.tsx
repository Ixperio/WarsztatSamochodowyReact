import ListComponent from "../components/ListComponent/ListComponent";
import '../App.css'
import apiService from "../services/apiService";
import { useEffect, useState } from "react";
import Button from "../components/ButtonComponent/Button";

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
    rokProdukcji: number;
    rodzajPaliwa: WersjaMarkaPaliwo;
    pojemnoscSkokowa: number;
    prezbieg: number;
    nr_rejestracyjny: string;
}

//komponent prezentacyjny
const List: React.FC = () => {
    const [cars, setCars] = useState<MyCar[] | undefined>(undefined);
  
    useEffect(() => {
      const fetchData = async () => {
        const data = await apiService.getMyCars();
        setCars(data as MyCar[] | undefined);
      };
  
      fetchData();
    }, []); // Run once on component mount
  
    return (
      <div>
        <div className="list_title">Lista zarejestrowanych w bazie pojazdów:</div>
        <div className="list_items">
          {cars ? (
            <table className="registered_cars">
              <tbody>
                <tr>
                  <th>ID</th>
                  <th>Nazwa</th>
                  <th>Nr Rejestracyjny</th>
                </tr>
                {cars.map((car) => (
                         <ListComponent key={car.id} name={car.nazwa} id={car.id} rejestracja={car.nr_rejestracyjny} />
                ))}
              </tbody>
            </table>
          ) : (
            <p>Loading...</p>
          )}
          <Button link="/AddCar">Add Car</Button>
        </div>
      </div>
    );
  };
  
  export default List;