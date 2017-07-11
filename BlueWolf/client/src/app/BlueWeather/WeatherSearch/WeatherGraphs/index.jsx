import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Col, Row } from 'react-styled-flexboxgrid'

import WeatherCurrent from './WeatherCurrent';
import WeatherHistoric from './WeatherHistoric';

const WeatherBox = styled.div`
  margin-top: 1em;
  background-color: rgba(95, 95, 95, 0.5);
  height:30vh;
  position: fixed;
  min-width: 60%;
  border-radius: 10px
  margin-bottom: 0em;
  bottom:0;
  margin-bottom: 1.6em;
  max-width: 63.5%;
  @media (max-width:980px) {
    text-align:center;
    background-color: transparent;
    font-size: 1.5em;
    margin-bottom:15%;
    padding-left: 1.5em;
  }
`
const WeatherGraphs = ({ weatherData }) => (
  <WeatherBox>
    <Row>
      <Col xs={false} md={6}>
        <WeatherCurrent currentWeather={weatherData ? weatherData.current : null} />
      </Col>
      <Col xs={false} md={6}>
        <WeatherHistoric historicWeather={weatherData ? weatherData.historic : null} currentWeather={weatherData ? weatherData.current.daily : null} currentTemp={weatherData ? weatherData.current.currently.temperature : null}/>
      </Col>
      <Col xs={6} md={false}>
        <WeatherCurrent currentWeather={weatherData ? weatherData.current : null} />
        <WeatherHistoric historicWeather={weatherData ? weatherData.historic : null} currentWeather={weatherData ? weatherData.current.daily : null} currentTemp={weatherData ? weatherData.current.currently.temperature : null}/>
      </Col>
    </Row>
  </WeatherBox>
);

WeatherGraphs.PropTypes = {
  weatherData: PropTypes.object.isRequired,
}

export default WeatherGraphs;
