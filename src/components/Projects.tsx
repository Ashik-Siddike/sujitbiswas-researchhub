import { Folder, Clock, Users, Link, ArrowRight } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: "SecureChain: Privacy-Preserving Blockchain Platform",
      description: "Developing a next-generation blockchain platform with built-in privacy features and quantum-resistant cryptography.",
      status: "Ongoing",
      duration: "2023 - 2025",
      collaborators: ["UCL", "Cambridge University", "IBM Research"],
      funding: "£750,000 - EPSRC Grant",
      outcomes: ["3 publications", "2 patent applications", "Open-source platform"]
    },
    {
      title: "FinTech Security Framework",
      description: "Creating comprehensive security frameworks for emerging FinTech applications and digital payment systems.",
      status: "Ongoing",
      duration: "2024 - 2026",
      collaborators: ["Bank of England", "Mastercard Labs", "City University"],
      funding: "£500,000 - Industry Partnership",
      outcomes: ["Security standards", "Industry guidelines", "Risk assessment tools"]
    },
    {
      title: "IoT Mesh Security Protocol",
      description: "Designing secure communication protocols for large-scale IoT mesh networks with dynamic topology.",
      status: "Completed",
      duration: "2021 - 2023",
      collaborators: ["ARM Holdings", "University of Surrey", "Siemens"],
      funding: "£400,000 - Innovate UK",
      outcomes: ["RFC draft", "5 publications", "Commercial implementation"]
    },
    {
      title: "Federated Learning for Healthcare",
      description: "Implementing privacy-preserving federated learning systems for collaborative medical research.",
      status: "Ongoing",
      duration: "2023 - 2024",
      collaborators: ["NHS Digital", "Oxford University", "DeepMind Health"],
      funding: "£300,000 - Wellcome Trust",
      outcomes: ["Clinical trials", "Privacy framework", "ML models"]
    },
    {
      title: "Quantum-Safe Cryptography Standards",
      description: "Contributing to international standards for post-quantum cryptographic protocols in distributed systems.",
      status: "Ongoing",
      duration: "2022 - 2025",
      collaborators: ["NIST", "ETSI", "European Commission"],
      funding: "€200,000 - Horizon Europe",
      outcomes: ["Standard specifications", "Reference implementations", "Security analysis"]
    },
    {
      title: "Smart Contract Verification Tool",
      description: "Automated verification system for detecting vulnerabilities and ensuring correctness in smart contracts.",
      status: "Completed",
      duration: "2020 - 2022",
      collaborators: ["Ethereum Foundation", "ConsenSys", "Imperial College"],
      funding: "£250,000 - Royal Society",
      outcomes: ["Open-source tool", "1000+ contracts verified", "Industry adoption"]
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
                
                <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
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
                  <span>{project.collaborators.join(', ')}</span>
                </div>
                
                <div className="text-sm">
                  <span className="font-medium text-foreground">Funding:</span>
                  <span className="text-muted-foreground ml-2">{project.funding}</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium text-foreground mb-2">Key Outcomes:</h4>
                <div className="flex flex-wrap gap-2">
                  {project.outcomes.map((outcome, outcomeIndex) => (
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
                <button className="flex items-center text-primary hover:text-primary-deep transition-colors font-medium">
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