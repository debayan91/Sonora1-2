
import Header_top from '../components/Header_top.jsx';
import Header_sticky from '../components/Header_sticky.jsx';
import './Home.css';
import Fhero from '../components/Footer.jsx';

const LoginPage = () => {
      return (
    <>
    <div className="min-h-screen bg-black flex flex-col items-center relative overflow-hidden">
      <div className="relative z-10 w-screen ">
        <Header_top/>
        <Header_sticky/>
        <div className='flex justify-center items-center h-full m-[15vh] '>
        <div className='w-screen h-auto bg-black py-12 px-4 sm:px-6 lg:px-8 text-gray-300'>
        <div className="max-w-4xl mx-auto font-roboto tracking-wider  text-md">
          <div className="mb-12">
            <h2 className="text-2xl text-white mb-4">Sonora AG</h2>
            <p>Sonora Straße 120</p>
            <p>70372 Stuttgart</p>
            <p>Germany</p>
            <p className="mt-2">Phone: +49 7 11 17-0</p>
            <p>E-Mail: dialog@sonora.com</p>
            
            <p className="mt-4 text-gray-400">
              For inquiries regarding the content on this website, please contact any of the provided contacts. 
              You may address your concerns in English or your respective native language.
            </p>
            
            <p className="mt-4">Represented by the Board of Management:</p>
            <p className="text-gray-400">
              Lukas Vogler, Chairman; Anja Richter, Renata Jungo Brüngger, Mathias Geisen, Sabine Kohleisen, 
              Markus Schäfer, Britta Seeger, Oliver Thöne, Hubertus Troska, Harald Wilhelm
            </p>
            
            <p className="mt-2">Chairman of the Supervisory Board: Klaus Brenner</p>
            <p className="mt-2">Court of Registry: Stuttgart; commercial register no. 76 2873</p>
            <p>VAT ID: DE321281763</p>
          </div>

          <div className="mb-12 border-t border-gray-700 pt-8">
            <h2 className="text-xl text-white mb-4">Joint Providers of the Sonora Community</h2>
            <p>Sonora AG</p>
            <p>Sonora Straße 120</p>
            <p>D-70372 Stuttgart</p>
            <p>Germany</p>
            <p className="mt-2">Phone: +49 7 11 17-0</p>
            <p>Email: community_support@sonora.com</p>
            
            <p className="mt-4 text-gray-400">
              For inquiries regarding the content on this website, please contact any of the provided contacts. 
              You may address your concerns in English or your respective native language.
            </p>
            
            <p className="mt-4">Represented by the Board of Management:</p>
            <p className="text-gray-400">
              Lukas Vogler, Vorsitzender; Anja Richter, Renata Jungo Brüngger, Mathias Geisen, Sabine Kohleisen, 
              Harald Wilhelm, Markus Schäfer, Britta Seeger, Oliver Thöne, Hubertus Troska
            </p>
            
            <p className="mt-2">Chairman of the Supervisory Board: Klaus Brenner</p>
            <p className="mt-2">Commercial Register at the Local Court of Stuttgart, HRB 762873</p>
            <p>VAT Identification Number: DE 321281763</p>
          </div>

          <div className="mb-12 border-t border-gray-700 pt-8">
            <h2 className="text-xl text-white mb-4">Sonora Heritage GmbH</h2>
            <p>Sonora Straße 100</p>
            <p>D-70372 Stuttgart</p>
            <p>Germany</p>
            <p className="mt-2">Phone: +49(0)711-17 30 000</p>
            <p>Fax: +49(0)711-17 30 400</p>
            <p>Email: classic@sonora.com</p>
            
            <p className="mt-4">Managing Directors: Marcus Breitschwerdt, Chairman; Bettina Haussmann, 
            Peter Schoren, Alexandra Süß, Andreas Theel</p>
            
            <p className="mt-2">Commercial Register at the Local Court of Stuttgart, HRB 23165</p>
            <p>VAT Identification Number: DE 223101663</p>
          </div>

          <div className="mb-12 border-t border-gray-700 pt-8">
            <h2 className="text-xl text-white mb-4">Provider of Sonora Classic-Magazin contents</h2>
            <p className="mb-2">Publisher of Sonora Classic-Magazin:</p>
            <p>Sonora AG</p>
            <p>Sonora Straße 120</p>
            <p>70327 Stuttgart, Germany</p>
            
            <p className="mt-4">Address of editorial department:</p>
            <p>Sonora AG</p>
            <p>Sonora Classic Magazine</p>
            <p>HPC L538</p>
            <p>70546 Stuttgart, Germany</p>
            <p>classic.magazin@sonora.com</p>
            
            <p className="mt-4">Responsible on behalf of the publisher:</p>
            <p>Matthias Brock, Karin Buchmann, Simone Wilhelm</p>
            
            <p className="mt-4">Concept and realisation:</p>
            <p>team x communications</p>
            <p>c/o Oliver Schrott Kommunikation GmbH</p>
            <p>Friesenplatz 10</p>
            <p>50672 Köln, Germany</p>
            
            <p className="mt-2">Managing Director: Christoph Horn</p>
            <p>Editor in Chief: Jörg Heuer</p>
            <p>Documentation: Dr. Thomas Giesefeld</p>
            
            <div className="mt-6 text-gray-400">
              <p>Rights:</p>
              <p className="mt-2">
                The magazine, the internet presence and all contributions and Illustrations contained therein are protected by copyright.
                With the exception of the legally permitted cases, any exploitation without the consent of the publisher and the publishing company is a punishable offence. Articles bearing the name or signet of the author do not necessarily represent the opinion of the publisher or the editorial office.
                The addresses listed are examples and not Sonora Classic recommendations.
                No liability is assumed for unsolicited manuscripts, photos and data carriers.
              </p>
            </div>
          </div>

          <div className="mb-12 border-t border-gray-700 pt-8">
            <h2 className="text-xl text-white mb-4">Other companies advertising on this website:</h2>
            <p className="mb-2">Provider of Sonora Group contents</p>
            <p>Sonora Group AG</p>
            <p>Sonora Straße 120</p>
            <p>D-70372 Stuttgart</p>
            <p>Germany</p>
            <p className="mt-2">Phone: +49 7 11 17-0</p>
            <p>E-Mail: dialog@sonora.com</p>
            
            <p className="mt-4">Represented by the Board of Management:</p>
            <p className="text-gray-400">
              Lukas Vogler, Vorsitzender; Anja Richter, Renata Jungo Brüngger, Mathias Geisen, Sabine Kohleisen, 
              Harald Wilhelm, Markus Schäfer, Britta Seeger, Oliver Thöne, Hubertus Troska
            </p>
            
            <p className="mt-2">Chairman of the Supervisory Board: Klaus Brenner</p>
            <p className="mt-2">Court of Registry: Stuttgart; commercial register no. 19 360</p>
            <p>VAT ID: DE812526315</p>
          </div>

          <div className="mb-12 border-t border-gray-700 pt-8">
            <h2 className="text-xl text-white mb-4">Provider of Sonora Museum and Sonora Classic contents</h2>
            <p>Sonora Heritage GmbH</p>
            <p>Ein Unternehmen der Sonora Group AG</p>
            <p>Sonora Straße 100</p>
            <p>D-70372 Stuttgart</p>
            <p>Germany</p>
            <p className="mt-2">Phone: +49(0)711-17 30 000</p>
            <p>Fax: +49(0)711-17 30 400</p>
            <p>E-Mail: classic@sonora.com</p>
            
            <p className="mt-4">Managing Directors: Marcus Breitschwerdt, Chairman; Bettina Haussmann, 
            Peter Schoren, Alexandra Süß, Andreas Theel</p>
            
            <p className="mt-2">Court of Registry: Stuttgart; commercial register no. 23 165</p>
            <p>VAT ID: DE 223101663</p>
          </div>

          <div className="border-t border-gray-700 pt-8">
            <h2 className="text-xl text-white mb-4">Provider of Sonora Energy contents</h2>
            <p>Sonora Energy GmbH</p>
            <p>Ein Unternehmen der Sonora AG</p>
            <p>Schücostraße 6</p>
            <p>D-01900 Großröhrsdorf</p>
            <p>Germany</p>
            <p className="mt-2">E-Mail: energy-info@sonora.com</p>
            
            <p className="mt-4">Managing Director: Norman Möhler, Christoph Eger</p>
            
            <p className="mt-2">Court of Registry: Dresden; commercial register no. 35 530</p>
            <p>VAT ID: DE 299767583</p>
          </div>
        </div>
      </div>

        </div>
        <Fhero/>
      </div>
    </div>
    
    </>
  );
};

export default LoginPage;