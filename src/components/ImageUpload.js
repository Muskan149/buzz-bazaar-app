import React, { useState } from 'react';
import { FileUploader } from "react-drag-drop-files";
import { supabase } from '../js/supabaseConfig.js'

const fileTypes = ["JPEG", "JPG", "PNG", "GIF"];

const ImageUpload = ({ onPublicURLChange }) => {
  const [URL, setURL] = useState(null);
  const [label, setLabel] = useState("Upload or Drop Image here: ");
  
  const handleChange = async (file) => {
    const { data, error } = await supabase.storage
      .from("images")
      .upload(`./${file.name}`, file)
    if (data) {
      console.log(data);
    } else {
      console.log(error["error"])
      if (!(error["error"] == "Duplicate")) {
        alert('Error uploading image. Please try again.');
      }
    }    

    const { data: publicURL } = supabase
    .storage
    .from("images")
    .getPublicUrl(`./${file.name}`)
    setURL(publicURL.publicUrl)
    console.log(publicURL.publicUrl)
    onPublicURLChange(publicURL.publicUrl); // Pass publicURL back to parent component
    setLabel("Uploaded successfully!")

  }

  const handleDeleteClick = () => {
    setURL(null);
    setLabel("Upload or Drop Image here: ")
  };

  return (
    
  <>
  <div className="image-upload-section">
    <FileUploader
      handleChange={(file) => handleChange(file)}
      name="image"
      label={label}
      hoverTitle="Drop here"
      types={fileTypes}
      children={<div><p>{label}</p></div>}
    />
    {URL && (<button class ="img-delete-button" onClick={handleDeleteClick}>Remove Image</button>)}
  </div>
  
  {URL && <img className="img-preview" src={URL} alt="Uploaded" />}
  
  </>
  );
  }

export default ImageUpload;
