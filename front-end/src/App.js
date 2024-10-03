// src/App.js

import React from 'react';
import './App.css';
import CreatePost from './components/CreatePost';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Blog Application</h1>
      </header>
      <main>
        <CreatePost />
      </main>
    </div>
  );
}

export default App;
