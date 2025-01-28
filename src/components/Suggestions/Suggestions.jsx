import './Suggestions.css';
import { useState, useEffect } from 'react';
import { PiPencil } from 'react-icons/pi';
import { quoteApi } from '../../utils/QuoteApi';
import { useNavigate } from 'react-router-dom';

function Suggestions({onSelectQuote}) {
  const [quotes, setQuotes] = useState([]);
  const navigate = useNavigate();

  const getQuotes = async () => {
    const response = await quoteApi.getQuotes();
    setQuotes(response);
  };

  const handleSelectQuote = (index) => {
    const quote = quotes[index];
    if (onSelectQuote) {
      onSelectQuote(quote.content); 
    }

    navigate('/');
  };

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
              onClick={() => handleSelectQuote(index)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Suggestions;
