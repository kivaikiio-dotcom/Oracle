const fs = require('fs');

const categories = {
  "Public Policy & Governance": [
    "Advanced Public Policy Formulation", "Data-Driven Policy Analysis", "Regulatory Impact Assessment", "Public Sector Reform Strategies", "Ethics in Public Administration",
    "E-Governance & Digital Transformation", "Decentralisation & Local Governance", "Public Finance Management", "Monitoring & Evaluation for Public Policies", "Evidence-Based Decision Making",
    "Legislative Drafting & Review", "Citizen Engagement & Participatory Governance", "Social Policy & Welfare Systems", "Anti-Corruption & Integrity in Government", "Urban Policy & Smart Cities",
    "Health Policy & Systems Strengthening", "Education Policy Planning", "Tax Policy & Administration", "International Trade Policy", "Diplomacy & International Relations",
    "Public-Private Partnerships (PPPs)", "Migration & Refugee Policy", "Gender Mainstreaming in Public Policy", "Conflict Resolution & Peacebuilding", "Electoral Systems & Democratic Governance",
    "Policy Advocacy & Lobbying", "Strategic Communications for Government", "Crisis Management in the Public Sector", "Public Procurement Policies", "Housing & Infrastructure Policy",
    "Agricultural Policy & Food Security", "Youth & Employment Policy", "Pension & Social Security Reform", "Public Enterprise Management", "National Security & Defense Policy",
    "Water Resource Management Policy", "Telecommunications & Broadband Policy", "Cultural Policy & Heritage Management", "Disaster Risk Reduction & Management", "Industrial Policy & Economic Development",
    "Innovation & Science Policy", "Judicial Reform & Rule of Law", "Land Tenure & Property Rights", "Consumer Protection Policy", "Competition Law & Policy",
    "Foreign Aid & Development Cooperation", "Regional Integration in Africa (AfCFTA)", "Human Rights & Policy Frameworks", "Public Health Crisis Response", "Public Sector Human Resource Management"
  ],
  "Leadership & Executive Coaching": [
    "Executive Leadership Masterclass", "Strategic Thinking & Visioning", "Emotional Intelligence for Leaders", "Leading High-Performance Teams", "Transformational Leadership",
    "Change Management & Agility", "Decision Making Under Uncertainty", "Authentic Leadership", "Women in Leadership", "Leading Through Crisis",
    "Conflict Management & Negotiation", "Cross-Cultural Leadership", "Coaching & Mentoring Skills for Managers", "The Neuroscience of Leadership", "Servant Leadership",
    "Adaptive Leadership", "Board Governance & Directorship", "Ethical Leadership & Corporate Integrity", "Influence & Persuasion in Leadership", "Leading Remote & Hybrid Teams",
    "Resilience & Stress Management for Executives", "Public Speaking & Executive Presence", "Systems Thinking for Leaders", "Leading Organisational Culture", "Inclusive Leadership",
    "Leadership Transition & Succession Planning", "Strategic Foresight & Scenario Planning", "Data-Driven Leadership", "Design Thinking for Leaders", "Negotiation Strategies for Executives",
    "Building Trust & Psychological Safety", "Managing Organisational Politics", "Leading with Empathy", "Entrepreneurial Leadership", "Global Leadership Perspectives",
    "Leadership in the Digital Age", "Storytelling for Leaders", "Personal Branding for Executives", "Mindfulness for Leaders", "Leading Cross-Functional Teams",
    "Navigating Complex Stakeholder Ecosystems", "The Art of Delegation", "Managing Upwards & Sideways", "Leadership Ethics & Moral Dilemmas", "Leading in High-Growth Environments",
    "Turnaround Leadership", "Leadership for Non-Profits", "Fostering Innovation & Creativity", "Action Learning for Executives", "Executive Wellbeing & Performance"
  ],
  "Business & Management": [
    "Mini-MBA for Professionals", "Strategic Business Planning", "Financial Management for Non-Financial Managers", "Marketing Strategy & Consumer Behaviour", "Operations Management & Optimization",
    "Supply Chain & Logistics Management", "Human Resource Management Fundamentals", "Performance Management Systems", "Talent Acquisition & Retention", "Corporate Finance & Valuation",
    "Business Ethics & Corporate Governance", "Risk Management Fundamentals", "Quality Management Systems (ISO)", "Customer Relationship Management (CRM)", "B2B Sales Strategy",
    "Digital Marketing & E-Commerce", "Brand Management", "Organizational Behavior & Design", "Business Communication & Presentation Skills", "Project Management Professional (PMP) Prep",
    "Agile Project Management (Scrum/Kanban)", "Business Process Re-engineering", "Innovation Management", "Entrepreneurship & Small Business Management", "Corporate Social Responsibility (CSR)",
    "Managerial Economics", "Strategic Partnerships & Alliances", "Franchise Management", "Retail Management", "Service Operations Management",
    "Facilities Management", "Event Management", "Occupational Health & Safety (OHS)", "Labor Law & Employee Relations", "Compensation & Benefits Design",
    "Workforce Planning & Analytics", "Diversity, Equity & Inclusion (DEI)", "Change Management Practitioner", "Business Analytics for Managers", "Negotiating Contracts & Agreements",
    "Corporate Restructuring & M&A", "Intellectual Property Management", "Strategic Sourcing & Procurement", "Lean Six Sigma Yellow/Green Belt", "Customer Experience (CX) Design",
    "Business Continuity Management", "Crisis Communications", "Corporate Strategy Execution", "International Business & Trade", "Managing Professional Services Firms"
  ],
  "AI, Tech & Data Analytics": [
    "Introduction to AI Governance", "Developing an Organisational AI Policy", "Data Ethics & Responsible Innovation", "Digital Transformation Strategy", "Cybersecurity Policy & Frameworks",
    "Data Protection & Privacy (GDPR/Data Laws)", "Big Data Analytics for Decision Makers", "Machine Learning for Business Leaders", "Blockchain & Distributed Ledger Technology", "FinTech & Regulatory Frameworks",
    "Cloud Computing Strategy", "Internet of Things (IoT) in the Public Sector", "Smart Cities Technology & Governance", "Digital Inclusion & Accessibility", "Technology Procurement Policies",
    "E-Government Strategies", "Open Data & Government Transparency", "Data Visualization & Storytelling", "Predictive Analytics in Policymaking", "IT Service Management (ITIL)",
    "Enterprise Architecture Frameworks", "Tech Startups & Innovation Hubs Policy", "Digital Economy & Taxation", "Future of Work & Automation", "AI Regulation & Compliance",
    "Algorithms & Algorithmic Bias", "Digital Identity Systems", "Telehealth & Digital Health Policy", "EdTech Policy & Implementation", "AgriTech & Smart Farming",
    "Space Technology Policy", "Drones & Unmanned Aerial Systems Policy", "5G & Telecommunications Infrastructure", "E-Waste Management Policy", "Digital Rights & Freedom of Expression",
    "Tech Diplomacy", "Quantum Computing Awareness for Leaders", "Virtual Reality (VR) & Augmented Reality (AR) in Training", "Platform Economy & Gig Work Regulation", "Software Licensing & Open Source Policy",
    "Data Governance Frameworks", "Chief Information Officer (CIO) Leadership", "Cyber Incident Response Management", "IT Project Management", "Agile Software Development Methodologies",
    "Digital Marketing Analytics", "Business Intelligence Tools (PowerBI/Tableau)", "Python for Data Analysis Basics", "R for Statistical Analysis", "SQL for Business Users"
  ],
  "ESG, Climate & Sustainability": [
    "ESG Fundamentals & Reporting", "Climate Science for Policymakers", "Renewable Energy Policy & Transition", "Carbon Pricing & Markets", "Sustainable Finance & Green Bonds",
    "Circular Economy Strategies", "Corporate Sustainability Strategy", "Environmental Impact Assessment (EIA)", "Community-Based Climate Adaptation", "Water Security & Management",
    "Biodiversity Conservation Policy", "Sustainable Agriculture & Food Systems", "Green Building & Sustainable Cities", "Waste Management & Recycling Policy", "Energy Efficiency Policies",
    "Climate Justice & Equity", "Disaster Risk Reduction & Climate Resilience", "Ocean Governance & Blue Economy", "Forestry Management & REDD+", "Sustainable Tourism Development",
    "Corporate Social Innovation", "Supply Chain Sustainability", "Human Rights in Business", "Stakeholder Engagement & Social License", "ESG Risk Integration",
    "Impact Investing & Measurement", "Net Zero Strategy Development", "Green Public Procurement", "Environmental Law & Regulation", "Sustainable Transport & Mobility",
    "Air Quality Management Policy", "Chemicals Management & Safety", "Extractive Industries & Sustainability", "Indigenous Rights & Environmental Policy", "Gender & Climate Change",
    "Climate Diplomacy & Negotiations (UNFCCC)", "Green Tech & Innovation", "Sustainable Fashion & Textiles", "ESG Data Management", "TCFD & Climate Disclosure",
    "Natural Capital Accounting", "Ecosystem Services Valuation", "Sustainable Water Tariffs", "Off-grid Energy Solutions", "Climate Health Impacts & Policy",
    "Just Energy Transition", "Green Jobs & Skills Development", "Corporate Philanthropy", "Social Impact Assessment", "Ethics & Anti-Greenwashing"
  ],
  "Finance, Audit & Governance": [
    "Public Financial Management (PFM)", "International Public Sector Accounting Standards (IPSAS)", "Advanced Auditing Techniques", "Forensic Accounting & Fraud Investigation", "Enterprise Risk Management (ERM)",
    "Corporate Governance Best Practices", "Internal Controls & Compliance", "Tax Strategy & Planning", "Treasury Management", "Anti-Money Laundering (AML) & KYC",
    "Board Evaluation & Performance", "Financial Modeling & Analysis", "Budgeting & Forecasting", "Capital Budgeting & Investment Appraisal", "Public Debt Management",
    "Project Finance & PPPs", "Microfinance & Financial Inclusion", "Islamic Finance & Banking", "Corporate Reporting & IFRS", "Managerial Accounting",
    "Credit Risk Management", "Market Risk Management", "Operational Risk Management", "Basel Accords & Banking Regulation", "Insurance & Risk Transfer",
    "Pension Fund Management", "Asset Liability Management (ALM)", "Behavioral Finance", "Venture Capital & Private Equity", "Mergers & Acquisitions Finance",
    "Financial Statement Analysis", "Cost Accounting & Control", "Audit Committee Effectiveness", "IT Auditing", "Performance Auditing (Value for Money)",
    "Tax Dispute Resolution", "Transfer Pricing", "International Taxation", "Wealth Management", "Financial Law & Regulation",
    "Compliance Management Systems", "Whistleblowing Frameworks", "Ethics in Finance", "Financial Literacy for Non-Financial Leaders", "Cryptocurrency & Digital Assets Regulation",
    "Sovereign Wealth Funds Management", "Municipal Finance", "Grants Management & Reporting", "NGO Financial Management", "Cooperative Societies Financial Management"
  ]
};

const coursesArray = [];
let idCounter = 1;

for (const [category, courses] of Object.entries(categories)) {
  for (const course of courses) {
    coursesArray.push({
      id: idCounter++,
      title: course,
      category: category,
      duration: ["2 Days", "3 Days", "5 Days", "2 Weeks"][Math.floor(Math.random() * 4)],
      level: ["Intermediate", "Advanced", "Executive"][Math.floor(Math.random() * 3)],
      description: "Comprehensive training programme covering the principles and practical applications of " + course + ". Designed for professionals looking to enhance their expertise in " + category + "."
    });
  }
}

const fileContent = "const CourseCatalogue = " + JSON.stringify(coursesArray, null, 2) + ";";
fs.writeFileSync('courses.js', fileContent);
console.log("Generated " + coursesArray.length + " courses.");
