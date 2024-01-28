import './Login.css';
import { useGlobalLinks } from '../../GlobalLinks';
import apiService from '../../services/apiService';
import NavBarItem from '../NavBarItem/NavBarItem';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Validate from '../../validators/validators';

interface Validator{
    isValid: boolean,
    message: string | null
}

const Login = () => {
  const navigator = useNavigate();
  const { registerLink } = useGlobalLinks();

  const [generalError, setGeneralError] = useState(false);
    const [passError, setPassError] = useState(false);

    let passErrorMessage : string | null = null;
    let loginErrorMessage : string | null = null;

    const [loginError, setLoginError] = useState(false);
    const [apiError, setAPIError] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
          const fetchedUserData = await apiService.isUserLogged();
    
          if (fetchedUserData == true) {
            navigator("/User/Profile");
          } 
        };
    
        fetchData(); 
      }, []); 

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    
        const form = event.target.form;

        if(!form){
            return;
        }

        const formData = new FormData(form);

        formData.forEach((value, name) => {
            const stringValue = value.toString();
            let validation: Validator;
    
            if (name === 'useremail') {
            validation = Validate.validateEmail(stringValue, 'Podaj email');
            loginErrorMessage = validation.message;
            setLoginError(!validation.isValid);

            } else if (name === 'password') {
            validation = Validate.validatePassword(stringValue, 'Podaj hasło');
            passErrorMessage = validation.message;
            setPassError(!validation.isValid);

            }

        });

    }

  const makeTest = async () => {
    try {
      const response: string = await apiService.getTestPerson();

      if (response === 'Success') {
        console.log('API Działa');
        return true;
      } else {
        console.log('Nie działa API');
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
    const useremail: string | undefined = formData.get('useremail')?.toString();
    const password: string | undefined = formData.get('password')?.toString();

    const validationEmail: Validator = Validate.validateEmail(useremail, 'Podaj email');
    const validationPassword: Validator = Validate.validatePassword(password, 'Podaj hasło');

    if (validationEmail.isValid && validationPassword.isValid) {
      //przetestuj API
      const test: boolean = await makeTest();

      if (test) {
        if (useremail != undefined && password != undefined) {
          const wynik: boolean = await apiService.postUserLogin(useremail, password);

          if (wynik) {
            //PRZEKIEROWUJE DO USER ACCOUNT
            navigator('/User/Profile');
            setGeneralError(false);
            console.log('ZALOGOWANO!');
          } else {
            setGeneralError(true);
          }
        }
        setAPIError(false);
      } else {
        setAPIError(true);
        console.log('API NIE DZIAŁA!');
      }
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h3>Logowanie</h3>
        <div className="line"></div>
        <label>Podaj email:</label>
        <input type="email" name="useremail" onChange={handleInputChange} />
        {loginError && <h5 style={{ padding: 0, paddingBottom: "10px", margin: 0}}><i style={{ color: 'red', fontSize: "11px" }}>{'Podaj poprawny email'}</i></h5>}
        <label>Podaj hasło:</label>
        <input type="password" name="password" onChange={handleInputChange} />
        {passError && <h5 style={{ padding: 0, paddingBottom: "10px", margin: 0}}><i style={{ color: 'red', fontSize: "11px" }}>{'Podaj poprawne hasło'}</i></h5>}
        <div className="line"></div>
        {generalError && <h5 style={{ padding: 0, paddingBottom: "10px", margin: 0}}><strong style={{ color: 'red',fontSize: "11px" }}>Nieprawidłowy email bądź hasło!</strong></h5>}
        {apiError && <h5 style={{ padding: 0, paddingBottom: "10px", margin: 0}}><strong style={{ color: 'red',fontSize: "11px" }}>Brak komunikacji z serwerem!</strong></h5>}
        <button type="submit" disabled={!(!loginError && !passError)} >Zaloguj się</button>
        <NavBarItem link={registerLink}><p className='link'>Nie masz konta? - Załóż je <strong>tutaj</strong></p></NavBarItem>
      </form>
    </div>
  );
}
  
  export default Login;