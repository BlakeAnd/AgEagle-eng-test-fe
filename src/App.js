import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Axios from 'axios';

function App() {
  const [value, setValue] = useState({text: "", error: ""});

  function handleChange(e){
      const {text, value} = e.target;
      setValue({...value, [text]: value});
  }


  function getData (){
      if(value.undefined.match(/^[0-9]+$/) != null){
        Axios.get(`http://localhost:5000/${value.text}`)
          .then(res => {
            console.log(res);
          })
      } 
      else {
        setValue({...value, error: "please send only numbers"});
      }

  }

  return (
    <div className="App">
      weather data
      <input  value={value.text} onChange={handleChange} />
      <button onClick={() => getData()}>get data</button>
  <p>{value.error}</p>
    </div>
  );
}

export default App;
