import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Map from './Map';
import SearchInput from './SearchInput';

const MapStyle = styled.div`
  width: '66vw';
  height: '100vh';
  background:transparent;
`

const MapSearchContainer = ({ latLng, mapBasedSearch, handleSubmit, queryString, handleChange, onMapLocation, handleSearchInputChange }) => (
  <MapStyle>
    <SearchInput
      handleSubmit={handleSubmit}
      qString={queryString}
      handleChange={handleChange}/>
    <Map google={window.google} mapBasedSearch={onMapLocation} coordinates={latLng}/>
  </MapStyle>
)

MapSearchContainer.PropTypes = {
  latLng: PropTypes.object.isRequired,
  mapBasedSearch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  queryString: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  onMapLocation: PropTypes.func.isRequired,
  handleSearchInputChange: PropTypes.func.isRequired
};

export default MapSearchContainer
