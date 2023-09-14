"use client"
import React, { useState } from "react";
import Compressor from "compressorjs";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const App = () => {
  
const initialState = {
  testType: "global",
  message: "",
  image: null,
  originalSize: null,
  reducedSize: null,
  files: [],
  image2: null,
  image2ReducedSize: null,
};


const [state, setState] = useState(initialState);

  const [file, setFile] = useState('');
  const [compressedFile, setCompressedFile] = useState(null);


  const compressFile = (file) => {
    return new Promise((resolve, reject) => {
      new Compressor(file, {
        quality: 0.8,
        maxWidth: 800,
        maxHeight: 800,
        checkOrientation: false,
        success: resolve,
        error: reject,
      });
    });
  };

  const onChange = async (event) => {
    const originalFile = event.target.files[0];
    const regex = /^.*base64/;

    if (originalFile && originalFile.type.split("/")[0] !== "image") {
      setState({
        ...initialState,
        message: `The file selected was not an image type and will not be reduced.`,
      });
    } else if (originalFile) {
      try {

        console.log("originalFile", );
        const blob = await [compressFile(originalFile)];
        console.log("Compress blob", blob);

        try {
          const formData = new FormData();
          formData.append("file", blob);
          const { data } = await axios.post("/api/upload", formData);
          console.log(data);
        } catch (error) {
          console.log(error.response?.data);
        }

        const decoded = atob(blob.replace(regex, ""));
        console.log('blob', blob)
        


        setState({
          image: blob,
          originalSize: originalFile.size,
          reducedSize: decoded.length,
        });
        console.log('test')
      } catch (error) {
        console.log("Compress error");
        window.alert(error.message);
      } finally {
        console.log("Compress complete");
      }
    }

  };

  return (
    <div>
      <form encType="multipart/form-data">
      {JSON.stringify(state)}
      <input type="file" onChange={onChange} />
      <button>Compress Image</button>
      {
        compressedFile ? (
          <img src={compressedFile.toString()} />
        ): null
      }

      {compressedFile && <img src={compressedFile} />}
      
      {state.image && (
        <div>
          <img src={URL.createObjectURL(image)} alt="compressed-output" /> {/* Display the compressed image */}
          <p>Original Size: {pretty(originalSize || 0)}</p>
          <p>Reduced Image size: {pretty(reducedSize || 0)}</p>
        </div>
      )}

      </form>
      <Toaster />
    </div>

  );
};

export default App;
