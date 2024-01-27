import './Login.css';

const Login = () => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const username = formData.get('username');
        const password = formData.get('password');
    
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
        </form>
        </div>
    )
  }
  
  export default Login;