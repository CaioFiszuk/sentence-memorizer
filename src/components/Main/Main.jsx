import './Main.css';
import SentenceList from '../SentenceList/SentenceList';

function Main({selectedQuotes, onDeleteQuote, onUpdateQuote, userName}) {

    return (
      <main className='main'>
         <p className='main__greeting'>Bom dia {userName}</p>
         <SentenceList 
           selectedQuotes={selectedQuotes}
           onDeleteQuote={onDeleteQuote}
           onUpdateQuote={onUpdateQuote}
         />
      </main>
    )
  }
  
  export default Main;