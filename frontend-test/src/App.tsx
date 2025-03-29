import { Route, Routes } from "react-router-dom"
import VideoUpload from "./VideoUpload"

function App() {
  return (
    <>
      <Routes>
        <Route path="/upload" element={<VideoUpload />} />
      </Routes>
    </>
  )
}

export default App
