import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {Link} from 'react-router-dom'

export default function LabTabs() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div
      style={{ backgroundColor: "white", marginTop:"100px"}}
      className="p-3 d-flex justify-content-center"
    >
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Week 1" value="1" />
              <Tab label="Week 2" value="2" />
              <Tab label="Week 3" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">SR</th>
                  <th scope="col">Mentor</th>
                  <th scope="col">Task</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Hetal</td>
                  <td><Link to={"/html"}>HTML CSS Page</Link></td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Aditya Joshi</td>
                  <td><Link to={"/openai"}>Chat GPT intigartion</Link></td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Aditya Jain</td>
                  <td><Link to={'/login'}>CRUD opeations on backend</Link></td>
                </tr>
                
              </tbody>
            </table>
          </TabPanel>
          <TabPanel value="2">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">SR</th>
                  <th scope="col">Mentor</th>
                  <th scope="col">Task</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">4</th>
                  <td>Mihir</td>
                  <td><Link to={'/login'}>CRUD opeations on frontend</Link></td>
                </tr>
                <tr>
                  <th scope="row">5</th>
                  <td>JD</td>
                  <td><Link to={'/login'}>Login-SignUp and charts</Link></td>
                </tr>
              </tbody>
            </table>
          </TabPanel>

          <TabPanel value="3">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">SR</th>
                  <th scope="col">Mentor</th>
                  <th scope="col">Task</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">6</th>
                  <td>Romin</td>
                  <td><Link to={'/login'}>Aggregation</Link></td>
                </tr>
                <tr>
                  <th scope="row">7</th>
                  <td>Sarkar</td>
                  <td><Link to={'/image'}>Node-python integration</Link></td>
                </tr>
              </tbody>
            </table>
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}
