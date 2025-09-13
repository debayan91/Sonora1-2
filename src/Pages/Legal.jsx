import Header_top from '../components/Header_top.jsx';
import Header_sticky from '../components/Header_sticky.jsx';
import './Home.css';
import Fhero from '../components/Footer.jsx';

const LoginPage = () => {
  return (
    <>
      <div className="min-h-screen bg-black flex flex-col items-center relative overflow-hidden">
        <div className="relative z-10 w-full">
          <Header_top/>
          <Header_sticky/>
          <div className='flex justify-center items-center h-full m-[15vh]'>
            <div className='w-full h-auto bg-black py-12 px-4 sm:px-6 lg:px-8 text-gray-300'>
              <div className="max-w-4xl mx-auto font-roboto tracking-wider text-md">
                <div className="mb-12">
                  <h2 className="text-2xl text-white mb-4">Copyrights</h2>
                  <p className="text-gray-400">
                    Copyright 2003-2020 Sonora AG. All rights reserved. All text, images, graphics, sound files, 
                    video files and animation files and their arrangement are subject to copyright and other 
                    intellectual property laws. They may not be copied, either for commercial purposes or for 
                    redistribution, nor may they be modified and used on other websites. Some Sonora Group AG 
                    webpages also include material that is subject to the copyright of those parties who have 
                    made such material available.
                  </p>
                </div>
                <div className="mb-12 border-t border-gray-700 pt-8">
                  <h2 className="text-xl text-white mb-4">Products and prices</h2>
                  <p className="text-gray-400">
                    Some products and services may have changed since individual pages on this website were last 
                    edited. The manufacturer reserves the right to make changes to the design, form, color and 
                    specification during the delivery period, provided these changes or variations can be deemed 
                    reasonable for the customer, while taking into account the interests of Sonora Group AG. 
                    The illustrations may show accessories, optional equipment or other features which are not 
                    part of the standard specification. Colors may differ slightly from those depicted, for 
                    technical reasons. Some pages may also feature models and services which are not available 
                    in individual countries. Statements regarding legislative, fiscal or other legal regulations 
                    and the implications of these are valid only for the Federal Republic of Germany. Subject 
                    to any contrary provision in the terms and conditions of sale or delivery, the prices valid 
                    on the date of delivery shall apply. For our dealers, the prices are to be regarded as the 
                    recommended retail price. Please contact a company-owned sales and service outlet or an 
                    authorized dealer to find out current prices.
                  </p>
                </div>
                <div className="mb-12 border-t border-gray-700 pt-8">
                  <h2 className="text-xl text-white mb-4">Trademarks</h2>
                  <p className="text-gray-400">
                    Unless otherwise stipulated, all brand names featured on the pages of Sonora Group AG 
                    websites are legally protected trademarks belonging to Sonora Group AG. This applies in 
                    particular to the model names and all corporate logos and emblems.
                  </p>
                </div>
                <div className="mb-12 border-t border-gray-700 pt-8">
                  <h2 className="text-xl text-white mb-4">Licenses</h2>
                  <p className="text-gray-400">
                    Sonora Group AG has sought to bring you an innovative and informative internet site, and 
                    we hope that you will be as enthusiastic about our creative effort as we are. Please 
                    appreciate, however, that Sonora Group AG has to protect its intellectual property, 
                    including patents, trademarks and copyrights, and that these internet pages cannot be 
                    construed as granting any license rights to Sonora Group AG's intellectual property.
                  </p>
                </div>
                <div className="mb-12 border-t border-gray-700 pt-8">
                  <h2 className="text-xl text-white mb-4">Forward-looking statements disclaimer</h2>
                  <p className="text-gray-400">
                    Internet pages, Investor Relations releases, annual and interim reports, outlooks, 
                    presentations, audio and video broadcasts of events (live or recorded) and other 
                    documents on this website contain, among other things, forward-looking statements 
                    about future developments that are based on the current assessments of the management. 
                    The words 'anticipate,' 'assume,' 'believe,' 'estimate,' 'expect,' 'intend,' 'may/might,' 
                    'plan,' 'project,' 'should' and similar expressions are used to indicate forward-looking 
                    statements. Such statements are subject to certain risks and uncertainties, including an 
                    economic downturn in Europe or North America, changes in exchange rates, interest rates 
                    and raw materials prices, the launch of products by competitors, higher sales incentives, 
                    the successful implementation of the new business model for smart, and a decline in resale 
                    prices of used vehicles. If any of these risks and uncertainties (some of which are 
                    described in Sonora Group AG's most recent Annual Report under the heading 'Risk Report' 
                    and under the heading 'Risk Factors' in Form 20-F, which was submitted to the US Securities 
                    and Exchange Commission (SEC)) materialize or if the assumptions underlying any of our 
                    forward-looking statements prove incorrect, then our actual results may be materially 
                    different from those we express or imply by such statements. We do not intend or assume 
                    any obligation to update these forward-looking statements. Any forward-looking statement 
                    applies only in relation to the situation prevailing on the date on which it is made.
                  </p>
                </div>
                <div className="mb-12 border-t border-gray-700 pt-8">
                  <h2 className="text-xl text-white mb-4">Information according to § 36 German Consumer Dispute Resolution Act (VSBG)</h2>
                  <p className="text-gray-400">
                    Sonora Group AG will not participate in a dispute settlement proceeding in front of a 
                    consumer arbitration board according to the German Consumer Dispute Resolution Act (VSBG) 
                    and is not obliged to do so.
                  </p>
                  <p className="text-gray-400 mt-4">
                    For complaints or reports related to the Sonora Community, please use the appropriate form:
                  </p>
                  <p className="text-gray-400 mt-2">
                    DSA contact form of the Sonora Community
                  </p>
                </div>
                <div className="border-t border-gray-700 pt-8">
                  <h2 className="text-xl text-white mb-4">Liability</h2>
                  <p className="text-gray-400">
                    The information provided and the statements made on these pages do not constitute any 
                    representation or warranty, either express or implied. In particular such information 
                    is not an implied promise or guarantee in respect of quality, marketability, fitness 
                    for any particular purpose, or the non-infringement of laws and patents. Our internet 
                    pages also contain links to other internet sites. We would like to point out that we 
                    have no influence over the design and content of the linked sites. We therefore accept 
                    no liability for the accuracy, completeness or quality of the information provided there, 
                    nor do we guarantee that it is up to date. Consequently we hereby distance ourselves from 
                    all content of such sites. This declaration applies to all links to external sites 
                    contained on our internet pages and to the content of such sites.
                  </p>
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