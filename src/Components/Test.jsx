import React, { useState } from "react";
import axios from "axios";

const Test = () => {
  const [email, setEmail] = useState("");
  const [imageData, setImageData] = useState(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageData(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: email,
      imageData: imageData,
    };

    console.log("Data to be sent:", data);

    try {
      const response = await axios.post(
        "http://localhost:8332/loanapp/uploadimage",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Upload successful:", response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
      console.error( error);
      alert("Error uploading image:");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>
      <div>
        <label>Upload Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Test;
