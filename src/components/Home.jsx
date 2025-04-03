import { useState } from "react";

const Home = () => {
  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Smart OCR: Handwritten Text Recognition</h1>
      <p className="text-gray-600 text-center text-2xl max-w-4xl mb-6 mt-9">
        Convert handwritten text from images into digital format with high accuracy. Our AI-powered OCR tool
        supports multiple handwriting styles, enabling easy text editing and exporting.
      </p>
      
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Upload Image</h2>
        <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg text-center cursor-pointer">
          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="fileInput" />
          <label htmlFor="fileInput" className="block text-blue-500 cursor-pointer">
            Click to upload or drag and drop
          </label>
          <p className="text-gray-500 text-sm">Max. File Size: 15MB</p>
        </div>
        {image && <img src={image} alt="Uploaded" className="mt-4 w-full rounded-lg" />}
        <div className="flex justify-between mt-4">
          <button className="bg-gray-300 px-4 py-2 rounded-lg">Cancel</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Upload</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
