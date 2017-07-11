import React from 'react';
import { shallow, mount } from 'enzyme';

import SearchInput from '../../../../../app/BlueWeather/weather-search/search-input/';

describe(SearchInput, ()=>{
  it('renders without crashing', () => {
    shallow(<SearchInput />);
  });
  it('has an input field', ()=>{
    const wrapper = shallow(<SearchInput />);
    expect(wrapper.exists("input"))
  })

})
