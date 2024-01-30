import logo from "./logo.svg";
import UserDetails from "./form/UserDetails";
import Login from "./form/Login";
import Table from "./form/Table";
import Home from "./form/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Html from "./form/Html";
import Image from "./form/Image";
import ChatGPT from "./form/ChatGpt";
import Chart from "./form/Chart";
import Hours from "./form/Hours";
import logo1 from "./logo.png";
import { Container } from "react-bootstrap";

function App() {
  return (
    <div className="main-div">
      {/* <img src={logo1} style={{height:"80px", margin:"20px"}}></img> */}
      <nav class="navbar fixed-top navbar-light bg-light">
        <a class="navbar-brand" href="#">
          <img src={logo1} style={{ height: "60px", marginLeft: "20px" }}></img>
        </a>
      </nav>
      <Container fluid className="mt-3">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hours" element={<Hours />} />
            <Route path="/image" element={<Image />} />
            <Route path="/table" element={<Table />} />
            <Route path="/openai" element={<ChatGPT />} />
            <Route path="/html" element={<Html />} />
            <Route path="/signup" element={<UserDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/chart" element={<Chart />} />
          </Routes>
        </Router>
      </Container>
    </div>
  );
}

export default App;
