import React, { useState } from "react";
import axios from "axios";
import './ChatGpt.css'
import LOGO from "./ChatGPT-logo-with-color-Background.png"
import 'bootstrap/dist/css/bootstrap.min.css';
export default function ChatGPT() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const url = "http://localhost:4000/chatGPT";

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${url}`, { prompt })
      .then((res) => {
        setResponse(res.data);
        console.log(prompt);
      })
      .catch((error) => {
        console.log(error);
      });

    setPrompt("");
  };

  const handlePrompt = (e) => {
    setPrompt(e.target.value);
  };

  return (
    <div className="container container-sm p-1">
      {" "}
      <div className="d-flex justify-content-center align-items-center">
        <img src={LOGO} className="logo p-2 box-shadow" alt=""></img>
        &nbsp;&nbsp;&nbsp;
        <h1 className="title text-center text-darkGreen" style={{fontSize:'65px'}}>ChatGPT API</h1>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group box-shadow p-3">
          <h4 htmlFor="" className="text-darkGreen mb-0">Ask questions</h4>
          <input
            className="mt-3 rounded p-3"
            style={{ outline: 'none', border: 0, background: '#CCE7E8' }}
            type="text"
            placeholder="Enter text"
            value={prompt}
            onChange={handlePrompt}
          />
        </div>{" "}
        {/*<button className="btn btn-accept w-100" type="submit">
          Go
  </button>*/}
      </form>
      <div className="bg-darkGreen  mt-2 p-1 border-5">
        <p className="text-light p-3">
          {response ? response : "Ask me anything..."}
        </p>
      </div>
    </div>
  );
}