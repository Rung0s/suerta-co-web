/* Versioni italiane degli articoli del blog.
   --------------------------------------------------------------------------
   Chiave = id dell'articolo, gli stessi id di src/data/blogs.js, così
   /blog/<id> e /it/blog/<id> sono lo stesso pezzo in due lingue e il cambio
   di lingua tiene il lettore sulla pagina che stava leggendo.

   Un articolo senza voce qui ha comunque una pagina italiana: ricade sul
   testo inglese e viene segnalato, così la pagina può dirlo invece di
   consegnare in silenzio un articolo in un'altra lingua.

   I prezzi restano in lire turche: convertirli farebbe invecchiare il testo
   al primo cambio del tasso. */

export const postsIt = {
  'web-sitesi-maliyeti-2026': {
    tag: 'Strategia e budget',
    date: '13 luglio 2026',
    iso: '2026-07-13',
    title: 'Quanto costa un sito web nel 2026: una guida realistica ai prezzi per le piccole imprese',
    desc: 'Quanto costa un sito aziendale nel 2026? Il dettaglio voce per voce, i costi nascosti e come costruire il budget nel modo giusto.',
    content: `
Farsi costruire un sito web nel 2026 è un investimento che va da poche migliaia di lire a qualche centinaio di migliaia, e la forbice è così ampia perché il prezzo segue il lavoro che il sito deve fare, non il sito in sé. A fissare il prezzo non è il numero di pagine ma il compito che il sito si assume. Un sito vetrina e un negozio online che vende, gestisce le scorte e incassa possono avere lo stesso numero di pagine e costare comunque diverse volte di più l'uno dell'altro. La domanda a cui rispondere prima di chiedere un preventivo è questa: quale comportamento deve produrre questo sito perché la mia attività guadagni? Far squillare il telefono, far compilare un modulo, far mettere un prodotto nel carrello?

Il costo totale di un progetto web ha quattro parti: design e sviluppo (una tantum), dominio e hosting (annuali), produzione dei contenuti (testi, fotografie, grafica) e manutenzione (mensile o annuale). La maggior parte dei preventivi copre solo la prima. Le altre tre emergono dopo come "costi nascosti" proprio perché nessuno le ha chieste. Quando confronti i preventivi, chiedi che ogni parte sia quotata separatamente.

Ciò su cui un preventivo economico risparmia è invisibile; ciò che ti costa non lo è. Le tre voci tagliate più spesso sono la fase di scoperta (versare i contenuti in un template senza capire l'attività), i test (controllare il sito in un solo browser) e le basi SEO che permettono ai motori di ricerca di leggere il sito correttamente. Salta queste tre e il sito si apre ma non funziona: rotto sui telefoni, assente da Google, incapace di trasformare un visitatore in cliente. Ricostruirlo un anno dopo costa sempre più che costruirlo bene.

Imposta il budget chiedendoti quanto vale un cliente per te, non quanto puoi permetterti di spendere. Moltiplica il valore medio di un cliente per il numero di clienti che ti aspetti dal sito ogni mese: per un'attività di servizi con un lavoro medio da ₺20.000, un sito che porta due nuovi clienti al mese produce ₺480.000 di lavoro all'anno. Con questa aritmetica il costo del sito smette di essere la domanda e il suo ritorno diventa la domanda.

Fai a ogni agenzia queste cinque domande e chiedi le risposte per iscritto: Cosa è incluso nel preventivo e cosa no? La configurazione SEO tecnica sarà fatta alla consegna? Di chi è il sito: dominio e hosting sono registrati a tuo nome? Come funziona il supporto dopo la pubblicazione? Cosa avete costruito per un'attività come la mia e cosa ne è uscito? Un preventivo che non sa rispondere chiaramente a una sola di queste è caro, qualunque cifra riporti.

A suerta.co ascoltiamo l'attività prima di fare un preventivo: cosa vendi, chi è il tuo cliente, quale compito deve assumersi il sito. La call di scoperta è gratuita: scrivi a suerta.info@gmail.com e ti rispondiamo entro un giorno lavorativo.
    `,
    faqs: [
      {
        question: 'Quanto tempo ci vuole per costruire un sito web?',
        answer:
          'Dipende dal perimetro: un sito aziendale su un tema esistente richiede 2–4 settimane, un progetto con design su misura 6–12 settimane. Ciò che allunga i tempi di solito non è lo sviluppo ma la preparazione dei contenuti, testi e fotografie. I progetti che preparano i contenuti presto finiscono in tempo.',
      },
      {
        question: 'Devo pagare un canone mensile di manutenzione?',
        answer:
          'Non è obbligatorio, ma un sito che nessuno aggiorna accumula falle di sicurezza e problemi di velocità. Un piccolo budget mensile di manutenzione costa quasi sempre meno che ricostruire il sito ogni due anni.',
      },
      {
        question: 'Posso aggiornare il sito da solo?',
        answer:
          'Su un sito costruito bene, sì. Chiedi una formazione sul pannello contenuti alla consegna; potrai gestire da solo testi e immagini e lasciare all’agenzia il lavoro tecnico.',
      },
      {
        question: 'Perché scegliere il preventivo più basso è rischioso?',
        answer:
          'Perché un sito web non è una spesa, è uno strumento di vendita. Un sito economico che non produce lavoro è una perdita totale; un sito che produce lavoro è un guadagno, qualunque cosa sia costato. Confronta su "quale preventivo ha capito la mia attività", non sul prezzo.',
      },
    ],
  },

  'shopify-mi-woocommerce-mi': {
    tag: 'E-Commerce',
    date: '13 luglio 2026',
    iso: '2026-07-13',
    title: 'Shopify o WooCommerce? Un confronto 2026 per la tua attività',
    desc: 'Le due piattaforme a confronto su costi, velocità, manutenzione e crescita. Cinque domande per capire quale fa per te.',
    content: `
La prima grande decisione nell'e-commerce è la piattaforma, e in pratica si riduce a due nomi: Shopify e WooCommerce. La risposta breve: Shopify per le attività che vogliono concentrarsi sulle operazioni e non hanno personale tecnico; WooCommerce per le attività che vogliono pieno controllo e personalizzazione e hanno un supporto tecnico a disposizione.

Le due fanno lo stesso lavoro con filosofie opposte. Shopify è un negozio in affitto: hosting, sicurezza, aggiornamenti e infrastruttura sono responsabilità di Shopify; tu paghi un abbonamento mensile e ti concentri sulla vendita. WooCommerce è un negozio che costruisci sul tuo terreno: un plugin gratuito sopra WordPress, dove hosting, sicurezza e manutenzione li gestisci tu (o la tua agenzia). Questa differenza è tutto il confronto.

Sui costi, l'etichetta "gratis" di WooCommerce inganna: aggiunti hosting, plugin premium e manutenzione regolare, il costo totale si avvicina a un abbonamento Shopify e a volte lo supera. Il costo di Shopify è trasparente ma rigido: non puoi saltare un mese. Su configurazione e gestione Shopify vince nettamente: un solo pannello, pagamenti pronti fin dall'inizio e un interlocutore chiaro da chiamare quando qualcosa si rompe. Su WooCommerce la flessibilità porta con sé la responsabilità: l'hosting sbagliato rallenta il negozio, un plugin non aggiornato diventa una falla di sicurezza. Per un'attività senza personale tecnico, un negozio WooCommerce significa in pratica un contratto di manutenzione con un'agenzia.

Su velocità e SEO, entrambe le piattaforme competono su Google se costruite bene; la differenza è la qualità della realizzazione, non la piattaforma. In uno scenario di crescita i limiti sono diversi: su Shopify il limite è la flessibilità (arrivi a un muro dove la piattaforma non ti lascia personalizzare), su WooCommerce sono le operazioni (al crescere dei volumi, server e manutenzione diventano lavoro vero). Una bussola approssimativa: catalogo standard e volumi in crescita, Shopify; modello di business insolito dove la personalizzazione è critica, WooCommerce.

Cinque domande che decidono: C'è qualcuno di tecnico nel team? (No: Shopify / Sì: WooCommerce) — Preferisci un costo fisso o variabile? (Fisso: Shopify) — Vendi un catalogo standard? (Sì: Shopify) — Puoi dedicare al sito meno di un'ora a settimana? (Sì: Shopify) — Contenuti e blog sono centrali per la tua attività? (Sì: WooCommerce). Se il risultato è pari, parti con Shopify: anche se si rivelasse la scelta sbagliata, lo scopri a un costo minore.

A suerta.co lavoriamo in entrambi i mondi, dal setup di temi Shopify all'e-commerce costruito su misura, ed è per questo che consigliamo quella che si adatta alla tua attività, non una piattaforma. Scrivi il tuo prodotto e il tuo obiettivo a suerta.info@gmail.com e lo decidiamo insieme in una call di scoperta gratuita.
    `,
    faqs: [
      {
        question: 'Posso passare da Shopify a WooCommerce più avanti, o viceversa?',
        answer:
          'Sì; prodotti, clienti e ordini si possono migrare. Ciò che richiede attenzione è la SEO che hai accumulato: struttura degli URL e posizionamenti. Se i redirect non sono configurati correttamente perdi visibilità su Google, quindi la migrazione va pianificata.',
      },
      {
        question: 'Incassare con Shopify in Türkiye è un problema?',
        answer:
          'No; Shopify funziona con fornitori di pagamento locali come iyzico e PayTR. Ciò che serve è pianificare in fase di setup l’integrazione fiscale e di fatturazione (e-fatura / e-arşiv).',
      },
      {
        question: 'Meglio un tema già pronto o uno su misura?',
        answer:
          'Un buon tema già pronto è la scelta giusta per partire; si passa a un tema su misura quando il brand cresce e ha bisogno di distinguersi. Ciò che conta è che il tema superi i test di velocità e mobile.',
      },
      {
        question: 'Vendo tramite Instagram: mi serve davvero un negozio mio?',
        answer:
          'Instagram è un canale di scoperta, non una proprietà: se l’account sparisce, la tua lista clienti sparisce con lui. Il tuo sito ti rende proprietario dei dati dei clienti, della SEO che accumuli e della vendita ripetuta. I due sono complementari, non rivali.',
      },
    ],
  },

  'yeni-site-seo-checklist': {
    tag: 'Prestazioni e SEO',
    date: '13 luglio 2026',
    iso: '2026-07-13',
    title: 'Checklist SEO per un nuovo sito: 12 passi prima di andare online',
    desc: 'I 12 passi SEO da verificare prima che un sito vada online: configurazione tecnica, contenuti, velocità e presentazione corretta del sito a Google.',
    content: `
Il motivo più comune per cui un nuovo sito non compare su Google è una manciata di passi semplici saltati il giorno del lancio, e la maggior parte richiede cinque minuti di verifica. La lista in 12 punti qui sotto è la versione breve del processo pre-lancio che seguiamo su ogni progetto.

Basi tecniche (1–5): Tutte e quattro le varianti del tuo indirizzo — con www, senza www, http e https — devono reindirizzare a un unico indirizzo canonico; quattro indirizzi significano quattro siti e la tua forza si divide tra loro. Il certificato SSL deve essere installato e pulito, senza avvisi "non sicuro" su nessuna pagina. Controlla il robots.txt: se contiene "Disallow: /" il tuo sito sta dicendo a Google di non indicizzarlo — il lucchetto messo durante lo sviluppo e notoriamente dimenticato il giorno del lancio. tuosito.com/sitemap.xml deve restituire una sitemap aggiornata. E configura Google Search Console: lì invii la sitemap e lì vedi i problemi di indicizzazione. È gratuita e richiede dieci minuti.

Contenuti (6–9): Ogni pagina che vuoi indicizzare ha bisogno di una sola query obiettivo: cosa digita su Google chi cerca questa pagina? Se non hai una risposta, la pagina non ha SEO. Il titolo deve stare sotto i 60 caratteri, contenere la query in modo naturale ed essere diverso su ogni pagina; la descrizione deve stare sotto i 155 caratteri e invitare al clic. Ogni pagina ha bisogno di un solo H1, con sottotitoli che scendono in ordine. I nomi dei file immagine devono avere un senso e il testo alternativo va compilato: studio-web-design-milano.jpg invece di IMG_4821.jpg.

Prestazioni e fiducia (10–12): La maggior parte del traffico arriva da telefono e Google giudica i siti dalla versione mobile: inserisci il tuo sito in PageSpeed Insights e, se il punteggio è basso, il primo sospettato sono le immagini non compresse; passare a WebP è da solo il più grande guadagno di velocità sulla maggior parte dei siti. Quando il tuo sito viene condiviso su WhatsApp deve comparire con un titolo, una descrizione e un'immagine con il brand: WhatsApp è dove i link si condividono di più, e una scheda vuota è una scheda che nessuno tocca. Infine, i dati strutturati: Organization sulla home, Article sugli articoli, e una regola: non aggiungere schema per contenuti che non esistono. FAQ finte e stelle finte sono un rischio di penalizzazione, non un vantaggio.

Il lavoro non finisce con la lista. Nella prima settimana tieni d'occhio tre cose: le tue pagine stanno passando a "indicizzate" in Search Console? Il tuo sito compare per primo per il nome del tuo brand? Hai messo per iscritto le tue query obiettivo? Non disperare per i posizionamenti in quelle prime settimane: un sito nuovo che trova il suo posto su query competitive è questione di mesi, non di settimane, ed è normale. L'investimento migliore in quel periodo è pubblicare, con regolarità, contenuti che rispondono alle query obiettivo.

Questi 12 punti sono il riassunto del processo pre-lancio che suerta.co segue su ogni progetto: qui un sito non va online finché la lista non è completa. Se vuoi sapere quanti ne supera il tuo sito attuale, scrivi a suerta.info@gmail.com e ti rispondiamo dopo una breve revisione.
    `,
    faqs: [
      {
        question: 'Il mio sito è online ma non compare su Google. Perché?',
        answer:
          'Tre cause abituali: il blocco robots.txt o noindex non è mai stato tolto, il sito non è mai stato presentato a Google Search Console, oppure il sito è semplicemente nuovo e il suo turno non è ancora arrivato. Controlla le prime due; se sono pulite, richiedi l’indicizzazione in Search Console e aspetta qualche giorno.',
      },
      {
        question: 'Mi serve un’agenzia separata per la SEO?',
        answer:
          'La configurazione di base di questa lista è compito di chi costruisce il sito e va fatta alla consegna: chiedilo esplicitamente quando raccogli i preventivi. La SEO continuativa (contenuti, autorevolezza, miglioramento tecnico) è un servizio a parte; se ti serve dipende dai tuoi obiettivi.',
      },
      {
        question: 'Quali strumenti mi servono per questi controlli?',
        answer:
          'Si fa tutto con strumenti gratuiti: Google Search Console per l’indicizzazione, PageSpeed Insights per la velocità, metatags.io per le schede di condivisione, il Test dei risultati avanzati per lo schema. Nessuno richiede uno strumento a pagamento.',
      },
      {
        question: 'La lista vale anche per siti Shopify o WordPress?',
        answer:
          'Sì, tutti i 12 punti sono indipendenti dalla piattaforma; cambia solo dove si trovano le impostazioni.',
      },
    ],
  },

  'otel-rezervasyon-hizi': {
    tag: 'Prestazioni e SEO',
    date: '12 luglio 2026',
    iso: '2026-07-12',
    title: 'Come velocizzare il flusso di prenotazione di un hotel ha alzato la conversione del 40%',
    desc: 'Dietro il principio zero attesa e la costruzione velocità-prima del progetto Emsa Otel.',
    content: `
Nel settore alberghiero le persone decidono in secondi. Tempi di caricamento lunghi, passaggi di prenotazione complicati e interfacce pesanti rimandano i potenziali ospiti da dove sono venuti. Per il sistema di prenotazione costruito per Emsa Otel la priorità è stata un principio di zero attesa.

Abbiamo costruito il sistema da zero con React e strumenti web moderni. I passaggi che prima avanzavano ricaricando la pagina sono diventati un unico flusso ininterrotto. Ottimizzare le immagini senza perdita visibile di qualità ha ridotto il peso delle pagine del 70%.

Il risultato: da telefono, completare una prenotazione è passato da tre minuti a 45 secondi, e le vendite dirette, senza commissioni, sono cresciute del 40%.
    `,
    faqs: [
      {
        question: 'La velocità del sito influisce davvero sulle prenotazioni?',
        answer:
          'Sì. Gli studi stimano che ogni secondo in più di caricamento costi circa il 7% di conversione.',
      },
      {
        question: 'Cos’è una single-page application e cosa aggiunge a un sito di hotel?',
        answer:
          'È un’architettura in cui passare da una pagina all’altra non ricarica l’intera pagina. Su un sito di hotel rende istantaneo ogni passaggio, così l’ospite finisce la prenotazione invece di perdere la pazienza.',
      },
      {
        question: 'Cos’è un sistema di prenotazione diretta senza commissioni?',
        answer:
          'Ricevere la prenotazione dal sito dell’hotel, su un fornitore di pagamento sicuro, senza pagare commissioni a intermediari come Booking o Agoda.',
      },
    ],
  },

  'karanlik-mod-premium': {
    tag: 'Design UI/UX',
    date: '5 luglio 2026',
    iso: '2026-07-05',
    title: 'Perché la modalità scura e un’estetica premium ispirano più fiducia',
    desc: 'Cosa fanno la modalità scura e un’estetica di lusso alla percezione di un brand.',
    content: `
La percezione visiva è la prima chiave per fidarsi di un brand. Nel B2B e nei settori del lusso — architettura, transfer VIP, software su misura — un'interfaccia scura non è solo una preferenza estetica ma un pezzo di posizionamento.

Nei nostri progetti ci appoggiamo a nero, grigi profondi e dettagli oro o bordeaux. Quella palette comunica eleganza, discrezione, prestigio e professionalità. È anche più riposante per l'occhio, e questo tende ad allungare il tempo trascorso sul sito.

Nei progetti Argüman Fabrikası e Nova Mimarlık abbiamo usato un'estetica scura completamente premium, così che il design da solo dicesse al pubblico di ciascun brand: questo è uno studio boutique che sa fare il suo lavoro.
    `,
    faqs: [
      {
        question: 'La modalità scura va bene per ogni settore?',
        answer:
          'No. Funziona benissimo per beni di lusso, tecnologia, architettura e studi creativi. Per abbigliamento per bambini o sanità, colori più chiari e positivi — bianco, blu, verde — di solito servono meglio.',
      },
      {
        question: 'Come influisce un’estetica premium sulle vendite?',
        answer:
          'Quando il cliente vive un’esperienza di alto livello sul sito, la sua tolleranza al prezzo del prodotto o del servizio sale e la sua fedeltà al brand si rafforza.',
      },
      {
        question: 'La modalità scura danneggia la SEO?',
        answer:
          'Il colore non ha alcun effetto tecnico diretto sulla SEO. Ma un buon design trattiene le persone più a lungo sul sito, e questo contribuisce indirettamente al posizionamento.',
      },
    ],
  },

  'ozel-yazilim-vs-hazir-paketler': {
    tag: 'E-Commerce',
    date: '28 giugno 2026',
    iso: '2026-06-28',
    title: 'Software su misura o pacchetti pronti: quale fa per te?',
    desc: 'Un caso studio sulla flessibilità e sul ritorno a lungo termine di una piattaforma e-commerce costruita da zero.',
    content: `
Una delle prime domande che un brand si pone quando va online è questa: usare una piattaforma e-commerce già pronta come Shopify o Ticimax, oppure farsi costruire un software su misura?

Dipende dalla scala dell'attività e da cosa vuole ottenere. Nel progetto Pawsec Shop il brand aveva bisogno di più di un elenco di prodotti standard: servivano piani alimentari personalizzati per animali. Costruirlo su un sistema pronto sarebbe stato costoso e goffo.

Abbiamo costruito per Pawsec Shop una piattaforma su misura in React e Node.js, da zero, modellata interamente su ciò di cui il brand aveva bisogno. Questo ha dato pieno controllo sul database, e le integrazioni con sistemi esterni — spedizioni, pagamenti, CRM — sono diventate questione di secondi. Nel tempo, il software su misura ha liberato l'attività dai limiti delle piattaforme e dal canone mensile, e si è rivelato di gran lunga l'investimento più redditizio.
    `,
    faqs: [
      {
        question: 'Il software su misura costa sempre più di un pacchetto pronto?',
        answer:
          'All’inizio sì: l’investimento è più alto. Ma contando le tariffe dei moduli, i costi aggiuntivi e le commissioni che si accumulano su una piattaforma pronta, il software su misura di solito si ripaga in due o tre anni.',
      },
      {
        question: 'Come si mantiene sicuro un software su misura?',
        answer:
          'I framework moderni (React, Next.js, Node.js) incorporano le pratiche di sicurezza attuali: standard OWASP, protezioni CSRF e XSS. Lato server, i firewall chiudono il sistema a tutto ciò che non deve esporre.',
      },
      {
        question: 'Si possono aggiungere nuove funzioni più avanti?',
        answer:
          'È il più grande vantaggio del software su misura. Qualsiasi funzione serva a te o alla tua attività può essere aggiunta al sistema come modulo.',
      },
    ],
  },

  'fotograf-cekimi': {
    tag: 'Brand e contenuti',
    date: '20 luglio 2026',
    iso: '2026-07-20',
    title: 'Come si realizza un servizio fotografico professionale per un’attività',
    desc: 'Metà di un buon sito è fotografia. I passaggi di un servizio commerciale: luce, composizione e la post-produzione che segue.',
    content: `
La maggior parte della prima impressione che un sito dà è visiva, non testuale; il visitatore vede le fotografie prima di leggere una frase e decide sul tuo brand in pochi secondi. Scatti da telefono scuri e disordinati fanno sembrare un sito economico, per quanto buono sia il design intorno. La fotografia professionale non è un lusso; è una parte fondamentale del trasformare un visitatore in cliente.

Un servizio commerciale parte da un piano: quali inquadrature saranno usate e dove sul sito? Camere e spazi comuni per un hotel, prodotti su bianco per un negozio, il team e l'atmosfera dell'ufficio per uno studio. Uscire a fotografare senza quella lista finisce con centinaia di scatti e nessuno utilizzabile. Prima di ogni servizio prepariamo una shot list, abbinando in anticipo ogni spazio immagine nel layout del sito.

La luce è ciò che decide una fotografia. Le ore in cui la luce del giorno è morbida — prima mattina, tardo pomeriggio — sono adatte agli interni; per i prodotti, una luce da studio controllata o un softbox tiene le ombre sotto controllo. La composizione segue la regola dei terzi, uno sfondo pulito e la palette del brand. L'obiettivo non è "una bella foto" ma un linguaggio visivo coerente che dica qualcosa sul brand.

Il lavoro non finisce con il servizio: la vera differenza emerge in post-produzione. Correzione del colore, bilanciamento dell'esposizione, rimozione di ciò che non dovrebbe stare nell'inquadratura e ridimensionamento per il web avvengono qui. Immagini ad alta risoluzione ma compresse (WebP) appaiono nitide senza rallentare la pagina; sbaglia questo equilibrio e le belle fotografie diventano ciò che rende lento il sito.

A suerta.co ci occupiamo noi stessi della fotografia nella maggior parte dei progetti web, perché il team che disegna il sito sa fin dall'inizio quale inquadratura va dove. Se vuoi rinnovare le immagini della tua attività, scrivi a suerta.info@gmail.com e prepariamo la lista insieme.
    `,
    faqs: [
      {
        question: 'Le foto che scatto con il mio telefono non bastano?',
        answer:
          'Per qualche post social, possono bastare. Ma la tua home e le immagini dei prodotti sono la tua vetrina. La differenza in luce, angolazione e post-produzione decide se il visitatore legge il tuo brand come professionale o amatoriale.',
      },
      {
        question: 'Quanto dura un servizio fotografico?',
        answer:
          'Dipende dal perimetro: un set di prodotti può richiedere mezza giornata, un hotel o gli interni di un’attività una giornata intera. Una shot list preparata in anticipo lo accorcia molto.',
      },
      {
        question: 'Di chi è il copyright delle fotografie?',
        answer:
          'Il diritto d’uso delle immagini consegnate appartiene alla tua attività; puoi usarle liberamente sul sito, sui social e in stampa.',
      },
    ],
  },

  'mobil-optimizasyon': {
    tag: 'Prestazioni e SEO',
    date: '18 luglio 2026',
    iso: '2026-07-18',
    title: 'Cos’è l’ottimizzazione mobile e perché il tuo sito è lento sul telefono',
    desc: 'La maggior parte dei visitatori arriva da telefono. Cosa significa ottimizzazione mobile, gli errori che rallentano un sito e come costruirne uno che si apre in fretta.',
    content: `
La grande maggioranza del traffico web arriva da telefono, e Google oggi giudica i siti prima di tutto dalla versione mobile. Per quanto bene appaia il tuo sito su un desktop, se è lento o rotto su un telefono perdi sia il visitatore sia il posizionamento. L'ottimizzazione mobile è il lavoro di rendere un sito veloce, leggibile e usabile con un pollice su uno schermo piccolo.

Il colpevole più comune di un sito mobile lento sono le immagini non ottimizzate. Inviare a un telefono una fotografia da 4.000 pixel preparata per il desktop brucia i dati del visitatore e la sua pazienza. La soluzione: comprimere le immagini in formati moderni (WebP/AVIF), servire misure diverse per schermi diversi e rimandare il caricamento di quelle sotto la piega. Sulla maggior parte dei siti l'ottimizzazione delle immagini da sola è il più grande guadagno di velocità.

La seconda area è il layout. Su un telefono i contenuti devono disporsi su una colonna, il testo deve essere leggibile senza zoom e i pulsanti abbastanza grandi da premerli con un pollice. Tre colonne da desktop devono impilarsi; il menu deve diventare un pannello laterale invece di coprire lo schermo. I siti pubblicati senza testare questo perdono visitatori per lo scorrimento orizzontale e gli elementi sovrapposti.

La terza è il peso tecnico: font inutili, librerie di animazione pesanti e codice in eccesso gravano tutti sul processore del telefono. Un sito costruito bene carica solo ciò che gli serve. Per misurare questa parte, inserisci il tuo sito nel gratuito Google PageSpeed Insights; se il punteggio mobile è basso, le opportunità più grandi sono elencate proprio lì.

A suerta.co costruiamo ogni progetto mobile first e testiamo su dispositivi reali prima della pubblicazione. Se vuoi che misuriamo le prestazioni mobile del tuo sito, scrivi a suerta.info@gmail.com e ti prepariamo un breve rapporto sulla velocità.
    `,
    faqs: [
      {
        question: 'Il mio sito è responsive. Mi serve comunque l’ottimizzazione?',
        answer:
          'Essere responsive — riorganizzarsi per adattarsi allo schermo — ed essere veloce sono cose diverse. Un sito può apparire bene su un telefono e aprirsi comunque lentamente. L’ottimizzazione copre velocità e usabilità, oltre all’aspetto.',
      },
      {
        question: 'La velocità mobile influisce davvero sulla SEO?',
        answer:
          'Sì. Google usa la velocità mobile e i segnali di esperienza utente (Core Web Vitals) come fattori di ranking. Un sito lento abbassa anche direttamente la conversione, perché il visitatore se ne va prima di vedere la pagina.',
      },
      {
        question: 'Posso velocizzare il mio sito attuale senza ricostruirlo?',
        answer:
          'Di solito sì. Ottimizzazione delle immagini, rimozione del codice inutile e caching possono fare una differenza reale. Se però la base è molto vecchia, ricostruire può essere la strada più economica.',
      },
    ],
  },

  'google-ads-donusum': {
    tag: 'Marketing digitale',
    date: '16 luglio 2026',
    iso: '2026-07-16',
    title: 'Come configurare il tracciamento delle conversioni in Google Ads (e smettere di sprecare budget)',
    desc: 'Fare pubblicità senza tracciare le conversioni è buttare soldi al buio. Come si configurano le conversioni in Google Ads e come si misurano le vendite dalle campagne.',
    content: `
Fare pubblicità è facile; sapere se la pubblicità funziona è difficile. L'errore più comune in Google Ads è avviare una campagna senza tracciamento delle conversioni. Un account senza tracciamento non può dirti quale parola chiave ha portato un cliente e quale ha solo bruciato denaro: spendi il budget al buio. La buona notizia: configurato correttamente, Google riferisce chiaramente dove è finita ogni lira.

Una conversione è un'azione che ha valore per la tua attività: l'invio di un modulo, una telefonata, un tocco su WhatsApp, una prenotazione, una vendita. Il primo passo è definire quelle azioni: che aspetto ha il successo? Poi si crea in Google Ads un'azione di conversione per ciascuna, e uno snippet di tracciamento sul sito la riferisce. Oggi questo si gestisce per lo più tramite Google Tag Manager, con un unico contenitore sul sito, così le modifiche successive non richiedono codice.

Ciò che conta è che il tracciamento conti l'evento giusto. È il momento in cui il modulo viene inviato, o solo cliccato? Un tocco sul numero di telefono è una chiamata reale? Un tracciamento configurato male sovrastima o sottostima e ti spinge verso decisioni sbagliate. Quindi testa dopo la configurazione: compila un modulo vero e verifica che la conversione arrivi nel pannello.

Una volta in piedi il tracciamento, la pubblicità diventa qualcosa che puoi ottimizzare: il budget si sposta sulle parole chiave che convertono, quelle che non convertono vengono fermate e la campagna può essere affidata alle offerte automatiche con un obiettivo di costo per conversione. Meta (Facebook/Instagram) funziona allo stesso modo, con il tracciamento tramite Meta Pixel. La pubblicità che non si può misurare non si può gestire: ecco perché il tracciamento delle conversioni non è un lusso ma una precondizione.

A suerta.co iniziamo sempre la gestione delle campagne dalla configurazione della misurazione, perché l'obiettivo è un cliente misurabile e non un'impressione. Se vuoi vedere chiaramente il ritorno del tuo budget pubblicitario, scrivi a suerta.info@gmail.com.
    `,
    faqs: [
      {
        question: 'Google Ads ha senso con un budget piccolo?',
        answer:
          'Sì, ma solo con il tracciamento delle conversioni attivo. Con un budget piccolo ogni lira conta; senza vedere quale parola chiave funziona, un budget piccolo sparisce in fretta. Con la misurazione, anche un budget piccolo può essere gestito in modo efficiente.',
      },
      {
        question: 'Le conversioni di Google Analytics e di Google Ads sono la stessa cosa?',
        answer:
          'No, ma si completano. Analytics mostra il comportamento sul sito in generale; una conversione Ads misura azioni specifiche che arrivano dalla pubblicità e alimenta l’ottimizzazione delle offerte. Collegati insieme danno il quadro più fedele.',
      },
      {
        question: 'Il tracciamento delle conversioni danneggia il sito?',
        answer:
          'No. Uno snippet installato correttamente non rallenta la pagina e gestisce i dati personali nel rispetto delle regole su privacy e cookie. Ciò che conta è che il consenso ai cookie sia configurato correttamente.',
      },
    ],
  },

  'google-isletme-profili': {
    tag: 'SEO locale',
    date: '15 luglio 2026',
    iso: '2026-07-15',
    title: 'Come ottimizzare il Profilo dell’attività su Google (Maps)',
    desc: 'I clienti ti cercano prima su Google Maps. Configurare il profilo dell’attività, ottimizzarlo e distinguersi con le recensioni.',
    content: `
"Hotel vicino a me", "appartamento vista mare", "hotel boutique più vicino": quando le persone cercano un servizio locale, la maggior parte guarda le schede delle attività su Google Maps prima di guardare qualsiasi sito. Quelle schede vengono dal gratuito Profilo dell'attività su Google (un tempo Google My Business). Un'attività senza profilo è invisibile nella parte più preziosa della ricerca: la mappa e il pacchetto locale a tre risultati.

Il primo passo è creare il profilo e verificare la proprietà; Google di solito conferma l'indirizzo con un codice. Poi entrano le informazioni di base, complete e coerenti: nome dell'attività, indirizzo, telefono, orari di apertura e categoria. La regola che conta di più qui è la coerenza: nome, indirizzo e telefono devono essere scritti in modo identico sul sito, sui social e sul profilo. Google li confronta, e l'incoerenza ti costa fiducia e posizionamento.

L'ottimizzazione consiste nel tenere vivo il profilo. Buone fotografie (esterni, interni, prodotti), l'elenco di servizi e prodotti, post regolari e, soprattutto, la gestione delle recensioni lo rafforzano. Google privilegia le attività con molte recensioni positive che rispondono. Chiedere recensioni ai clienti e rispondere a ognuna, positiva e negativa, con cortesia è il passo più efficace e più trascurato del posizionamento locale.

Infine, il profilo lavora insieme al sito e alla pubblicità: i clic su "sito web" e "indicazioni" si possono misurare e le chiamate si possono tracciare. Così vedi se l'interesse che arriva dalla mappa si trasforma in un cliente reale. Per un'attività locale il Profilo dell'attività su Google è spesso la prima vetrina, prima ancora del sito.

A suerta.co gestiamo insieme configurazione del profilo, ottimizzazione e integrazione con il sito per le attività locali. Se vuoi essere più visibile su Maps, scrivi a suerta.info@gmail.com.
    `,
    faqs: [
      {
        question: 'Il Profilo dell’attività su Google costa qualcosa?',
        answer:
          'No, creare e gestire il profilo è completamente gratuito. L’unico costo è la pubblicità, se scegli di farne; il profilo in sé e la presenza sulla mappa sono gratuiti.',
      },
      {
        question: 'Le recensioni influiscono davvero sul posizionamento?',
        answer:
          'Sì. Numero di recensioni, valutazione media e le tue risposte sono segnali significativi per il ranking locale. I nuovi clienti, inoltre, leggono le recensioni più di qualsiasi altra cosa quando decidono.',
      },
      {
        question: 'Cosa devo fare con una recensione negativa?',
        answer:
          'Rispondi in modo professionale invece di cercare di farla rimuovere. Una risposta che si assume la responsabilità e offre una soluzione trasforma quella recensione in un segnale di fiducia per chi la legge.',
      },
    ],
  },

  'whatsapp-chatbot': {
    tag: 'Automazione e IA',
    date: '14 luglio 2026',
    iso: '2026-07-14',
    title: 'Come creare un chatbot WhatsApp per rispondere 24 ore su 24',
    desc: 'Se sei stanco di rispondere sempre alle stesse domande, la risposta è l’automazione. Come si costruisce un chatbot WhatsApp e cosa ti toglie dalle mani.',
    content: `
WhatsApp è al centro del contatto con i clienti, in Türkiye come in Italia. Per chiedere un prezzo, prenotare un appuntamento o sapere se siete aperti, le persone scrivono prima su WhatsApp. Il problema: la maggior parte di quei messaggi ripete le stesse poche domande, e rispondere a ciascuno a mano — soprattutto fuori orario — è faticoso e, quando la risposta arriva tardi, un modo per perdere clienti. Un chatbot WhatsApp ti toglie quel carico ripetitivo.

Ci sono due modi per costruirlo. Per i casi semplici basta un flusso a menu: il cliente si muove tra le opzioni — "1: Prezzi, 2: Orari, 3: Parla con una persona" — e riceve una risposta immediata. Per esigenze più complesse, un bot basato sull'IA legge la frase del cliente e produce la risposta giusta, interpretando qualcosa come "avete posto domani pomeriggio?". Quale sia giusto dipende dalla complessità dell'attività; per la maggior parte, un flusso a menu ben progettato è sorprendentemente efficace.

Tecnicamente il bot si costruisce sull'infrastruttura ufficiale di WhatsApp per le aziende (WhatsApp Business API). Questo evita il rischio che il tuo numero personale venga bloccato e permette l'automazione in modo ufficiale. Si definiscono flussi per le domande frequenti, gli orari, lo stato dell'ordine o la prenotazione. La parte critica è lasciare un'uscita: il cliente deve poter dire "parla con una persona" in qualsiasi momento, e il bot deve passare ciò che non riesce a risolvere. L'esperienza più esasperante è un bot da cui non si può mai uscire.

Un chatbot costruito bene non assorbe solo carico, produce vendite: risponde al messaggio che arriva a mezzanotte, dà informazioni senza far aspettare nessuno e porta una persona interessata verso una prenotazione o un ordine. I bot WhatsApp costruiti nei progetti Rönesans Edu e Argüman Fabrikası rispondono automaticamente a una grande quota delle domande ricorrenti, e questo restituisce al team il tempo per il lavoro vero.

A suerta.co guardiamo i messaggi che la tua attività riceve davvero e costruiamo l'automazione che si adatta. Per parlare di quali domande potrebbero essere automatizzate, scrivi a suerta.info@gmail.com.
    `,
    faqs: [
      {
        question: 'Un chatbot farà sentire ai clienti di parlare con un robot?',
        answer:
          'Un bot progettato bene risponde in modo chiaro e veloce e passa a una persona quando serve, e a nessuno dispiace. L’esperienza negativa viene dai bot che girano in tondo e non ti lasciano mai raggiungere un umano; noi progettiamo il flusso proprio per evitarlo.',
      },
      {
        question: 'Si configura sul mio numero WhatsApp personale?',
        answer:
          'Per l’automazione è consigliata la WhatsApp Business API: la via ufficiale permette l’automazione ed elimina il rischio di blocco del numero. Messaggi massivi o automatici da un numero personale possono farlo bloccare.',
      },
      {
        question: 'Mi serve un bot basato sull’IA?',
        answer:
          'No. Per la maggior parte delle attività un flusso a menu basta ed è più prevedibile. L’IA aggiunge valore dove le domande arrivano come testo libero e variano molto.',
      },
    ],
  },

  'telegram-sinav-botu': {
    tag: 'Software su misura',
    date: '11 luglio 2026',
    iso: '2026-07-11',
    title: 'Monitorare i posti d’esame con un bot Telegram',
    desc: 'Automatizzare le occasioni che non si possono sorvegliare a mano. Dietro un bot Telegram che monitora i posti di un esame e avvisa nell’istante in cui cambiano.',
    content: `
Alcune occasioni si misurano in secondi: un posto d'esame che si libera, un appuntamento disponibile, una lista aggiornata. Informazioni così cambiano in silenzio su una pagina web, e sorvegliarle a mano è impossibile in pratica: nessuno può ricaricare una pagina ogni minuto per tutto il giorno. È esattamente il problema che abbiamo risolto per Rönesans Edu: gli studenti dovevano sapere nell'istante in cui si apriva un posto per l'esame CENT-S, e nessuno sforzo umano poteva coglierlo. La risposta è stata un bot Telegram.

La logica è semplice: un software controlla la fonte — una pagina o un sistema — a intervalli regolari, si accorge quando qualcosa cambia e invia una notifica immediata alle persone interessate. Telegram è un canale ideale per questo perché supporta i bot ufficialmente, le notifiche sono immediate e per l'utente la configurazione non è altro che entrare nel bot: nessuna app da installare, nessun account da creare. Il bot può avvisare centinaia di persone in pochi secondi.

La costruzione ha tre parti. Primo, il sorvegliante: un software che controlla la fonte a intervalli, la confronta con lo stato precedente e risponde alla domanda "c'è qualcosa di nuovo?". Secondo, il livello di notifica: il bot che porta il messaggio su Telegram quando viene colto un cambiamento. Terzo, l'affidabilità: tenere il sistema attivo su un server 24 ore su 24, recuperare dagli errori e non inviare avvisi falsi o inutili. La proprietà più preziosa del bot è che parla solo quando qualcosa conta davvero; un bot che manda rumore viene silenziato in fretta.

Lo stesso approccio funziona ben oltre i posti d'esame: livelli di scorte, cambi di prezzo, un appuntamento libero, un nuovo annuncio: ogni caso in cui saperlo subito vale qualcosa. L'essenza è affidare al software la sorveglianza continua, che una persona non può fare, e consegnare il risultato su un canale che le persone già usano: Telegram, WhatsApp o email.

A suerta.co costruiamo bot di monitoraggio e notifica per attività specifiche. Se c'è un processo che fatichi a seguire a mano, scrivi a suerta.info@gmail.com e valutiamo se si può automatizzare.
    `,
    faqs: [
      {
        question: 'Un bot così è legale?',
        answer:
          'Monitorare informazioni pubblicamente disponibili e avvisare i propri utenti è in genere lecito. Ciò che conta è una configurazione che rispetti i termini della fonte e i dati personali, e che giri a intervalli ragionevoli senza gravare sul sistema.',
      },
      {
        question: 'Devo lasciare acceso il computer perché il bot continui a funzionare?',
        answer:
          'No. Il bot gira su un server, 24 ore su 24; il tuo dispositivo non deve restare acceso. Il funzionamento continuo e il recupero automatico dopo un errore fanno parte della costruzione.',
      },
      {
        question: 'Lo stesso sistema può avvisare via WhatsApp o email?',
        answer:
          'Sì. Il sorvegliante resta lo stesso; il livello di notifica può essere WhatsApp, email o SMS invece di Telegram. Il canale si sceglie in base a dove è già il tuo pubblico.',
      },
    ],
  },

  'geo-yapay-zeka-gorunurluk': {
    tag: 'GEO e IA',
    date: '10 luglio 2026',
    iso: '2026-07-10',
    title: 'Cos’è la GEO? Cosa succede quando ChatGPT e Gemini ti consigliano',
    desc: 'Le persone ora chiedono a un’IA invece che a Google. La Generative Engine Optimization e come portare il tuo brand nelle risposte dell’IA.',
    content: `
Le abitudini di ricerca stanno cambiando. Sempre più persone mettono domande come "consigliami un hotel boutique con piscina in Cappadocia" o "quale sistema di prenotazione dovrei usare per il mio hotel" non su Google ma direttamente in ChatGPT, Gemini o Perplexity. Quegli strumenti non elencano dieci link blu; danno una sola risposta, e quella risposta consiglia una manciata di brand. La GEO — Generative Engine Optimization — è il lavoro di portare il tuo brand in quelle risposte. È la sorella di nuova generazione della SEO.

La SEO classica punta al posizionamento su Google; la GEO punta a far sì che un'IA ti scelga come fonte e ti consigli. I modelli di IA assemblano le loro risposte dai contenuti sul web e privilegiano materiale chiaro, strutturato, autorevole e che spiega davvero l'argomento. Quindi la base della GEO non è un trucco, sono i buoni contenuti: le pagine che spiegano un argomento a fondo e rispondono alle domande in modo diretto sono quelle di cui questi modelli si fidano e che citano di più.

In pratica la GEO mette insieme alcune cose. Primo, capire quali domande reali il tuo pubblico farà a un'IA e produrre contenuti che rispondano in modo chiaro. Secondo, strutturare quei contenuti perché le macchine li leggano facilmente: titoli chiari, domande frequenti, definizioni e dati strutturati. Terzo, assicurarsi che il brand sia descritto in modo coerente in tutto il web: le stesse informazioni, scritte nello stesso modo sul sito, nelle directory e sui social, così che il modello possa fidarsi. Un avvertimento: dati inventati e markup per contenuti che non esistono si ritorcono contro. IA e motori di ricerca penalizzano entrambi l'incoerenza e le affermazioni vuote. La strada verso la fiducia è un contenuto davvero utile.

La GEO è ancora un campo nuovo, ed è esattamente per questo che è un'opportunità per i brand che si muovono presto: mentre i tuoi concorrenti non pensano ancora alla visibilità nell'IA, posizionarsi ora con i contenuti giusti significa prendere oggi il vantaggio del "primo risultato" del prossimo periodo. Nel progetto Argüman Fabrikası abbiamo pianificato SEO e GEO insieme, con l'obiettivo di rendere il brand visibile tanto su Google quanto nelle risposte dell'IA.

A suerta.co costruiamo strategie di contenuto che coprono sia la SEO classica sia la GEO. Per parlare di visibilità nella ricerca con IA, scrivi a suerta.info@gmail.com.
    `,
    faqs: [
      {
        question: 'La GEO sta sostituendo la SEO?',
        answer:
          'No, la completa. Alcune persone usano ancora Google, altre chiedono a un’IA. La strategia giusta copre entrambe, e un buon contenuto SEO è già una base solida per la GEO.',
      },
      {
        question: 'Potete garantire che un’IA mi consiglierà?',
        answer:
          'Nessuna agenzia onesta può garantirlo, né su Google né in un’IA. Ciò che possiamo fare è costruire i contenuti e la struttura che rendono più probabile essere consigliati. Diffida di chi promette una garanzia.',
      },
      {
        question: 'La GEO è prematura per una piccola impresa?',
        answer:
          'Al contrario: il vantaggio è di chi è piccolo e arriva presto. Posizionarsi con i contenuti giusti mentre il campo è poco affollato rende più difficile per i concorrenti più grandi recuperare dopo.',
      },
    ],
  },
};
