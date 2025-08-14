import { User, GraduationCap, Calendar, BookOpen, Award } from 'lucide-react';

const Students = () => {
  const currentStudents = [
    {
      name: "Alice Chen",
      level: "PhD Student",
      year: "3rd Year",
      topic: "Privacy-Preserving Blockchain Consensus Mechanisms",
      startDate: "2022",
      progress: "Thesis writing phase",
      publications: 2,
      avatar: "AC"
    },
    {
      name: "Michael Rodriguez",
      level: "PhD Student", 
      year: "2nd Year",
      topic: "Machine Learning for IoT Security Anomaly Detection",
      startDate: "2023",
      progress: "Literature review and preliminary experiments",
      publications: 1,
      avatar: "MR"
    },
    {
      name: "Sarah Johnson",
      level: "MSc Student",
      year: "Final Year",
      topic: "FinTech Security Framework for Digital Payments",
      startDate: "2024",
      progress: "Data collection and analysis",
      publications: 0,
      avatar: "SJ"
    },
    {
      name: "David Kim",
      level: "PhD Student",
      year: "1st Year",
      topic: "Quantum-Resistant Cryptography for Distributed Systems",
      startDate: "2024",
      progress: "Coursework and research proposal development",
      publications: 0,
      avatar: "DK"
    },
    {
      name: "Emma Thompson",
      level: "MSc Student",
      year: "Final Year", 
      topic: "Federated Learning Privacy in Healthcare Applications",
      startDate: "2024",
      progress: "Implementation and testing phase",
      publications: 1,
      avatar: "ET"
    }
  ];

  const graduatedStudents = [
    {
      name: "Dr. James Wilson",
      degree: "PhD in Computer Science",
      year: "2023",
      thesis: "Scalable Consensus Algorithms for Permissioned Blockchain Networks",
      currentPosition: "Senior Security Engineer at Google",
      publications: 4,
      avatar: "JW"
    },
    {
      name: "Dr. Priya Sharma",
      degree: "PhD in Computer Science", 
      year: "2022",
      thesis: "Privacy-Preserving Data Analytics in Edge Computing Environments",
      currentPosition: "Research Scientist at Microsoft Research",
      publications: 5,
      avatar: "PS"
    },
    {
      name: "Mark Anderson",
      degree: "MSc in Cybersecurity",
      year: "2023",
      thesis: "Blockchain-based Identity Management for IoT Devices",
      currentPosition: "Cybersecurity Consultant at Deloitte",
      publications: 2,
      avatar: "MA"
    },
    {
      name: "Dr. Li Zhang",
      degree: "PhD in Computer Science",
      year: "2021",
      thesis: "Machine Learning Approaches for Financial Fraud Detection",
      currentPosition: "Assistant Professor at University of Edinburgh",
      publications: 6,
      avatar: "LZ"
    }
  ];

  const opportunities = [
    {
      title: "PhD Positions",
      description: "Seeking motivated students for doctoral research in cybersecurity, blockchain, and IoT security.",
      requirements: ["Strong background in computer science or related field", "Programming experience (Python, C++, Solidity)", "Interest in security and distributed systems"],
      contact: "Applications welcome year-round"
    },
    {
      title: "MSc Dissertation Projects",
      description: "Multiple research projects available for MSc students interested in cutting-edge cybersecurity research.",
      requirements: ["Enrolled in MSc program", "Coursework in security or networking", "Commitment to rigorous research methodology"],
      contact: "Available for Spring 2025 intake"
    },
    {
      title: "Research Internships",
      description: "Summer research internships for undergraduate students interested in academic research experience.",
      requirements: ["Strong academic performance", "Basic programming skills", "Enthusiasm for research"],
      contact: "Applications open February 2025"
    }
  ];

  return (
    <section id="students" className="py-20 bg-muted">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Research Students
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Mentoring and supervising the next generation of researchers and cybersecurity professionals 
            in cutting-edge areas of technology and innovation.
          </p>
        </div>

        {/* Current Students */}
        <div className="max-w-6xl mx-auto mb-16">
          <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center">
            <User className="mr-3" size={24} />
            Current Students
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentStudents.map((student, index) => (
              <div key={index} className="bg-card rounded-xl shadow-card hover:shadow-elevated transition-all duration-300 p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {student.avatar}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground">{student.name}</h4>
                    <p className="text-sm text-muted-foreground">{student.level} • {student.year}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-start">
                    <BookOpen size={16} className="text-primary mr-2 mt-1 flex-shrink-0" />
                    <p className="text-sm text-foreground font-medium">{student.topic}</p>
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar size={16} className="mr-2" />
                    <span>Started {student.startDate}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Award size={16} className="mr-2" />
                    <span>{student.publications} publication{student.publications !== 1 ? 's' : ''}</span>
                  </div>
                </div>

                <div className="border-t pt-3">
                  <p className="text-sm text-foreground">
                    <span className="font-medium">Progress:</span> {student.progress}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Graduated Students */}
        <div className="max-w-6xl mx-auto mb-16">
          <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center">
            <GraduationCap className="mr-3" size={24} />
            Recent Graduates
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {graduatedStudents.map((student, index) => (
              <div key={index} className="bg-card rounded-xl shadow-card hover:shadow-elevated transition-all duration-300 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold mr-4">
                      {student.avatar}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-foreground">{student.name}</h4>
                      <p className="text-sm text-muted-foreground">{student.degree}</p>
                    </div>
                  </div>
                  <span className="text-sm text-primary font-medium">{student.year}</span>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">Thesis:</p>
                    <p className="text-sm text-muted-foreground italic">{student.thesis}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">Current Position:</p>
                    <p className="text-sm text-foreground">{student.currentPosition}</p>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Award size={16} className="mr-2" />
                      <span>{student.publications} publications</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Research Opportunities */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Research Opportunities</h3>
          
          <div className="space-y-6">
            {opportunities.map((opportunity, index) => (
              <div key={index} className="bg-card rounded-xl shadow-card p-6">
                <h4 className="text-xl font-semibold text-foreground mb-3">{opportunity.title}</h4>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {opportunity.description}
                </p>
                
                <div className="mb-4">
                  <h5 className="font-medium text-foreground mb-2">Requirements:</h5>
                  <ul className="space-y-1">
                    {opportunity.requirements.map((req, reqIndex) => (
                      <li key={reqIndex} className="flex items-start text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="border-t pt-3">
                  <p className="text-sm text-primary font-medium">{opportunity.contact}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-muted-foreground mb-4">
              Interested in joining our research group? Get in touch to discuss opportunities.
            </p>
            <button 
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center px-6 py-3 bg-gradient-primary text-white rounded-lg font-medium hover:shadow-elevated transition-all duration-300"
            >
              Contact for Opportunities
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Students;