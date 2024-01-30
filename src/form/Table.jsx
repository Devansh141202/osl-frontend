import React, { useState, useEffect } from "react";
import axios from "axios";
import Hours from "./Hours";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import MaterialTable from "material-table";

function Table() {
  const [columns, setColumns] = useState([
    { title: "ID", field: "_id", editable: "never" },
    { title: "Company Name", field: "companyName" },
    { title: "Month", field: "month" },
    { title: "Hours", field: "hours", type: "string" },
  ]);
  const navigate = useNavigate();
  const [id, setId] = useState([]);
  const [data, setData] = useState([
    { _id: "1", companyName: "Company A", month: "January", hours: "80" },
  ]);

  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");

    const decodedToken = jwtDecode(token);

    return decodedToken ? decodedToken.userId : null;
  };

  const addRow = async (newData) => {
    try {
      const userId = getUserIdFromToken();
      const response = await axios.post(
        "http://localhost:5000/api/v1/add-row",
        { userId, ...newData }
      );
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/get-rows`,
          {
            headers: { Authorization: localStorage.getItem("token") },
          }
        );
        setData(response.data.resp);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } catch (error) {
      console.error("Error adding row:", error);
    }
  };

  const updateRow = async (newData, oldData) => {
    try {
      // console.log(oldData)
      const userId = getUserIdFromToken();
      const response = await axios.put(
        `http://localhost:5000/api/v1/update-rows/${oldData._id}`,
        {
          userId: userId,
          ...newData,
        },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      const updatedData = [...data];
      const index = oldData.tableData.id;
      console.log(updatedData[index]);
      updatedData[index] = response.data.obj;
      console.log(response.data);
      setData(updatedData);
    } catch (error) {
      console.error("Error updating row:", error);
    }
  };

  const deleteRow = async (oldData) => {
    try {
      const userId = getUserIdFromToken();
      await axios.delete(
        `http://localhost:5000/api/v1/delete-rows/${oldData._id}`,
        {
          data: { userId },
        }
      );
      const updatedData = [...data];
      const index = oldData.tableData.id;
      updatedData.splice(index, 1);
      console.log(updatedData);
      setData(updatedData);
    } catch (error) {
      console.error("Error deleting row:", error);
    }
  };

  useEffect(() => {
    const userId = getUserIdFromToken();
    console.log(userId);
    console.log(userId);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/get-rows`,
          {
            headers: { Authorization: localStorage.getItem("token") },
          }
        );
        setData(response.data.resp);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const token = localStorage.getItem("token");

    console.log(token);
    axios
      .get("http://localhost:5000/api/v1/verify-token", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then(() => {
        fetchData();
      })
      .catch(() => {
        navigate("/login");
      });
    fetchData();
  }, []);

  return (
    <>
      {/* {console.log(data)} */}
      <div style={{ marginTop: "100px" }}>
        <MaterialTable
          title="Editable Preview"
          columns={columns}
          // rows={data}
          data={data}
          editable={{
            onRowAdd: addRow,
            onRowUpdate: updateRow,
            onRowDelete: deleteRow,
          }}
        />
        <Hours />
      </div>
    </>
  );
}

export default Table;
