import { BookOpen, Calendar, Users, ExternalLink } from 'lucide-react';

const Publications = () => {
  const publications = [
    {
      title: "Dynamic Fine-grained SLA Management for 6G eMBB-plus Slice using mDNN & Smart Contracts",
      authors: "S. Biswas et al.",
      journal: "IEEE Transactions on Services Computing",
      year: "2024",
      citations: 8,
      type: "Journal",
      summary: "A novel approach to manage Service Level Agreements in 6G networks using machine learning and blockchain smart contracts."
    },
    {
      title: "CIC-SIoT: Clean-Slate Information-Centric Software-Defined Content Discovery and Distribution for IoT",
      authors: "S. Biswas et al.",
      journal: "IEEE Internet of Things Journal",
      year: "2024",
      citations: 12,
      type: "Journal",
      summary: "An innovative information-centric networking approach for efficient content discovery and distribution in IoT environments."
    },
    {
      title: "Globechain: An interoperable blockchain for global sharing of healthcare data—a covid-19 perspective",
      authors: "S. Biswas et al.",
      journal: "IEEE Consumer Electronics Magazine",
      year: "2021",
      citations: 67,
      type: "Journal",
      summary: "A comprehensive blockchain solution for secure and interoperable healthcare data sharing during global health crises."
    },
    {
      title: "Blockchain for e-health-care systems: Easier said than done",
      authors: "S. Biswas et al.",
      journal: "IEEE Computer",
      year: "2020",
      citations: 156,
      type: "Journal",
      summary: "A critical analysis of blockchain implementation challenges in healthcare systems with practical insights."
    },
    {
      title: "Interoperability and Synchronization Management of Blockchain-Based Decentralized e-Health Systems",
      authors: "S. Biswas et al.",
      journal: "IEEE Transactions on Engineering Management",
      year: "2020",
      citations: 89,
      type: "Journal",
      summary: "Addressing synchronization and interoperability challenges in decentralized healthcare blockchain systems."
    },
    {
      title: "PoBT: A Lightweight Consensus Algorithm for Scalable IoT Business Blockchain",
      authors: "S. Biswas et al.",
      journal: "IEEE Internet of Things Journal",
      year: "2019",
      citations: 234,
      type: "Journal",
      summary: "Introducing Proof of Block and Trade (PoBT), a novel consensus mechanism designed for IoT blockchain scalability."
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
                <span className="font-medium">Published in:</span> {pub.journal}
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