import './Main.css';
import SentenceList from '../SentenceList/SentenceList';

function Main({selectedQuotes, onDeleteQuote}) {

    return (
      <main>
         <p className='main__greeting'>Bom dia John</p>
         <SentenceList 
           selectedQuotes={selectedQuotes}
           onDeleteQuote={onDeleteQuote}
        />
      </main>
    )
  }
  
  export default Main;