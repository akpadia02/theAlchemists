// import { useState, useEffect } from "react";
// import { saveAs } from "file-saver";
// import { jsPDF } from "jspdf";
// import axios from "axios";

// export default function TextEditor() {
//   const [text, setText] = useState("Loading extracted text...");
//   const [loading, setLoading] = useState(true); // Track loading state

//   // Fetch extracted text from Flask backend
//   useEffect(() => {
//     axios.get("http://localhost:5000/extracted_text")
//       .then(response => {
//         setText(response.data.extracted_text || "No extracted text available.");
//         console.log(text);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error("Error fetching text:", error);
//         setText("Error loading text.");
//         setLoading(false);
//       });
//   }, []);

//   // Save as .txt
//   const saveAsTxt = () => {
//     const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
//     saveAs(blob, "textfile.txt");
//   };

//   // Save as .pdf
//   const saveAsPdf = () => {
//     const doc = new jsPDF();
//     doc.text(text, 10, 10);
//     doc.save("document.pdf");
//   };

//   // Convert to speech
//   const textToSpeech = () => {
//     const synth = window.speechSynthesis;
//     const utterance = new SpeechSynthesisUtterance(text);
//     synth.speak(utterance);
//   };

//   return (
//     <div className="p-4 max-w-lg mx-auto bg-white rounded-lg shadow-md">
//       {loading ? (
//         <p className="text-gray-500">Loading...</p>
//       ) : (
//         <>
//           <textarea
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             rows={6}
//             className="w-full border border-gray-300 rounded-lg p-2"
//           />
//           <div className="flex gap-2 mt-3">
//             <button onClick={saveAsTxt} className="bg-blue-500 text-white px-3 py-1 rounded">Save as TXT</button>
//             <button onClick={saveAsPdf} className="bg-green-500 text-white px-3 py-1 rounded">Save as PDF</button>
//             <button onClick={textToSpeech} className="bg-yellow-500 text-white px-3 py-1 rounded">Text to Speech</button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }



import { useState } from "react";
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";
import axios from "axios";

export default function TextEditor() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // Handle file selection
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Upload file and get extracted text
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setText(response.data.extracted_text || "No text extracted.");
    } catch (error) {
      console.error("Error uploading file:", error);
      setText("Error extracting text.");
    } finally {
      setLoading(false);
    }
  };

  // Save as .txt
  const saveAsTxt = () => {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "textfile.txt");
  };

  // Save as .pdf
  const saveAsPdf = () => {
    const doc = new jsPDF();
    doc.text(text, 10, 10);
    doc.save("document.pdf");
  };

  // Convert to speech
  const textToSpeech = () => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      {/* File Upload */}
      <input type="file" accept="image/*" onChange={handleFileChange} className="mb-3" />
      <button onClick={handleUpload} className="bg-blue-500 text-white px-3 py-1 rounded mb-3">
        Upload & Extract Text
      </button>

      {loading ? (
        <p className="text-gray-500">Processing image...</p>
      ) : (
        <>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={6}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
          <div className="flex gap-2 mt-3">
            <button onClick={saveAsTxt} className="bg-blue-500 text-white px-3 py-1 rounded">Save as TXT</button>
            <button onClick={saveAsPdf} className="bg-green-500 text-white px-3 py-1 rounded">Save as PDF</button>
            <button onClick={textToSpeech} className="bg-yellow-500 text-white px-3 py-1 rounded">Text to Speech</button>
          </div>
        </>
      )}
    </div>
  );
}
