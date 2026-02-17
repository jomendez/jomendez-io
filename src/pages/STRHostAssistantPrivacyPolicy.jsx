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
            Last Updated: February 16, 2026
          </p>
        </header>

        {/* Content */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 md:p-12 shadow-xl">

          {/* Overview */}
          <Section title="Overview">
            <p>
              STR Host Assistant ("the Extension") is a browser extension designed to help short-term rental hosts manage their guest communications more effectively. This privacy policy explains what data the Extension accesses, what is stored locally, what is sent to our servers, and how third-party services are involved.
            </p>
          </Section>

          {/* What Data Does the Extension Access */}
          <Section title="What Data Does the Extension Access?">
            <p className="mb-4">
              The Extension accesses the following data within your browser:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-slate-300">
              <li>
                <strong className="text-white">Message Content:</strong> Text from your conversations with guests on Airbnb
              </li>
              <li>
                <strong className="text-white">Guest and Booking Information:</strong> Names, booking details, and reservation information visible on the platform
              </li>
              <li>
                <strong className="text-white">Calendar Data:</strong> Pricing and availability information visible on the Airbnb multi-calendar page (Premium feature)
              </li>
            </ol>
          </Section>

          {/* Authentication */}
          <Section title="Authentication">
            <p className="mb-4">
              The Extension requires you to sign in with a Google account before use. When you sign in:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-300">
              <li>Your Google email address, display name, and a unique user ID are stored on our server (Firebase Firestore) to manage your account</li>
              <li>Authentication tokens are stored locally in your browser and used to verify your identity on each server request</li>
              <li>We use Google OAuth through Chrome's <code className="bg-slate-700 px-2 py-0.5 rounded text-blue-300">chrome.identity</code> API; we never see or store your Google password</li>
            </ul>
          </Section>

          {/* How Is Your Data Used */}
          <Section title="How Is Your Data Used?">
            <SubSection title="Local Storage (Your Browser)">
              <ul className="list-disc list-inside space-y-2 text-slate-300">
                <li>
                  <strong className="text-white">Extension Settings:</strong> Preferences such as language, tone style, and plan type are stored in <code className="bg-slate-700 px-2 py-0.5 rounded text-blue-300">chrome.storage.sync</code>
                </li>
                <li>
                  <strong className="text-white">API Keys:</strong> Your personal OpenAI API key (free plan only) is stored in <code className="bg-slate-700 px-2 py-0.5 rounded text-blue-300">chrome.storage.sync</code> and never sent to our servers
                </li>
                <li>
                  <strong className="text-white">Conversation State:</strong> Recent analysis results and generated responses are cached locally in <code className="bg-slate-700 px-2 py-0.5 rounded text-blue-300">chrome.storage.local</code> so you can navigate away and return without re-analyzing
                </li>
                <li>
                  <strong className="text-white">Subscription Cache:</strong> Your subscription status is cached locally for up to 5 minutes to reduce server requests
                </li>
              </ul>
            </SubSection>

            <SubSection title="Server-Side Storage (Firebase Firestore)">
              <p className="mb-4">When you use the Extension, the following data is stored on our servers:</p>
              <ul className="list-disc list-inside space-y-2 text-slate-300">
                <li>
                  <strong className="text-white">User Profile:</strong> Email address, display name, account creation date, last login date, and subscription tier
                </li>
                <li>
                  <strong className="text-white">Usage Counters:</strong> A count of how many AI interactions you have used (free tier: lifetime total; premium tier: monthly total). We store the count only, not the content of your conversations
                </li>
                <li>
                  <strong className="text-white">Device Fingerprint:</strong> A hashed identifier derived from non-identifying browser characteristics (screen resolution, language, timezone, hardware specs). This is used solely to enforce per-device usage limits and prevent abuse. The fingerprint is a one-way hash — it cannot be reversed to identify you or your device
                </li>
                <li>
                  <strong className="text-white">Subscription Data:</strong> Your Stripe customer ID, subscription status, and billing period dates
                </li>
              </ul>
            </SubSection>

            <SubSection title="AI Processing">
              <p className="mb-4">
                When you click "Read Conversation" or "Propose Response," conversation text and reservation details are sent to OpenAI for AI processing:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-300 mb-4">
                <li>
                  <strong className="text-white">Free plan:</strong> API calls go directly from your browser to OpenAI using your own API key. Our servers are not involved in the AI processing.
                </li>
                <li>
                  <strong className="text-white">Premium plan:</strong> API calls are routed through our server (Firebase Cloud Functions) to OpenAI using a server-managed API key. Your conversation data passes through our server but is not logged, stored, or retained. It is forwarded to OpenAI and discarded.
                </li>
              </ul>
              <div className="bg-amber-900/30 border border-amber-700 rounded-lg p-4">
                <p className="text-amber-300 text-sm">
                  In both cases, the data handling by OpenAI is subject to their privacy policy:{' '}
                  <a href="https://openai.com/policies/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">
                    https://openai.com/policies/privacy-policy
                  </a>
                </p>
              </div>
            </SubSection>

            <SubSection title="Analytics">
              <p className="mb-4">
                The Extension collects anonymous usage analytics to improve the product. Analytics events include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-300 mb-4">
                <li>Button clicks and feature usage (e.g., "conversation analyzed," "response generated")</li>
                <li>Error events (e.g., API failures, selector errors)</li>
                <li>Non-identifying metadata (e.g., duration of analysis, guest tone detected)</li>
              </ul>
              <div className="bg-green-900/30 border border-green-700 rounded-lg p-4">
                <p className="text-green-300 font-semibold">
                  Analytics events never include conversation content, guest names, booking details, or any personally identifying information. Analytics are sent to Google Analytics via the Chrome runtime messaging API.
                </p>
              </div>
            </SubSection>
          </Section>

          {/* What Data Do We NOT Collect */}
          <Section title="What Data Do We NOT Collect?">
            <ul className="list-disc list-inside space-y-2 text-slate-300">
              <li>We do <strong className="text-white">not</strong> store your conversation text or guest messages on our servers</li>
              <li>We do <strong className="text-white">not</strong> store AI-generated responses on our servers</li>
              <li>We do <strong className="text-white">not</strong> store your OpenAI API key (free plan) on our servers</li>
              <li>We do <strong className="text-white">not</strong> sell, share, or monetize any of your data</li>
              <li>We do <strong className="text-white">not</strong> use cookies or web tracking mechanisms</li>
              <li>We do <strong className="text-white">not</strong> access any Airbnb data beyond what is already visible to you on the page</li>
            </ul>
          </Section>

          {/* Payment Processing */}
          <Section title="Payment Processing">
            <p className="mb-4">
              If you upgrade to Premium, payment is processed by Stripe. We do not handle or store your credit card information. Stripe processes your payment and notifies our server of your subscription status via secure webhooks. We store only your Stripe customer ID and subscription status, not payment details.
            </p>
            <p className="text-slate-400 text-sm">
              Stripe's privacy policy:{' '}
              <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">
                https://stripe.com/privacy
              </a>
            </p>
          </Section>

          {/* Third-Party Services */}
          <Section title="Third-Party Services">
            <p className="mb-4">The Extension interfaces with the following third-party services:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-slate-600">
                    <th className="py-3 pr-4 text-white font-semibold">Service</th>
                    <th className="py-3 pr-4 text-white font-semibold">Purpose</th>
                    <th className="py-3 text-white font-semibold">Data Shared</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  <tr className="border-b border-slate-700">
                    <td className="py-3 pr-4 font-semibold text-white">OpenAI</td>
                    <td className="py-3 pr-4">AI conversation analysis and response generation</td>
                    <td className="py-3">Conversation text, reservation details (only when you click Analyze or Generate)</td>
                  </tr>
                  <tr className="border-b border-slate-700">
                    <td className="py-3 pr-4 font-semibold text-white">Google (Firebase Auth)</td>
                    <td className="py-3 pr-4">User authentication</td>
                    <td className="py-3">Email, display name, user ID</td>
                  </tr>
                  <tr className="border-b border-slate-700">
                    <td className="py-3 pr-4 font-semibold text-white">Google (Firebase Firestore)</td>
                    <td className="py-3 pr-4">Usage tracking and account management</td>
                    <td className="py-3">Usage counts, subscription status, device fingerprint hash</td>
                  </tr>
                  <tr className="border-b border-slate-700">
                    <td className="py-3 pr-4 font-semibold text-white">Google Analytics</td>
                    <td className="py-3 pr-4">Anonymous product analytics</td>
                    <td className="py-3">Non-identifying usage events</td>
                  </tr>
                  <tr className="border-b border-slate-700">
                    <td className="py-3 pr-4 font-semibold text-white">Stripe</td>
                    <td className="py-3 pr-4">Payment processing (Premium only)</td>
                    <td className="py-3">Handled by Stripe directly; we receive only subscription status</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-semibold text-white">Airbnb</td>
                    <td className="py-3 pr-4">Host platform (read-only access to visible page content)</td>
                    <td className="py-3">No data sent to Airbnb by the Extension</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Section>

          {/* Your Control Over Data */}
          <Section title="Your Control Over Data">
            <SubSection title="What You Can Do">
              <ul className="list-disc list-inside space-y-2 text-slate-300">
                <li><strong className="text-white">Sign Out:</strong> Sign out from the extension panel at any time. This clears your local authentication tokens.</li>
                <li><strong className="text-white">Clear Local Data:</strong> Remove all locally stored data via Chrome's extension settings or by uninstalling.</li>
                <li><strong className="text-white">Remove API Key:</strong> Change or remove your OpenAI API key at any time in the extension options.</li>
                <li><strong className="text-white">Cancel Premium:</strong> Manage or cancel your subscription through the Stripe billing portal, accessible from the extension panel.</li>
                <li><strong className="text-white">Uninstall:</strong> Removing the extension deletes all locally stored data.</li>
              </ul>
            </SubSection>

            <SubSection title="How to Delete Your Data">
              <ol className="list-decimal list-inside space-y-3 text-slate-300">
                <li>
                  <strong className="text-white">Local Data:</strong> Uninstall the extension from <code className="bg-slate-700 px-2 py-0.5 rounded text-blue-300">chrome://extensions/</code> — this removes all local storage.
                </li>
                <li>
                  <strong className="text-white">Server Data:</strong> To request deletion of your server-side data (user profile, usage counts, device fingerprint), contact us at the email below. We will delete your data within 30 days.
                </li>
                <li>
                  <strong className="text-white">Stripe Data:</strong> Manage your payment data through the Stripe billing portal or contact Stripe directly.
                </li>
                <li>
                  <strong className="text-white">OpenAI Data:</strong> Data sent to OpenAI is subject to their retention policy. Contact OpenAI for data deletion requests.
                </li>
              </ol>
            </SubSection>
          </Section>

          {/* Data Security */}
          <Section title="Data Security">
            <SubSection title="Security Measures">
              <ul className="list-disc list-inside space-y-2 text-slate-300">
                <li>All server communication uses HTTPS encryption</li>
                <li>Firebase Authentication verifies user identity on every server request</li>
                <li>API keys (free plan) are stored in Chrome's encrypted <code className="bg-slate-700 px-2 py-0.5 rounded text-blue-300">chrome.storage.sync</code> and never leave your browser</li>
                <li>Server-side OpenAI API keys (premium plan) are stored in Firebase Functions config, not in client code</li>
                <li>Device fingerprints are one-way hashed (SHA-256) before transmission</li>
                <li>Firestore security rules restrict users to reading only their own data</li>
                <li>Stripe webhook signatures are verified to prevent spoofing</li>
              </ul>
            </SubSection>

            <SubSection title="Your Responsibility">
              <ul className="list-disc list-inside space-y-2 text-slate-300">
                <li>Keep your OpenAI API key confidential (free plan)</li>
                <li>Use a strong Google account password</li>
                <li>Sign out of the extension on shared computers</li>
                <li>Review and understand OpenAI's and Stripe's security policies</li>
              </ul>
            </SubSection>
          </Section>

          {/* Data Retention */}
          <Section title="Data Retention">
            <SubSection title="Local Data">
              <ul className="list-disc list-inside space-y-2 text-slate-300">
                <li>Conversation analyses and settings: Retained until you clear them or uninstall</li>
                <li>Authentication tokens: Retained until you sign out or they expire</li>
                <li>No automatic expiration — you have full control</li>
              </ul>
            </SubSection>

            <SubSection title="Server-Side Data">
              <ul className="list-disc list-inside space-y-2 text-slate-300">
                <li><strong className="text-white">User profile:</strong> Retained as long as your account exists</li>
                <li><strong className="text-white">Usage counters:</strong> Retained as long as your account exists. Premium monthly counters reset on the 1st of each month.</li>
                <li><strong className="text-white">Device fingerprint:</strong> Retained as long as the associated account exists</li>
                <li><strong className="text-white">Subscription data:</strong> Retained as long as your Stripe subscription record exists</li>
              </ul>
              <p className="mt-4 text-slate-400 text-sm">
                To request deletion of server-side data, contact us (see Contact Information below).
              </p>
            </SubSection>

            <SubSection title="Third-Party Data">
              <ul className="list-disc list-inside space-y-2 text-slate-300">
                <li><strong className="text-white">OpenAI:</strong> Subject to OpenAI's data retention policy</li>
                <li><strong className="text-white">Stripe:</strong> Subject to Stripe's data retention policy</li>
                <li><strong className="text-white">Google Analytics:</strong> Subject to Google's data retention settings (configured for automatic expiration)</li>
              </ul>
            </SubSection>
          </Section>

          {/* Children's Privacy */}
          <Section title="Children's Privacy">
            <p>
              The Extension is not intended for use by individuals under 18 years of age. We do not knowingly collect data from children. If you are under 18, please do not use this Extension.
            </p>
          </Section>

          {/* Legal Basis for Processing (GDPR) */}
          <Section title="Legal Basis for Processing (GDPR Compliance)">
            <p className="mb-4">For users in the European Economic Area (EEA):</p>
            <ul className="list-disc list-inside space-y-2 text-slate-300">
              <li><strong className="text-white">Legal Basis:</strong> Consent (you choose to sign in and use AI features) and legitimate interests (usage tracking to prevent abuse)</li>
              <li><strong className="text-white">Your Rights:</strong> Access, rectification, erasure, restriction, portability, and objection</li>
              <li><strong className="text-white">Data Controller:</strong> Jose Mendez is the data controller for server-side data</li>
              <li><strong className="text-white">Data Processors:</strong> Google (Firebase), OpenAI, and Stripe process data on our behalf</li>
              <li><strong className="text-white">Contact:</strong> See Contact Information below</li>
            </ul>
          </Section>

          {/* California Privacy Rights (CCPA) */}
          <Section title="California Privacy Rights (CCPA)">
            <p className="mb-4">For California residents:</p>
            <ul className="list-disc list-inside space-y-2 text-slate-300">
              <li>We do not sell personal information</li>
              <li>You have the right to know what data we collect (described in this policy)</li>
              <li>You have the right to request deletion of your server-side data</li>
              <li>You have the right to opt out — you may uninstall the extension at any time</li>
            </ul>
          </Section>

          {/* International Data Transfers */}
          <Section title="International Data Transfers">
            <p className="mb-4">Your data may be transferred to and processed in:</p>
            <ul className="list-disc list-inside space-y-2 text-slate-300">
              <li><strong className="text-white">United States:</strong> OpenAI (AI processing), Stripe (payment processing), Google Cloud / Firebase (authentication, storage, analytics)</li>
            </ul>
            <p className="mt-4 text-slate-400 text-sm">
              These transfers occur under the service providers' standard data processing agreements and are subject to their respective international data transfer policies.
            </p>
          </Section>

          {/* Changes to This Policy */}
          <Section title="Changes to This Policy">
            <p>
              We may update this privacy policy to reflect changes in the Extension's functionality or legal requirements. Updates will be posted with a new "Last Updated" date. Continued use of the Extension after changes indicates acceptance of the updated policy.
            </p>
          </Section>

          {/* Contact Information */}
          <Section title="Contact Information">
            <ul className="list-disc list-inside space-y-2 text-slate-300">
              <li>
                <strong className="text-white">For technical support or privacy concerns:</strong> Create an issue at{' '}
                <a href="https://github.com/jomendez/str-host-assistant/issues" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">
                  https://github.com/jomendez/str-host-assistant/issues
                </a>
              </li>
              <li>
                <strong className="text-white">For data deletion requests:</strong>{' '}
                <a href="mailto:strcopilot@gmail.com" className="text-blue-400 hover:text-blue-300 underline">
                  strcopilot@gmail.com
                </a>
              </li>
              <li><strong className="text-white">For privacy concerns about third-party services:</strong> Contact OpenAI, Google, or Stripe directly</li>
            </ul>
          </Section>

          {/* Consent */}
          <Section title="Consent">
            <p className="mb-4">By installing and using STR Host Assistant, you consent to:</p>
            <ol className="list-decimal list-inside space-y-2 text-slate-300">
              <li>The Extension accessing message and booking data visible on Airbnb pages</li>
              <li>Creating an account with your Google credentials on our Firebase server</li>
              <li>Server-side tracking of your usage count and device fingerprint for abuse prevention</li>
              <li>OpenAI receiving conversation content when you use AI features (via your own key or our premium server)</li>
              <li>Anonymous analytics collection to improve the product</li>
              <li>Local storage of settings, analysis results, and authentication data in your browser</li>
            </ol>
            <p className="mt-4 text-slate-400">
              You can withdraw consent at any time by signing out and uninstalling the Extension. To delete server-side data, contact us using the information above.
            </p>
          </Section>

          {/* Disclaimer */}
          <Section title="Disclaimer">
            <div className="bg-slate-700/50 rounded-lg p-4">
              <p className="mb-4">The Extension is provided "as is" without warranties. We are not responsible for:</p>
              <ul className="list-disc list-inside space-y-2 text-slate-300">
                <li>How OpenAI, Google, or Stripe handle your data</li>
                <li>Changes to Airbnb's interface that may affect functionality</li>
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
                STR Host Assistant stores your extension settings and API keys locally in your browser. Server-side, we store your user profile, usage counts, and device fingerprint for account management and abuse prevention. When you use AI features, conversation text is sent to OpenAI for processing (directly on the free plan, through our server on the premium plan) but is never stored on our servers. Anonymous analytics help us improve the product. You can delete all local data by uninstalling and request server-side data deletion by contacting us.
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} STR Host Assistant. All rights reserved.</p>
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
