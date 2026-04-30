import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'

// The landing page is the LCP-critical root route, so it ships in the
// initial bundle. Everything else is split off into its own chunk and
// fetched on demand — keeps the first paint on `/` fast.
//
// The previous homepage (positioned around custom AI software + an
// application form) lives at /old-site. It's lazy-loaded since it's
// only useful for archive/reference traffic now.
const OldLanding = lazy(() => import('./pages/OldLanding'))
const Home = lazy(() => import('./pages/Home'))
const AIPanorama = lazy(() => import('./pages/AIPanorama'))
const Prompts101 = lazy(() => import('./pages/Prompts101'))
const PromptAlchemyPage = lazy(() => import('./pages/PromptAlchemyPage'))
const CustomInstructions = lazy(() => import('./pages/CustomInstructions'))
const STRHostAssistantPrivacyPolicy = lazy(() =>
  import('./pages/STRHostAssistantPrivacyPolicy')
)
const Admin = lazy(() => import('./pages/Admin'))

// Visually inert fallback — avoids a layout flash while the chunk loads.
// React will swap it for the real page as soon as the JS arrives.
const RouteFallback = () => <div style={{ minHeight: '100vh' }} aria-busy="true" />

function App() {
  return (
    <Router>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          {/* Landing page at the root — eager-loaded for fast LCP */}
          <Route path="/" element={<Landing />} />

          {/* Previous homepage, kept accessible for reference */}
          <Route path="/old-site" element={<OldLanding />} />

          {/* Presentify routes — lazy-loaded */}
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

          {/* Standalone privacy policy — lazy-loaded */}
          <Route path="/str-host-assistant/privacy-policy" element={<STRHostAssistantPrivacyPolicy />} />

          {/* Admin dashboard — gated behind Firebase Auth + Firestore rules */}
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
