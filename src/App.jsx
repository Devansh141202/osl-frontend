import logo from './logo.svg';
import UserDetails from './form/UserDetails'
import Login from './form/Login'
import Table from './form/Table'
import Home from './form/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Html from './form/Html';
import Image from './form/Image';
import ChatGPT from './form/ChatGpt';
import Chart from './form/Chart';

function App() {
  return (
    <div className='main-div'>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/table' element={<Table />} />
          <Route path='/openai' element={<ChatGPT />} />
          <Route path='/html' element={<Html />} />
          <Route path="/signup" element={<UserDetails />} />
          <Route path="/image" element={<Image />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chart" element={<Chart />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
