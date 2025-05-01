import './App.css';
import { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import  Header  from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Suggestions from '../Suggestions/Suggestions';
import Sentence from '../Sentence/Sentence';
import Login from '../Login/Login';
import Register from '../Register/Register';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import * as auth from "../../utils/auth";
import * as token from '../../utils/token';
import { api } from '../../utils/api';
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { currentUserContext } from '../../contexts/CurrentUserContext';

function App() {
  const [sentences, setSentences] = useState([]);

  const [currentUser, setCurrentUser] = useState(null);

  const [selectedQuotes, setSelectedQuotes] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");

  const navigate = useNavigate();

  /*const handleDeleteQuote = (indexToDelete) => {
    setSelectedQuotes((prevQuotes) =>
      prevQuotes.filter((_, index) => index !== indexToDelete)
    );
  };*/

  const handleUpdateQuote = (indexToUpdate, newQuote) => {
    setSelectedQuotes((prevQuotes) => {
      const updatedQuotes = [...prevQuotes];
      updatedQuotes[indexToUpdate] = newQuote;
  
      return updatedQuotes;
    });
  }

  const getAllSentences = () => {
    api.getSentences()
    .then((data)=>{
      setSentences(data.data);
     })
     .catch((error) => console.error("Erro ao buscar os livros:", error));
  }

  const handleRegistration = ({
    username,
    email,
    password
  }) => {
    auth.register(username, email, password)
    .then(()=>{
      navigate("/signin");
    })
    .catch(console.error)
  }

  const handleLogin = ({ email, password }) => {
    auth
    .authorize(email, password)
    .then((data) => {
      if (data.token) {
        token.setToken(data.token);
        localStorage.setItem("isLoggedIn", "true");

        auth.getUserInfo(data.token)
          .then(() => {
            setIsLoggedIn(true);
            navigate("/");
            getAllSentences();
          });
      }
    })
    .catch((error) => {
      toast.error(error.message.slice(6));
    });
  }

  const signOut = () => {
    token.removeToken();
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/signin");
  }

  useEffect(()=>{
    const jwt = token.getToken();
    if (jwt) {
      auth.getUserInfo(jwt)
        .then((data) => {
          setIsLoggedIn(true);
          setCurrentUser(data.data._id);
          localStorage.setItem("isLoggedIn", "true");
        })
        .catch(() => {
          setIsLoggedIn(false);
          token.removeToken();
          localStorage.removeItem("isLoggedIn");
        });
    }

    getAllSentences();
  }, []);

  return (
    <div className='page'>

      <currentUserContext.Provider value={currentUser}>
      <Routes>
        <Route 
         path='/'
         element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Header 
                handleSignOut={signOut}
                setSentences={setSentences}
                />
              <Main 
                selectedQuotes={selectedQuotes} 
                onUpdateQuote={handleUpdateQuote}
                sentences={sentences}
                setSentences={setSentences}
              />
              <Footer />
          </ProtectedRoute>
         }
        />  

        <Route 
          path='/suggestions'
          element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Header 
                handleSignOut={signOut}
                setSentences={setSentences}
              />
              <Suggestions setSentences={setSentences}/>
              <Footer />
          </ProtectedRoute>
          }
        />

        <Route 
          path='/sentence'
          element={ 
            <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Sentence />
            </ProtectedRoute>
          }
        />

        <Route 
          path='/signin'
          element={
            <>
             <Login handleLogin={handleLogin}/>
            </>
          }
        />

       <Route 
          path='/signup'
          element={
            <>
             <Register handleRegistration={handleRegistration} isLoggedIn={isLoggedIn}/>
            </>
          }
        />

         <Route
            path="*"
            element={
              isLoggedIn ? (
              <Navigate to="/" replace />
              ) : (
              <Navigate to="/signin" replace />
              )
            }
          />
      </Routes>
      </currentUserContext.Provider>

    </div>
  )
}

export default App;
