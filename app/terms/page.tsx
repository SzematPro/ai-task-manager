import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service - AI Task Manager',
  description: 'Terms of Service for AI Task Manager Demo Application',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Terms of Service
          </h1>
          
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-8">
              <h2 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                ⚠️ Demo Application Notice
              </h2>
              <p className="text-yellow-700 dark:text-yellow-300">
                This is a demonstration application. By accessing or using this service, you acknowledge and agree that this is a demo version with inherent limitations and risks.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              By accessing and using the AI Task Manager ("Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              2. Description of Service
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              AI Task Manager is a demonstration application that provides:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Natural language task processing using AI</li>
              <li>Task management and organization features</li>
              <li>Multilingual support for task input</li>
              <li>Google OAuth authentication</li>
              <li>Cloud-based data storage</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              3. Demo Application Limitations
            </h2>
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-3">
                Important Limitations
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-red-700 dark:text-red-300">
                <li><strong>No Warranty:</strong> This service is provided "as is" without any warranties</li>
                <li><strong>Data Loss Risk:</strong> Data may be deleted without notice</li>
                <li><strong>Service Interruption:</strong> Service may be unavailable at any time</li>
                <li><strong>Feature Changes:</strong> Features may be modified or removed without notice</li>
                <li><strong>No Support:</strong> Limited or no technical support available</li>
                <li><strong>Task Limits:</strong> Demo version may have usage limitations</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              4. User Responsibilities
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              You agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Use the service only for lawful purposes</li>
              <li>Not attempt to gain unauthorized access to the system</li>
              <li>Not use the service to transmit harmful or malicious content</li>
              <li>Respect the intellectual property rights of others</li>
              <li>Not use the service for commercial purposes without permission</li>
              <li>Accept all risks associated with using a demo application</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              5. Intellectual Property
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              This application is provided under the MIT License. The source code is available for public use, modification, and distribution in accordance with the MIT License terms.
            </p>
            
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mt-6 mb-3">
              5.1 MIT License Summary
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Permission is granted to use, copy, modify, and distribute the software</li>
              <li>No warranty or liability is provided</li>
              <li>Users must include the original copyright notice</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              6. Disclaimers and Limitations of Liability
            </h2>
            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-orange-800 dark:text-orange-200 mb-3">
                No Liability for Demo Application
              </h3>
              <p className="text-orange-700 dark:text-orange-300 mb-3">
                <strong>THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND.</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1 text-orange-700 dark:text-orange-300">
                <li>We disclaim all warranties, express or implied</li>
                <li>We are not liable for any damages arising from use of this demo</li>
                <li>We are not responsible for data loss or service interruptions</li>
                <li>We make no guarantees about service availability or performance</li>
                <li>Use of this demo is at your own risk</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              7. Privacy and Data
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service. By using the service, you consent to the collection and use of information as described in the Privacy Policy.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              8. Third-Party Services
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              This service integrates with third-party services including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li><strong>Supabase:</strong> Database and authentication services</li>
              <li><strong>OpenAI:</strong> AI processing services</li>
              <li><strong>Google:</strong> OAuth authentication</li>
              <li><strong>Vercel:</strong> Hosting and analytics</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              Your use of these third-party services is subject to their respective terms of service and privacy policies.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              9. Termination
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We may terminate or suspend your access to the service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              10. Changes to Terms
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              11. Governing Law
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              These Terms shall be interpreted and governed by the laws of the jurisdiction in which the service provider operates, without regard to its conflict of law provisions.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              12. Contact Information
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              If you have any questions about these Terms of Service, please contact us at{' '}
              <a 
                href={`mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'support@example.com'}?subject=Terms of Service Inquiry`}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                {process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'support@example.com'}
              </a>{' '}
              or visit our{' '}
              <a 
                href="https://github.com/SzematPro/ai-task-manager"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                GitHub repository
              </a>
              .
            </p>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                These Terms of Service are provided under the MIT License. By using this application, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
