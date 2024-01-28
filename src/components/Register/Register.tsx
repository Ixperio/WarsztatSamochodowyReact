
import './Register.css';
import { useGlobalLinks } from '../../GlobalLinks';
import NavBarItem from '../NavBarItem/NavBarItem';
import apiService from '../../services/apiService';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';

const Register = () => {

    const { loginLink } = useGlobalLinks();
    const navigator = useNavigate();
    
    const [error, setError] = useState<boolean>(false);

    //DEFINICJA INTERFEJSU JSON RESPONSE
    interface WartosciTestowe {
        controller: boolean,
        service: boolean,
        repository: boolean
    }

    useEffect(() => {
        const fetchData = async () => {
          const fetchedUserData = await apiService.isUserLogged();
    
          if (fetchedUserData == true) {
            navigator("/User/Profile");
          } 
        };
    
        fetchData(); 
      }, []); 

    const makeTest = async () => {
        try {
            //Pierwsze sprawdzenie -> Kolejne w serwisie API sprawdza czy użytkownik jest realnie zalogowany.
            if(Cookies.get("trustString") !== undefined || Cookies.get("trustString") === ""){
                navigator("/");
            }

          const response = await apiService.getTestCar();

          const wynik : WartosciTestowe = response;

          if(wynik.service == true &&
             wynik.controller == true &&
             wynik.repository == true){
                return true;
             }else{
                return false;
             }
          
        } catch (error) {
          console.error('Błąd pobierania danych żądania');
          return false;
        }
      };

      makeTest();

      const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        //Pobiera dane z formularza
        const formData = new FormData(event.currentTarget);
        const username : string | undefined = formData.get('username')?.toString();
        const surname : string | undefined = formData.get('usersurname')?.toString();
        const birthday : string | undefined = formData.get('birthday')?.toString();
        const email : string | undefined = formData.get('email')?.toString();
        const emailconfirm : string | undefined = formData.get('emailconfirm')?.toString();
        const password : string | undefined  = formData.get('password')?.toString();
        const passwordConfirm : string | undefined = formData.get('passwordconfirm')?.toString();
        const phone : string | undefined = formData.get('phone')?.toString();
        //sprawdza czy wszystkie dane są inne niż undefined -> 1 forma walidacji podstawowej
        if( username !== undefined &&
            surname !== undefined &&
            birthday !== undefined && 
            email !== undefined &&
            emailconfirm !== undefined &&
            password !== undefined &&
            passwordConfirm !== undefined &&
            phone !== undefined){

            //Tworzy interfejs RegisterUser
            interface RegisterUser{
                name: string,
                surname: string,
                phone: string,
                birthday: string,
                email: string,
                emailConfirm: string,
                password: string,
                passwordConfirm: string,
                terms: boolean
            }

            //Tworzy dane postaci RegisterUser
            const daneForm : RegisterUser = {
                name: username,
                surname: surname,
                phone: phone,
                birthday: birthday,
                email: email,
                emailConfirm: emailconfirm,
                password: password,
                passwordConfirm: passwordConfirm,
                terms: true
            }

            //Tutaj sprawdza, czy wszystkie założenia walidacji są OK


            //jeżeli są ok 
            if(true){
                const apiRetStatus : boolean = await apiService.userRegister(daneForm);
                if(apiRetStatus){
                    setError(false);
                    console.log("Zarejestrowano");
                }else{
                    console.log("Błąd - niezarejestrowano");
                    setError(true);
                }
            }else{
                //Pokaż błedy
            }
        }

       
      }


    return (
        <div className="register">
        <form onSubmit={handleSubmit}>
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

                <label>Podaj numer telefonu:</label>
                <input type="text" name="phone" required/>
            </div>
            <div className='error'>{ error && ("Nie udało się założyć konta!") }</div>
            <div className="line line2"></div>
            <button type="submit">Załóż konto</button>
            <div className="toLogin"><NavBarItem link = {loginLink}>Wróć do logowania</NavBarItem></div>
        </form>
        </div>
    )
  }
  
  export default Register;