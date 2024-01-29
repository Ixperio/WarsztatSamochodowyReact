
import './Register.css';
import { useGlobalLinks } from '../../GlobalLinks';
import NavBarItem from '../NavBarItem/NavBarItem';
import apiService from '../../services/apiService';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import Validate from '../../validators/validators'

const Register = () => {

    const { loginLink } = useGlobalLinks();
    const navigator = useNavigate();
    
    const [error, setError] = useState<boolean>(false);
    const [errorAPI, setAPIError] = useState<boolean>(false);

    //STATE WALIDATORA

    interface Validator{
        isValid: boolean,
        message: string | null
    }
    const [usernameError, setUsernameError] = useState(false);
    const [usersurnameError, setUserSurnameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [emailconfirmError, setEmailConfirmError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [passwordconfirmError, setPasswordConfirmError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [birthdayError, setBirthdayError] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
          const fetchedUserData : boolean | null = await apiService.isUserLogged();
    
          if (fetchedUserData == true) {
            setAPIError(false);
            navigator("/User/Profile");
          } else if(fetchedUserData == null){
            
            setAPIError(true);
          }else{
            setAPIError(false);
          }
        };
    
        fetchData(); 
      }, []); 


    //walidatory

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    
        const form = event.target.form;

        if(!form){
            return;
        }

        const formData = new FormData(form);
        //sprawdzanie walidaci przy każdej zmianie formularza


        let pass : string = "";
        let passConf : string = "";
        let email: string = "";
        let emailConf : string = "";

        formData.forEach((value, name) => {
            const stringValue = value.toString();
            let validation: Validator;
    
            if (name === 'username') {
                validation = Validate.validateUsername(stringValue, 'wprowadź imię');
                setUsernameError(!validation.isValid);

            } else if (name === 'usersurname') {
                validation = Validate.validateUsername(stringValue, 'wprowadź nazwisko');
                setUserSurnameError(!validation.isValid);

            } else if(name === 'email'){
                validation = Validate.validateEmail(stringValue, 'wprowadź email');
                setEmailError(!validation.isValid);
                email = stringValue;
            }else if(name === 'emailconfirm'){
                validation = Validate.validateEmail(stringValue, 'potwierdź email');
                setEmailConfirmError(!validation.isValid);
                emailConf = stringValue;
            }else if(name === 'password'){
                validation = Validate.validatePassword(stringValue, 'wprowadź hasło');
                setPasswordError(!validation.isValid);
                pass = stringValue;
            }else if(name === 'passwordconfirm'){
                validation = Validate.validatePassword(stringValue, 'potwierdź hasło');
                setPasswordConfirmError(!validation.isValid);
                passConf = stringValue;
            }else if(name === 'phone'){
                validation = Validate.validatePhone(stringValue, 'wprowadź telefon');
                setPhoneError(!validation.isValid);

            }else if(name === 'birthday'){
                validation = Validate.validateDate(stringValue, 'wprowadź datę urodzenia');
                setBirthdayError(!validation.isValid);
            }

        });

        if(pass !== passConf){
            setErrorPassword(true);
        }else{
            setErrorPassword(false);
        }

        if(emailConf !== email){
            setErrorEmail(true);
        }else{
            setErrorEmail(false);
        }

    }
    const makeTest = async () => {
            //Pierwsze sprawdzenie -> Kolejne w serwisie API sprawdza czy użytkownik jest realnie zalogowany.
            if(Cookies.get("trustString") !== undefined || Cookies.get("trustString") === ""){
                navigator("/");
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
        let formValid : boolean = true;
        for (const [name, value] of formData){
            const stringValue = value.toString();
            let validation: Validator;

            if (name === 'username') {
                validation = Validate.validateUsername(stringValue, 'wprowadź imię');
                setUsernameError(!validation.isValid);
                formValid = validation.isValid;

            } else if (name === 'usersurname') {
                validation = Validate.validateUsername(stringValue, 'wprowadź nazwisko');
                setUserSurnameError(!validation.isValid);
                formValid = validation.isValid;

            } else if(name === 'email'){
                validation = Validate.validateEmail(stringValue, 'wprowadź email');
                setEmailError(!validation.isValid);
                formValid = validation.isValid;

            }else if(name === 'emailconfirm'){
                validation = Validate.validateEmail(stringValue, 'potwierdź email');
                setEmailConfirmError(!validation.isValid);
                formValid = validation.isValid;

            }else if(name === 'password'){
                validation = Validate.validatePassword(stringValue, 'wprowadź hasło');
                setPasswordError(!validation.isValid);
                formValid = validation.isValid;

            }else if(name === 'passwordconfirm'){
                validation = Validate.validatePassword(stringValue, 'potwierdź hasło');
                setPasswordConfirmError(!validation.isValid);
                formValid = validation.isValid;

            }else if(name === 'phone'){
                validation = Validate.validatePhone(stringValue, 'wprowadź telefon');
                setPhoneError(!validation.isValid);
                formValid = validation.isValid;

            }else if(name === 'birthday'){
                validation = Validate.validateDate(stringValue, 'wprowadź datę urodzenia');
                setBirthdayError(!validation.isValid);
                formValid = validation.isValid;
            }

            if(!formValid){
              break;
            }
        }

            //jeżeli są ok 
            if(formValid){
                const apiRetStatus : boolean = await apiService.userRegister(daneForm);
                if(apiRetStatus){
                    setError(false);
                    navigator("/User/Login");
                }else{
                    console.log("Błąd - niezarejestrowano");
                    setError(true);
                }
            }else{
                console.log("Formularz zawiera błąd");
            }
        }

      }

    return (
        <div className="register">
        <form onSubmit={handleSubmit}>
            <h2>Rejestracja</h2>
            <div className="line line1"></div>
            <div className="leftRegisterData">
                <div className='option'>
                    <label>Wprowadź imię:</label>
                    <input type="text" name="username" required onChange={handleInputChange}/>
                    {usernameError && <h5 style={{ padding: 0, paddingBottom: "10px", margin: 0}}><strong style={{ color: 'red',fontSize: "11px" }}>Nieprawidłowy format imienia</strong></h5>}
                </div>
          
                <div className='option'>
                    <label>Wprowadź adres email:</label>
                    <input type="email" name="email" required onChange={handleInputChange}/>
                    {emailError && <h5 style={{ padding: 0, paddingBottom: "10px", margin: 0}}><strong style={{ color: 'red',fontSize: "11px" }}>Nieprawidłowy adres email</strong></h5>}
                </div>

                <div className='option'>
                    <label>Utwórz hasło:</label>
                    <input type="password" name="password" required onChange={handleInputChange}/>
                    {passwordError && <h5 style={{ padding: 0, paddingBottom: "10px", margin: 0}}><strong style={{ color: 'red',fontSize: "11px" }}>Nieprawidłowe hasło</strong></h5>}
                </div>

                <div className='option'><label>Wprowadź datę urodzenia:</label>
                <input type="date" name="birthday" required onChange={handleInputChange}/>
                {birthdayError && <h5 style={{ padding: 0, paddingBottom: "10px", margin: 0}}><strong style={{ color: 'red',fontSize: "11px" }}>Nieprawidłowy format daty urodzenia</strong></h5>}
                </div>
            </div>
            <div className="rightRegisterData">
            <div className='option'><label>Wprowadź nazwisko:</label>
                <input type="text" name="usersurname" required onChange={handleInputChange}/>
                {usersurnameError && <h5 style={{ padding: 0, paddingBottom: "10px", margin: 0}}><strong style={{ color: 'red',fontSize: "11px" }}>Nieprawidłowy format nazwiska</strong></h5>}
                </div>
                
                <div className='option'><label>Potwierdź adres email:</label>
                <input type="email" name="emailconfirm" required onChange={handleInputChange}/>
                {emailconfirmError && <h5 style={{ padding: 0, paddingBottom: "10px", margin: 0}}><strong style={{ color: 'red',fontSize: "11px" }}>Nieprawidłowy adres email</strong></h5>}
                </div>

                <div className='option'><label>Potwierdź hasło:</label>
                <input type="password" name="passwordconfirm" required onChange={handleInputChange}/>
                {passwordconfirmError && <h5 style={{ padding: 0, paddingBottom: "10px", margin: 0}}><strong style={{ color: 'red',fontSize: "11px" }}>Nieprawidłowe hasło</strong></h5>}
                </div>

                <div className='option'><label>Podaj numer telefonu:</label>
                <input type="text" name="phone" required onChange={handleInputChange}/>
                {phoneError && <h5 style={{ padding: 0, paddingBottom: "10px", margin: 0}}><strong style={{ color: 'red',fontSize: "11px" }}>Nieprawidłowy numer telefonu</strong></h5>}
                </div>
            </div>
            <div className='error'>
                {error && <h5 style={{ padding: 0, paddingBottom: "10px", margin: 0}}><strong style={{ color: 'red',fontSize: "11px" }}>Nie udało się założyć konta</strong></h5>}
                {errorAPI && <h5 style={{ padding: 0, paddingBottom: "10px", margin: 0}}><strong style={{ color: 'red',fontSize: "11px" }}>Brak komunikacji z serwerem!</strong></h5>}
                {errorPassword && <h5 style={{ padding: 0, paddingBottom: "10px", margin: 0}}><strong style={{ color: 'red',fontSize: "11px" }}>Pole hasło i potwierdź hasło muszą być takie same!</strong></h5>}
                {errorEmail && <h5 style={{ padding: 0, paddingBottom: "10px", margin: 0}}><strong style={{ color: 'red',fontSize: "11px" }}>Pole email i potwierdź email muszą być takie same!</strong></h5>}
            </div>
            <div className="line line2"></div>
            <button type="submit">Załóż konto</button>
            <div className="toLogin"><NavBarItem link = {loginLink}>Wróć do logowania</NavBarItem></div>
        </form>
        </div>
    )
  }
  
  export default Register;