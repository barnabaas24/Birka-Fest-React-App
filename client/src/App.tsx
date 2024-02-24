import { Routes, Route } from "react-router-dom";
import { Contestants } from "./pages/Contestants";
import { Scan } from "./pages/Scan";
import { FileUpload } from "./pages/FileUpload";
import ContestantsContextProvider from "./context/ContestantsContext";
import "./print.css"; // Import the print stylesheet
import "./index.css";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="pt-16 bg-gray-600 min-h-screen app-print">
        <ContestantsContextProvider>
          <Routes>
            <Route path="/upload" element={<FileUpload />} />
            <Route path="/" element={<Contestants />} />
            <Route path="/scan" element={<Scan />} />
          </Routes>
        </ContestantsContextProvider>
      </div>
    </>
  );
}

export default App;
