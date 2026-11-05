// English text for every page except the service pages
// (those live in src/content/services/en/).
// The Arabic file (ar.ts) must have exactly the same structure.

export const en = {
  nav: {
    services: 'Services',
    about: 'About',
    contact: 'Contact',
    cta: 'Talk to us',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    skip: 'Skip to content',
    main: 'Main',
    switchLabel: 'اقرأ هذه الصفحة بالعربية',
  },

  pillars: {
    ai: 'AI Solutions',
    oracle: 'Oracle Services',
  },

  platforms: {
    title: 'Platforms we work with',
    items: [
      'OCI Generative AI',
      'Oracle AI Data Platform',
      'Microsoft Azure AI',
      'Google Gemini',
      'OpenAI',
      'Anthropic Claude',
      'Meta Llama',
      'Oracle Fusion Cloud ERP',
      'Oracle Integration',
      'Oracle APEX',
      'Visual Builder',
      'Oracle Cloud Infrastructure',
      'Autonomous Database',
      'Oracle Digital Assistant',
    ],
  },

  home: {
    title: 'AI in Your Business: AI Solutions for Saudi Arabia & the Middle East',
    description:
      'Tx brings AI into your business: assistants, agents and data platforms in every language, on any major AI platform, connected to the systems you already run. Deep Oracle expertise. Saudi Arabia and the Middle East.',
    eyebrow: 'AI Solutions · Data Platforms · Automation',
    heading: 'Put AI to work',
    headingAccent: 'in your business',
    lead:
      'Tx helps organisations in Saudi Arabia and across the Middle East bring AI into everyday work: assistants that answer, agents that act and data platforms that make it possible. In every language, on any major AI platform, and connected to the systems you already run, including Oracle.',
    primaryCta: 'Start a conversation',
    secondaryCta: 'Explore our services',
    points: ['AI in every language', 'Any major AI platform', 'Connected to your systems'],
    stack: [
      { label: 'AI', chips: ['AI Assistants', 'AI Agents', 'AI Data Platform'] },
      { label: 'Your business systems', chips: ['ERP', 'CRM', 'HR', 'Documents'] },
      { label: 'Cloud & integration', chips: ['Oracle Integration', 'OCI', 'Azure · Google Cloud · AWS'] },
    ],
    stackCaption: 'AI connected to the systems that run your business',

    practices: {
      eyebrow: 'What we do',
      heading: 'Two practices. One team.',
      lead:
        'AI is what we do. Our Oracle expertise is how we connect it to the finance, procurement and operations systems your business already runs on.',
      ai: 'Assistants, agents, data platforms and AI strategy that turn your data and documents into real results, in every language, on OCI, Microsoft Azure, Google Cloud, AWS or open-source models.',
      oracle: 'Implementation, integration and support across Oracle SaaS, PaaS and OCI.',
      viewAll: 'View all services',
    },

    together: {
      eyebrow: 'Why Tx',
      heading: 'AI that works with your systems, not beside them.',
      text:
        'Most AI pilots stall when they reach real business data. We build the AI and we connect it to the systems that run your business, Oracle or otherwise, securely, from the first pilot to production.',
      points: [
        {
          title: 'Connected to your data',
          text: 'Assistants and agents that read from, and act in, your ERP, CRM, documents and other systems.',
        },
        {
          title: 'Secure by design',
          text: 'Solutions that run in your own cloud tenancy, on OCI or another cloud, under your access controls and audit trail.',
        },
        {
          title: 'From pilot to production',
          text: 'The same team designs, builds, integrates and supports the solution.',
        },
      ],
    },

    region: {
      eyebrow: 'Built for the region',
      heading: 'Made for Saudi Arabia and the Middle East.',
      points: [
        { title: 'Every language', text: 'AI assistants that work naturally in Arabic, English and any other language your customers and employees speak.' },
        { title: 'Data residency', text: 'Solutions that can keep your data in the Kingdom using in-country OCI cloud regions.' },
        { title: 'Regulation-aware', text: 'Designed with the Personal Data Protection Law (PDPL) and national cybersecurity requirements in mind.' },
        { title: 'Vision 2030', text: 'Helping organisations modernise their operations as part of the Kingdom’s digital transformation.' },
      ],
    },

    cta: {
      heading: 'Let’s talk about AI in your business.',
      text: 'Tell us where you are today, and we’ll suggest a practical next step.',
      button: 'Contact us',
    },
  },

  engagement: {
    eyebrow: 'How we engage',
    heading: 'Implementation, support, or both.',
    lead:
      'Whether you are starting a new rollout or need a reliable team behind a live system, we fit around the way you work.',
    items: [
      {
        tag: 'Implementation',
        title: 'Projects, from discovery to go-live',
        text: 'AI pilots and rollouts, data platforms, integration programmes, Fusion ERP projects and cloud migrations, delivered with clear scope, milestones and ownership.',
        points: ['Fit-gap & solution design', 'Build, test & data migration', 'Training, cutover & hypercare'],
      },
      {
        tag: 'Support',
        title: 'Managed support for live systems',
        text: 'A dedicated team for your AI solutions, Oracle applications, integrations and cloud infrastructure, so issues get fixed and the platform keeps improving.',
        points: ['Incidents, service & change requests', 'Quarterly update readiness', 'Integration & infrastructure monitoring'],
      },
      {
        tag: 'Advisory',
        title: 'Assessments & roadmaps',
        text: 'Independent health checks and architecture reviews that help you get more from your existing AI, data and Oracle investments.',
        points: ['AI readiness & use-case assessment', 'Data, ERP & integration health checks', 'Architecture & roadmap'],
      },
    ],
  },

  approach: {
    eyebrow: 'Approach',
    heading: 'A clear path from idea to running system.',
    steps: [
      { title: 'Discover', text: 'We learn your processes, systems and goals, then agree on scope and on what success looks like.' },
      { title: 'Design', text: 'We design the solution architecture, configuration, integrations, data and security.' },
      { title: 'Deliver', text: 'We build in short iterations, then test, migrate data, train your users and go live.' },
      { title: 'Support & improve', text: 'After go-live we provide hypercare, managed support, quarterly updates and ongoing improvement.' },
    ],
  },

  services: {
    title: 'Services',
    description:
      'AI solutions and Oracle services from Tx: generative AI assistants, AI agents, AI data platform, AI strategy, Fusion Cloud ERP, Oracle Integration, PaaS, OCI and Oracle Digital Assistant.',
    eyebrow: 'Services',
    heading: 'AI in your business, end to end.',
    lead: 'AI services first, then the Oracle services that connect AI to your core systems. Nine services, one team.',
    aiLead: 'Put AI to work on your data, documents and processes, in every language and on the AI platform that fits you.',
    oracleLead: 'The core systems and integrations that AI builds on: implement, connect, extend and run Oracle Cloud.',
    learnMore: 'Learn more',
    included: 'What’s included',
    discussHeading: 'Have a project in mind?',
    discussText: 'Tell us about it and we’ll suggest a practical next step.',
    discussButton: 'Discuss your project',
    related: 'Related services',
    all: 'All services',
  },

  about: {
    title: 'About Tx',
    description:
      'Tx (Technology eXcellence) is an AI consultancy for businesses in Saudi Arabia and the Middle East, with deep Oracle expertise.',
    eyebrow: 'About Tx',
    heading: 'Technology eXcellence is in our name.',
    intro: [
      'Tx is an AI consultancy for businesses in Saudi Arabia and across the Middle East. We bring AI into everyday work, and we have the Oracle and integration expertise to connect it to the systems you already run.',
      'Our team combines business process knowledge with technical depth in AI, data platforms, Oracle Fusion Cloud ERP, Oracle Integration, PaaS and OCI. Our AI work is platform-neutral: we build on OCI, Microsoft Azure, Google Cloud, AWS or open-source models, whichever fits your needs. You work with one team that understands the whole picture, not just one layer of it.',
    ],
    nameTitle: 'What the name means',
    nameT: 'Technology',
    nameX: 'eXcellence',
    principlesHeading: 'How we work',
    principles: [
      { title: 'AI first', text: 'Every engagement starts with the business result AI can deliver, then the technology to deliver it, on whichever platform fits you.' },
      { title: 'End-to-end', text: 'From ERP processes to cloud infrastructure and AI, all in one team.' },
      { title: 'Accountable', text: 'The people who design your solution stay involved in building and supporting it.' },
      { title: 'Knowledge transfer', text: 'We document what we build and train your team, so you are never locked in.' },
    ],
  },

  contact: {
    title: 'Contact',
    description: 'Contact Tx about AI solutions and Oracle services in Saudi Arabia and the Middle East.',
    eyebrow: 'Contact',
    heading: 'Let’s talk about AI in your business.',
    lead:
      'Exploring AI, building a data platform, connecting systems or planning an Oracle project? Tell us where you are and we’ll get back to you.',
    details: {
      email: 'Email',
      phone: 'Phone',
      whatsapp: 'WhatsApp',
      location: 'Location',
      hours: 'Working hours',
      linkedin: 'LinkedIn',
    },
    form: {
      name: 'Name',
      email: 'Work email',
      company: 'Company',
      interest: 'Area of interest',
      support: 'Managed support',
      other: 'Something else',
      message: 'How can we help?',
      consentStart: 'I agree that Tx may use these details to reply to my enquiry, as described in the ',
      consentLink: 'privacy policy',
      consentEnd: '.',
      submit: 'Send message',
      error: 'Please fill in your name, a valid email address and a message, and accept the privacy policy.',
      success: 'Thank you. Your email app should now open with your message ready to send.',
      subject: 'Website enquiry',
    },
  },

  privacy: {
    title: 'Privacy policy',
    description: 'How Tx handles personal data collected through this website.',
    intro: 'This notice explains how Tx handles personal data collected through this website.',
    sections: [
      {
        heading: 'What we collect',
        text: 'When you contact us, we receive the details you choose to send: your name, email address, company and message. We do not use this website to collect any other personal data.',
      },
      {
        heading: 'How we use it',
        text: 'We use your details only to reply to your enquiry and, if you become a client, to manage our relationship with you. We do not sell your data.',
      },
      {
        heading: 'How long we keep it',
        text: 'We keep enquiries only as long as needed for these purposes, and then delete them.',
      },
      {
        heading: 'Your rights',
        text: 'Under Saudi Arabia’s Personal Data Protection Law (PDPL) you can ask to access, correct or delete your personal data. To do so, email us at {email}.',
      },
      {
        heading: 'Changes',
        text: 'We may update this notice from time to time. The date below shows the latest version.',
      },
    ],
    updatedLabel: 'Last updated',
    updated: '1 November 2026',
  },

  footer: {
    blurb: 'AI in your business, connected to the systems you run. Serving Saudi Arabia and the Middle East.',
    company: 'Company',
    rights: 'All rights reserved.',
    cr: 'CR No.',
    vat: 'VAT No.',
    privacy: 'Privacy policy',
    trademark:
      'Oracle and Java are registered trademarks of Oracle and/or its affiliates. Other names may be trademarks of their respective owners.',
  },

  notFound: {
    title: 'Page not found',
    text: 'The page you are looking for does not exist or has moved.',
    home: 'Go to the home page',
  },

  whatsapp: 'Chat with us on WhatsApp',
};

export type Dictionary = typeof en;
