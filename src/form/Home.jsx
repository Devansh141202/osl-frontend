import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Link } from "react-router-dom";

export default function LabTabs() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div
      style={{ backgroundColor: "white", marginTop: "100px" }}
      className="p-3 d-flex justify-content-center"
    >
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="All Tasks" value="All Tasks" />
              <Tab label="Week 1" value="1" />
              <Tab label="Week 2" value="2" />
              <Tab label="Week 3" value="3" />
            </TabList>
          </Box>
          <TabPanel value="All Tasks">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">SR</th>
                  <th scope="col">Mentor</th>
                  <th scope="col">Task</th>
                  <th scope="col" className="w-50">
                    Problem Statement
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Hetal</td>
                  <td>
                    <Link to={"/html"}>HTML CSS Page</Link>
                  </td>
                  <td>
                    Simple login design with HTML which has some CSS, Learnt
                    about{" "}
                    <b>
                      HTML, CSS, Javascript, Bootstrap,React-Bootstrap, Mui,
                      Material-Table, Git and Explored various Charts libraries
                    </b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Aditya Joshi</td>
                  <td>
                    <Link to={"/openai"}>Chat GPT intigartion</Link>
                  </td>
                  <td>
                    OpenAI <b>API integration</b>, It should allow user send
                    prompt and user will get response from ChatGpt
                  </td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Aditya Jain</td>
                  <td>
                    <Link to={"/login"}>CRUD opeations on backend</Link>
                  </td>
                  <td>
                    Perform <b>CRUD on backend</b> side with <b>validations</b>,
                    Here i have integrated this APIs with frontend form and
                    performed the task
                  </td>
                </tr>
                <tr>
                  <th scope="row">4</th>
                  <td>Mihir</td>
                  <td>
                    <Link to={"/login"}>CRUD opeations on frontend</Link>
                  </td>
                  <td>
                    Create a form which accepts all types of input fields with{" "}
                    <b>React-Hook-Form</b> and display the data After filling the
                    whole form.
                  </td>
                </tr>
                <tr>
                  <th scope="row">5</th>
                  <td>JD</td>
                  <td>
                    <Link to={"/login"}>Login-SignUp and charts</Link>
                  </td>
                  <td>
                    Assigned a hierarchy of schema and need to perform
                    aggregation query on those schema after querying those data,
                    it should be reflecting on the chart, for charts you should
                    use <b>React-ChartJs-2</b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">6</th>
                  <td>Romin</td>
                  <td>
                    <Link to={"/login"}>Aggregation</Link>
                  </td>
                  <td>
                    Discussed on projects that Romin has done so far in detail
                    and Make some <b>Aggreagation</b> queries for dummy data as
                    well as implemented aggregation in JD's task also
                  </td>
                </tr>
                <tr>
                  <th scope="row">7</th>
                  <td>Sarkar</td>
                  <td>
                    <Link to={"/image"}>Node-python integration</Link>
                  </td>
                  <td>
                    Need to take an Image as input from the user with{" "}
                    <b>Multer.js</b>, that image should capture by a <b>Node</b>{" "}
                    server and that Node server will send that image to a{" "}
                    <b>Phython </b> file and in Python file that image will get
                    converted to black and white and after it should be
                    converted in Base64.
                  </td>
                </tr>
              </tbody>
            </table>
          </TabPanel>
          <TabPanel value="1">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">SR</th>
                  <th scope="col">Mentor</th>
                  <th scope="col">Task</th>
                  <th scope="col" className="w-50">
                    Problem Statement
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Hetal</td>
                  <td>
                    <Link to={"/html"}>HTML CSS Page</Link>
                  </td>
                  <td>
                    Simple login design with HTML which has some CSS, Learnt
                    about{" "}
                    <b>
                      HTML, CSS, Javascript, Bootstrap,React-Bootstrap, Mui,
                      Material-Table, Git and Explored various Charts libraries
                    </b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Aditya Joshi</td>
                  <td>
                    <Link to={"/openai"}>Chat GPT intigartion</Link>
                  </td>
                  <td>
                    OpenAI <b>API integration</b>, It should allow user send
                    prompt and user will get response from ChatGpt
                  </td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Aditya Jain</td>
                  <td>
                    <Link to={"/login"}>CRUD opeations on backend</Link>
                  </td>
                  <td>
                    Perform <b>CRUD on backend</b> side with <b>validations</b>,
                    Here i have integrated this APIs with frontend form and
                    performed the task
                  </td>
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
                  <th scope="col" className="w-50">
                    Problem Statement
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">4</th>
                  <td>Mihir</td>
                  <td>
                    <Link to={"/login"}>CRUD opeations on frontend</Link>
                  </td>
                  <td>
                    Create a form which accepts all types of input fields with{" "}
                    <b>React-Hook-Form</b> and display the data After filling the
                    whole form.
                  </td>
                </tr>
                <tr>
                  <th scope="row">5</th>
                  <td>JD</td>
                  <td>
                    <Link to={"/login"}>Login-SignUp and charts</Link>
                  </td>
                  <td>
                    Assigned a hierarchy of schema and need to perform
                    aggregation query on those schema after querying those data,
                    it should be reflecting on the chart, for charts you should
                    use <b>React-ChartJs-2</b>
                  </td>
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
                  <th scope="col" className="w-50">
                    Problem Statement
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">6</th>
                  <td>Romin</td>
                  <td>
                    <Link to={"/login"}>Aggregation</Link>
                  </td>
                  <td>
                    Discussed on projects that Romin has done so far in detail
                    and Make some <b>Aggreagation</b> queries for dummy data as
                    well as implemented aggregation in JD's task also
                  </td>
                </tr>
                <tr>
                  <th scope="row">7</th>
                  <td>Sarkar</td>
                  <td>
                    <Link to={"/image"}>Node-python integration</Link>
                  </td>
                  <td>
                    Need to take an Image as input from the user with{" "}
                    <b>Multer.js</b>, that image should capture by a <b>Node</b>{" "}
                    server and that Node server will send that image to a{" "}
                    <b>Phython </b> file and in Python file that image will get
                    converted to black and white and after it should be
                    converted in Base64.
                  </td>
                </tr>
              </tbody>
            </table>
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}
