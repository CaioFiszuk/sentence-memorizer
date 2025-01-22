import './SentenceList.css';
import { Link } from 'react-router-dom';

function SentenceList() {
  const sentences = ['lorem ipsum amet labore, odio massimum condimentum culex romanum magnus sed puer apis pertinax', 'rather fail together', 'lorem ipsum amet labore, odio massimum condimentum culex romanum magnus sed puer apis pertinax', 'rather fail together', 'lorem ipsum amet labore, odio massimum condimentum culex romanum magnus sed puer apis pertinax', 'rather fail together', 'lorem ipsum amet labore, odio massimum condimentum culex romanum magnus sed puer apis pertinax', 'rather fail together'];

    return (
      <div>
        {sentences.length > 0 ? 
        (
          <ul className='sentence-list'>
            {sentences.map((sentence, index)=>(
              <li 
               key={index}
               className='sentence-list__item'
              >
                {
                  <Link                     className='sentence-list__item' 
                  to='/sentence'>
                    {sentence}
                  </Link>
                }
              </li>
            ))}
          </ul>
        ):
        (
          <p className='sentence-list__paragraph'>Você ainda não tem nenhuma frase</p>
        )}
      </div>
    )
  }
  
  export default SentenceList;



  /**
   * {sentences = []}
   *         {sentences.length > 0 ? 
        (
          <ul>
            {sentences.map((sentence, index)=>(
              <li key={index}>{sentence}</li>
            ))}
          </ul>
        ):
        (
          <p>Você ainda não tem nenhuma frase</p>
        )}
   */