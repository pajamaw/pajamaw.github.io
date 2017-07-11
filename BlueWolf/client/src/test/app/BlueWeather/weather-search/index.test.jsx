import React from 'react';
import { shallow, mount } from 'enzyme';

import WeatherSearch from '../../../../app/BlueWeather/weather-search/';
import RecentQueries from '../../../../app/BlueWeather/weather-search/recent-queries/';
import SearchInput from '../../../../app/BlueWeather/weather-search/search-input/';
import WeatherResults from '../../../../app/BlueWeather/weather-search/weather-results/';

describe(WeatherSearch, ()=>{
  it('renders without crashing', () => {
    shallow(<WeatherSearch />);
  });
  it('contains three child components', ()=>{
    const wrapper = shallow(<WeatherSearch />);
    expect(wrapper.contains(<RecentQueries/>));
    expect(wrapper.contains(<SearchInput />))
    expect(wrapper.contains(<WeatherResults />))

  })

})
