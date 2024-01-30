import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, useForm } from "react-hook-form";
import axios from "axios";

const UserDetails = () => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [data, setData] = useState("");
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/get-states"
        );
        setStates(response.data);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };

    fetchStates();
  }, []);

  const handleStateChange = async (selectedState) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/get-districts?state=${selectedState}`
      );
      setDistricts(response.data);
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };

  const onFinish = async (formData) => {
    console.log("hello");
    const response = await axios.post(
      "http://localhost:5000/api/v1/create-details",
      formData
    );
    reset();
    navigate("/login");
    console.log(response);
  };

  return (
    <div
      className="container-fluid d-flex align-items-center justify-content-center "
      style={{ height: "100vh", width: "100vw" }}
    >
      <form
        className="rounded shadow p-3 mb-2 m-5 bg-light text-dark w-50 custom-form"
        onSubmit={handleSubmit((formData) => {
          onFinish(formData);
          setData(JSON.stringify(formData));
        })}
      >
        <h1 className="mb-3 text-center ">Sign Up</h1>

        <div className="form-group ">
          <div class="form-group d-flex">
            <label for="exampleInputEmail1">Full Name</label>
            <input
              type="text"
              class="form-control"
              id="fname"
              aria-describedby="emailHelp"
              placeholder="Enter Fullname"
              {...register("fullName", { required: true, maxLength: 20 })}
            />
            {errors.fullName && (
              <p style={{ color: "red" }}>This is a required field</p>
            )}
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              {...register("email", {
                required: "required this field",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
            ></input>
            {errors.email && (
              <p style={{ color: "red" }}>This is a required field</p>
            )}
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              {...register("password", {
                required: true,
                pattern: {
                  value:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                  message:
                    "Password should contain 8 letter 1 special char and 1 digit",
                },
              })}
            />
            {errors.password && (
              <p style={{ color: "red" }}>{errors.password.message}</p>
            )}
          </div>
          <div className="row mt-2">
            <div className="col d-flex align-items-end justify-content-start">
              <label>Company</label>
              <select className="from-control"{...register("companyName", { required: true })}>
              <option value="" defaultValue>
              Select Company
            </option>
                <option value="Google">Google</option>
              </select>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  style={{ width: "25px", height: "25px" }}
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio1"
                  value="Male"
                  {...register("gender")}
                />
                <label class="form-check-label" for="inlineRadio1">
                  Male
                </label>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    style={{ width: "25px", height: "25px" }}
                    name="inlineRadioOptions"
                    id="inlineRadio2"
                    value="Female"
                    {...register("gender")}
                  />
                  <label class="form-check-label" for="inlineRadio2">
                    Female
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="state">State</label>
            <select
              className="form-control"
              {...register("state", { required: true })}
              onChange={(e) => {
                setValue("district", "");
                handleStateChange(e.target.value);
              }}
            >
              <option value="" selected>
                Select State
              </option>
              {states.map((state) => (
                <option key={state._id} value={state.stateName}>
                  {console.log()}
                  {state.stateName}
                </option>
              ))}
            </select>
            {errors.state && (
              <p style={{ color: "red" }}>This is a required field</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="district">District</label>
            <select
              className="form-control"
              {...register("district", { required: true })}
              disabled={!states || states.length === 0}
            >
              <option value="" defaultValue>
                Select District
              </option>
              {districts &&
                districts.length > 0 &&
                districts.map((district) => (
                  <option key={district._id} value={district.districtName}>
                    {district.districtName}
                  </option>
                ))}
            </select>
            {errors.district && (
              <p style={{ color: "red" }}>This is a required field</p>
            )}
          </div>
          <div class="form-group">
            <label for="exampleFormControlTextarea1">Address</label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              {...register("address")}
            ></textarea>
          </div>
          <div class="form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="exampleCheck1"
              {...register("rememberMe")}
            />
            <label class="form-check-label" for="exampleCheck1">
              Remember me
            </label>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <button type="submit" class="btn btn-primary button-sbt">
              Submit
            </button>
          </div>
        </div>
        <p style={{ color: "red" }}>{data}</p>
      </form>
    </div>
  );
};

export default UserDetails;
