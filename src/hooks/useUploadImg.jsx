import axios from "axios";
import { useState } from "react";

const imageToken = import.meta.env.VITE_IMAGEAPI;

const useUploadImg = () => {
  const [imageURL, setImageURL] = useState("");

  const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${imageToken}`;

  const imageUpload = async (img) => {
    const formData = new FormData();
    formData.append("image", img);

    try {
      const response = await axios.post(imageHostingUrl, formData);

      if (response.status === 200) {
        const data = response.data;
        setImageURL(data.data.display_url);
      } else {
        // Handle error
        console.error("Image upload failed.");
      }
    } catch (error) {
      // Handle error
      console.error("Image upload failed:", error);
    }
  };

  return [imageUpload, imageURL];
};

export default useUploadImg;
