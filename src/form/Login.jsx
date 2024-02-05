import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm();

  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const successToast = ()=>{
    toast.success("Login Successfull", {
       position:"top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
    })
  }
  const onLogin = async (formData) => {
    console.log(formData);
    try {
      const response = await axios.post(
        "https://osl-learning.onrender.com/api/v1/login",
        formData
      );
      
      const token = response.data.token;
      localStorage.setItem("token", token);
      successToast();
      setLoginError("");
      setTimeout(() => {
        navigate("/table");
      }, 2000)
      // successToast()
      reset();
    } catch (error) {
      // Handle login error
      console.error("Login Error", error.response.data);
      toast.error("Login failed", {
         position:"top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
      });
      // setLoginError(error.response.data.error || "Login failed");
    }
  };

  return (
    <>
      <div className="container d-flex align-items-center justify-content-center mt-5">
        <form
          className="rounded shadow p-3 mb-2 m-5 bg-light text-dark w-50 custom-form"
          onSubmit={handleSubmit(onLogin)}
        >
          <h1 className="mb-3 text-center">Login</h1>

          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              {...register("email", {
                required: "This field is required",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p style={{ color: "red" }}>{errors.email.message}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              {...register("password", {
                required: "This field is required",
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
          {loginError && (
            <p style={{ color: "red", marginBottom: "10px" }}>{loginError}</p>
          )}
          <div className="d-flex align-items-center justify-content-center">
            <button type="submit" className="btn btn-primary button-sbt">
              Login
            </button>
            <ToastContainer />
          </div>
          <p className="mt-3">
            <Link to="/signup">Don't have an account?</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
