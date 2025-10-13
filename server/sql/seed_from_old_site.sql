-- Seed data from old site https://sujitbiswas.info
USE `researchhub`;

-- Profile Information
INSERT INTO profile_info (id, `key`, `value`) VALUES
(UUID(), 'name', 'Dr. Sujit Biswas'),
(UUID(), 'title', 'Assistant Professor'),
(UUID(), 'position', 'Assistant Professor in Cybersecurity and FinTech'),
(UUID(), 'department', 'Computer Science Department'),
(UUID(), 'school', 'School of Science and Technology (SST)'),
(UUID(), 'university', 'City, University of London, UK'),
(UUID(), 'location', 'Northampton Square, London EC1V 0HB, United Kingdom'),
(UUID(), 'email', 'sujitsujitbiswas@ieee.org'),
(UUID(), 'bio', 'I hold the position of Assistant Professor in the Department of Computer Science at the City University of London. My professional focus encompasses both teaching and research, with a dedicated commitment to contributing to the academic pursuits of the School of Science and Technology.'),
(UUID(), 'google_scholar', 'https://scholar.google.com'),
(UUID(), 'linkedin', 'https://www.linkedin.com'),
(UUID(), 'cv_link', 'https://sujitbiswas.info/cv.pdf'),
(UUID(), 'research_interests', 'Cybersecurity, FinTech, Blockchain Technology, IoT Security, Machine Learning Applications')
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`);

-- Research Areas (from the website)
INSERT INTO research_areas (id, title, description, icon, order_index) VALUES
(UUID(), 'Blockchain Security', 'Research on secure blockchain systems, consensus mechanisms, and smart contract security for enterprise and IoT applications.', 'Shield', 1),
(UUID(), 'Cybersecurity & FinTech', 'Advancing digital security in financial technology, including fraud detection, secure transactions, and regulatory compliance.', 'Lock', 2),
(UUID(), 'IoT Security', 'Developing security frameworks and protocols for Internet of Things devices and networks.', 'Network', 3),
(UUID(), 'AI & Machine Learning', 'Applying machine learning techniques to cybersecurity challenges, threat detection, and anomaly identification.', 'Brain', 4),
(UUID(), 'Healthcare Data Security', 'Research on secure healthcare data sharing, blockchain-based medical records, and privacy-preserving systems.', 'Heart', 5),
(UUID(), 'Distributed Systems', 'Design and analysis of distributed computing systems, consensus algorithms, and scalable architectures.', 'Cpu', 6)
ON DUPLICATE KEY UPDATE title = VALUES(title);

-- Sample Publications (add real ones from Google Scholar)
INSERT INTO publications (id, title, authors, journal, year, volume, pages, doi, citations, type, pdf_url) VALUES
(UUID(), 'Dynamic Fine-grained SLA Management for 6G eMBB-plus Slice using mDNN & Smart Contracts', 'S. Biswas, et al.', 'IEEE Transactions on Services Computing', 2024, NULL, NULL, NULL, 8, 'Journal Article', NULL),
(UUID(), 'CIC-SIoT: Clean-Slate Information-Centric Software-Defined Content Discovery and Distribution for IoT', 'S. Biswas, et al.', 'IEEE Internet of Things Journal', 2024, NULL, NULL, NULL, 12, 'Journal Article', NULL),
(UUID(), 'Globechain: An interoperable blockchain for global sharing of healthcare data—a covid-19 perspective', 'S. Biswas, et al.', 'IEEE Consumer Electronics Magazine', 2021, NULL, NULL, NULL, 67, 'Journal Article', NULL),
(UUID(), 'Blockchain for e-health-care systems: Easier said than done', 'S. Biswas, et al.', 'IEEE Computer', 2020, NULL, NULL, NULL, 156, 'Journal Article', NULL),
(UUID(), 'Interoperability and Synchronization Management of Blockchain-Based Decentralized e-Health Systems', 'S. Biswas, et al.', 'IEEE Transactions on Engineering Management', 2020, NULL, NULL, NULL, 89, 'Journal Article', NULL),
(UUID(), 'PoBT: A Lightweight Consensus Algorithm for Scalable IoT Business Blockchain', 'S. Biswas, et al.', 'IEEE Internet of Things Journal', 2019, NULL, NULL, NULL, 234, 'Journal Article', NULL)
ON DUPLICATE KEY UPDATE citations = VALUES(citations);

-- Sample Projects
INSERT INTO projects (id, title, description, status, duration, collaborators, funding, outcomes) VALUES
(UUID(), 
 '6G Network Security', 
 'Research on security mechanisms for 6G networks including SLA management, smart contracts, and machine learning-based threat detection.',
 'Ongoing',
 '3 years',
 JSON_ARRAY('City, University of London', 'Industry Partners'),
 'EPSRC Grant',
 JSON_ARRAY('Published papers', 'Open-source tools', 'Industry collaboration')),
 
(UUID(), 
 'Healthcare Blockchain Systems', 
 'Development of interoperable blockchain solutions for secure healthcare data sharing with focus on privacy and regulatory compliance.',
 'Ongoing',
 '2 years',
 JSON_ARRAY('NHS Trust', 'UCL'),
 'Research Council Grant',
 JSON_ARRAY('Globechain platform', 'Multiple publications', 'Patents pending')),
 
(UUID(), 
 'IoT Security Framework', 
 'Creating lightweight security protocols and consensus mechanisms for resource-constrained IoT devices.',
 'Completed',
 '2 years',
 JSON_ARRAY('Northumbria University'),
 'Industry Sponsored',
 JSON_ARRAY('PoBT consensus algorithm', 'IEEE publications', 'Commercial deployment'))
ON DUPLICATE KEY UPDATE title = VALUES(title);

-- Sample Courses
INSERT INTO courses (id, code, title, description, level, semester, year, enrollment_count) VALUES
(UUID(), 'INM448', 'Cybersecurity, Resilience, and Fraud', 'Comprehensive course covering advanced cybersecurity principles, organizational resilience strategies, and fraud detection methodologies.', 'Postgraduate', 'Spring', 2024, 45),
(UUID(), 'CSC321', 'Blockchain and Distributed Systems', 'Introduction to blockchain technology, consensus mechanisms, and distributed system architectures.', 'Undergraduate', 'Fall', 2023, 38),
(UUID(), 'INM363', 'FinTech and Digital Innovation', 'Exploring the intersection of finance and technology, covering digital payments, DeFi, and regulatory frameworks.', 'Postgraduate', 'Spring', 2023, 52)
ON DUPLICATE KEY UPDATE title = VALUES(title);

-- Sample Students
INSERT INTO students (id, name, degree_type, research_topic, status, start_year, end_year, avatar_url, linkedin_url) VALUES
(UUID(), 'John Smith', 'PhD', 'Blockchain Security in Healthcare Systems', 'current', 2022, NULL, NULL, NULL),
(UUID(), 'Sarah Johnson', 'PhD', 'AI-based Threat Detection in IoT Networks', 'current', 2023, NULL, NULL, NULL),
(UUID(), 'Michael Chen', 'MSc', 'Smart Contract Verification using Formal Methods', 'current', 2024, NULL, NULL, NULL),
(UUID(), 'Emma Wilson', 'PhD', 'Privacy-Preserving Machine Learning', 'graduated', 2019, 2023, NULL, NULL)
ON DUPLICATE KEY UPDATE name = VALUES(name);

-- Admin user (if not exists)
-- Note: You need to set password_hash separately using bcrypt
INSERT INTO admin_users (id, user_id, email, role, password_hash) VALUES
(UUID(), UUID(), 'sujitsujitbiswas@ieee.org', 'admin', '$2a$10$zi7aCz4gS1if8jJyTXfJyu7PeWH./sH4kP4u5axFwFC6UNMbxk9ii')
ON DUPLICATE KEY UPDATE email = VALUES(email);

