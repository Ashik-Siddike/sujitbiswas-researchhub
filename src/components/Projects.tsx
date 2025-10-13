import { Folder, Clock, Users, Link, ArrowRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

const Projects = () => {
  const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
  
  const { data: projectsFromDB = [] } = useQuery({
    queryKey: ['projects-public'],
    queryFn: async () => {
      const res = await fetch(`${apiBase}/projects`);
      if (!res.ok) return [];
      return await res.json();
    },
  });

  const projects = projectsFromDB.length > 0 ? projectsFromDB : [
    {
      title: "iCARE: Intelligent, Customised Admissions and Recruitment Engagement platform",
      description: "Developing an AI-powered platform to revolutionize university admissions and recruitment processes with intelligent matching and personalized engagement.",
      status: "Ongoing",
      duration: "2025 - 2027",
      collaborators: ["Innovate UK", "Industry Partners"],
      funding: "£268,000 - Innovate UK & Industry",
      outcomes: ["AI platform", "Industry partnerships", "Research publications"]
    },
    {
      title: "Framework for Privacy-Preserving Data Extraction and Synthesis",
      description: "Creating advanced frameworks for secure data extraction and synthesis while maintaining privacy guarantees in sensitive domains.",
      status: "Ongoing",
      duration: "2025 - 2028",
      collaborators: ["Industry Partners", "City University London"],
      funding: "£126,000 - Industry & University",
      outcomes: ["Privacy frameworks", "Synthesis tools", "Security protocols"]
    },
    {
      title: "Blockchain-Based Public Examination Management System",
      description: "Implementing a transparent and secure blockchain solution for managing public examinations in Bangladesh.",
      status: "Completed",
      duration: "2021",
      collaborators: ["ICTD Bangladesh", "Government Partners"],
      funding: "0.6M BDT - ICTD Bangladesh",
      outcomes: ["Blockchain platform", "Government adoption", "Security enhancement"]
    },
    {
      title: "Remote Management of Smart Farming",
      description: "Developing IoT and blockchain-based solutions for remote monitoring and management of agricultural systems.",
      status: "Completed",
      duration: "2021",
      collaborators: ["ICTD Bangladesh", "Agricultural Partners"],
      funding: "0.5M BDT - ICTD Bangladesh",
      outcomes: ["IoT platform", "Agricultural innovation", "Rural technology adoption"]
    }
  ];

  return (
    <section id="projects" className="py-20 bg-muted">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Research Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Leading and contributing to cutting-edge research projects that bridge 
            academia and industry to solve real-world challenges.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <div key={index} className="bg-card rounded-xl shadow-card hover:shadow-elevated transition-all duration-300 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <Folder size={20} className="text-white" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    project.status === 'Ongoing' 
                      ? 'bg-accent/10 text-accent' 
                      : 'bg-primary/10 text-primary'
                  }`}>
                    {project.status}
                  </span>
                </div>
                
                <button 
                  className="p-2 text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => alert(`Project: ${project.title}\n\nFor collaboration or more details, please contact: sujitsujitbiswas@ieee.org`)}
                >
                  <Link size={18} />
                </button>
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-3">
                {project.title}
              </h3>
              
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {project.description}
              </p>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock size={16} className="mr-2" />
                  <span>{project.duration}</span>
                </div>
                
                <div className="flex items-start text-sm text-muted-foreground">
                  <Users size={16} className="mr-2 mt-0.5" />
                  <span>
                    {Array.isArray(project.collaborators) 
                      ? project.collaborators.join(', ') 
                      : typeof project.collaborators === 'string' 
                        ? project.collaborators 
                        : 'No collaborators listed'}
                  </span>
                </div>
                
                <div className="text-sm">
                  <span className="font-medium text-foreground">Funding:</span>
                  <span className="text-muted-foreground ml-2">{project.funding}</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium text-foreground mb-2">Key Outcomes:</h4>
                <div className="flex flex-wrap gap-2">
                  {(Array.isArray(project.outcomes) ? project.outcomes : []).map((outcome, outcomeIndex) => (
                    <span 
                      key={outcomeIndex}
                      className="bg-muted px-3 py-1 rounded-full text-sm text-foreground"
                    >
                      {outcome}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <button 
                  className="flex items-center text-primary hover:text-primary-deep transition-colors font-medium"
                  onClick={() => alert(`${project.title}\n\nFor more information, contact: sujitsujitbiswas@ieee.org`)}
                >
                  Learn More
                  <ArrowRight size={16} className="ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;