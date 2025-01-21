import './Sentence.css';

function Sentence() {

  return (
    <div>
      <p className='sentence'>sentence</p>

      <input
        type="text"
        placeholder="Qual palavra falta?"
      />
      <button type='button'>Conferir</button>
    </div>
  );
}

export default Sentence;