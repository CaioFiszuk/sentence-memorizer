import './Login.css';
import { Link } from 'react-router-dom';

function Login() {

    return (
      <div className="page">

         <form className="login-form">
            <legend className="login-form__title">Entrar</legend>

            <input 
              type='email' 
              name='email'
              placeholder='E-mail' 
              className='login-form__input'
              //value={data.email}
              //onChange={handleChange}
            />

            <input 
              type='password' 
              name='password'
              placeholder='Senha' 
              //className='auth-form__input'
              //nChange={handleChange}
            />

            <button type="submit">Entrar</button>

            <span>Inscreva-se <Link to='/signup'>aqui!</Link></span>
         </form>

      </div>
    )
  }
  
  export default Login;