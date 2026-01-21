import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AIPanorama from './pages/AIPanorama'
import Prompts101 from './pages/Prompts101'
import PromptAlchemyPage from './pages/PromptAlchemyPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai-panorama" element={<AIPanorama />} />
        <Route path="/prompts-101" element={<Prompts101 />} />
        <Route path="/prompt-alchemy" element={<PromptAlchemyPage />} />
      </Routes>
    </Router>
  )
}

export default App
