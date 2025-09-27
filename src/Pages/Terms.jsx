import Header_top from '../components/Header_top.jsx';
import Header_sticky from '../components/Header_sticky.jsx';
import './Home.css';
import Fhero from '../components/Footer.jsx';
import { useEffect } from 'react';

const Trio = () => {
  useEffect(() => {
    document.title = "Sonora - Terms and Conditions";
  }, []);

  return (
    <>
      <div className="min-h-screen bg-black flex flex-col items-center relative overflow-hidden">
        <div className="relative z-10 w-full">
          <Header_top/>
          <Header_sticky/>
          <div className='flex justify-center items-center h-full m-[15vh]'>
            <div className='w-full h-auto bg-black py-12 px-4 sm:px-6 lg:px-8 text-gray-300'>
              <div className="max-w-4xl mx-auto font-roboto tracking-wider text-md">
                
                <div className="mb-8">
                  <p className="text-gray-400 italic">
                    This is the International website of Sonora AG.
                    Visitors from the U.S., please visit our U.S. website www.sonorausa.com.
                  </p>
                </div>

                <div className="mb-12">
                  <h1 className="text-3xl text-white mb-6">Terms and Conditions</h1>
                  <p className="text-gray-400 mb-4">
                    Last updated: November 2024
                  </p>
                </div>

                <div className="mb-12 border-t border-gray-700 pt-8">
                  <h2 className="text-xl text-white mb-4">1. Acceptance of Terms</h2>
                  <p className="text-gray-400">
                    By accessing or using any services provided by Sonora AG ("We", "Us", or "Our"), you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our services.
                  </p>
                </div>

                <div className="mb-12 border-t border-gray-700 pt-8">
                  <h2 className="text-xl text-white mb-4">2. Account Registration</h2>
                  <p className="text-gray-400 mb-4">
                    a. To access certain features, you must register for an account. You agree to:
                  </p>
                  <ul className="text-gray-400 list-disc pl-6 mb-4">
                    <li>Provide accurate and complete information</li>
                    <li>Maintain the security of your credentials</li>
                    <li>Accept all risks of unauthorized access</li>
                  </ul>
                  <p className="text-gray-400">
                    b. We reserve the right to suspend or terminate accounts that violate these terms or engage in fraudulent activity.
                  </p>
                </div>

                <div className="mb-12 border-t border-gray-700 pt-8">
                  <h2 className="text-xl text-white mb-4">3. Intellectual Property</h2>
                  <p className="text-gray-400 mb-2">
                    All content on our platforms, including:
                  </p>
                  <ul className="text-gray-400 list-disc pl-6 mb-4">
                    <li>Text, graphics, and logos</li>
                    <li>Software and documentation</li>
                    <li>Vehicle designs and configurations</li>
                  </ul>
                  <p className="text-gray-400">
                    are the exclusive property of Sonora AG or its licensors and protected under international copyright laws.
                  </p>
                </div>

                <div className="mb-12 border-t border-gray-700 pt-8">
                  <h2 className="text-xl text-white mb-4">4. User Conduct</h2>
                  <p className="text-gray-400 mb-2">You agree not to:</p>
                  <ul className="text-gray-400 list-disc pl-6 mb-4">
                    <li>Reverse engineer or decompile any software</li>
                    <li>Use automated systems to extract data</li>
                    <li>Post unlawful or harmful content</li>
                    <li>Impersonate any person or entity</li>
                  </ul>
                  <p className="text-gray-400">
                    Violations may result in immediate termination of your access.
                  </p>
                </div>

                <div className="mb-12 border-t border-gray-700 pt-8">
                  <h2 className="text-xl text-white mb-4">5. Purchases and Orders</h2>
                  <p className="text-gray-400 mb-4">
                    a. Vehicle configurations on our website do not constitute offers but invitations to negotiate. All orders are subject to:
                  </p>
                  <ul className="text-gray-400 list-disc pl-6 mb-4">
                    <li>Final dealer confirmation</li>
                    <li>Vehicle availability</li>
                    <li>Credit approval (if applicable)</li>
                  </ul>
                  <p className="text-gray-400">
                    b. Pricing and specifications may change without notice.
                  </p>
                </div>

                <div className="mb-12 border-t border-gray-700 pt-8">
                  <h2 className="text-xl text-white mb-4">6. Limitation of Liability</h2>
                  <p className="text-gray-400 mb-4">
                    Sonora AG shall not be liable for:
                  </p>
                  <ul className="text-gray-400 list-disc pl-6 mb-4">
                    <li>Indirect or consequential damages</li>
                    <li>Inaccuracies in technical data</li>
                    <li>Third-party service interruptions</li>
                  </ul>
                  <p className="text-gray-400">
                    Our total liability shall not exceed the amount paid by you (if any) for accessing our services.
                  </p>
                </div>

                <div className="mb-12 border-t border-gray-700 pt-8">
                  <h2 className="text-xl text-white mb-4">7. Dispute Resolution</h2>
                  <p className="text-gray-400 mb-2">
                    a. Governing Law: These terms shall be governed by German law.
                  </p>
                  <p className="text-gray-400 mb-2">
                    b. Arbitration: Disputes shall be resolved through binding arbitration in Stuttgart, Germany.
                  </p>
                  <p className="text-gray-400">
                    c. Class Action Waiver: Claims must be brought individually, not as class actions.
                  </p>
                </div>

                <div className="mb-12 border-t border-gray-700 pt-8">
                  <h2 className="text-xl text-white mb-4">8. Modifications</h2>
                  <p className="text-gray-400">
                    We reserve the right to modify these terms at any time. Continued use after changes constitutes acceptance. Material changes will be notified via email or website notice.
                  </p>
                </div>

                <div className="mb-12 border-t border-gray-700 pt-8">
                  <h2 className="text-xl text-white mb-4">9. Termination</h2>
                  <p className="text-gray-400">
                    We may terminate or suspend your access immediately for violations of these terms. You may terminate your account at any time by contacting customer service.
                  </p>
                </div>

                <div className="border-t border-gray-700 pt-8">
                  <h2 className="text-xl text-white mb-4">10. Contact</h2>
                  <p className="text-gray-400 mb-2">For questions regarding these terms:</p>
                  <p>Sonora AG</p>
                  <p>Sonora Straße 120</p>
                  <p>D-70372 Stuttgart, Germany</p>
                  <p className="mt-2">Email: legal@sonora.com</p>
                  <p className="mt-4 text-gray-400">Phone: +49 711 17-0</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Fhero/>
    </>
  );
};

export default Trio;