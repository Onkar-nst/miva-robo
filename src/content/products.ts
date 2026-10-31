export type SpecGroup = { group?: string; rows: [string, string][] };
export type Item = { title: string; text: string };

export type Product = {
  slug: string;
  name: string;
  title: string;
  tagline: string;
  hero: string;
  secondary?: string;
  /** Spec labels surfaced as large read-outs above the spec table. */
  highlights?: string[];
  about?: string[];
  whyIntro?: string[];
  why?: string[];
  specs?: SpecGroup[];
  capabilities?: Item[];
  capabilitiesNote?: string;
  applicationsIntro?: string;
  applications?: string[];
  connects?: { intro: string; items: string[]; outro: string };
  comingSoon?: boolean;
};

export const products: Product[] = [
  {
    slug: "miva-axis",
    name: "MIVA AXIS",
    title: "MIVA AXIS – MIVA Robotics",
    tagline: "Modular Gantry Automation for High-Speed, Reliable Pick & Place",
    hero: "/media/MIVA-AXIS-1.jpg",
    secondary: "/media/MIVA-AXIS-2.jpg",
    highlights: ["Payload Capacity", "Repeatability", "Axes"],
    about: [
      "MIVA AXIS is a vertical and horizontal gantry-based pick-and-place system designed for repetitive, high-throughput industrial operations. Built specifically for MSMEs, it delivers consistent performance, fast cycle times, and easy integration without the cost and complexity of traditional robotic systems.",
      "Whether it’s palletizing, sorting, machine loading, or material transfer, MIVA AXIS provides a robust, scalable automation solution that fits seamlessly into existing production environments.",
    ],
    whyIntro: [
      "Traditional pick-and-place automation is often expensive, rigid, and over-engineered. MIVA AXIS takes a different approach focusing on simplicity, adaptability, and reliability.",
    ],
    why: [
      "Designed for fast ROI",
      "Minimal programming and setup",
      "Easily adaptable to changing layouts and product sizes",
      "Built for continuous industrial operation",
    ],
    specs: [
      { group: "Configuration", rows: [["Configuration", "Vertical / Horizontal Gantry"], ["Axes", "2–4 Axis (Configurable)"], ["Working Area", "Customizable to Layout"]] },
      { group: "Performance", rows: [["Payload Capacity", "Up to 50 kg (Configurable)"], ["Repeatability", "±0.1 mm (Application Dependent)"], ["Cycle Time", "High-Speed (Application Dependent)"], ["Drive System", "Servo Motor Driven"]] },
      { group: "Integration & Control", rows: [["Vision Integration", "Optional (OCR Camera & MIVA EYE Compatible)"], ["Control System", "MIVA OS"], ["Power Supply", "Industrial AC"]] },
      { group: "Safety & Deployment", rows: [["Safety", "E-Stop, Safety Sensors, Interlocks"], ["Deployment Model", "Purchase / HaaS"]] },
    ],
    capabilities: [
      { title: "Vertical & Horizontal Configurations", text: "Supports multiple layouts to match factory constraints and process flow." },
      { title: "High-Speed & Repeatable Motion", text: "Ensures consistent cycle times and reliable throughput for repetitive tasks." },
      { title: "Modular Mechanical Design", text: "Easy to scale, reconfigure, or upgrade as production needs evolve." },
      { title: "Vision-Ready Architecture", text: "Optional integration with vision systems for object detection, orientation, and quality checks." },
      { title: "Low Maintenance & High Uptime", text: "Industrial-grade components with predictive maintenance support via MIVA OS." },
    ],
    applicationsIntro: "MIVA AXIS is ideal for:",
    applications: ["Pick-and-place operations", "Machine loading and unloading", "Sorting and segregation", "Palletizing and depalletizing", "Assembly line transfer operations"],
  },
  {
    slug: "miva-navis",
    name: "MIVA NAVIS",
    title: "MIVA NAVIS – MIVA Robotics",
    tagline: "Smart Autonomous Mobility for Efficient Material Handling",
    hero: "/media/MIVA-AMR-1.jpg",
    secondary: "/media/MIVA-AMR-2.jpg",
    highlights: ["Payload Capacity", "Speed", "Runtime"],
    about: [
      "MIVA NAVIS is a smart Autonomous Mobile Robot designed to streamline material handling and internal logistics in dynamic industrial environments. Built for flexibility and ease of deployment, it operates safely alongside people while adapting to changing layouts and workflows.",
      "With hybrid localization, intelligent navigation, and automatic charging, MIVA NAVIS enables continuous, reliable operation helping MSMEs reduce manual movement, improve material flow, and increase overall shop-floor efficiency.",
    ],
    whyIntro: [
      "Manual material movement is time-consuming, inconsistent, and labour-intensive. Traditional AGVs, on the other hand, are rigid and difficult to modify. MIVA NAVIS bridges this gap by offering intelligent mobility without fixed infrastructure.",
    ],
    why: ["No fixed tracks or markers required", "Adapts easily to layout changes", "Safe operation in mixed human–robot environments", "Designed for fast deployment and quick ROI"],
    specs: [
      { group: "Navigation", rows: [["Navigation", "Hybrid Localization (LiDAR + Vision + Odometry)"], ["Obstacle Avoidance", "Dynamic, Real-Time"], ["Indoor/Outdoor", "Indoor / Semi-Indoor"]] },
      { group: "Performance", rows: [["Payload Capacity", "Up to 300 kg (Configurable)"], ["Speed", "Up to 1.5 m/s"], ["Runtime", "8–12 Hours (Typical)"]] },
      { group: "Power & Safety", rows: [["Charging", "Automatic Docking & Charging"], ["Safety", "Emergency Stop, Safety Scanners"]] },
      { group: "Control & Deployment", rows: [["Fleet Management", "Supported via MIVA OS"], ["Deployment Model", "Purchase / RaaS"]] },
    ],
    capabilities: [
      { title: "Hybrid Localization & Navigation", text: "Combines multiple sensing technologies to navigate reliably in changing factory environments." },
      { title: "Autonomous Material Transport", text: "Efficiently handles bins, trolleys, pallets, or custom payloads across production areas." },
      { title: "Automatic Charging", text: "Intelligent charging ensures uninterrupted operation with minimal human intervention." },
      { title: "Obstacle Detection & Safety", text: "Built-in safety systems enable smooth operation around people, machines, and moving objects." },
      { title: "Scalable Fleet Operation", text: "Deploy a single AMR or coordinate multiple units through MIVA OS for higher throughput." },
    ],
    applicationsIntro: "MIVA NAVIS is ideal for:",
    applications: ["Raw material movement", "Work-in-progress (WIP) transport", "Finished goods transfer", "Line-side material supply", "Intra-factory logistics"],
  },
  {
    slug: "miva-eagle",
    name: "MIVA EAGLE",
    title: "MIVA EAGLE – MIVA Robotics",
    tagline: "Autonomous Aerial Intelligence for Monitoring, Safety & Precision Operations",
    hero: "/media/MIVA-EAGLE-2.jpg",
    secondary: "/media/MIVA-EAGLE-1.png",
    highlights: ["Flight Time", "Flight Mode", "Navigation"],
    about: [
      "MIVA EAGLE is an autonomous drone platform designed for intelligent monitoring, inspection, and operational coverage across multiple industries. Built for flexibility and ease of deployment, it delivers reliable aerial intelligence for applications ranging from agriculture and construction to industrial safety and facility monitoring.",
      "By combining autonomous navigation, mission planning, and real-time data capture, MIVA EAGLE helps organizations improve visibility, enhance safety, and make faster, data-driven decisions without the complexity traditionally associated with drone operations.",
    ],
    whyIntro: [
      "Manual monitoring of large areas is inefficient, time-consuming, and often unsafe. Conventional drone solutions require skilled pilots and complex workflows. MIVA EAGLE removes these barriers by enabling autonomous, repeatable, and scalable aerial operations.",
    ],
    why: ["Autonomous mission execution", "Minimal operator intervention", "Rapid area coverage with consistent data quality", "Designed for practical, real-world deployment"],
    specs: [
      { group: "Platform", rows: [["Platform Type", "Multi-Rotor Autonomous Drone"], ["Flight Mode", "Autonomous / Assisted"], ["Deployment Model", "Mission-Based / Subscription"]] },
      { group: "Payload", rows: [["Payload Options", "Camera / Sprayer / Sensors"]] },
      { group: "Flight Performance", rows: [["Flight Time", "20–40 Minutes (Payload Dependent)"], ["Coverage Area", "Application Dependent"]] },
      { group: "Navigation & Data", rows: [["Navigation", "GPS + Vision-Assisted"], ["Data Capture", "Live Video & Mission Data"]] },
      { group: "Applications & Safety", rows: [["Applications", "Agriculture, Construction, Safety"], ["Safety", "Fail-Safe & Return-to-Home"]] },
      { group: "Control", rows: [["Control Platform", "MIVA OS"]] },
    ],
    capabilities: [
      { title: "Autonomous Flight & Mission Planning", text: "Predefined missions for repeatable coverage across fields, sites, or facilities." },
      { title: "Multi-Sector Payload Support", text: "Configurable payloads for spraying, seeding, visual inspection, and surveillance." },
      { title: "Real-Time Data Capture & Insights", text: "Live video and data streams for immediate visibility and decision-making." },
      { title: "Safety & Compliance Ready", text: "Designed with operational safety and regulatory considerations in mind." },
      { title: "Scalable Deployment", text: "Suitable for single-site operations or large-area coverage across multiple locations." },
    ],
    applicationsIntro: "MIVA EAGLE is ideal for:",
    applications: ["Agricultural spraying and seeding", "Crop and field monitoring", "Construction site surveillance and progress tracking", "Industrial safety monitoring", "Facility inspection and coverage"],
  },
  {
    slug: "miva-eye",
    name: "MIVA EYE",
    title: "MIVA EYE – MIVA Robotics",
    tagline: "AI-Powered Vision Systems for Inspection, Monitoring & Quality Control",
    hero: "/media/MIVA-EYE-1.jpg",
    secondary: "/media/MIVA-EYE-2.jpg",
    highlights: ["Inspection Speed", "AI Capability", "Camera Support"],
    about: [
      "MIVA EYE is an AI-driven vision and inspection system designed to deliver accurate, consistent, and real-time quality monitoring across industrial processes. Built for practical deployment in MSME environments, it replaces manual inspection with intelligent vision that adapts to variation in products, lighting, and processes.",
      "From paint inspection and surface defect detection to assembly verification and tolerance inspection, MIVA EYE helps manufacturers improve quality, reduce rework, and maintain consistent standards without increasing operational complexity.",
    ],
    whyIntro: [
      "Manual inspection is subjective, inconsistent, and difficult to scale. Traditional vision systems are rigid and expensive to maintain. MIVA EYE bridges this gap by combining AI-based adaptability with industrial-grade reliability.",
    ],
    why: ["Consistent inspection across shifts", "Reduced dependency on skilled inspectors", "Fast setup and easy reconfiguration", "Designed for real factory conditions"],
    specs: [
      { rows: [["Inspection Type", "AI-Based Visual Inspection"], ["Applications", "Paint, Surface, Assembly, Tolerance"], ["Camera Support", "Area / Line Scan (Configurable)"], ["Lighting", "Configurable Industrial Lighting"], ["AI Capability", "Adaptive & Active Learning"], ["Inspection Speed", "Real-Time"], ["Accuracy", "Application Dependent"], ["Integration", "Robots, Gantries, Conveyors, Custom"], ["Analytics", "Quality Trends & Reports"], ["Control Software", "MIVA OS"], ["Deployment Model", "SaaS / Integrated"]] },
    ],
    capabilities: [
      { title: "AI-Driven Visual Inspection", text: "Detects defects, deviations, and anomalies beyond rule-based vision systems." },
      { title: "Multi-Application Support", text: "Suitable for paint inspection, surface defects, assembly checks, and dimensional verification." },
      { title: "Adaptive Learning", text: "Learns from real production data to improve accuracy over time." },
      { title: "Real-Time Monitoring & Alerts", text: "Immediate feedback enables faster corrective actions and reduced scrap." },
      { title: "Flexible Hardware Integration", text: "Works with multiple camera types and industrial setups." },
    ],
    applicationsIntro: "MIVA EYE is ideal for:",
    applications: ["Paint and coating inspection", "Surface defect detection", "Assembly verification", "Dimensional and tolerance inspection", "Process monitoring and traceability"],
  },
  {
    slug: "miva-os",
    name: "MIVA OS",
    title: "MIVA OS – MIVA Robotics",
    tagline: "Unified Intelligence Platform for Robotics, Vision & Automation",
    hero: "/media/MIVA-OS.png",
    secondary: "/media/MIVA-OS-2.jpg",
    about: [
      "MIVA OS is a unified software platform that powers, connects, and manages all MIVA robotic and automation systems as well as many 3rd party automation and robotic systems. It brings together motion control, vision intelligence, fleet management, and analytics into a single, intuitive interface, designed for real-world industrial environments.",
      "Built with MSMEs in mind, MIVA OS simplifies complex automation by enabling centralized control, real-time monitoring, and continuous system improvement without requiring deep robotics or AI expertise.",
    ],
    whyIntro: [
      "Most automation systems operate in silos : separate software for robots, vision, analytics, and maintenance. This increases complexity, cost, and downtime.",
      "MIVA OS removes this fragmentation by acting as a single intelligence layer across the factory floor.",
    ],
    why: ["One platform for all automation assets", "Reduced operational complexity", "Better visibility and decision-making", "Scales seamlessly as automation grows"],
    capabilities: [
      { title: "Unified Control & Monitoring", text: "Manage robots, AMRs, vision systems, and drones from a single dashboard." },
      { title: "AI-Driven Analytics & Learning", text: "Analyze operational data to improve performance, accuracy, and efficiency over time." },
      { title: "Fleet & Task Management", text: "Coordinate multiple systems, assign tasks, and optimize workflows dynamically." },
      { title: "Predictive Maintenance", text: "Monitor system health and detect issues early to minimize downtime and maintenance costs." },
      { title: "Open & Scalable Architecture", text: "Designed to integrate with existing factory systems and expand as needs evolve." },
    ],
    capabilitiesNote: "* (Currently partnered with more than 35 automation & robot providers worldwide)",
    connects: {
      intro: "MIVA OS seamlessly powers:",
      items: ["MIVA AXIS, MIVA NAVIS, MIVA ASSIST, MIVA EYE and MIVA EAGLE.", "Any and every 3rd party Automation and Robotics systems*"],
      outro: "This creates a connected automation ecosystem, not isolated machines.",
    },
  },
  {
    slug: "miva-assist",
    name: "MIVA ASSIST",
    title: "MIVA ASSIST – MIVA Robotics",
    tagline: "Collaborative Semi-Humanoid Robot for Flexible Industrial Support",
    hero: "/media/MIVA-ASSIST-1.jpg",
    comingSoon: true,
  },
];

export type Service = {
  slug: string;
  short: string;
  full: string;
  title: string;
  heading: string;
  body: string[];
  includesTitle: string;
  includes: string[];
  benefits: Item[];
  images: { banner: string; a: string; b: string; c: string; d: string; e: string };
};

const imgs = (cap: string, low: string, one: string, two: string) => ({
  banner: `/media/${cap}_Banner.jpg`,
  a: `/media/${one}.jpg`,
  b: `/media/${two}.jpg`,
  c: `/media/${low}_3.jpg`,
  d: `/media/${low}_4.jpg`,
  e: `/media/${low}_4.1.jpg`,
});

export const services: Service[] = [
  {
    slug: "raas",
    short: "RaaS",
    full: "Robotics-as-a-Service",
    title: "RaaS – MIVA Robotics",
    heading: "Deploy Automation Without Heavy Upfront Investment",
    body: [
      "Robotics-as-a-Service (RaaS) from MIVA ROBOTICS enables businesses to adopt intelligent automation without the burden of large capital expenditure. Instead of purchasing expensive robotic systems upfront, customers can deploy automation through a flexible subscription or usage-based model making advanced robotics practical for MSMEs.",
      "With RaaS, MIVA handles system deployment, upgrades, monitoring, and ongoing support, allowing manufacturers to focus on operations while benefiting from continuous innovation and predictable costs.",
    ],
    includesTitle: "What RaaS Includes",
    includes: ["Deployment of automation & robotic systems", "Installation and commissioning", "Continuous performance monitoring", "Preventive and predictive maintenance", "Remote diagnostics and support"],
    benefits: [
      { title: "Reduced Upfront Investment", text: "Access advanced robotics without heavy capital expenditure through flexible service models designed to lower financial barriers for automation adoption." },
      { title: "Faster ROI and Scalability", text: "Start small, automate quickly, and scale operations as your business grows — achieving measurable returns without long implementation timelines." },
      { title: "Lower Operational Risk", text: "Continuous monitoring, maintenance support, and system updates ensure reliable performance while minimizing downtime and unexpected costs." },
      { title: "Always Up-to-Date Technology", text: "Benefit from ongoing software improvements, AI enhancements, and system upgrades without needing to replace existing infrastructure." },
      { title: "Flexible Expansion as Production Grows", text: "Easily add new robots, modules, or capabilities as demand increases, allowing automation to evolve alongside your operations." },
    ],
    images: imgs("RaaS", "Raas", "Raas_1.1", "Raas_2.2"),
  },
  {
    slug: "saas",
    short: "SaaS",
    full: "Software-as-a-Service",
    title: "SaaS – MIVA Robotics",
    heading: "Unified Intelligence Powered by MIVA OS",
    body: [
      "MIVA’s Software-as-a-Service (SaaS) delivers the intelligence behind modern automation. Powered by MIVA OS, our SaaS platform connects robots, vision systems, mobile platforms, and even third-party automation tools into a single digital ecosystem.",
      "Through cloud and edge computing, SaaS enables real-time monitoring, advanced analytics, predictive maintenance, and AI-driven learning helping businesses optimize performance without increasing operational complexity.",
    ],
    includesTitle: "What SaaS Includes",
    includes: ["Centralized automation dashboards", "Fleet and task management", "AI-driven analytics and reporting", "Predictive maintenance insights", "Remote monitoring and control", "Open API integration with existing systems"],
    benefits: [
      { title: "Continuous Software Upgrades", text: "Receive regular platform enhancements, new features, and performance improvements without disrupting your operations or requiring manual updates.Access advanced robotics without heavy capital expenditure through flexible service models designed to lower financial barriers for automation adoption." },
      { title: "Improved Decision-Making Through Data", text: "Transform operational data into actionable insights with real-time analytics and intelligent reporting that supports faster, more informed decisions." },
      { title: "Reduced Downtime and Maintenance Costs", text: "Predictive monitoring identifies potential issues early, helping prevent unexpected failures and lowering overall maintenance expenses." },
      { title: "Scalable Automation Intelligence", text: "Easily expand capabilities as your automation ecosystem grows, enabling smarter coordination between robots, vision systems, and workflows." },
      { title: "Simplified System Management", text: "Manage all connected automation from one intuitive platform, reducing complexity and improving visibility across your operations." },
    ],
    images: imgs("SaaS", "Saas", "SaaS_1.1", "SaaS_2.1"),
  },
  {
    slug: "caas",
    short: "CaaS",
    full: "Customisation-as-a-Service",
    title: "CaaS – MIVA Robotics",
    heading: "Automation Designed Around Your Workflow",
    body: [
      "Customization-as-a-Service (CaaS) ensures that automation fits the real-world needs of each factory. Rather than forcing standardized solutions, MIVA ROBOTICS collaborates closely with customers to design and deploy systems tailored to their specific processes, layouts, and operational goals.",
      "From initial analysis to long-term optimization, CaaS provides a hands-on engineering approach that ensures automation integrates seamlessly into existing workflows while remaining flexible for future growth.",
    ],
    includesTitle: "What CaaS Includes",
    includes: ["Process assessment and automation strategy", "Fleet and task management", "Custom system design and engineering", "Integration with existing machines and software", "Vision system configuration", "Operator training and deployment support", "Continuous optimization and upgrades"],
    benefits: [
      { title: "Faster Adaptation to Unique Workflows", text: "Automation solutions are tailored to your specific processes, enabling quicker integration and smoother adoption without disrupting existing operations." },
      { title: "Reduced Implementation Risk", text: "Hands-on engineering support and structured deployment ensure systems are designed correctly from the start, minimizing delays and costly adjustments." },
      { title: "Higher Efficiency and Productivity", text: "Optimized system design and workflow alignment help reduce manual effort, improve consistency, and increase overall operational performance." },
      { title: "Future-Ready Automation Architecture", text: "Scalable and modular solutions allow your automation setup to evolve as production needs grow and technologies advance." },
    ],
    images: imgs("CaaS", "Caas", "Caas_1.1", "Caas_2.1"),
  },
];

export const ctaText = "Ready to put intelligent automation to work?";
export const ctaSub = "Tell us about your operation and we'll help you find the right MIVA solution.";
export const ctaLabel = "Talk to Our Team";
