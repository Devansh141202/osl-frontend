import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

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
          "https://osl-learning.onrender.com/api/v1/get-states"
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
        `https://osl-learning.onrender.com/api/v1/get-districts?state=${selectedState}`
      );
      setDistricts(response.data);
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };

  const onFinish = async (formData) => {
    console.log("hello");
    const response = await axios.post(
      "https://osl-learning.onrender.com/api/v1/create-details",
      formData
    );
    reset();
    toast.success("Details added successfully!", {
      position: "top-center",
    });
    setTimeout(() => {
      navigate("/login");
    }, 2000);
    console.log(response);
  };

  return (
    <div
      className="container-fluid d-flex align-items-center justify-content-center position-fixed"
      style={{ height: "100vh", width: "100vw" }}
    >
      <form
        style={{ height: "600px" }}
        className="rounded mb-0 shadow p-3 bg-light text-dark w-50 custom-form"
        onSubmit={handleSubmit((formData) => {
          onFinish(formData);
          setData(JSON.stringify(formData));
        })}
      >
        <h1 className="mb-3 text-center ">Sign Up</h1>

        <div className="form-group ">
          <div class="form-group d-flex align-items-center">
            <small for="exampleInputEmail1">Full Name</small>
            &nbsp;&nbsp;
            <input
              type="text"
              class="form-control  mt-0"
              style={{ width: "38%" }}
              id="fname"
              aria-describedby="emailHelp"
              placeholder="Enter Name"
              {...register("fullName", { required: true, maxLength: 20 })}
            />
            {errors.fullName && (
              <p style={{ color: "red" }}>This is a required field</p>
            )}
            &nbsp;&nbsp;
            <small for="exampleInputEmail1">Email address</small>
            &nbsp;&nbsp;
            <input
              type="email"
              class="form-control mt-0"
              style={{ width: "38%" }}
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
          <div class="form-group row align-items-center">
            <div className="col-lg-1">
              <small for="exampleInputPassword1">Password</small>
            </div>
            <div className="col-lg-11">
              <input
                type="password"
                class="form-control col-lg-10"
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
            </div>
            {errors.password && (
              <p style={{ color: "red" }}>{errors.password.message}</p>
            )}
          </div>
          <div className="row mt-2">
            <div className="col d-flex align-items-end justify-content-start align-items-center">
              <small>Company</small>
              &nbsp;&nbsp;
              <select
                style={{ width: "75%" }}
                className="from-control"
                {...register("companyName", { required: true })}
              >
                <option value="" defaultValue>
                  Select Company
                </option>
                <option value="Google">Google</option>
                <option value="Amazon">Amazon</option>
              </select>
            </div>
            <div className="col d-flex align-items-end justify-content-start align-items-center">
              <small>Gender</small>
              &nbsp;&nbsp;
              <div class="form-check form-check-inline d-flex align-items-center">
                <input
                  class="form-check-input"
                  style={{ width: "15px", height: "15px" }}
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio1"
                  value="Male"
                  {...register("gender")}
                />
                &nbsp;&nbsp;
                <p class="form-check-small mb-0" for="inlineRadio1">
                  Male
                </p>
              </div>
              <div class="form-check form-check-inline d-flex align-items-center">
                <input
                  class="form-check-input"
                  type="radio"
                  style={{ width: "15px", height: "15px" }}
                  name="inlineRadioOptions"
                  id="inlineRadio2"
                  value="Female"
                  {...register("gender")}
                />
                &nbsp;&nbsp;
                <p class="form-check-small mb-0" for="inlineRadio2">
                  Female
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className=" form-group col-lg-6 d-flex justify-content-center align-items-center mt-3">
              <small htmlFor="state">State</small>
              &nbsp;&nbsp;
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

            <div className=" form-group col-lg-6 d-flex justify-content-center align-items-center mt-3">
              <small htmlFor="district">District</small>
              &nbsp;&nbsp;
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
                    <option key={district._id} value={district._id}>
                      {district.districtName}
                    </option>
                  ))}
              </select>
              {errors.district && (
                <p style={{ color: "red" }}>This is a required field</p>
              )}
            </div>
          </div>
          <div class="form-group row">
            <div className="col-lg-1">
              <small for="exampleFormControlTextarea1">Address</small>
            </div>
            <div className="col-lg-11">
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                {...register("address")}
              ></textarea>
            </div>
          </div>
          <div class="form-check d-flex align-items-center">
            <input
              type="checkbox"
              class="form-check-input"
              style={{ width: "25px", height: "3vh" }}
              id="exampleCheck1"
              {...register("rememberMe")}
            />
            &nbsp;
            <small class="form-check-small" for="exampleCheck1">
              Remember me
            </small>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <button type="submit" class="btn btn-primary button-sbt w-25">
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
