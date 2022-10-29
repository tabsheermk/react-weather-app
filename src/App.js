import { useState } from 'react';
import { WEATHER_API_KEY, WEATHER_API_URL } from './api';
import './App.css';
import CurrentWeather from './components/current-weather/current-weather';
import Forecast from './components/forecast/forecast';
import Search from './components/search/search';

function App() {

  
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecast ] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [latitude, longitude] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`);
    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`);    
    
    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async(response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        
        setCurrentWeather({city: searchData.label, ...weatherResponse}); //label coming from search.js
        setForecast({city:searchData.label, ...forecastResponse});
      })
      .catch((err) => console.log(err));
  }


  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange}/>
      {currentWeather && <CurrentWeather data={currentWeather}/>}
      {forecastWeather && <Forecast data = {forecastWeather} /> }
    </div>
  );
}

export default App;
