import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Axios from 'axios';

function App() {
  const [value, setValue] = useState({text: "", error: "", weather_data: []});

  function handleChange(e){
      const {text, value} = e.target;
      setValue({[text]: value});
  }


  function getData (){
    if(value.undefined){
      if(value.undefined.match(/^[0-9]+$/) != null){
        Axios.get(`http://localhost:5000/weather/${value.undefined}`)
          .then(res => {
            console.log(res.data);
            setValue({text: "", weather_data: res.data});
            // console.log(res.data);
          })
          .catch(error =>{
            console.log("problem:", error);
          })
      } 
      else {
        setValue({...value, error: "please send numbers"});
      }
    }

  }

  return (
    <div className="App">
      <p>see weather date for random gps coordinates</p>
      <span>enter the number of coordinates you would like returned: </span>
      <input  value={value.text} onChange={handleChange} />
      <button onClick={() => getData()}>get data</button>
  <p>{value.weather_data && value.weather_data.length > 0 ? `returning ${value.weather_data.length} random results` : ""}</p>
      {value.weather_data && value.weather_data.map( e => {
        //console.log("vehicle e", e)
        return(
          <div>Results for (lat:{e.coord.lat}, lon: {e.coord.lon}), Weather: {e.weather[0].description}, Temperature: {Math.floor(e.main.temp-273.15)} C, {Math.floor(((e.main.temp-273.15) * (9/5)) + 32)} F, Humidity: {e.main.humidity} %, Wind Speed: {Math.floor(e.wind.speed*2.237*100)/100} </div>
        )}
        )}
  <p>{value.error}</p>
    </div>
  );
}

export default App;
