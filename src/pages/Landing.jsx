import { useEffect, useRef, useState } from 'react';
import stylesCss from './Landing.styles.css?raw';

const FAQS = [
  {
    q: 'How is this different from hiring an agency?',
    a: "Agencies charge monthly fees and put junior people on your project. We build one thing, fix the price up front, and the same senior engineer runs the whole project. You pick what happens after launch: take the keys and run it yourself, or keep us on to run it for you. No contracts either way.",
  },
  {
    q: 'Do I need a tech person on my team?',
    a: "Nope. Most of our clients don't have one. If you want to run the software yourself, we'll build it so you can, with plain-English guides and live training. If you'd rather not deal with it, we'll keep it running for you.",
  },
  {
    q: 'What does it cost?',
    a: "Most projects land between $25k and $90k, depending on what we build. You see the exact price before you say yes \u2014 no hourly bills, no surprise add-ons. If you choose the monthly option after launch, that's a separate flat fee, cancel anytime.",
  },
  {
    q: 'How long does it take?',
    a: "Mapping and planning: about three weeks. Building: six to twelve weeks, depending on what we're building. Launch: two weeks. Most clients are up and running in under three months.",
  },
  {
    q: 'Why do I have to apply?',
    a: "We only take three clients a quarter, so we want to make sure we can actually help before either of us invests time. The application takes about 10 minutes and lets us give you a real answer fast \u2014 no sales call to sit through.",
  },
  {
    q: 'What happens after I send the form?',
    a: "A real person (not a bot) reads it and replies within 48 hours. If we're a fit, we'll set up a 45-minute first call \u2014 just to talk about your business. If we're not the right fit, we'll say so and usually point you to someone who is.",
  },
];

const FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap';

const GSAP_SRC = 'https://unpkg.com/gsap@3.12.5/dist/gsap.min.js';
const ST_SRC = 'https://unpkg.com/gsap@3.12.5/dist/ScrollTrigger.min.js';

// Load a script once; resolve when already loaded or after load event fires.
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      if (existing.dataset.loaded === '1') return resolve();
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', reject, { once: true });
      return;
    }
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.onload = () => {
      s.dataset.loaded = '1';
      resolve();
    };
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

const Landing = () => {
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [magnetSubmitted, setMagnetSubmitted] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const heroInnerRef = useRef(null);

  // Nav scroll state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Inject Google Fonts (scoped to this page's lifetime)
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = FONTS_HREF;
    document.head.appendChild(link);
    return () => {
      link.parentNode && link.parentNode.removeChild(link);
    };
  }, []);

  // Set document title for landing page
  useEffect(() => {
    const prev = document.title;
    document.title = 'Jomendez Inc \u2014 AI software for small business';
    return () => {
      document.title = prev;
    };
  }, []);

  // Load GSAP + ScrollTrigger from CDN, then run entrance + scroll reveals.
  useEffect(() => {
    let cancelled = false;

    Promise.all([loadScript(GSAP_SRC), loadScript(ST_SRC)])
      .then(() => {
        if (cancelled) return;
        const { gsap, ScrollTrigger } = window;
        if (!gsap || !ScrollTrigger) return;
        gsap.registerPlugin(ScrollTrigger);

        // --- Hero entrance ---
        const heroInner = heroInnerRef.current;
        if (heroInner) {
          const portrait = heroInner.querySelector('.hero-portrait');
          const eyebrow = heroInner.querySelector('.hero-eyebrow');
          const headline = heroInner.querySelector('.hero-headline');
          const sub = heroInner.querySelector('.hero-sub');
          const ctas = heroInner.querySelector('.hero-ctas');
          const meta = heroInner.querySelector('.hero-meta');
          const content = heroInner.querySelector('.hero-content');
          const all = [portrait, content, eyebrow, headline, sub, ctas, meta].filter(Boolean);
          gsap.set(all, { clearProps: 'all' });
          const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.1 });
          if (portrait) tl.fromTo(portrait, { opacity: 0, xPercent: -40, rotateY: 8 }, { opacity: 1, xPercent: 0, rotateY: 0, duration: 1.1 }, 0);
          if (content) tl.fromTo(content, { opacity: 0, xPercent: 30 }, { opacity: 1, xPercent: 0, duration: 1.1 }, 0.05);
          if (eyebrow) tl.fromTo(eyebrow, { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.7 }, 0.35);
          if (headline) tl.fromTo(headline, { opacity: 0, x: 80 }, { opacity: 1, x: 0, duration: 0.9 }, 0.4);
          if (sub) tl.fromTo(sub, { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.7 }, 0.55);
          if (ctas) tl.fromTo(ctas, { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.7 }, 0.65);
          if (meta) tl.fromTo(meta, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 }, 0.75);
        }

        // --- Scroll reveals ---
        // LOGOBAR stagger
        gsap.from('.logobar-logos .logo', {
          opacity: 0, y: 40, duration: 0.7, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: '.logobar', start: 'top 85%', toggleActions: 'play none none reverse' },
        });

        // PROBLEM
        const problemH = document.querySelector('.problem-head h2');
        if (problemH) {
          gsap.from(problemH, {
            opacity: 0, xPercent: -30, duration: 1.1, ease: 'power3.out',
            scrollTrigger: { trigger: '.problem', start: 'top 75%', toggleActions: 'play none none reverse' },
          });
        }
        gsap.from('.problem-head p', {
          opacity: 0, xPercent: 20, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.problem', start: 'top 75%', toggleActions: 'play none none reverse' },
        });
        gsap.utils.toArray('.problem-item').forEach((item, i) => {
          gsap.from(item, {
            opacity: 0, y: 140, duration: 1, ease: 'power3.out', delay: i * 0.12,
            scrollTrigger: { trigger: '.problem-list', start: 'top 82%', toggleActions: 'play none none reverse' },
          });
        });

        // SERVICES
        gsap.from('.services-head > div', {
          opacity: 0, xPercent: -25, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.services', start: 'top 75%', toggleActions: 'play none none reverse' },
        });
        gsap.from('.services-head p', {
          opacity: 0, xPercent: 20, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.services', start: 'top 75%', toggleActions: 'play none none reverse' },
        });
        gsap.utils.toArray('.services-grid .service').forEach((card, i) => {
          gsap.from(card, {
            opacity: 0, y: 220, rotateX: 10, duration: 1, ease: 'power3.out', delay: i * 0.1,
            scrollTrigger: { trigger: '.services-grid', start: 'top 80%', toggleActions: 'play none none reverse' },
          });
        });

        // PROCESS
        gsap.from('.process-head', {
          opacity: 0, y: 60, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.process', start: 'top 78%', toggleActions: 'play none none reverse' },
        });
        gsap.utils.toArray('.step').forEach((step, i) => {
          gsap.from(step, {
            opacity: 0, xPercent: i % 2 === 0 ? -40 : 40, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: step, start: 'top 88%', toggleActions: 'play none none reverse' },
          });
        });

        const forkEl = document.querySelector('.process-fork');
        if (forkEl) {
          gsap.from('.process-fork-head', {
            opacity: 0, y: 50, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: forkEl, start: 'top 82%', toggleActions: 'play none none reverse' },
          });
          gsap.from('.fork-path', {
            opacity: 0, y: 40, duration: 0.9, stagger: 0.18, ease: 'power3.out',
            scrollTrigger: { trigger: forkEl, start: 'top 78%', toggleActions: 'play none none reverse' },
          });
          gsap.from('.fork-divider', {
            opacity: 0, scaleY: 0, transformOrigin: 'top', duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: forkEl, start: 'top 78%', toggleActions: 'play none none reverse' },
          });
          gsap.from('.fork-foot', {
            opacity: 0, y: 20, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: '.fork-foot', start: 'top 92%', toggleActions: 'play none none reverse' },
          });
        }

        // CASES
        gsap.from('.cases-head h2', {
          opacity: 0, y: 80, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.cases', start: 'top 75%', toggleActions: 'play none none reverse' },
        });
        gsap.from('.cases-head a.btn', {
          opacity: 0, xPercent: 30, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.cases', start: 'top 75%', toggleActions: 'play none none reverse' },
        });
        gsap.utils.toArray('.case').forEach((card, i) => {
          const rot = i === 0 ? -3 : i === 2 ? 3 : 0;
          gsap.from(card, {
            opacity: 0, y: 260, rotateZ: rot, duration: 1.1, ease: 'power3.out', delay: i * 0.15,
            scrollTrigger: { trigger: '.cases-grid', start: 'top 82%', toggleActions: 'play none none reverse' },
          });
        });
        gsap.utils.toArray('.case-img img').forEach((img) => {
          gsap.fromTo(img, { yPercent: -8 }, {
            yPercent: 10, ease: 'none',
            scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
          });
        });

        // ABOUT
        gsap.from('.about-img', {
          opacity: 0, xPercent: -50, rotateY: 10, duration: 1.3, ease: 'power3.out',
          scrollTrigger: { trigger: '.about', start: 'top 72%', toggleActions: 'play none none reverse' },
        });
        gsap.from('.about-content', {
          opacity: 0, xPercent: 35, duration: 1.3, ease: 'power3.out',
          scrollTrigger: { trigger: '.about', start: 'top 72%', toggleActions: 'play none none reverse' },
        });
        gsap.from('.about-content > *', {
          opacity: 0, y: 30, duration: 0.7, stagger: 0.1, ease: 'power3.out', delay: 0.4,
          scrollTrigger: { trigger: '.about', start: 'top 72%', toggleActions: 'play none none reverse' },
        });
        const aboutImg = document.querySelector('.about-img img');
        if (aboutImg) {
          gsap.fromTo(aboutImg, { yPercent: -6 }, {
            yPercent: 8, ease: 'none',
            scrollTrigger: { trigger: '.about-img', start: 'top bottom', end: 'bottom top', scrub: 0.6 },
          });
        }

        // TESTIMONIALS
        gsap.from('.testimonials-head h2', {
          opacity: 0, y: 60, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.testimonials', start: 'top 75%', toggleActions: 'play none none reverse' },
        });
        gsap.utils.toArray('.quote').forEach((q, i) => {
          const rot = i === 0 ? -2 : i === 2 ? 2 : 0;
          gsap.from(q, {
            opacity: 0, y: 220, rotateZ: rot, duration: 1.1, ease: 'power3.out', delay: i * 0.15,
            scrollTrigger: { trigger: '.testimonials-grid', start: 'top 82%', toggleActions: 'play none none reverse' },
          });
        });

        // LEAD MAGNET
        gsap.from('.magnet-card > div:first-child > *', {
          opacity: 0, xPercent: -30, duration: 0.9, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.magnet-card', start: 'top 78%', toggleActions: 'play none none reverse' },
        });
        gsap.from('.magnet-mock', {
          opacity: 0, y: 160, rotate: 12, duration: 1.3, ease: 'power3.out',
          scrollTrigger: { trigger: '.magnet-card', start: 'top 78%', toggleActions: 'play none none reverse' },
        });

        // FAQ
        gsap.from('.faq-head', {
          opacity: 0, xPercent: -25, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.faq', start: 'top 78%', toggleActions: 'play none none reverse' },
        });
        gsap.utils.toArray('.faq-item').forEach((it, i) => {
          gsap.from(it, {
            opacity: 0, xPercent: 20, duration: 0.7, ease: 'power3.out', delay: i * 0.08,
            scrollTrigger: { trigger: '.faq-list', start: 'top 85%', toggleActions: 'play none none reverse' },
          });
        });

        // CTA
        gsap.from('.cta-left', {
          opacity: 0, xPercent: -40, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: '.cta-final', start: 'top 75%', toggleActions: 'play none none reverse' },
        });
        gsap.from('.cta-left > *', {
          opacity: 0, y: 40, duration: 0.7, stagger: 0.1, ease: 'power3.out', delay: 0.3,
          scrollTrigger: { trigger: '.cta-final', start: 'top 75%', toggleActions: 'play none none reverse' },
        });
        gsap.from('.cta-form', {
          opacity: 0, xPercent: 40, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: '.cta-final', start: 'top 75%', toggleActions: 'play none none reverse' },
        });

        ScrollTrigger.refresh();

        // If re-mounted while already scrolled, complete any triggers above current scroll.
        const curScroll = window.scrollY || document.documentElement.scrollTop;
        ScrollTrigger.getAll().forEach((t) => {
          if (t.start < curScroll && t.animation) t.animation.progress(1).kill();
        });
      })
      .catch(() => {
        // If GSAP fails to load, the page still renders — animations just won't play.
      });

    return () => {
      cancelled = true;
      // Kill any ScrollTriggers we created so they don't leak across routes.
      if (window.ScrollTrigger) {
        try {
          window.ScrollTrigger.getAll().forEach((t) => t.kill());
        } catch {
          /* noop */
        }
      }
    };
  }, []);

  const toggleFaq = (i) => setOpenFaq((prev) => (prev === i ? null : i));

  const handleMagnetSubmit = (e) => {
    e.preventDefault();
    setMagnetSubmitted(true);
  };
  const handleApplicationSubmit = (e) => {
    e.preventDefault();
    setApplicationSubmitted(true);
  };

  return (
    <>
      {/* CSS is scoped to this component's lifetime: on unmount, the style tag goes with it. */}
      <style>{stylesCss}</style>

      {/* NAV */}
      <nav className={`nav${scrolled ? ' scrolled' : ''}`} id="nav">
        <div className="nav-inner">
          <a href="#" className="nav-logo">
            <span className="dot"></span>
            <span className="mono micro">JOMENDEZ / INC</span>
          </a>
          <div className="nav-links">
            <a href="#services">Services</a>
            <a href="#process">Process</a>
            <a href="#work">Work</a>
            <a href="#about">About</a>
            <a href="#faq">FAQ</a>
            <a href="#apply" className="nav-cta" style={{ color: 'rgb(255, 255, 255)' }}>
              <span className="pill"></span>
              <span className="nav-cta-label nav-cta-label--full">Apply to Work With Us</span>
              <span className="nav-cta-label nav-cta-label--short">Apply</span>
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero blueprint grain" id="hero">
        <div className="wrap" id="hero-inner" ref={heroInnerRef}>
          <div className="hero-grid">
            <div className="hero-portrait">
              <img src="/landing/images/hero_portrait.png" alt="Founder portrait" />
              <div className="hero-portrait-meta">
                <span className="mono micro">JOMENDEZ / INC</span>
                <h3>Software that runs<br />your business.</h3>
              </div>
            </div>
            <div className="hero-content">
              <div className="hero-eyebrow mono micro" style={{ color: 'var(--accent)' }}>
                &mdash; CUSTOM AI SOFTWARE / BY APPLICATION
              </div>
              <h1 className="hero-headline">
                Custom <em>AI software</em> for small businesses &mdash; built for you, priced up front.
              </h1>
              <p className="hero-sub">
                We build the software that runs your business &mdash; booking, follow-ups, reporting, AI helpers &mdash; so you stop juggling ten apps and paying for headcount you shouldn't need. We take on three clients a quarter. Application only.
              </p>
              <div className="hero-ctas">
                <a href="#apply" className="btn btn-primary">
                  Apply to Work With Us
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
                <a href="#work" className="btn btn-ghost">View Our Work &rarr;</a>
              </div>
              <div className="hero-meta">
                <div className="hero-meta-item"><span className="mono micro label">ENGAGEMENT</span><span className="value">Clear price, no surprises</span></div>
                <div className="hero-meta-item"><span className="mono micro label">TIMELINE</span><span className="value">8&ndash;14 weeks to launch</span></div>
                <div className="hero-meta-item"><span className="mono micro label">Q2 2026</span><span className="value">2 of 3 spots open</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOGOBAR */}
      <section className="logobar">
        <div className="wrap-wide logobar-inner">
          <p className="mono micro logobar-label">Trusted by owners<br />building the next thing</p>
          <div className="logobar-logos">
            <span className="logo serif" style={{ fontSize: '22px' }}>Northwind Clinic</span>
            <span className="logo">&#10697; Halcyon</span>
            <span className="logo">&#9670; Foundry Labs</span>
            <span className="logo serif" style={{ fontSize: '22px' }}>Meridian &amp; Co.</span>
            <span className="logo">&#9650; Cobalt</span>
            <span className="logo mono" style={{ fontSize: '13px' }}>OPERATOR/COLLECTIVE</span>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="problem">
        <div className="wrap">
          <div className="problem-head">
            <h2>You don't need more <em>people</em>.<br />You need better <em>systems</em>.</h2>
            <p>
              Most small businesses grow by hiring more people to plug the cracks. Before long your week is spreadsheets, sticky notes, and ten browser tabs &mdash; and every new hire just adds to the chaos. We build simple software that does the boring work, so you and your team can focus on real work.
            </p>
          </div>
          <div className="problem-list">
            <div className="problem-item">
              <span className="micro n">01 / Busywork</span>
              <h3>You're doing work a computer should do.</h3>
              <p>Copying info between apps, sending the same emails, chasing no-shows. Every hour on admin is an hour not with clients.</p>
            </div>
            <div className="problem-item">
              <span className="micro n">02 / Blind Spots</span>
              <h3>You're deciding with last month's info.</h3>
              <p>Your numbers live in your booking tool, your bank account, a spreadsheet, and your head &mdash; and none of them agree. You can't run a business on guesses.</p>
            </div>
            <div className="problem-item">
              <span className="micro n">03 / Stuck in Place</span>
              <h3>The tools that got you here can't get you further.</h3>
              <p>Another app subscription or another part-time assistant won't get you past your next ceiling. You need software actually built for your business &mdash; not another workaround.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services blueprint" id="services">
        <div className="wrap-wide">
          <div className="services-head">
            <div>
              <span className="micro" style={{ color: '#6D84FF' }}>&mdash; WHAT WE BUILD</span>
              <h2 style={{ marginTop: '16px' }}>Custom software, built for your business &mdash; yours to keep or let us run.</h2>
            </div>
            <p>Four areas of work, shaped around your business. You pick how we work together: we build it and hand you the keys, or we build it and keep it running for you. Same quality either way &mdash; the only difference is what happens after launch.</p>
          </div>

          <div className="engagement-models">
            <div className="engage-card">
              <div className="engage-head">
                <span className="micro" style={{ color: '#6D84FF' }}>OPTION A</span>
                <h3>Build &amp; Handoff</h3>
              </div>
              <p>We build it, write simple instructions, and hand you the keys. From day one, everything belongs to you &mdash; the software, the logins, the step-by-step guides. We stay available for 60 days, then step back.</p>
              <ul className="engage-list">
                <li>You own everything &mdash; code, logins, accounts</li>
                <li>Plain-English guides for you and your team</li>
                <li>Live training sessions with whoever will use it</li>
                <li>60 days of free fixes after launch</li>
              </ul>
              <span className="micro meta engage-fit">Best for: businesses with a tech person in-house</span>
            </div>
            <div className="engage-card engage-card--alt">
              <div className="engage-head">
                <span className="micro" style={{ color: '#6D84FF' }}>OPTION B</span>
                <h3>Build &amp; Accompany</h3>
              </div>
              <p>We build your system and stay on as your long-term tech partner &mdash; keeping it running, improving it, and adding new things as your business changes. You get a small team on call without hiring one.</p>
              <ul className="engage-list">
                <li>New features and improvements every month</li>
                <li>Daily monitoring; we fix things before you notice</li>
                <li>Quarterly check-ins to plan what's next</li>
                <li>Switch to handoff any time &mdash; no lock-in</li>
              </ul>
              <span className="micro meta engage-fit">Best for: owners who'd rather run their business than their software</span>
            </div>
          </div>

          <div className="services-grid">
            <div className="service">
              <div>
                <div className="icon-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <span className="micro meta">LAYER 01</span>
                <h3>Smart Automation</h3>
                <p>Quiet AI helpers that send emails, follow up with leads, sort incoming requests, and handle the repetitive tasks that eat your calendar.</p>
              </div>
              <ul>
                <li>AI assistants &amp; chatbots</li>
                <li>Auto-replies and follow-ups</li>
                <li>Sorting and routing messages</li>
              </ul>
            </div>
            <div className="service">
              <div>
                <div className="icon-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="7" height="9" />
                    <rect x="14" y="3" width="7" height="5" />
                    <rect x="14" y="12" width="7" height="9" />
                    <rect x="3" y="16" width="7" height="5" />
                  </svg>
                </div>
                <span className="micro meta">LAYER 02</span>
                <h3>Your Control Panel</h3>
                <p>One simple screen where you (or your team) see everything that matters &mdash; bookings, clients, money in, what needs attention &mdash; without jumping between ten apps.</p>
              </div>
              <ul>
                <li>Daily dashboards</li>
                <li>Client portals</li>
                <li>Custom reports</li>
              </ul>
            </div>
            <div className="service">
              <div>
                <div className="icon-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20" />
                  </svg>
                </div>
                <span className="micro meta">LAYER 03</span>
                <h3>Website &amp; Bookings</h3>
                <p>The front end of your business: a website that books clients, takes payments, and keeps your records up to date &mdash; all connected so nothing slips through the cracks.</p>
              </div>
              <ul>
                <li>Booking &amp; checkout</li>
                <li>Client records &amp; follow-ups</li>
                <li>Connecting the apps you use</li>
              </ul>
            </div>
            <div className="service">
              <div>
                <div className="icon-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="4" y="4" width="16" height="16" rx="2" />
                    <path d="M9 9h6v6H9zM9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" />
                  </svg>
                </div>
                <span className="micro meta">LAYER 04</span>
                <h3>Growth Plan</h3>
                <p>A clear picture of where your business is, where it's going, and what tech will get you there. We map your whole business before we build anything.</p>
              </div>
              <ul>
                <li>Business mapping</li>
                <li>Build-or-buy advice</li>
                <li>12-month plan</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="process" id="process">
        <div className="wrap">
          <div className="process-head">
            <span className="micro eyebrow">&mdash; HOW WE WORK</span>
            <h2>Three shared steps.<br />Then <em>your choice</em> of ending.</h2>
            <p className="process-intro">Every project starts the same way: Map it, Prioritize, Build. What happens at step four depends on whether you have a tech person in-house &mdash; or want us to be that person.</p>
          </div>
          <div className="process-steps">
            <div className="step">
              <div className="n serif">01</div>
              <h3>Map it out</h3>
              <p>We sit with you and map how your business actually runs &mdash; the good, the messy, and the workarounds. You walk away with a clear picture of your business, yours to keep whether we build or not.</p>
              <div className="duration mono micro">2 WEEKS</div>
            </div>
            <div className="step">
              <div className="n serif">02</div>
              <h3>Prioritize</h3>
              <p>We rank every idea by what it'll save you, what it'll cost, and how long it'll take. You get a clear plan &mdash; not a wishlist &mdash; with real numbers attached.</p>
              <div className="duration mono micro">1 WEEK</div>
            </div>
            <div className="step">
              <div className="n serif">03</div>
              <h3>Build</h3>
              <p>We ship something new every two weeks so you can see it working. Everything we build belongs to you. No lock-in, no mystery, no junior team working in the background.</p>
              <div className="duration mono micro">6&ndash;12 WEEKS</div>
            </div>
          </div>

          <div className="process-fork">
            <div className="process-fork-head">
              <span className="micro" style={{ color: '#6D84FF' }}>&mdash; STEP 04 / PICK YOUR ENDING</span>
              <h3 className="serif">Take the keys, or let us drive.</h3>
            </div>
            <div className="fork-paths">
              <div className="fork-path">
                <div className="fork-path-head">
                  <span className="micro meta">PATH A</span>
                  <h4>Take the keys</h4>
                </div>
                <p className="fork-who">If you have a tech person in-house.</p>
                <ul className="fork-list">
                  <li>Everything transfers to you &mdash; code, logins, accounts</li>
                  <li>Plain-English guides for running it day-to-day</li>
                  <li>Two training sessions with your tech person</li>
                  <li>60 days of free fixes after launch</li>
                </ul>
                <div className="duration mono micro">2 WEEKS &middot; FIXED FEE</div>
              </div>
              <div className="fork-divider" aria-hidden="true">
                <span className="mono micro">OR</span>
              </div>
              <div className="fork-path fork-path--alt">
                <div className="fork-path-head">
                  <span className="micro meta">PATH B</span>
                  <h4>Let us drive</h4>
                </div>
                <p className="fork-who">If you don't &mdash; and shouldn't have to hire one just to find out.</p>
                <ul className="fork-list">
                  <li>We watch it, fix it, and keep it running &mdash; you don't lift a finger</li>
                  <li>New improvements and features every month</li>
                  <li>Quarterly check-in to plan what's next</li>
                  <li>Switch to &ldquo;take the keys&rdquo; any time &mdash; no penalty</li>
                </ul>
                <div className="duration mono micro">ONGOING &middot; FIXED MONTHLY</div>
              </div>
            </div>
            <p className="fork-foot mono micro">Most owners start with &ldquo;let us drive&rdquo; and switch to &ldquo;take the keys&rdquo; when their team is ready. Some never do &mdash; and that's fine too.</p>
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="cases" id="work">
        <div className="wrap">
          <div className="cases-head">
            <h2>Work that saved owners <em>hours a week</em> and hires they didn't have to make.</h2>
            <a href="#apply" className="btn btn-outline">
              See More Work
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H8M17 7v9" />
              </svg>
            </a>
          </div>
          <div className="cases-grid">
            <article className="case">
              <div className="case-img">
                <span className="case-tag">Healthcare</span>
                <img src="/landing/images/case_clinic.jpg" alt="Clinic operations system" />
              </div>
              <div className="case-body">
                <h3>Clinic Booking System</h3>
                <p>Replaced three paid apps and a full-time scheduler with one simple system that books, checks in, and bills patients automatically.</p>
                <div className="case-metrics">
                  <div className="metric"><div className="v">&minus;62%</div><div className="l mono">TIME ON ADMIN</div></div>
                  <div className="metric"><div className="v">3.2&times;</div><div className="l mono">REPEAT BOOKINGS</div></div>
                </div>
              </div>
            </article>
            <article className="case">
              <div className="case-img">
                <span className="case-tag">Coaching</span>
                <img src="/landing/images/case_trainer.jpg" alt="Trainer platform" />
              </div>
              <div className="case-body">
                <h3>Coaching Platform</h3>
                <p>A private client area that handles sign-ups, weekly programs, check-ins, and payments &mdash; without an assistant in the loop.</p>
                <div className="case-metrics">
                  <div className="metric"><div className="v">+180</div><div className="l mono">NEW CLIENTS / YR</div></div>
                  <div className="metric"><div className="v">&minus;80%</div><div className="l mono">SUPPORT EMAILS</div></div>
                </div>
              </div>
            </article>
            <article className="case">
              <div className="case-img">
                <span className="case-tag">Hospitality</span>
                <img src="/landing/images/case_airbnb.jpg" alt="Hospitality ai tools" />
              </div>
              <div className="case-body">
                <h3>Host Automation Kit</h3>
                <p>AI that talks to guests, schedules cleaners, and adjusts nightly prices &mdash; running a 40-property portfolio from one screen.</p>
                <div className="case-metrics">
                  <div className="metric"><div className="v">22hr</div><div className="l mono">SAVED / WEEK</div></div>
                  <div className="metric"><div className="v">+17%</div><div className="l mono">OCCUPANCY</div></div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ABOUT / FOUNDER */}
      <section className="about" id="about">
        <div className="wrap">
          <div className="about-grid">
            <div className="about-img">
              <div className="badge mono micro"><span className="pill"></span>Currently taking 2 clients</div>
              <img src="/landing/images/about_portrait.png" alt="Founder portrait" />
            </div>
            <div className="about-content">
              <span className="micro eyebrow">&mdash; WHO BUILDS IT</span>
              <h2>Built by one <em>senior engineer,</em> not a sales team.</h2>
              <p>
                I'm <strong>Jose Mendez</strong>, founder of Jomendez Inc. I spent ten years building software for big companies before I noticed the same thing over and over: small businesses were being sold app subscriptions when what they really needed was <strong>their own software</strong>, built for how they actually work.
              </p>
              <p>
                Jomendez Inc is small on purpose. Every project is led by me, with a small team of senior people &mdash; no juniors, no hand-offs to an account manager. We take on a handful of clients a quarter. That's it.
              </p>
              <div className="about-stats">
                <div><div className="v">10+</div><div className="l mono micro">YEARS BUILDING</div></div>
                <div><div className="v">40+</div><div className="l mono micro">SYSTEMS SHIPPED</div></div>
                <div><div className="v">3</div><div className="l mono micro">CLIENTS / QUARTER</div></div>
              </div>
              <div className="about-signature">
                <span className="sig">Jose Mendez</span>
                <span className="who mono micro">FOUNDER / JOMENDEZ INC</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials">
        <div className="wrap">
          <div className="testimonials-head">
            <h2>What owners say after launch.</h2>
            <span className="mono micro" style={{ color: 'rgba(255,255,255,.5)' }}>&mdash; FIELD NOTES</span>
          </div>
          <div className="testimonials-grid">
            <div className="quote">
              <div className="mark">&ldquo;</div>
              <blockquote>They came into a mess and left us with real software. Six months in, I'm not in spreadsheets at 10pm anymore, and my team actually trusts the numbers.</blockquote>
              <div className="quote-person">
                <img src="/landing/images/testimonial_a.jpg" alt="" />
                <div>
                  <div className="name">Eliza R.</div>
                  <div className="role mono">CEO, wellness clinic</div>
                </div>
              </div>
            </div>
            <div className="quote">
              <div className="mark">&ldquo;</div>
              <blockquote>I'd hired two agencies before Jomendez Inc. Both sold me fancy dashboards. Jose's team gave me my time back. That's the whole difference.</blockquote>
              <div className="quote-person">
                <img src="/landing/images/testimonial_b.jpg" alt="" />
                <div>
                  <div className="name">Marcus O.</div>
                  <div className="role mono">Owner, coaching studio</div>
                </div>
              </div>
            </div>
            <div className="quote">
              <div className="mark">&ldquo;</div>
              <blockquote>Senior people, fair price, and they actually explained things in a way I understood. I didn't know this kind of partner existed until I found them.</blockquote>
              <div className="quote-person">
                <img src="/landing/images/testimonial_c.jpg" alt="" />
                <div>
                  <div className="name">Priya N.</div>
                  <div className="role mono">Owner, short-term rental group</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEAD MAGNET */}
      <section className="magnet">
        <div className="wrap">
          <div className="magnet-card blueprint grain">
            <div>
              <span className="micro" style={{ color: '#6D84FF' }}>&mdash; FREE / NO SIGN-UP CALL</span>
              <h2>The 34-point <em>Business Check-up</em> we run on every new client.</h2>
              <p>Download the same checklist we use in the first week of every project. It shows you exactly where time and money are leaking in your business &mdash; whether you work with us or not.</p>
              <form className="magnet-form" onSubmit={handleMagnetSubmit}>
                <input type="email" placeholder="you@company.com" required />
                <button type="submit">{magnetSubmitted ? 'Sent \u2713' : 'Send me the checklist'}</button>
              </form>
              <p className="mono micro" style={{ marginTop: '20px', color: 'rgba(255,255,255,.35)' }}>PDF &middot; 14 PAGES &middot; NO SPAM, EVER</p>
            </div>
            <div className="magnet-mock">
              <div className="doc-head mono micro"><span>JOMENDEZ / AUDIT v2.4</span><span>PG 01</span></div>
              <div className="doc-title serif">The 34-point<br />Systems Audit.</div>
              <div className="doc-lines">
                <div></div><div></div><div></div><div></div>
                <div></div><div></div><div></div><div></div>
                <div></div><div></div><div></div><div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq" id="faq">
        <div className="wrap">
          <div className="faq-grid">
            <div className="faq-head">
              <span className="micro eyebrow">&mdash; COMMON QUESTIONS</span>
              <h2>Questions owners ask first.</h2>
              <p>The most common questions we get before the first call. If yours isn't here, there's space for it on the form below.</p>
            </div>
            <div className="faq-list" id="faq-list">
              {FAQS.map((f, i) => (
                <div key={i} className={`faq-item${openFaq === i ? ' open' : ''}`}>
                  <button className="faq-q" type="button" onClick={() => toggleFaq(i)}>
                    <span>{f.q}</span>
                    <span className="plus mono">+</span>
                  </button>
                  <div className="faq-a"><p>{f.a}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA / APPLICATION */}
      <section className="cta-final blueprint grain" id="apply">
        <div className="wrap">
          <div className="cta-wrap">
            <div className="cta-left">
              <div className="label mono micro">&mdash; APPLY / Q2 2026</div>
              <h2>Tell us what's<br />not working.<br /><em>We'll tell you if<br />we can help.</em></h2>
              <p>
                We take on three clients a quarter. The form on the right is the only way in &mdash; no sales call, no funnel, no pressure. If we're a fit, we'll write back within 48 hours to set up a first call.
              </p>
              <div className="cta-avail">
                <div className="cta-avail-row"><span className="dot">Q2 2026</span><span className="mono micro">2 / 3 SPOTS OPEN</span></div>
                <div className="cta-avail-row full"><span className="dot">Q1 2026</span><span className="mono micro">FULL &middot; WAITLIST</span></div>
                <div className="cta-avail-row"><span className="dot">Q3 2026</span><span className="mono micro">3 / 3 SPOTS OPEN</span></div>
              </div>
            </div>
            <form className="cta-form" onSubmit={handleApplicationSubmit}>
              <div className="form-eyebrow mono micro">APPLICATION</div>
              <h3>Apply to work with us</h3>
              <div className="field-row">
                <div className="field">
                  <label className="mono micro">NAME</label>
                  <input type="text" placeholder="Your full name" required />
                </div>
                <div className="field">
                  <label className="mono micro">COMPANY</label>
                  <input type="text" placeholder="Company name" required />
                </div>
              </div>
              <div className="field">
                <label className="mono micro">WORK EMAIL</label>
                <input type="email" placeholder="you@company.com" required />
              </div>
              <div className="field-row">
                <div className="field">
                  <label className="mono micro">YEARLY REVENUE</label>
                  <select required defaultValue="">
                    <option value="" disabled>Select range</option>
                    <option>Under $500k</option>
                    <option>$500k &ndash; $2M</option>
                    <option>$2M &ndash; $10M</option>
                    <option>$10M+</option>
                  </select>
                </div>
                <div className="field">
                  <label className="mono micro">WHEN YOU'D LIKE TO START</label>
                  <select required defaultValue="">
                    <option value="" disabled>Select</option>
                    <option>This quarter</option>
                    <option>Next quarter</option>
                    <option>Still exploring</option>
                  </select>
                </div>
              </div>
              <div className="field">
                <label className="mono micro">WHAT'S NOT WORKING</label>
                <textarea placeholder="A short paragraph is enough. What's the thing costing you the most time or money right now?" required></textarea>
              </div>
              <button type="submit">
                {applicationSubmitted ? 'Application received \u2713' : (
                  <>
                    Send Application
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </>
                )}
              </button>
              <p className="mono fine">WE REPLY WITHIN 48 HOURS &middot; A REAL PERSON, NOT A BOT</p>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="wrap-wide">
          <div className="footer-top">
            <div className="footer-brand">
              <span className="mono micro">JOMENDEZ / INC</span>
              <h3 className="serif">Software that runs<br />your business.</h3>
              <p>A small studio that builds custom AI software for small businesses &mdash; so you can stop juggling apps and get back to your work.</p>
            </div>
            <div className="footer-col">
              <h4 className="mono micro">STUDIO</h4>
              <a href="#about">About</a>
              <a href="#process">Process</a>
              <a href="#work">Work</a>
              <a href="#apply">Apply</a>
            </div>
            <div className="footer-col">
              <h4 className="mono micro">SERVICES</h4>
              <a href="#services">Smart Automation</a>
              <a href="#services">Control Panels</a>
              <a href="#services">Website &amp; Bookings</a>
              <a href="#services">Growth Plan</a>
            </div>
            <div className="footer-col">
              <h4 className="mono micro">ELSEWHERE</h4>
              <a href="#">LinkedIn &#8599;</a>
              <a href="#">GitHub &#8599;</a>
              <a href="#">X / Twitter &#8599;</a>
              <a href="mailto:support@jomendez.io">support@jomendez.io</a>
            </div>
          </div>
          <div className="footer-bottom mono micro">
            <span>&copy; 2026 JOMENDEZ INC</span>
            <span>DESIGNED &amp; BUILT IN-HOUSE</span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Landing;
