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
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

function App() {
  const [selectedQuotes, setSelectedQuotes] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");

  const navigate = useNavigate();

  const handleAddQuote = (newQuote) => {
    setSelectedQuotes((prevQuotes) => [...prevQuotes, newQuote]);
  };

  const handleDeleteQuote = (indexToDelete) => {
    setSelectedQuotes((prevQuotes) =>
      prevQuotes.filter((_, index) => index !== indexToDelete)
    );
  };

  const handleUpdateQuote = (indexToUpdate, newQuote) => {
    setSelectedQuotes((prevQuotes) => {
      const updatedQuotes = [...prevQuotes];
      updatedQuotes[indexToUpdate] = newQuote;
  
      return updatedQuotes;
    });
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
        .then(() => {
          setIsLoggedIn(true);
          localStorage.setItem("isLoggedIn", "true");
        })
        .catch(() => {
          setIsLoggedIn(false);
          token.removeToken();
          localStorage.removeItem("isLoggedIn");
        });
    }
  }, []);

  return (
    <div className='page'>
      <Routes>
        <Route 
         path='/'
         element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Header onAddQuote={handleAddQuote} handleSignOut={signOut}/>
              <Main 
                selectedQuotes={selectedQuotes} onDeleteQuote={handleDeleteQuote}
                onUpdateQuote={handleUpdateQuote}
              />
              <Footer />
          </ProtectedRoute>
         }
        />  

        <Route 
          path='/suggestions'
          element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Header handleSignOut={signOut}/>
              <Suggestions onSelectQuote={handleAddQuote}/>
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
    </div>
  )
}

export default App;
