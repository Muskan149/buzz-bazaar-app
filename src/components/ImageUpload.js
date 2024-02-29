import React, { useState } from 'react';
import { FileUploader } from "react-drag-drop-files";
import { supabase } from '../js/supabaseConfig.js'

const fileTypes = ["JPEG", "JPG", "PNG", "GIF"];

const ImageUpload = ({ onPublicURLChange }) => {
  const [file, setFile] = useState(null);

  const handleChange = async (file) => {
    const { data, error } = await supabase.storage
      .from("images")
      .upload(`./${file.name}`, file)
    if (data) {
      console.log(data);
    } else {
      console.log(error);
      alert('Error uploading image. Please try again.');
    }    

    const { data: publicURL } = supabase
    .storage
    .from("images")
    .getPublicUrl(`./${file.name}`)
    
    console.log(publicURL.publicUrl)
    onPublicURLChange(publicURL.publicUrl); // Pass publicURL back to parent component
}

  return (
    <FileUploader
    handleChange={(file) => handleChange(file)}
    name="image"
    types={fileTypes}
    // multiple = {true}
  />
  );
  }

export default ImageUpload;
