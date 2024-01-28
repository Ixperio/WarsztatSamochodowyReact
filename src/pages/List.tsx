import ListComponent from "../components/ListComponent/ListComponent";
import '../App.css'
import apiService from "../services/apiService";

//komponent prezentacyjny
const List = () =>{
    let epe: object
    let eppe: boolean
    const testing = async () =>{
        epe = await apiService.getFuelTypes();
        console.log(epe)
        eppe = await apiService.isUserLogged();

    }

    testing();

    return(
        <div>
            <div className="list_title">Lista zarejestrowanych w bazie pojazdów:</div>
            <div className="list_items">
                <table className="registered_cars">
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <th>Nazwa</th>
                            <th>Czy zrobione</th>
                        </tr>
                        <ListComponent name="nazwa" id={2} done={true}  random= {false}/>
                        <ListComponent name="nazwa2" id={3} done={false} random= {false}/>
                    </tbody>
                </table>
            </div> 
        </div>
    )
}

export default List;