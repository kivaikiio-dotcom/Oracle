const fs = require('fs');

const baseTopics = {
  "Public Policy & Governance": [
    "Public Policy Formulation", "Regulatory Impact Assessment", "Public Sector Reform", "Ethics in Public Administration", "Digital Transformation in Gov", "Decentralisation", "Public Finance Management", "Evidence-Based Decision Making", "Citizen Engagement", "Social Welfare Systems", "Anti-Corruption", "Urban Policy", "Tax Policy Administration", "Public-Private Partnerships"
  ],
  "Leadership & Executive Coaching": [
    "Strategic Leadership", "Emotional Intelligence", "High-Performance Teams", "Change Management", "Authentic Leadership", "Crisis Leadership", "Conflict Management", "Executive Presence", "Systems Thinking", "Inclusive Leadership", "Board Governance", "Ethical Leadership"
  ],
  "Business & Management": [
    "Strategic Business Planning", "Financial Management for Non-Financial Managers", "Marketing Strategy", "Operations Management", "Supply Chain Management", "Human Resource Fundamentals", "Performance Management", "Corporate Finance", "Business Ethics", "Risk Management", "Customer Relationship Management"
  ],
  "AI, Tech & Data Analytics": [
    "AI Governance", "Data Ethics", "Cybersecurity Policy", "Big Data Analytics", "Machine Learning for Business", "Blockchain Technology", "Cloud Computing Strategy", "Smart Cities Tech", "Digital Inclusion", "Predictive Analytics", "IT Service Management"
  ],
  "ESG, Climate & Sustainability": [
    "ESG Reporting", "Climate Science for Policymakers", "Renewable Energy Transition", "Sustainable Finance", "Circular Economy", "Corporate Sustainability", "Environmental Impact Assessment", "Water Security", "Green Building", "Waste Management Policy", "Climate Justice", "Ocean Governance"
  ],
  "Finance, Audit & Governance": [
    "Public Financial Management", "IPSAS", "Advanced Auditing", "Forensic Accounting", "Enterprise Risk Management", "Treasury Management", "Anti-Money Laundering", "Financial Modeling", "Capital Budgeting", "Project Finance", "Islamic Finance", "Credit Risk Management"
  ],
  "HR & Operations": [
    "Talent Acquisition", "Employee Relations", "Compensation Design", "Diversity & Inclusion", "Workforce Planning", "Occupational Health & Safety", "Change Management Practitioner", "Labor Law", "Process Improvement", "Lean Six Sigma", "Facilities Management"
  ],
  "Project Management & M&E": [
    "Agile Project Management", "PMP Prep", "Business Process Re-engineering", "Strategic Sourcing", "Monitoring and Evaluation", "Logframe Development", "Impact Assessment", "Data Collection Methods", "Donor Reporting", "Evaluation Methodology"
  ],
  "Marketing & Communications": [
    "Digital Marketing Strategy", "Brand Management", "B2B Sales Strategy", "Crisis Communications", "Customer Experience Design", "Public Speaking", "Strategic Communications", "Social Media Analytics", "Consumer Behaviour", "Event Management"
  ]
};

const prefixes = ["Advanced", "Mastering", "Strategic", "Foundations of", "Executive", "Applied", "Global", "Innovative", "Transformational", "Principles of", "Effective", "Leading", "Contemporary", "Navigating", "Data-Driven"];
const suffixes = ["in the Digital Age", "for Modern Leaders", "Masterclass", "in Practice", "Strategies", "Frameworks", "for Public Sector", "for Emerging Markets", "Excellence", "Bootcamp"];

const coursesArray = [];
let idCounter = 1;

// 1. First, preserve the 25 actual GLI Kenya certifications
const gliCourses = [
  { title: "Certified Treasury Specialist (CTS)", category: "Finance, Audit & Governance", desc: "Cash management, liquidity, FX and treasury risk." },
  { title: "Certified Internal Auditor Prep (CIA)", category: "Finance, Audit & Governance", desc: "Full CIA exam preparation covering risk, governance and business." },
  { title: "Certified Financial Analyst – Africa (CFA-A)", category: "Finance, Audit & Governance", desc: "Financial modelling, investment analysis." },
  { title: "Certificate in Public Financial Management (PFM)", category: "Finance, Audit & Governance", desc: "IPSAS, government budgeting." },
  { title: "Certified Tax Professional – Kenya (CTP)", category: "Finance, Audit & Governance", desc: "PAYE, VAT, corporate tax, KRA iTax." },
  { title: "Certified HR Management Professional (CHRMP)", category: "HR & Operations", desc: "Full HR lifecycle certification." },
  { title: "Certified HR Business Partner (HRBP)", category: "HR & Operations", desc: "Strategic HR partnership, business acumen." },
  { title: "Certificate in Payroll Management", category: "HR & Operations", desc: "PAYE, NSSF, NHIF, payroll processing." },
  { title: "Certified Procurement & Contract Professional", category: "Project Management & M&E", desc: "Strategic sourcing, supplier management." },
  { title: "Certified Supply Chain Manager (CSCM)", category: "Business & Management", desc: "End-to-end supply chain management." },
  { title: "Certificate in Stores & Inventory Management", category: "Business & Management", desc: "Stock control, warehouse management." },
  { title: "Certified Leadership & Management Professional (CLMP)", category: "Leadership & Executive Coaching", desc: "Advanced leadership certification." },
  { title: "Certified Management Professional (CMP)", category: "Leadership & Executive Coaching", desc: "Core management skills for mid-level managers." },
  { title: "Executive Leadership Programme (ELP)", category: "Leadership & Executive Coaching", desc: "Strategic leadership, governance." },
  { title: "Certified Project Manager (CPM)", category: "Project Management & M&E", desc: "Full project lifecycle certification." },
  { title: "Certified Programme Manager", category: "Project Management & M&E", desc: "Multi-project programme management." },
  { title: "Certified Digital Marketing Specialist (CDMS)", category: "Marketing & Communications", desc: "SEO, social media, Google Ads." },
  { title: "Certified Brand Manager (CBM)", category: "Marketing & Communications", desc: "Brand strategy, positioning." },
  { title: "Certified Sales Manager (CSM)", category: "Marketing & Communications", desc: "Sales leadership, pipeline management." },
  { title: "Certified M&E Specialist (CMES)", category: "Project Management & M&E", desc: "Log frames, indicators, data collection." },
  { title: "Certified Evaluation Researcher (CER)", category: "Project Management & M&E", desc: "Advanced evaluation methodology." },
  { title: "Certified Operations Manager (COM)", category: "HR & Operations", desc: "Operations management, process improvement." },
  { title: "Certificate in Customer Experience Management", category: "HR & Operations", desc: "CX strategy, journey mapping." },
  { title: "Certified Data Analyst (CDA)", category: "AI, Tech & Data Analytics", desc: "Data analysis, Excel, Power BI." },
  { title: "Certificate in ICT Project Management", category: "AI, Tech & Data Analytics", desc: "Managing IT and digital transformation projects." }
];

gliCourses.forEach(c => {
  coursesArray.push({
    id: idCounter++,
    title: c.title,
    category: c.category,
    duration: "10-12 Wks",
    level: ["Foundational", "Intermediate", "Advanced", "Executive"][Math.floor(Math.random()*4)],
    description: c.desc + " Delivered in partnership with GLI Kenya."
  });
});

// 2. Generate 600+ additional courses
const courseSet = new Set(gliCourses.map(c => c.title));

while (coursesArray.length < 620) {
  const categories = Object.keys(baseTopics);
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  const topics = baseTopics[randomCategory];
  const randomTopic = topics[Math.floor(Math.random() * topics.length)];
  
  const usePrefix = Math.random() > 0.4;
  const useSuffix = Math.random() > 0.5;
  
  let newTitle = randomTopic;
  if (usePrefix) {
    newTitle = prefixes[Math.floor(Math.random() * prefixes.length)] + " " + newTitle;
  }
  if (useSuffix) {
    newTitle = newTitle + " " + suffixes[Math.floor(Math.random() * suffixes.length)];
  }
  
  if (!courseSet.has(newTitle)) {
    courseSet.add(newTitle);
    coursesArray.push({
      id: idCounter++,
      title: newTitle,
      category: randomCategory,
      duration: ["2 Days", "3 Days", "5 Days", "1 Week"][Math.floor(Math.random() * 4)],
      level: ["Foundational", "Intermediate", "Advanced", "Executive"][Math.floor(Math.random()*4)],
      description: "Intensive professional training programme focused on " + randomTopic.toLowerCase() + ". Designed to enhance organizational capacity and strategic execution."
    });
  }
}

const fileContent = "const CourseCatalogue = " + JSON.stringify(coursesArray, null, 2) + ";";
fs.writeFileSync('courses.js', fileContent);
console.log("Generated " + coursesArray.length + " courses.");
