import { ArrowRight, MapPin } from 'lucide-react';
import profileImage from '@/assets/profile-image.jpg';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center pt-20 bg-gradient-subtle">
      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Dr. Sujit Biswas
              </h1>
              <div className="flex items-center space-x-2 text-primary">
                <MapPin size={20} />
                <span className="text-lg font-medium">City-St. George's, University of London</span>
              </div>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Lecturer in Cybersecurity and FinTech, Department of Computer Science, 
                City-St. George's, University of London, UK.
              </p>
              <p className="text-lg text-muted-foreground">
                Research Associate (Honorary), Centre for Blockchain Technology, UCL, UK
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
              <div className="text-center p-6 bg-card rounded-lg shadow-card">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">R</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Researcher</h3>
                <p className="text-sm text-muted-foreground">
                  Blockchain, AI, IoT, and security issues in ML
                </p>
              </div>

              <div className="text-center p-6 bg-card rounded-lg shadow-card">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">E</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Educator</h3>
                <p className="text-sm text-muted-foreground">
                  Teaching cybersecurity, FinTech, and emerging technologies
                </p>
              </div>

              <div className="text-center p-6 bg-card rounded-lg shadow-card">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">C</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Innovator</h3>
                <p className="text-sm text-muted-foreground">
                  Leading £394K+ in research projects and industry partnerships
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => document.querySelector('#research')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center justify-center px-6 py-3 bg-gradient-primary text-white rounded-lg font-medium hover:shadow-elevated transition-all duration-300"
              >
                Explore Research
                <ArrowRight size={18} className="ml-2" />
              </button>
              <button 
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-white transition-all duration-300"
              >
                Get in Touch
              </button>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-80 rounded-full overflow-hidden shadow-elevated">
                <img 
                  src={profileImage} 
                  alt="Dr. Sujit Biswas" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">PhD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;