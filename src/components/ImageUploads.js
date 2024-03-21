import React, { useState } from 'react';
import { FileUploader } from "react-drag-drop-files";
import { supabase } from '../js/supabaseConfig.js'

const fileTypes = ["JPEG", "JPG", "PNG", "GIF"];

const ImageUploads = ({ onURLListChange }) => {
    
  const handleChange = async (files) => {
    let urlList = [];
    console.log(files)
    for (const file of files) {
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
        console.log(publicURL.publicUrl)
        urlList.push(publicURL.publicUrl)
    };
    console.log(urlList)
    onURLListChange(urlList)
   }

  return (
    <FileUploader
    handleChange={(files) => handleChange(files)}
    name="image"
    types={fileTypes}
    multiple={true}
  />
  );
}

export default ImageUploads;
