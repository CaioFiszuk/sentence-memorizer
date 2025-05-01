import './Main.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiTrash } from 'react-icons/bi';
import { BiPencil } from 'react-icons/bi';
import Popup from '../Popup/Popup';
import Form from '../Form/Form';
import { MdClose } from 'react-icons/md';

function Main({/*selectedQuotes,*/ onDeleteQuote, onUpdateQuote, sentences}) {

  const [updateSentenceModalIsOpen, setUpdateSentenceModalIsOpen] = useState(false);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(null);
  const [currentQuote, setCurrentQuote] = useState("");

  const openUpdateSentenceModal = (quote, index) => {
    setCurrentQuote(quote);
    setCurrentQuoteIndex(index);
    setUpdateSentenceModalIsOpen(true);
  }


  const closeUpdateSentenceModal = () => {
    setUpdateSentenceModalIsOpen(false);
    setCurrentQuote("");
    setCurrentQuoteIndex(null);
  }

  const handleUpdate = (updatedQuote) => {
    onUpdateQuote(currentQuoteIndex, updatedQuote);
    closeUpdateSentenceModal();
  };

    return (
      <main className='main'>
        <ul className="sentence-list">
          {sentences.map((quote, index) => (
            <li key={index} className="sentence-list__item">
              <Link 
                className="sentence-list__link" 
                to="/sentence"
                state={{ quote }}
              >
                {quote.content}
              </Link> 
              <BiTrash 
                className='sentence-list__icon'
                onClick={() => onDeleteQuote(index)}
              />
              <BiPencil 
                className='sentence-list__icon'
                onClick={() => openUpdateSentenceModal(quote, index)}
              />
            </li>
          ))}
        </ul>

        <Popup 
        isOpen={updateSentenceModalIsOpen} 
        onClose={closeUpdateSentenceModal}>
         
         <Form 
           formTitle='Editar Frase' 
           placeholder='Reescreva a frase'
           inputName='sentence'
           buttonName='Editar'
           inputType='text'
           initialValue={currentQuote}
           handleForm={handleUpdate}
          />

        <MdClose 
          className='popup__close-icon'
          onClick={closeUpdateSentenceModal}
        />
      </Popup>
      </main>
    )
  }
  
  export default Main;