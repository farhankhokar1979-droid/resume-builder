export interface ProfessionFallback {
    id: string;
    title: string;
    summary: string;
    bullets: string[];
}

/**
 * A ready-made library of summary + bullet-point text for common modern
 * professions, used as an offline fallback whenever the AI feature is
 * unavailable (no API key configured, provider error, network issue, etc).
 * Users pick their profession and get solid, editable starting text —
 * no AI call required.
 */
export const PROFESSION_FALLBACKS: ProfessionFallback[] = [
    {
        id: "software-engineer",
        title: "Software Engineer",
        summary:
            "Software engineer experienced in designing, building, and maintaining scalable web applications. Comfortable working across the full stack, collaborating with cross-functional teams, and writing clean, testable code.",
        bullets: [
            "Developed and maintained features across the front end and back end of production applications.",
            "Collaborated with designers and product managers to translate requirements into working software.",
            "Wrote unit and integration tests to improve code reliability and reduce regressions.",
        ],
    },
    {
        id: "frontend-developer",
        title: "Frontend Developer",
        summary:
            "Frontend developer focused on building responsive, accessible, and performant user interfaces. Skilled at translating design mockups into pixel-accurate, reusable components.",
        bullets: [
            "Built responsive UI components using modern JavaScript frameworks and CSS best practices.",
            "Improved page load performance by optimizing assets and reducing unnecessary re-renders.",
            "Partnered with UX designers to ensure consistent, accessible interfaces across devices.",
        ],
    },
    {
        id: "backend-developer",
        title: "Backend Developer",
        summary:
            "Backend developer with experience designing APIs, databases, and server-side logic for reliable, scalable systems. Focused on clean architecture and maintainable code.",
        bullets: [
            "Designed and implemented RESTful APIs consumed by multiple client applications.",
            "Optimized database queries and schema design to improve application response times.",
            "Implemented authentication, authorization, and data validation across backend services.",
        ],
    },
    {
        id: "mobile-app-developer",
        title: "Mobile App Developer",
        summary:
            "Mobile app developer experienced in building and shipping native and cross-platform applications. Focused on smooth performance, clean UI, and reliable release cycles.",
        bullets: [
            "Built and shipped features for a mobile application used by thousands of active users.",
            "Debugged and resolved performance issues affecting app responsiveness and battery usage.",
            "Coordinated with backend teams to integrate APIs and handle offline data sync.",
        ],
    },
    {
        id: "devops-engineer",
        title: "DevOps Engineer",
        summary:
            "DevOps engineer focused on automating deployment pipelines and improving system reliability. Experienced with containerization, CI/CD, and cloud infrastructure management.",
        bullets: [
            "Built and maintained CI/CD pipelines to automate testing and deployment processes.",
            "Managed containerized services and infrastructure using cloud platform tooling.",
            "Reduced deployment failures by implementing monitoring, alerting, and rollback procedures.",
        ],
    },
    {
        id: "cybersecurity-analyst",
        title: "Cybersecurity Analyst",
        summary:
            "Cybersecurity analyst experienced in identifying vulnerabilities, monitoring threats, and strengthening organizational security posture. Detail-oriented with a strong grasp of security best practices.",
        bullets: [
            "Monitored network traffic and system logs to detect and respond to potential security threats.",
            "Conducted vulnerability assessments and recommended remediation steps to reduce risk.",
            "Assisted in developing and enforcing security policies across the organization.",
        ],
    },
    {
        id: "data-scientist",
        title: "Data Scientist",
        summary:
            "Data scientist experienced in extracting actionable insights from complex datasets using statistical analysis and machine learning. Skilled at communicating findings to both technical and non-technical audiences.",
        bullets: [
            "Built predictive models to support business decision-making using real-world datasets.",
            "Cleaned and analyzed large datasets to identify trends and actionable insights.",
            "Presented findings to stakeholders through clear visualizations and written reports.",
        ],
    },
    {
        id: "data-analyst",
        title: "Data Analyst",
        summary:
            "Data analyst skilled in transforming raw data into clear, actionable insights that support business decisions. Proficient in data visualization and reporting tools.",
        bullets: [
            "Analyzed datasets to identify trends and provide recommendations to stakeholders.",
            "Built dashboards and reports to track key performance metrics.",
            "Automated recurring reporting processes, reducing manual analysis time.",
        ],
    },
    {
        id: "machine-learning-engineer",
        title: "Machine Learning Engineer",
        summary:
            "Machine learning engineer experienced in developing, training, and deploying models into production systems. Focused on balancing model performance with real-world reliability.",
        bullets: [
            "Trained and evaluated machine learning models to solve specific business problems.",
            "Deployed models into production and monitored performance over time.",
            "Collaborated with data engineers to build reliable data pipelines for model training.",
        ],
    },
    {
        id: "network-administrator",
        title: "Network Administrator",
        summary:
            "Network administrator experienced in maintaining secure, reliable network infrastructure. Skilled at troubleshooting connectivity issues and minimizing downtime.",
        bullets: [
            "Maintained and monitored network infrastructure to ensure consistent uptime.",
            "Diagnosed and resolved connectivity issues across office and remote environments.",
            "Implemented security measures to protect network resources from unauthorized access.",
        ],
    },
    {
        id: "it-support-specialist",
        title: "IT Support Specialist",
        summary:
            "IT support specialist experienced in resolving hardware, software, and network issues for end users. Known for clear communication and fast problem resolution.",
        bullets: [
            "Provided technical support to employees, resolving hardware and software issues promptly.",
            "Maintained inventory and configuration of company devices and equipment.",
            "Documented common issues and solutions to build a helpful internal knowledge base.",
        ],
    },
    {
        id: "product-manager",
        title: "Product Manager",
        summary:
            "Product manager experienced in guiding products from concept to launch by aligning business goals, user needs, and engineering capacity. Skilled at prioritization and cross-team communication.",
        bullets: [
            "Defined product roadmaps based on user research and business priorities.",
            "Coordinated with engineering and design teams to deliver features on schedule.",
            "Analyzed user feedback and product metrics to inform future development decisions.",
        ],
    },
    {
        id: "project-manager",
        title: "Project Manager",
        summary:
            "Project manager experienced in planning, executing, and delivering projects on time and within budget. Skilled at coordinating cross-functional teams and managing stakeholder expectations.",
        bullets: [
            "Managed project timelines, budgets, and deliverables across multiple teams.",
            "Facilitated regular status meetings to track progress and resolve blockers.",
            "Coordinated with stakeholders to ensure project outcomes met business requirements.",
        ],
    },
    {
        id: "business-analyst",
        title: "Business Analyst",
        summary:
            "Business analyst skilled in identifying process improvements and translating business needs into actionable requirements. Comfortable working closely with both technical and business teams.",
        bullets: [
            "Gathered and documented business requirements from stakeholders across departments.",
            "Analyzed existing workflows to identify opportunities for process improvement.",
            "Collaborated with development teams to ensure solutions met business objectives.",
        ],
    },
    {
        id: "operations-manager",
        title: "Operations Manager",
        summary:
            "Operations manager experienced in streamlining processes and improving efficiency across teams. Skilled at resource planning and cross-departmental coordination.",
        bullets: [
            "Oversaw daily operations to ensure processes ran efficiently and on schedule.",
            "Identified and implemented process improvements that reduced operational costs.",
            "Coordinated between departments to resolve operational bottlenecks.",
        ],
    },
    {
        id: "ui-ux-designer",
        title: "UI/UX Designer",
        summary:
            "UI/UX designer focused on creating intuitive, user-centered digital experiences. Skilled at translating research and business goals into clean, functional interface designs.",
        bullets: [
            "Designed user interfaces and interactive prototypes for web and mobile applications.",
            "Conducted user research to inform design decisions and improve usability.",
            "Collaborated with developers to ensure accurate, consistent implementation of designs.",
        ],
    },
    {
        id: "graphic-designer",
        title: "Graphic Designer",
        summary:
            "Graphic designer experienced in creating visually compelling designs for digital and print media. Skilled at translating brand guidelines into engaging visual content.",
        bullets: [
            "Designed marketing materials, social media graphics, and branded visual assets.",
            "Collaborated with marketing teams to ensure designs aligned with campaign goals.",
            "Maintained brand consistency across all visual communications.",
        ],
    },
    {
        id: "video-editor",
        title: "Video Editor",
        summary:
            "Video editor experienced in producing polished, engaging video content for digital platforms. Skilled at storytelling through pacing, sound, and visual effects.",
        bullets: [
            "Edited video content for social media, marketing campaigns, and internal use.",
            "Collaborated with content creators to align edits with the intended message and tone.",
            "Managed video production timelines to meet publishing deadlines.",
        ],
    },
    {
        id: "photographer",
        title: "Photographer",
        summary:
            "Photographer experienced in capturing high-quality images across a range of settings and subjects. Skilled in composition, lighting, and post-production editing.",
        bullets: [
            "Captured and edited photographs for client projects, events, and marketing materials.",
            "Managed photo shoots from planning through final delivery.",
            "Built and maintained a portfolio showcasing a consistent creative style.",
        ],
    },
    {
        id: "interior-designer",
        title: "Interior Designer",
        summary:
            "Interior designer experienced in creating functional, aesthetically pleasing spaces tailored to client needs. Skilled at balancing creativity with practical space planning.",
        bullets: [
            "Designed residential and commercial interior spaces based on client requirements.",
            "Selected materials, furnishings, and color schemes to achieve desired aesthetics.",
            "Coordinated with contractors and vendors to execute design plans on schedule.",
        ],
    },
    {
        id: "fashion-designer",
        title: "Fashion Designer",
        summary:
            "Fashion designer experienced in developing original clothing concepts from sketch to finished garment. Skilled at balancing current trends with brand identity.",
        bullets: [
            "Designed clothing collections aligned with brand vision and seasonal trends.",
            "Collaborated with pattern makers and manufacturers to bring designs to production.",
            "Researched market trends to inform new collection concepts.",
        ],
    },
    {
        id: "content-writer",
        title: "Content Writer",
        summary:
            "Content writer experienced in producing clear, engaging written content across multiple formats. Skilled at adapting tone and style to different audiences and platforms.",
        bullets: [
            "Wrote articles, blog posts, and marketing copy aligned with brand voice and goals.",
            "Researched topics thoroughly to produce accurate, well-informed content.",
            "Edited and proofread content to ensure clarity, accuracy, and consistency.",
        ],
    },
    {
        id: "copywriter",
        title: "Copywriter",
        summary:
            "Copywriter experienced in crafting persuasive, on-brand messaging across advertising and marketing channels. Skilled at writing copy that drives engagement and conversions.",
        bullets: [
            "Wrote compelling copy for advertisements, websites, and email campaigns.",
            "Collaborated with designers to align messaging with visual creative.",
            "A/B tested headlines and calls to action to improve campaign performance.",
        ],
    },
    {
        id: "journalist",
        title: "Journalist",
        summary:
            "Journalist experienced in researching, writing, and reporting accurate, timely news stories. Skilled at interviewing sources and verifying information under deadline pressure.",
        bullets: [
            "Researched and wrote news articles covering a range of current events and topics.",
            "Conducted interviews with sources to gather accurate, first-hand information.",
            "Met tight publishing deadlines while maintaining journalistic accuracy and integrity.",
        ],
    },
    {
        id: "digital-marketer",
        title: "Digital Marketer",
        summary:
            "Digital marketer experienced in planning and executing campaigns across multiple online channels. Skilled at analyzing performance data to optimize marketing spend.",
        bullets: [
            "Planned and executed digital marketing campaigns across social media and search platforms.",
            "Analyzed campaign performance data to optimize targeting and improve ROI.",
            "Managed marketing budgets to maximize reach within allocated spend.",
        ],
    },
    {
        id: "seo-specialist",
        title: "SEO Specialist",
        summary:
            "SEO specialist experienced in improving organic search visibility through technical optimization and content strategy. Skilled at keyword research and performance tracking.",
        bullets: [
            "Conducted keyword research to inform content and site optimization strategies.",
            "Improved organic search rankings through on-page and technical SEO improvements.",
            "Tracked and reported on search performance using analytics tools.",
        ],
    },
    {
        id: "social-media-manager",
        title: "Social Media Manager",
        summary:
            "Social media manager experienced in building brand presence and engagement across social platforms. Skilled at content planning, community management, and performance analysis.",
        bullets: [
            "Planned and published content across social media platforms to grow brand engagement.",
            "Monitored and responded to audience interactions to build community trust.",
            "Analyzed engagement metrics to refine content strategy over time.",
        ],
    },
    {
        id: "marketing-manager",
        title: "Marketing Manager",
        summary:
            "Marketing manager experienced in developing and executing strategies that build brand awareness and drive growth. Skilled at leading campaigns from concept through measurable results.",
        bullets: [
            "Developed marketing strategies aligned with overall business growth objectives.",
            "Led cross-functional campaigns from planning through execution and analysis.",
            "Managed relationships with external agencies and marketing vendors.",
        ],
    },
    {
        id: "sales-executive",
        title: "Sales Executive",
        summary:
            "Sales executive experienced in building client relationships and driving revenue growth. Skilled at identifying opportunities and closing deals through consultative selling.",
        bullets: [
            "Built and maintained relationships with clients to drive repeat business and referrals.",
            "Identified new sales opportunities and guided prospects through the sales pipeline.",
            "Consistently met or exceeded assigned sales targets.",
        ],
    },
    {
        id: "customer-support-representative",
        title: "Customer Support Representative",
        summary:
            "Customer support representative experienced in resolving customer issues efficiently while maintaining a positive experience. Skilled at clear communication under pressure.",
        bullets: [
            "Resolved customer inquiries and issues through phone, chat, and email support.",
            "Maintained high customer satisfaction ratings through clear, empathetic communication.",
            "Documented recurring issues to help improve products and support processes.",
        ],
    },
    {
        id: "virtual-assistant",
        title: "Virtual Assistant",
        summary:
            "Virtual assistant experienced in providing remote administrative and organizational support. Skilled at managing schedules, communications, and day-to-day tasks efficiently.",
        bullets: [
            "Managed calendars, correspondence, and scheduling for busy executives or teams.",
            "Handled data entry, research, and administrative tasks with high attention to detail.",
            "Coordinated communication between clients and external stakeholders.",
        ],
    },
    {
        id: "hr-manager",
        title: "HR Manager",
        summary:
            "HR manager experienced in overseeing recruitment, employee relations, and workplace policy. Skilled at building supportive, well-organized work environments.",
        bullets: [
            "Managed the full recruitment cycle from job posting through onboarding.",
            "Handled employee relations issues and ensured compliance with workplace policies.",
            "Developed and implemented HR programs to improve employee engagement.",
        ],
    },
    {
        id: "recruiter",
        title: "Recruiter",
        summary:
            "Recruiter experienced in sourcing and evaluating candidates to fill open roles efficiently. Skilled at building strong relationships with both hiring managers and applicants.",
        bullets: [
            "Sourced and screened candidates for a range of open positions across departments.",
            "Coordinated interviews between candidates and hiring managers.",
            "Maintained a strong candidate pipeline to reduce time-to-hire.",
        ],
    },
    {
        id: "accountant",
        title: "Accountant",
        summary:
            "Accountant experienced in managing financial records, reporting, and compliance. Skilled at ensuring accuracy and identifying discrepancies in financial data.",
        bullets: [
            "Prepared and reviewed financial statements to ensure accuracy and compliance.",
            "Reconciled accounts and resolved discrepancies in a timely manner.",
            "Assisted with budgeting, forecasting, and month-end closing processes.",
        ],
    },
    {
        id: "financial-analyst",
        title: "Financial Analyst",
        summary:
            "Financial analyst experienced in evaluating financial data to support business decisions. Skilled at building models, forecasts, and reports for stakeholders.",
        bullets: [
            "Built financial models to support budgeting, forecasting, and investment decisions.",
            "Analyzed financial performance and prepared reports for leadership review.",
            "Identified cost-saving opportunities through detailed financial analysis.",
        ],
    },
    {
        id: "bank-officer",
        title: "Bank Officer",
        summary:
            "Bank officer experienced in managing customer accounts, transactions, and financial services. Skilled at ensuring compliance while delivering strong customer service.",
        bullets: [
            "Managed customer accounts and processed financial transactions accurately.",
            "Advised customers on banking products and services suited to their needs.",
            "Ensured compliance with banking regulations and internal policies.",
        ],
    },
    {
        id: "insurance-agent",
        title: "Insurance Agent",
        summary:
            "Insurance agent experienced in helping clients select coverage that fits their needs. Skilled at building trust and explaining complex policies in clear terms.",
        bullets: [
            "Advised clients on insurance policies suited to their personal or business needs.",
            "Processed policy applications, renewals, and claims efficiently.",
            "Built long-term client relationships through consistent, reliable service.",
        ],
    },
    {
        id: "real-estate-agent",
        title: "Real Estate Agent",
        summary:
            "Real estate agent experienced in guiding clients through buying, selling, and renting properties. Skilled at negotiation and market analysis.",
        bullets: [
            "Guided clients through the buying and selling process from listing to closing.",
            "Conducted market research to price properties competitively.",
            "Negotiated offers between buyers and sellers to reach favorable agreements.",
        ],
    },
    {
        id: "teacher",
        title: "Teacher",
        summary:
            "Teacher experienced in planning and delivering engaging lessons that support student learning and growth. Skilled at adapting instruction to different learning styles.",
        bullets: [
            "Planned and delivered lessons aligned with curriculum standards and learning objectives.",
            "Assessed student progress and provided constructive feedback to support improvement.",
            "Communicated regularly with parents and guardians regarding student performance.",
        ],
    },
    {
        id: "university-lecturer",
        title: "University Lecturer",
        summary:
            "University lecturer experienced in teaching and mentoring students at the higher education level. Skilled at combining academic rigor with clear, engaging instruction.",
        bullets: [
            "Delivered lectures and led discussions across undergraduate or graduate courses.",
            "Designed course materials, assignments, and assessments aligned with learning outcomes.",
            "Mentored students on academic projects and research initiatives.",
        ],
    },
    {
        id: "school-administrator",
        title: "School Administrator",
        summary:
            "School administrator experienced in overseeing daily school operations and supporting staff and students. Skilled at policy implementation and organizational leadership.",
        bullets: [
            "Managed daily school operations to ensure a safe, productive learning environment.",
            "Supported teachers and staff with resources, scheduling, and policy guidance.",
            "Coordinated with parents and the community on school programs and initiatives.",
        ],
    },
    {
        id: "research-assistant",
        title: "Research Assistant",
        summary:
            "Research assistant experienced in supporting academic or scientific research through data collection and analysis. Skilled at working carefully within structured research protocols.",
        bullets: [
            "Assisted with data collection, entry, and analysis for ongoing research projects.",
            "Conducted literature reviews to support research design and findings.",
            "Prepared reports and presentations summarizing research results.",
        ],
    },
    {
        id: "nurse",
        title: "Nurse",
        summary:
            "Nurse experienced in providing compassionate, high-quality patient care in fast-paced clinical settings. Skilled at patient assessment and coordinating with care teams.",
        bullets: [
            "Provided direct patient care including monitoring vitals and administering medication.",
            "Collaborated with physicians and care teams to develop and follow treatment plans.",
            "Educated patients and families on care instructions and health management.",
        ],
    },
    {
        id: "doctor",
        title: "Doctor",
        summary:
            "Physician experienced in diagnosing and treating patients with a focus on quality care and patient wellbeing. Skilled at clinical decision-making under pressure.",
        bullets: [
            "Diagnosed and treated patients across a range of medical conditions.",
            "Reviewed patient history and test results to inform accurate treatment plans.",
            "Collaborated with specialists and care teams to coordinate comprehensive patient care.",
        ],
    },
    {
        id: "pharmacist",
        title: "Pharmacist",
        summary:
            "Pharmacist experienced in dispensing medication accurately and advising patients on safe use. Skilled at ensuring compliance with pharmaceutical regulations.",
        bullets: [
            "Dispensed prescription medications accurately and verified for potential interactions.",
            "Advised patients on proper medication use, dosage, and potential side effects.",
            "Maintained accurate pharmacy records in compliance with regulatory standards.",
        ],
    },
    {
        id: "veterinarian",
        title: "Veterinarian",
        summary:
            "Veterinarian experienced in diagnosing and treating animals across a range of conditions. Skilled at client communication and compassionate animal care.",
        bullets: [
            "Diagnosed and treated illnesses and injuries in a variety of animal patients.",
            "Performed routine examinations, vaccinations, and minor surgical procedures.",
            "Advised pet owners on animal health, nutrition, and preventive care.",
        ],
    },
    {
        id: "fitness-trainer",
        title: "Fitness Trainer",
        summary:
            "Fitness trainer experienced in designing personalized workout programs that help clients reach their health goals. Skilled at motivation and proper exercise technique coaching.",
        bullets: [
            "Designed personalized training programs based on individual client goals and fitness levels.",
            "Coached clients on proper exercise form to maximize results and reduce injury risk.",
            "Tracked client progress and adjusted programs to maintain steady improvement.",
        ],
    },
    {
        id: "chef",
        title: "Chef",
        summary:
            "Chef experienced in menu development and kitchen management in fast-paced culinary environments. Skilled at maintaining food quality and consistency under pressure.",
        bullets: [
            "Prepared and plated dishes to consistent quality and presentation standards.",
            "Managed kitchen inventory and coordinated with suppliers to reduce food waste.",
            "Trained and supervised kitchen staff to maintain efficient service during peak hours.",
        ],
    },
    {
        id: "hospitality-manager",
        title: "Hospitality Manager",
        summary:
            "Hospitality manager experienced in overseeing guest services and daily operations to deliver excellent customer experiences. Skilled at team leadership and problem resolution.",
        bullets: [
            "Managed daily operations to ensure smooth, high-quality guest experiences.",
            "Trained and supervised staff across front-desk and service teams.",
            "Resolved guest concerns promptly to maintain satisfaction and repeat business.",
        ],
    },
    {
        id: "retail-store-manager",
        title: "Retail Store Manager",
        summary:
            "Retail store manager experienced in overseeing daily store operations, staff, and sales performance. Skilled at inventory management and customer service leadership.",
        bullets: [
            "Managed daily store operations including staffing, inventory, and sales targets.",
            "Trained and supervised sales associates to deliver consistent customer service.",
            "Analyzed sales data to identify trends and improve store performance.",
        ],
    },
    {
        id: "supply-chain-analyst",
        title: "Supply Chain Analyst",
        summary:
            "Supply chain analyst experienced in optimizing logistics and inventory processes to improve efficiency. Skilled at data-driven decision-making across the supply chain.",
        bullets: [
            "Analyzed supply chain data to identify inefficiencies and recommend improvements.",
            "Coordinated with vendors and logistics partners to ensure timely delivery of goods.",
            "Monitored inventory levels to balance cost efficiency with product availability.",
        ],
    },
    {
        id: "civil-engineer",
        title: "Civil Engineer",
        summary:
            "Civil engineer experienced in planning and overseeing construction projects from design through completion. Skilled at ensuring structural safety and regulatory compliance.",
        bullets: [
            "Designed and reviewed plans for infrastructure and construction projects.",
            "Ensured projects met safety codes and regulatory requirements throughout execution.",
            "Coordinated with contractors and project teams to keep projects on schedule and budget.",
        ],
    },
    {
        id: "mechanical-engineer",
        title: "Mechanical Engineer",
        summary:
            "Mechanical engineer experienced in designing and testing mechanical systems and components. Skilled at applying engineering principles to solve real-world problems.",
        bullets: [
            "Designed and tested mechanical components to meet performance and safety requirements.",
            "Used simulation tools to evaluate designs before physical prototyping.",
            "Collaborated with cross-functional teams to bring products from concept to production.",
        ],
    },
    {
        id: "electrical-engineer",
        title: "Electrical Engineer",
        summary:
            "Electrical engineer experienced in designing and testing electrical systems and circuits. Skilled at troubleshooting and ensuring compliance with safety standards.",
        bullets: [
            "Designed and tested electrical systems and circuits for various applications.",
            "Troubleshot and resolved electrical issues to minimize system downtime.",
            "Ensured designs complied with relevant safety and industry standards.",
        ],
    },
    {
        id: "architect",
        title: "Architect",
        summary:
            "Architect experienced in designing functional, aesthetically compelling buildings and spaces. Skilled at balancing client vision with structural and regulatory requirements.",
        bullets: [
            "Designed architectural plans for residential and commercial projects.",
            "Collaborated with engineers and contractors to ensure designs were structurally sound.",
            "Ensured project designs complied with zoning laws and building codes.",
        ],
    },
    {
        id: "environmental-scientist",
        title: "Environmental Scientist",
        summary:
            "Environmental scientist experienced in researching and analyzing environmental data to support sustainability initiatives. Skilled at fieldwork and regulatory compliance.",
        bullets: [
            "Conducted field research and collected environmental data for analysis.",
            "Analyzed data to assess environmental impact and compliance with regulations.",
            "Prepared reports and recommendations to support sustainability initiatives.",
        ],
    },
    {
        id: "lawyer",
        title: "Lawyer",
        summary:
            "Lawyer experienced in providing legal counsel and representing clients across a range of matters. Skilled at legal research, negotiation, and clear client communication.",
        bullets: [
            "Provided legal counsel to clients on a range of legal matters.",
            "Conducted legal research to support case preparation and strategy.",
            "Drafted and reviewed contracts, agreements, and legal documents.",
        ],
    },
    {
        id: "paralegal",
        title: "Paralegal",
        summary:
            "Paralegal experienced in supporting attorneys through research, documentation, and case preparation. Skilled at organization and attention to detail under deadline pressure.",
        bullets: [
            "Conducted legal research and prepared documentation to support case preparation.",
            "Organized and maintained case files, ensuring accuracy and accessibility.",
            "Assisted attorneys with drafting correspondence and legal filings.",
        ],
    },
    {
        id: "event-planner",
        title: "Event Planner",
        summary:
            "Event planner experienced in coordinating events from concept through execution. Skilled at vendor management, budgeting, and problem-solving under time pressure.",
        bullets: [
            "Planned and coordinated events from initial concept through day-of execution.",
            "Managed vendor relationships and negotiated contracts to stay within budget.",
            "Resolved on-site issues quickly to ensure smooth event delivery.",
        ],
    },
];

/** Simple case-insensitive search helper for the profession picker UI. */
export function searchProfessionFallbacks(query: string): ProfessionFallback[] {
    const q = query.trim().toLowerCase();
    if (!q) return PROFESSION_FALLBACKS;
    return PROFESSION_FALLBACKS.filter((p) => p.title.toLowerCase().includes(q));
}