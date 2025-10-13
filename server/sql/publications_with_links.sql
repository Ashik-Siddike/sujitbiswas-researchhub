-- Publications from https://sujitbiswas.info/publications/
-- All publications with proper links
USE `researchhub`;

DELETE FROM publications;

INSERT INTO publications (id, title, authors, journal, year, doi, pdf_url, citations, type) VALUES
(UUID(), 'Nature-based Bengali Picture Captioning using Global Attention with GRU', 'Fatema Tuz Zohora, Sujit Biswas, Anupam Kumar Bairagi, Kashif Sharit', '2024 IEEE 34th International Workshop on Machine Learning for Signal Processing (MLSP)', 2024, NULL, 'https://ieeexplore.ieee.org/abstract/document/10734813/', 0, 'Conference Paper'),

(UUID(), 'Enhancing machine learning-based forecasting of chronic renal disease with explainable AI', 'Sanjana Singamsetty, Swetha Ghanta, Sujit Biswas, Ashok Pradhan', 'PeerJ Computer Science', 2024, NULL, 'https://peerj.com/articles/cs-2291/', 0, 'Journal Article'),

(UUID(), 'Dynamic Fine-grained SLA Management for 6G eMBB-plus Slice using mDNN & Smart Contracts', 'Sadaf Bukhari, Kashif Sharif, Liehuang Zhu, Chang Xu, Fan Li, Sujit Biswas', 'IEEE Transactions on Services Computing', 2024, NULL, 'https://ieeexplore.ieee.org/abstract/document/10663940/', 8, 'Journal Article'),

(UUID(), 'CIC-SIoT: Clean-Slate Information-Centric Software-Defined Content Discovery and Distribution for Internet-of-Things', 'Md Monjurul Karim, Kashif Sharif, Sujit Biswas, Zohaib Latif, Qiang Qu, Fan Li', 'IEEE Internet of Things Journal', 2024, NULL, 'https://ieeexplore.ieee.org/abstract/document/10633277/', 12, 'Journal Article'),

(UUID(), 'A Reliable Zero-Trust Network for Task Offloading in Vehicular Systems Using an Asynchronous Federated Learning Approach in 6G', 'Prakhar Consul, Neeraj Joshi, Ishan Budhiraja, Sujit Biswas, Neeraj Kumar, Sachin Sharma, Ajith Abraham', 'Proceedings of the SIGCOMM Workshop on Zero Trust Architecture for Next Generation Communications', 2024, NULL, 'https://dl.acm.org/doi/abs/10.1145/3672200.3673877', 0, 'Conference Paper'),

(UUID(), 'TumorGANet: A Transfer Learning and Generative Adversarial Network-Based Data Augmentation Model for Brain Tumor Classification', 'Anindya Nag, Hirak Mondal, Md Mehedi Hassan, Taher Al-Shehari, Mohammed Kadrie, Muna Al-Razgan, Taha Alfakih, Sujit Biswas, Anupam Kumar Bairagi', 'IEEE Access', 2024, NULL, 'https://ieeexplore.ieee.org/abstract/document/10600471/', 0, 'Journal Article'),

(UUID(), 'MpoxSLDNet: A Novel CNN Model for Detecting Monkeypox Lesions and Performance Comparison with Pre-trained Models', 'Fatema Jannat Dihan, Saydul Akbar Murad, Abu Jafar Md Muzahid, KM Uddin, Mohammed JF Alenazi, Anupam Kumar Bairagi, Sujit Biswas', 'arXiv preprint arXiv:2405.21016', 2024, NULL, 'https://arxiv.org/abs/2405.21016', 0, 'Preprint'),

(UUID(), 'Prediction of RNA Secondary Structure Using Butterfly Optimization Algorithm', 'Sajib Chatterjee, Rameswar Debnath, Sujit Biswas, Anupam Kumar Bairagi', 'Human-Centric Intelligent Systems', 2024, '10.1007/s44230-024-00062-6', 'https://link.springer.com/article/10.1007/s44230-024-00062-6', 0, 'Journal Article'),

(UUID(), 'An Optimized and Scalable Blockchain-Based Distributed Learning Platform for Consumer IoT', 'Zhaocheng Wang, Xueying Liu, Xinming Shao, Abdullah Alghamdi, Mesfer Alrizq, Md Shirajum Munir, Sujit Biswas', 'Mathematics', 2023, NULL, 'https://www.mdpi.com/2227-7390/11/23/4844', 0, 'Journal Article'),

(UUID(), 'Challenges in Blockchain as a Solution for IoT Ecosystem Threats and Access Control: A Survey', 'Suranjeet Chowdhury Avik, Sujit Biswas, Md Atiqur Rahaman Ahad, Zohaib Latif, Abdullah Alghamdi, Hamad Abosaq, Anupam Kumar Bairagi', 'arXiv preprint arXiv:2311.15290', 2023, NULL, 'https://arxiv.org/abs/2311.15290', 0, 'Preprint'),

(UUID(), 'Routing protocols in vehicular adhoc networks (vanets): A comprehensive survey', 'Muhammad Sohail, Zohaib Latif, Shahzeb Javed, Sujit Biswas, Sahar Ajmal, Umer Iqbal, Mohsin Raza', 'Internet of things', 2023, NULL, 'https://www.sciencedirect.com/science/article/pii/S2542660523001609', 0, 'Journal Article'),

(UUID(), 'Impact learning: A learning method from feature''s impact and competition', 'Nusrat Jahan Prottasha, Saydul Akbar Murad, Abu Jafar Md Muzahid, Masud Rana, Md Kowsher, Apurba Adhikary, Sujit Biswas, Anupam Kumar Bairagi', 'Journal of Computational Science', 2023, NULL, 'https://www.sciencedirect.com/science/article/pii/S1877750323000716', 0, 'Journal Article'),

(UUID(), 'Interoperability benefits and challenges in smart city services: Blockchain as a solution', 'Sujit Biswas, Zigang Yao, Lin Yan, Abdulmajeed Alqhatani, Anupam Kumar Bairagi, Fatima Asiri, Mehedi Masud', 'Electronics', 2023, NULL, 'https://www.mdpi.com/2079-9292/12/4/1036', 0, 'Journal Article'),

(UUID(), 'A Machine Learning-Based Anomaly Prediction Service for Software-Defined Networks', 'Zohaib Latif, Qasim Umer, Choonhwa Lee, Kashif Sharif, Fan Li, Sujit Biswas', 'Sensors', 2022, NULL, 'https://www.mdpi.com/1424-8220/22/21/8434', 0, 'Journal Article'),

(UUID(), 'Blockchain empowered federated learning ecosystem for securing consumer IoT features analysis', 'Abdullah Alghamdi, Jiang Zhu, Guocai Yin, Mohammad Shorfuzzaman, Nawal Alsufyani, Sultan Alyami, Sujit Biswas', 'Sensors', 2022, NULL, 'https://www.mdpi.com/1424-8220/22/18/6786', 0, 'Journal Article'),

(UUID(), 'Function Virtualization Can Play a Great Role in Blockchain Consensus', 'Jun Wang, Jiang Zhu, Minghui Zhang, Iqbal Alam, Sujit Biswas', 'IEEE Access', 2022, NULL, 'https://ieeexplore.ieee.org/abstract/document/9777983/', 0, 'Journal Article'),

(UUID(), 'Blockchain bridges critical national infrastructures: E-healthcare data migration perspective', 'Yiying Liu, Guangxing Shan, Yucheng Liu, Abdullah Alghamdi, Iqbal Alam, Sujit Biswas', 'IEEE Access', 2022, NULL, 'https://ieeexplore.ieee.org/abstract/document/9727100/', 0, 'Journal Article'),

(UUID(), 'Data-Driven Decision Making for Smart Cultivation', 'Puspendu Biswas Paul, Sujit Biswas, Anupam Kumar Bairagi, Mehedi Masud', '2021 IEEE International Symposium on Smart Electronic Systems (iSES)', 2021, NULL, 'https://ieeexplore.ieee.org/abstract/document/9701148/', 0, 'Conference Paper'),

(UUID(), 'ACC: Blockchain Based Trusted Management of Academic Credentials', 'Md Suman Reza, Sujit Biswas, Abdullah Alghamdi, Mesfer Alrizq, Anupam Kumar Bairagi, Mehedi Masud', '2021 IEEE International Symposium on Smart Electronic Systems (iSES)', 2021, NULL, 'https://ieeexplore.ieee.org/abstract/document/9700999/', 0, 'Conference Paper'),

(UUID(), 'Globechain: An interoperable blockchain for global sharing of healthcare data—a covid-19 perspective', 'Sujit Biswas, Kashif Sharif, Fan Li, Anupam Kumar Bairagi, Zohaib Latif, Saraju P Mohanty', 'IEEE Consumer Electronics Magazine', 2021, NULL, 'https://ieeexplore.ieee.org/abstract/document/9416228/', 67, 'Journal Article'),

(UUID(), 'DOLPHIN: Dynamically optimized and load balanced path for inter-domain SDN communication', 'Zohaib Latif, Kashif Sharif, Fan Li, Md Monjurul Karim, Sujit Biswas, Madiha Shahzad, Saraju P Mohanty', 'IEEE Transactions on Network and Service Management', 2020, NULL, 'https://ieeexplore.ieee.org/abstract/document/9298882/', 0, 'Journal Article'),

(UUID(), 'Controlling the outbreak of COVID-19: A noncooperative game perspective', 'Anupam Kumar Bairagi, Mehedi Masud, Md Shirajum Munir, Abdullah-Al Nahid, Sarder Fakhrul Abedin, Kazi Masudul Alam, Sujit Biswas, Sultan S Alshamrani, Zhu Han, Choong Seon Hong', 'IEEE Access', 2020, NULL, 'https://ieeexplore.ieee.org/abstract/document/9272310/', 0, 'Journal Article'),

(UUID(), 'DAAC: Digital Asset Access Control in a Unified Blockchain Based E-Health System', 'Sujit Biswas, Kashif Sharif, Fan Li, Iqbal Alam, Saraju Mohanty', 'IEEE Computer Society', 2020, NULL, 'https://ieeexplore.ieee.org/abstract/document/9258958/', 0, 'Conference Paper'),

(UUID(), 'Blockchain for e-health-care systems: Easier said than done', 'Sujit Biswas, Kashif Sharif, Fan Li, Saraju Mohanty', 'IEEE Computer', 2020, NULL, 'https://ieeexplore.ieee.org/abstract/document/9130396/', 156, 'Journal Article'),

(UUID(), 'Interoperability and synchronization management of blockchain-based decentralized e-health systems', 'Sujit Biswas, Kashif Sharif, Fan Li, Zohaib Latif, Salil S Kanhere, Saraju P Mohanty', 'IEEE Transactions on Engineering Management', 2020, NULL, 'https://ieeexplore.ieee.org/abstract/document/9112689/', 89, 'Journal Article'),

(UUID(), 'A noncooperative game analysis for controlling covid-19 outbreak', 'Anupam Kumar Bairagi, Mehedi Masud, Do Hyeon Kim, Md Shirajum Munir, Abdullah Al Nahid, Sarder Fakhrul Abedin, Kazi Masudul Alam, Sujit Biswas, Sultan S Alshamrani, Zhu Han, Choong Seon Hong', 'Cold Spring Harbor Laboratory Press', 2020, '10.1101/2020.05.22.20110783', 'https://www.medrxiv.org/content/10.1101/2020.05.22.20110783.abstract', 0, 'Preprint'),

(UUID(), 'A survey of network virtualization techniques for Internet of Things using SDN and NFV', 'Iqbal Alam, Kashif Sharif, Fan Li, Zohaib Latif, Md Monjurul Karim, Sujit Biswas, Boubakr Nour, Yu Wang', 'ACM Computing Surveys (CSUR)', 2020, NULL, 'https://dl.acm.org/doi/abs/10.1145/3379444', 0, 'Journal Article'),

(UUID(), 'A comprehensive survey of interface protocols for software defined networks', 'Zohaib Latif, Kashif Sharif, Fan Li, Md Monjurul Karim, Sujit Biswas, Yu Wang', 'Journal of Network and Computer Applications', 2020, NULL, 'https://www.sciencedirect.com/science/article/pii/S1084804520300370', 0, 'Journal Article'),

(UUID(), 'PoBT: A Light Weight Consensus Algorithm for Scalable IoT Business Blockchain', 'Sujit Biswas, Kashif Sharif, Fan Li, Sabita Maharjan, Saraju P. Mohanty, Yu Wang', 'IEEE Internet of Things Journal', 2019, '10.1109/JIOT.2019.2958077', 'https://ieeexplore.ieee.org/abstract/document/8926457/', 234, 'Journal Article'),

(UUID(), 'A survey of Internet of Things communication using ICN: A use case perspective', 'Boubakr Nour, Kashif Sharif, Fan Li, Sujit Biswas, Hassine Moungla, Mohsen Guizani, Yu Wang', 'Computer Communications', 2019, NULL, 'https://www.sciencedirect.com/science/article/pii/S0140366418309228', 0, 'Journal Article'),

(UUID(), 'IoT Virtualization: A Survey of Software Definition & Function Virtualization Techniques for Internet of Things', 'Iqbal Alam, Kashif Sharif, Fan Li, Zohaib Latif, Md Monjurul Karim, Boubakr Nour, Sujit Biswas, Yu Wang', 'arXiv preprint arXiv:1902.10910', 2019, NULL, 'https://arxiv.org/abs/1902.10910', 0, 'Preprint'),

(UUID(), 'A Scalable Blockchain Framework for Secure Transactions in IoT', 'Sujit Biswas, Kashif Sharif, Fan Li, Boubakr Nour, Yu Wang', 'IEEE Internet of Things Journal', 2019, NULL, 'https://ieeexplore.ieee.org/abstract/document/8481466/', 0, 'Journal Article'),

(UUID(), '3P framework: Customizable permission architecture for mobile applications', 'Sujit Biswas, Kashif Sharif, Fan Li, Yang Liu', 'Springer International Publishing', 2017, '10.1007/978-3-319-60033-8_39', 'https://link.springer.com/chapter/10.1007/978-3-319-60033-8_39', 0, 'Conference Paper'),

(UUID(), 'Android permissions management at app installing', 'Sujit Biswas, Wang Haipeng, Javed Rashid', 'International Journal of Security and Its Applications', 2016, NULL, 'https://www.academia.edu/download/49536374/Apps_Installation.pdf', 0, 'Journal Article'),

(UUID(), 'Mobile Banking Based a New E-commerce Architecture: Developing Countries Perspective', 'S Biswas', 'International Journal of u- and e- Service, Science and Technology', 2015, NULL, 'https://www.academia.edu/download/36910781/Ecommerce.pdf', 0, 'Journal Article'),

(UUID(), 'Gsm verification based secure e-voting framework', 'Sujit Biswas', 'International Journal of u-and e-Service, Science and Technology', 2015, NULL, 'https://www.researchgate.net/profile/Sujit-Biswas-2/publication/287159082_GSM_Verification_Based_Secure_E-Voting_Framework/links/5a4607bb458515f6b054b74e/GSM-Verification-Based-Secure-E-Voting-Framework.pdf', 0, 'Journal Article');

