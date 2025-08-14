import { MapPin, Mail, Calendar } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Dr. Sujit Biswas</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>
                  Assistant Professor<br />
                  Department of Computer Science<br />
                  City, University of London
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} />
                <a href="mailto:sujit.biswas@city.ac.uk" className="hover:text-primary-light transition-colors">
                  sujit.biswas@city.ac.uk
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2 text-sm">
              <button 
                onClick={() => document.querySelector('#research')?.scrollIntoView({ behavior: 'smooth' })}
                className="block hover:text-primary-light transition-colors"
              >
                Research Areas
              </button>
              <button 
                onClick={() => document.querySelector('#publications')?.scrollIntoView({ behavior: 'smooth' })}
                className="block hover:text-primary-light transition-colors"
              >
                Publications
              </button>
              <button 
                onClick={() => document.querySelector('#teaching')?.scrollIntoView({ behavior: 'smooth' })}
                className="block hover:text-primary-light transition-colors"
              >
                Teaching
              </button>
              <button 
                onClick={() => document.querySelector('#students')?.scrollIntoView({ behavior: 'smooth' })}
                className="block hover:text-primary-light transition-colors"
              >
                Students
              </button>
            </div>
          </div>

          {/* Affiliations */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Affiliations</h4>
            <div className="space-y-2 text-sm">
              <p>City, University of London</p>
              <p className="text-primary-light">Research Fellow at UCL (Honorary)</p>
              <p className="text-primary-light">Adjunct at Northumbria University</p>
            </div>
            
            <div className="mt-4 flex items-center space-x-2 text-sm">
              <Calendar size={16} />
              <span>Last updated: {new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-6 text-center">
          <p className="text-sm">
            Copyright © {currentYear} Dr. Sujit Biswas. All rights reserved.
          </p>
          <p className="text-xs text-primary-light mt-2">
            Built with modern web technologies for accessibility and performance.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;