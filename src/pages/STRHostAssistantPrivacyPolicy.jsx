import React from 'react';

const STRHostAssistantPrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-blue-400 font-medium">
            STR Host Assistant
          </p>
          <p className="text-slate-400 mt-2">
            Last Updated: December 1, 2025
          </p>
        </header>

        {/* Content */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 md:p-12 shadow-xl">
          
          {/* Overview */}
          <Section title="Overview">
            <p>
              STR Host Assistant ("the Extension") is a browser extension designed to help short-term rental hosts manage their guest communications more effectively. This privacy policy explains how the Extension handles your data.
            </p>
          </Section>

          {/* Our Commitment */}
          <Section title="Our Commitment">
            <div className="bg-green-900/30 border border-green-700 rounded-lg p-4 mb-4">
              <p className="text-green-300 font-semibold">
                We do not collect, transmit, store, or sell any of your personal data.
              </p>
            </div>
            <p>
              The Extension operates entirely locally in your browser and only sends data to third-party AI services that YOU choose and configure.
            </p>
          </Section>

          {/* What Data Does the Extension Access */}
          <Section title="What Data Does the Extension Access?">
            <p className="mb-4">
              The Extension accesses the following data solely within your browser:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-slate-300">
              <li>
                <strong className="text-white">Message Content:</strong> Text from your conversations with guests on short-term rental platforms
              </li>
              <li>
                <strong className="text-white">Guest Information:</strong> Names, booking details, and reservation information visible on the platform
              </li>
              <li>
                <strong className="text-white">API Keys:</strong> Your personal API keys for AI services (OpenAI or Anthropic Claude)
              </li>
            </ol>
          </Section>

          {/* How Is Your Data Used */}
          <Section title="How Is Your Data Used?">
            <SubSection title="Local Storage Only">
              <ul className="list-disc list-inside space-y-2 text-slate-300">
                <li>
                  <strong className="text-white">Conversation Analysis:</strong> Saved analysis results are stored locally in your browser using Chrome's storage API
                </li>
                <li>
                  <strong className="text-white">Extension Settings:</strong> Your preferences (AI provider, model selection, language settings) are stored locally
                </li>
                <li>
                  <strong className="text-white">API Keys:</strong> Stored securely in your browser's local storage; never transmitted to our servers
                </li>
              </ul>
            </SubSection>

            <SubSection title="Third-Party API Calls">
              <p className="mb-4">When you use AI analysis features, the Extension sends message content to:</p>
              <ul className="list-disc list-inside space-y-2 text-slate-300 mb-4">
                <li><strong className="text-white">OpenAI</strong> (if you select OpenAI as your provider)</li>
                <li><strong className="text-white">Anthropic</strong> (if you select Claude as your provider)</li>
              </ul>
              
              <div className="bg-amber-900/30 border border-amber-700 rounded-lg p-4">
                <p className="text-amber-300 font-semibold mb-2">Important Notes:</p>
                <ul className="list-disc list-inside space-y-1 text-amber-200/80 text-sm">
                  <li>These API calls are made directly from your browser using YOUR API keys</li>
                  <li>We do not intercept, store, or access this data</li>
                  <li>The data handling is subject to the respective AI provider's privacy policy:
                    <ul className="ml-6 mt-1 space-y-1">
                      <li>
                        <a href="https://openai.com/policies/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">
                          OpenAI Privacy Policy
                        </a>
                      </li>
                      <li>
                        <a href="https://www.anthropic.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">
                          Anthropic Privacy Policy
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </SubSection>
          </Section>

          {/* What Data Do We Collect */}
          <Section title="What Data Do We Collect?">
            <div className="bg-green-900/30 border border-green-700 rounded-lg p-4 mb-4">
              <p className="text-green-300 font-semibold">None.</p>
            </div>
            <p className="mb-4">
              We do not have any servers, databases, or analytics that collect your data. The Extension:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-300">
              <li>Does not track your usage</li>
              <li>Does not collect analytics</li>
              <li>Does not send data to our servers (we don't have any)</li>
              <li>Does not use cookies or tracking mechanisms</li>
            </ul>
          </Section>

          {/* Data Storage Location */}
          <Section title="Data Storage Location">
            <p className="mb-4">All data remains in your browser:</p>
            <ul className="list-disc list-inside space-y-2 text-slate-300">
              <li>
                <strong className="text-white">Chrome Local Storage:</strong> Settings, API keys, and saved conversation analyses
              </li>
              <li>
                <strong className="text-white">Clipboard:</strong> Temporarily when you copy conversation text
              </li>
              <li>
                <strong className="text-white">No Cloud Sync:</strong> Data is not synchronized across devices
              </li>
            </ul>
          </Section>

          {/* Third-Party Services */}
          <Section title="Third-Party Services">
            <p className="mb-4">The Extension interfaces with the following third-party services at your discretion:</p>
            
            <SubSection title="AI Providers (User-Configured)">
              <div className="space-y-4">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">1. OpenAI</h4>
                  <ul className="list-disc list-inside space-y-1 text-slate-300 text-sm">
                    <li>Used when you select OpenAI as your AI provider</li>
                    <li>Requires your personal API key</li>
                    <li>Data handling: Subject to OpenAI's terms and privacy policy</li>
                  </ul>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">2. Anthropic (Claude)</h4>
                  <ul className="list-disc list-inside space-y-1 text-slate-300 text-sm">
                    <li>Used when you select Anthropic Claude as your AI provider</li>
                    <li>Requires your personal API key</li>
                    <li>Data handling: Subject to Anthropic's terms and privacy policy</li>
                  </ul>
                </div>
              </div>
            </SubSection>

            <SubSection title="Short-Term Rental Platforms">
              <p className="mb-4">The Extension operates on short-term rental platform websites (such as hosting dashboards) to:</p>
              <ul className="list-disc list-inside space-y-2 text-slate-300 mb-4">
                <li>Read message content that is already displayed on your screen</li>
                <li>Extract booking and guest information visible in the interface</li>
                <li>Insert AI-generated responses into message input fields</li>
              </ul>
              <div className="bg-slate-700/50 rounded-lg p-4">
                <p className="text-white font-semibold mb-2">We do not:</p>
                <ul className="list-disc list-inside space-y-1 text-slate-300 text-sm">
                  <li>Log into these platforms on your behalf</li>
                  <li>Access data not already visible to you</li>
                  <li>Store or transmit platform credentials</li>
                </ul>
              </div>
            </SubSection>
          </Section>

          {/* Your Control Over Data */}
          <Section title="Your Control Over Data">
            <p className="mb-4">You have complete control over your data:</p>
            
            <SubSection title="What You Can Do">
              <ul className="list-disc list-inside space-y-2 text-slate-300">
                <li><strong className="text-white">Delete Saved Analyses:</strong> Clear individual conversation analyses from the extension panel</li>
                <li><strong className="text-white">Clear All Data:</strong> Remove all stored data via Chrome's extension settings</li>
                <li><strong className="text-white">Disable AI Features:</strong> Use only the conversation reading features without AI</li>
                <li><strong className="text-white">Remove the Extension:</strong> Uninstalling removes all locally stored data</li>
                <li><strong className="text-white">Manage API Keys:</strong> Change or remove API keys at any time</li>
              </ul>
            </SubSection>

            <SubSection title="How to Delete Your Data">
              <ol className="list-decimal list-inside space-y-3 text-slate-300">
                <li>
                  <strong className="text-white">Individual Conversations:</strong> Clear analysis by switching conversations or clicking clear buttons in the panel
                </li>
                <li>
                  <strong className="text-white">All Extension Data:</strong>
                  <ul className="ml-6 mt-2 list-disc list-inside space-y-1 text-sm">
                    <li>Open Chrome: <code className="bg-slate-700 px-2 py-0.5 rounded text-blue-300">chrome://extensions/</code></li>
                    <li>Find "STR Host Assistant"</li>
                    <li>Click "Remove" to delete the extension and all its data</li>
                  </ul>
                </li>
                <li>
                  <strong className="text-white">API Keys Only:</strong> Open extension options and clear the API key fields
                </li>
              </ol>
            </SubSection>
          </Section>

          {/* Data Security */}
          <Section title="Data Security">
            <SubSection title="Security Measures">
              <ul className="list-disc list-inside space-y-2 text-slate-300">
                <li>API keys are stored in Chrome's secure local storage</li>
                <li>No data transmission to third parties except your chosen AI provider</li>
                <li>All API calls use HTTPS encryption</li>
                <li>No authentication or server-side storage means no data breach risk</li>
              </ul>
            </SubSection>

            <SubSection title="Your Responsibility">
              <ul className="list-disc list-inside space-y-2 text-slate-300">
                <li>Keep your API keys confidential</li>
                <li>Use strong API key management practices</li>
                <li>Review and understand your AI provider's security policies</li>
                <li>Regularly rotate your API keys per provider recommendations</li>
              </ul>
            </SubSection>
          </Section>

          {/* Children's Privacy */}
          <Section title="Children's Privacy">
            <p>
              The Extension is not intended for use by individuals under 18 years of age. We do not knowingly collect data from children. If you are under 18, please do not use this Extension.
            </p>
          </Section>

          {/* Changes to This Policy */}
          <Section title="Changes to This Policy">
            <p>
              We may update this privacy policy to reflect changes in the Extension's functionality or legal requirements. Updates will be posted with a new "Last Updated" date. Continued use of the Extension after changes indicates acceptance of the updated policy.
            </p>
          </Section>

          {/* Data Retention */}
          <Section title="Data Retention">
            <SubSection title="Local Data">
              <ul className="list-disc list-inside space-y-2 text-slate-300">
                <li>Conversation analyses: Retained until you manually clear them or uninstall the extension</li>
                <li>Settings and API keys: Retained until you change or remove them</li>
                <li>No automatic expiration or cleanup (you have full control)</li>
              </ul>
            </SubSection>

            <SubSection title="Third-Party Data">
              <p className="mb-2">Data sent to AI providers is subject to their retention policies:</p>
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                <li>OpenAI: Refer to their data retention policy</li>
                <li>Anthropic: Refer to their data retention policy</li>
              </ul>
            </SubSection>
          </Section>

          {/* Legal Basis for Processing (GDPR) */}
          <Section title="Legal Basis for Processing (GDPR Compliance)">
            <p className="mb-4">For users in the European Economic Area (EEA):</p>
            <ul className="list-disc list-inside space-y-2 text-slate-300">
              <li><strong className="text-white">Legal Basis:</strong> Consent and legitimate interests</li>
              <li><strong className="text-white">Your Rights:</strong> Access, rectification, erasure, restriction, portability, and objection</li>
              <li><strong className="text-white">Data Controller:</strong> You are the controller of your data; we are not a data processor</li>
              <li><strong className="text-white">Contact:</strong> Since we don't collect data, you control all data via the extension interface</li>
            </ul>
          </Section>

          {/* California Privacy Rights (CCPA) */}
          <Section title="California Privacy Rights (CCPA)">
            <p className="mb-4">For California residents:</p>
            <ul className="list-disc list-inside space-y-2 text-slate-300">
              <li>We do not sell personal information</li>
              <li>We do not collect personal information beyond what's stored locally in your browser</li>
              <li>You have the right to delete local data at any time via browser controls</li>
            </ul>
          </Section>

          {/* International Data Transfers */}
          <Section title="International Data Transfers">
            <p className="mb-4">When you use AI features, your data may be transferred to:</p>
            <ul className="list-disc list-inside space-y-2 text-slate-300">
              <li>OpenAI (United States)</li>
              <li>Anthropic (United States)</li>
            </ul>
            <p className="mt-4 text-slate-400 text-sm">
              These transfers occur only when YOU initiate AI analysis and are subject to the respective provider's international data transfer policies.
            </p>
          </Section>

          {/* Contact Information */}
          <Section title="Contact Information">
            <p className="mb-4">Since this Extension does not collect or transmit data to us, and operates entirely locally:</p>
            <ul className="list-disc list-inside space-y-2 text-slate-300">
              <li><strong className="text-white">For technical support:</strong> Create an issue on the GitHub repository</li>
              <li><strong className="text-white">For privacy concerns about AI providers:</strong> Contact OpenAI or Anthropic directly</li>
              <li><strong className="text-white">For general questions:</strong> Use the support channels provided with the extension</li>
            </ul>
          </Section>

          {/* Third-Party Links and Services */}
          <Section title="Third-Party Links and Services">
            <p>
              This privacy policy applies only to the Extension itself. When you use third-party services (AI providers, rental platforms), their respective privacy policies apply to data you share with them.
            </p>
          </Section>

          {/* Consent */}
          <Section title="Consent">
            <p className="mb-4">By installing and using STR Host Assistant, you consent to:</p>
            <ol className="list-decimal list-inside space-y-2 text-slate-300">
              <li>The Extension accessing message and booking data visible on rental platform pages</li>
              <li>Your chosen AI provider receiving message content when you use AI features (subject to your configuration)</li>
              <li>Local storage of settings and analysis results in your browser</li>
            </ol>
            <p className="mt-4 text-slate-400">
              You can withdraw consent at any time by uninstalling the Extension.
            </p>
          </Section>

          {/* Disclaimer */}
          <Section title="Disclaimer">
            <div className="bg-slate-700/50 rounded-lg p-4">
              <p className="mb-4">The Extension is provided "as is" without warranties. We are not responsible for:</p>
              <ul className="list-disc list-inside space-y-2 text-slate-300">
                <li>How third-party AI providers handle your data</li>
                <li>Changes to rental platform interfaces that may affect functionality</li>
                <li>Accuracy of AI-generated analysis or responses</li>
                <li>Any decisions you make based on the Extension's suggestions</li>
              </ul>
            </div>
          </Section>

          {/* Summary */}
          <div className="mt-12 pt-8 border-t border-slate-600">
            <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-6">
              <h2 className="text-xl font-bold text-blue-300 mb-3">Summary</h2>
              <p className="text-slate-300">
                STR Host Assistant is designed with privacy in mind. We don't collect your data because we don't have servers or analytics. Everything happens locally in your browser, and you control when data is sent to AI providers using your own API keys.
              </p>
              <p className="text-slate-400 mt-4 text-sm">
                For questions or concerns, please contact us via the support channels provided with the extension.
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} STR Host Assistant. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

// Section component for consistent styling
const Section = ({ title, children }) => (
  <section className="mb-10">
    <h2 className="text-2xl font-bold text-white mb-4 pb-2 border-b border-slate-600">
      {title}
    </h2>
    <div className="text-slate-300 leading-relaxed">
      {children}
    </div>
  </section>
);

// SubSection component for nested sections
const SubSection = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="text-lg font-semibold text-blue-300 mb-3">
      {title}
    </h3>
    <div className="text-slate-300">
      {children}
    </div>
  </div>
);

export default STRHostAssistantPrivacyPolicy;
