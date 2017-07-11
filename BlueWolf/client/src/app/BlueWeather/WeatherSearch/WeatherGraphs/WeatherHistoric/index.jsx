import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { VictoryLegend, VictoryAxis, VictoryBar, VictoryGroup, VictoryChart } from 'victory';

const HistoryBox = styled.div`
  margin-top: -1%;
  background: transparent;
  height:30vh;
  color: white;
  text-align: center;
  vertical-align: middle;
  z-index: 3;
  margin-left: 2vh;
  @media (max-width:980px) {
    text-align:center;
    background-color: transparent;
    font-size: 0.7em;
    padding-top: 0em;
    margin-bottom: 0em;
    margin-top: -5em;
    min-width: 50vh;
    margin-right: 10vh;
    margin-left: -3em;
  }
`

const HistoryH3 = styled.h3`
  margin-bottom:-2em;
`

const WeatherHistoric = ({ historicWeather, currentWeather, currentTemp }) => (
    <HistoryBox>
    { historicWeather && historicWeather.almanac && historicWeather.almanac.temp_low.record ?
      <div>
        <HistoryH3>On this day...</HistoryH3>
      </div>
      : null }
    { historicWeather && historicWeather.almanac && historicWeather.almanac.temp_low.record  ?
      <VictoryChart
          domainPadding={{ x: 25 }}
          style={{
            labels: {stroke: "white"}
          }}
          width={450} height={300}
        >
        <VictoryLegend
        data={[
          { name: "Highest & Lowest Recorded Temp", symbol: {fill: "red"} },
          { name: "Average Recorded Temp on this day", symbol: { fill: "orange" } },
          { name: "Todays High and Low Temp", symbol: { fill: "yellow" }}
         ]}
         style={{
            labels: { fontSize: 12, stroke: "white" },
          }}
          x={60}
          y={40}
          />
            <VictoryGroup
              offset={8}
              style={{
                data: { width: 4, stroke: "red"},
              }}
              colorScale={["red", "orange", "yellow"]}
            >
                <VictoryBar
                  data={[
                    {x: "Lows", y: parseInt(historicWeather.almanac.temp_low.record["F"])},
                    {x: "Highs", y: parseInt(historicWeather.almanac.temp_high.record["F"])},
                  ]}
                />
                <VictoryBar
                  data={[
                    {x: "Lows", y: parseInt(historicWeather.almanac.temp_low.normal["F"])},
                    {x: "Highs", y: parseInt(historicWeather.almanac.temp_high.normal["F"])},
                  ]}
                />
                <VictoryBar
                  data={[
                    {x: "Lows", y: currentWeather.data[0].temperatureMin},
                    {x: "Highs", y: currentWeather.data[0].temperatureMax},
                  ]}
                />
            </VictoryGroup>
            <VictoryAxis
              tickValues={["Lows", "Highs"]}
              offsetX={5}
              style ={{
                parent: { stroke: "white"},
                axis: {stroke: "white"},
                grid: {stroke: (t) => t === 10 ? "red" : "grey"},
                ticks: {stroke: "white"},
                tickLabels: {stroke: "white", fontSize: 14, padding:15}
              }}
            />
            <VictoryAxis dependentAxis
            label="Degrees F˚"
            fixLabelOverlap={true}
            style={{
              parent: { stroke: "white"},
              axis: {stroke: "white"},
              axisLabel: {fontSize: 19, padding: 35, stroke: "white"},
              grid: {stroke: (t) => t === 10 ? "white" : "grey"},
              ticks: {stroke: "white"},
              tickLabels: {stroke: "white", fontSize: 14, padding:15}
            }}
            />
        </VictoryChart> : null }
        { historicWeather && !historicWeather.almanac ? <h3>Historic Data not available in this location</h3> : null}
    </HistoryBox>
  );

WeatherHistoric.PropTypes = {
  historicWeather: PropTypes.object,
  currentWeather: PropTypes.object.isRequired,
  currentTemp: PropTypes.string.isRequired,
};

export default WeatherHistoric
