import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Axios from 'axios';

function App() {
  const [value, setValue] = useState({text: "", error: "", weather_data: []});

  function handleChange(e){ //handles typing input
      const {text, value} = e.target;
      setValue({...value, [text]: value});
  }

  let local = "http://localhost:5000/weather";
  let deployed = "https://random-weather-backend.herokuapp.com/";
  let base_url = deployed;


  //makes a call to the back end API for a number of 
  function getData (){
    if(value.undefined){ //if statement prevents from trying to send empty for and throwing an error
      if(value.undefined.match(/^[0-9]+$/) === null){ //if statement to only allow numeric characters to be sent
        setValue({...value, error: "positive whole numbers only"});
      } 
      else if (parseInt(value.undefined) > 100) { //if statement to only allow 100 or less requests to be made
        setValue({...value, error: "requests greater than 100 not allowed"});
      }
      else { //if input is valid, sends request to back end
        Axios.get(`${base_url}/${value.undefined}`)
        .then(res => {
          setValue({text: "", weather_data: res.data});
        })
        .catch(error =>{
          console.log("problem:", error);
        })
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
          <div>Results for (lat:{e.coord.lat}, lon: {e.coord.lon}), Weather: {e.weather[0].description}, Temperature: {Math.floor(e.main.temp-273.15)} C, {Math.floor(((e.main.temp-273.15) * (9/5)) + 32)} F, Humidity: {e.main.humidity}%, Wind Speed: {Math.floor(e.wind.speed*2.237*100)/100} </div>
        )}
        )}
  <p>{value.error}</p>
    </div>
  );
}

export default App;
