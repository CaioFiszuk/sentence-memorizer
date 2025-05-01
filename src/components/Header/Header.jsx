import './Header.css';
import Popup from '../Popup/Popup';
import Form from '../Form/Form';
import { useState, useContext } from 'react';
import { MdClose } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { api } from '../../utils/api';
import { currentUserContext } from '../../contexts/CurrentUserContext';

function Header({/*onAddQuote,*/ handleSignOut, setSentences}) {

  const [createSentenceModalIsOpen, setCreateSentenceModalIsOpen] = useState(false);

  const currentUser  = useContext(currentUserContext);

  if(!currentUser){
     return null;
  }

  const openCreateSentenceModal = () => {
    setCreateSentenceModalIsOpen(true);
  }

  const closeCreateSentenceModal = () => setCreateSentenceModalIsOpen(false);

  const createNewSentence = async (data) => {
    try {
      const newSentence = await api.createSentence(data, currentUser);
      setSentences(prevSentences => [...prevSentences, newSentence.data]);
      closeCreateSentenceModal();
    } catch(error) {
      console.error(error);
    }
  }

    return (
      <header className='header'>
        <h1 className='header__title'>
          <NavLink to='/' className='header__link'>
            Sentence Memorizer
          </NavLink>
        </h1>

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
      </header>
    );
  }
  
  export default Header;