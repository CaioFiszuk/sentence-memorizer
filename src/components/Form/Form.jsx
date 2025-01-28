import './Form.css';
import Validator from '../Validator/Validator';
import { useState } from 'react';

function Form({formTitle, placeholder, inputName, buttonName, inputType, initialValue = "", handleForm}){

  const [value, setValue] = useState(initialValue);
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const input = event.target;
    setValue(input.value);
    setErrorMessage(input.validationMessage); 
    setIsValid(input.checkValidity()); 
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isValid) {
      handleForm(value);
    }
  };

  return(
    <form className='form' noValidate onSubmit={handleSubmit}>
        <h3 className='form__title'>{formTitle}</h3>
        <input 
          type={inputType} 
          name={inputName}
          placeholder={placeholder}
          className='form__input' 
          value={value}
          onChange={handleChange}
          required
          minLength={5}
          maxLength={150}
          pattern="^[^\d]*$"
        />
          {!isValid && <Validator message={errorMessage} />}

        <button 
          type="submit" 
          className={`form__button ${isValid ? "" : "form__button-disabled"}`} 
          disabled={!isValid} 
        >
          {buttonName}
        </button>
    </form>
  );
}

export default Form;