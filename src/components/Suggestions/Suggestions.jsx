import './Suggestions.css';
import { useState, useEffect } from 'react';
import { PiPencil } from 'react-icons/pi';
import { quoteApi } from '../../utils/QuoteApi';

function Suggestions() {
  const [quotes, setQuotes] = useState([]);

  const getQuotes = async()=>{

     const response = await quoteApi.getQuotes();

     setQuotes(response);
     console.log(response);
  }

  useEffect(()=>{
    getQuotes();
  }, []);
  return(
    <div>
      <ul className='suggestions-list'>
        {quotes.map((quote, index) => (
          <li 
            key={index}
            className='suggestion-list__item'
          >
            {`${quote.content} -- ${quote.author}    `}
            <PiPencil className='suggestions-list__icon' 
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Suggestions;