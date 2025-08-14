import { MapPin, GraduationCap, Globe, Award, Calendar, Building } from 'lucide-react';

const About = () => {
  const education = [
    {
      degree: "PhD in Computer Science",
      institution: "Beijing Institute of Technology",
      year: "2019",
      location: "Beijing, China",
      focus: "Distributed Systems and Network Security"
    },
    {
      degree: "MSc in Computer Science",
      institution: "University of Dhaka",
      year: "2015",
      location: "Dhaka, Bangladesh",
      focus: "Software Engineering and Data Security"
    },
    {
      degree: "BSc in Computer Science and Engineering",
      institution: "University of Dhaka",
      year: "2013",
      location: "Dhaka, Bangladesh",
      focus: "Computer Systems and Programming"
    }
  ];

  const experience = [
    {
      position: "Assistant Professor",
      institution: "City, University of London",
      period: "2023 - Present",
      location: "London, UK",
      description: "Teaching and research in cybersecurity, FinTech, and blockchain technologies."
    },
    {
      position: "Research Fellow",
      institution: "University College London (UCL)",
      period: "2022 - 2023",
      location: "London, UK",
      description: "Conducted research on privacy-preserving technologies and secure distributed systems."
    },
    {
      position: "Lecturer in Computer Science",
      institution: "University of East London",
      period: "2020 - 2022",
      location: "London, UK", 
      description: "Delivered courses in cybersecurity, network security, and software engineering."
    },
    {
      position: "Assistant Professor",
      institution: "University of Surrey",
      period: "2019 - 2020",
      location: "Guildford, UK",
      description: "Research and teaching in IoT security and blockchain applications."
    }
  ];

  const languages = [
    { name: "Bengali", level: "Native" },
    { name: "English", level: "Fluent" },
    { name: "Chinese (Mandarin)", level: "Intermediate" },
    { name: "Hindi", level: "Conversational" }
  ];

  const honors = [
    "Best Paper Award - IEEE INFOCOM 2022",
    "Early Career Researcher Award - Royal Society 2021",
    "Outstanding Teaching Award - University of East London 2021",
    "Young Scientist Award - China-UK Science Bridge 2020",
    "Excellence in Research Award - University of Surrey 2019"
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
                  My research journey began with a fascination for how technology can solve real-world security challenges. 
                  With a PhD from Beijing Institute of Technology and extensive experience across multiple institutions, 
                  I bring a global perspective to cybersecurity research.
                </p>
                <p>
                  I believe in bridging the gap between theoretical research and practical applications. My work focuses on 
                  developing innovative solutions that not only advance academic knowledge but also address pressing industry needs 
                  in cybersecurity, blockchain technology, and emerging digital systems.
                </p>
                <p>
                  As an educator, I am committed to inspiring the next generation of cybersecurity professionals through 
                  hands-on learning, critical thinking, and exposure to cutting-edge research methodologies.
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