import React from 'react';
import { shallow, mount } from 'enzyme';

import WeatherCurrent from '../../../../../../app/BlueWeather/weather-search/weather-results/weather-current';

describe(WeatherCurrent, ()=>{
  it('renders without crashing', () => {
    shallow(<WeatherCurrent />);
  });


})
