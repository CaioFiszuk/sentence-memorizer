import './Sentence.css';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Popup from '../Popup/Popup';
import Validator from '../Validator/Validator';
import { MdVerified } from 'react-icons/md';
import { BiX } from 'react-icons/bi';
import { Link, useLocation } from 'react-router-dom';

Modal.setAppElement('#root');

function Sentence() {
  const [inputValue, setInputValue] = useState("");
  const [resultModalIsOpen, setResultModalIsOpen] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [newSentence, setNewSentence] = useState("");
  const [hiddenWord, setHiddenWord] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const { quote } = location.state || {};

  const generateNewSentence = () => {
    const cleanedQuote = quote.replace(/[.,;!?]/g, '');

    const words = cleanedQuote.split(" ");
    const randomNumber = Math.floor(Math.random() * words.length);
    const crypticMessage = [...words];
    const hidden = crypticMessage[randomNumber];
    crypticMessage[randomNumber] = "__";
  
    setNewSentence(crypticMessage.join(" "));
    setHiddenWord(hidden);
  };

  const openResultModal = () => {
    setIsCorrect(inputValue.trim().toLowerCase() === hiddenWord.toLowerCase());
    setResultModalIsOpen(true);
  };

  const closeResultModal = () => {
    setResultModalIsOpen(false);
    setInputValue("");
    generateNewSentence();
  }

  const handleChange = (event) => {
    const input = event.target;
    setInputValue(event.target.value);
    setErrorMessage(input.validationMessage); 
    setIsValid(input.checkValidity()); 
  };

  useEffect(() => {
    if (quote) {
      generateNewSentence();
    }
  }, [quote]);

  return (
    <div>
      <div className='sentence__container'>
      <p className='sentence'>{newSentence}</p>

        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Qual palavra falta?"
          className='sentence__input'
          required
          pattern="^[^\d]*$"
        />
          {!isValid && <Validator message={errorMessage} />}

        <button 
          type='button' 
          className={`sentence__button ${isValid ? "" : "sentence__button-disabled"}`} 
          disabled={!isValid} 
          onClick={openResultModal}
          >
            Conferir
        </button>
      </div>

      {resultModalIsOpen && (
        <Popup isOpen={resultModalIsOpen} onClose={closeResultModal}>
          {isCorrect ? (
            <div> 
              <MdVerified className='popup__icon'/>

              <h4 className='popup__title'>Muito bem!</h4>

              <div className="popup__buttons">

                <button 
                  onClick={closeResultModal} 
                  className='popup__button'>
                  <Link to='/sentence' className='popup__link'>Continuar</Link>
                </button>

                <button 
                  className='popup__button'>
                    <Link to='/' className='popup__link'>Por hoje chega</Link>
                </button>

              </div>

            </div>
          ) : (
            <div>
              <BiX className='popup__icon' />
              <h4 className='popup__title'>Não foi dessa vez</h4>

              <div className="popup__buttons">

                <button 
                   onClick={closeResultModal} 
                   className='popup__button'>
                     Tentar de novo
                </button>

                <button 
                  className='popup__button'>
                  <Link to='/' className='popup__link'>Por hoje chega</Link>
                </button>

              </div>
            </div>
          )}
        </Popup>
      )}
    </div>
  );
}

export default Sentence;
