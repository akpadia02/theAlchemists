// import { useCallback, useState } from "react";
// import { useDropzone } from "react-dropzone";
// import { UploadCloud } from "lucide-react";
// import { saveAs } from "file-saver";
// import { jsPDF } from "jspdf";
// import axios from "axios";

// const SmartOCR = () => {
//   const [files, setFiles] = useState([]);
//   const [text, setText] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const onDrop = useCallback((acceptedFiles) => {
//     setFiles(acceptedFiles);
//     setText("");
//     setError("");
//   }, []);

//   const handleCancel = () => {
//     setFiles([]);
//     setText("");
//     setError("");
//   };

//   const handleUpload = async () => {
//     if (files.length === 0) return;
//     setLoading(true);
//     setText("");
//     setError("");
//     const formData = new FormData();
//     formData.append("file", files[0]);
//     try {
//       const response = await axios.post("http://localhost:5000/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setText(response.data.extracted_text || "No text extracted.");
//     } catch (err) {
//       setError("Error processing image. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const saveAsTxt = () => {
//     const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
//     saveAs(blob, "textfile.txt");
//   };

//   const saveAsPdf = () => {
//     const doc = new jsPDF();
//     doc.text(text, 10, 10);
//     doc.save("document.pdf");
//   };

//   const textToSpeech = () => {
//     const synth = window.speechSynthesis;
//     const utterance = new SpeechSynthesisUtterance(text);
//     synth.speak(utterance);
//   };

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: "image/*",
//     maxSize: 15 * 1024 * 1024,
//   });

//   return (
//     <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-lg border border-gray-300 mt-10">
//       <h1 className="text-xl font-semibold text-gray-800 text-center">Smart OCR: Handwritten Text Recognition</h1>
//       <p className="text-gray-600 text-sm text-center mb-4">Upload an image to extract and convert handwritten text into a digital format.</p>
//       <div {...getRootProps()} className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-400 bg-gray-100 rounded-lg cursor-pointer hover:border-blue-500 transition p-4">
//         <input {...getInputProps()} />
//         <UploadCloud size={40} className="text-blue-500 mb-2" />
//         {isDragActive ? <p className="text-gray-700">Drop the file here...</p> : <p className="text-gray-600">Click to upload or drag and drop</p>}
//         <p className="text-gray-500 text-xs mt-1">Max. File Size: 15MB</p>
//       </div>
//       {files.length > 0 && <p className="text-gray-600 text-sm text-center mt-3">Uploaded File: {files[0].name}</p>}
//       <div className="flex gap-4 mt-4 justify-center">
//         <button onClick={handleCancel} className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md">Cancel</button>
//         <button onClick={handleUpload} disabled={loading} className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">{loading ? "Processing..." : "Upload & Extract"}</button>
//       </div>
//       {text && (
//         <>
//           <textarea value={text} onChange={(e) => setText(e.target.value)} rows={6} className="w-full border border-gray-300 rounded-lg p-2 mt-4" />
//           <div className="flex gap-2 mt-3 justify-center">
//             <button onClick={saveAsTxt} className="bg-blue-500 text-white px-3 py-1 rounded">Save as TXT</button>
//             <button onClick={saveAsPdf} className="bg-green-500 text-white px-3 py-1 rounded">Save as PDF</button>
//             <button onClick={textToSpeech} className="bg-yellow-500 text-white px-3 py-1 rounded">Text to Speech</button>
//           </div>
//         </>
//       )}
//       {error && <p className="text-red-500 text-sm text-center mt-3">{error}</p>}
//     </div>
//   );
// };

// export default SmartOCR;


import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";
import axios from "axios";

const SmartOCR = () => {
  const [files, setFiles] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
    setText("");
    setError("");
  }, []);

  const handleCancel = () => {
    setFiles([]);
    setText("");
    setError("");
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    setLoading(true);
    setText("");
    setError("");
    const formData = new FormData();
    formData.append("file", files[0]);
    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setText(response.data.extracted_text || "No text extracted.");
    } catch (err) {
      setError("Error processing image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const saveAsTxt = () => {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "textfile.txt");
  };

  const saveAsPdf = () => {
    const doc = new jsPDF();
    doc.text(text, 10, 10);
    doc.save("document.pdf");
  };

  const textToSpeech = () => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 15 * 1024 * 1024,
  });

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-lg border border-gray-300 mt-32">
      <h1 className="text-xl font-semibold text-gray-800 text-center">Smart OCR: Handwritten Text Recognition</h1>
      <p className="text-gray-600 text-sm text-center mb-4">Upload an image to extract and convert handwritten text into a digital format.</p>
      <div {...getRootProps()} className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-400 bg-gray-100 rounded-lg cursor-pointer hover:border-blue-500 transition p-4">
        <input {...getInputProps()} />
        <UploadCloud size={40} className="text-blue-500 mb-2" />
        {isDragActive ? <p className="text-gray-700">Drop the file here...</p> : <p className="text-gray-600">Click to upload or drag and drop</p>}
        <p className="text-gray-500 text-xs mt-1">Max. File Size: 15MB</p>
      </div>
      {files.length > 0 && (
        <div className="mt-4 text-center">
          <h2 className="text-gray-700 text-sm font-medium">Uploaded File:</h2>
          <img
            src={URL.createObjectURL(files[0])}
            alt={files[0].name}
            className="mt-2 max-w-full h-auto rounded-md shadow-md"
          />
          <p className="text-gray-600 text-sm mt-2">{files[0].name}</p>
        </div>
      )}
      <div className="flex gap-4 mt-4 justify-center">
        <button onClick={handleCancel} className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md">Cancel</button>
        <button onClick={handleUpload} disabled={loading} className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">{loading ? "Processing..." : "Upload & Extract"}</button>
      </div>
      {text && (
        <>
          <textarea value={text} onChange={(e) => setText(e.target.value)} rows={6} className="w-full border border-gray-300 rounded-lg p-2 mt-4" />
          <div className="flex gap-2 mt-3 justify-center">
            <button onClick={saveAsTxt} className="bg-blue-500 text-white px-3 py-1 rounded">Save as TXT</button>
            <button onClick={saveAsPdf} className="bg-green-500 text-white px-3 py-1 rounded">Save as PDF</button>
            <button onClick={textToSpeech} className="bg-yellow-500 text-white px-3 py-1 rounded">Text to Speech</button>
          </div>
        </>
      )}
      {error && <p className="text-red-500 text-sm text-center mt-3">{error}</p>}
    </div>
  );
};

export default SmartOCR;
