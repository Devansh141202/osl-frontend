import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import HoursChart from "./Chart.jsx";
import Button from "@mui/material/Button";
import { Form, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CodeSharp } from "@material-ui/icons";
import { white } from "material-ui/styles/colors";
import { Col, Row } from "react-bootstrap";

const App = () => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useForm();
  const [totalHoursData, setTotalHoursData] = useState([]);

  // State for user input
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);

  const fetchStates = async () => {
    try {
      const response = await axios.get(
        "https://osl-learning.onrender.com/api/v1/get-states"
      );
      setStates(response.data);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };
  const fetchTotalHours = async () => {
    let url = "https://osl-learning.onrender.com/api/v1/get-hours?";
    if (selectedState) {
      url += `state=${selectedState}`;
      if (selectedDistrict) {
        url += `&district=${selectedDistrict}`;
      }
      if (selectedMonth) {
        url += `&month=${selectedMonth}`;
      }
    } else if (selectedMonth) {
      url = url + `month=${selectedMonth}`;
    }
    console.log(url);
    try {
      const response = await axios.get(url);
      console.log("This is ", response.data);
      setTotalHoursData(response.data);
    } catch (error) {
      console.error("Error fetching total hours data:", error);
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    fetchTotalHours();
    // let isAuth = localStorage.getItem('token');
    // console.log(isAuth)
    //     if(isAuth === null) {
    //         navigate("/login");
    //     }
    //     setTimeout(()=>{
    //       localStorage.clear()
    //       alert("session timed out please refresh!!!")
    //     }, 30*60*1000)
  }, [selectedMonth, selectedState, selectedDistrict]);
  const finalData = {
    labels: totalHoursData.map((item) => item._id),
    datasets: [
      {
        label: "Hours Worked",
        data: totalHoursData.map((item) => item.count),
        backgroundColor: "rgba(0,130,132, 0.8)",
        borderColor: "rgba(0,130,132,0.5)",
        borderWidth: 1,
      },
    ],
  };
  useEffect(() => {
    // console.log(totalHoursData);
    fetchStates();
    fetchTotalHours();
  }, []);
  const handleStateChange = async (selectedState) => {
    console.log(selectedState);
    try {
      const response = await axios.get(
        `https://osl-learning.onrender.com/api/v1/get-districts?state=${selectedState}`
      );
      setDistricts(response.data);
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };

  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  const handleReset = () => {
    setSelectedState("");
    setSelectedDistrict("");
    setSelectedMonth("");
    document.getElementById("stateDropdown").selectedIndex = 0;
    document.getElementById("districtDropdown").selectedIndex = 0;
    document.getElementById("monthDropdown").selectedIndex = 0;
  };

  return (
    <div style={{ backgroundColor: white }}>
      <h2 className="mt-4 mb-0" style={{ marginLeft: "15px" }}>
        Total Hours Worked
      </h2>
      <div className="d-flex">
        <div className="form-group m-3">
          <label htmlFor="state">State</label>
          <select
            id="stateDropdown"
            className="form-control"
            style={{
              width: "150px",
              borderRadius: "5px",
              border: "1px solid rgb(0,0,0,0.4)",
            }}
            // {...register("state", { required: true })}
            onChange={(e) => {
              setSelectedState(e.target.value);
              setValue("district", "");
              handleStateChange(e.target.value);
            }}
          >
            <option value="" selected>
              Select State
            </option>
            {states.map((state) => (
              <option key={state._id} value={state._id}>
                {console.log()}
                {state.stateName}
              </option>
            ))}
          </select>
          {errors.state && (
            <p style={{ color: "red" }}>This is a required field</p>
          )}
        </div>

        <div
          className="form-group m-3"
          style={{
            width: "150px",
          }}
        >
          <label htmlFor="district">District</label>
          <select
            id="districtDropdown"
            style={{
              borderRadius: "5px",
              border: "1px solid rgb(0,0,0,0.4)",
            }}
            className="form-control"
            // {...register("district", { required: true })}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            disabled={!states || states.length === 0}
          >
            <option value="" defaultValue>
              Select District
            </option>
            {districts &&
              districts.length > 0 &&
              districts.map((district) => (
                <option key={district._id} value={district._id}>
                  {district.districtName}
                </option>
              ))}
          </select>
          {errors.district && (
            <p style={{ color: "red" }}>This is a required field</p>
          )}
        </div>
        <div className="form-group m-3">
          <label htmlFor="month">Month</label>
          <select
            style={{
              width: "150px",
              borderRadius: "5px",
              border: "1px solid rgb(0,0,0,0.4)",
            }}
            className="form-control"
            id="monthDropdown"
            onChange={(e) => {
              setSelectedMonth(e.target.value);
            }}
          >
            <option value="" defaultValue>
              Select Month
            </option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
        </div>
        <Button
          variant="contained"
          onClick={handleReset}
          className="rounded"
          style={{
            marginTop: "48px",
            height: "39px",
            width: "30px",
            backgroundColor: "#2E7D32",
            color: "white",
          }}
        >
          Reset
        </Button>
      </div>
      <div className="w-100 d-flex box-shadow">
        <div style={{ width: "100%", height: "400px" }}>
          <Bar
            data={finalData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              barThickness: 100,
              scales: {
                y: {
                  ticks: {
                    padding: 10,
                  },
                  title: {
                    display: true,
                    text: "Total Hours Worked",
                    color: "black",
                    font: {
                      size: 20,
                      weight: "bold",
                    },
                  },
                },
                x: {
                  ticks: {
                    padding: 10,
                  },
                  title: {
                    display: true,
                    text: "Companies",
                    color: "black",
                    font: {
                      size: 20,
                      weight: "bold",
                    },
                  },
                },
              },
            }}
            // data={totalHoursData}
          />
        </div>
      </div>
      {/* <Bar></Bar> */}
    </div>
  );
};

export default App;
