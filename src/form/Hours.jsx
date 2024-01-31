import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import HoursChart from "./Chart.jsx";
import Button from "@mui/material/Button";
import { Form, useForm } from "react-hook-form";
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
  useEffect(() => {
    fetchTotalHours();
  }, [selectedMonth, selectedState, selectedDistrict]);
  const finalData = {
    labels: totalHoursData.map((item) => item._id),
    datasets: [
      {
        label: "Hours Worked",
        data: totalHoursData.map((item) => item.count),
        backgroundColor: "rgba(75,192,192,0.8)",
        borderColor: "rgba(75,192,192,0.5)",
        borderWidth: 1,
      },
    ],
  };
  useEffect(() => {
    console.log(totalHoursData);
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
    setSelectedState('');
    setSelectedDistrict('');
    setSelectedMonth('');
  };

  return (
    <div style={{ backgroundColor: white }}>
      <h2 style={{ marginLeft: "15px" }}>Total Hours Worked</h2>
      <div className="d-flex">
        <div className="form-group m-3">
          <label htmlFor="state">State</label>
          <select
            className="form-control"
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

        <div className="form-group m-3">
          <label htmlFor="district">District</label>
          <select
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
            className="form-control"
            onChange={(e) => {
              setSelectedMonth(e.target.value);
            }}
            // {...register("month")}
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
          color="success"
          variant="contained"
          onClick={handleReset}
          style={{ marginTop: "53px", height: "30px", width: "px" }}
        >
          Reset
        </Button>
      </div>
      <div className="w-100 d-flex">
        <div style={{ width: "100%", height: "400px" }}>
          <Bar
            data={finalData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              barThickness: 100,
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
