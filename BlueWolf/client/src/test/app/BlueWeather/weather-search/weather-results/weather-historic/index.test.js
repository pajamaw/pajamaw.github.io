import React from 'react';
import { shallow, mount } from 'enzyme';

import WeatherHistoric from '../../../../../../app/BlueWeather/weather-search/weather-results/weather-historic/';

describe(WeatherHistoric, ()=>{
  it('renders without crashing', () => {
    shallow(<WeatherHistoric />);
  });


})
