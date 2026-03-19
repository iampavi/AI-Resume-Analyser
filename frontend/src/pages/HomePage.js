import AIScanSection from "../components/AIScanSection";
import Navbar from "../components/Navbar";
import UploadSection from "../components/UploadSection";
import HeroSection from "../sections/HeroSection";
import LearnMore from "../sections/LearnMore";
import Footer from "../components/Footer";
import ChatWidget from "../components/ChatWidget";


function HomePage({ result, setResult }) {

  return (
    <div>

      <Navbar />

      <HeroSection />

      <UploadSection setResult={setResult} />
      
      <AIScanSection />

      <LearnMore />

      <Footer />

       <ChatWidget />
    </div>
  );
}

export default HomePage;