import { ArrowRight, MapPin, Award, BookOpen, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20 sm:py-32">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-200/30 rounded-full blur-3xl"></div>
      </div>
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Profile Image */}
          <div className="flex justify-center lg:justify-start order-2 lg:order-1">
            <div className="relative">
              {/* Decorative ring */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full blur opacity-20 animate-pulse"></div>
              
              {/* Profile image container */}
              <div className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-full overflow-hidden border-8 border-white shadow-2xl">
                <img 
                  src="/src/assets/profile-image.jpg" 
                  alt="Dr. Sujit Biswas"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg animate-bounce">
                <Award className="w-6 h-6" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-indigo-600 text-white p-3 rounded-full shadow-lg animate-bounce delay-300">
                <BookOpen className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="text-center lg:text-left order-1 lg:order-2">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
              <Users className="w-4 h-4 mr-2" />
              Assistant Professor • Researcher • Educator
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-5xl xl:text-6xl">
              Dr. Sujit Biswas
            </h1>
            
            <p className="mt-6 text-xl leading-8 text-gray-700 font-medium">
              Assistant Professor in Cybersecurity & FinTech
            </p>
            
            <p className="mt-2 text-lg text-blue-600 font-semibold">
              City, University of London
            </p>
            
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl">
              Leading cutting-edge research in blockchain technology, IoT security, and machine learning applications in cybersecurity. Passionate about advancing digital security and financial technology innovation.
            </p>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 gap-6 text-center lg:text-left">
              <div>
                <div className="text-2xl font-bold text-blue-600">50+</div>
                <div className="text-sm text-gray-600">Publications</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-indigo-600">15+</div>
                <div className="text-sm text-gray-600">Research Projects</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">100+</div>
                <div className="text-sm text-gray-600">Students Mentored</div>
              </div>
            </div>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                View Research
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-3 border-blue-200 text-blue-700 hover:bg-blue-50">
                Download CV
              </Button>
            </div>
            
            <div className="mt-8 flex items-center justify-center lg:justify-start text-sm text-gray-500">
              <MapPin className="mr-2 h-4 w-4 text-blue-500" />
              Northampton Square, London EC1V 0HB, United Kingdom
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}