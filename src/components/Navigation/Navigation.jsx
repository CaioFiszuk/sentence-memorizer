import './Navigation.css';
import Popup from '../Popup/Popup';
import Form from '../Form/Form';
import { useState } from 'react';
import { MdClose } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

function Navigation() {
  const [createSentenceModalIsOpen, setCreateSentenceModalIsOpen] = useState(false);
  const [editProfileModalIsOpen, setEditProfileModalIsOpen] = useState(false);

  const openCreateSentenceModal = () => setCreateSentenceModalIsOpen(true);
  const closeCreateSentenceModal = () => setCreateSentenceModalIsOpen(false);
  const openEditProfileModalIsOpen = () => setEditProfileModalIsOpen(true);
  const closeEditProfileModalIsOpen = () => setEditProfileModalIsOpen(false);

  return (
    <nav>
      <ul className='navigation'>
        <li className='navigation__item'>
          <button 
            onClick={openCreateSentenceModal}
            className='navigation__button'
          >
            Criar frase
          </button>
        </li>
        <li className='navigation__item'>
          <NavLink
           to='/suggestions'
           className='navigation__link'
          >
            Sugestões
          </NavLink>
          </li>
        <li className='navigation__item'>
          <button 
            onClick={openEditProfileModalIsOpen}
            className='navigation__button'
          >
            Editar Perfil
          </button>
        </li>
        <li className='navigation__item'>Sair</li>
      </ul>

      <Popup 
        isOpen={createSentenceModalIsOpen} 
        onClose={closeCreateSentenceModal}>
        
         <Form 
           formTitle='Criar Frase' 
           placeholder='Nova Frase'
           inputName='sentence'
           buttonName='Criar'
           inputType='text'
          />

        <MdClose 
          className='popup__icon'
          onClick={closeCreateSentenceModal}
        />
      </Popup>

      <Popup 
        isOpen={editProfileModalIsOpen} 
        onClose={closeEditProfileModalIsOpen}>
         
         <Form 
           formTitle='Editar Perfil' 
           placeholder='Nome'
           inputName='username'
           buttonName='Editar'
           inputType='text'
          />

        <MdClose 
          className='popup__icon'
          onClick={closeEditProfileModalIsOpen}
        />
      </Popup>
    </nav>
  );
}

export default Navigation;
