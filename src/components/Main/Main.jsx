import './Main.css';
import SentenceList from '../SentenceList/SentenceList';

function Main({selectedQuotes}) {

    return (
      <main>
         <p className='main__greeting'>Bom dia John</p>
         <SentenceList selectedQuotes={selectedQuotes}/>
      </main>
    )
  }
  
  export default Main;