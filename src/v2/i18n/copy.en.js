/* English copy — same keys as copy.tr.js.
   --------------------------------------------------------------------------
   This is a translation, not a second site: every key here answers a key in
   the Turkish file. When a key is added there it has to be added here too,
   otherwise the English page falls back to Turkish and the reader hits a
   sentence they cannot read. */

export const en = {
  langName: 'English',
  switchTo: 'Türkçe',

  nav: {
    home: 'Home',
    aria: 'Main menu',
    open: 'Open menu',
    close: 'Close menu',
    cta: 'Book a call',
    links: [
      { key: 'work', label: 'Work', hash: '#isler' },
      { key: 'services', label: 'Services', hash: '#hizmetler' },
      { key: 'blog', label: 'Blog', hash: null },
      { key: 'about', label: 'About', hash: '#hakkimizda' },
      { key: 'contact', label: 'Contact', hash: '#iletisim' },
    ],
  },

  hero: {
    lead: 'Premium websites that turn',
    tail: 'visitors into customers.',
    ctaPrimary: 'Book a call',
    ctaSecondary: 'See the work',
    hint: 'SCROLL',
    areasLabel: 'Areas we work in',
    dotLabel: (area) => `Go to the ${area} card`,
  },

  cards: {
    site: {
      area: 'Websites',
      screen: 'Live traffic',
      badge: 'mobile first',
      now: 'on the site now',
      count: '38',
      devices: [
        { label: 'Mobile', value: 68 },
        { label: 'Desktop', value: 24 },
        { label: 'Tablet', value: 8 },
      ],
      read: 'What a website costs in 2026',
    },
    eticaret: {
      area: 'E-commerce',
      screen: 'Cart',
      badge: 'one flow',
      items: [
        { name: 'Dog food, grain, 12 kg', price: '₺1,240', tone: 'a' },
        { name: 'Automatic water bowl', price: '₺600', tone: 'b' },
      ],
      shippingLabel: 'Shipping',
      shippingValue: 'Free',
      totalLabel: 'total',
      total: '₺1,840',
      done: 'Payment complete ✓',
      read: 'Shopify or WooCommerce?',
    },
    bot: {
      area: 'AI automation',
      screen: 'WhatsApp',
      badge: 'auto reply',
      chat: [
        { from: 'them', text: 'Hi, any rooms free 14–17 August?' },
        { from: 'us', text: 'The sea view deluxe is open 14–17 August. Three nights, ₺12,600.' },
        { from: 'them', text: 'Is breakfast included?' },
      ],
      avgLabel: 'average reply',
      avgValue: '0.4 s',
      read: 'How to set up a WhatsApp chatbot',
    },
    otel: {
      area: 'Hotels & booking',
      screen: 'Booking',
      badge: '0% commission',
      room: 'Sea View Deluxe',
      meta: '2 guests · breakfast included',
      calHead: 'August',
      staySummary: '3 nights · 14–17 Aug',
      price: '₺12,600',
      cta: 'Complete booking',
      read: 'Speed and conversion in booking',
    },
    kiralama: {
      area: 'Property & rentals',
      screen: 'Listing calendar',
      badge: 'calendars in sync',
      flat: 'Sea View 2-Bedroom',
      meta: 'Bodrum · 4 guests',
      channels: [
        { name: 'Airbnb', state: 'Booked', fee: '15% fee', tone: 'off' },
        { name: 'Booking', state: 'Booked', fee: '18% fee', tone: 'off' },
        { name: 'Your own site', state: 'Available', fee: 'no fee', tone: 'on' },
      ],
      perNight: 'per night',
      price: '₺4,200',
      read: 'How to shoot listing photos',
    },
    gorunurluk: {
      area: 'Visibility & growth',
      screen: 'Search result',
      badge: 'SEO + GEO',
      query: 'hotel website setup',
      results: [
        { rank: '1', label: 'suerta.co', highlight: true },
        { rank: '2', label: 'rival agency' },
        { rank: '3', label: 'directory site' },
      ],
      aiLabel: 'AI answer',
      aiBefore: '“…for hotel websites, agencies like ',
      aiAfter: '…”',
      read: 'GEO: when AI recommends you',
    },
  },

  work: {
    lead: 'Selected',
    tail: 'work.',
    detail: 'See the project →',
    visit: 'Visit site ↗',
    shot: (name) => `Screenshot from the ${name} project`,
    didLabel: 'What we did',
    all: 'All work',
    results: {
      1: 'Direct bookings up 40%',
      2: 'Quota tracking automated, 24/7',
      3: 'E-commerce from scratch, one checkout flow',
      4: '1,000+ topics turned into a searchable archive',
    },
    kpis: [
      { unit: '%', value: '40', label: 'Rise in direct bookings at Emsa Otel' },
      { value: '1,000+', label: 'Searchable archive entries at Argüman Fabrikası' },
      { value: '20+', label: 'Projects delivered across different sectors', laurel: true },
    ],
    films: [
      {
        id: 'film-kiralik',
        name: 'Holiday Flat Film',
        desc: 'Rome · Promo film & visual content',
        did: ['Location shoot', 'Edit and colour', 'Optimised for web', 'Listing integration'],
      },
      {
        id: 'film-araz',
        name: 'Araz Wooden Concept',
        desc: 'Adrasan · Drone shoot & property film',
        did: ['Drone shoot', 'Unit films', 'Edit', 'Optimised for web'],
      },
    ],
  },

  services: {
    headLead: (count) => `${count} things`,
    headTail: 'we build.',
    annotation: 'the same measure in all six: does a visitor become a customer',
    more: 'Services in detail',
    audienceLabel: 'Who it is for',
    deliverablesLabel: 'What you get',
    proofLabel: 'Work we delivered here',
    items: [
      {
        slug: 'internet-siteleri',
        proof: [4],
        title: 'Websites',
        desc: 'Company sites, portfolios and launch pages. Fast, mobile first, multilingual — and you edit the content yourself.',
        tags: ['Company & portfolio', 'Mobile first', 'Multilingual', 'Content panel'],
        audience: 'Established brands, agencies and one-person studios.',
        deliverables: [
          'Design system and page layouts',
          'Content panel',
          'Multilingual structure',
          'Performance and accessibility pass',
        ],
      },
      {
        slug: 'e-ticaret',
        proof: [3],
        title: 'E-commerce',
        desc: 'Shopify or a custom build. One flow from cart to payment; products and stock stay in your hands.',
        tags: ['Shopify setup', 'Checkout flow', 'Product & stock', 'Secure payment'],
        audience: 'Brands and shops selling their own products.',
        deliverables: [
          'Store setup and theme',
          'Product, variant and stock structure',
          'Payment and shipping integration',
          'Cart and checkout flow',
        ],
      },
      {
        slug: 'yapay-zeka-otomasyon',
        proof: [2],
        title: 'AI automation',
        desc: 'We hand repetitive work to software: chatbots that answer questions, watcher bots that catch openings, automated request and form flows.',
        tags: ['WhatsApp chatbot', 'Telegram watcher bot', 'Request automation', 'Panel integration'],
        audience: 'Teams answering the same question dozens of times a day.',
        deliverables: [
          'Chatbot setup and content training',
          'Watcher / notification bot',
          'Form and request automation',
          'Integration with your existing panel',
        ],
      },
      {
        slug: 'otel-rezervasyon',
        proof: [1],
        title: 'Hotel & booking systems',
        desc: 'Guests book with you directly rather than through an OTA. Room inventory, seasonal rates and availability run from one panel.',
        tags: ['Commission-free booking', 'Channel manager / PMS', 'Seasonal pricing', 'Online payment'],
        audience: 'Boutique hotels, aparts, bungalows and small properties.',
        deliverables: [
          'Room and availability panel',
          'Booking engine + online payment',
          'Channel manager / PMS sync',
          'Multilingual guest flow',
        ],
      },
      {
        slug: 'emlak-kiralama',
        proof: [],
        title: 'Property & rentals',
        desc: 'Portfolio, short lets and Airbnb in one place. Calendars sync with Airbnb and Booking, so you can fill the same flat commission-free from your own site.',
        tags: ['Portfolio panel', 'iCal calendar sync', 'Filtered search', 'Map view'],
        audience: 'Estate agents, short-let operators and Airbnb managers.',
        deliverables: [
          'Listing and portfolio panel',
          'iCal calendar sync',
          'Filtered search + map',
          'Enquiry and viewing form',
        ],
      },
      {
        slug: 'gorunurluk-buyume',
        proof: [1],
        title: 'Visibility & growth',
        desc: 'A site is not built and abandoned. We run the SEO, GEO and ad side so that search engines and AI answers can actually find you.',
        tags: ['SEO', 'GEO (AI search)', 'Google & Meta Ads', 'Business profile'],
        audience: 'Brands with a site that nobody finds when they search.',
        deliverables: [
          'Technical SEO and content structure',
          'Readiness for AI search (GEO)',
          'Google & Meta ad setup',
          'Google Business Profile optimisation',
        ],
      },
    ],
  },

  process: {
    lead: 'From the first call',
    tail: 'to launch.',
    steps: [
      { num: '01', title: 'Discovery', desc: 'A 15-minute call. What you sell, who you sell it to, and what is missing.' },
      { num: '02', title: 'Scope', desc: 'Fixed price, fixed scope, fixed delivery date. No surprise line items.' },
      { num: '03', title: 'Build', desc: 'Design, development and whatever integrations the job needs, shipped in stages.' },
      { num: '04', title: 'Handover', desc: 'Launch, panel training and 30 days of support. The site is yours; you are not tied to us.' },
    ],
  },

  faq: {
    lead: 'Before we talk,',
    tail: 'the usual questions.',
    items: [
      {
        q: 'How long does delivery take?',
        a: 'It depends on scope. A promo site or portfolio takes 2–3 weeks; e-commerce, a booking engine or integration work takes 4–6 weeks. The date is written down at the scoping stage.',
      },
      {
        q: 'Can I update the site myself?',
        a: 'Yes. You get a panel for products, rooms, listings, prices, images and content, plus training at handover. You do not need us for small changes.',
      },
      {
        q: 'Do you install a ready-made theme?',
        a: 'No. Both the design and the code are written for the job. Even when we build on a platform like Shopify, the theme is built for your brand — we do not drop a logo onto a template.',
      },
      {
        q: 'Would AI automation actually help my business?',
        a: 'If you answer the same question dozens of times a day, yes. A WhatsApp chatbot handles the repeat questions and hands the rest to you; watcher bots track things nobody can watch by hand — quotas, prices, stock — and tell you the moment they change.',
      },
      {
        q: 'Can I really cut OTA commission?',
        a: 'It will not disappear, but the balance shifts. A guest arriving through Booking or Airbnb costs you commission; one arriving through your own site does not. Direct bookings at Emsa Otel rose 40%. The goal is not to leave the platforms — it is to take the second and third stay direct.',
      },
      {
        q: 'Can it be multilingual and multi-currency?',
        a: 'Yes. Turkish and English are standard; German, Russian and Arabic on request. Prices can be shown in the visitor’s own currency.',
      },
    ],
  },

  partners: {
    lead: 'What the brands',
    tail: 'we work with say.',
    prev: 'Previous testimonial',
    next: 'Next testimonial',
    openBrand: 'Reserved',
    openText: 'This space is kept for the work we will do with you.',
    openCta: 'Book a call',
    quotes: [
      {
        brand: 'Emsa Otel',
        role: 'Board',
        text: 'Working with suerta.co on our digital move was the best decision we made. With the commission-free booking system, our direct sales rose 40%.',
      },
      {
        brand: 'Rönesans Edu',
        role: 'Co-founder',
        text: 'Tracking exam quotas by hand was impossible. Their Telegram bot tells us the moment a place opens; our students no longer miss the window.',
      },
      {
        brand: 'Pawsec Shop',
        role: 'Owner',
        text: 'We built the shop from scratch. Cart to payment runs in one flow and I update the products myself — I do not have to ask anyone for a change.',
      },
      {
        brand: 'Argüman Fabrikası',
        role: 'Founder',
        text: 'They turned more than a thousand debate topics into a searchable archive. They ran the ads and SEO too, so the content actually paid off.',
      },
    ],
  },

  manifesto: {
    line: 'We are suerta.co. We build sites that turn visitors into customers for hotel, rental, education and e-commerce brands.',
    coinFlip: 'Flip the coin',
    coinAgain: 'Press again',
    noteIdle: 'do not touch this coin',
    noteAgain: 'press again',
    heads: 'Heads',
    tails: 'Tails',
    resultSuffix: 'it is.',
    cardLine: 'Do not leave your business to luck.',
    cardTag: 'your brand’s luck',
    cardCta: 'Book a call',
  },

  contact: {
    heading: 'Tell us what you are building',
    vision: 'The hardest-working thing a brand owns online is its own site: it pays no commission, it does not close at six, and it remembers every visitor who arrives. Let us build yours.',
    status: 'Reply time this week: a few hours',
    sentTitle: 'Opened in WhatsApp.',
    sentNote: 'If the window did not open it may have been blocked; you can write to us directly through the channels below.',
    reopen: 'Open the form again',
    nameLabel: 'Name',
    namePlaceholder: 'Your name',
    brandLabel: 'Brand',
    brandPlaceholder: 'Business or brand name',
    reachLabel: 'Phone or email',
    reachPlaceholder: 'Where should we reach you?',
    typeLabel: 'Project type',
    messageLabel: 'Message',
    messagePlaceholder: 'Tell us in a few sentences what you want to build.',
    formNote: 'The form opens in WhatsApp; nothing is stored here.',
    submit: 'Send',
    types: [
      'Website',
      'E-commerce',
      'AI automation',
      'Hotel & booking',
      'Property & rentals',
      'Visibility & growth',
      'Not sure yet',
    ],
    mailLabel: 'Email',
    replyTitle: 'Reply time',
    replyText: 'Weekday messages get an answer the same day, weekend ones the next working day. We are three people, so whoever writes back is the person doing the work.',
    whatsappMeta: 'Fastest route — usually a few hours',
    mailMeta: 'For a detailed brief',
    instagramMeta: 'Work we have done',
    greeting: 'Hello suerta.co,',
    fieldName: 'Name',
    fieldBrand: 'Brand',
    fieldReach: 'Contact',
    fieldType: 'Project type',
  },

  footer: {
    menu: 'Menu',
    social: 'Social',
    contact: 'Contact',
    location: 'Eskişehir, Türkiye (worldwide)',
    copy: (year) =>
      `© ${year} suerta.co — digital studio. Websites, e-commerce, booking systems and AI automation. All rights reserved.`,
    toTop: 'Back to top ↑',
  },

  pages: {
    services: {
      label: 'Services',
      lead: 'Six things',
      tail: 'we build.',
      intro: 'All of it comes down to one job: turning visitors into customers. Below, each area says who it is for, what we deliver and what we have already built there.',
      processLead: 'Whatever the area,',
      processTail: 'the process is the same.',
      ctaLead: 'Let us work out where you stand',
      ctaTail: 'in fifteen minutes.',
      ctaText: 'We talk about what you sell, who you sell it to and what is missing. The call is free; scope and price come in writing afterwards.',
      proofLabel: 'Built here',
    },
    work: {
      lead: 'The work',
      tail: 'we delivered.',
      intro: 'Four client projects and two films. Each one says what we did and what came out of it.',
      detailBack: '← All work',
      detailVisit: 'Visit site ↗',
      detailFaq: 'Questions that came up on this project',
      notFound: 'That project could not be found.',
    },
    blog: {
      lead: 'Guides and',
      tail: 'field notes.',
      intro: 'From what a site costs to booking speed, from setting up a chatbot to being visible in AI answers — the work, written down.',
      allTags: 'All',
      readMore: 'Read the piece',
      back: '← All posts',
      related: 'You might also want',
      minutes: 'min read',
      untranslated: 'This piece is not translated yet — the text below is in Turkish.',
      notFound: 'That post could not be found.',
    },
    about: {
      lead: 'Three people,',
      tail: 'one table.',
      intro: 'suerta.co is a digital studio based in Eskişehir. Design, software and growth run at the same table; the job is not passed from agency to agency.',
      valuesTitle: 'How we work',
      values: [
        {
          title: 'Fixed scope, fixed price',
          desc: 'Scope in writing, date in writing. If the job grows we talk about it; the invoice does not grow quietly.',
        },
        {
          title: 'The site stays yours',
          desc: 'Code, panel and domain belong to you. You are not required to come back to us for a small change.',
        },
        {
          title: 'A measured result',
          desc: 'Every job we deliver has an outcome: direct bookings, automated replies, a searchable archive.',
        },
        {
          title: 'Cutting out the middleman',
          desc: 'The platform taking a commission, the intermediary speaking for you, the agency you wait on for every edit — all the same problem wearing different clothes.',
        },
      ],
      team: [
        { role: 'Frontend / AI architecture', desc: 'Every pixel of the interface, and the AI-assisted code architecture behind it.' },
        { role: 'Backend / Databases', desc: 'System architecture that scales, and the data flow underneath it.' },
        { role: 'Product / Design', desc: 'User experience, creative strategy and the visual direction.' },
      ],
      teamTitle: 'The team',
    },
    contact: {
      lead: 'Let’s talk.',
      tail: '',
      intro: 'Tell us about the project and we will settle scope, timing and budget on the first call.',
    },
    notFound: {
      title: 'This page does not exist.',
      intro: 'The address may be wrong, or the page may have moved.',
      cta: 'Back to the home page',
    },
  },

  meta: {
    home: {
      title: 'Web Design, E-Commerce & AI Automation Studio — suerta.co',
      description:
        'A boutique digital studio building websites, online shops, AI automation, hotel booking systems and SEO. Fixed scope, fixed price, delivered in 2–6 weeks.',
    },
    services: {
      title: 'Services: Websites, E-Commerce & AI Automation',
      description:
        'Six areas, each with who it is for and what you get: websites, e-commerce, AI automation, hotel booking, property and rentals, SEO and GEO.',
    },
    work: {
      title: 'Work: Projects We Delivered',
      description:
        'Direct bookings up 40% at Emsa Otel, quota tracking automated at Rönesans Edu, e-commerce built from scratch for Pawsec. What we did, and what came of it.',
    },
    blog: {
      title: 'Blog: Guides on Web, E-Commerce and SEO',
      description:
        'What a website costs, Shopify versus WooCommerce, a pre-launch SEO checklist, setting up a WhatsApp chatbot, and being visible in AI search (GEO).',
    },
    about: {
      title: 'About: A Three-Person Digital Studio',
      description:
        'Design, software and growth at one table. Fixed scope and fixed price, training at handover, 30 days of support — the code and the domain stay yours.',
    },
    contact: {
      title: 'Contact: Tell Us About Your Project',
      description:
        'Write on WhatsApp, by email or through the form. Scope, timing and budget are settled on the first call; weekday messages get an answer the same day.',
    },
  },
};
