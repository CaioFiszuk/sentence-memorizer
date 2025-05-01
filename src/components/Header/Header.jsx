import './Header.css';
import Navigation from '../Navigation/Navigation';
import { NavLink } from 'react-router-dom';

function Header({onAddQuote, handleSignOut}) {

    return (
      <header className='header'>
        <h1 className='header__title'>
          <NavLink to='/' className='header__link'>
            Sentence Memorizer
          </NavLink>
        </h1>

        <Navigation 
          onAddQuote={onAddQuote} 
          handleSignOut={handleSignOut}
        />

        
      </header>
    );
  }
  
  export default Header;