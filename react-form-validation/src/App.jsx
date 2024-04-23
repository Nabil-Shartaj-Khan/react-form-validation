import { useState } from 'react'
import defaultValues from './formValues'; //importing from formValues.js
import './App.css'

function App() {

  const [formData, setFormData] = useState(defaultValues);
  const [isPassMatch, setIsPassMatch] = useState(true);

  const handleInput = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    console.log(key, value)
    const copyFormData = { ...formData };
    copyFormData[key].value = value;
    setFormData(copyFormData);
    isValidForm()
  }
  console.log(formData);

  const passwordMatch = () => {
    const copyFormData = { ...formData };
    const pass = copyFormData['password'].value;
    const cPass = copyFormData['confirmPassword'].value;
    if (pass !== cPass) {
      setIsPassMatch(false);
    } else {
      setIsPassMatch(true);
    }
  }
  const isValidForm = () => {
    const copyFormData = { ...formData };
    Object.keys(copyFormData)
      .forEach(key => {
        const obj = copyFormData[key];
        obj.isError = !obj.value ? true : false;
        passwordMatch();
      });
    setFormData(copyFormData);
  }
  const handleFormSubmit = (e) => {
    e.preventDefault();
    isValidForm()
  }
  console.log('passwordMatch ', isPassMatch)
  return (
    <div className="App">

      <div className="container">

        <form onSubmit={handleFormSubmit}>
          {
            Object.keys(formData)
              .map((key) => {
                const { id, label, type, placeholder,
                  value, isError, errorMsg
                } = formData[key];
                return <div className='form-item'>
                  <label>{label}</label>
                  <input
                    onChange={handleInput}
                    id={id}
                    placeholder={placeholder}
                    type={type}
                    value={value}
                    className={
                      isError && 'error-border'
                    }
                  />
                  {
                    isError &&
                    <span className='error'>{errorMsg}</span>
                  }
                  {
                    key === 'confirmPassword'
                    && !isPassMatch &&
                    <span className='error'>
                      Password does not match
                    </span>
                  }
                </div>
              })
          }
          <div className='form-item'>
            <button>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App
