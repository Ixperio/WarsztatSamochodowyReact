import ListComponent from "../components/ListComponent/ListComponent";
import '../App.css'

//komponent prezentacyjny
const List = () =>{
    return(
        <>
        <ListComponent name="nazwa" id={2} done={true} />
        <ListComponent name="nazwa2" id={3} done={false} />
        </>
    )
}

export default List;