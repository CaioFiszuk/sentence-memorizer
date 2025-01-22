import './Suggestions.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { PiPencil } from 'react-icons/pi';

function Suggestions() {
  const [quotes, setQuotes] = useState([]);

  const getQuotes = async()=>{

     const response = await axios.get("http://api.quotable.io/quotes/random?limit=10");

     setQuotes(response.data);
     console.log(response.data);
  }

  useEffect(()=>{
    getQuotes()
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