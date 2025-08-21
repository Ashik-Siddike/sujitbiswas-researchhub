import { supabase } from '@/integrations/supabase/client';

// Research Areas Data
const researchAreasData = [
  {
    title: "Cybersecurity & Network Security",
    description: "Advanced research in cybersecurity, including network security, cryptography, threat detection, and secure communication protocols.",
    icon: "Shield",
    order_index: 0
  },
  {
    title: "Blockchain & FinTech",
    description: "Innovative research in blockchain technology, cryptocurrency, decentralized finance, and financial technology applications.",
    icon: "Database",
    order_index: 1
  },
  {
    title: "IoT Security & Privacy",
    description: "Research focusing on security and privacy challenges in Internet of Things devices, smart cities, and connected systems.",
    icon: "Network",
    order_index: 2
  },
  {
    title: "Machine Learning & AI Security",
    description: "Exploring the intersection of artificial intelligence, machine learning, and cybersecurity for robust defense systems.",
    icon: "Brain",
    order_index: 3
  },
  {
    title: "Digital Forensics",
    description: "Advanced digital forensics techniques, cybercrime investigation, and evidence preservation in digital environments.",
    icon: "Microscope",
    order_index: 4
  },
  {
    title: "Cloud Security",
    description: "Security challenges and solutions in cloud computing, multi-tenant environments, and distributed systems.",
    icon: "Cloud",
    order_index: 5
  }
];

// Publications Data
const publicationsData = [
  {
    title: "Advanced Threat Detection in IoT Networks Using Machine Learning",
    authors: "Sujit Biswas, Dr. Sarah Johnson, Prof. Michael Chen",
    journal: "IEEE Transactions on Network Security",
    year: 2024,
    type: "Journal Article",
    doi: "10.1109/TNS.2024.001234",
    citations: 15,
    volume: "15",
    pages: "45-62"
  },
  {
    title: "Blockchain-Based Secure Voting System: A Comprehensive Analysis",
    authors: "Sujit Biswas, Dr. Emily Rodriguez",
    journal: "International Conference on Blockchain Technology",
    year: 2023,
    type: "Conference Paper",
    doi: "10.1145/1234567.1234568",
    citations: 28,
    volume: "Proceedings",
    pages: "234-245"
  },
  {
    title: "Privacy-Preserving Machine Learning in Healthcare",
    authors: "Sujit Biswas, Dr. David Kim, Prof. Lisa Wang",
    journal: "ACM Transactions on Privacy and Security",
    year: 2023,
    type: "Journal Article",
    doi: "10.1145/1234567.1234569",
    citations: 42,
    volume: "26",
    pages: "1-25"
  },
  {
    title: "Cybersecurity Challenges in Smart Cities: A Systematic Review",
    authors: "Sujit Biswas, Dr. Robert Smith",
    journal: "Journal of Cybersecurity Research",
    year: 2022,
    type: "Review Paper",
    doi: "10.1000/cyber.2022.001",
    citations: 35,
    volume: "8",
    pages: "78-95"
  },
  {
    title: "Quantum-Resistant Cryptography for Financial Applications",
    authors: "Sujit Biswas, Dr. Maria Garcia, Prof. James Wilson",
    journal: "Financial Cryptography and Data Security",
    year: 2022,
    type: "Conference Paper",
    doi: "10.1007/978-3-030-12345-6_12",
    citations: 19,
    volume: "Proceedings",
    pages: "156-170"
  }
];

// Research Projects Data
const projectsData = [
  {
    title: "AI-Powered Cybersecurity Framework for Critical Infrastructure",
    description: "Developing an intelligent cybersecurity framework that uses machine learning to detect and respond to threats in real-time for critical infrastructure systems.",
    status: "In Progress",
    duration: "3 years",
    funding: "EPSRC, Industry Partners",
    collaborators: ["Imperial College London", "National Cyber Security Centre", "British Telecom"],
    outcomes: ["AI threat detection system", "Real-time response framework", "Industry deployment guidelines"]
  },
  {
    title: "Blockchain-Based Digital Identity Management System",
    description: "Creating a secure, decentralized digital identity system using blockchain technology for government and healthcare applications.",
    status: "Planning",
    duration: "2 years",
    funding: "Innovate UK, NHS Digital",
    collaborators: ["NHS Digital", "Government Digital Service", "University of Oxford"],
    outcomes: ["Digital identity protocol", "Privacy-preserving verification", "Government pilot program"]
  },
  {
    title: "IoT Security Assessment Framework",
    description: "Comprehensive security assessment framework for Internet of Things devices in smart home and industrial environments.",
    status: "Completed",
    duration: "18 months",
    funding: "Industry Consortium",
    collaborators: ["Samsung Electronics", "Bosch", "University of Cambridge"],
    outcomes: ["Security assessment toolkit", "Vulnerability database", "Best practice guidelines"]
  },
  {
    title: "Quantum-Safe Cryptography Implementation",
    description: "Implementing and testing post-quantum cryptographic algorithms for long-term security in financial and government systems.",
    status: "In Progress",
    duration: "2.5 years",
    funding: "EPSRC, Bank of England",
    collaborators: ["Bank of England", "GCHQ", "University of Bristol"],
    outcomes: ["Quantum-resistant algorithms", "Performance benchmarks", "Migration roadmap"]
  }
];

// Courses Data
const coursesData = [
  {
    code: "CS6001",
    title: "Advanced Cybersecurity",
    description: "Comprehensive course covering advanced cybersecurity concepts, threat modeling, penetration testing, and security architecture.",
    level: "Postgraduate",
    semester: "Autumn",
    year: 2024,
    enrollment_count: 45
  },
  {
    code: "CS6002",
    title: "Blockchain Technology & Applications",
    description: "Introduction to blockchain technology, smart contracts, decentralized applications, and their real-world applications.",
    level: "Postgraduate",
    semester: "Spring",
    year: 2024,
    enrollment_count: 38
  },
  {
    code: "CS5001",
    title: "Network Security Fundamentals",
    description: "Core concepts of network security, including protocols, encryption, authentication, and network defense strategies.",
    level: "Undergraduate",
    semester: "Autumn",
    year: 2024,
    enrollment_count: 62
  },
  {
    code: "CS5002",
    title: "Digital Forensics",
    description: "Principles and practices of digital forensics, evidence collection, analysis techniques, and legal considerations.",
    level: "Undergraduate",
    semester: "Spring",
    year: 2024,
    enrollment_count: 41
  },
  {
    code: "CS7001",
    title: "Research Methods in Cybersecurity",
    description: "Advanced research methodologies, statistical analysis, and experimental design for cybersecurity research.",
    level: "PhD",
    semester: "Full Year",
    year: 2024,
    enrollment_count: 12
  }
];

// Students Data
const studentsData = [
  {
    name: "Ahmed Hassan",
    degree_type: "PhD",
    research_topic: "Machine Learning for Intrusion Detection in Industrial Control Systems",
    start_year: 2022,
    status: "Current",
    avatar_url: null,
    linkedin_url: "https://linkedin.com/in/ahmed-hassan-cyber"
  },
  {
    name: "Priya Patel",
    degree_type: "MSc",
    research_topic: "Privacy-Preserving Blockchain for Healthcare Data Sharing",
    start_year: 2023,
    status: "Current",
    avatar_url: null,
    linkedin_url: "https://linkedin.com/in/priya-patel-blockchain"
  },
  {
    name: "Carlos Rodriguez",
    degree_type: "PhD",
    research_topic: "Quantum-Resistant Cryptography for Financial Systems",
    start_year: 2021,
    status: "Current",
    avatar_url: null,
    linkedin_url: "https://linkedin.com/in/carlos-rodriguez-crypto"
  },
  {
    name: "Sarah Thompson",
    degree_type: "MSc",
    research_topic: "IoT Security Assessment Framework for Smart Cities",
    start_year: 2023,
    status: "Current",
    avatar_url: null,
    linkedin_url: "https://linkedin.com/in/sarah-thompson-iot"
  },
  {
    name: "Dr. James Wilson",
    degree_type: "PostDoc",
    research_topic: "Advanced Threat Intelligence and Sharing",
    start_year: 2022,
    end_year: 2024,
    status: "Graduated",
    avatar_url: null,
    linkedin_url: "https://linkedin.com/in/james-wilson-phd"
  },
  {
    name: "Dr. Maria Garcia",
    degree_type: "PhD",
    research_topic: "Secure Multi-Party Computation for Privacy-Preserving Analytics",
    start_year: 2019,
    end_year: 2023,
    status: "Graduated",
    avatar_url: null,
    linkedin_url: "https://linkedin.com/in/maria-garcia-phd"
  }
];

// Profile Information Data
const profileInfoData = [
  {
    key: "name",
    value: "Dr. Sujit Biswas"
  },
  {
    key: "title",
    value: "Senior Lecturer in Cybersecurity & FinTech"
  },
  {
    key: "institution",
    value: "City, University of London"
  },
  {
    key: "department",
    value: "Department of Computer Science"
  },
  {
    key: "email",
    value: "sujit.biswas@city.ac.uk"
  },
  {
    key: "phone",
    value: "+44 (0) 20 7040 8000"
  },
  {
    key: "office",
    value: "Room 3001, College Building"
  },
  {
    key: "address",
    value: "Northampton Square, London EC1V 0HB, United Kingdom"
  },
  {
    key: "research_interests",
    value: "Cybersecurity, Blockchain Technology, FinTech, IoT Security, Machine Learning, Digital Forensics"
  },
  {
    key: "biography",
    value: "Dr. Sujit Biswas is a Senior Lecturer in Cybersecurity & FinTech at City, University of London. With over 15 years of experience in cybersecurity research and industry practice, he specializes in blockchain technology, IoT security, and machine learning applications in cybersecurity. He has published extensively in top-tier journals and conferences, and has led numerous research projects funded by EPSRC, Innovate UK, and industry partners."
  },
  {
    key: "education",
    value: "PhD in Computer Science (University of Cambridge), MSc in Information Security (Royal Holloway), BSc in Computer Science (University of London)"
  },
  {
    key: "experience",
    value: "Senior Lecturer at City University London (2020-Present), Research Scientist at GCHQ (2018-2020), Security Consultant at Deloitte (2015-2018)"
  },
  {
    key: "awards",
    value: "Best Paper Award at IEEE S&P 2023, Outstanding Researcher Award at City University London 2022, EPSRC Early Career Fellowship 2021"
  },
  {
    key: "professional_memberships",
    value: "IEEE, ACM, BCS, IET, ISC2"
  },
  {
    key: "social_media",
    value: "LinkedIn: linkedin.com/in/sujitbiswas, Twitter: @sujitbiswas, ResearchGate: researchgate.net/profile/sujit-biswas"
  }
];

export async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await supabase.from('students').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('courses').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('projects').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('publications').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('research_areas').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('profile_info').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    // Insert Research Areas
    console.log('🔬 Inserting Research Areas...');
    const { data: researchAreas, error: raError } = await supabase
      .from('research_areas')
      .insert(researchAreasData)
      .select();
    
    if (raError) throw raError;
    console.log(`✅ Inserted ${researchAreas.length} research areas`);

    // Insert Publications
    console.log('📚 Inserting Publications...');
    const { data: publications, error: pubError } = await supabase
      .from('publications')
      .insert(publicationsData)
      .select();
    
    if (pubError) throw pubError;
    console.log(`✅ Inserted ${publications.length} publications`);

    // Insert Projects
    console.log('🚀 Inserting Research Projects...');
    const { data: projects, error: projError } = await supabase
      .from('projects')
      .insert(projectsData)
      .select();
    
    if (projError) throw projError;
    console.log(`✅ Inserted ${projects.length} projects`);

    // Insert Courses
    console.log('🎓 Inserting Courses...');
    const { data: courses, error: courseError } = await supabase
      .from('courses')
      .insert(coursesData)
      .select();
    
    if (courseError) throw courseError;
    console.log(`✅ Inserted ${courses.length} courses`);

    // Insert Students
    console.log('👥 Inserting Students...');
    const { data: students, error: studentError } = await supabase
      .from('students')
      .insert(studentsData)
      .select();
    
    if (studentError) throw studentError;
    console.log(`✅ Inserted ${students.length} students`);

    // Insert Profile Info
    console.log('👤 Inserting Profile Information...');
    const { data: profileInfo, error: profileError } = await supabase
      .from('profile_info')
      .insert(profileInfoData)
      .select();
    
    if (profileError) throw profileError;
    console.log(`✅ Inserted ${profileInfo.length} profile info items`);

    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Research Areas: ${researchAreas.length}`);
    console.log(`   Publications: ${publications.length}`);
    console.log(`   Projects: ${projects.length}`);
    console.log(`   Courses: ${courses.length}`);
    console.log(`   Students: ${students.length}`);
    console.log(`   Profile Info: ${profileInfo.length}`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

// Run the seeding function if this file is executed directly
if (typeof window === 'undefined') {
  seedDatabase().catch(console.error);
}

