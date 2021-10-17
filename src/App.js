import { useState } from "react";
import "./App.css";
function App() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [imgUrl, setImgUrl] = useState([]);

  const readFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
    });
  };
  const handleUpload = async (e) => {
    setSuccess(false);
    if (e.target.files.length > 0) {
      setLoading(true);
      const file = await readFile(e.target.files[0]);

      try {
        const response = await fetch("/.netlify/functions/uploadImage", {
          method: "POST",
          body: file,
        });
        const data = await response.json();
        setLoading(false);
        setSuccess(true);
        setImgUrl(data.url);
        console.log(data.url);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
  };
  return (
    <div className="App">
      <h4>Upload Image to Cloudinary</h4>
      <input id="upload" type="file" onChange={handleUpload} hidden />
      <label className="uploadBtn" htmlFor="upload">
        {loading ? "upoading..." : "Upload Image"}
      </label>
      {success && <img className="imgUrl" src={imgUrl} alt="Uploaded new" />}
    </div>
  );
}
export default App;
