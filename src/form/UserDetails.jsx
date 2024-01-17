import React, { useState } from 'react'
import { Form, useForm } from 'react-hook-form'


const UserDetails = () => {
  const { register, handleSubmit, setError, formState: { errors } } = useForm();
  const [data, setData] = useState("");
  return (
    <div className='container d-flex align-items-center justify-content-center ' style={{ height: "100vh", width: "100vw" }}>
      <form className='rounded shadow p-3 mb-2 m-5 bg-light text-dark w-50 custom-form' onSubmit={handleSubmit((data) => {
        setData(JSON.stringify((data)))
      })}>
        <h1 className='mb-3 text-center '>User Details</h1>
        <div class="form-group ">
          <label for="exampleInputEmail1">Full Name</label>
          <input type="text" class="form-control" id="fname" aria-describedby="emailHelp" placeholder="Enter Fullname" {...register("fullName", { required: true, maxLength: 20 })} />
          {errors.fullName && <p style={{color: 'red'}}>This is a required field</p>}
          <label for="exampleInputEmail1">Email address</label>
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" {...register("email", {
            required: 'required this field', pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: 'Invalid email address',
            },
          })}></input>
          {errors.email && <p style={{color:'red'}}>This is a required field</p>}
          </div>
          <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" {...register("password", {
            required: true, pattern:{
              value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
              message: "Password should contain 8 letter 1 special char and 1 digit"
            }
          })} />
          {errors.password && <p style={{color:'red'}}>{errors.password.message}</p>}
        </div>
        <div className='row mt-2'>
          <div className='col d-flex align-items-end justify-content-start'>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="Male" {...register("gender")} />
              <label class="form-check-label" for="inlineRadio1">Male</label>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="Female" {...register("gender")} />
                <label class="form-check-label" for="inlineRadio2" >Female</label>
              </div>
            </div>
          </div>
          <div className='col'>
            <div class="dropdown d-flex  justify-content-start" {...register("city")}>
              <button class="btn btn-success dropdown-toggle w-50 drop-btn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                City
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#">Jamnagar</a>
                <a class="dropdown-item" href="#">Ahemedabad</a>
                <a class="dropdown-item" href="#">Rajkot</a>
              </div>
            </div>
          </div>
        </div>


        <div class="form-group">
          <label for="exampleFormControlTextarea1">Address</label>
          <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" {...register("address")}></textarea>
        </div>
        <div class="form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1" {...register('rememberMe')} />
          <label class="form-check-label" for="exampleCheck1">Remember me</label>
        </div>
        <div className='d-flex align-items-center justify-content-center'>
          <button type="submit" class="btn btn-primary button-sbt">Submit</button>
        </div>
        <p color='red'>{data}</p>
      </form>
    </div>
  )
}

export default UserDetails