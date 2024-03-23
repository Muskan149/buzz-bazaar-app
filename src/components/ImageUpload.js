// import React, { useState } from 'react';
// import { FileUploader } from "react-drag-drop-files";
// import { supabase } from '../js/supabaseConfig.js'

// const fileTypes = ["JPEG", "JPG", "PNG", "GIF"];

// const ImageUpload = ({ onPublicURLChange }) => {
//   // const [URL, setURL] = useState(null);

//   const handleChange = async (file) => {
//     const { data, error } = await supabase.storage
//       .from("images")
//       .upload(`./${file.name}`, file)
//     if (data) {
//       console.log(data);
//     } else {
//       console.log(error["error"])
//       if (!(error["error"] == "Duplicate")) {
//         alert('Error uploading image. Please try again.');
//       }
//     }    

//     const { data: publicURL } = supabase
//     .storage
//     .from("images")
//     .getPublicUrl(`./${file.name}`)
//     // setURL(publicURL.publicUrl)
//     console.log(publicURL.publicUrl)
//     onPublicURLChange(publicURL.publicUrl); // Pass publicURL back to parent component
//   }

//   const handleDeleteClick = () => {
//     console.log("delete")
//     };

//   return (
//   <>
//   <div className="image-upload-section">
//     <FileUploader
//       handleChange={(file) => handleChange(file)}
//       name="image"
//       hoverTitle="Drop here"
//       types={fileTypes}
//     />
//     {/* {(<button class ="img-delete-button" onClick={handleDeleteClick}>Remove Image</button>)} */}
//   </div>
//   {/* {URL && <img className="img-preview" src={URL} alt="Uploaded" />} */}
//   </>
//   );
//   }

// export default ImageUpload;

import React, { useState } from 'react';
import { FileUploader } from "react-drag-drop-files";
import { supabase } from '../js/supabaseConfig.js'

const fileTypes = ["JPEG", "JPG", "PNG", "GIF"];

const ImageUpload = ({ onPublicURLChange }) => {
  const [URL, setURL] = useState(null);
  
  const handleChange = async (file) => {
    console.log("file change detected")
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
    setURL(publicURL.publicUrl)
    onPublicURLChange(publicURL.publicUrl); // Pass publicURL back to parent component
  }

    const handleDeleteClick = () => {
      setURL(null)
    };

  return (
    <>
    <div className="image-upload-section">
    <FileUploader
    handleChange={(file) => handleChange(file)}
    name="image"
    types={fileTypes}
    />
    {URL && ( <button class ="img-delete-button" onClick={handleDeleteClick}>Delete Images</button>)}
    </div>
    <div className="image-carousel">
    {URL && <img className="img-preview" src={URL} alt="Uploaded" />}
    </div>
  </>
    
  );
  }

export default ImageUpload;