import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import Home from './pages/Home'
import AIPanorama from './pages/AIPanorama'
import Prompts101 from './pages/Prompts101'
import PromptAlchemyPage from './pages/PromptAlchemyPage'
import CustomInstructions from './pages/CustomInstructions'
import STRHostAssistantPrivacyPolicy from './pages/STRHostAssistantPrivacyPolicy'

function App() {
  return (
    <Router>
      <Routes>
        {/* New landing page at the root */}
        <Route path="/" element={<Landing />} />

        {/* Presentify now lives under /presentify/* */}
        <Route path="/presentify" element={<Home />} />
        <Route path="/presentify/ai-panorama" element={<AIPanorama />} />
        <Route path="/presentify/prompts-101" element={<Prompts101 />} />
        <Route path="/presentify/prompt-alchemy" element={<PromptAlchemyPage />} />
        <Route path="/presentify/custom-instructions" element={<CustomInstructions />} />

        {/* Backwards-compatible redirects from the old flat paths */}
        <Route path="/ai-panorama" element={<Navigate to="/presentify/ai-panorama" replace />} />
        <Route path="/prompts-101" element={<Navigate to="/presentify/prompts-101" replace />} />
        <Route path="/prompt-alchemy" element={<Navigate to="/presentify/prompt-alchemy" replace />} />
        <Route path="/custom-instructions" element={<Navigate to="/presentify/custom-instructions" replace />} />

        {/* Unchanged: the standalone privacy policy page */}
        <Route path="/str-host-assistant/privacy-policy" element={<STRHostAssistantPrivacyPolicy />} />
      </Routes>
    </Router>
  )
}

export default App
