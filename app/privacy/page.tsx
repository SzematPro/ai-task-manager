import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - AI Task Manager',
  description: 'Privacy Policy for AI Task Manager Demo Application',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Privacy Policy
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
                This is a demonstration application. By using this service, you acknowledge that this is a demo version with limited functionality and data retention policies.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              1. Information We Collect
            </h2>
            
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mt-6 mb-3">
              1.1 Personal Information
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Google account information (name, email) for authentication purposes</li>
              <li>Task data you create and manage within the application</li>
              <li>Usage analytics and performance data (via Vercel Analytics)</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-900 dark:text-white mt-6 mb-3">
              1.2 Technical Information
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>IP address and browser information</li>
              <li>Device and operating system information</li>
              <li>Application usage patterns and performance metrics</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              2. How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>To provide and maintain the AI Task Manager service</li>
              <li>To process your tasks using AI analysis (OpenAI GPT-4)</li>
              <li>To authenticate and secure your account</li>
              <li>To improve application performance and user experience</li>
              <li>To generate anonymous usage statistics</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              3. Data Storage and Security
            </h2>
            
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mt-6 mb-3">
              3.1 Data Storage
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>User data is stored in Supabase (PostgreSQL database)</li>
              <li>Data is protected by Row Level Security (RLS) policies</li>
              <li>Each user can only access their own data</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-900 dark:text-white mt-6 mb-3">
              3.2 Security Measures
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>HTTPS encryption for all data transmission</li>
              <li>Google OAuth for secure authentication</li>
              <li>Database-level security with RLS policies</li>
              <li>Regular security updates and monitoring</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              4. Third-Party Services
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              This application uses the following third-party services:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li><strong>Supabase:</strong> Database and authentication services</li>
              <li><strong>OpenAI:</strong> AI processing for task analysis</li>
              <li><strong>Google:</strong> OAuth authentication provider</li>
              <li><strong>Vercel:</strong> Hosting and analytics services</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              5. Data Retention
            </h2>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
              <p className="text-blue-700 dark:text-blue-300">
                <strong>Demo Limitation:</strong> As this is a demonstration application, data retention policies may be limited. We reserve the right to delete data at any time without notice.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              6. Your Rights
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Access your personal data</li>
              <li>Request data deletion</li>
              <li>Withdraw consent for data processing</li>
              <li>Export your task data</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              7. Demo Application Disclaimers
            </h2>
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
              <ul className="list-disc pl-6 space-y-2 text-red-700 dark:text-red-300">
                <li>This is a demonstration application and may not be suitable for production use</li>
                <li>Data may be deleted without notice</li>
                <li>Features and functionality may change or be removed at any time</li>
                <li>No guarantee of data security or availability</li>
                <li>Use at your own risk</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              8. Changes to This Policy
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              9. Contact Information
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <a 
                href={`mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'support@example.com'}?subject=Privacy Policy Inquiry`}
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
                This Privacy Policy is provided under the MIT License. By using this application, you acknowledge that you have read and understood this Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
