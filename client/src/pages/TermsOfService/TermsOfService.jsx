import React from 'react';
import { motion } from 'framer-motion';
import { FaFileContract, FaGavel, FaUserCheck, FaExclamationTriangle, FaHandshake, FaBalanceScale } from 'react-icons/fa';

const TermsOfService = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-green-100 dark:bg-green-900 rounded-full">
              <FaFileContract className="w-12 h-12 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-8">
          
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <FaHandshake className="w-6 h-6 text-blue-600 mr-3" />
              Agreement to Terms
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Welcome to JobBoard! These Terms of Service ("Terms") govern your use of our job board platform 
              and services. By accessing or using our website, you agree to be bound by these Terms. If you 
              do not agree to these Terms, please do not use our services.
            </p>
          </section>

          {/* Service Description */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <FaUserCheck className="w-6 h-6 text-green-600 mr-3" />
              Description of Service
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              JobBoard is an online platform that connects job seekers with employers. Our services include:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-4">
              <li>Job posting and search functionality</li>
              <li>Candidate profile creation and management</li>
              <li>Application submission and tracking</li>
              <li>Interview scheduling and management</li>
              <li>Communication tools between employers and candidates</li>
              <li>Resume building and template services</li>
            </ul>
          </section>

          {/* User Accounts */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <FaUserCheck className="w-6 h-6 text-purple-600 mr-3" />
              User Accounts and Registration
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Account Creation</h3>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1 ml-4">
                  <li>You must provide accurate and complete information during registration</li>
                  <li>You are responsible for maintaining the confidentiality of your account</li>
                  <li>You must be at least 16 years old to create an account</li>
                  <li>One person or entity may not maintain multiple accounts</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Account Responsibilities</h3>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1 ml-4">
                  <li>Keep your login credentials secure and confidential</li>
                  <li>Notify us immediately of any unauthorized use of your account</li>
                  <li>Update your information when it changes</li>
                  <li>You are responsible for all activities under your account</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Acceptable Use */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <FaExclamationTriangle className="w-6 h-6 text-orange-600 mr-3" />
              Acceptable Use Policy
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              You agree to use our services only for lawful purposes and in accordance with these Terms. You agree NOT to:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-4">
              <li>Post false, misleading, or fraudulent information</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on intellectual property rights of others</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Use automated tools to scrape or harvest data</li>
              <li>Post discriminatory or offensive content</li>
              <li>Spam or send unsolicited communications</li>
            </ul>
          </section>

          {/* Job Postings */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Job Postings and Applications
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">For Employers</h3>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1 ml-4">
                  <li>Job postings must be for legitimate employment opportunities</li>
                  <li>Provide accurate job descriptions and requirements</li>
                  <li>Comply with equal opportunity employment laws</li>
                  <li>Respond to applications in a timely manner</li>
                  <li>Maintain confidentiality of candidate information</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">For Job Seekers</h3>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1 ml-4">
                  <li>Provide accurate information in your profile and applications</li>
                  <li>Only apply for positions you are genuinely interested in</li>
                  <li>Respect employer communication and interview processes</li>
                  <li>Maintain professional conduct throughout the process</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <FaBalanceScale className="w-6 h-6 text-indigo-600 mr-3" />
              Intellectual Property Rights
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Our Content</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  The JobBoard platform, including its design, functionality, and content, is owned by us and protected 
                  by intellectual property laws. You may not copy, modify, or distribute our content without permission.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Your Content</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  You retain ownership of content you post on our platform. By posting content, you grant us a 
                  non-exclusive license to use, display, and distribute your content in connection with our services.
                </p>
              </div>
            </div>
          </section>

          {/* Privacy and Data */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Privacy and Data Protection
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Your privacy is important to us. Our collection and use of personal information is governed by our 
              Privacy Policy, which is incorporated into these Terms by reference. By using our services, you 
              consent to the collection and use of your information as described in our Privacy Policy.
            </p>
          </section>

          {/* Payment Terms */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Payment Terms
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Premium Services</h3>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1 ml-4">
                  <li>Some features may require payment or subscription</li>
                  <li>All fees are non-refundable unless otherwise stated</li>
                  <li>Prices may change with 30 days notice</li>
                  <li>Payment must be made through approved methods</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Billing</h3>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1 ml-4">
                  <li>Subscriptions automatically renew unless cancelled</li>
                  <li>You can cancel your subscription at any time</li>
                  <li>Refunds are provided according to our refund policy</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <FaGavel className="w-6 h-6 text-red-600 mr-3" />
              Termination
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Termination by You</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  You may terminate your account at any time by contacting us or using the account deletion feature 
                  in your profile settings.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Termination by Us</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We may suspend or terminate your account if you violate these Terms, engage in fraudulent activity, 
                  or for any other reason at our discretion. We will provide notice when reasonably possible.
                </p>
              </div>
            </div>
          </section>

          {/* Disclaimers */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Disclaimers and Limitations
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Service Availability</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We strive to maintain service availability but cannot guarantee uninterrupted access. We may 
                  perform maintenance, updates, or experience technical issues that temporarily affect service.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Third-Party Content</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our platform may contain links to third-party websites or content. We are not responsible for 
                  the content, privacy practices, or terms of service of third-party sites.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Limitation of Liability</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, 
                  special, or consequential damages arising from your use of our services.
                </p>
              </div>
            </div>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Governing Law and Disputes
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              These Terms are governed by the laws of [Your Jurisdiction]. Any disputes arising from these Terms 
              or your use of our services will be resolved through binding arbitration or in the courts of 
              [Your Jurisdiction]. We encourage users to contact us first to resolve any issues amicably.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Changes to Terms
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We may update these Terms from time to time to reflect changes in our services or legal requirements. 
              We will notify users of material changes by email or through our platform. Your continued use of our 
              services after changes become effective constitutes acceptance of the updated Terms.
            </p>
          </section>

          {/* Contact Information */}
          <section className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Contact Information
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="space-y-2 text-gray-600 dark:text-gray-300">
              <p><strong>Email:</strong> legal@jobboard.com</p>
              <p><strong>Address:</strong> 123 Job Street, Tech City, TC 12345</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
};

export default TermsOfService;
