import './Register.css';
import { Link } from 'react-router-dom';

function Register() {

    return (
      <div className="page">
      <form className="register-form">
         <legend className="register-form__title">Inscreva-se</legend>

         <input 
           type='email' 
           name='email'
           placeholder='E-mail' 
           className='register-form__input'
           //value={data.email}
           //onChange={handleChange}
         />

         <input 
           type='password' 
           name='password'
           placeholder='Senha' 
           className='register-form__input'
           //value={data.password}
           //onChange={handleChange}
         />

         <button className="register-form__button" type='submit'>Inscrever-se</button>

         <span className="register-form__register-link">Faça o login <Link to='/signin' className='link'>aqui</Link></span>
      </form>

      </div>
    )
  }
  
  export default Register;