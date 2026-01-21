/**
 * PromptAlchemy Component
 * 
 * A self-contained prompt analysis and optimization tool powered by Google Gemini.
 * 
 * Usage:
 * ```jsx
 * import { PromptAlchemy } from './components/PromptAlchemy';
 * 
 * function App() {
 *   return <PromptAlchemy />;
 * }
 * ```
 * 
 * Props:
 * - title (string): Custom title for the header
 * - subtitle (string): Custom description text
 * - showBackground (boolean): Whether to show animated background orbs (default: true)
 * - className (string): Additional CSS classes for the container
 */

export { PromptAlchemy } from './PromptAlchemy';

// Also export sub-components if users want to customize
export { Background } from './components/Background';
export { ApiKeyDialog } from './components/ApiKeyDialog';
export { Notification } from './components/Notification';

// Export service functions for advanced usage
export { analyzeUserPrompt, generateVariations } from './services/geminiService';
