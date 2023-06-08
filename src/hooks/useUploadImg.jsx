import { useState } from "react";

const imageToken = import.meta.env.VITE_IMAGEAPI;

const useUploadImg = () => {
  const [imageURL, setImageURL] = useState(null);

  const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${imageToken}`;

  const imageUpload = (img) => {
    const formData = new FormData();
    formData.append("image", img);
    fetch(imageHostingUrl, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setImageURL(data.data.display_url);
        }
      });
  };

  return [imageUpload, imageURL];
};

export default useUploadImg;
