import React from 'react';
import './App.css';
import HomePage from './components/HomePage'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p tabIndex="1" 
          aria-label={"title site Simple Wiki"}>
          Simple Wiki
        </p>
      </header>
      <body className="App-body">
        <HomePage/>
      </body>
      <footer className="App-footer">
        <p >
          Create by Jesiel Sopzak
        </p>
      </footer>
    </div>
  );
}

export default App;
