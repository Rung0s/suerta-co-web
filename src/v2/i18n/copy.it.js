/* Testi italiani — stesse chiavi di copy.tr.js.
   --------------------------------------------------------------------------
   È una traduzione, non un secondo sito: ogni chiave qui risponde a una
   chiave del file turco. Quando lì si aggiunge una chiave, va aggiunta anche
   qui, altrimenti la pagina italiana ricade sul turco e il lettore incontra
   una frase che non può leggere.

   I prezzi restano in lire turche: convertirli farebbe invecchiare il testo
   al primo cambio del tasso. */

export const it = {
  langName: 'Italiano',
  switchTo: 'Türkçe',

  nav: {
    home: 'Home',
    aria: 'Menu principale',
    open: 'Apri il menu',
    close: 'Chiudi il menu',
    cta: 'Prenota una call',
    links: [
      { key: 'work', label: 'Progetti', hash: '#isler' },
      { key: 'services', label: 'Servizi', hash: '#hizmetler' },
      { key: 'blog', label: 'Blog', hash: null },
      { key: 'about', label: 'Chi siamo', hash: '#hakkimizda' },
      { key: 'contact', label: 'Contatti', hash: '#iletisim' },
    ],
  },

  hero: {
    lead: 'Sistemi premium che trasformano',
    tail: 'i visitatori in clienti.',
    ctaPrimary: 'Prenota una call',
    ctaSecondary: 'Guarda i progetti',
    hint: 'SCORRI',
    areasLabel: 'Aree di lavoro',
    dotLabel: (area) => `Vai alla scheda ${area}`,
  },

  cards: {
    site: {
      area: 'Siti web',
      screen: 'Traffico live',
      badge: 'mobile first',
      now: 'ora sul sito',
      count: '38',
      devices: [
        { label: 'Mobile', value: 68 },
        { label: 'Desktop', value: 24 },
        { label: 'Tablet', value: 8 },
      ],
      read: 'Quanto costa un sito nel 2026',
    },
    eticaret: {
      area: 'E-commerce',
      screen: 'Carrello',
      badge: 'un solo flusso',
      items: [
        { name: 'Crocchette con cereali 12 kg', price: '₺1.240', tone: 'a' },
        { name: 'Ciotola automatica', price: '₺600', tone: 'b' },
      ],
      shippingLabel: 'Spedizione',
      shippingValue: 'Gratis',
      totalLabel: 'totale',
      total: '₺1.840',
      done: 'Pagamento completato ✓',
      read: 'Shopify o WooCommerce?',
    },
    bot: {
      area: 'Automazioni con IA',
      screen: 'WhatsApp',
      badge: 'risposta automatica',
      chat: [
        { from: 'them', text: 'Salve, avete camere libere dal 14 al 17 agosto?' },
        { from: 'us', text: 'La deluxe vista mare è libera dal 14 al 17 agosto. Tre notti, ₺12.600.' },
        { from: 'them', text: 'La colazione è inclusa?' },
      ],
      avgLabel: 'risposta media',
      avgValue: '0,4 s',
      read: 'Come si crea un chatbot WhatsApp',
    },
    otel: {
      area: 'Hotel e prenotazioni',
      screen: 'Prenotazione',
      badge: 'commissione 0%',
      room: 'Deluxe Vista Mare',
      meta: '2 ospiti · colazione inclusa',
      calHead: 'Agosto',
      staySummary: '3 notti · 14–17 ago',
      price: '₺12.600',
      cta: 'Completa la prenotazione',
      read: 'Velocità e conversione nelle prenotazioni',
    },
    kiralama: {
      area: 'Immobili e affitti',
      screen: 'Calendario annunci',
      badge: 'calendari sincronizzati',
      flat: 'Bilocale Vista Mare',
      meta: 'Bodrum · 4 ospiti',
      channels: [
        { name: 'Airbnb', state: 'Occupato', fee: 'commissione 15%', tone: 'off' },
        { name: 'Booking', state: 'Occupato', fee: 'commissione 18%', tone: 'off' },
        { name: 'Il tuo sito', state: 'Libero', fee: 'nessuna commissione', tone: 'on' },
      ],
      perNight: 'a notte',
      price: '₺4.200',
      read: 'Come fotografare un annuncio',
    },
    gorunurluk: {
      area: 'Visibilità e crescita',
      screen: 'Risultato di ricerca',
      badge: 'SEO + GEO',
      query: 'sito web per hotel',
      results: [
        { rank: '1', label: 'suerta.co', highlight: true },
        { rank: '2', label: 'agenzia concorrente' },
        { rank: '3', label: 'sito directory' },
      ],
      aiLabel: 'Risposta dell’IA',
      aiBefore: '“…per i siti di hotel, agenzie come ',
      aiAfter: '…”',
      read: 'GEO: quando l’IA ti consiglia',
    },
  },

  work: {
    lead: 'Progetti',
    tail: 'selezionati.',
    detail: 'Vedi il progetto →',
    visit: 'Visita il sito ↗',
    shot: (name) => `Schermata del progetto ${name}`,
    didLabel: 'Cosa abbiamo fatto',
    all: 'Tutti i progetti',
    results: {
      1: 'Prenotazioni dirette +40%',
      2: 'Monitoraggio posti automatico, 24/7',
      3: 'E-commerce da zero, un solo flusso di checkout',
      4: '1.000+ argomenti in un archivio ricercabile',
    },
    kpis: [
      { unit: '%', value: '40', label: 'Crescita delle prenotazioni dirette all’Emsa Otel' },
      { value: '1.000+', label: 'Voci nell’archivio ricercabile di Argüman Fabrikası' },
      { value: '20+', label: 'Progetti consegnati in settori diversi', laurel: true },
    ],
    films: [
      {
        id: 'film-kiralik',
        name: 'Video di un appartamento in affitto',
        desc: 'Roma · Video promozionale e contenuti visivi',
        did: ['Riprese in location', 'Montaggio e colore', 'Ottimizzazione per il web', 'Integrazione con gli annunci'],
      },
      {
        id: 'film-araz',
        name: 'Araz Wooden Concept',
        desc: 'Adrasan · Riprese con drone e video della struttura',
        did: ['Riprese con drone', 'Riprese delle unità', 'Montaggio', 'Ottimizzazione per il web'],
      },
    ],
  },

  services: {
    headLead: (count) => `${count} aree`,
    headTail: 'di lavoro.',
    annotation: 'la stessa misura in tutte: il visitatore diventa cliente?',
    more: 'I servizi nel dettaglio',
    audienceLabel: 'Per chi',
    deliverablesLabel: 'Cosa consegniamo',
    proofLabel: 'Lavori realizzati in quest’area',
    items: [
      {
        slug: 'internet-siteleri',
        proof: [4],
        title: 'Siti web',
        desc: 'Siti aziendali, portfolio e pagine di lancio. Veloci, mobile first, multilingua; i contenuti li gestisci tu.',
        tags: ['Aziendale e portfolio', 'Mobile first', 'Multilingua', 'Pannello contenuti'],
        audience: 'Brand affermati, agenzie e studi individuali.',
        deliverables: [
          'Design system e layout delle pagine',
          'Pannello contenuti',
          'Struttura multilingua',
          'Verifica di prestazioni e accessibilità',
        ],
      },
      {
        slug: 'e-ticaret',
        proof: [3],
        title: 'E-commerce',
        desc: 'Shopify o infrastruttura su misura. Un solo flusso dal carrello al pagamento; prodotti e magazzino restano nelle tue mani.',
        tags: ['Setup Shopify', 'Flusso di checkout', 'Prodotti e magazzino', 'Pagamento sicuro'],
        audience: 'Brand e negozi che vendono i propri prodotti.',
        deliverables: [
          'Setup del negozio e tema',
          'Struttura di prodotti, varianti e magazzino',
          'Integrazione di pagamenti e spedizioni',
          'Flusso carrello e checkout',
        ],
      },
      {
        slug: 'yapay-zeka-otomasyon',
        proof: [2],
        title: 'Automazioni con IA',
        desc: 'Affidiamo al software il lavoro ripetitivo: chatbot che rispondono alle domande, bot di monitoraggio che colgono le occasioni, automazione di moduli e richieste.',
        tags: ['Chatbot WhatsApp', 'Bot di monitoraggio Telegram', 'Automazione richieste', 'Integrazione con il pannello'],
        audience: 'Team che rispondono alla stessa domanda decine di volte al giorno.',
        deliverables: [
          'Setup del chatbot e addestramento sui contenuti',
          'Bot di monitoraggio / notifica',
          'Automazione di moduli e richieste',
          'Integrazione con il pannello esistente',
        ],
      },
      {
        slug: 'otel-rezervasyon',
        proof: [1],
        title: 'Hotel e sistemi di prenotazione',
        desc: 'L’ospite prenota direttamente da te, non tramite una OTA. Camere, tariffe stagionali e disponibilità gestite da un unico pannello.',
        tags: ['Prenotazione senza commissioni', 'Channel manager / PMS', 'Tariffe stagionali', 'Pagamento online'],
        audience: 'Hotel boutique, residence, bungalow e piccole strutture.',
        deliverables: [
          'Pannello camere e disponibilità',
          'Motore di prenotazione + pagamento online',
          'Sincronizzazione channel manager / PMS',
          'Percorso ospite multilingua',
        ],
      },
      {
        slug: 'emlak-kiralama',
        proof: [],
        title: 'Immobili e affitti',
        desc: 'Portfolio, affitti brevi e Airbnb in un unico posto. I calendari si sincronizzano con Airbnb e Booking: lo stesso appartamento lo riempi anche dal tuo sito, senza commissioni.',
        tags: ['Pannello portfolio', 'Sincronizzazione calendari (iCal)', 'Ricerca con filtri', 'Vista mappa'],
        audience: 'Agenzie immobiliari, gestori di affitti brevi e host Airbnb.',
        deliverables: [
          'Pannello annunci e portfolio',
          'Sincronizzazione calendari iCal',
          'Ricerca con filtri + mappa',
          'Modulo di richiesta e visita',
        ],
      },
      {
        slug: 'gorunurluk-buyume',
        proof: [1],
        title: 'Visibilità e crescita',
        desc: 'Un sito non si costruisce e si abbandona. Seguiamo anche SEO, GEO e pubblicità, perché i motori di ricerca e le risposte dell’IA ti trovino davvero.',
        tags: ['SEO', 'GEO (ricerca con IA)', 'Google e Meta Ads', 'Profilo dell’attività'],
        audience: 'Brand che hanno un sito ma nessuno li trova cercando.',
        deliverables: [
          'SEO tecnica e struttura dei contenuti',
          'Preparazione alla ricerca con IA (GEO)',
          'Setup di campagne Google e Meta',
          'Ottimizzazione del Profilo dell’attività su Google',
        ],
      },
    ],
  },

  process: {
    lead: 'Dalla prima call',
    tail: 'alla pubblicazione.',
    steps: [
      { num: '01', title: 'Scoperta', desc: 'Una call di 15 minuti. Cosa vendi, a chi lo vendi e cosa manca.' },
      { num: '02', title: 'Perimetro', desc: 'Prezzo fisso, perimetro fisso, data di consegna fissa. Nessuna voce a sorpresa.' },
      { num: '03', title: 'Realizzazione', desc: 'Design, sviluppo e le integrazioni necessarie, consegnati per tappe.' },
      { num: '04', title: 'Consegna', desc: 'Pubblicazione, formazione sul pannello e 30 giorni di supporto. Il sito è tuo; non dipendi da noi.' },
    ],
  },

  faq: {
    lead: 'Prima di parlarci,',
    tail: 'le domande più frequenti.',
    items: [
      {
        q: 'In quanto tempo consegnate?',
        a: 'Dipende dal perimetro. Un sito vetrina o un portfolio in 2–3 settimane; e-commerce, motore di prenotazione o lavori con integrazioni in 4–6 settimane. La data viene messa per iscritto in fase di perimetro.',
      },
      {
        q: 'Posso aggiornare il sito da solo?',
        a: 'Sì. Consegniamo un pannello per prodotti, camere, annunci, prezzi, immagini e contenuti, con formazione alla consegna. Per una piccola modifica non devi tornare da noi.',
      },
      {
        q: 'Installate un tema già pronto?',
        a: 'No. Sia il design che il codice sono scritti per il progetto. Anche quando usiamo una piattaforma come Shopify, il tema viene costruito per il tuo brand: non mettiamo un logo sopra un template.',
      },
      {
        q: 'L’automazione con IA serve davvero alla mia attività?',
        a: 'Se rispondi alla stessa domanda decine di volte al giorno, sì. Un chatbot WhatsApp gestisce le domande ricorrenti e ti passa il resto; i bot di monitoraggio seguono ciò che nessuno può seguire a mano — posti, prezzi, scorte — e ti avvisano nel momento in cui cambia.',
      },
      {
        q: 'Posso davvero ridurre le commissioni delle OTA?',
        a: 'Non spariscono, ma l’equilibrio si sposta. L’ospite che arriva da Booking o Airbnb ti costa una commissione; quello che arriva dal tuo sito no. All’Emsa Otel le prenotazioni dirette sono cresciute del 40%. L’obiettivo non è lasciare le piattaforme, ma portare in diretta il secondo e il terzo soggiorno.',
      },
      {
        q: 'Può essere multilingua e multivaluta?',
        a: 'Sì. Turco, inglese e italiano sono standard; tedesco, russo e arabo su richiesta. I prezzi possono essere mostrati nella valuta del visitatore.',
      },
    ],
  },

  partners: {
    lead: 'Cosa dicono i brand',
    tail: 'con cui lavoriamo.',
    prev: 'Testimonianza precedente',
    next: 'Testimonianza successiva',
    openBrand: 'Riservato',
    openText: 'Questo spazio è riservato al lavoro che faremo con te.',
    openCta: 'Prenota una call',
    quotes: [
      {
        brand: 'Emsa Otel',
        role: 'Consiglio di amministrazione',
        text: 'Lavorare con suerta.co sulla trasformazione digitale del nostro hotel è stata la decisione migliore. Con il sistema di prenotazione senza commissioni le vendite dirette sono cresciute del 40%.',
      },
      {
        brand: 'Rönesans Edu',
        role: 'Co-fondatore',
        text: 'Seguire a mano i posti d’esame era impossibile. Il bot Telegram che hanno costruito ci avvisa nell’istante in cui si libera un posto; i nostri studenti non perdono più l’occasione.',
      },
      {
        brand: 'Pawsec Shop',
        role: 'Titolare',
        text: 'Abbiamo costruito l’e-commerce da zero. Dal carrello al pagamento tutto scorre in un unico flusso e i prodotti li aggiorno io — non devo chiedere a nessuno per una modifica.',
      },
      {
        brand: 'Argüman Fabrikası',
        role: 'Fondatore',
        text: 'Hanno trasformato più di mille argomenti di dibattito in un archivio ricercabile. Hanno seguito anche pubblicità e SEO, così i contenuti hanno davvero reso.',
      },
    ],
  },

  manifesto: {
    line: 'Siamo suerta.co. Costruiamo sistemi che trasformano i visitatori in clienti per hotel, affitti, formazione ed e-commerce.',
    coinFlip: 'Lancia la moneta',
    coinAgain: 'Premi ancora',
    noteIdle: 'non toccare questa moneta',
    noteAgain: 'premi ancora',
    heads: 'Testa',
    tails: 'Croce',
    resultSuffix: 'è uscita.',
    cardLine: 'Non lasciare la tua attività alla fortuna.',
    cardTag: 'la fortuna del tuo brand',
    cardCta: 'Prenota una call',
  },

  contact: {
    heading: 'Raccontaci cosa stai costruendo',
    vision: 'La cosa che lavora di più per un brand online è il suo sito: non paga commissioni, non chiude alle sei e ricorda ogni visitatore che arriva. Costruiamo il tuo insieme.',
    status: 'Tempo di risposta questa settimana: poche ore',
    sentTitle: 'Aperto in WhatsApp.',
    sentNote: 'Se la finestra non si è aperta potrebbe essere stata bloccata; puoi scriverci direttamente dai canali qui sotto.',
    reopen: 'Riapri il modulo',
    nameLabel: 'Nome',
    namePlaceholder: 'Il tuo nome',
    brandLabel: 'Brand',
    brandPlaceholder: 'Nome dell’azienda o del brand',
    reachLabel: 'Telefono o email',
    reachPlaceholder: 'Dove possiamo ricontattarti?',
    typeLabel: 'Tipo di progetto',
    messageLabel: 'Messaggio',
    messagePlaceholder: 'Racconta in poche frasi cosa vuoi realizzare.',
    formNote: 'Il modulo si apre in WhatsApp; qui non viene salvato nulla.',
    submit: 'Invia',
    types: [
      'Sito web',
      'E-commerce',
      'Automazione con IA',
      'Hotel e prenotazioni',
      'Immobili e affitti',
      'Visibilità e crescita',
      'Non lo so ancora',
    ],
    mailLabel: 'Email',
    replyTitle: 'Tempo di risposta',
    replyText: 'Ai messaggi dei giorni feriali rispondiamo in giornata, a quelli del weekend il primo giorno lavorativo. Siamo un team di sette persone: chi ti risponde è chi fa il lavoro.',
    whatsappMeta: 'La via più rapida — di solito poche ore',
    mailMeta: 'Per un brief dettagliato',
    instagramMeta: 'I lavori che abbiamo fatto',
    greeting: 'Ciao suerta.co,',
    fieldName: 'Nome',
    fieldBrand: 'Brand',
    fieldReach: 'Contatto',
    fieldType: 'Tipo di progetto',
  },

  crew: {
    lead: 'Sette missioni',
    tail: 'a un solo tavolo.',
    intro: 'Un tavolo, sette posti. Scorri e il tavolo gira; il posto sotto l’ago racconta la sua missione.',
    hint: 'scorri, il tavolo gira',
    prev: 'Posto precedente',
    next: 'Posto successivo',
    seatLabel: (n) => `Missione ${String(n).padStart(2, '0')}`,
    seatAria: (n, role) => `Posto ${n}: ${role}`,
    seats: [
      { role: 'Strategia', mission: 'Chiarisce in 15 minuti cosa vendi, chi lo compra e cosa manca.' },
      { role: 'Design', mission: 'Nessun tema preconfezionato; un’interfaccia e un linguaggio visivo disegnati per il tuo brand.' },
      { role: 'Front end', mission: 'Ogni pixel funziona allo stesso modo su telefono, desktop e screen reader.' },
      { role: 'Back end', mission: 'Prenotazioni, magazzino, pagamenti: i dati vanno nel posto giusto al momento giusto.' },
      { role: 'Automazione e IA', mission: 'Affida a un bot la domanda a cui rispondi trenta volte al giorno.' },
      { role: 'Crescita', mission: 'Farsi trovare su Google e nelle risposte dell’IA: SEO, GEO, pubblicità.' },
      { role: 'Contenuti e video', mission: 'Drone, riprese in location, montaggio; le immagini e le parole che riempiono il sito.' },
    ],
  },

  footer: {
    menu: 'Menu',
    social: 'Social',
    contact: 'Contatti',
    location: 'Türkiye · Italia · Mondo',
    copy: (year) =>
      `© ${year} suerta.co — studio digitale. Siti web, e-commerce, sistemi di prenotazione e automazioni con IA. Tutti i diritti riservati.`,
    toTop: 'Torna su ↑',
  },

  pages: {
    services: {
      label: 'Servizi',
      lead: 'Sei aree',
      tail: 'di lavoro.',
      intro: 'Tutto porta a un solo obiettivo: trasformare i visitatori in clienti. Qui sotto, per ogni area, per chi è, cosa consegniamo e cosa abbiamo già realizzato.',
      processLead: 'Qualunque sia l’area,',
      processTail: 'il processo è lo stesso.',
      ctaLead: 'Capiamo a che punto sei',
      ctaTail: 'in quindici minuti.',
      ctaText: 'Parliamo di cosa vendi, a chi lo vendi e cosa manca. La call è gratuita; perimetro e prezzo arrivano dopo, per iscritto.',
      proofLabel: 'Realizzato qui',
    },
    work: {
      lead: 'I progetti',
      tail: 'che abbiamo consegnato.',
      intro: 'Quattro progetti per clienti e due video. Per ciascuno, cosa abbiamo fatto e cosa ne è uscito.',
      detailBack: '← Tutti i progetti',
      detailVisit: 'Visita il sito ↗',
      detailFaq: 'Domande emerse in questo progetto',
      notFound: 'Progetto non trovato.',
    },
    blog: {
      lead: 'Guide e',
      tail: 'appunti dal campo.',
      intro: 'Da quanto costa un sito alla velocità di prenotazione, dal setup di un chatbot alla visibilità nelle risposte dell’IA: il nostro lavoro, messo per iscritto.',
      allTags: 'Tutti',
      readMore: 'Leggi l’articolo',
      back: '← Tutti gli articoli',
      related: 'Potrebbero interessarti',
      minutes: 'min di lettura',
      untranslated: 'Questo articolo non è ancora tradotto; il testo qui sotto è in inglese.',
      notFound: 'Articolo non trovato.',
    },
    about: {
      lead: 'Sette persone,',
      tail: 'un solo tavolo.',
      intro: 'suerta.co è uno studio digitale che lavora per clienti in Türkiye, in Italia e nel mondo. Strategia, design, software, crescita e contenuti allo stesso tavolo; il lavoro non passa da un’agenzia all’altra.',
      valuesTitle: 'Come lavoriamo',
      values: [
        {
          title: 'Perimetro fisso, prezzo fisso',
          desc: 'Perimetro per iscritto, data per iscritto. Se il lavoro cresce ne parliamo; la fattura non cresce in silenzio.',
        },
        {
          title: 'Il sito resta tuo',
          desc: 'Codice, pannello e dominio sono tuoi. Per una piccola modifica non sei obbligato a tornare da noi.',
        },
        {
          title: 'Un risultato misurato',
          desc: 'Ogni lavoro che consegniamo ha un esito: prenotazioni dirette, risposte automatiche, un archivio ricercabile.',
        },
        {
          title: 'Togliere l’intermediario',
          desc: 'La piattaforma che prende la commissione, l’intermediario che parla al posto tuo, l’agenzia che aspetti per ogni modifica: lo stesso problema con vestiti diversi.',
        },
      ],
      team: [
        { role: 'Front end / Architettura IA', desc: 'Ogni pixel dell’interfaccia e l’architettura del codice assistita dall’IA.' },
        { role: 'Back end / Database', desc: 'Architettura di sistema che scala e il flusso dei dati sotto di essa.' },
        { role: 'Prodotto / Design', desc: 'Esperienza utente, strategia creativa e direzione visiva.' },
      ],
      teamTitle: 'Il team',
    },
    contact: {
      lead: 'Parliamone.',
      tail: '',
      intro: 'Raccontaci il progetto: perimetro, tempi e budget li definiamo nella prima call.',
    },
    notFound: {
      title: 'Questa pagina non esiste.',
      intro: 'L’indirizzo potrebbe essere sbagliato o la pagina potrebbe essere stata spostata.',
      cta: 'Torna alla home',
    },
  },

  meta: {
    home: {
      title: 'Studio di Siti Web, E-Commerce e Automazioni con IA — suerta.co',
      description:
        'Studio digitale boutique che realizza siti web, e-commerce, automazioni con IA, sistemi di prenotazione per hotel e SEO. Perimetro fisso, prezzo fisso, consegna in 2–6 settimane.',
    },
    services: {
      title: 'Servizi: Siti Web, E-Commerce e Automazioni con IA',
      description:
        'Sei aree, ciascuna con per chi è e cosa ricevi: siti web, e-commerce, automazioni con IA, prenotazioni per hotel, immobili e affitti, SEO e GEO.',
    },
    work: {
      title: 'Progetti: Cosa Abbiamo Consegnato',
      description:
        'Prenotazioni dirette +40% all’Emsa Otel, monitoraggio dei posti automatizzato per Rönesans Edu, e-commerce da zero per Pawsec. Cosa abbiamo fatto e cosa ne è uscito.',
    },
    blog: {
      title: 'Blog: Guide su Web, E-Commerce e SEO',
      description:
        'Quanto costa un sito, Shopify o WooCommerce, checklist SEO prima del lancio, come creare un chatbot WhatsApp e come essere visibili nella ricerca con IA (GEO).',
    },
    about: {
      title: 'Chi siamo: Uno Studio Digitale di Sette Persone',
      description:
        'Design, software e crescita a un solo tavolo. Perimetro e prezzo fissi, formazione alla consegna, 30 giorni di supporto: codice e dominio restano tuoi.',
    },
    contact: {
      title: 'Contatti: Raccontaci il Tuo Progetto',
      description:
        'Scrivici su WhatsApp, via email o dal modulo. Perimetro, tempi e budget si definiscono nella prima call; ai messaggi feriali rispondiamo in giornata.',
    },
  },
};
