import { GraduationCap, Calendar, Users, Download, BookOpen } from 'lucide-react';

const Teaching = () => {
  const courses = [
    {
      code: "INM 448",
      title: "Cybersecurity, Resilience, and Fraud",
      term: "Spring 2024",
      level: "Postgraduate",
      students: 45,
      description: "Comprehensive course covering advanced cybersecurity principles, organizational resilience strategies, and fraud detection methodologies.",
      topics: [
        "Advanced Threat Detection",
        "Incident Response Planning",
        "Fraud Analytics",
        "Risk Assessment",
        "Business Continuity",
        "Digital Forensics"
      ],
      materials: [
        "Course Syllabus",
        "Lecture Slides",
        "Lab Exercises",
        "Reading List"
      ]
    },
    {
      code: "CSC 321",
      title: "Blockchain and Distributed Systems",
      term: "Fall 2023",
      level: "Undergraduate",
      students: 38,
      description: "Introduction to blockchain technology, consensus mechanisms, and distributed system architectures.",
      topics: [
        "Blockchain Fundamentals",
        "Consensus Algorithms",
        "Smart Contracts",
        "Distributed Computing",
        "Cryptographic Protocols",
        "System Architecture"
      ],
      materials: [
        "Course Syllabus",
        "Programming Assignments",
        "Project Guidelines",
        "Exam Materials"
      ]
    },
    {
      code: "INM 363",
      title: "FinTech and Digital Innovation",
      term: "Spring 2023",
      level: "Postgraduate",
      students: 52,
      description: "Exploring the intersection of finance and technology, covering digital payments, DeFi, and regulatory frameworks.",
      topics: [
        "Digital Payment Systems",
        "Decentralized Finance",
        "RegTech Solutions",
        "Financial APIs",
        "Central Bank Digital Currencies",
        "Risk Management"
      ],
      materials: [
        "Industry Case Studies",
        "Guest Lecture Recordings",
        "Research Papers",
        "Project Templates"
      ]
    }
  ];

  const teachingPhilosophy = {
    title: "Teaching Philosophy",
    description: "I believe in creating an engaging, hands-on learning environment where theoretical concepts are reinforced through practical applications. My teaching approach emphasizes critical thinking, problem-solving, and real-world relevance.",
    principles: [
      "Interactive learning through case studies and projects",
      "Integration of current industry practices and research",
      "Encouraging innovation and creative problem-solving",
      "Building strong foundations in cybersecurity principles"
    ]
  };

  return (
    <section id="teaching" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Teaching
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Educating the next generation of cybersecurity professionals and technology leaders 
            through innovative curriculum and hands-on learning experiences.
          </p>
        </div>

        {/* Current Courses */}
        <div className="max-w-6xl mx-auto mb-16">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Current Courses</h3>
          
          <div className="grid lg:grid-cols-1 gap-8">
            {courses.map((course, index) => (
              <div key={index} className="bg-card rounded-xl shadow-card hover:shadow-elevated transition-all duration-300 p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <GraduationCap size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-foreground">
                        {course.code}: {course.title}
                      </h4>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                        <div className="flex items-center space-x-1">
                          <Calendar size={16} />
                          <span>{course.term}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users size={16} />
                          <span>{course.students} students</span>
                        </div>
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                          {course.level}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {course.description}
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-foreground mb-3">Course Topics:</h5>
                    <div className="space-y-2">
                      {course.topics.map((topic, topicIndex) => (
                        <div key={topicIndex} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-muted-foreground text-sm">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-semibold text-foreground mb-3">Course Materials:</h5>
                    <div className="space-y-2">
                      {course.materials.map((material, materialIndex) => (
                        <button 
                          key={materialIndex}
                          className="flex items-center space-x-2 text-primary hover:text-primary-deep transition-colors text-sm w-full text-left"
                        >
                          <Download size={16} />
                          <span>{material}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Teaching Philosophy */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-muted rounded-xl p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mr-4">
                <BookOpen size={24} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">{teachingPhilosophy.title}</h3>
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              {teachingPhilosophy.description}
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {teachingPhilosophy.principles.map((principle, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">{index + 1}</span>
                  </div>
                  <span className="text-foreground">{principle}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Teaching;