import React, { useState, useEffect } from "react";
import axios from "axios";
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
  const [data, setData] = useState([
    { _id: "1", companyName: "Company A", month: "January", hours: "80" },
  ]);

  const addRow = async (newData) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/add-row",
        { userId: "65b62cba73f352d62fab3218", ...newData }
      );
    } catch (error) {
      console.error("Error adding row:", error);
    }
  };

  const updateRow = async (newData, oldData) => {
    try {
      // console.log(oldData)
      const response = await axios.put(
        `http://localhost:5000/api/v1/update-rows/${oldData._id}`,
        {
          userId: "65b0d15dac0c178e5e7ff3a5",
          ...newData,
        }
      );
      const updatedData = [...data];
      const index = oldData.tableData.id;
      console.log(updatedData[index]);
      updatedData[index] = response.data.obj;
      console.log(response.data);
      setData(updatedData);
      // console.log("this"+ updatedData)
    } catch (error) {
      console.error("Error updating row:", error);
    }
  };

  const deleteRow = async (oldData) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/v1/delete-rows/${oldData._id}`,
        {
          data: { userId: "65b0d15dac0c178e5e7ff3a5" },
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
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/get-rows"
        );
        // console.log(response)
        setData(response.data.resp);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const token = localStorage.getItem("token");

    console.log(token);
    axios
      .get("http://localhost:5000/api/v1/verify-token",{
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      } )
      .then(()=>{
        fetchData();
      })
      .catch(()=>{
        navigate("/login")
      });
    fetchData();
  }, []); // Run once on component mount

  return (
    <>
      {/* {console.log(data)} */}
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
    </>
  );
}

export default Table;
