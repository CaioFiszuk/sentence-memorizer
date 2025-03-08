import './Main.css';
import SentenceList from '../SentenceList/SentenceList';

function Main({selectedQuotes, onDeleteQuote, onUpdateQuote}) {

    return (
      <main className='main'>
         <SentenceList 
           selectedQuotes={selectedQuotes}
           onDeleteQuote={onDeleteQuote}
           onUpdateQuote={onUpdateQuote}
         />
      </main>
    )
  }
  
  export default Main;