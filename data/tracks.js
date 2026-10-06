/**
 * Conference tracks and subtopics — verbatim from the MOU draft appendix
 * "Detailed Conference Tracks & Sub-Topics". Do not rename tracks or edit
 * subtopics without organizer approval.
 *
 * `title` is the full MOU heading; `shortTitle` drops the parenthetical
 * abbreviation for compact UI. `icon` is a lucide-react icon name.
 */

export const tracksNote =
  "Conference tracks are indicative and subject to final confirmation by the Technical Program Committee.";

export const tracks = [
  {
    number: 1,
    slug: "artificial-intelligence",
    title: "Artificial Intelligence (AI)",
    shortTitle: "Artificial Intelligence",
    icon: "Brain",
    subtopics: [
      "Explainable AI (XAI) and Trustworthy Systems",
      "Generative AI, Large Language Models (LLMs), and Multi-Modal AI",
      "AI in Healthcare, Smart Cities, and Industrial Design",
      "Knowledge Representation, Automated Reasoning, and Expert Systems",
      "AI Ethics, Safety, Governance, and Policy Frameworks",
    ],
  },
  {
    number: 2,
    slug: "machine-learning",
    title: "Machine Learning (ML) & Computational Intelligence",
    shortTitle: "Machine Learning & Computational Intelligence",
    icon: "Network",
    subtopics: [
      "Deep Learning Architectures, Transformers, and Neural Networks",
      "Reinforcement Learning and Multi-Agent Decision Making",
      "Edge ML, TinyML, and On-Device Intelligence",
      "Federated Learning, Privacy-Preserving ML, and Distributed Optimization",
      "Quantum Machine Learning and Neuromorphic Computing",
    ],
  },
  {
    number: 3,
    slug: "data-science",
    title: "Data Science, Big Data Analytics & Knowledge Discovery",
    shortTitle: "Data Science, Big Data Analytics & Knowledge Discovery",
    icon: "Database",
    subtopics: [
      "Big Data Processing Frameworks & Cloud-Edge Analytics",
      "Predictive Analytics, Data Mining, and Statistical Modeling",
      "Graph Neural Networks & Complex Social Network Analysis",
      "Real-time Streaming Data Pipelines and Intelligent Visualization",
      "Data Governance, Quality Assurance, and Anonymization",
    ],
  },
  {
    number: 4,
    slug: "robotics",
    title: "Robotics, Automation & Autonomous Systems",
    shortTitle: "Robotics, Automation & Autonomous Systems",
    icon: "Bot",
    subtopics: [
      "Human-Robot Interaction (HRI) and Collaborative Robots (Cobots)",
      "Robot Perception, Navigation, SLAM, and Autonomous Path Planning",
      "Swarm Robotics and Unmanned Aerial Vehicles (UAVs / Drones)",
      "Intelligent Control Systems, Haptics, and Mechatronics",
      "Industrial Automation, Digital Twins, and Industry 4.0/5.0",
    ],
  },
  {
    number: 5,
    slug: "cyber-security",
    title: "Cyber Security, Cryptography & Privacy",
    shortTitle: "Cyber Security, Cryptography & Privacy",
    icon: "ShieldCheck",
    subtopics: [
      "Network Security, Intrusion Detection Systems (IDS), and Threat Intelligence",
      "Zero-Trust Architecture, Cloud Security, and IoT Defense",
      "Post-Quantum Cryptography, Applied Cryptology, and Blockchain Security",
      "Cyber-Physical Systems (CPS) and Critical Infrastructure Protection",
      "Digital Forensics, Malware Analysis, and Privacy-Enhancing Technologies",
    ],
  },
  {
    number: 6,
    slug: "vehicular-technology",
    title: "Vehicular Technology & Intelligent Transportation Systems (ITS)",
    shortTitle: "Vehicular Technology & Intelligent Transportation Systems",
    icon: "Car",
    subtopics: [
      "Connected and Automated Vehicles (CAVs) & V2X/V2I Communications",
      "Vehicle Dynamics, Intelligent Telematics, and Fleet Management",
      "EV Battery Management Systems (BMS), Smart Charging & Power Electronics",
      "Traffic Flow Optimization, Autonomous Platooning, and Mobility-as-a-Service (MaaS)",
      "Multi-Sensor Fusion for Autonomous Driving and Advanced Driver Assistance Systems (ADAS)",
    ],
  },
  {
    number: 7,
    slug: "signal-processing",
    title: "Signal Processing, Image & Speech Processing",
    shortTitle: "Signal Processing, Image & Speech Processing",
    icon: "AudioWaveform",
    subtopics: [
      "Digital Signal Processing (DSP) Algorithms and Hardware Architectures",
      "Biomedical Signal Processing (EEG/ECG) and Advanced Medical Imaging",
      "Computer Vision, Object Recognition, and Automated Video Analytics",
      "Speech Processing, Audio Analytics, and Natural Language Processing (NLP)",
      "Radar, Sonar, Spatial Audio, and Adaptive Array Signal Processing",
    ],
  },
  {
    number: 8,
    slug: "vlsi-embedded",
    title: "VLSI, Microelectronics & Embedded Systems",
    shortTitle: "VLSI, Microelectronics & Embedded Systems",
    icon: "Cpu",
    subtopics: [
      "Low-Power VLSI Architecture, System-on-Chip (SoC), and FPGA Design",
      "Analog, Mixed-Signal, and RF Integrated Circuit (IC) Design",
      "Microelectromechanical Systems (MEMS) and Intelligent Sensors",
      "Real-Time Operating Systems (RTOS) and Edge AI Hardware Accelerators",
      "Hardware Security, Hardware-in-the-Loop (HIL) Testing, and Fault Tolerance",
    ],
  },
  {
    number: 9,
    slug: "communications",
    title: "Communications, Wireless Networks & Next-Gen Systems",
    shortTitle: "Communications, Wireless Networks & Next-Gen Systems",
    icon: "RadioTower",
    subtopics: [
      "5G/6G Wireless Architectures, Protocols, and Terahertz Communications",
      "Optical Communications, Free-Space Optics, and Satellite Networking",
      "Software-Defined Networking (SDN) and Network Function Virtualization (NFV)",
      "Internet of Things (IoT) Protocols, Sensor Networks, and Smart Grid Communications",
      "Cognitive Radio, Dynamic Spectrum Access, and Massive MIMO Technologies",
    ],
  },
];
