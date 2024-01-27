import './Login.css';
import { Link } from 'react-router-dom'
import { useGlobalLinks } from '../../GlobalLinks'
import personService from '../../services/Persons/personService'

const Login = () => {

    const { registerLink } = useGlobalLinks();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const username = formData.get('username');
        const password = formData.get('password');

        const fetchData = async () => {
            try {
              // Wywołaj funkcję test z carService
              const response = await personService.test();
            
              console.log('Otrzymana odpowiedź:', response);
            } catch (error) {
              console.error('Błąd pobierania danych żądania');
            }
          };
      
        fetchData();

        console.log('Username:', username);
        console.log('Password:', password);
        
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
            <Link to = {registerLink}>
                <p>Nie masz konta? - Załóż je <strong>tutaj</strong></p>
            </Link>
        </form>
        </div>
    )
  }
  
  export default Login;