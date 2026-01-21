import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AIPanorama from './pages/AIPanorama'
import Prompts101 from './pages/Prompts101'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai-panorama" element={<AIPanorama />} />
        <Route path="/prompts-101" element={<Prompts101 />} />
      </Routes>
    </Router>
  )
}

export default App
