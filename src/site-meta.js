// One place defining what each page is called and how it describes itself.
//
// Two things read this: the router, which updates the tab title as you move around,
// and scripts/prerender.mjs, which writes the tags into real HTML at build time.
// Keeping it in one file is what stops the two drifting apart — the whole site
// previously shared a single title, so all three pages looked identical to a search
// engine.

export const SITE_URL = 'https://danielallen.com.au'

export const SITE_NAME = 'Daniel Allen'

export const PAGES = [
  {
    path: '/',
    file: 'index.html',
    title: 'Daniel Allen — Software Developer',
    description:
      'Software developer building practical, data-driven and AI-assisted systems. ' +
      'Projects in C++, Node.js, Vue and Android, each with automated tests and ' +
      'written documentation.'
  },
  {
    path: '/about',
    file: 'about.html',
    title: 'About — Daniel Allen',
    description:
      'A software application graduate with a full-stack mindset built from years in ' +
      'business, marketing and user-focused design. Experience with AWS and Salesforce, ' +
      'and an approach grounded in how technology is actually used.'
  },
  {
    path: '/portfolio',
    file: 'portfolio.html',
    title: 'Portfolio — Daniel Allen',
    description:
      'Selected projects across full stack, embedded systems and AI-assisted tooling, ' +
      'including an email anonymiser in C++, an IoT grocery system, and this site — ' +
      'each with an automated test suite and continuous integration.'
  }
]

export const pageFor = path => PAGES.find(p => p.path === path) || PAGES[0]

// Structured data describing who this is.
//
// Written as an @graph rather than a lone Person, so the person, the site and the page
// are separate entities that reference each other by @id. That is what lets a search
// engine treat the GitHub and LinkedIn profiles as the same individual as the site,
// rather than three unrelated things that happen to share a name.
export const schemaFor = page => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Daniel Allen',
      url: SITE_URL,
      jobTitle: 'Software Developer',
      description:
        'Software developer building practical, data-driven and AI-assisted systems.',
      // The profiles that are demonstrably the same person.
      sameAs: [
        'https://github.com/daniel-p-allen',
        'https://www.linkedin.com/in/danielpeterallen/'
      ],
      knowsAbout: [
        'Software development',
        'C++',
        'Node.js',
        'Vue.js',
        'Android development',
        'MongoDB',
        'Internet of Things',
        'Automated testing'
      ]
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: { '@id': `${SITE_URL}/#person` },
      inLanguage: 'en-AU'
    },
    {
      // ProfilePage on the about route, WebPage elsewhere — the about page is the one
      // that is actually about the person.
      '@type': page.path === '/about' ? 'ProfilePage' : 'WebPage',
      '@id': `${SITE_URL}${page.path}#page`,
      url: `${SITE_URL}${page.path}`,
      name: page.title,
      description: page.description,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#person` },
      inLanguage: 'en-AU'
    }
  ]
})
