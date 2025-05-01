import './Suggestions.css';
import { useState, useEffect, useContext } from 'react';
import { PiPencil } from 'react-icons/pi';
import { quoteApi } from '../../utils/QuoteApi';
import { useNavigate } from 'react-router-dom';
import { api } from '../../utils/api';
import { currentUserContext } from '../../contexts/CurrentUserContext';

function Suggestions({setSentences}) {
  const [quotes, setQuotes] = useState([]);
  const navigate = useNavigate();

  const currentUser  = useContext(currentUserContext);


  const getQuotes = async () => {
    const response = await quoteApi.getQuotes();
    setQuotes(response);
  };


  const addSentenceToSentenceList = async (index, data) => {
    try {
      const newSentence = await api.createSentence(data, currentUser);
      setSentences(prevSentences => [...prevSentences, newSentence.data]);
      navigate('/');
    } catch(error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getQuotes();
  }, []);

  return (
    <div>
      <ul className="suggestions-list">
        {quotes.map((quote, index) => (
          <li key={index} className="suggestion-list__item">
            {`${quote.content} -- ${quote.author}`}
            <PiPencil
              className="suggestions-list__icon"
              onClick={() => addSentenceToSentenceList(index, quote.content)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Suggestions;
