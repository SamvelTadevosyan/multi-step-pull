import React from 'react';
import './App.css';
import Poll from './features/poll/Poll'
import Summary from './features/summary/Summary';

function App() {
  return (
    <div className="App">
        <Poll />
        <Summary/>
    </div>
  );
}

export default App;
