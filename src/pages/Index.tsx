import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ResearchAreas from '@/components/ResearchAreas';
import Publications from '@/components/Publications';
import Projects from '@/components/Projects';
import Teaching from '@/components/Teaching';
import Students from '@/components/Students';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <ResearchAreas />
        <Publications />
        <Projects />
        <Teaching />
        <Students />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
