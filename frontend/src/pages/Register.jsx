import React, { useState } from "react";
import api from "../api/axiosInstance"

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const res = await api.post('/register',formData)
      console.log(res);
      
      setFormData({
        name: "",
        email: "",
        password: "",
      });


    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={inputChangeHandler}
          placeholder="enter name"
        />
        <br></br>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={inputChangeHandler}
          placeholder="enter email"
        />
        <br></br>
        <input
          type="text"
          name="password"
          value={formData.password}
          onChange={inputChangeHandler}
          placeholder="enter password"
        />
        <br />
        <button className="btn" style={{ border: "1px solid black" }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
