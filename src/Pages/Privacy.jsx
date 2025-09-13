import Header_top from '../components/Header_top.jsx';
import Header_sticky from '../components/Header_sticky.jsx';
import './Home.css';
import Fhero from '../components/Footer.jsx';
import { useEffect } from 'react';
const LoginPage = () => {
  useEffect(() => {
      document.title = "Sonora - Privacy";
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
                  <h2 className="text-2xl text-white mb-4">Privacy statement valid for the website sonora.com</h2>
                  <p className="text-gray-400 mb-4">
                    The controller as per the EU General Data Protection Regulation (GDPR) is:
                  </p>
                  <p className="mb-2">Sonora AG ("We")</p>
                  <p>Sonora Straße 120</p>
                  <p>D-70372 Stuttgart</p>
                  <p>Germany</p>
                  <p className="mt-2">Email: dialog@sonora.com</p>

                  <p className="mt-6 text-gray-400">
                    Joint controllers for the correspondingly marked webpages of the Sonora Community within the EU General Data Protection Regulation (GDPR) are:
                  </p>
                  
                  <div className="mt-4">
                    <p>Sonora AG</p>
                    <p>Sonora Straße 120</p>
                    <p>D-70372 Stuttgart</p>
                    <p>Germany</p>
                    <p className="mt-2">Phone: +49 7 11 17-0</p>
                    <p>E-mail: community_support@sonora.com</p>
                  </div>

                  <div className="mt-4">
                    <p>Sonora Heritage GmbH</p>
                    <p>Sonora Straße 100</p>
                    <p>D-70372 Stuttgart</p>
                    <p>Germany</p>
                    <p className="mt-2">Phone: +49 711-17 30 000</p>
                    <p>E-Mail: classic@sonora.com</p>
                  </div>

                  <p className="mt-6 text-gray-400">
                    The specific privacy statement for the Sonora Community can be found on this page.
                  </p>

                  <p className="mt-4">Data protection officer:</p>
                  <p>Sonora Group entities:</p>
                  <p>Sonora Group AG</p>
                  <p>Chief Officer Corporate Data Protection</p>
                  <p>HPC W079</p>
                  <p>70546 Stuttgart</p>
                  <p>Email: data.protection@sonora.com</p>
                </div>

                <div className="mb-12 border-t border-gray-700 pt-8">
                  <h2 className="text-xl text-white mb-4">1. Data protection</h2>
                  <p className="text-gray-400">
                    We appreciate you visiting our website and your interest in the products we offer. Protecting your personal data is very important to us. In this Privacy Policy, we explain how we collect your personal information, what we do with it, for what purposes and on what legal foundation we do so, and what rights you have on that basis. We will also refer you to Sonora's Data Protection Policy: 
                  </p>
                  <p className="text-gray-400 mt-2">
                    Sonora Data Protection Policy
                  </p>
                  <p className="text-gray-400 mt-2">
                    Our Privacy Statement on the use of our websites and the Sonora Data Protection Policy do not apply to your activities on the websites of social networks or other providers that can be accessed using the links on our websites. Please read the data protection provisions on the websites of those providers.
                  </p>
                </div>

                <div className="mb-12 border-t border-gray-700 pt-8">
                  <h2 className="text-xl text-white mb-4">2. Collecting and processing your personal data</h2>
                  <p className="text-gray-400 mb-2">a.</p>
                  <p className="text-gray-400">
                    Whenever you visit our websites, we store certain information about the browser and operating system you are using; the date and time of your visit; the status of the interaction (e.g. whether you were able to access the website or received an error message); the usage of features on the website; any search phrases you entered; how often you visit individual websites; the names of the files you access; the amount of data transferred; the Web page from which you accessed our website; and the Web page you visited after visiting our website, whether by clicking links on our websites or entering a domain directly into the input field of the same tab (or window) of the browser in which you have our websites open. In addition, we store your IP address and the name of your Internet service provider for seven days. This is for security reasons; in particular, to prevent and detect attacks on our websites or attempts at fraud.
                  </p>
                  
                  <p className="text-gray-400 mt-4 mb-2">b.</p>
                  <p className="text-gray-400">
                    We only process other personal data if you provide this data, e.g. as part of a registration, contact form, chat, survey, price competition or for the execution of a contract, and even in these cases only insofar as this is permitted to us on the basis of a consent given by you or in accordance with the applicable legal provisions (see section 7).
                  </p>
                  
                  <p className="text-gray-400 mt-4 mb-2">c.</p>
                  <p className="text-gray-400">
                    You are neither legally nor contractually obligated to share your personal information. However, certain features of our websites may depend on the sharing or personal information. If you do not provide your personal information in such cases, you may not be able to use those features, or they may be available with limited functionality.
                  </p>
                </div>

                <div className="mb-12 border-t border-gray-700 pt-8">
                  <h2 className="text-xl text-white mb-4">3. Purposes of use</h2>
                  <p className="text-gray-400 mb-2">a.</p>
                  <p className="text-gray-400">
                    We use the personal information collected during your visit to any of our websites to make using them as convenient as possible for you and to protect our IT systems against attacks and other unlawful activities.
                  </p>
                  
                  <p className="text-gray-400 mt-4 mb-2">b.</p>
                  <p className="text-gray-400">
                    If you share additional information with us – for example, by filling out a registration form, contact form, chat, survey, contest entry or to execute a contract with you – we will use that information for the designated purposes, purposes of customer management and – if required – for purposes of processing and billing and business transactions within the required scope in each instance.
                  </p>
                  
                  <p className="text-gray-400 mt-4 mb-2">c.</p>
                  <p className="text-gray-400">
                    For other purposes (e.g. display of personalized content or advertising based on your usage behaviour), we and, if applicable, selected third parties, use your personal data if and to the extent you give your consent through our consent management system. You will find further information and decision-making options under "Settings" in the footer at the bottom of the website.
                  </p>
                  
                  <p className="text-gray-400 mt-4 mb-2">d.</p>
                  <p className="text-gray-400">
                    In addition, we use personal data to the extent that we are legally obliged to do so (e.g., storage for the fulfilment of commercial or tax-related retention obligations, release in accordance with official or judicial orders, e.g. to a law enforcement authority).
                  </p>
                </div>

                <div className="mb-12 border-t border-gray-700 pt-8">
                  <h2 className="text-xl text-white mb-4">4. Transfer of Personal Information to Third Parties; Social Plugins; Use of Service Providers</h2>
                  <p className="text-gray-400 mb-2">a.</p>
                  <p className="text-gray-400">
                    Our websites may also contain an offer of third parties. If you click on such an offer, we transfer data to the respective provider to the required extent (e.g. information that you have found this offer with us and, if applicable, further information that you have already provided on our websites for this purpose).
                  </p>
                  
                  <p className="text-gray-400 mt-4 mb-2">b.</p>
                  <p className="text-gray-400">
                    When we use social plug-ins on our websites from social networks such as Facebook and Twitter, we integrate them as follows:
                  </p>
                  <p className="text-gray-400 mt-2">
                    When you visit our websites, the social plug-ins are deactivated, i.e. no data is transmitted to the operators of these networks. If you want to use one of the networks, click on the respective social plug-in to establish a direct connection to the server of the respective network.
                  </p>
                  <p className="text-gray-400 mt-2">
                    If you have a user account on the network and are logged in when you activate the social plug-in, the network can associate your visit to our websites with your user account. If you want to avoid this, please log out of the network before activating the social plug-in. A social network cannot associate a visit to other Sonora websites until you have activated an existing social plug-in.
                  </p>
                  <p className="text-gray-400 mt-2">
                    When you activate a social plug-in, the network transfers the content that becomes available directly to your browser, which integrates it into our websites. In this situation, data transmissions can also take place that are initiated and controlled by the respective social network. Your connection to a social network, the data transfers taking place between the network and your system, and your interactions on that platform are governed solely by the privacy policies of that network.
                  </p>
                  <p className="text-gray-400 mt-2">
                    The social plug-in remains active until you deactivate it or delete your cookies (see section 5.d).
                  </p>
                  
                  <p className="text-gray-400 mt-4 mb-2">c.</p>
                  <p className="text-gray-400">
                    If you click on the link to an offer or activate a social plug-in, personal data may reach providers in countries outside the European Economic Area that, from the point of view of the European Union ("EU"), may not guarantee an "adequate level of protection" for the processing of personal data in accordance with EU standards. Please remember this fact before clicking on a link or activating a social plug-in and thereby triggering a transfer of your data.
                  </p>
                  <p className="text-gray-400 mt-2">
                    We also use qualified service providers (e.g., IT service providers, marketing agencies) to operate, optimize and secure our websites. We only pass on personal data to the latter insofar as this is necessary for the provision and use of the website and its functionalities, for the pursuit of legitimate interests, to comply with legal obligations, or insofar as you have consented there to (see section 7). You will find more information regarding recipients of personal data in our consent management system under "Settings" in the footer at the bottom of the website.
                  </p>
                </div>

                <div className="mb-12 border-t border-gray-700 pt-8">
                  <h2 className="text-xl text-white mb-4">5. Cookies</h2>
                  <p className="text-gray-400 mb-2">a.</p>
                  <p className="text-gray-400">
                    Cookies may be used when you are visiting our websites. Technically, these are so-called HTML cookies and similar software tools such as Web/DOM Storage or Local Shared Objects (so-called "Flash cookies"), which we collectively refer to as cookies.
                  </p>
                  
                  <p className="text-gray-400 mt-4 mb-2">b.</p>
                  <p className="text-gray-400">
                    Cookies are small files that are stored, and later read out, on your desktop, notebook or mobile device while you visit a website. Cookies make it possible, for example, to determine whether there has already been a connection between the device and the websites; take into account your preferred language or other settings, offer you certain certain functions (e.g. online shop, vehicle configurator) or recognize your usage-based interests. Cookies may also contain personal data.
                  </p>
                  
                  <p className="text-gray-400 mt-4 mb-2">c.</p>
                  <p className="text-gray-400">
                    Whether and which cookies are used when you visit our websites depends on which areas and functions of our websites you use and whether you agree to the use of cookies that are not strictly, typically for technical reasons, required in our Consent Management System. You will find further information and decision-making options under "Settings" in the footer at the bottom of the website.
                  </p>
                  
                  <p className="text-gray-400 mt-4 mb-2">d.</p>
                  <p className="text-gray-400">
                    The use of cookies also depends on the settings of the web browser you are using (e.g., Microsoft Edge, Google Chrome, Apple Safari, Mozilla Firefox). Most web browsers are preset to automatically accept certain types of cookies; however, you can usually change this setting. You can delete stored cookies at any time. Web/DOM storage and local shared objects can be deleted separately. You can find out how this works in the browser or device you are using in the manual of the learner.
                  </p>
                  
                  <p className="text-gray-400 mt-4 mb-2">e.</p>
                  <p className="text-gray-400">
                    The consent to, and rejection or deletion of, cookies are tied to the device and also to the respective web browser you use. If you use multiple devices or web browsers, you can make decisions or settings differently.
                  </p>
                  
                  <p className="text-gray-400 mt-4 mb-2">f.</p>
                  <p className="text-gray-400">
                    If you decide against the use of cookies or delete them, you may not have access to all functions of our websites or individual functions may be limited.
                  </p>
                </div>

                <div className="mb-12 border-t border-gray-700 pt-8">
                  <h2 className="text-xl text-white mb-4">6. Security</h2>
                  <p className="text-gray-400">
                    We take technical and organizational security measures in order to protect your information managed by us from being tampered with, lost, destroyed or accessed by authorized individuals. We are continuously improving our security measures in line with technological advancements.
                  </p>
                </div>

                <div className="mb-12 border-t border-gray-700 pt-8">
                  <h2 className="text-xl text-white mb-4">7. Legal Foundations for Data Processing</h2>
                  <p className="text-gray-400 mb-2">a.</p>
                  <p className="text-gray-400">
                    If you have given us your consent to process your personal information, then that is the legal foundation for processing it (Art. 6, para. 1, letter a, of the EU's General Data Protection Regulation, or GDPR).
                  </p>
                  
                  <p className="text-gray-400 mt-4 mb-2">b.</p>
                  <p className="text-gray-400">
                    Art. 6, para. 1, letter b, of the GDPR is the legal basis for processing personal information for the purpose of entering into a contract or performing a contract with you.
                  </p>
                  
                  <p className="text-gray-400 mt-4 mb-2">c.</p>
                  <p className="text-gray-400">
                    If processing your personal information is required to fulfill our legal obligations (e.g. data retention), we are authorized to do so by Art. 6, para. 1, letter c, of the GDPR.
                  </p>
                  
                  <p className="text-gray-400 mt-4 mb-2">d.</p>
                  <p className="text-gray-400">
                    Furthermore, we process personal information for purposes of protecting our legitimate interests as well as the interests of third parties in accordance with Art. 6, para. 1, letter f of the GDPR. Examples of such legitimate interests include maintaining the functionality of our IT systems as well as the (direct) marketing of our products and services (to the extent not covered by your consent) and those of third parties and the legally required documentation of business contacts. As part of the consideration of interests required in each case, we take into account various aspects, in particular the type of personal information, the purpose of processing, the circumstances of processing and your interest in the confidentiality of your personal information.
                  </p>
                  
                  <p className="text-gray-400 mt-4 mb-2">e.</p>
                  <p className="text-gray-400">
                    The storage and reading of cookies in accordance with Section 5.c. is based on § 25 TDDDG (in Germany) or § 165 Abs. 3 TKG (in Austria).
                  </p>
                </div>

                <div className="mb-12 border-t border-gray-700 pt-8">
                  <h2 className="text-xl text-white mb-4">8. Deleting your personal data</h2>
                  <p className="text-gray-400">
                    Your IP address and the name of your Internet service provider, which we store for security reasons, are deleted after seven days. Moreover, we delete your personal information as soon as the purpose for which it was collected and processed has been fulfilled. Beyond this time period, data storage only takes place to the extent made necessary by the legislation, regulations or other legal provisions to which we are subject in the EU or by legal provisions in third-party countries if these have an appropriate level of data protection. Should it not be possible to delete data in individual cases, the relevant personal data are flagged to restrict their further processing.
                  </p>
                </div>

                <div className="mb-12 border-t border-gray-700 pt-8">
                  <h2 className="text-xl text-white mb-4">9. Rights of the Data Subject</h2>
                  <p className="text-gray-400 mb-2">a.</p>
                  <p className="text-gray-400">
                    As a data subject affected by data processing, you have the right to information (Section 15 GDPR), Correction (Section 16 GDPR), Deletion (Section 17 GDPR), Restricted processing (Section18 GDPR) and Data Transferability (Section 20 GDPR).
                  </p>
                  
                  <p className="text-gray-400 mt-4 mb-2">b.</p>
                  <p className="text-gray-400">
                    If you have consented to the processing of your personal information by us, you have the right to revoke your consent at any time. Your revocation does not affect the legality of the processing of your personal information that took place before your consent was revoked. It also has no effect on the continued processing of the information on another legal basis, such as to fulfill legal obligations (see section titled "Legal Foundation of Processing").
                  </p>
                  
                  <p className="text-gray-400 mt-4 mb-2">c.</p>
                  <p className="text-gray-400">
                    Right to object
                  </p>
                  <p className="text-gray-400 mt-2">
                    For reasons relating to your particular situation, you have the right to file an objection at any time to the processing of personal data pertaining to you that is collected under Section 6 Clause (1e) GDPR (data processing in the public interest) or Section 6 Clause 1 f) GDPR (data processing on the basis of a balance of interests). If you file an objection, we will continue to process your personal data only if we can document mandatory, legitimate reasons that outweigh your interests, rights and freedoms, or if processing is for the assertion, exercise or defense of legal claims. To the extent we use your personal data for direct marketing based on legitimate interests, you have the right to object at any time without giving reasons.
                  </p>
                  
                  <p className="text-gray-400 mt-4 mb-2">d.</p>
                  <p className="text-gray-400">
                    We ask you to address your claims or declarations to the following contact address if possible: dialog@sonora.com
                  </p>
                  
                  <p className="text-gray-400 mt-4 mb-2">e.</p>
                  <p className="text-gray-400">
                    If you believe that the processing of your personal data violates legal requirements, you have the right to lodge a complaint with a competent data protection supervisory authority (Art. 77 GDPR).
                  </p>
                </div>

                <div className="mb-12 border-t border-gray-700 pt-8">
                  <h2 className="text-xl text-white mb-4">10. Newsletter</h2>
                  <p className="text-gray-400">
                    If you subscribe to a newsletter offered on our website, the information provided during registration for the newsletter will be used solely for the purpose of mailing the newsletter unless you consent to its use for additional purposes. You may cancel the subscription at any time by using the option to unsubscribe contained in the newsletter.
                  </p>
                </div>

                <div className="mb-12 border-t border-gray-700 pt-8">
                  <h2 className="text-xl text-white mb-4">11. Sonora Group AG's Central Registration Service</h2>
                  <p className="text-gray-400">
                    With the Central Registration Service offered by Sonora Group AG, you can sign up for every website and application belonging to the Sonora Group and its brands that are connected to the service. The applicable terms of use contain specific data protection provisions. Those terms of use can be found on the registration pages of affiliated websites and applications.
                  </p>
                </div>

                <div className="mb-12 border-t border-gray-700 pt-8">
                  <h2 className="text-xl text-white mb-4">12. Data transmission to recipients outside the European Economic Area</h2>
                  <p className="text-gray-400 mb-2">a.</p>
                  <p className="text-gray-400">
                    When using service providers (see section 4. d.) and passing on data to third parties based on you consent (see section 3.c.), personal data may be provided to recipients in countries outside the European Union ("EU"), Iceland, Liechtenstein and Norway (= European Economic Area) are transferred and processed there, in particular USA, India. Further countries are listed in our Consent Management System under "Settings" in the footer at the bottom of the website.
                  </p>
                  
                  <p className="text-gray-400 mt-4 mb-2">b.</p>
                  <p className="text-gray-400">
                    In the following countries, from the EU's point of view, there is an adequate level of personal data protection (so-called "adequacy"), in compliance with EU standards: Andorra, Argentina, Canada (limited), Faroe Islands, Guernsey, Israel, Isle of Man, Japan, Jersey, New Zealand, Switzerland, United Kingdom (UK), United States of America (USA; limited) Uruguay. We agree with other recipients on the use of EU standard contractual clauses, binding corporate rules or other applicable instruments (if any) to create an "adequate level of protection" according to legal requirements. For more information, please use the contact details given in section 9.d. above.
                  </p>
                </div>

                <div className="mb-12 border-t border-gray-700 pt-8">
                  <h2 className="text-xl text-white mb-4">13. Details of joint processing - data sharing on the Sonora Community webpages</h2>
                  <p className="text-gray-400">
                    The Sonora Community and the correspondingly marked webpages are operated jointly by Sonora AG and Sonora Heritage GmbH. As a result, both companies are jointly responsible for the processing of personal data.
                  </p>
                  <p className="text-gray-400 mt-2">
                    As part of this cooperation, website tracking data generated on the Sonora Community websites can be shared with Sonora Heritage GmbH with the corresponding, optional consent of the users. This data includes information about user behavior on the websites, such as pages visited, length of stay and interactions. The purpose of sharing this data is to enable optimal use of our websites and to continuously improve them. Further details on joint responsibility can be found in the PDF document below.
                  </p>
                  <p className="text-gray-400 mt-2">
                    Details of joint processing - Data sharing within the Sonora Community (PDF)
                  </p>
                </div>

                <div className="border-t border-gray-700 pt-8 text-gray-400">
                  <p>Last update: November 2024</p>
                  <p className="mt-2">Click to open CCPA & CPRA Privacy Statement for California Residents</p>
                  <p className="mt-2">Click for information on data processing by Sonora Japan G. K. and Sonora AG regarding website visits to sonora.co.jp</p>
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

export default LoginPage;