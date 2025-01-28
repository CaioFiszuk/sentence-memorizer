import './Main.css';
import SentenceList from '../SentenceList/SentenceList';

function Main({selectedQuotes, onDeleteQuote, onUpdateQuote}) {

    return (
      <main className='main'>
         <p className='main__greeting'>Bom dia John</p>
         <SentenceList 
           selectedQuotes={selectedQuotes}
           onDeleteQuote={onDeleteQuote}
           onUpdateQuote={onUpdateQuote}
         />
      </main>
    )
  }
  
  export default Main;