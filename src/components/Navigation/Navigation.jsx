import './Navigation.css';
import Popup from '../Popup/Popup';
import Form from '../Form/Form';
import { useState } from 'react';
import { MdClose } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
//import { api } from '../../utils/api';

function Navigation({onAddQuote, handleSignOut}) {

  const [createSentenceModalIsOpen, setCreateSentenceModalIsOpen] = useState(false);

  const openCreateSentenceModal = () => {
    setCreateSentenceModalIsOpen(true);
  }

  const closeCreateSentenceModal = () => setCreateSentenceModalIsOpen(false);

  const createNewSentence = (newSentence) => {
    onAddQuote(newSentence);
    closeCreateSentenceModal();
  }

   /* const createNewSentence = async (data) => {
      try {
        const newSentence = await api.createSentence(data);

        closeCreateSentenceModal();
      } catch(error) {
        console.error(error);
      }
    }*/

  /**
   *   const handleCreateBook = async (data) => {
    try {
      const newBook = await api.createBook(data);
      setBooks(prevBooks => [...prevBooks, newBook.data]);
      closeCreateModal();
    }
    catch(error) {
      console.error(error);
    }
  }
   */

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
          <button className='navigation__button' onClick={handleSignOut}>Sair</button>
        </li>
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
           initialValue=''
           handleForm={createNewSentence}
          />

        <MdClose 
          className='popup__close-icon'
          onClick={closeCreateSentenceModal}
        />
      </Popup>

    </nav>
  );
}

export default Navigation;