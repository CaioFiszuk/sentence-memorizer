import './Sentence.css';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Popup from '../Popup/Popup';
import { MdVerified } from 'react-icons/md';
import { BiX } from 'react-icons/bi';
import { Link } from 'react-router-dom';

Modal.setAppElement('#root');

function Sentence() {
  const [inputValue, setInputValue] = useState("");
  const [resultModalIsOpen, setResultModalIsOpen] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [newSentence, setNewSentence] = useState("");
  const [hiddenWord, setHiddenWord] = useState("");

  const sentence = "This Is My First Day and I am Indian and I Work at a Gas Station";

  const openResultModal = () => {
    setIsCorrect(inputValue.trim().toLowerCase() === hiddenWord.toLowerCase());
    setResultModalIsOpen(true);
  };

  const closeResultModal = () => setResultModalIsOpen(false);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {

    const words = sentence.split(" ");
    const randomNumber = Math.floor(Math.random() * words.length);
    const crypticMessage = [...words];
    const hidden = crypticMessage[randomNumber];
    crypticMessage[randomNumber] = "__";
    
    setNewSentence(crypticMessage.join(" "));
    setHiddenWord(hidden);
  }, [sentence]);

  return (
    <div>
      <p className='sentence'>{newSentence}</p>

      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Qual palavra falta?"
      />
      <button type='button' onClick={openResultModal}>Conferir</button>

      {resultModalIsOpen && (
        <Popup isOpen={resultModalIsOpen} onClose={closeResultModal}>
          {isCorrect ? (
            <div>
              <MdVerified size={40} />
              <h4>Muito bem!</h4>
              <button onClick={closeResultModal}><Link to='/sentence'>Continuar</Link></button>
              <button><Link to='/'>Por hoje chega</Link></button>
            </div>
          ) : (
            <div>
              <BiX size={40} />
              <h4>Não foi dessa vez</h4>
              <button onClick={closeResultModal}>Tentar de novo</button>
              <button><Link to='/'>Por hoje chega</Link></button>
            </div>
          )}
        </Popup>
      )}
    </div>
  );
}

export default Sentence;
