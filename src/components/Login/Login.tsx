import './Login.css';
import { useGlobalLinks } from '../../GlobalLinks'
import apiService from '../../services/apiService'
import NavBarItem from '../NavBarItem/NavBarItem';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigator = useNavigate();
    const { registerLink } = useGlobalLinks();

    const makeTest = async () => {
        try {
              // Wywołaj funkcję test z carService
              const response : string = await apiService.getTestPerson();
              
              if(response == "Success"){
                console.log("API Działa");
                return true;
              }else{
                console.log("Nie działa API");
                return false;
              }

            } catch (error) {
              console.error('Błąd pobierania danych żądania');
              return false;
            }
        };


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const username : string | undefined = formData.get('username')?.toString();
        const password : string | undefined  = formData.get('password')?.toString();
        //przetestuj API   
        const test : boolean = await makeTest(); 
            
        if(test){
            //typy nie są undefined
            if(username != undefined && password != undefined){

                const wynik : boolean = await apiService.postUserLogin(username, password);

                if(wynik){
                    //PRZEKIEROWUJE DO USER ACCOUNT
                    navigator("/User/Profile");

                    console.log("ZALOGOWANO!");
                }else{
                    // NIE ROBI NIC
                    console.log("ZŁE DANE LOGOWANIA!");
                }
                
            }else{
                console.log("Wartości nie mogą być puste!");
            }
        }else{
            console.log("API NIE DZIAŁA!");
        }

    };
        
    return (
        <div className="login">
        <form onSubmit={handleSubmit}>
            <h3>Logowanie</h3>
            <div className="line"></div>
            <label>Login:</label>
            <input type="text" name="username" />
            <br />
            <label>Hasło:</label>
                <input type="password" name="password" />
            <br />
            <div className="line"></div>
            <button type="submit">Zaloguj się</button>
            <NavBarItem link = {registerLink}><p className='link'>Nie masz konta? - Załóż je <strong>tutaj</strong></p></NavBarItem>
        </form>
        </div>
    )
  }
  
  export default Login;