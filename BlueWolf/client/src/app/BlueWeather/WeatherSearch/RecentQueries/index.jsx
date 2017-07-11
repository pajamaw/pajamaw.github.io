import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const RecentQueriesStyle = styled.div`
  padding: 0.5em;
  margin: 0.5em;
  color: white;
  border: 2;
  border-radius: 3px;
  text-align: left;
  width: 100%;
  height:90vh;
  bottom: 0;
`
const Button = styled.button`
  display:block;
`
const UnList = styled.ul`
  overflow-y:scroll;
  overflow-x:hidden;
  margin-top: 1em;
  overflow-y: scroll;
  overflow-x: hidden;
  background: #fff;
  background-color: #fff;
  min-height: 80%;
  bottom: 10%;
  top: 15%;
  width:30%;
  padding:0;
  border-radius: 3px;
  position: fixed;
  border-radius: 3px;
  ::-webkit-scrollbar {
    width: 0px;
  }
  @media (max-width:980px) {
    width:40%;
    height:20%;
    min-height:20%;
  }

`
const ListItem = styled.li`
  background-color: #FFF;
  color: #777;
  padding: 0;
  height: 1.8em;
  margin: auto;
  font-size: 1.5em;
  text-overflow:ellipsis;
  border: 0 0 10px 0 solid black;
  font-weight: 100;
  letter-spacing: 1px;
  white-space: nowrap;
  overflow: hidden;

  border-bottom: thin solid grey;
  border-radius: 4px;
    &:hover {
    background-color: #777;
    color: #fff
  }
  @media (max-width:980px) {
    text-overflow:ellipsis;
    height: 1.0em;
    min-height:20%;
    font-size: 1em;
    letter-spacing: 1px;
  }
`

const RecentQueries = ({ recentQueries, repeatSearch, clearRecent }) => (
  <RecentQueriesStyle>
    <h2>Recent Queries</h2>
    <UnList>
      { recentQueries !== [] ? recentQueries.map((query, i)=>(
        <ListItem key={i} onClick={()=>repeatSearch(query)}>{query.qString}</ListItem>
      )) : <ListItem>No recent queries</ListItem> }
     </UnList>
     <form onSubmit={clearRecent}>
       <Button type="submit">Clear Recent Searches</Button>
     </form>
  </RecentQueriesStyle>
);

RecentQueries.PropTypes = {
  recentQueries: PropTypes.array.isRequired,
  repeatSearch: PropTypes.func.isRequired,
  clearRecent: PropTypes.func.isRequired,
};

export default RecentQueries;
