import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';
import { Grid, Col, Row } from 'react-styled-flexboxgrid'

import WeatherGraphs from './WeatherGraphs';
import RecentQueries from './RecentQueries'
import MapSearchContainer from './MapSearchContainer';

const GridStyle = styled.div`
  height:100vh;
`

export default class WeatherSearch extends Component {
  static propTypes = {
    recentQueries: PropTypes.array,
  };

  constructor(props) {
    super(props);

    this.state = {
      addressData: null,
      queryString: '',
      weatherData: null,
      recentQueries: this.props.recentQueries || []
    };

    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchWeatherData = this.fetchWeatherData.bind(this);
    this.addQueryToRecentQueries = this.addQueryToRecentQueries.bind(this);
    this.repeatSearch = this.repeatSearch.bind(this);
    this.storeToLocalStorage = this.storeToLocalStorage.bind(this)
    this.clearRecent = this.clearRecent.bind(this);
    this.mapBasedSearch = this.mapBasedSearch.bind(this);
    this.reverseGeocodeCoordinates = this.reverseGeocodeCoordinates.bind(this);
  };

  handleSearchInputChange = (e) =>{
    this.setState({
      queryString: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.queryString);
    fetch(`/api/location/${this.state.queryString}`)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        let { lat, lng } = res.results[0].geometry.location
        this.setState({
          addressData: {
            lat: lat,
            lng: lng,
          }
        })
      })
      .then(()=>{
        this.fetchWeatherData(this.state.addressData.lat, this.state.addressData.lng)
        this.addQueryToRecentQueries(this.state.queryString, this.state.addressData)
      })
  }

  addQueryToRecentQueries = (str, coordinates) => {
    var pushedArray = this.state.recentQueries.slice()
    console.log(pushedArray)
    pushedArray.push({ qString: str, coord: coordinates })
    console.log(pushedArray)
    this.setState({
      recentQueries: pushedArray
    })
    console.log(this.state.recentQueries)
    this.storeToLocalStorage(this.state.recentQueries)
  }

  fetchWeatherData = (lat, lng) => {
    lat = lat.toString().slice(0, lat.toString().indexOf('.'))
    lng = lng.toString().slice(0, lng.toString().indexOf('.'))
    fetch(`/api/weather/${lat}/${lng}`)
      .then(res => res.json())
      .then(res =>{
        this.setState({
          weatherData: res
        })
      })
  }

  repeatSearch = (query) => {
    const { qString, coord }  = query
    const { lat, lng } = coord
    this.setState({
      queryString: qString,
      addressData: {
        lat, lng
      },
    })
    this.fetchWeatherData(lat, lng)
  }

  storeToLocalStorage = (recentQ) => localStorage["recentQueries"] = JSON.stringify(recentQ)

  clearRecent = (e) => {
    e.preventDefault();
    localStorage.removeItem("recentQueries");
    this.setState({
      recentQueries: []
    })
  }

  mapBasedSearch = (newCoordinates) => {
    let { lat, lng } = newCoordinates
    this.reverseGeocodeCoordinates(newCoordinates)
      this.setState({
        addressData: {
          lat: lat,
          lng: lng
        },
      })
    this.fetchWeatherData(lat, lng)
  }

  reverseGeocodeCoordinates = (coord) => {
    let { lat, lng } = coord
    let g = new window.google.maps.Geocoder();
    g.geocode({'location': coord}, (results, status)=>{
    if (status === 'OK') {
      if (results[1]) {
         this.setState({
           queryString: results[1].formatted_address
         })
      } else {
        this.setState({
          queryString: `${lat}, ${lng}`
        })
      }
    } else {
      this.setState({
        queryString: `${lat}, ${lng}`
      })
    }
    this.addQueryToRecentQueries(this.state.queryString, this.state.addressData)
  })
};

  render() {
    return (
      <GridStyle>
        <Grid fluid={true}>
          <Row>
            <Col xs={false} md={8}>
              <MapSearchContainer onMapLocation={this.mapBasedSearch} latLng={this.state.addressData} queryString={this.state.queryString} handleSubmit={this.handleSubmit} handleChange={this.handleSearchInputChange}/>
              <WeatherGraphs weatherData={this.state.weatherData} />
            </Col>
            <Col xs={6} md={false}>
              <MapSearchContainer onMapLocation={this.mapBasedSearch} latLng={this.state.addressData} queryString={this.state.queryString} handleSubmit={this.handleSubmit} handleChange={this.handleSearchInputChange}/>
            </Col>
            <Col xs={false} md={4}>
              <RecentQueries clearRecent={this.clearRecent} repeatSearch={this.repeatSearch} recentQueries={this.state.recentQueries} />
            </Col>
            <Col xs={6} md={false}>
              <RecentQueries clearRecent={this.clearRecent} repeatSearch={this.repeatSearch} recentQueries={this.state.recentQueries} />
              <WeatherGraphs weatherData={this.state.weatherData} />
            </Col>
          </Row>
        </Grid>
      </GridStyle>
    );
  }
}
