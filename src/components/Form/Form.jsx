import './Form.css';

function Form({formTitle, placeholder, inputName, buttonName, inputType}){
  return(
    <form className='form'>
        <h3 className='form__title'>{formTitle}</h3>
        <input 
          type={inputType} 
          name={inputName}
          placeholder={placeholder}
          className='form__input' 
        />

        <button type="submit" className='form__button'>{buttonName}</button>
    </form>
  );
}

export default Form;
