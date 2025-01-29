import './Header.css';
import Navigation from '../Navigation/Navigation';
import { NavLink } from 'react-router-dom';

function Header({onAddQuote, onEditProfile}) {

    return (
      <header className='header'>
        <h1 className='header__title'>
          <NavLink to='/' className='header__link'>
            Sentence Memorizer
          </NavLink>
        </h1>

        <Navigation 
          onAddQuote={onAddQuote} 
          onEditProfile={onEditProfile}
        />
      </header>
    );
  }
  
  export default Header;