import './Navigation.css';

function Navigation() {

  return (
    <nav>
      <ul className='navigation__links'>
        <li>
          <button 
            className='navigation__link' 
          >
            Criar frase
          </button>
        </li>
        <li>
            Sugestões
        </li>
        <li>
          <button 
            className='navigation__link' 
          >
            Editar Perfil
          </button>
        </li>
        <li className='navigation__link'>Sair</li>
      </ul>
    </nav>
  );
}

export default Navigation;