import React from 'react';
import { shallow, mount } from 'enzyme';

import WeatherResults from '../../../../../app/BlueWeather/weather-search/weather-results';
import WeatherCurrent from '../../../../../app/BlueWeather/weather-search/weather-results/weather-current';
import WeatherHistoric from '../../../../../app/BlueWeather/weather-search/weather-results/weather-historic';

describe(WeatherResults, ()=>{
  it('renders without crashing', () => {
    shallow(<WeatherResults />);
  });
  it('contains two child components', ()=>{
    const wrapper = shallow(<WeatherResults />);
    expect(wrapper.contains(<WeatherCurrent />));
    expect(wrapper.contains(<WeatherHistoric />));

  })

})
