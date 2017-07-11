import React from 'react';
import styled from 'styled-components';

import WeatherSearch from './WeatherSearch'

const FullBack = styled.div`
  background: #bdc3c7;
  background: -webkit-linear-gradient(to right, #bdc3c7, #2c3e50);
  background: linear-gradient(to right, #bdc3c7, #2c3e50);
  min-width: 100vw;
  position:fixed;
  background-size: cover;
  margin:-1em;
  padding:1em;
`;

export default class BlueWeather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recentQueries: localStorage["recentQueries"] ? JSON.parse(localStorage["recentQueries"]) : "",
    }
  }
  render(){
    return (
      <FullBack>
        <WeatherSearch recentQueries={this.state.recentQueries}/>
      </FullBack>
    );
  }
}
