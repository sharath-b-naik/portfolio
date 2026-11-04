import 'lenis/dist/lenis.css';
import './style.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { person, stack, storeApps } from './data';

gsap.registerPlugin(ScrollTrigger);

const BASE = import.meta.env.BASE_URL;
const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector(s) as T;
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) =>
  Array.from(r.querySelectorAll(s)) as T[];
const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

const root = document.documentElement;
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(pointer: fine)').matches;
if (!reduceMotion) root.classList.add('motion');
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

/* ───────────────────────── Icons ───────────────────────── */
const ICON = {
  play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973zm0 2.067l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z"/></svg>',
  apple:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/></svg>',
  globe:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm6.93 6h-2.95a15.7 15.7 0 0 0-1.38-3.56A8.03 8.03 0 0 1 18.93 8zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14a8.2 8.2 0 0 1 0-4h3.38a16.5 16.5 0 0 0 0 4H4.26zm.81 2h2.95c.32 1.25.78 2.45 1.38 3.56A7.99 7.99 0 0 1 5.07 16zm2.95-8H5.07a7.99 7.99 0 0 1 4.33-3.56A15.7 15.7 0 0 0 8.02 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66a14.7 14.7 0 0 1 0-4h4.68a14.7 14.7 0 0 1 0 4zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 0 1-4.33 3.56zM16.36 14a16.5 16.5 0 0 0 0-4h3.38a8.2 8.2 0 0 1 0 4h-3.38z"/></svg>',
  github:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>',
};

/* ───────────────────────── Render data ───────────────────────── */
function render() {
  // Orbit (stack)
  const n = stack.length;
  $('.orbit-list').innerHTML = stack
    .map((s, i) => {
      const a = (i / n) * Math.PI * 2 - Math.PI / 2;
      return `<li class="orbit-item" style="--cx:${Math.cos(a).toFixed(4)};--cy:${Math.sin(a).toFixed(4)}" data-a="${a}">
        <div class="chip"><div class="chip-icon"><img src="${BASE}${s.icon}" alt="" width="80" height="80" loading="lazy"></div>
        <span class="chip-name">${esc(s.name)}</span></div></li>`;
    })
    .join('');
  const NS = 'http://www.w3.org/2000/svg';
  const spokes = $('.spokes');
  const mk = (tag: string, cls: string) => {
    const el = document.createElementNS(NS, tag);
    el.setAttribute('class', cls);
    el.setAttribute('pathLength', '1');
    spokes.appendChild(el);
    return el;
  };
  mk('circle', 'track');
  stack.forEach(() => mk('line', 'spoke'));
  stack.forEach((_, i) => mk('line', 'pulse-line').setAttribute('style', `animation-delay:${(-i * 0.37).toFixed(2)}s`));

  // Store apps (deck)
  $('.deck').innerHTML = storeApps
    .map((app, i) => {
      const icon = app.icon
        ? `<img src="${BASE}${app.icon}" alt="" loading="lazy">`
        : esc(app.monogram);
      const links = [
        app.playStore &&
          `<a class="store" href="${esc(app.playStore)}" target="_blank" rel="noopener">${ICON.play}Google Play</a>`,
        app.appStore &&
          `<a class="store" href="${esc(app.appStore)}" target="_blank" rel="noopener">${ICON.apple}App Store</a>`,
        app.website &&
          `<a class="store" href="${esc(app.website)}" target="_blank" rel="noopener">${ICON.globe}Website</a>`,
      ]
        .filter(Boolean)
        .join('');
      return `<article class="card" style="--c1:${app.colors[0]};--c2:${app.colors[1]}">
        <span class="edge" aria-hidden="true"></span>
        <div class="card-top"><div class="app-icon">${icon}</div><span class="card-index">${String(i + 1).padStart(2, '0')} / ${String(storeApps.length).padStart(2, '0')}</span></div>
        <span class="card-cat">${esc(app.category)}</span>
        <h3>${esc(app.name)}</h3>
        <p>${esc(app.tagline)}</p>
        <div class="card-meta">${links}${app.downloads ? `<span class="downloads"><b>${esc(app.downloads)}</b> downloads</span>` : ''}</div>
      </article>`;
    })
    .join('');
  $('.counter-strip').innerHTML = storeApps.map((_, i) => `<span>${String(i + 1).padStart(2, '0')}</span>`).join('');
  $('.counter-total').textContent = String(storeApps.length).padStart(2, '0');

  $('.year').textContent = String(new Date().getFullYear());
}

/* ───────────────────────── Split text ───────────────────────── */
function splitText(el: HTMLElement, mode: 'chars' | 'words') {
  const text = (el.textContent ?? '').trim().replace(/\s+/g, ' ');
  el.setAttribute('aria-label', text);
  el.innerHTML = text
    .split(' ')
    .map((w) =>
      mode === 'words'
        ? `<span class="word" aria-hidden="true">${esc(w)}</span>`
        : `<span class="word" aria-hidden="true">${[...w].map((c) => `<span class="char">${esc(c)}</span>`).join('')}</span>`,
    )
    .join(' ');
  el.classList.add('is-split');
}

/* ───────────────────────── Small interactions ───────────────────────── */
function toast(msg: string) {
  const t = $('.toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 1800);
}

function interactions() {
  $('.copy').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(person.email);
      toast('Email copied to clipboard');
    } catch {
      toast(person.email);
    }
  });

  if (!finePointer || reduceMotion) return;

  // Custom cursor
  const cursor = $('.cursor');
  const xTo = gsap.quickTo(cursor, 'x', { duration: 0.35, ease: 'power3' });
  const yTo = gsap.quickTo(cursor, 'y', { duration: 0.35, ease: 'power3' });
  addEventListener('pointermove', (e) => {
    xTo(e.clientX);
    yTo(e.clientY);
  });
  document.addEventListener('pointerover', (e) => {
    const hit = (e.target as Element).closest('a, button');
    cursor.classList.toggle('is-hover', !!hit);
  });

  // Magnetic elements
  $$('.magnetic').forEach((el) => {
    const mx = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' });
    const my = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      mx((e.clientX - (r.left + r.width / 2)) * 0.3);
      my((e.clientY - (r.top + r.height / 2)) * 0.35);
    });
    el.addEventListener('pointerleave', () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.4)' });
    });
  });
}

/* ───────────────────────── Menu ───────────────────────── */
function menu(goto: (name: string) => void) {
  const btn = $('.menu-btn');
  const setOpen = (open: boolean) => {
    root.classList.toggle('menu-open', open);
    btn.setAttribute('aria-expanded', String(open));
    $('.menu').setAttribute('aria-hidden', String(!open));
  };
  btn.addEventListener('click', () => setOpen(!root.classList.contains('menu-open')));
  $$<HTMLAnchorElement>('[data-goto]').forEach((a) =>
    a.addEventListener('click', (e) => {
      setOpen(false);
      if (!root.classList.contains('motion')) return; // native anchors in static mode
      e.preventDefault();
      goto(a.dataset.goto!);
    }),
  );
}

/* ───────────────────────── Static (reduced motion) ───────────────────────── */
function initStatic() {
  menu(() => {});
  const pre = $('.preloader');
  gsap.to(pre, { autoAlpha: 0, duration: 0.3, onComplete: () => pre.remove() });
}

/* ───────────────────────── Motion stage ───────────────────────── */
function initMotion() {
  $$('.split').forEach((el) => splitText(el, 'chars'));
  $$('.words').forEach((el) => splitText(el, 'words'));

  const vw = () => innerWidth;
  const vh = () => innerHeight;

  let introDone = false;

  /* ── Smooth scroll ── */
  const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9, autoRaf: false });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  ScrollTrigger.config({ ignoreMobileResize: true });
  lenis.stop();

  /* ── Master timeline: every scene lives on one fixed stage ── */
  const tl = gsap.timeline({ defaults: { ease: 'none' }, paused: true });
  const sceneStart: Record<string, number> = { home: 0 };
  const sceneEnd: Record<string, number> = {};
  const show = (id: string, sweep = true) => {
    const at = tl.duration();
    tl.set(`#${id}`, { autoAlpha: 1 }, at);
    sceneStart[id] = at;
    // a 1px light sweeps down the screen at each scene change
    if (sweep)
      tl.to(
        '.scan',
        {
          keyframes: { '0%': { y: 0, opacity: 0 }, '25%': { opacity: 1 }, '100%': { y: '100vh', opacity: 0 } },
          duration: 0.8,
          ease: 'power1.inOut',
        },
        at - 0.45,
      );
  };
  const hide = (id: string) => {
    sceneEnd[id] = tl.duration();
    tl.set(`#${id}`, { autoAlpha: 0 });
  };
  const charsIn = (sel: string) =>
    tl.from(sel, { yPercent: 110, opacity: 0, rotate: 6, stagger: 0.012, duration: 0.55, ease: 'power3.out' }, '<');
  const draw = (sel: string, vars: gsap.TweenVars = {}, pos?: gsap.Position) =>
    tl.fromTo(sel, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.8, ease: 'power2.inOut', ...vars }, pos);

  // line work starts hidden (drawn in by the intro / timeline)
  gsap.set(['.hl-base path', '.halo-track', '.swoosh path'], { strokeDashoffset: 1 });

  // HOME → wipe
  gsap.set('.wipe', { xPercent: -50, yPercent: -50, scale: 0 });
  tl.addLabel('home', 0).to({}, { duration: 0.35 });
  let t = tl.duration();
  const heroOut = t;
  tl.to('.hero-name .char', { yPercent: -115, stagger: 0.012, duration: 0.55, ease: 'power2.in' }, t)
    .to(
      ['.hero .eyebrow', '.hero-role', '.hero-sub', '.hero-cta', '.scroll-hint'],
      { y: -50, opacity: 0, stagger: 0.04, duration: 0.45, ease: 'power2.in' },
      t,
    )
    .to('.hero-lines', { opacity: 0, y: -60, duration: 0.6, ease: 'power2.in' }, t)
    .to('.hero-visual', { scale: 1.3, rotate: 30, duration: 1, ease: 'power2.in' }, t)
    .to('.wipe', { scale: 1, duration: 1.05, ease: 'power3.in' }, t + 0.15);
  hide('home');
  show('about', false);
  tl.to('.wipe', { opacity: 0, duration: 0.35 });

  // ABOUT
  tl.from('#about .eyebrow', { y: 30, opacity: 0, duration: 0.3 }, '<')
    .fromTo(
      '#about .word',
      { opacity: 0.08, y: 14 },
      { opacity: 1, y: 0, stagger: 0.035, duration: 0.25, ease: 'power1.out' },
      '<0.1',
    )
    .from('#about .rule', { scaleX: 0, duration: 0.6, ease: 'power2.inOut' }, '-=0.35')
    .from('#about .stat', { y: 40, opacity: 0, stagger: 0.1, duration: 0.4, ease: 'power2.out' }, '-=0.3')
    .from('#about .stat b', { textContent: 0, snap: { textContent: 1 }, stagger: 0.1, duration: 0.5 }, '<')
    .addLabel('about')
    .to({}, { duration: 0.2 })
    .to('#about .about-inner', { yPercent: -12, scale: 0.92, opacity: 0, duration: 0.55, ease: 'power2.in' });
  hide('about');

  // STACK — icons fly into orbit, then connector lines draw out from the core
  const items = $$('.orbit-item');
  const angle = (i: number) => parseFloat(items[i].dataset.a!);
  show('stack');
  tl.from('#stack .eyebrow', { y: 30, opacity: 0, duration: 0.3 }, '<');
  charsIn('#stack .h2 .char');
  tl.from('#stack .stack-head .muted', { y: 30, opacity: 0, duration: 0.4 }, '<0.2')
    .from('.orbit-core', { scale: 0, rotate: -120, duration: 0.6, ease: 'back.out(1.7)' }, '<')
    .fromTo('.spokes .track', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.8, ease: 'power2.inOut' }, '<')
    .from(
      items,
      {
        x: (i) => Math.cos(angle(i)) * vw() * 0.6,
        y: (i) => Math.sin(angle(i)) * vh() * 0.6,
        rotate: (i) => (i % 2 ? 160 : -160),
        scale: 0,
        opacity: 0,
        stagger: 0.05,
        duration: 0.75,
        ease: 'power3.out',
      },
      '<0.05',
    );
  draw('.spokes .spoke', { stagger: 0.05, duration: 0.5 }, '-=0.35');
  tl.addLabel('stack')
    .to('.orbit', { rotate: 100, duration: 1 })
    .to('.orbit .chip', { rotate: -100, duration: 1 }, '<')
    .to('.spokes .spoke, .spokes .track', { strokeDashoffset: -1, duration: 0.5, ease: 'power2.in' }, '>-0.4')
    .to(
      items,
      {
        x: (i) => Math.cos(angle(i)) * vw() * 1.1,
        y: (i) => Math.sin(angle(i)) * vw() * 1.1,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.in',
      },
      '<0.05',
    )
    .to('.orbit-core', { scale: 4, opacity: 0, duration: 0.6, ease: 'power2.in' }, '<')
    .to('#stack .stack-head', { y: -80, opacity: 0, duration: 0.5, ease: 'power2.in' }, '<');
  const spokesLive = [tl.labels.stack - 0.1, tl.duration() - 0.5];
  hide('stack');

  // APPS — card deck
  const cards = $$('.card');
  const N = cards.length;
  const GAP = 18;
  gsap.set(cards, { y: (i) => i * GAP, scale: (i) => 1 - i * 0.05, zIndex: (i) => N - i });
  show('apps');
  tl.from(['#apps .eyebrow', '#apps .muted', '.counter'], { y: 30, opacity: 0, stagger: 0.06, duration: 0.4 }, '<');
  charsIn('#apps .h2 .char');
  tl.from(
    cards,
    { yPercent: 120, rotate: (i) => (i % 2 ? 8 : -8), opacity: 0, stagger: 0.07, duration: 0.7, ease: 'power3.out' },
    '<0.1',
  ).addLabel('apps');
  for (let i = 0; i < N - 1; i++) {
    t = tl.duration();
    tl.to(cards[i], { yPercent: -120, rotate: i % 2 ? 12 : -12, opacity: 0, duration: 0.6, ease: 'power2.in' }, t);
    for (let j = i + 1; j < N; j++) {
      const d = j - i - 1;
      tl.to(cards[j], { y: d * GAP, scale: 1 - d * 0.05, duration: 0.6, ease: 'power2.inOut' }, t + 0.1);
    }
    tl.to('.counter-strip', { yPercent: (-100 / N) * (i + 1), duration: 0.5, ease: 'power2.inOut' }, t + 0.1);
    tl.addLabel(`apps-${i + 1}`);
  }
  tl.to({}, { duration: 0.15 })
    .to(cards[N - 1], { scale: 0.85, y: -60, opacity: 0, duration: 0.5, ease: 'power2.in' })
    .to('#apps .apps-head', { x: -80, opacity: 0, duration: 0.5, ease: 'power2.in' }, '<');
  hide('apps');

  // CODE — the GitHub mark draws itself in line
  show('code');
  tl.from('#code .eyebrow', { y: 30, opacity: 0, duration: 0.3 }, '<');
  charsIn('#code .h2 .char');
  tl.from(['#code .muted', '.gh-btn'], { y: 30, opacity: 0, stagger: 0.08, duration: 0.45, ease: 'power2.out' }, '<0.2');
  draw('.gh-ring', { stagger: 0.15, duration: 0.9 }, '<');
  draw('.gh-line', { duration: 1.2, ease: 'power1.inOut' }, '<0.1');
  tl.from('.gh-fill', { opacity: 0, duration: 0.4 }, '-=0.35')
    .addLabel('code')
    .to({}, { duration: 0.2 })
    .to('.code-copy', { x: -70, opacity: 0, duration: 0.5, ease: 'power2.in' })
    .to('.gh-mark', { scale: 0.75, rotate: -15, opacity: 0, duration: 0.5, ease: 'power2.in' }, '<');
  hide('code');

  // CONTACT
  show('contact');
  tl.from('#contact .eyebrow', { y: 30, opacity: 0, duration: 0.3 }, '<');
  tl.from('.mega .char', { yPercent: 115, stagger: 0.014, duration: 0.6, ease: 'power3.out' }, '<');
  draw('.swoosh path', { duration: 0.6 }, '-=0.15');
  tl.from(['.contact-rest > *', '.foot'], { y: 40, opacity: 0, stagger: 0.08, duration: 0.45, ease: 'power2.out' }, '-=0.35')
    .addLabel('contact')
    .to({}, { duration: 0.05 });

  // Ambient orbs drift across the whole journey
  const total = tl.duration();
  tl.to(
    '.orb-a',
    { keyframes: [{ x: '10vw', y: '20vh' }, { x: '70vw', y: '10vh' }, { x: '30vw', y: '60vh' }, { x: '80vw', y: '70vh' }, { x: '20vw', y: '40vh' }], duration: total },
    0,
  )
    .to(
      '.orb-b',
      { keyframes: [{ x: '40vw', y: '50vh' }, { x: '10vw', y: '70vh' }, { x: '60vw', y: '20vh' }, { x: '50vw', y: '60vh' }, { x: '70vw', y: '30vh' }], duration: total },
      0,
    )
    .to('.orb-c', { keyframes: [{ x: '-30vw', y: '-20vh' }, { x: '-60vw', y: '-50vh' }, { x: '-20vw', y: '-60vh' }, { x: '-50vw', y: '-10vh' }], duration: total }, 0);

  /* ── Scroll space + trigger ── */
  const space = $('.scroll-space');
  const unit = () => Math.max(vh() * 0.62, 420);
  const spokeEls = $$<SVGLineElement>('.spokes .spoke');
  const pulseEls = $$<SVGLineElement>('.spokes .pulse-line');
  const layoutSpokes = () => {
    const wrap = $('.orbit-wrap');
    const w = wrap.offsetWidth;
    const c = w / 2;
    const core = $('.orbit-core').offsetWidth / 2;
    $('.spokes').setAttribute('viewBox', `0 0 ${w} ${w}`);
    let R = 0;
    items.forEach((it, i) => {
      const dx = it.offsetLeft - c;
      const dy = it.offsetTop - c;
      const r = Math.hypot(dx, dy);
      if (r < 1) return; // not laid out yet
      R = r;
      const ux = dx / R;
      const uy = dy / R;
      const from = core + 10;
      const to = R - Math.min(46, R * 0.25);
      for (const el of [spokeEls[i], pulseEls[i]]) {
        el.setAttribute('x1', String(c + ux * from));
        el.setAttribute('y1', String(c + uy * from));
        el.setAttribute('x2', String(c + ux * to));
        el.setAttribute('y2', String(c + uy * to));
      }
    });
    const ring = $('.spokes .track');
    ring.setAttribute('cx', String(c));
    ring.setAttribute('cy', String(c));
    ring.setAttribute('r', String(R));
  };
  const layout = () => {
    space.style.height = `${tl.duration() * unit() + vh()}px`;
    const v = $('.hero-visual').getBoundingClientRect();
    const cx = v.left + v.width / 2;
    const cy = v.top + v.height / 2;
    const d = 2 * Math.hypot(Math.max(cx, vw() - cx), Math.max(cy, vh() - cy)) + 40;
    gsap.set('.wipe', { left: cx, top: cy, width: d, height: d });
    layoutSpokes();
    };
  ScrollTrigger.addEventListener('refreshInit', layout);
  layout();

  const st = ScrollTrigger.create({
    trigger: space,
    start: 'top top',
    end: 'bottom bottom',
    animation: tl,
    scrub: 0.5,
    invalidateOnRefresh: true,
  });

  /* ── Nav state, dots, HUD, progress ── */
  const order = ['home', 'about', 'stack', 'apps', 'code', 'contact'];
  const names = ['Home', 'About', 'Stack', 'Apps', 'Code', 'Contact'];
  const dots = $('.dots');
  dots.innerHTML = order.map((id) => `<li><button aria-label="${id}" data-dot="${id}"></button></li>`).join('');
  $('.hud-total').textContent = `/ ${String(order.length).padStart(2, '0')}`;
  const navTitle = $('.nav-title .nt');
  const hudIdx = $('.hud-idx');
  const hudName = $('.hud-name');
  const progress = gsap.quickSetter('.progress i', 'scaleX');
  const roll = (el: HTMLElement, apply: () => void) =>
    gsap
      .timeline()
      .to(el, { yPercent: -110, duration: 0.25, ease: 'power2.in', onComplete: apply })
      .fromTo(el, { yPercent: 110 }, { yPercent: 0, duration: 0.4, ease: 'power3.out' });
  let active = '';
  const setActive = (id: string) => {
    if (id === active) return;
    const first = !active;
    active = id;
    const n = order.indexOf(id);
    $$('.nav-links a').forEach((a) => a.classList.toggle('active', a.dataset.goto === id));
    $$('.dots button').forEach((b) => b.classList.toggle('active', b.dataset.dot === id));
    const [pre, title] = ($(`#${id}`).dataset.title ?? '|').split('|');
    const swapTitle = () => {
      $('.nt-prefix', navTitle).textContent = pre;
      $('.nt-title', navTitle).textContent = title;
    };
    const swapHud = () => {
      hudIdx.textContent = String(n + 1).padStart(2, '0');
      hudName.textContent = names[n];
    };
    if (first) return swapTitle(), swapHud();
    roll(navTitle, swapTitle);
    roll(hudIdx, swapHud);
    roll(hudName, () => {});
    gsap.fromTo('.hud-line', { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: 'power3.out' });
  };
  const spokesSvg = $('.spokes');
  tl.eventCallback('onUpdate', () => {
    const time = tl.time();
    progress(tl.progress());
    let cur = 'home';
    for (const id of order) if (time >= sceneStart[id] - 0.001) cur = id;
    setActive(cur);
    root.classList.toggle('lines-live', introDone && time < heroOut + 0.1);
    spokesSvg.classList.toggle('live', time > spokesLive[0] && time < spokesLive[1]);
  });
  setActive('home');

  /* ── Snap: every gesture lands on the next "screen" ── */
  const labelY = () =>
    Object.keys(tl.labels)
      .map((l) => st.labelToScroll(l))
      .sort((a, b) => a - b);
  let snapping = false;
  let snapTimer = 0;
  let restY = 0;
  const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
  let snapTarget = 0;
  const goTo = (y: number, long = false) => {
    snapping = true;
    snapTarget = y;
    const dist = Math.abs(y - lenis.scroll) / unit();
    lenis.scrollTo(y, {
      duration: Math.min(long ? 2.2 : 1.4, Math.max(0.7, dist * 0.7)),
      easing: ease,
      force: true,
      onComplete: () => {
        snapping = false;
        restY = y;
      },
    });
  };
  /* ── Long jumps: cut behind a veil instead of fast-forwarding every scene ── */
  const veil = document.createElement('div');
  veil.className = 'veil';
  veil.setAttribute('aria-hidden', 'true');
  veil.innerHTML = '<div class="veil-label"><span class="veil-idx"></span><span class="veil-name"></span></div>';
  const edge = document.createElement('i');
  edge.className = 'veil-edge';
  document.body.append(veil, edge);
  let jumping = false;
  const jumpTo = (id: string) => {
    if (jumping) return;
    jumping = true;
    snapping = true;
    clearTimeout(snapTimer);
    const y = st.labelToScroll(id);
    const n = order.indexOf(id);
    const [pre, title] = ($(`#${id}`).dataset.title ?? '|').split('|');
    $('.veil-idx', veil).textContent = String(n + 1).padStart(2, '0');
    $('.veil-name', veil).innerHTML = `${esc(pre)} <em>${esc(title)}</em>`;
    gsap
      .timeline({
        defaults: { ease: 'power3.inOut' },
        onComplete: () => {
          jumping = false;
          snapping = false;
        },
      })
      .set(veil, { display: 'grid' })
      .fromTo(veil, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.55 })
      .fromTo(edge, { y: () => innerHeight, opacity: 1 }, { y: 0, duration: 0.55 }, '<')
      .set(edge, { opacity: 0 })
      .fromTo('.veil-label > *', { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.06, duration: 0.45, ease: 'power3.out' }, '-=0.2')
      .add(() => {
        // jump instantly while covered, and settle the scrubbed timeline at once
        lenis.scrollTo(y, { immediate: true, force: true });
        ScrollTrigger.update();
        st.getTween()?.progress(1);
        restY = snapTarget = y;
      })
      .to({}, { duration: 0.2 })
      .to('.veil-label > *', { yPercent: -100, opacity: 0, stagger: 0.04, duration: 0.35, ease: 'power2.in' })
      .to(veil, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.6 }, '-=0.1')
      .fromTo(edge, { y: () => innerHeight, opacity: 1 }, { y: 0, duration: 0.6 }, '<')
      .set(veil, { display: 'none' })
      .set(edge, { opacity: 0 });
  };
  if (import.meta.env.DEV) Object.assign(window, { __dbg: { lenis, tl, st, labelY } });
  const goToLabel = (name: string) => {
    if (!introDone || jumping || tl.labels[name] === undefined) return;
    const from = order.indexOf(active);
    const to = order.indexOf(name);
    // neighbours keep the scroll-scrubbed transition; anything further is a clean cut
    if (Math.abs(to - from) <= 1) goTo(st.labelToScroll(name), true);
    else jumpTo(name);
  };

  const snap = () => {
    if (snapping) return;
    const y = lenis.scroll;
    const pos = labelY();
    if (pos.some((p) => Math.abs(p - y) < 3)) return void (restY = y);
    // tiny nudges spring back to where you were
    if (Math.abs(y - restY) < 40) return goTo(restY);
    const target =
      lenis.direction >= 0 ? pos.find((p) => p > y) : [...pos].reverse().find((p) => p < y);
    if (target !== undefined) goTo(target);
  };
  lenis.on('scroll', () => {
    if (snapping || jumping) return;
    clearTimeout(snapTimer);
    snapTimer = window.setTimeout(snap, 150);
  });
  lenis.on('virtual-scroll', () => {
    // user input cancels an in-flight snap
    if (snapping) snapping = false;
  });

  addEventListener('keydown', (e) => {
    if (!introDone || jumping || (e.target as Element).closest('input, textarea')) return;
    const keysNext = ['ArrowDown', 'PageDown', ' ', 'ArrowRight'];
    const keysPrev = ['ArrowUp', 'PageUp', 'ArrowLeft'];
    if (![...keysNext, ...keysPrev, 'Home', 'End'].includes(e.key)) return;
    e.preventDefault();
    const pos = labelY();
    const y = snapping ? snapTarget : lenis.scroll;
    if (e.key === 'Home') return goToLabel('home');
    if (e.key === 'End') return goToLabel('contact');
    const next = keysNext.includes(e.key)
      ? pos.find((p) => p > y + 2)
      : [...pos].reverse().find((p) => p < y - 2);
    if (next !== undefined) goTo(next);
  });

  dots.addEventListener('click', (e) => {
    const b = (e.target as HTMLElement).closest<HTMLElement>('[data-dot]');
    if (b) goToLabel(b.dataset.dot!);
  });
  menu(goToLabel);
  addEventListener('resize', () => ScrollTrigger.refresh());

  /* ── Intro ── */
  return () => {
    const unlock = () => {
      introDone = true;
      root.classList.add('lines-live');
      lenis.start();
      const hash = location.hash.slice(1);
      if (hash && hash !== 'home' && tl.labels[hash] !== undefined) goToLabel(hash);
    };
    const intro = gsap.timeline();
    intro.call(unlock, [], 1.6);
    intro
      .from('.hero-name .char', { yPercent: 115, rotate: 8, stagger: 0.03, duration: 1.1, ease: 'expo.out' })
      .from(
        ['.hero .eyebrow', '.hero-role', '.hero-sub', '.hero-cta'],
        { y: 30, opacity: 0, stagger: 0.08, duration: 1, ease: 'expo.out' },
        0.35,
      )
      .from('.hero-visual', { scale: 0.5, rotate: -25, opacity: 0, duration: 1.4, ease: 'expo.out' }, 0.05)
      .from('.nav > *', { y: -24, opacity: 0, stagger: 0.06, duration: 0.8, ease: 'expo.out' }, 0.2)
      .from('.scroll-hint', { opacity: 0, duration: 0.6 }, 0.9)
      .to('.hl-base path', { strokeDashoffset: 0, stagger: 0.25, duration: 2.4, ease: 'power2.inOut' }, 0.1)
      .to('.halo-track', { strokeDashoffset: 0, duration: 1.8, ease: 'power2.inOut' }, 0.3)
      .from('.arc', { opacity: 0, duration: 1 }, 0.8);
    return intro;
  };
}

/* ───────────────────────── Preloader + boot ───────────────────────── */
async function boot() {
  render();
  interactions();
  if (reduceMotion) return initStatic();

  const playIntro = initMotion();
  const counter = $('.pl-count span');
  const bar = $('.pl-bar i');
  const state = { v: 0 };
  const img = $<HTMLImageElement>('.avatar img');
  const ready = Promise.all([
    document.fonts.ready,
    img.decode().catch(() => {}),
    new Promise((r) => setTimeout(r, 900)),
  ]);
  const count = gsap.to(state, {
    v: 92,
    duration: 1.2,
    ease: 'power2.out',
    onUpdate: () => {
      counter.textContent = String(Math.round(state.v));
      bar.style.transform = `scaleX(${state.v / 100})`;
    },
  });
  await ready;
  await count;
  await gsap.to(state, {
    v: 100,
    duration: 0.25,
    onUpdate: () => {
      counter.textContent = String(Math.round(state.v));
      bar.style.transform = `scaleX(${state.v / 100})`;
    },
  });
  ScrollTrigger.refresh();
  gsap
    .timeline()
    .to('.pl-inner', { yPercent: -40, opacity: 0, duration: 0.6, ease: 'power3.in' })
    .to('.preloader', { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.9, ease: 'expo.inOut' }, '-=0.25')
    .add(playIntro(), '-=0.45')
    .add(() => $('.preloader').remove());
}

boot();
