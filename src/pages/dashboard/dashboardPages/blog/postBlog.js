import axios from "axios";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Quill from "quill";
import ImageUploader from "quill-image-uploader";
import "quill-image-uploader/dist/quill.imageUploader.min.css";

Quill.register("modules/imageUploader", ImageUploader);

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    ["link", "image"],
    [{ align: [] }],
    ["clean"],
  ],
  imageUploader: {
    upload: async (file) => {
      const NAME_OF_UPLOAD_PRESET = "fzjlnas0";
      const YOUR_CLOUDINARY_ID = "dzofo9uh0";
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", NAME_OF_UPLOAD_PRESET);
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${YOUR_CLOUDINARY_ID}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );
      const img = await res.json();
      return img.url;
    },
  },
};

const PostBlog = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [body, setBody] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [author , setAuthor] = useState("")
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

    if (!title.trim() || !subtitle.trim() || !body.trim() || !thumbnailFile) {
      alert("All fields are required!");
      return;
    }

    try {
      const uploadedThumbnailUrl = await uploadThumbnail(thumbnailFile);
      setThumbnailUrl(uploadedThumbnailUrl);
      
      const response = await axios.post("https://autofinder-backend.vercel.app/api/blog/post", {
        title: title,
        subTitle: subtitle,
        body: body,
        thumbnail: uploadedThumbnailUrl,
        author:author
      });

      if(response.data.ok){
        alert("Blog post created successfully");
        setAuthor("")
        setBody("")
        setThumbnailFile("")
        setSubtitle("")
        setTitle("")
      }
    } catch (error) {
      console.error("Error submitting blog post:", error);
    }
  };

  return (
    <div className="PostBlog">
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
          <label htmlFor="subtitle">Subtitle:</label>
          <input
            type="text"
            id="subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="subtitle">Author:</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="body">Body:</label>
          <ReactQuill
            value={body}
            onChange={setBody}
            theme="snow"
            modules={modules}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PostBlog;
