
import './Register.css';
import { useGlobalLinks } from '../../GlobalLinks';
import NavBarItem from '../NavBarItem/NavBarItem';
import apiService from '../../services/apiService';

const Register = () => {

    const { loginLink } = useGlobalLinks();
   
    //DEFINICJA INTERFEJSU JSON RESPONSE
    interface WartosciTestowe {
        controller: boolean,
        service: boolean,
        repository: boolean
    }

    const makeTest = async () => {
        try {
          // Wywołaj funkcję test z carService
          const response = await apiService.getTestCar();

          const wynik : WartosciTestowe = response;

          if(wynik.service == true &&
             wynik.controller == true &&
             wynik.repository == true){
                console.log('Test API zakończony sukcesem!');
             }else{
                console.log('Test API nie powiódł się!');
             }
          
        } catch (error) {
          console.error('Błąd pobierania danych żądania');
        }
      };
  
      

      makeTest();

    return (
        <div className="register">
        <form>
            <h2>Rejestracja</h2>
            <div className="line line1"></div>
            <div className="leftRegisterData">
                <label>Wprowadź imię:</label>
                <input type="text" name="username" required/>
          
                <label>Wprowadź adres email:</label>
                <input type="email" name="email" required/>

                <label>Utwórz hasło:</label>
                <input type="password" name="password" required/>

                <label>Wprowadź datę urodzenia:</label>
                <input type="date" name="birthday" required/>
            </div>
            <div className="rightRegisterData">
                <label>Wprowadź nazwisko:</label>
                <input type="text" name="usersurname" required />
                
                <label>Potwierdź adres email:</label>
                <input type="email" name="emailconfirm" required/>

                <label>Potwierdź hasło:</label>
                <input type="password" name="passwordconfirm" required/>

                <label>Ustaw login:</label>
                <input type="text" name="login" required/>
            </div>
            <div className="line line2"></div>
            <button type="submit">Załóż konto</button>
            <NavBarItem link = {loginLink}>Wróć do logowania</NavBarItem>
        </form>
        </div>
    )
  }
  
  export default Register;