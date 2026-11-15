import { Code2, Brain, Database, Cpu } from 'lucide-react';

export const PROFILE_INFO = {
  codename: 'AGENT SHIVANI // ZERO-DAY',
  name: 'Shivani Raghuwanshi',
  role: 'Applied AI & Systems Developer',
  credentials: 'B.Tech CSE @ MITS Gwalior • Ex-Designer Intern @ IAF • Naval NCC Cadet',
  bio: 'I engineer intelligent systems at the intersection of Graph Neural Networks, IoT Digital Twins, and Real-Time Computer Vision. Backed by C++ (DSA), Python, and Power BI, I turn raw telemetry and complex graphs into fast, decision-ready software.',
  github: 'https://github.com/shivani706',
  email: 'shivaniraghuwanshi4647@gmail.com',
  resumeUrl: '/resume.pdf',
  defaultAvatar: 'https://avatars.githubusercontent.com/u/204898679?v=4',
  codingStats: [
    { platform: 'LEETCODE', detail: 'C++ & Python DSA', badge: 'ACTIVE' },
    { platform: 'GFG / NINJAS', detail: 'Trees, Graphs & DP', badge: 'VERIFIED' },
    { platform: 'IIT NPTEL', detail: 'LLMs & C-VLSI', badge: 'CERTIFIED' },
  ],
};

export const PROJECTS = [
  {
    id: 'gesture-dino',
    code: 'PRJ_01 // VISION_AI',
    title: 'Gesture Dino Game',
    tagline: 'Touch-free webcam gesture controller for Chrome Dino using 21-point hand landmarks.',
    stack: ['Python', 'OpenCV', 'MediaPipe', 'PyAutoGUI'],
    metrics: '< 30ms Latency • Zero Hardware Sensors',
    repo: 'https://github.com/shivani706',
    playable: true,
    details: [
      'Captures real-time RGB frames via OpenCV and extracts 21 3D hand landmarks using MediaPipe Hands.',
      'Computes vertical finger-tip displacement vectors to distinguish open-palm jumps from closed-fist ducks.',
      'Triggers native OS keyboard interrupts through PyAutoGUI for seamless, touch-free gameplay.',
    ],
  },
  {
    id: 'bitcoin-aml',
    code: 'PRJ_02 // GRAPH_ML',
    title: 'AegisGNN Bitcoin AML Monitor',
    tagline: 'Anti-Money Laundering forensic detection across 200,000+ crypto transaction nodes.',
    stack: ['PyTorch Geometric', 'GAT', 'XGBoost', 'Streamlit'],
    metrics: '203K+ Graph Nodes • Hybrid GNN + Boosted Trees',
    repo: 'https://github.com/shivani706/bitcoin-ai-monitor',
    playable: false,
    interactiveType: 'gnn',
    details: [
      'Models blockchain transaction flows as directed temporal graphs using Graph Attention Networks (GAT).',
      'Combines structural node embeddings with XGBoost tabular classifiers to flag illicit wallet clusters.',
      'Provides interactive subgraph neighborhood inspection for forensic audit tracing.',
    ],
  },
  {
    id: 'thermaflow',
    code: 'PRJ_03 // DIGITAL_TWIN',
    title: 'ThermaFlow Smart HVAC',
    tagline: 'Autonomous multi-zone building thermal twin integrated with live weather telemetry.',
    stack: ['FastAPI', 'React', 'WebSockets', 'Open-Meteo API'],
    metrics: '2R2C Thermal Physics • Predictive Valve Throttling',
    repo: 'https://github.com/shivani706',
    playable: false,
    interactiveType: 'thermal',
    details: [
      'Simulates multi-zone thermal dissipation and occupancy heat loads using 2R2C thermodynamic modeling.',
      'Ingests live ambient temperature and humidity feeds from Open-Meteo API for Gwalior to pre-adjust cooling schedules.',
      'Streams sub-second sensor state updates over FastAPI WebSockets to a reactive control dashboard.',
    ],
  },
  {
    id: 'rapido-bi',
    code: 'PRJ_04 // DATA_INTEL',
    title: 'Rapido Ride Demand Intelligence',
    tagline: 'Geospatial demand clustering, cancellation diagnostics, and dynamic fare analytics.',
    stack: ['Power BI', 'DAX', 'Power Query', 'Python'],
    metrics: 'Multi-Page KPI Suite • Anomaly Detection',
    repo: 'https://github.com/shivani706/Rapido-Ride-Analytics-PowerBI',
    playable: false,
    details: [
      'Engineered synthetic ride-hailing telemetry covering peak-hour surge zones and driver fulfillment rates.',
      'Authored custom DAX time-intelligence measures to isolate cancellation bottlenecks by corridor.',
      'Built drill-through executive dashboards for fleet allocation optimization.',
    ],
  },
  {
    id: 'safeway',
    code: 'PRJ_05 // GEO_SAFETY',
    title: 'SAFEWAY Route Safety Predictor',
    tagline: 'Community-rated geospatial route safety scoring and real-time hazard mapping platform.',
    stack: ['React', 'Vite', 'Tailwind CSS', 'Maps API'],
    metrics: 'Crowd-Sourced Safety Index • Safe-Path Routing',
    repo: 'https://github.com/shivani706',
    playable: false,
    details: [
      'Aggregates community lighting, foot-traffic, and incident reports into dynamic corridor safety scores.',
      'Highlights safer alternative walking and transit paths for late-evening commuters.',
      'Built with a responsive React + Vite architecture and hardened client-side input validation.',
    ],
  },
];

export const SKILL_GROUPS = [
  {
    category: 'CORE LANGUAGES & DSA',
    icon: Code2,
    level: '92%',
    skills: ['C++ (STL & Algorithms)', 'Python 3.11+', 'SQL', 'JavaScript / ES6+', 'HTML5 / CSS3'],
  },
  {
    category: 'APPLIED AI & COMPUTER VISION',
    icon: Brain,
    level: '89%',
    skills: ['PyTorch & PyTorch Geometric', 'Graph Neural Networks (GAT)', 'OpenCV & MediaPipe', 'XGBoost & Scikit-Learn', 'PyAutoGUI'],
  },
  {
    category: 'DATA & BUSINESS INTELLIGENCE',
    icon: Database,
    level: '90%',
    skills: ['Power BI', 'DAX & Data Modeling', 'Power Query (ETL)', 'Pandas & NumPy', 'Statistical Anomaly Analysis'],
  },
  {
    category: 'SYSTEMS & WEB ARCHITECTURE',
    icon: Cpu,
    level: '85%',
    skills: ['FastAPI & REST APIs', 'React & Tailwind CSS', 'WebSockets', 'Git & GitHub', 'Vercel CI/CD'],
  },
];

export const DOSSIER_ITEMS = [
  {
    role: 'Ex-Graphic Design Intern',
    org: 'Indian Air Force (IAF)',
    period: 'DEFENCE DESIGN & VISUAL COMMS',
    summary: 'Engineered high-precision tactical presentation decks, official visual assets, and structured communication collateral under strict defence operational standards.',
  },
  {
    role: 'Naval Wing Cadet',
    org: 'National Cadet Corps (NCC)',
    period: 'LEADERSHIP & MARITIME DISCIPLINE',
    summary: 'Completed institutional naval training camps, regimented drill formations, and team command exercises cultivating high-pressure execution and resilience.',
  },
  {
    role: 'B.Tech in Computer Science & Engineering',
    org: 'MITS, Gwalior (CGPA: 8.2)',
    period: 'ACADEMIC, NPTEL & HACKATHONS',
    summary: 'Focused on DSA, Graph ML, and Digital Twins. Completed IIT NPTEL coursework in Large Language Models & C-Based VLSI Design, and competed in Adobe University Hackathon 2026.',
  },
];
