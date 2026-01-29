import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { PopularDestinations } from '@/components/PopularDestinations';
import { Footer } from '@/components/Footer';

const Index = () => {
  const navigate = useNavigate();

  const handleStartPlanning = () => {
    navigate('/recommend');
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero onStartPlanning={handleStartPlanning} />
      <Features />
      <PopularDestinations />
      <Footer />
    </div>
  );
};

export default Index;
