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
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Header from "./form/Header";
import { Container } from "react-bootstrap";
import Footer from "./form/Footer";

function App() {
  return (
    <>
      <div className="main-div w-100 outer-div">
        {/* <img src={logo1} style={{height:"80px", margin:"20px"}}></img> */}
        <Header />
        <Container fluid className="h-100">
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
        {/* <Footer className="footer-stick" /> */}
      </div>
    </>
  );
}

export default App;
