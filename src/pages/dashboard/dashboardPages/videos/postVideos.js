import axios from "axios";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Quill from "quill";
import ImageUploader from "quill-image-uploader";
import "quill-image-uploader/dist/quill.imageUploader.min.css";

const PostVideo = () => {
  const [title, setTitle] = useState("");
  const [LinkURL, setLinkURL] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const uploadThumbnail = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "fzjlnas0"); // Replace with your upload preset
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dzofo9uh0/image/upload`, // Replace with your Cloudinary ID
      {
        method: "POST",
        body: data,
      }
    );
    const imageData = await response.json();
    return imageData.url;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !LinkURL.trim() || !thumbnailFile) {
      alert("All fields are required!");
      return;
    }

    try {
      const uploadedThumbnailUrl = await uploadThumbnail(thumbnailFile);
      setThumbnailUrl(uploadedThumbnailUrl);
      const response = await axios.post("http://localhost:8000/api/video/post", {
        title: title,
        LinkURL: LinkURL,
        thumbnail: uploadedThumbnailUrl,
      });

      console.log(response.data.data);
    } catch (error) {
      console.error("Error submitting blog post:", error);
    }
  };
  return (
    <div className="PostVideo">
      <h1>Post Blog</h1>
      <form onSubmit={handleSubmit} className="blog-post-form">
        <div>
          <label htmlFor="thumbnail">Thumbnail:</label>
          <input
            type="file"
            id="thumbnail"
            onChange={handleFileChange}
            required
          />
          {thumbnailPreview && (
            <img src={thumbnailPreview} alt="Thumbnail Preview" width="200" />
          )}
        </div>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="LinkURL">LinkURL:</label>
          <input
            type="text"
            id="LinkURL"
            value={LinkURL}
            onChange={(e) => setLinkURL(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PostVideo;
