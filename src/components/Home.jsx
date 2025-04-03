import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { UploadCloud } from "lucide-react";

const UploadOCRCard = () => {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
  }, []);

  const handleCancel = () => {
    setFiles([]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 15 * 1024 * 1024,
  });

  return (
    <div className="relative flex flex-col items-center justify-center w-full max-w-2xl p-6 bg-white rounded-xl shadow-lg border border-gray-300 mx-auto mt-32">
      <h1 className="text-xl font-semibold text-gray-800 text-center">Smart OCR: Handwritten Text Recognition</h1>
      <p className="text-gray-600 text-sm mb-4 text-center">
        Upload an image containing handwritten text, and our AI-powered system will extract and convert it into a digital format.
      </p>
      <div
        {...getRootProps()}
        className="relative flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-400 bg-gray-100 rounded-lg cursor-pointer hover:border-blue-500 transition p-4"
      >
        <input {...getInputProps()} />
        <UploadCloud size={40} className="text-blue-500 mb-2" />
        {isDragActive ? (
          <p className="text-gray-700">Drop the file here...</p>
        ) : (
          <p className="text-gray-600">Click to upload or drag and drop</p>
        )}
        <p className="text-gray-500 text-xs mt-1">Max. File Size: 15MB</p>
      </div>
      {files.length > 0 && (
        <div className="mt-4 w-full text-center">
          <h2 className="text-gray-700 text-sm font-medium">Uploaded File:</h2>
          <ul className="text-gray-600 text-sm">
            {files.map((file) => (
              <li key={file.name}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex gap-4 mt-4">
        <button onClick={handleCancel} className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md">Cancel</button>
        <button className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">Upload</button>
      </div>
    </div>
  );
};

export default UploadOCRCard;
