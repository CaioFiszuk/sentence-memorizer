import './Main.css';
import '.././Form/Form.css';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiTrash } from 'react-icons/bi';
import { BiPencil } from 'react-icons/bi';
import Popup from '../Popup/Popup';
import Form from '../Form/Form';
import { MdClose } from 'react-icons/md';
import { api } from '../../utils/api';

function Main({ onUpdateQuote, sentences, setSentences }) {

  const [updateSentenceModalIsOpen, setUpdateSentenceModalIsOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(null);
  const [currentQuote, setCurrentQuote] = useState("");

  const [selectedSentence, setSelectedSentence] = useState(null);

  const openUpdateSentenceModal = (quote, index) => {
    setCurrentQuote(quote);
    setCurrentQuoteIndex(index);
    setUpdateSentenceModalIsOpen(true);
  }

  const openDeleteModal = (sentence) => {
    setSelectedSentence(sentence);
    setDeleteModal(true);
  }

  const closeDeleteModal = () => {
    setDeleteModal(false);
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

  const handleDeleteSentence = async () => {
     if(!selectedSentence) return;

     try {
       await api.deleteSentence(selectedSentence._id);
       setSentences(sentences.filter((v)=>v._id != selectedSentence._id));
       closeDeleteModal();
       setSelectedSentence(null);
     } catch(error) {
      console.error(error);
    }
  }

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
                onClick={() => openDeleteModal(quote)}
              />
              <BiPencil 
                className='sentence-list__icon'
                onClick={() => openUpdateSentenceModal(quote, index)}
              />
            </li>
          ))}
        </ul>

        <Popup isOpen={deleteModal} onClose={closeDeleteModal}>
        <h3 className='form__title'>Tem certeza?</h3>
            <div className='form__button-box'>
              <button className='form__button form__button-success' onClick={handleDeleteSentence}>Sim</button>
              <button className='form__button form__button-danger' onClick={closeDeleteModal}>Não</button>
            </div>
        </Popup>

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