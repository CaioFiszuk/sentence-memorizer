import './SentenceList.css';
import { Link } from 'react-router-dom';

function SentenceList({selectedQuotes = []}) {

    return (
      <div>
      {selectedQuotes.length > 0 ? (
        <ul className="sentence-list">
          {selectedQuotes.map((quote, index) => (
            <li key={index} className="sentence-list__item">
              <Link className="sentence-list__item" to="/sentence">
                {quote}
              </Link>
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
