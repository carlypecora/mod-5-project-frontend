import React from 'react';
import logo from './logo.svg';
import './App.css';
import ConversationsContainer from './containers/ConversationsContainer'
import MainContainer from './containers/MainContainer'

function App() {
  return (
    <div className="App">
      <ConversationsContainer />
      <MainContainer />
    </div>
  );
}

export default App;
