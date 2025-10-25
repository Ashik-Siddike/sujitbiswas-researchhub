-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 25, 2025 at 08:33 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `researchhub`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_users`
--

CREATE TABLE `admin_users` (
  `id` char(36) NOT NULL DEFAULT uuid(),
  `user_id` char(36) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` varchar(50) NOT NULL DEFAULT 'admin',
  `password_hash` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin_users`
--

INSERT INTO `admin_users` (`id`, `user_id`, `email`, `role`, `password_hash`, `created_at`) VALUES
('c22e4706-a870-11f0-9fb5-74d4dd4ea204', 'c22e4718-a870-11f0-9fb5-74d4dd4ea204', 'sujitsujitbiswas@ieee.org', 'admin', '$2a$10$zi7aCz4gS1if8jJyTXfJyu7PeWH./sH4kP4u5axFwFC6UNMbxk9ii', '2025-10-13 20:11:09'),
('ea5a0e4a-a81b-11f0-853c-74d4dd4ea204', 'ea5a0e5f-a81b-11f0-853c-74d4dd4ea204', 'sujitsujitbiswas@ieee.org', 'admin', '$2a$10$zi7aCz4gS1if8jJyTXfJyu7PeWH./sH4kP4u5axFwFC6UNMbxk9ii', '2025-10-13 10:03:49');

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` char(36) NOT NULL DEFAULT uuid(),
  `code` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `level` varchar(50) NOT NULL,
  `semester` varchar(50) NOT NULL,
  `year` int(11) NOT NULL,
  `enrollment_count` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `code`, `title`, `description`, `level`, `semester`, `year`, `enrollment_count`, `created_at`, `updated_at`) VALUES
('c228f5aa-a870-11f0-9fb5-74d4dd4ea204', 'INM448', 'Cybersecurity, Resilience, and Fraud', 'Comprehensive course covering advanced cybersecurity principles, organizational resilience strategies, and fraud detection methodologies.', 'Postgraduate', 'Spring', 2024, 45, '2025-10-13 20:11:09', '2025-10-13 20:11:09'),
('c22901a8-a870-11f0-9fb5-74d4dd4ea204', 'CSC321', 'Blockchain and Distributed Systems', 'Introduction to blockchain technology, consensus mechanisms, and distributed system architectures.', 'Undergraduate', 'Fall', 2023, 38, '2025-10-13 20:11:09', '2025-10-13 20:11:09'),
('c2290249-a870-11f0-9fb5-74d4dd4ea204', 'INM363', 'FinTech and Digital Innovation', 'Exploring the intersection of finance and technology, covering digital payments, DeFi, and regulatory frameworks.', 'Postgraduate', 'Spring', 2023, 52, '2025-10-13 20:11:09', '2025-10-13 20:11:09');

-- --------------------------------------------------------

--
-- Table structure for table `profile_info`
--

CREATE TABLE `profile_info` (
  `id` char(36) NOT NULL DEFAULT uuid(),
  `key` varchar(100) NOT NULL,
  `value` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `profile_info`
--

INSERT INTO `profile_info` (`id`, `key`, `value`, `created_at`, `updated_at`) VALUES
('c21d13f4-a870-11f0-9fb5-74d4dd4ea204', 'name', 'Dr. Sujit Biswas', '2025-10-13 20:11:09', '2025-10-13 20:11:09'),
('c21fb9fd-a870-11f0-9fb5-74d4dd4ea204', 'title', 'Assistant Professor', '2025-10-13 20:11:09', '2025-10-13 20:11:09'),
('c21fbc7d-a870-11f0-9fb5-74d4dd4ea204', 'position', 'Assistant Professor in Cybersecurity and FinTech', '2025-10-13 20:11:09', '2025-10-13 20:11:09'),
('c21fbccb-a870-11f0-9fb5-74d4dd4ea204', 'department', 'Computer Science Department', '2025-10-13 20:11:09', '2025-10-13 20:11:09'),
('c21fbcfe-a870-11f0-9fb5-74d4dd4ea204', 'school', 'School of Science and Technology (SST)', '2025-10-13 20:11:09', '2025-10-13 20:11:09'),
('c21fbd34-a870-11f0-9fb5-74d4dd4ea204', 'university', 'City, University of London, UK', '2025-10-13 20:11:09', '2025-10-13 20:11:09'),
('c21fbd61-a870-11f0-9fb5-74d4dd4ea204', 'location', 'Northampton Square, London EC1V 0HB, United Kingdom', '2025-10-13 20:11:09', '2025-10-13 20:11:09'),
('c21fbd8a-a870-11f0-9fb5-74d4dd4ea204', 'email', 'sujitsujitbiswas@ieee.org', '2025-10-13 20:11:09', '2025-10-13 20:11:09'),
('c21fbdd5-a870-11f0-9fb5-74d4dd4ea204', 'bio', 'I hold the position of Assistant Professor in the Department of Computer Science at the City University of London. My professional focus encompasses both teaching and research, with a dedicated commitment to contributing to the academic pursuits of the School of Science and Technology.', '2025-10-13 20:11:09', '2025-10-13 20:11:09'),
('c21fbe23-a870-11f0-9fb5-74d4dd4ea204', 'google_scholar', 'https://scholar.google.com', '2025-10-13 20:11:09', '2025-10-13 20:11:09'),
('c21fbe4f-a870-11f0-9fb5-74d4dd4ea204', 'linkedin', 'https://www.linkedin.com', '2025-10-13 20:11:09', '2025-10-13 20:11:09'),
('c21fbe7d-a870-11f0-9fb5-74d4dd4ea204', 'cv_link', 'https://sujitbiswas.info/cv.pdf', '2025-10-13 20:11:09', '2025-10-13 20:11:09'),
('c21fbea7-a870-11f0-9fb5-74d4dd4ea204', 'research_interests', 'Cybersecurity, FinTech, Blockchain Technology, IoT Security, Machine Learning Applications', '2025-10-13 20:11:09', '2025-10-13 20:11:09');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` char(36) NOT NULL DEFAULT uuid(),
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'ongoing',
  `duration` varchar(100) NOT NULL,
  `collaborators` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT json_array() CHECK (json_valid(`collaborators`)),
  `funding` varchar(255) NOT NULL,
  `outcomes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT json_array() CHECK (json_valid(`outcomes`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `title`, `description`, `status`, `duration`, `collaborators`, `funding`, `outcomes`, `created_at`, `updated_at`) VALUES
('c2266cda-a870-11f0-9fb5-74d4dd4ea204', '6G Network Security', 'Research on security mechanisms for 6G networks including SLA management, smart contracts, and machine learning-based threat detection.', 'Ongoing', '3 years', '[\"City, University of London\", \"Industry Partners\"]', 'EPSRC Grant', '[\"Published papers\", \"Open-source tools\", \"Industry collaboration\"]', '2025-10-13 20:11:09', '2025-10-13 20:11:09'),
('c22679ad-a870-11f0-9fb5-74d4dd4ea204', 'Healthcare Blockchain Systems', 'Development of interoperable blockchain solutions for secure healthcare data sharing with focus on privacy and regulatory compliance.', 'Ongoing', '2 years', '[\"NHS Trust\", \"UCL\"]', 'Research Council Grant', '[\"Globechain platform\", \"Multiple publications\", \"Patents pending\"]', '2025-10-13 20:11:09', '2025-10-13 20:11:09'),
('c2267a75-a870-11f0-9fb5-74d4dd4ea204', 'IoT Security Framework', 'Creating lightweight security protocols and consensus mechanisms for resource-constrained IoT devices.', 'Completed', '2 years', '[\"Northumbria University\"]', 'Industry Sponsored', '[\"PoBT consensus algorithm\", \"IEEE publications\", \"Commercial deployment\"]', '2025-10-13 20:11:09', '2025-10-13 20:11:09');

-- --------------------------------------------------------

--
-- Table structure for table `publications`
--

CREATE TABLE `publications` (
  `id` char(36) NOT NULL DEFAULT uuid(),
  `title` varchar(500) NOT NULL,
  `authors` text NOT NULL,
  `journal` varchar(255) NOT NULL,
  `year` int(11) NOT NULL,
  `volume` varchar(100) DEFAULT NULL,
  `pages` varchar(100) DEFAULT NULL,
  `doi` varchar(255) DEFAULT NULL,
  `citations` int(11) DEFAULT 0,
  `type` varchar(100) DEFAULT 'journal',
  `pdf_url` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `publications`
--

INSERT INTO `publications` (`id`, `title`, `authors`, `journal`, `year`, `volume`, `pages`, `doi`, `citations`, `type`, `pdf_url`, `created_at`, `updated_at`) VALUES
('eb4c51bc-a872-11f0-9fb5-74d4dd4ea204', 'Nature-based Bengali Picture Captioning using Global Attention with GRU', 'Fatema Tuz Zohora, Sujit Biswas, Anupam Kumar Bairagi, Kashif Sharit', '2024 IEEE 34th International Workshop on Machine Learning for Signal Processing (MLSP)', 2024, NULL, NULL, NULL, 0, 'Conference Paper', 'https://ieeexplore.ieee.org/abstract/document/10734813/', '2025-10-13 20:26:37', '2025-10-13 20:26:37'),
('eb4c5480-a872-11f0-9fb5-74d4dd4ea204', 'Enhancing machine learning-based forecasting of chronic renal disease with explainable AI', 'Sanjana Singamsetty, Swetha Ghanta, Sujit Biswas, Ashok Pradhan', 'PeerJ Computer Science', 2024, NULL, NULL, NULL, 0, 'Journal Article', 'https://peerj.com/articles/cs-2291/', '2025-10-13 20:26:37', '2025-10-13 20:26:37'),
('eb4c54d2-a872-11f0-9fb5-74d4dd4ea204', 'Dynamic Fine-grained SLA Management for 6G eMBB-plus Slice using mDNN & Smart Contracts', 'Sadaf Bukhari, Kashif Sharif, Liehuang Zhu, Chang Xu, Fan Li, Sujit Biswas', 'IEEE Transactions on Services Computing', 2024, NULL, NULL, NULL, 8, 'Journal Article', 'https://ieeexplore.ieee.org/abstract/document/10663940/', '2025-10-13 20:26:37', '2025-10-13 20:26:37'),
('eb4c5503-a872-11f0-9fb5-74d4dd4ea204', 'CIC-SIoT: Clean-Slate Information-Centric Software-Defined Content Discovery and Distribution for Internet-of-Things', 'Md Monjurul Karim, Kashif Sharif, Sujit Biswas, Zohaib Latif, Qiang Qu, Fan Li', 'IEEE Internet of Things Journal', 2024, NULL, NULL, NULL, 12, 'Journal Article', 'https://ieeexplore.ieee.org/abstract/document/10633277/', '2025-10-13 20:26:37', '2025-10-13 20:26:37'),
('eb4c552c-a872-11f0-9fb5-74d4dd4ea204', 'A Reliable Zero-Trust Network for Task Offloading in Vehicular Systems Using an Asynchronous Federated Learning Approach in 6G', 'Prakhar Consul, Neeraj Joshi, Ishan Budhiraja, Sujit Biswas, Neeraj Kumar, Sachin Sharma, Ajith Abraham', 'Proceedings of the SIGCOMM Workshop on Zero Trust Architecture for Next Generation Communications', 2024, NULL, NULL, NULL, 0, 'Conference Paper', 'https://dl.acm.org/doi/abs/10.1145/3672200.3673877', '2025-10-13 20:26:37', '2025-10-13 20:26:37'),
('eb4c5562-a872-11f0-9fb5-74d4dd4ea204', 'TumorGANet: A Transfer Learning and Generative Adversarial Network-Based Data Augmentation Model for Brain Tumor Classification', 'Anindya Nag, Hirak Mondal, Md Mehedi Hassan, Taher Al-Shehari, Mohammed Kadrie, Muna Al-Razgan, Taha Alfakih, Sujit Biswas, Anupam Kumar Bairagi', 'IEEE Access', 2024, NULL, NULL, NULL, 0, 'Journal Article', 'https://ieeexplore.ieee.org/abstract/document/10600471/', '2025-10-13 20:26:37', '2025-10-13 20:26:37'),
('eb4c55de-a872-11f0-9fb5-74d4dd4ea204', 'MpoxSLDNet: A Novel CNN Model for Detecting Monkeypox Lesions and Performance Comparison with Pre-trained Models', 'Fatema Jannat Dihan, Saydul Akbar Murad, Abu Jafar Md Muzahid, KM Uddin, Mohammed JF Alenazi, Anupam Kumar Bairagi, Sujit Biswas', 'arXiv preprint arXiv:2405.21016', 2024, NULL, NULL, NULL, 0, 'Preprint', 'https://arxiv.org/abs/2405.21016', '2025-10-13 20:26:37', '2025-10-13 20:26:37'),
('eb4c560a-a872-11f0-9fb5-74d4dd4ea204', 'Prediction of RNA Secondary Structure Using Butterfly Optimization Algorithm', 'Sajib Chatterjee, Rameswar Debnath, Sujit Biswas, Anupam Kumar Bairagi', 'Human-Centric Intelligent Systems', 2024, NULL, NULL, '10.1007/s44230-024-00062-6', 0, 'Journal Article', 'https://link.springer.com/article/10.1007/s44230-024-00062-6', '2025-10-13 20:26:37', '2025-10-13 20:26:37'),
('eb4c5638-a872-11f0-9fb5-74d4dd4ea204', 'An Optimized and Scalable Blockchain-Based Distributed Learning Platform for Consumer IoT', 'Zhaocheng Wang, Xueying Liu, Xinming Shao, Abdullah Alghamdi, Mesfer Alrizq, Md Shirajum Munir, Sujit Biswas', 'Mathematics', 2023, NULL, NULL, NULL, 0, 'Journal Article', 'https://www.mdpi.com/2227-7390/11/23/4844', '2025-10-13 20:26:37', '2025-10-13 20:26:37'),
('eb4c565a-a872-11f0-9fb5-74d4dd4ea204', 'Challenges in Blockchain as a Solution for IoT Ecosystem Threats and Access Control: A Survey', 'Suranjeet Chowdhury Avik, Sujit Biswas, Md Atiqur Rahaman Ahad, Zohaib Latif, Abdullah Alghamdi, Hamad Abosaq, Anupam Kumar Bairagi', 'arXiv preprint arXiv:2311.15290', 2023, NULL, NULL, NULL, 0, 'Preprint', 'https://arxiv.org/abs/2311.15290', '2025-10-13 20:26:37', '2025-10-13 20:26:37'),
('eb4c5676-a872-11f0-9fb5-74d4dd4ea204', 'Routing protocols in vehicular adhoc networks (vanets): A comprehensive survey', 'Muhammad Sohail, Zohaib Latif, Shahzeb Javed, Sujit Biswas, Sahar Ajmal, Umer Iqbal, Mohsin Raza', 'Internet of things', 2023, NULL, NULL, NULL, 0, 'Journal Article', 'https://www.sciencedirect.com/science/article/pii/S2542660523001609', '2025-10-13 20:26:37', '2025-10-13 20:26:37'),
('eb4c5697-a872-11f0-9fb5-74d4dd4ea204', 'Impact learning: A learning method from feature\'s impact and competition', 'Nusrat Jahan Prottasha, Saydul Akbar Murad, Abu Jafar Md Muzahid, Masud Rana, Md Kowsher, Apurba Adhikary, Sujit Biswas, Anupam Kumar Bairagi', 'Journal of Computational Science', 2023, NULL, NULL, NULL, 0, 'Journal Article', 'https://www.sciencedirect.com/science/article/pii/S1877750323000716', '2025-10-13 20:26:37', '2025-10-13 20:26:37'),
('eb4c56c1-a872-11f0-9fb5-74d4dd4ea204', 'Interoperability benefits and challenges in smart city services: Blockchain as a solution', 'Sujit Biswas, Zigang Yao, Lin Yan, Abdulmajeed Alqhatani, Anupam Kumar Bairagi, Fatima Asiri, Mehedi Masud', 'Electronics', 2023, NULL, NULL, NULL, 0, 'Journal Article', 'https://www.mdpi.com/2079-9292/12/4/1036', '2025-10-13 20:26:37', '2025-10-13 20:26:37'),
('eb4c56e0-a872-11f0-9fb5-74d4dd4ea204', 'A Machine Learning-Based Anomaly Prediction Service for Software-Defined Networks', 'Zohaib Latif, Qasim Umer, Choonhwa Lee, Kashif Sharif, Fan Li, Sujit Biswas', 'Sensors', 2022, NULL, NULL, NULL, 0, 'Journal Article', 'https://www.mdpi.com/1424-8220/22/21/8434', '2025-10-13 20:26:37', '2025-10-13 20:26:37'),
('eb4c56fd-a872-11f0-9fb5-74d4dd4ea204', 'Blockchain empowered federated learning ecosystem for securing consumer IoT features analysis', 'Abdullah Alghamdi, Jiang Zhu, Guocai Yin, Mohammad Shorfuzzaman, Nawal Alsufyani, Sultan Alyami, Sujit Biswas', 'Sensors', 2022, NULL, NULL, NULL, 0, 'Journal Article', 'https://www.mdpi.com/1424-8220/22/18/6786', '2025-10-13 20:26:37', '2025-10-13 20:26:37'),
('eb4c5719-a872-11f0-9fb5-74d4dd4ea204', 'Function Virtualization Can Play a Great Role in Blockchain Consensus', 'Jun Wang, Jiang Zhu, Minghui Zhang, Iqbal Alam, Sujit Biswas', 'IEEE Access', 2022, NULL, NULL, NULL, 0, 'Journal Article', 'https://ieeexplore.ieee.org/abstract/document/9777983/', '2025-10-13 20:26:37', '2025-10-13 20:26:37'),
('eb4c5735-a872-11f0-9fb5-74d4dd4ea204', 'Blockchain bridges critical national infrastructures: E-healthcare data migration perspective', 'Yiying Liu, Guangxing Shan, Yucheng Liu, Abdullah Alghamdi, Iqbal Alam, Sujit Biswas', 'IEEE Access', 2022, NULL, NULL, NULL, 0, 'Journal Article', 'https://ieeexplore.ieee.org/abstract/document/9727100/', '2025-10-13 20:26:37', '2025-10-13 20:26:37'),
('eb4c5754-a872-11f0-9fb5-74d4dd4ea204', 'Data-Driven Decision Making for Smart Cultivation', 'Puspendu Biswas Paul, Sujit Biswas, Anupam Kumar Bairagi, Mehedi Masud', '2021 IEEE International Symposium on Smart Electronic Systems (iSES)', 2021, NULL, NULL, NULL, 0, 'Conference Paper', 'https://ieeexplore.ieee.org/abstract/document/9701148/', '2025-10-13 20:26:37', '2025-10-13 20:26:37'),
('eb4c5770-a872-11f0-9fb5-74d4dd4ea204', 'ACC: Blockchain Based Trusted Management of Academic Credentials', 'Md Suman Reza, Sujit Biswas, Abdullah Alghamdi, Mesfer Alrizq, Anupam Kumar Bairagi, Mehedi Masud', '2021 IEEE International Symposium on Smart Electronic Systems (iSES)', 2021, NULL, NULL, NULL, 0, 'Conference Paper', 'https://ieeexplore.ieee.org/abstract/document/9700999/', '2025-10-13 20:26:37', '2025-10-13 20:26:37'),
('eb4c578f-a872-11f0-9fb5-74d4dd4ea204', 'Globechain: An interoperable blockchain for global sharing of healthcare data—a covid-19 perspective', 'Sujit Biswas, Kashif Sharif, Fan Li, Anupam Kumar Bairagi, Zohaib Latif, Saraju P Mohanty', 'IEEE Consumer Electronics Magazine', 2021, NULL, NULL, NULL, 67, 'Journal Article', 'https://ieeexplore.ieee.org/abstract/document/9416228/', '2025-10-13 20:26:37', '2025-10-13 20:26:37'),
('eb4c57ad-a872-11f0-9fb5-74d4dd4ea204', 'DOLPHIN: Dynamically optimized and load balanced path for inter-domain SDN communication', 'Zohaib Latif, Kashif Sharif, Fan Li, Md Monjurul Karim, Sujit Biswas, Madiha Shahzad, Saraju P Mohanty', 'IEEE Transactions on Network and Service Management', 2020, NULL, NULL, NULL, 0, 'Journal Article', 'https://ieeexplore.ieee.org/abstract/document/9298882/', '2025-10-13 20:26:37', '2025-10-13 20:26:37'),
('eb4c57cb-a872-11f0-9fb5-74d4dd4ea204', 'Controlling the outbreak of COVID-19: A noncooperative game perspective', 'Anupam Kumar Bairagi, Mehedi Masud, Md Shirajum Munir, Abdullah-Al Nahid, Sarder Fakhrul Abedin, Kazi Masudul Alam, Sujit Biswas, Sultan S Alshamrani, Zhu Han, Choong Seon Hong', 'IEEE Access', 2020, NULL, NULL, NULL, 0, 'Journal Article', 'https://ieeexplore.ieee.org/abstract/document/9272310/', '2025-10-13 20:26:37', '2025-10-13 20:26:37'),
('eb4c57f2-a872-11f0-9fb5-74d4dd4ea204', 'DAAC: Digital Asset Access Control in a Unified Blockchain Based E-Health System', 'Sujit Biswas, Kashif Sharif, Fan Li, Iqbal Alam, Saraju Mohanty', 'IEEE Computer Society', 2020, NULL, NULL, NULL, 0, 'Conference Paper', 'https://ieeexplore.ieee.org/abstract/document/9258958/', '2025-10-13 20:26:37', '2025-10-13 20:26:37'),
('eb4c5812-a872-11f0-9fb5-74d4dd4ea204', 'Blockchain for e-health-care systems: Easier said than done', 'Sujit Biswas, Kashif Sharif, Fan Li, Saraju Mohanty', 'IEEE Computer', 2020, NULL, NULL, NULL, 156, 'Journal Article', 'https://ieeexplore.ieee.org/abstract/document/9130396/', '2025-10-13 20:26:37', '2025-10-13 20:26:37'),
('eb4c582e-a872-11f0-9fb5-74d4dd4ea204', 'Interoperability and synchronization management of blockchain-based decentralized e-health systems', 'Sujit Biswas, Kashif Sharif, Fan Li, Zohaib Latif, Salil S Kanhere, Saraju P Mohanty', 'IEEE Transactions on Engineering Management', 2020, NULL, NULL, NULL, 89, 'Journal Article', 'https://ieeexplore.ieee.org/abstract/document/9112689/', '2025-10-13 20:26:37', '2025-10-13 20:26:37'),
('eb4c5849-a872-11f0-9fb5-74d4dd4ea204', 'A noncooperative game analysis for controlling covid-19 outbreak', 'Anupam Kumar Bairagi, Mehedi Masud, Do Hyeon Kim, Md Shirajum Munir, Abdullah Al Nahid, Sarder Fakhrul Abedin, Kazi Masudul Alam, Sujit Biswas, Sultan S Alshamrani, Zhu Han, Choong Seon Hong', 'Cold Spring Harbor Laboratory Press', 2020, NULL, NULL, '10.1101/2020.05.22.20110783', 0, 'Preprint', 'https://www.medrxiv.org/content/10.1101/2020.05.22.20110783.abstract', '2025-10-13 20:26:37', '2025-10-13 20:26:37'),
('eb4c5890-a872-11f0-9fb5-74d4dd4ea204', 'A survey of network virtualization techniques for Internet of Things using SDN and NFV', 'Iqbal Alam, Kashif Sharif, Fan Li, Zohaib Latif, Md Monjurul Karim, Sujit Biswas, Boubakr Nour, Yu Wang', 'ACM Computing Surveys (CSUR)', 2020, NULL, NULL, NULL, 0, 'Journal Article', 'https://dl.acm.org/doi/abs/10.1145/3379444', '2025-10-13 20:26:37', '2025-10-13 20:26:37'),
('eb4c58ae-a872-11f0-9fb5-74d4dd4ea204', 'A comprehensive survey of interface protocols for software defined networks', 'Zohaib Latif, Kashif Sharif, Fan Li, Md Monjurul Karim, Sujit Biswas, Yu Wang', 'Journal of Network and Computer Applications', 2020, NULL, NULL, NULL, 0, 'Journal Article', 'https://www.sciencedirect.com/science/article/pii/S1084804520300370', '2025-10-13 20:26:37', '2025-10-13 20:26:37'),
('eb4c58cc-a872-11f0-9fb5-74d4dd4ea204', 'PoBT: A Light Weight Consensus Algorithm for Scalable IoT Business Blockchain', 'Sujit Biswas, Kashif Sharif, Fan Li, Sabita Maharjan, Saraju P. Mohanty, Yu Wang', 'IEEE Internet of Things Journal', 2019, NULL, NULL, '10.1109/JIOT.2019.2958077', 234, 'Journal Article', 'https://ieeexplore.ieee.org/abstract/document/8926457/', '2025-10-13 20:26:37', '2025-10-13 20:26:37'),
('eb4c58f0-a872-11f0-9fb5-74d4dd4ea204', 'A survey of Internet of Things communication using ICN: A use case perspective', 'Boubakr Nour, Kashif Sharif, Fan Li, Sujit Biswas, Hassine Moungla, Mohsen Guizani, Yu Wang', 'Computer Communications', 2019, NULL, NULL, NULL, 0, 'Journal Article', 'https://www.sciencedirect.com/science/article/pii/S0140366418309228', '2025-10-13 20:26:37', '2025-10-13 20:26:37'),
('eb4c590c-a872-11f0-9fb5-74d4dd4ea204', 'IoT Virtualization: A Survey of Software Definition & Function Virtualization Techniques for Internet of Things', 'Iqbal Alam, Kashif Sharif, Fan Li, Zohaib Latif, Md Monjurul Karim, Boubakr Nour, Sujit Biswas, Yu Wang', 'arXiv preprint arXiv:1902.10910', 2019, NULL, NULL, NULL, 0, 'Preprint', 'https://arxiv.org/abs/1902.10910', '2025-10-13 20:26:37', '2025-10-13 20:26:37'),
('eb4c5928-a872-11f0-9fb5-74d4dd4ea204', 'A Scalable Blockchain Framework for Secure Transactions in IoT', 'Sujit Biswas, Kashif Sharif, Fan Li, Boubakr Nour, Yu Wang', 'IEEE Internet of Things Journal', 2019, NULL, NULL, NULL, 0, 'Journal Article', 'https://ieeexplore.ieee.org/abstract/document/8481466/', '2025-10-13 20:26:37', '2025-10-13 20:26:37'),
('eb4c5945-a872-11f0-9fb5-74d4dd4ea204', '3P framework: Customizable permission architecture for mobile applications', 'Sujit Biswas, Kashif Sharif, Fan Li, Yang Liu', 'Springer International Publishing', 2017, NULL, NULL, '10.1007/978-3-319-60033-8_39', 0, 'Conference Paper', 'https://link.springer.com/chapter/10.1007/978-3-319-60033-8_39', '2025-10-13 20:26:37', '2025-10-13 20:26:37'),
('eb4c5961-a872-11f0-9fb5-74d4dd4ea204', 'Android permissions management at app installing', 'Sujit Biswas, Wang Haipeng, Javed Rashid', 'International Journal of Security and Its Applications', 2016, NULL, NULL, NULL, 0, 'Journal Article', 'https://www.academia.edu/download/49536374/Apps_Installation.pdf', '2025-10-13 20:26:37', '2025-10-13 20:26:37'),
('eb4c597c-a872-11f0-9fb5-74d4dd4ea204', 'Mobile Banking Based a New E-commerce Architecture: Developing Countries Perspective', 'S Biswas', 'International Journal of u- and e- Service, Science and Technology', 2015, NULL, NULL, NULL, 0, 'Journal Article', 'https://www.academia.edu/download/36910781/Ecommerce.pdf', '2025-10-13 20:26:37', '2025-10-13 20:26:37'),
('eb4c59a8-a872-11f0-9fb5-74d4dd4ea204', 'Gsm verification based secure e-voting framework', 'Sujit Biswas', 'International Journal of u-and e-Service, Science and Technology', 2015, NULL, NULL, NULL, 0, 'Journal Article', 'https://www.researchgate.net/profile/Sujit-Biswas-2/publication/287159082_GSM_Verification_Based_Secure_E-Voting_Framework/links/5a4607bb458515f6b054b74e/GSM-Verification-Based-Secure-E-Voting-Framework.pdf', '2025-10-13 20:26:37', '2025-10-13 20:26:37');

-- --------------------------------------------------------

--
-- Table structure for table `research_areas`
--

CREATE TABLE `research_areas` (
  `id` char(36) NOT NULL DEFAULT uuid(),
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `icon` varchar(100) NOT NULL,
  `order_index` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `research_areas`
--

INSERT INTO `research_areas` (`id`, `title`, `description`, `icon`, `order_index`, `created_at`, `updated_at`) VALUES
('368e417d-a815-11f0-853c-74d4dd4ea204', 'Blockchain Security', 'Secure smart contracts and consensus', 'Shield', 1, '2025-10-13 09:15:51', '2025-10-13 19:41:29'),
('368e446b-a815-11f0-853c-74d4dd4ea204', 'AI for IoT', 'Edge AI and anomaly detection', 'Cpu', 2, '2025-10-13 09:15:51', '2025-10-13 09:15:51'),
('368e44ea-a815-11f0-853c-74d4dd4ea204', 'Federated Learning', 'Privacy-preserving ML across devices', 'Network', 3, '2025-10-13 09:15:51', '2025-10-13 09:15:51'),
('c2212026-a870-11f0-9fb5-74d4dd4ea204', 'Blockchain Security', 'Research on secure blockchain systems, consensus mechanisms, and smart contract security for enterprise and IoT applications.', 'Shield', 1, '2025-10-13 20:11:09', '2025-10-13 20:11:09'),
('c2212b20-a870-11f0-9fb5-74d4dd4ea204', 'Cybersecurity & FinTech', 'Advancing digital security in financial technology, including fraud detection, secure transactions, and regulatory compliance.', 'Lock', 2, '2025-10-13 20:11:09', '2025-10-13 20:11:09'),
('c2212b88-a870-11f0-9fb5-74d4dd4ea204', 'IoT Security', 'Developing security frameworks and protocols for Internet of Things devices and networks.', 'Network', 3, '2025-10-13 20:11:09', '2025-10-13 20:11:09'),
('c2212baf-a870-11f0-9fb5-74d4dd4ea204', 'AI & Machine Learning', 'Applying machine learning techniques to cybersecurity challenges, threat detection, and anomaly identification.', 'Brain', 4, '2025-10-13 20:11:09', '2025-10-13 20:11:09'),
('c2212bca-a870-11f0-9fb5-74d4dd4ea204', 'Healthcare Data Security', 'Research on secure healthcare data sharing, blockchain-based medical records, and privacy-preserving systems.', 'Heart', 5, '2025-10-13 20:11:09', '2025-10-13 20:11:09'),
('c2212bef-a870-11f0-9fb5-74d4dd4ea204', 'Distributed Systems', 'Design and analysis of distributed computing systems, consensus algorithms, and scalable architectures.', 'Cpu', 6, '2025-10-13 20:11:09', '2025-10-13 20:11:09');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` char(36) NOT NULL DEFAULT uuid(),
  `name` varchar(255) NOT NULL,
  `degree_type` varchar(100) NOT NULL,
  `research_topic` varchar(500) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'current',
  `start_year` int(11) NOT NULL,
  `end_year` int(11) DEFAULT NULL,
  `avatar_url` text DEFAULT NULL,
  `linkedin_url` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `name`, `degree_type`, `research_topic`, `status`, `start_year`, `end_year`, `avatar_url`, `linkedin_url`, `created_at`, `updated_at`) VALUES
('c22baddf-a870-11f0-9fb5-74d4dd4ea204', 'John Smith', 'PhD', 'Blockchain Security in Healthcare Systems', 'current', 2022, NULL, NULL, NULL, '2025-10-13 20:11:09', '2025-10-13 20:11:09'),
('c22bbacf-a870-11f0-9fb5-74d4dd4ea204', 'Sarah Johnson', 'PhD', 'AI-based Threat Detection in IoT Networks', 'current', 2023, NULL, NULL, NULL, '2025-10-13 20:11:09', '2025-10-13 20:11:09'),
('c22bbb6c-a870-11f0-9fb5-74d4dd4ea204', 'Michael Chen', 'MSc', 'Smart Contract Verification using Formal Methods', 'current', 2024, NULL, NULL, NULL, '2025-10-13 20:11:09', '2025-10-13 20:11:09'),
('c22bbb95-a870-11f0-9fb5-74d4dd4ea204', 'Emma Wilson', 'PhD', 'Privacy-Preserving Machine Learning', 'graduated', 2019, 2023, NULL, NULL, '2025-10-13 20:11:09', '2025-10-13 20:11:09');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_users`
--
ALTER TABLE `admin_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `profile_info`
--
ALTER TABLE `profile_info`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `key` (`key`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `publications`
--
ALTER TABLE `publications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `research_areas`
--
ALTER TABLE `research_areas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
