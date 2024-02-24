import axios from "axios";
import { useState } from "react";
import { useContestantsContext } from "../context/ContestantsContext";

export function FileUpload() {
  const { fetchContestants } = useContestantsContext();
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [succes, setSucces] = useState("");
  const handleUpload = async () => {
    setError("");
    setSucces("");

    if (file == null) {
      setError("You must select a file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    console.log(formData.data);

    try {
      await axios.post("http://localhost:3001/upload", formData);
      setSucces("File uploaded succesfully!");
      fetchContestants();
    } catch (err) {
      setError("File upload failed. Please try again.");
      console.log("Upload failed: ", err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className=""
        />
        <button onClick={handleUpload}>Load Data</button>
        {error && <div style={{ color: "red" }}>{error}</div>}
        {succes && <div style={{ color: "green" }}>{succes} </div>}
      </div>
    </div>
  );
}
