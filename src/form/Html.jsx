import React from 'react'
import './Html.css'

const Html = () => {
  return (
    <div>
      {/* <header class="header">
      <h1>hello this is html and css</h1>
    </header> */}
    <div class="main">
      <div class="box-form">
        <div class="login-text">
          <p><i class="arrow left"></i></p>
          <div id="txt">
            <label>Log in with Quantum</label>
          </div>
        </div>
        <div class="radio-btns">
          <input type="radio" name="ra-btn" /> District
          <input type="radio" name="ra-btn" /> Independent school
        </div>
        <div class="login-form">
          <div class="dropdown__1">
            <label for="states" class="dropdown__label" id="State">States*</label>
            <select name="states" id="">
                <option value="Gujarat" class="dropdown__option">Gujarat</option>
                <option value="Maharashra" class="dropdown__option">Maharashra</option>
            </select>
        </div>
        <div class="dropdown__2">
            <label for="district" class="dropdown__label" id="District">District*</label>
            <select name="district" id="">
                <option value="Porbandar" class="dropdown__option">Porbandar</option>
                <option value="Mumbai" class="dropdown__option">Mumbai</option>
            </select>
        </div>
          <div class="input">
            <input type="text" placeholder="Username/Email" />
            <input type="text" placeholder="Password" />
          </div>
          <div class="check-box"><input type="checkbox" />Remember me</div>
          <div class="sbt-btn">
            <button type="submit" id="btn">LOG IN</button>
          </div>
        </div>

        <form>
          <select name="state" id="state" aria-placeholder="State" >gujarat</select> 
        </form>
      </div>
    </div>
    </div>
  )
}

export default Html
