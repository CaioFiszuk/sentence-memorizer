import './SentenceList.css';
import { Link } from 'react-router-dom';
import { BiTrash } from 'react-icons/bi';
import { BiPencil } from 'react-icons/bi';

function SentenceList({selectedQuotes = [], onDeleteQuote}) {

    return (
      <div>
      {selectedQuotes.length > 0 ? (
        <ul className="sentence-list">
          {selectedQuotes.map((quote, index) => (
            <li key={index} className="sentence-list__item">
              <Link className="sentence-list__link" to="/sentence">
                {`${quote}`}
              </Link> 
              <BiTrash 
                className='sentence-list__icon'
                onClick={() => onDeleteQuote(index)}
              />
              <BiPencil className='sentence-list__icon'/>
            </li>
          ))}
        </ul>
      ) : (
        <p className="sentence-list__paragraph">Você ainda não tem nenhuma frase</p>
      )}
    </div>
    )
}
  
  export default SentenceList;
