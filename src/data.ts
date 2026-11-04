// ─────────────────────────────────────────────────────────────
//  Edit this file to update the portfolio content.
// ─────────────────────────────────────────────────────────────

export const person = {
  name: 'Sharath B Naik',
  role: 'Full Stack Developer',
  email: 'sharathnaik89@gmail.com',
  github: 'https://github.com/sharath-b-naik',
  linkedin: 'https://www.linkedin.com/in/sharath-b-naik/',
  stackoverflow: 'https://stackoverflow.com/users/15207145/sharath-b-naik',
};

export interface StoreApp {
  name: string;
  tagline: string;
  category: string;
  /** Optional path to an icon in /public (e.g. "apps/bookloop.webp"). Falls back to a monogram. */
  icon?: string;
  monogram: string;
  /** Two colours for the card gradient. */
  colors: [string, string];
  downloads?: string;
  playStore?: string;
  appStore?: string;
  website?: string;
}

export const storeApps: StoreApp[] = [
  {
    name: 'S Me - Beauty Hub',
    tagline:
      'Book expert makeup, nail and beauty services with top professionals — for weddings, events or everyday.',
    category: 'Lifestyle · Booking',
    monogram: 'S',
    colors: ['#ff4d8d', '#8b3dff'],
    downloads: '1K+',
    playStore: 'https://play.google.com/store/apps/details?id=com.yesme.yesme',
    appStore: 'https://apps.apple.com/in/app/s-me-beauty-hub/id6740777065',
  },
  {
    name: 'BookLoop',
    tagline:
      'Buy & sell second-hand books nearby — textbooks, novels and exam books, traded locally.',
    category: 'Marketplace',
    monogram: 'B',
    colors: ['#ffb547', '#ff5e3a'],
    downloads: '500+',
    playStore: 'https://play.google.com/store/apps/details?id=com.bookloop.bookloop',
    website: 'https://bookloop-prod.web.app',
  },
  {
    name: 'ThreadCAD',
    tagline: 'An embroidery designer that turns logos and drawings into machine-ready embroidery files.',
    category: 'Design · Tools',
    monogram: 'T',
    colors: ['#22d3ee', '#6366f1'],
    playStore: 'https://play.google.com/store/apps/details?id=com.threadcad.threadcad',
    website: 'https://threadcad.web.app',
  },
  {
    name: 'SpatioTrack',
    tagline: 'A production Android app built for SpatioWorld.',
    category: 'SpatioWorld',
    monogram: 'S',
    colors: ['#34d399', '#0ea5e9'],
    playStore: 'https://play.google.com/store/apps/details?id=com.spatioworld.spatiotrack',
  },
  {
    name: 'RadioSay',
    tagline: 'A production Android app built for SpatioWorld.',
    category: 'SpatioWorld',
    monogram: 'R',
    colors: ['#c084fc', '#ec4899'],
    playStore: 'https://play.google.com/store/apps/details?id=com.spatioworld.radiosay',
  },
];

export const stack = [
  { name: 'Flutter', icon: 'icons/flutter.webp' },
  { name: 'Dart', icon: 'icons/dart.webp' },
  { name: 'Firebase', icon: 'icons/firebase.webp' },
  { name: 'Go', icon: 'icons/go.webp' },
  { name: 'JavaScript', icon: 'icons/javascript.webp' },
  { name: 'Node.js', icon: 'icons/nodejs.webp' },
  { name: 'PostgreSQL', icon: 'icons/postgresql.webp' },
];
