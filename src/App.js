import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Introduction from './pages/Introduction';
import JoinRoom from './pages/JoinRoom';
import Room from './pages/Room';
import { connectWithSocket } from './utils/wss';

function App() {
  useEffect(() => {
    connectWithSocket()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/join-room" element={<JoinRoom />} />
        <Route path="/room" element={<Room />} />
        <Route path="/" element={<Introduction />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
