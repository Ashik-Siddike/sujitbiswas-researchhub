import { MapPin, GraduationCap, Globe, Award, Calendar, Building } from 'lucide-react';

const About = () => {
  const education = [
    {
      degree: "PhD in Computer Science and Technology",
      institution: "Beijing Institute of Technology",
      year: "2019",
      location: "Beijing, China",
      focus: "Blockchain Technology, Cybersecurity, and Distributed Systems"
    }
  ];

  const experience = [
    {
      position: "Lecturer in Cybersecurity and FinTech",
      institution: "City-St. George's, University of London",
      period: "2024 - Present",
      location: "London, UK",
      description: "Teaching and research in cybersecurity, FinTech, and blockchain technologies."
    },
    {
      position: "Lecturer",
      institution: "University of East London",
      period: "2022 - 2023",
      location: "London, UK", 
      description: "Delivered courses in cybersecurity, network security, and computer science."
    },
    {
      position: "Research Associate (Honorary)",
      institution: "Centre for Blockchain Technology, UCL",
      period: "2022 - Present",
      location: "London, UK",
      description: "Ongoing research collaboration on blockchain technology and distributed systems."
    },
    {
      position: "Research Fellow",
      institution: "University of Surrey",
      period: "2021 - 2022",
      location: "Guildford, UK",
      description: "Advanced research in IoT security and blockchain applications."
    },
    {
      position: "Assistant Professor",
      institution: "University of Dhaka",
      period: "2018 - 2021",
      location: "Dhaka, Bangladesh",
      description: "Teaching and research in computer science and cybersecurity."
    },
    {
      position: "Lecturer",
      institution: "Jessore Polytechnic Institute",
      period: "2011 - 2018",
      location: "Jessore, Bangladesh",
      description: "Computer science education and technical training programs."
    }
  ];

  const languages = [
    { name: "Bengali", level: "Native" },
    { name: "English", level: "Fluent" },
    { name: "Chinese (Cantonese)", level: "Intermediate" },
    { name: "Hindi", level: "Conversational" }
  ];

  const honors = [
    "Most Distinguished Student Award - Beijing Institute of Technology (2019)",
    "Fellow, Higher Education Academy (FHEA), UK",
    "Senior Member, IEEE",
    "Life Member, Bangladesh Computer Society",
    "Editorial Board Member, MDPI Blockchains Journal"
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            About Me
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A passionate researcher and educator dedicated to advancing cybersecurity, 
            blockchain technology, and digital innovation through rigorous academic research and practical applications.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Personal Statement */}
          <div className="space-y-8">
            <div className="bg-card rounded-xl shadow-card p-6">
              <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center">
                <Building className="mr-3" size={24} />
                Research Philosophy
              </h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  I am a researcher with hands-on experience in Blockchain and AI, focused on IoT, medical data prediction, 
                  federated learning, and security issues in ML. With a PhD from Beijing Institute of Technology and 
                  extensive international experience, I bring a global perspective to cybersecurity research.
                </p>
                <p>
                  My research spans across multiple domains including blockchain technology, cybersecurity, FinTech innovation, 
                  and privacy-preserving machine learning. I am passionate about developing practical solutions that address 
                  real-world challenges while advancing theoretical understanding in these rapidly evolving fields.
                </p>
                <p>
                  Currently supervising 3 PhD students and 5 Masters students, I am committed to nurturing the next generation 
                  of researchers and practitioners in cybersecurity and emerging technologies through mentorship and collaborative research.
                </p>
              </div>
            </div>

            {/* Languages */}
            <div className="bg-card rounded-xl shadow-card p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                <Globe className="mr-3" size={20} />
                Languages
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {languages.map((lang, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-foreground">{lang.name}</span>
                    <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                      {lang.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Honors & Awards */}
            <div className="bg-card rounded-xl shadow-card p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                <Award className="mr-3" size={20} />
                Honors & Awards
              </h3>
              <div className="space-y-3">
                {honors.map((honor, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-muted-foreground">{honor}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Education & Experience */}
          <div className="space-y-8">
            {/* Education */}
            <div className="bg-card rounded-xl shadow-card p-6">
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <GraduationCap className="mr-3" size={24} />
                Education
              </h3>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div key={index} className="border-l-4 border-primary pl-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-semibold text-foreground">{edu.degree}</h4>
                      <span className="text-sm text-primary font-medium">{edu.year}</span>
                    </div>
                    <p className="text-foreground font-medium">{edu.institution}</p>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <MapPin size={14} className="mr-1" />
                      <span>{edu.location}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 italic">{edu.focus}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Professional Experience */}
            <div className="bg-card rounded-xl shadow-card p-6">
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <Calendar className="mr-3" size={24} />
                Professional Experience
              </h3>
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <div key={index} className="border-l-4 border-secondary pl-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-semibold text-foreground">{exp.position}</h4>
                      <span className="text-sm text-secondary font-medium">{exp.period}</span>
                    </div>
                    <p className="text-foreground font-medium">{exp.institution}</p>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <MapPin size={14} className="mr-1" />
                      <span>{exp.location}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;