import './App.css';
import  Header  from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Suggestions from '../Suggestions/Suggestions';
import Sentence from '../Sentence/Sentence';
import { Routes, Route} from "react-router-dom";

function App() {

  return (
    <div className='page'>
      <Routes>
        <Route 
         path='/'
         element={
          <>
              <Header />
              <Main />
              <Footer />
          </>
         }
        />  

        <Route 
          path='/suggestions'
          element={
          <>
              <Header />
              <Suggestions />
              <Footer />
          </>
          }
        />

        <Route 
          path='/sentence'
          element={<Sentence />}
        />
      </Routes>
    </div>
  )
}

export default App;
