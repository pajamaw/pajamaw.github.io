import React from 'react';
import { shallow, mount } from 'enzyme';

import RecentQueries from '../../../../../app/BlueWeather/weather-search/recent-queries/';

describe(RecentQueries, ()=>{
  it('renders without crashing', () => {
    shallow(<RecentQueries />);
  });
})
