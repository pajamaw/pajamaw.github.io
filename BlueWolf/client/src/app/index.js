import React, { Component } from 'react';
import styled from 'styled-components'
import BlueWeather from './BlueWeather'

const AppStyle = styled.div`
  height:100%;
  position:fixed;
`;

export default class App extends Component {
  render() {
    return (
      <AppStyle>
        <div className="App">
          <BlueWeather />
        </div>
      </AppStyle>
    );
  }
}
