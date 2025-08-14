import { Shield, Coins, Wifi, Brain, Lock, Network } from 'lucide-react';

const ResearchAreas = () => {
  const researchAreas = [
    {
      icon: Shield,
      title: 'Blockchain Technology',
      description: 'Consensus algorithms, privacy mechanisms, and scalability solutions for distributed systems.',
      topics: ['Consensus Algorithms', 'Privacy Protection', 'Scalability Solutions']
    },
    {
      icon: Coins,
      title: 'FinTech Innovation',
      description: 'Financial technology solutions, digital payments, and blockchain-based financial systems.',
      topics: ['Digital Payments', 'DeFi Solutions', 'Financial Security']
    },
    {
      icon: Lock,
      title: 'Cybersecurity',
      description: 'Advanced threat detection, security protocols, and resilience frameworks.',
      topics: ['Threat Detection', 'Security Protocols', 'Incident Response']
    },
    {
      icon: Wifi,
      title: 'Internet of Things (IoT)',
      description: 'Secure IoT architectures, device authentication, and scalable IoT solutions.',
      topics: ['IoT Security', 'Device Authentication', 'Edge Computing']
    },
    {
      icon: Brain,
      title: 'Machine Learning',
      description: 'ML applications in cybersecurity, privacy-preserving algorithms, and federated learning.',
      topics: ['Privacy-Preserving ML', 'Federated Learning', 'AI Security']
    },
    {
      icon: Network,
      title: 'Network Security',
      description: 'Network protocols, distributed systems security, and blockchain interoperability.',
      topics: ['Protocol Security', 'Interoperability', 'Distributed Systems']
    }
  ];

  return (
    <section id="research" className="py-20 bg-muted">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Research Areas
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Research with hands-on experience in Blockchain and AI, focused on IoT, 
            medical data prediction, federated learning, and security issues in ML.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {researchAreas.map((area, index) => (
            <div key={index} className="bg-card rounded-xl shadow-card hover:shadow-elevated transition-all duration-300 p-6 group">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <area.icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground ml-4">
                  {area.title}
                </h3>
              </div>
              
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {area.description}
              </p>
              
              <div className="space-y-2">
                {area.topics.map((topic, topicIndex) => (
                  <span 
                    key={topicIndex}
                    className="inline-block bg-muted px-3 py-1 rounded-full text-sm text-foreground mr-2 mb-2"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchAreas;