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

function Main({ sentences, setSentences }) {

  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedSentence, setSelectedSentence] = useState(null);
  const [updateFormData, setUpdateFormData] = useState({
    content: '',
  });

  const openUpdateModal = (quote) => {
    setSelectedSentence(quote);
    setUpdateFormData({
      content: quote.content,
    });
    setUpdateModal(true);
  }

  const closeUpdateModal = () => {
    setUpdateModal(false);
  }

  const openDeleteModal = (sentence) => {
    setSelectedSentence(sentence);
    setDeleteModal(true);
  }

  const closeDeleteModal = () => {
    setDeleteModal(false);
  }

  const handleUpdateSentence = async (newValue) => {

    if(!selectedSentence) return;

    try{
      const response = await api.updateSentences(selectedSentence._id, { content: newValue });
      setSentences((prevSentences) =>
        prevSentences.map((sentence) =>
          sentence._id === selectedSentence._id ? response.data : sentence
        )
      );
      closeUpdateModal();
    } catch (error) {
      console.error("Erro ao atualizar: ", error);
    }

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
                state={{ quote: quote.content }}
              >
                {quote.content}
              </Link> 
              <BiTrash 
                className='sentence-list__icon'
                onClick={() => openDeleteModal(quote)}
              />
              <BiPencil 
                className='sentence-list__icon'
                onClick={() => openUpdateModal(quote)}
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
        isOpen={updateModal} 
        onClose={closeUpdateModal}>
         
         <Form 
           formTitle='Editar Frase' 
           placeholder='Reescreva a frase'
           inputName='sentence'
           buttonName='Editar'
           inputType='text'
           initialValue={updateFormData.content}
           handleForm={handleUpdateSentence}
          />

        <MdClose 
          className='popup__close-icon'
          onClick={closeUpdateModal}
        />
      </Popup>
      </main>
    )
  }
  
  export default Main;