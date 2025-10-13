import { useQuery } from '@tanstack/react-query';
import * as Icons from 'lucide-react';

interface ResearchArea {
  id: string;
  title: string;
  description: string;
  icon: string;
  order_index: number;
}

const ResearchAreas = () => {
  const { data: researchAreas = [], isLoading } = useQuery({
    queryKey: ['research-areas'],
    queryFn: async () => {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
      const res = await fetch(`${baseUrl}/research-areas`);
      if (!res.ok) throw new Error('Failed to fetch research areas');
      return (await res.json()) as ResearchArea[];
    },
  });

  if (isLoading) {
    return (
      <section id="research" className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="h-12 bg-muted rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-muted rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 bg-muted rounded-2xl animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="research" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
            Research Areas
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Research with hands-on experience in Blockchain and AI, focused on IoT, 
            medical data prediction, federated learning, and security issues in ML.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {researchAreas.map((area, index) => {
            const IconComponent = Icons[area.icon as keyof typeof Icons] as React.ComponentType<any>;
            
            return (
              <div 
                key={area.id} 
                className="group bg-card/80 backdrop-blur-sm rounded-2xl shadow-card hover:shadow-elevated transition-all duration-500 p-8 border border-border/50 hover:border-primary/30 hover:-translate-y-3 relative overflow-hidden"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:shadow-glow transition-all duration-500">
                      {IconComponent && <IconComponent size={28} className="text-white" />}
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                        {area.title}
                      </h3>
                      <div className="h-0.5 bg-gradient-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 mt-2"></div>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                    {area.description}
                  </p>

                  <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <button 
                      className="flex items-center text-primary text-sm font-medium"
                      onClick={() => document.querySelector('#publications')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      <span>Explore Research</span>
                      <Icons.ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ResearchAreas;