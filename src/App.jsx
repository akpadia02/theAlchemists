import { useState } from 'react'
import './App.css'
import './index.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import TaskEditor from './components/TextEditor'
import TextEditor from './components/TextEditor'
import SmartOCR from './components/JaiShreeRam'

function App() {
  const [extractedText, setExtractedText] = useState("");

  return (
    <div className="p-6">
      <Navbar />
      {/* <Home setExtractedText={setExtractedText} />
      {extractedText && <TextEditor extractedText={extractedText} />} */}
      <SmartOCR />
    </div>
  );
}

export default App
