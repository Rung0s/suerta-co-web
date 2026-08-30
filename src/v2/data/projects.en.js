/* English versions of the project write-ups.
   --------------------------------------------------------------------------
   Keyed by the project id in src/data/references.js — the Turkish file stays
   the source of record for what exists, and this file only carries the
   translated text. Ids never change with language, so a link to a project
   survives a language switch.

   Client names and product names are left as they are: they are how those
   businesses are actually written. */

export const projectsEn = {
  1: {
    category: 'Web Design',
    desc: 'Hotel Website & Digital Marketing',
    details: `
### What we did
We took on Emsa Otel's online visibility and performance end to end.

*   **Photography:** A professional shoot covering the rooms and the shared spaces of the hotel.
*   **Mobile optimisation:** Most guests arrived on phones, so the site was rebuilt mobile first.
*   **English language support:** An English version of the site for international guests.
*   **SEO:** Technical and content SEO to lift visibility in search.
*   **Google Ads conversion tracking:** Traffic from campaigns measured properly and turned into bookings.
*   **Google Business Profile:** The profile optimised so the hotel stands out in local search.
*   **Performance work:** Faster page loads and a smoother site overall.
    `,
    faqs: [
      {
        question: 'Can I take commission-free bookings through a hotel site?',
        answer:
          'Yes. When the booking comes through your own site you pay no commission to an intermediary such as Booking or Agoda. The site is built around that direct channel, with secure payment behind it.',
      },
      {
        question: 'Is a multilingual site necessary for international guests?',
        answer:
          'If you can attract them, yes. English support lets a guest read the details in their own language and trust what they read, and that raises the share of direct bookings.',
      },
      {
        question: 'How long until my hotel ranks well on Google?',
        answer:
          'SEO and Google Business Profile work show clear results within a few months, and local search (Maps) usually improves sooner. Ads give you visibility from day one.',
      },
    ],
  },

  2: {
    category: 'Custom Software',
    desc: 'Education, Exam Tracking & Automation',
    details: `
### What we did
A broad project digitising the teaching and student side of Rönesans Edu.

*   **Exam tracking via a Telegram bot:** A dedicated bot watching CENT-S exam quotas, so students catch openings that were previously almost impossible to find in time.
*   **Website software:** A custom site covering the whole of the organisation's online presence.
*   **Maps and simulations:** Interactive map and simulation modules so students can follow the process.
*   **SEO:** Work to grow traffic from organic search.
*   **WhatsApp chatbot:** Software answering the most common questions automatically.
*   **Corporate photography:** A professional shoot representing the organisation.
*   **Instagram content:** Posts and visual editing for the @yurtdisironesans account.
    `,
    faqs: [
      {
        question: 'How does the quota tracking bot work?',
        answer:
          'Software checks the exam quota at regular intervals and sends a Telegram notification the moment a place opens. Openings that cannot realistically be watched by hand no longer slip past.',
      },
      {
        question: 'Do students have to install an app?',
        answer:
          'No. Joining the Telegram bot is enough — no separate app, no account to create. On the WhatsApp side students simply send a message and get an answer.',
      },
      {
        question: 'What does the WhatsApp chatbot answer?',
        answer:
          'The recurring questions — application steps, dates, required documents and so on — are answered automatically, and anything the bot cannot resolve is handed to a person.',
      },
    ],
  },

  3: {
    category: 'E-Commerce',
    desc: 'Pet Supplies E-Commerce Store',
    details: `
### What we did
We built Pawsec an e-commerce setup from scratch.

*   **Website:** A custom site presenting the brand's products.
*   **Shopify integration:** Shopify behind the store to keep product and stock management simple.
*   **Checkout:** A checkout flow that runs cleanly from cart to payment.
*   **SEO:** Work to lift the store's visibility in search.
    `,
    faqs: [
      {
        question: 'Should I sell on Shopify or on custom software?',
        answer:
          'Shopify suits brands that want to start quickly with a standard catalogue and put their attention on operations. That is exactly why it was chosen for Pawsec — it keeps products and stock easy to manage.',
      },
      {
        question: 'Is card payment on the site secure?',
        answer:
          'Yes. Checkout is built on a secure payment provider, and the customer moves from cart to payment in a single flow.',
      },
      {
        question: 'Can I add and update products myself?',
        answer:
          'Yes. Adding products and updating prices and stock is done from the Shopify panel, with no code involved.',
      },
    ],
  },

  4: {
    category: 'Web Design',
    desc: 'Portfolio Site & Digital Marketing',
    details: `
### What we did
A broad piece of work for Argüman Fabrikası, pulling content, advertising and design together.

*   **An archive of 1,000 debate topics:** More than a thousand topics built into a structured content archive.
*   **WhatsApp chatbot:** Software answering visitors' questions automatically.
*   **Meta & Google ads:** Meta Pixel set up, with Meta Ads and Google Ads campaigns run together.
*   **SEO & GEO:** Optimised both for classic search engines and for AI-based search.
*   **Premium portfolio design:** A portfolio site carrying the brand's identity.
*   **Photography:** A professional shoot for the brand's content.
    `,
    faqs: [
      {
        question: 'How is GEO different from ordinary SEO?',
        answer:
          'SEO aims to rank you in Google; GEO aims to get tools such as ChatGPT and Gemini to recommend you. Run together, you are visible in classic search and in AI answers.',
      },
      {
        question: 'Are Meta and Google ads managed together?',
        answer:
          'Yes. With Meta Pixel in place, Meta (Instagram/Facebook) and Google Ads campaigns were run side by side, performance measured on both, and budget moved to whichever converted best.',
      },
      {
        question: 'How was the archive of 1,000 topics built into the site?',
        answer:
          'The thousand-plus topics went in as a structured archive a visitor can search and filter. That volume of original content is also a strong source of visibility for both SEO and GEO.',
      },
    ],
  },
};
