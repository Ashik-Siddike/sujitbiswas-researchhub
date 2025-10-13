import { BookOpen, Calendar, Users, ExternalLink } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

const Publications = () => {
  const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
  
  const { data: publicationsFromDB = [] } = useQuery({
    queryKey: ['publications-public'],
    queryFn: async () => {
      const res = await fetch(`${apiBase}/publications`);
      if (!res.ok) return [];
      return await res.json();
    },
  });

  const publications = publicationsFromDB.length > 0 ? publicationsFromDB : [];

  return (
    <section id="publications" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Publications
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Peer-reviewed research contributions advancing the fields of cybersecurity, 
            blockchain technology, and digital innovation.
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-6">
          {publications.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>No publications found. Please add publications from the admin panel.</p>
            </div>
          ) : (
            publications.map((pub, index) => (
              <div key={pub.id || index} className="bg-card rounded-xl shadow-card hover:shadow-elevated transition-all duration-300 p-6 border-l-4 border-primary">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                <div className="flex items-center space-x-4 mb-2 lg:mb-0">
                  <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <BookOpen size={20} className="text-white" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    pub.type === 'Journal' 
                      ? 'bg-primary/10 text-primary' 
                      : 'bg-accent/10 text-accent'
                  }`}>
                    {pub.type}
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Calendar size={16} />
                    <span>{pub.year}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users size={16} />
                    <span>{pub.citations} citations</span>
                  </div>
                  <button 
                    className="flex items-center space-x-1 text-primary hover:text-primary-deep transition-colors"
                    onClick={() => {
                      if (pub.pdf_url) {
                        window.open(pub.pdf_url, '_blank');
                      } else if (pub.doi) {
                        window.open(`https://doi.org/${pub.doi}`, '_blank');
                      } else {
                        alert(`${pub.title} - Full text available on request. Contact: sujitsujitbiswas@ieee.org`);
                      }
                    }}
                  >
                    <ExternalLink size={16} />
                    <span>View</span>
                  </button>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-2">
                {pub.title}
              </h3>
              
              <p className="text-muted-foreground mb-2">
                <span className="font-medium">Authors:</span> {pub.authors}
              </p>
              
              <p className="text-muted-foreground mb-4">
                <span className="font-medium">Published in:</span> {pub.journal}
              </p>
            </div>
          )))}
        </div>

        <div className="text-center mt-12">
          <button 
            className="inline-flex items-center px-6 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-white transition-all duration-300"
            onClick={() => window.open('https://scholar.google.com', '_blank')}
          >
            <BookOpen size={18} className="mr-2" />
            View All Publications
          </button>
        </div>
      </div>
    </section>
  );
};

export default Publications;