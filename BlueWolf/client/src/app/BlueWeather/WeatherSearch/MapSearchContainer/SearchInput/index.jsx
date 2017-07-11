import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SearchInputStyle = styled.div`
  background: transparent;
  width:100%;
  font-size:2em;
  border-radius: 3px;
  margin-bottom:1em;
  z-index: 5;
`
const SearchButton = styled.button`
  height: 3.1em;
  font-size: 1em;
  width: 2em;
  padding: 0.5em 0em;
  border-radius: 0.25em;
  vertical-align: top;
  text-align: center;
  outline: none;
  margin-left: 0.3em;
  @media (max-width:980px) {
    height: 1.1em;
    text-align:center;
    font-size: 0.4em;
    padding: 0em 0em 1em;
    margin-left:0.1em;
    margin-top:1.1em;
  }
`
const StyledInput = styled.input`
  boxSizing: border-box;
  MozBoxSizing: border-box;
  border: 1px solid transparent;
  border-radius: 3px;
  width: 90%;
  height: 2em;
  text-align:center;
  font-size: 1.5em;
  marginTop: 27px;
  borderRadius: 1px;
  outline: none;
  boxShadow: 0 2px 6px rgba(0; 0; 0; 0.3);
  fontSize: 14px;
  textOverflow: ellipses;
  @media (max-width:980px) {
    height: 1em;
    text-align:center;
    font-size: 0.5em;
  }
`;

const SearchInput = ({
    qString,
    handleChange,
    handleSubmit,
  }) => (
    <SearchInputStyle>
      <form onSubmit={handleSubmit}>
        <label htmlFor='search-input'></label>
        <StyledInput value={qString} placeholder="Search for a location..." id='search-input' type="text" onChange={handleChange} />
        <SearchButton type="submit">>></SearchButton>
      </form>
    </SearchInputStyle>
  );

SearchInput.propTypes = {
  qString: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default SearchInput;
