"use client"
import React, { useState } from "react";
import Compressor from "compressorjs";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { postsPath } from "@app/data/imageSizes"

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


  const compressFile = async (file) => {

    const compressedFilesArray = [];
    
    const sizes = [40, 120, 360, 800, 1200, 1600]; 
    for (let i = 0; i < postsPath.length ; i++) {
      const compressedFile = await new Promise((innerResolve, innerReject) => {
        new Compressor(file, {
          quality: 0.9,
          maxWidth: sizes[i],
          maxHeight: sizes[i],
          checkOrientation: false,
          success: innerResolve,
          error: innerReject,
        });
      });

      console.log(compressedFile);
      compressedFilesArray.push(compressedFile);
    };
    
    return(compressedFilesArray);
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

        console.log("originalFile");
        
        const blob = await compressFile(originalFile);
        console.log('blob', blob)

        try {
          const formData = new FormData();
          blob.forEach((file, i) => formData.append(`file${i}`, file));


          console.log(formData);

          const { data } = await axios.post("/api/upload", formData);
          console.log(data);
        } catch (error) {
          console.log('eee',error.response?.data);
        }

        console.log('test')
      } catch (error) {
        console.log("Compress error", error);
        toast.success(error.message);
      } finally {
        console.log("Compress complete");
      }
    }

  };

  return (
    <div>
      <h1>{JSON.stringify(postsPath?.lengh)}</h1>
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
