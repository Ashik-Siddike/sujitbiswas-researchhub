import { BookOpen, Calendar, Users, ExternalLink } from 'lucide-react';

const Publications = () => {
  const publications = [
    {
      title: "Scalable Blockchain Architecture for Secure IoT Data Management",
      authors: "S. Biswas, K. Ahmed, R. Chen",
      journal: "IEEE Transactions on Information Forensics and Security",
      year: "2024",
      citations: 47,
      type: "Journal",
      summary: "A novel blockchain architecture that addresses scalability challenges in IoT data management while maintaining high security standards."
    },
    {
      title: "PoBT: A Privacy-preserving Proof of Trust Consensus Algorithm",
      authors: "S. Biswas, M. Rahman, L. Zhang",
      journal: "Computer Networks",
      year: "2023",
      citations: 32,
      type: "Journal",
      summary: "Introducing a new consensus mechanism that balances trust establishment with privacy preservation in distributed networks."
    },
    {
      title: "Interoperability Framework for Cross-chain Healthcare Data Exchange",
      authors: "S. Biswas, A. Patel, J. Smith",
      journal: "Journal of Medical Internet Research",
      year: "2023",
      citations: 28,
      type: "Journal",
      summary: "A comprehensive framework enabling secure and efficient healthcare data exchange across different blockchain platforms."
    },
    {
      title: "Federated Learning with Differential Privacy in Financial Risk Assessment",
      authors: "S. Biswas, T. Kumar, S. Williams",
      journal: "IEEE Access",
      year: "2023",
      citations: 23,
      type: "Journal",
      summary: "Applying federated learning techniques with enhanced privacy guarantees for collaborative financial risk modeling."
    },
    {
      title: "Machine Learning-based Intrusion Detection for IoT Networks",
      authors: "S. Biswas, D. Thompson, Y. Liu",
      conference: "IEEE INFOCOM 2022",
      year: "2022",
      citations: 41,
      type: "Conference",
      summary: "A comprehensive ML-based approach for detecting sophisticated attacks targeting IoT infrastructure."
    },
    {
      title: "Quantum-resistant Cryptographic Protocols for Blockchain Systems",
      authors: "S. Biswas, R. Anderson, H. Park",
      conference: "ACM CCS 2022",
      year: "2022",
      citations: 35,
      type: "Conference",
      summary: "Developing cryptographic protocols resistant to quantum computing threats in blockchain environments."
    }
  ];

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
          {publications.map((pub, index) => (
            <div key={index} className="bg-card rounded-xl shadow-card hover:shadow-elevated transition-all duration-300 p-6 border-l-4 border-primary">
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
                  <button className="flex items-center space-x-1 text-primary hover:text-primary-deep transition-colors">
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
                <span className="font-medium">Published in:</span> {pub.journal || pub.conference}
              </p>
              
              <p className="text-foreground leading-relaxed">
                {pub.summary}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="inline-flex items-center px-6 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-white transition-all duration-300">
            <BookOpen size={18} className="mr-2" />
            View All Publications
          </button>
        </div>
      </div>
    </section>
  );
};

export default Publications;