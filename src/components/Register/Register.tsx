
import './Register.css';

const Register = () => {
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

        </form>
        </div>
    )
  }
  
  export default Register;