export interface NavItem {
  label: string;
  href: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  accentColor: "blue" | "red";
  image?: string;
  imageAlt?: string;
}

export interface AboutPrinciple {
  number: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  shortDesc: string;
  details: string;
  image?: string;
  imageAlt?: string;
  squad?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ClientItem {
  id: string;
  name: string;
  logoText: string;  // placeholder text since no real logo files exist
  category: string;  // e.g. 'Healthcare', 'Tech', etc.
}

export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  eyebrow: string;
  heroHeadline: string;
  heroDescription: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  capabilities: string[];
  navLinks: NavItem[];
  services: ServiceItem[];
  about: {
    heading: string;
    subheading: string;
    leadParagraph: string;
    secondaryParagraph: string;
    principles: AboutPrinciple[];
  };
  process: {
    heading: string;
    subheading: string;
    steps: ProcessStep[];
  };
  clients: {
    heading: string;
    headingItalic: string;
    subheading: string;
    items: ClientItem[];
  };
  faq: {
    heading: string;
    subheading: string;
    items: FaqItem[];
  };
  inquiry: {
    heading: string;
    subheading: string;
    note: string;
  };
  footer: {
    summary: string;
    copyrightYear: number;
    email: string;
    location: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "AR Digital Marketing",
  shortName: "AR Marketing",
  tagline: "Strategic Growth & Digital Performance",
  eyebrow: "AR DIGITAL MARKETING",
  heroHeadline: "Make your brand impossible to ignore.",
  heroDescription:
    "We bring strategy, design, and digital marketing together to help your business reach the right people and turn attention into meaningful action.",
  primaryCta: {
    label: "Let's Talk Growth",
    href: "#inquiry",
  },
  secondaryCta: {
    label: "Explore Our Services",
    href: "#services",
  },
  capabilities: [
    "Strategy",
    "Branding",
    "Search",
    "Social",
    "Websites",
  ],
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Services", href: "#services" },
    { label: "About", href: "/about" },
    { label: "Process", href: "#process" },
    { label: "FAQs", href: "#faqs" },
    { label: "Contact", href: "/contact" },
  ],
  services: [
    {
      id: "seo-local",
      number: "01",
      title: "SEO & Local Search",
      tagline: "Be discovered by high-intent local and national customers.",
      description:
        "We build clean technical foundations, high-value local citations, and focused content architectures that earn organic rankings and sustainable visibility.",
      image: "/images/services/service_seo_light.jpg",
      imageAlt: "Service 01: SEO & Local Search - Minimalist frosted glass loupe and high-intent discovery path across porcelain map tiles",
      deliverables: [
        "Technical site audits and speed tuning",
        "Local map pack and citation optimization",
        "Targeted keyword and intent mapping",
        "On-page structure and schema markup",
      ],
      accentColor: "blue",
    },
    {
      id: "social-media",
      number: "02",
      title: "Social Media Marketing",
      tagline: "Turn passive followers into an active, loyal community.",
      description:
        "Consistent, brand-aligned visual storytelling and platform-specific messaging designed to spark engagement, build trust, and keep your company top of mind.",
      image: "/images/services/service_social_light.jpg",
      imageAlt: "Service 02: Social Media Marketing - Minimalist ceramic speech bubbles with interlocking frosted glass links and coral accents",
      deliverables: [
        "Channel positioning and monthly content calendars",
        "Creative asset production and copywriting",
        "Community interaction and response frameworks",
        "Audience growth and analytics reporting",
      ],
      accentColor: "red",
    },
    {
      id: "paid-advertising",
      number: "03",
      title: "Paid Advertising",
      tagline: "High-precision traffic engineered for measurable returns.",
      description:
        "Targeted search and social campaigns built around realistic unit economics. We eliminate ad waste through disciplined audience testing and conversion-focused creative.",
      image: "/images/services/service_ads_light.jpg",
      imageAlt: "Service 03: Paid Advertising - Minimalist concentric target plinth with precision trajectory arrow and refraction prism",
      deliverables: [
        "Google Search and Meta campaign architecture",
        "Audience segmentation and retargeting funnels",
        "High-conversion ad copywriting and design",
        "Conversion tracking and weekly budget control",
      ],
      accentColor: "blue",
    },
    {
      id: "branding-design",
      number: "04",
      title: "Branding & Graphic Design",
      tagline: "Distinctive identities that command authority from day one.",
      description:
        "Visual identities, design systems, and marketing collateral that communicate quality instantly and ensure every customer touchpoint reflects your standards.",
      image: "/images/services/service_branding_light.jpg",
      imageAlt: "Service 04: Branding & Graphic Design - Minimalist ceramic design sculpture, acrylic swatch chips, and drafting caliper",
      deliverables: [
        "Logo lockups, typography, and color systems",
        "Brand style guidelines and vector assets",
        "Marketing decks, brochures, and digital banners",
        "Social media kits and promotional templates",
      ],
      accentColor: "red",
    },
    {
      id: "websites-landing-pages",
      number: "05",
      title: "Website & Landing Page Development",
      tagline: "Fast, modern web properties built to convert visitors into inquiries.",
      description:
        "Responsive, performance-tuned web pages engineered for clarity and user action. We prioritize lightning-fast load times, clean semantics, and effortless inquiry flows.",
      image: "/images/services/service_web_light.jpg",
      imageAlt: "Service 05: Website & Landing Page Development - Minimalist architectural wireframe structure with translucent prism on clean porcelain surface",
      deliverables: [
        "Modern responsive layouts optimized for mobile",
        "High-converting landing page copywriting",
        "Core Web Vitals and accessibility optimization",
        "Clean form handling and analytics integrations",
      ],
      accentColor: "blue",
    },
    {
      id: "content-video",
      number: "06",
      title: "Content & Video Marketing",
      tagline: "Compelling narratives that answer questions and earn decisions.",
      description:
        "Educational articles, case studies, and engaging short-form video that position your team as industry leaders while addressing direct customer questions.",
      image: "/images/services/service_content_light.jpg",
      imageAlt: "Service 06: Content & Video Marketing - Minimalist editorial accordion layout, publication blocks, and precision drafting divider",
      deliverables: [
        "Content strategy and editorial planning",
        "Short-form video concepts and editing",
        "Authoritative articles and customer guides",
        "Email newsletters and nurture sequences",
      ],
      accentColor: "red",
    },
  ],
  about: {
    heading: "Good marketing starts with understanding your business.",
    subheading: "Who We Are",
    leadParagraph:
      "At AR Digital Marketing, we treat marketing as a structured discipline rather than guesswork. Every campaign, visual element, and search strategy connects directly to your operational priorities and revenue goals.",
    secondaryParagraph:
      "We partner with forward-thinking businesses that value clarity, consistent brand execution, and measurable momentum. Instead of chasing vanity metrics, our focus remains on attracting the right prospects and building genuine trust.",
    principles: [
      {
        number: "01",
        title: "Strategy before execution.",
        description:
          "We never rush into tactics without first understanding your audience, offer positioning, and competitive landscape. Clear direction prevents wasted spend.",
      },
      {
        number: "02",
        title: "A consistent brand across channels.",
        description:
          "From your website to your social presence and search listings, every interaction must reinforce the same uncompromising standard of quality.",
      },
      {
        number: "03",
        title: "Clear communication and ongoing improvement.",
        description:
          "We communicate honestly about what works, what needs adjustment, and what comes next. Marketing improves through disciplined testing and constant refinement.",
      },
    ],
  },
  process: {
    heading: "A clear path from idea to action.",
    subheading: "Our Methodology",
    steps: [
      {
        number: "01",
        title: "Discover",
        shortDesc: "Audit & Alignment",
        details:
          "We examine your current brand positioning, existing marketing assets, customer touchpoints, and immediate commercial objectives to establish an honest baseline.",
        image: "/images/process/process_discover_light.jpg",
        imageAlt: "Phase 1: Discover - Minimalist brand audit wireframe structure with translucent prism on clean porcelain surface",
        squad: "Audit & Intelligence Squad",
      },
      {
        number: "02",
        title: "Plan",
        shortDesc: "Roadmap & Strategy",
        details:
          "We outline a focused roadmap detailing priority channels, messaging angles, resource allocation, and key milestones so expectations are clear from day one.",
        image: "/images/process/process_plan_light.jpg",
        imageAlt: "Phase 2: Plan - Minimalist strategic roadmap with geometric modular blocks, paper milestones, and architectural tools",
        squad: "Strategy & Architecture Squad",
      },
      {
        number: "03",
        title: "Create & Launch",
        shortDesc: "Production & Deployment",
        details:
          "Our team develops production-ready visual assets, refines campaign copy, configures tracking pixels, and launches your initiatives with rigorous QA.",
        image: "/images/process/process_launch_light.jpg",
        imageAlt: "Phase 3: Create & Launch - Minimalist aerodynamic sculpture on pedestal symbolizing campaign takeoff and creative launch",
        squad: "Production & Creative Squad",
      },
      {
        number: "04",
        title: "Measure & Improve",
        shortDesc: "Review & Refinement",
        details:
          "We monitor performance signals, evaluate response rates, identify conversion friction, and iterate systematically to maximize your marketing return over time.",
        image: "/images/process/process_measure_light.jpg",
        imageAlt: "Phase 4: Measure & Improve - Minimalist frosted glass growth columns and ascending trajectory ribbon",
        squad: "Analytics & Growth Squad",
      },
    ],
  },
  clients: {
    heading: "Brands that grow",
    headingItalic: "with us.",
    subheading: "Clients / Trusted By",
    items: [
      { id: "c1", name: "AlphaTech", logoText: "AlphaTech", category: "Technology" },
      { id: "c2", name: "NovaBuild", logoText: "NovaBuild", category: "Construction" },
      { id: "c3", name: "HealthFirst", logoText: "HealthFirst", category: "Healthcare" },
      { id: "c4", name: "GreenLeaf", logoText: "GreenLeaf", category: "Sustainability" },
      { id: "c5", name: "PeakMedia", logoText: "PeakMedia", category: "Media" },
      { id: "c6", name: "CoreLogix", logoText: "CoreLogix", category: "Analytics" },
      { id: "c7", name: "SwiftRetail", logoText: "SwiftRetail", category: "Retail" },
      { id: "c8", name: "UrbanArch", logoText: "UrbanArch", category: "Architecture" },
      { id: "c9", name: "BrightFinance", logoText: "BrightFinance", category: "Finance" },
      { id: "c10", name: "SkyLegal", logoText: "SkyLegal", category: "Legal" },
      { id: "c11", name: "PrimeEats", logoText: "PrimeEats", category: "F&B" },
      { id: "c12", name: "EduForward", logoText: "EduForward", category: "Education" },
      { id: "c13", name: "VitalCare", logoText: "VitalCare", category: "Healthcare" },
      { id: "c14", name: "RealEdge", logoText: "RealEdge", category: "Real Estate" },
      { id: "c15", name: "OmniLogic", logoText: "OmniLogic", category: "Software" },
      { id: "c16", name: "NexaCloud", logoText: "NexaCloud", category: "SaaS" },
      { id: "c17", name: "PulseHealth", logoText: "PulseHealth", category: "HealthTech" },
      { id: "c18", name: "PayVerve", logoText: "PayVerve", category: "FinTech" },
      { id: "c19", name: "AuraLiving", logoText: "AuraLiving", category: "E-Commerce" },
      { id: "c20", name: "GrandVista", logoText: "GrandVista", category: "Hospitality" },
      { id: "c21", name: "TerraPower", logoText: "TerraPower", category: "CleanTech" },
      { id: "c22", name: "SynthMind", logoText: "SynthMind", category: "AI Platforms" },
      { id: "c23", name: "KinetixSec", logoText: "KinetixSec", category: "Cybersecurity" },
      { id: "c24", name: "AeroPulse", logoText: "AeroPulse", category: "Mobility" },
    ],
  },
  faq: {
    heading: "Frequently Asked Questions",
    subheading: "Common questions about working with us.",
    items: [
      {
        id: "faq-businesses",
        question: "What types of businesses do you work with?",
        answer:
          "We work primarily with growing small to mid-sized businesses, professional service providers, and local operators who want to establish a commanding digital presence. Whether you need a full digital foundation or targeted campaign management, we tailor our scope to your current stage.",
      },
      {
        id: "faq-timeline",
        question: "How quickly can we expect to see results?",
        answer:
          "Timelines vary depending on the chosen channel. Paid advertising and landing page overhauls can generate inquiries within weeks of launch. Organic search optimization and brand equity building typically require 3 to 6 months of steady execution to demonstrate sustainable momentum.",
      },
      {
        id: "faq-packages",
        question: "Do you offer custom packages or fixed services?",
        answer:
          "Every business has unique priorities. While we have standardized delivery frameworks for our core services, we structure our client engagements around your specific growth bottlenecks, team capacity, and marketing budget.",
      },
      {
        id: "faq-onboarding",
        question: "What does the onboarding process look like?",
        answer:
          "After an initial discovery conversation, we provide a clear scope of work and mutual agreement. Once approved, we schedule a kickoff session, collect access to your existing digital properties, and begin the Discovery phase within 3 business days.",
      },
      {
        id: "faq-communication",
        question: "How do we communicate and track campaign progress?",
        answer:
          "We believe in straightforward, reliable communication. You receive direct communication through scheduled check-ins and structured summary updates. We focus on real business metrics like qualified inquiries, traffic quality, and conversion rates.",
      },
    ],
  },
  inquiry: {
    heading: "Let's make your next move count.",
    subheading: "Start a Conversation",
    note: "Share your business goals with us. We will review your current digital footprint and discuss how we can work together.",
  },
  footer: {
    summary:
      "AR Digital Marketing brings strategy, branding, and performance together to build authoritative digital brands that drive real business growth.",
    copyrightYear: 2026,
    email: "contact@ardigitalmarketing.com",
    location: "Global & Local Strategic Marketing",
  },
};
