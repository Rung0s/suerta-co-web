/* English versions of the blog posts.
   --------------------------------------------------------------------------
   Keyed by post id, same ids as src/data/blogs.js, so /blog/<id> and
   /en/blog/<id> are the same piece in two languages and the language switch
   keeps the reader on the page they were reading.

   A post with no entry here still gets an English page — it falls back to the
   Turkish text and is flagged so the page can say so, rather than quietly
   handing an English reader a Turkish article.

   Prices stay in Turkish lira. Converting them would date the piece the first
   time the rate moves, and the reader deciding on a budget is buying in that
   currency anyway. */

export const postsEn = {
  'web-sitesi-maliyeti-2026': {
    tag: 'Strategy & Budget',
    date: '13 July 2026',
    iso: '2026-07-13',
    title: 'What a Website Costs in 2026: A Realistic Price Guide for Small Businesses',
    desc: 'What does a company website cost in 2026? A line-by-line breakdown, the hidden items, and how to build the budget properly.',
    content: `
Having a website built in 2026 is an investment running anywhere from a few thousand lira to a few hundred thousand — and the range is that wide because the price follows the job the site does, not the site itself. What sets the price is not the number of pages but the work the site takes on. A brochure site and an online shop that sells, tracks stock and takes payment can have the same page count and still differ several times over in cost. The question to answer before you ask for a quote is this: what behaviour does this site have to produce for my business to make money? Make the phone ring, get a form filled in, get a product into a basket?

The total cost of a website project has four parts: design and development (one-off), domain and hosting (yearly), content production (words, photography, graphics) and maintenance (monthly or yearly). Most quotes cover only the first. The other three surface later as "hidden costs" precisely because nobody asked about them. When you compare quotes, ask for each part to be priced separately.

What a cheap quote saves on is invisible; what it costs you is not. The three items cut most often are discovery (pouring content into a template without understanding the business), testing (checking the site in one browser only) and the SEO groundwork that lets search engines read the site correctly. Skip those three and the site opens but does not work: broken on phones, missing from Google, turning no visitor into a customer. Rebuilding a year later always costs more than building it right.

Set the budget by asking what a customer is worth to you, not what you can afford to spend. Multiply your average customer value by the number of customers you expect the site to bring in each month: for a service business with an average job of ₺20,000, a site bringing two new customers a month produces ₺480,000 of work a year. On that arithmetic the cost of the site stops being the question and its return becomes one.

Ask every agency these five questions and ask for the answers in writing: What is in the quote and what is not? Will the technical SEO setup be done when the site is handed over? Who owns the site — are the domain and hosting registered in your name? How does support work after launch? What have you built for a business like mine, and what came of it? A quote that cannot answer any one of those clearly is expensive whatever the number on it.

At suerta co. we listen to the business before quoting: what you sell, who your customer is, what job the site has to take on. The discovery call is free — write to suerta.info@gmail.com and we will come back within one working day.
    `,
    faqs: [
      {
        question: 'How long does building a website take?',
        answer:
          'It depends on scope: a company site on an existing theme takes 2–4 weeks, a custom-designed project 6–12 weeks. What stretches a timeline is usually not the development but getting the content — words and photographs — ready. Projects that prepare content early finish on time.',
      },
      {
        question: 'Do I have to pay a monthly maintenance fee?',
        answer:
          'It is not compulsory, but a site nobody updates accumulates security holes and speed problems. A small monthly maintenance budget is almost always cheaper than rebuilding the site every two years.',
      },
      {
        question: 'Can I update the site myself?',
        answer:
          'On a properly built site, yes. Ask for training on the content panel at handover; you can then handle text and images yourself and leave the technical work to the agency.',
      },
      {
        question: 'Why is picking the cheapest quote risky?',
        answer:
          'Because a website is not an expense, it is a sales tool. A cheap site that produces no work is a total loss; a site that produces work is a profit whatever it cost. Compare on "which quote understood my business", not on price.',
      },
    ],
  },

  'shopify-mi-woocommerce-mi': {
    tag: 'E-Commerce',
    date: '13 July 2026',
    iso: '2026-07-13',
    title: 'Shopify or WooCommerce? A 2026 Comparison for Your Business',
    desc: 'The two platforms compared on cost, speed, maintenance and growth. Five questions to settle which one fits your business.',
    content: `
The first big decision in e-commerce is the platform, and in practice it comes down to two names: Shopify and WooCommerce. The short answer: Shopify for businesses that want to concentrate on operations and have no technical staff; WooCommerce for businesses that want full control and customisation and have technical help available.

The two do the same job on opposite philosophies. Shopify is a rented shop: hosting, security, updates and infrastructure are Shopify's responsibility; you pay a monthly subscription and put your attention on selling. WooCommerce is a shop you build on your own land — a free plugin on top of WordPress, where hosting, security and maintenance are yours (or your agency's) to run. That difference is the whole comparison.

On cost, the "free" label on WooCommerce is misleading: once hosting, premium plugins and regular maintenance are added, total cost of ownership approaches a Shopify subscription and sometimes passes it. Shopify's cost is transparent but rigid — you do not get to skip a month. On setup and management Shopify wins outright: one panel, payments ready out of the box, and a clear party to call when something breaks. On WooCommerce, flexibility comes with responsibility: the wrong host slows the shop down, an un-updated plugin becomes a security hole. For a business with no technical staff, a WooCommerce shop means a maintenance agreement with an agency in practice.

On speed and SEO, both platforms compete in Google when built properly; the difference is the quality of the build, not the platform. In a growth scenario the limits differ: on Shopify the limit is flexibility (you hit a wall where the platform will not let you customise), on WooCommerce it is operations (as volume grows, servers and maintenance become real work). A rough compass: standard catalogue and growing volume, Shopify; unusual business model where customisation is critical, WooCommerce.

Five questions that settle it: Is there anyone technical on the team? (No: Shopify / Yes: WooCommerce) — Do you prefer a fixed cost or a variable one? (Fixed: Shopify) — Are you selling a standard catalogue? (Yes: Shopify) — Can you spend less than an hour a week on the site? (Yes: Shopify) — Is content and blogging central to your business? (Yes: WooCommerce). If it comes out even, start with Shopify: even if it turns out to be the wrong call, you learn it more cheaply.

At suerta co. we work in both worlds, from Shopify theme setup to custom-built commerce — which is why we recommend the one that fits your business rather than a platform. Write your product and your goal to suerta.info@gmail.com and we will settle it together on a free discovery call.
    `,
    faqs: [
      {
        question: 'Can I move from Shopify to WooCommerce later, or the other way?',
        answer:
          'Yes; products, customers and orders can be moved. What needs care is the SEO you have built up — URL structure and rankings. If the redirects are not set up correctly you lose visibility in Google, so plan the migration.',
      },
      {
        question: 'Is taking payments with Shopify a problem in Türkiye?',
        answer:
          'No; Shopify works with local payment providers such as iyzico and PayTR. What you need is to plan the tax and invoicing integration (e-fatura / e-arşiv) during setup.',
      },
      {
        question: 'Should I use a ready-made theme or a custom one?',
        answer:
          'A good ready-made theme is the right call to start with, and you move to a custom theme when the brand grows and needs to stand apart. What matters is that the theme passes speed and mobile tests.',
      },
      {
        question: 'I sell through Instagram — do I really need a shop of my own?',
        answer:
          'Instagram is a discovery channel, not property: if the account goes, your customer list goes with it. Your own site makes you the owner of the customer data, the SEO you accumulate and the repeat sale. The two are complementary, not rivals.',
      },
    ],
  },

  'yeni-site-seo-checklist': {
    tag: 'Performance & SEO',
    date: '13 July 2026',
    iso: '2026-07-13',
    title: 'New Website SEO Checklist: 12 Steps Before You Launch',
    desc: 'The 12 SEO steps to check before a site goes live: technical setup, content, speed, and introducing the site to Google properly.',
    content: `
The most common reason a new site does not show up in Google is a handful of simple steps skipped on launch day — and most of them take five minutes to check. The 12-point list below is the short version of the pre-launch process we run on every project.

Technical groundwork (1–5): All four variants of your address — with www, without www, http and https — must redirect to one canonical address; four addresses mean four sites and your strength is split between them. The SSL certificate must be installed and clean, with no "not secure" warning on any page. Check robots.txt: if it contains "Disallow: /" your site is telling Google not to index it — the lock set during development and famously forgotten on launch day. yoursite.com/sitemap.xml should return a current sitemap. And set up Google Search Console: you submit the sitemap there and see indexing problems there. It is free and takes ten minutes.

Content (6–9): Every page you want indexed needs a single target query — what does someone looking for this page type into Google? If you have no answer, the page has no SEO. The title should stay under 60 characters, carry the target query naturally and differ on every page; the description should stay under 155 characters and invite the click. Each page needs exactly one H1, with subheadings that step down in order. Image filenames should mean something and alt text should be filled in: istanbul-web-design-office.jpg rather than IMG_4821.jpg.

Performance and trust (10–12): Most traffic arrives on phones and Google judges sites on their mobile version — put your site into PageSpeed Insights, and if the score is low the first suspect is uncompressed images; switching to WebP is on its own the biggest single speed win on most sites. When your site is shared in WhatsApp it should appear with a title, a description and a branded image — WhatsApp is where links get shared most, and an empty card is a card nobody taps. Finally, structured data: Organization on the home page, Article on posts, and one rule — do not add schema for content that is not there. Fake FAQs and fake stars are a penalty risk, not a gain.

The work does not end when the list does. Watch three things in the first week: are your pages moving to "indexed" in Search Console? Does your own site come first for your brand name? Have you written down your target queries? Do not despair at the rankings in those first weeks — a new site finding its place on competitive queries is a matter of months, not weeks, and that is normal. The best investment during that period is publishing content that answers the target queries, regularly.

These 12 points are the summary of the pre-launch process suerta co. runs on every project — a site does not go live here until the list is complete. If you want to know how many of them your current site passes, write to suerta.info@gmail.com and we will report back after a short review.
    `,
    faqs: [
      {
        question: 'My site is live but it does not appear in Google. Why?',
        answer:
          'Three usual causes: the robots.txt or noindex lock was never lifted, the site was never introduced to Google Search Console, or the site is simply new and its turn has not come. Check the first two; if both are clean, request indexing in Search Console and wait a few days.',
      },
      {
        question: 'Do I need a separate agency for SEO?',
        answer:
          'The basic setup on this list is the job of whoever builds the site and should be done at handover — ask about it explicitly when you get quotes. Ongoing SEO (content, authority, technical improvement) is a separate service; whether you need it depends on your goals.',
      },
      {
        question: 'What tools do I need for these checks?',
        answer:
          'All of it can be done with free tools: Google Search Console for indexing, PageSpeed Insights for speed, metatags.io for share cards, the Rich Results Test for schema. None of it requires a paid tool.',
      },
      {
        question: 'Does the list apply to Shopify or WordPress sites too?',
        answer:
          'Yes, all 12 points are platform-independent; only the location of the settings changes.',
      },
    ],
  },

  'otel-rezervasyon-hizi': {
    tag: 'Performance & SEO',
    date: '12 July 2026',
    iso: '2026-07-12',
    title: 'How Speeding Up a Hotel Booking Flow Raised Conversion by 40%',
    desc: 'Behind the zero-wait principle and the speed-first build on the Emsa Otel project.',
    content: `
In the hotel business people decide in seconds. Long load times, complicated booking steps and heavy interfaces send potential guests back to where they came from. For the booking system we built for Emsa Otel, the priority was a zero-wait principle.

We built the system from the ground up with React and modern web tooling. Steps that previously moved forward by reloading the page became a single, uninterrupted flow. Optimising the images without visible quality loss cut page weight by 70%.

The result: on phones, completing a booking went from three minutes to 45 seconds, and direct — commission-free — sales rose 40%.
    `,
    faqs: [
      {
        question: 'Does site speed really affect bookings?',
        answer:
          'Yes. Studies put every additional second of load time at roughly a 7% drop in conversion.',
      },
      {
        question: 'What is a single-page application and what does it add to a hotel site?',
        answer:
          'It is an architecture where moving between pages does not reload the whole page. On a hotel site it makes each step instant, so the guest finishes the booking rather than losing patience.',
      },
      {
        question: 'What is a commission-free direct booking system?',
        answer:
          'Taking the booking through the hotel’s own site on a secure payment provider, without paying commission to an intermediary such as Booking or Agoda.',
      },
    ],
  },

  'karanlik-mod-premium': {
    tag: 'UI/UX Design',
    date: '5 July 2026',
    iso: '2026-07-05',
    title: 'Why Dark Mode and a Premium Look Earn More Trust',
    desc: 'What dark mode and a luxury aesthetic do to how a brand is perceived.',
    content: `
Visual perception is the first key to trusting a brand. In B2B work and in luxury sectors — architecture, VIP transfer, custom software — a dark interface is not only an aesthetic preference but a piece of positioning.

In our projects we lean on black, deep greys and gold or burgundy detail. That palette reads as elegance, discretion, prestige and professionalism. It is also easier on the eye, which tends to lengthen the time people spend on the site.

On the Argüman Fabrikası and Nova Mimarlık projects we used a fully premium dark aesthetic, so that the design alone told each brand's audience: this is a boutique studio that is good at what it does.
    `,
    faqs: [
      {
        question: 'Does dark mode suit every sector?',
        answer:
          'No. It works beautifully for luxury goods, technology, architecture and creative studios. For children’s clothing or healthcare, lighter and more positive colours — white, blue, green — usually serve better.',
      },
      {
        question: 'How does a premium look affect sales?',
        answer:
          'When a customer has a high-end experience on the site, their tolerance for the price of the product or service goes up and their loyalty to the brand strengthens.',
      },
      {
        question: 'Does dark mode hurt SEO?',
        answer:
          'Colour has no direct technical effect on SEO. But good design keeps people on the site longer, which contributes to your ranking indirectly.',
      },
    ],
  },

  'ozel-yazilim-vs-hazir-paketler': {
    tag: 'E-Commerce',
    date: '28 June 2026',
    iso: '2026-06-28',
    title: 'Custom Software vs Off-the-Shelf: Which One Fits You?',
    desc: 'A case study on the flexibility and long-term return of an e-commerce platform built from scratch.',
    content: `
One of the first questions a brand asks when going online is this: should I use a ready-made e-commerce platform such as Shopify or Ticimax, or have custom software built?

It depends on the scale of the business and what it is trying to do. On the Pawsec Shop project the brand needed more than a standard product listing: it needed personalised pet diet plans. Building that on a ready-made system would have been expensive and clumsy.

We built Pawsec Shop a custom React and Node.js platform from scratch, shaped entirely around what the brand needed. That gave full control over the database, and integrations with outside systems — shipping, payment, CRM — became a matter of seconds. Over time, custom software freed the business from platform limits and monthly rent, and turned out to be by far the more profitable investment.
    `,
    faqs: [
      {
        question: 'Is custom software always more expensive than an off-the-shelf package?',
        answer:
          'At the start, yes — the investment is higher. But once you count the module fees, add-on charges and commissions that accumulate on a ready-made platform, custom software usually pays for itself over two to three years.',
      },
      {
        question: 'How is custom software kept secure?',
        answer:
          'Modern frameworks (React, Next.js, Node.js) ship with current security practice — OWASP standards, CSRF and XSS protections. On the server side, firewalls close the system off from anything it does not need to expose.',
      },
      {
        question: 'Can new features be added later?',
        answer:
          'That is the single biggest advantage of custom software. Any function you or your business needs can be added to the system as a module.',
      },
    ],
  },

  'fotograf-cekimi': {
    tag: 'Brand & Content',
    date: '20 July 2026',
    iso: '2026-07-20',
    title: 'How Professional Photography Is Done for a Business',
    desc: 'Half of a good website is photography. The steps of a commercial shoot: light, composition and the editing that follows.',
    content: `
Most of the first impression a website gives is visual, not textual; the visitor sees the photographs before reading a sentence and decides about your brand in seconds. Dim, cluttered phone snaps make a site look cheap however good the design around them is. Professional photography is not a luxury; it is a basic part of turning a visitor into a customer.

A commercial shoot starts with a plan: which frames will be used where on the site? Rooms and shared spaces for a hotel, products on white for a shop, the team and the atmosphere of the office for a studio. Going out to shoot without that list ends with hundreds of frames and not one you can use. We prepare a shot list before every shoot, matching each image slot in the site's layout in advance.

Light is what decides a photograph. The hours when daylight is soft — early morning, late afternoon — suit interiors; for products, controlled studio light or a softbox keeps the shadows in hand. Composition follows the rule of thirds, a clean background and the brand's palette. The goal is not "a nice photo" but a consistent visual language that says something about the brand.

The work does not end when the shoot does: the real difference appears in the retouch. Colour correction, exposure balance, removing what should not be in frame, and sizing for the web all happen here. High-resolution but compressed images (WebP) look sharp without slowing the page down — get that balance wrong and beautiful photographs become the thing that makes the site slow.

At suerta co. we take on the photography ourselves on most of our web projects, because the team designing the site knows from the start which frame goes where. If you want to refresh your business's images, write to suerta.info@gmail.com and we will put the list together with you.
    `,
    faqs: [
      {
        question: 'Are photos I take on my own phone not enough?',
        answer:
          'For some social posts, they can be. But your home page and product images are your shop window. The difference in light, angle and editing decides whether the visitor reads your brand as professional or amateur.',
      },
      {
        question: 'How long does a shoot take?',
        answer:
          'It depends on scope: a product set can take half a day, a hotel or a business interior a full day. A shot list prepared in advance shortens it considerably.',
      },
      {
        question: 'Who owns the copyright of the photographs?',
        answer:
          'The right to use the delivered images belongs to your business; you can use them freely on your site, on social media and in print.',
      },
    ],
  },

  'mobil-optimizasyon': {
    tag: 'Performance & SEO',
    date: '18 July 2026',
    iso: '2026-07-18',
    title: 'What Mobile Optimisation Is, and Why Your Site Is Slow on a Phone',
    desc: 'Most visitors arrive on phones. What mobile optimisation means, the mistakes that slow a site down, and how to build one that opens fast.',
    content: `
The large majority of web traffic arrives on phones, and Google now judges sites on their mobile version first. However good your site looks on a desktop, if it is slow or broken on a phone you lose both the visitor and the ranking. Mobile optimisation is the work of making a site fast, readable and usable with a thumb on a small screen.

The commonest culprit behind a slow mobile site is unoptimised images. Sending a 4,000-pixel photograph prepared for desktop straight to a phone burns the visitor's data and their patience. The fix: compress images into modern formats (WebP/AVIF), serve different sizes for different screens, and defer the ones below the fold. On most sites image optimisation alone is the biggest single speed win.

The second area is layout. On a phone the content should fall into one column, text should be readable without zooming, and buttons should be big enough to press with a thumb. Three desktop columns should stack; the menu should become a drawer rather than covering the screen. Sites launched without testing this lose visitors to horizontal scrolling and overlapping elements.

The third is technical weight: unnecessary fonts, heavy animation libraries and extra code all push against the phone's processor. A well-built site loads only what it needs. To measure this part, put your site into the free Google PageSpeed Insights; if your mobile score is low, the biggest opportunities are listed right there.

At suerta co. we build every project mobile first and test on real devices before launch. If you want us to measure your site's mobile performance, write to suerta.info@gmail.com and we will produce a short speed report.
    `,
    faqs: [
      {
        question: 'My site is responsive. Do I still need optimisation?',
        answer:
          'Being responsive — rearranging to fit the screen — and being fast are different things. A site can look fine on a phone and still open slowly. Optimisation covers speed and usability as well as appearance.',
      },
      {
        question: 'Does mobile speed really affect SEO?',
        answer:
          'Yes. Google uses mobile speed and user experience signals (Core Web Vitals) as ranking factors. A slow site also lowers conversion directly, because the visitor leaves before seeing the page.',
      },
      {
        question: 'Can I speed up my current site without rebuilding it?',
        answer:
          'Usually, yes. Image optimisation, removing unnecessary code and caching can make a real difference. If the underlying build is very old, though, rebuilding can be the cheaper route.',
      },
    ],
  },

  'google-ads-donusum': {
    tag: 'Digital Marketing',
    date: '16 July 2026',
    iso: '2026-07-16',
    title: 'How to Set Up Google Ads Conversion Tracking (and Stop Wasting Budget)',
    desc: 'Advertising without conversion tracking is throwing money into the dark. How Google Ads conversions are set up and how sales from ads are measured.',
    content: `
Running ads is easy; knowing whether the ads work is hard. The commonest mistake in Google Ads is starting a campaign without conversion tracking. An account with no tracking cannot tell you which keyword brought a customer and which only burned money — you spend the budget in the dark. The good news: set up properly, Google reports clearly where every lira went.

A conversion is an action that has value for your business: a form submission, a phone call, a WhatsApp tap, a booking, a sale. The first step is to define those actions — what does success look like? Then a conversion action is created in Google Ads for each one, and a tracking snippet on the site reports it. These days that is mostly managed through Google Tag Manager, with a single container on the site, so later changes need no code at all.

What matters is that the tracking counts the right event. Is it the moment the form is submitted, or merely clicked? Is a tap on the phone number an actual call? Badly set up tracking over- or under-reports and pushes you into the wrong decisions. So test after setup: fill in a real form and confirm the conversion lands in the panel.

Once tracking is in place the advertising becomes something you can optimise: budget moves to the keywords that convert, the ones that do not get stopped, and the campaign can be handed to smart bidding with a cost-per-conversion target. Meta (Facebook/Instagram) works the same way, with tracking through the Meta Pixel. Advertising that cannot be measured cannot be managed — which is why conversion tracking is not a luxury but a precondition.

At suerta co. we always start ad management with the measurement setup, because the goal is a measurable customer rather than an impression. If you want to see the return on your ad budget clearly, write to suerta.info@gmail.com.
    `,
    faqs: [
      {
        question: 'Does Google Ads make sense on a small budget?',
        answer:
          'Yes, but only with conversion tracking in place. On a small budget every lira counts; without seeing which keyword works, a small budget disappears fast. With measurement, even a small budget can be run efficiently.',
      },
      {
        question: 'Are Google Analytics and Google Ads conversions the same thing?',
        answer:
          'No, but they complement each other. Analytics shows site behaviour in general; an Ads conversion measures specific actions coming from advertising and feeds bid optimisation. Linked together they give the truest picture.',
      },
      {
        question: 'Does conversion tracking harm the site?',
        answer:
          'No. A properly installed snippet does not slow the page down and handles personal data in line with privacy and cookie rules. What matters is that cookie consent is configured correctly.',
      },
    ],
  },

  'google-isletme-profili': {
    tag: 'Local SEO',
    date: '15 July 2026',
    iso: '2026-07-15',
    title: 'How to Optimise a Google Business Profile (Maps)',
    desc: 'Customers look for you on Google Maps first. Setting up the business profile, optimising it, and standing out through reviews.',
    content: `
"Hotel near me", "sea view holiday flat", "nearest boutique hotel" — when people look for a local service, most of them look at the business cards on Google Maps before they look at any website. Those cards come from the free Google Business Profile (once Google My Business). A business without a profile is invisible in the most valuable part of the search: the map and the three-result local pack.

The first step is to create the profile and verify ownership; Google usually confirms your address with a code. Then the basics go in, complete and consistent: business name, address, phone, opening hours and category. The rule that matters most here is consistency — your name, address and phone must be written identically on your site, on your social accounts and on the profile. Google compares them, and inconsistency costs you trust and ranking.

Optimisation is about keeping the profile alive. Good photographs (exterior, interior, products), listing your services and products, posting regularly and, above all, managing reviews all strengthen it. Google favours businesses with many positive reviews that reply to them. Asking customers for reviews and answering every one — positive and negative — politely is the most effective and most neglected step in local ranking.

Finally, the profile works together with your site and your advertising: clicks on "website" and "directions" can be measured, and calls can be tracked. That way you see whether the interest coming from the map turns into a real customer. For a local business the Google Business Profile is often the first shop window, ahead even of the website.

At suerta co. we handle profile setup, optimisation and integration with the site together for local businesses. If you want to be more visible on Maps, write to suerta.info@gmail.com.
    `,
    faqs: [
      {
        question: 'Does a Google Business Profile cost anything?',
        answer:
          'No, creating and managing the profile is entirely free. The only cost is advertising, if you choose to run any; the profile itself and appearing on the map are free.',
      },
      {
        question: 'Do reviews really affect ranking?',
        answer:
          'Yes. Review count, average rating and your replies are significant local ranking signals. New customers also read reviews more than anything else when deciding.',
      },
      {
        question: 'What should I do about a negative review?',
        answer:
          'Answer it professionally rather than trying to have it removed. A reply that takes ownership and offers a fix turns that review into a trust signal for the people reading it.',
      },
    ],
  },

  'whatsapp-chatbot': {
    tag: 'Automation & AI',
    date: '14 July 2026',
    iso: '2026-07-14',
    title: 'How to Set Up a WhatsApp Chatbot for Round-the-Clock Replies',
    desc: 'If you are tired of answering the same questions over and over, the answer is automation. How a WhatsApp chatbot is built and what it takes off your hands.',
    content: `
WhatsApp sits at the centre of customer contact in Türkiye. To ask a price, book a slot or check whether you are open, people message on WhatsApp first. The problem: most of those messages repeat the same few questions, and answering each by hand — especially outside working hours — is both tiring and, when the reply is late, a way of losing customers. A WhatsApp chatbot takes that repetitive load off you.

There are two ways to build one. For simple cases a menu-based flow is enough: the customer moves through options — "1: Prices, 2: Opening hours, 3: Talk to a person" — and gets an instant answer. For more demanding needs, an AI-backed bot reads the customer's own sentence and produces the right answer, interpreting something like "do you have space tomorrow afternoon?". Which is right depends on the complexity of the business; for most, a well-designed menu flow is surprisingly effective.

Technically the bot is built on WhatsApp's official infrastructure for businesses (the WhatsApp Business API). That avoids the risk of your personal number being banned and permits automation officially. Flows are defined for frequent questions, opening hours, order status or booking. The critical part is leaving an exit: the customer must be able to say "talk to a person" at any point, and the bot must hand over what it cannot resolve. The most infuriating experience is a bot you can never escape.

A well-built chatbot does not only absorb load, it produces sales: it answers the message that arrives at midnight, gives information without making anyone wait, and moves an interested person towards a booking or an order. The WhatsApp bots we built on the Rönesans Edu and Argüman Fabrikası projects answer a large share of the recurring questions automatically, which gives the team its time back for real work.

At suerta co. we look at the messages your business actually receives and build the automation that fits. To talk about which questions could be automated, write to suerta.info@gmail.com.
    `,
    faqs: [
      {
        question: 'Will a chatbot make customers feel they are talking to a robot?',
        answer:
          'A well-designed bot answers clearly and fast and hands over to a person when needed, which nobody minds. The bad experience comes from bots that loop and never let you reach a human; we design the flow around avoiding that.',
      },
      {
        question: 'Is it set up on my personal WhatsApp number?',
        answer:
          'For automation the WhatsApp Business API is recommended: the official route permits automation and removes the risk of your number being banned. Bulk or automated messaging from a personal number can get it blocked.',
      },
      {
        question: 'Do I need an AI-backed bot?',
        answer:
          'No. For most businesses a menu-based flow is enough and more predictable. AI adds value where questions arrive as free text and vary widely.',
      },
    ],
  },

  'telegram-sinav-botu': {
    tag: 'Custom Software',
    date: '11 July 2026',
    iso: '2026-07-11',
    title: 'Tracking Exam Quotas with a Telegram Bot',
    desc: 'Automating opportunities that cannot be watched by hand. Behind a Telegram bot that watches an exam quota and reports the moment it changes.',
    content: `
Some opportunities are measured in seconds: an exam quota opening, an appointment freeing up, a list being updated. Information like that changes quietly on a web page, and watching it by hand is impossible in practice — nobody can refresh a page every minute all day. That was exactly the problem we solved for Rönesans Edu: students needed to know the moment a CENT-S exam quota opened, and no amount of human effort could catch it. The answer was a Telegram bot.

The logic is straightforward: software checks the source — a page or a system — at regular intervals, notices when something changes, and sends an instant notification to the people who care. Telegram is an ideal channel for this because it supports bots officially, notifications are immediate, and for the user setup is nothing more than joining the bot — no app to install, no account to create. The bot can tell hundreds of people within seconds.

There are three parts to the build. First, the watcher: software that checks the source on an interval, compares it with the previous state and answers the question "is there anything new?". Second, the notification layer: the bot that carries the message over Telegram when a change is caught. Third, reliability: keeping the system up on a server around the clock, recovering from errors, and not sending false or unnecessary alerts. The most valuable property of the bot is that it speaks only when something genuinely matters; a bot that sends noise gets muted quickly.

The same approach works well beyond exam quotas — stock levels, price changes, a free appointment, a new listing: any case where knowing immediately is worth something. The essence is handing continuous watching, which a person cannot do, to software, and delivering the result to a channel people already use: Telegram, WhatsApp or email.

At suerta co. we build watching and notification bots for specific businesses. If there is a process you are struggling to follow by hand, write to suerta.info@gmail.com and we will look at whether it can be automated.
    `,
    faqs: [
      {
        question: 'Is a bot like this legal?',
        answer:
          'Watching publicly available information and notifying your own users is generally fine. What matters is a setup that respects the source’s terms and personal data, and runs at sensible intervals that do not strain the system.',
      },
      {
        question: 'Do I have to leave my computer on for the bot to keep running?',
        answer:
          'No. The bot runs on a server, around the clock; your own device does not need to be on. Continuous operation and automatic recovery after an error are part of the build.',
      },
      {
        question: 'Can the same system notify by WhatsApp or email?',
        answer:
          'Yes. The watcher stays the same; the notification layer can be WhatsApp, email or SMS instead of Telegram. The channel is chosen by where your audience already is.',
      },
    ],
  },

  'geo-yapay-zeka-gorunurluk': {
    tag: 'GEO & AI',
    date: '10 July 2026',
    iso: '2026-07-10',
    title: 'What Is GEO? What Happens When ChatGPT and Gemini Recommend You',
    desc: 'People now ask an AI instead of Google. Generative Engine Optimization, and getting your brand into AI answers.',
    content: `
Search habits are shifting. More and more people put questions like "recommend a boutique hotel with a pool in Cappadocia" or "which booking system should I use for my hotel" not into Google but straight into ChatGPT, Gemini or Perplexity. Those tools do not list ten blue links; they give one answer, and that answer recommends a handful of brands. GEO — Generative Engine Optimization — is the work of getting your brand into those answers. It is SEO's next-generation sibling.

Classic SEO aims at ranking in Google; GEO aims at an AI choosing you as a source and recommending you. AI models assemble their answers from content on the web and favour material that is clear, structured, authoritative and genuinely explains the subject. So the foundation of GEO is not a trick, it is good content: pages that explain a topic properly and answer questions directly are what these models trust and quote most.

In practice GEO brings a few things together. First, working out the real questions your audience will ask an AI and producing content that answers them plainly. Second, structuring that content so machines read it easily — clear headings, frequently asked questions, definitions and structured data. Third, making sure the brand is described consistently across the web: the same information, written the same way on your site, in directories and on social channels, so the model can trust it. A warning: fabricated data and markup for content that does not exist backfires. AI and search engines both penalise inconsistency and empty claims. The route to trust is content that is actually useful.

GEO is still a new field, and that is exactly why it is an opportunity for brands that move early: while your competitors are not yet thinking about AI visibility, positioning now with the right content means taking the "first result" advantage of the coming period today. On the Argüman Fabrikası project we planned SEO and GEO together, aiming to make the brand visible in Google and in AI answers alike.

At suerta co. we build content strategy to cover both classic SEO and GEO. To talk about being visible in AI search, write to suerta.info@gmail.com.
    `,
    faqs: [
      {
        question: 'Is GEO replacing SEO?',
        answer:
          'No, it complements it. Some people still use Google, others ask an AI. The right strategy covers both, and good SEO content is already solid ground for GEO.',
      },
      {
        question: 'Can you guarantee an AI will recommend me?',
        answer:
          'No honest agency can guarantee that — not in Google and not in an AI. What we can do is build the content and structure that make being recommended most likely. Be wary of anyone promising a guarantee.',
      },
      {
        question: 'Is GEO too early for a small business?',
        answer:
          'The opposite: the advantage lies with whoever is small and early. Positioning with the right content while the field is uncrowded makes it harder for larger competitors to catch up later.',
      },
    ],
  },
};
