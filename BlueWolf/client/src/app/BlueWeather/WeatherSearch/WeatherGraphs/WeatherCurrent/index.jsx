import PropTypes from 'prop-types';
import React from 'react';

import styled from 'styled-components';
import { VictoryAxis, VictoryChart, VictoryLine } from 'victory';

const CurrentTempBox = styled.div`
  height:30vh;
  margin-left: 2vh;
  margin-top: 1em;
  background: transparent;
  height:30vh;
  color: white;
  text-align: center;
  vertical-align: bottom;
  zIndex: 3;
  margin-left: 2vh;
  margin-left: 4em;
  margin-right: 4em;
  @media (max-width:980px) {
    text-align:center;
    background-color: transparent;
    font-size: 0.7em;
    margin-bottom:5em;
    margin-top:-8em;
    min-width:50vh;
    margin-right:10vh;
    margin-left: -3em;
  }
`
const CurrentH3 = styled.h3`
    margin-bottom:-2em;
`

const getTimeHour = (t) => {
  let time = new Date(t * 1000)
  return time.getHours()
};

const printHours = (t) => {
  switch(t){
    case 0:
      return "12AM"
    case 3:
      return "3AM"
    case 6:
      return "6AM"
    case 9:
      return "9AM"
    case 12:
      return "12PM"
    case 15:
      return "3PM"
    case 18:
      return "6PM"
    case 21:
      return "9PM"
    default:
      return;
    }
};

const getHeaderHour = (wH) => {
  let d = new Date(wH * 1000);
  return d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}


  const WeatherCurrent = ({ currentWeather }) => (
      <CurrentTempBox>
        {currentWeather ?
          <div>
          <CurrentH3>Forecast as of {getHeaderHour(currentWeather["currently"]["time"])}: Currently {parseInt(currentWeather["currently"]["apparentTemperature"])}˚F</CurrentH3>
          <VictoryChart
            width={330} height={220}
            domainPadding={20}
          >
          <VictoryLine
            style={{data:
              {stroke:"tomato"}
            }}
            scale={{x: "time", y:"linear"}}
            data={currentWeather.hourly.data}
            x={(datum) => getTimeHour(datum.time)}
            y={(datum)=> datum.temperature}
          />
          <VictoryAxis
            tickValues={[0, 3, 6, 9, 12, 15, 18, 21]}
            tickFormat={(tick)=> printHours(tick)}
            label="Time"
            offsetX={10}
            style ={{
              parent: { stroke: "white"},
              axis: {stroke: "white"},
              axisLabel: {fontSize: 14, padding: 25, stroke:"white"},
              grid: {stroke: (t) => t === 10 ? "red" : "grey"},
              ticks: {stroke: "white"},
              tickLabels: {stroke: "white", fontSize: 10, padding:5}
            }}
          />
          <VictoryAxis dependentAxis
          label="Degrees F˚"
          fixLabelOverlap={true}
          style={{
            parent: { stroke: "white"},
            axis: {stroke: "white"},
            axisLabel: {fontSize: 14, padding: 25, stroke: "white"},
            grid: {stroke: "white"},
            ticks: {stroke: "white"},
            tickLabels: {stroke: "white", fontSize: 10, padding:5}
          }}
          />
        </VictoryChart> </div>: <h4>Select a recently searched area or input a new area to search</h4>}
      </CurrentTempBox>
    );

WeatherCurrent.PropTypes = {
  currentWeather: PropTypes.object.isRequired,
};

export default WeatherCurrent;
