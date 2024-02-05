import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";
const Image = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [url, setUrl] = useState("");
  const [id, setId] = useState("");
  const [image, setImage] = useState("");
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please first select a file");
      return;
    }

    const formData = new FormData();
    formData.append("files", selectedFile);
    console.log(selectedFile);

    try {
      const response = await axios.post(
        "https://osl-sarkar-backend.onrender.com/api/photos",
        formData
      );
      // console.log(response.data.dbData._id);
      setId(response.data.dbData._id);
      if (response.data.dbData._id) {
        toast.success("File uploaded successfully", {
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        // alert("File upload successfully");
      } else {
        toast.error("Invalid File type", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        // alert("Failed to upload the file due to errors");
      }
    } catch (error) {
      console.error("Error while uploading the file:", error);
      // alert("Error occurred while uploading the file");
      toast.error(error, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };
  const { register, handleSubmit, reset } = useForm();
  const getImage = async (data) => {
    const response = await axios.get(
      `https://osl-sarkar-backend.onrender.com/get-image/${data.id}`,
      {}
    );
    setImage(response.data.image.image);
    console.log(Image);
    console.log(response);
  };

  return (
    <div className="p-3 bg-white" style={{ marginTop: "100px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Base64 Generator
      </h2>
      <div className="d-flex justify-content-center">
        <input
          type="file"
          accept=".jpeg, .png, .gif, .jpg"
          onChange={handleFileChange}
        />
        <Button
          onClick={handleUpload}
          style={{
            backgroundColor: "#2E7D32",
            color: "white",
            height: "30px",
            width: "30px",
          }}
        >
          upload
        </Button>
        <ToastContainer />
      </div>
      <div className="text-center p-3">
        <p>{id ? id : <h6>Id will be here after upload!!</h6>}</p>
      </div>
      <div class="d-flex justify-content-center pt-5 mt-3 ">
        <div class="input-group w-50 d-flex  align-items-center">
          <form
            className="w-100 d-flex justify-content-center align-items-center gap-3 "
            onSubmit={handleSubmit((data) => {
              setId("")
              setUrl(JSON.stringify(data));
              getImage(data);
              reset();
            })}
          >
            <input
              type="text"
              style={{
                fontSize: "15px",
                marginTop: "50px",
                height: "30px",
                width: "300px",
                paddingLeft: "10px",
                border: "solid 2px black",
              }}
              className="mb-5 rounded"
              placeholder="Search Image"
              aria-label="Example input"
              aria-describedby="button-addon1"
              {...register("id", { required: true })}
            />
            <Button
              variant="contained"
              type="submit"
              className="rounded"
              style={{
                height: "30px",
                width: "30px",
                marginRight: "10px",
                backgroundColor: "#2E7D32",
                color: "white",
              }}
            >
              Find
            </Button>
          </form>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        {image ? (
          <img
            src={"data:image/png;base64," + image}
            alt="image"
            style={{ height: "300px", width: "600px" }}
          />
        ) : (
          <p style={{ color: "red" }}>No image found</p>
        )}
      </div>
    </div>
  );
};
export default Image;
