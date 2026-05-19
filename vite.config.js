import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

const REQUIRED_BUILD_ENV = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID',
]

/**
 * Per-route static <head>.
 *
 * The site is a client-rendered SPA: every URL is served the same
 * index.html, whose <head> describes the homepage. A crawler reading
 * raw HTML therefore saw the homepage's canonical / title / OG tags on
 * every route — which is what produced the audit's "URL not matching
 * canonical" and "non-indexable page in sitemap" findings.
 *
 * After the build, this plugin writes dist/<route>/index.html for each
 * marketing sub-page — a copy of dist/index.html with that route's
 * title, description, canonical and OG/Twitter tags substituted in.
 * Firebase Hosting serves a matching static file before it applies the
 * SPA rewrite, so a crawler fetching /free-audit now receives the
 * correct <head>. The page's own metadata effect sets the same values
 * once React mounts, so users see no change.
 *
 * Keep these values in sync with the `en.meta` entries in the matching
 * src/i18n/content/*.jsx modules.
 */
const ROUTE_META = {
  'free-audit': {
    title: 'Free Instant Business Audit | Jomendez Inc',
    description:
      'A free, instant audit of your online presence — listings, reviews, website, SEO, and Google Business Profile.',
    imageAlt: 'Free instant business audit — Jomendez Inc',
  },
  'strategy-call': {
    title: 'Book a Strategy Call | Jomendez Inc',
    description:
      'A free 20-minute call about your business — where leads come from and what to fix first. No pitch.',
    imageAlt: 'Book a strategy call with Jose Mendez — Jomendez Inc',
  },
  contact: {
    title: 'Contact Jomendez Inc — Websites for Local Businesses',
    description:
      'Tell us about your business and we’ll reply within one business day — or book a free strategy call.',
    imageAlt: 'Contact Jomendez Inc',
  },
}

function perRouteStaticHead() {
  let outDir = 'dist'

  const escapeAttr = (s) =>
    s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')

  return {
    name: 'per-route-static-head',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir
    },
    closeBundle() {
      const dist = path.resolve(process.cwd(), outDir)
      const indexPath = path.join(dist, 'index.html')
      if (!fs.existsSync(indexPath)) return
      const indexHtml = fs.readFileSync(indexPath, 'utf8')

      // Replace a <meta> tag identified by one of its attributes.
      // [^>]* spans newlines, so this matches multi-line tags too.
      // A function replacer is used so the value is inserted literally
      // (no `$` substitution surprises).
      const replaceMeta = (html, idAttr, replacement) =>
        html.replace(
          new RegExp(`<meta[^>]*${idAttr}[^>]*>`),
          () => replacement,
        )

      for (const [route, meta] of Object.entries(ROUTE_META)) {
        const url = `https://jomendez.io/${route}`
        const title = escapeAttr(meta.title)
        const desc = escapeAttr(meta.description)
        const imageAlt = escapeAttr(meta.imageAlt)

        let html = indexHtml
        html = html.replace(
          /<title>[\s\S]*?<\/title>/,
          () => `<title>${title}</title>`,
        )
        html = html.replace(
          /<link rel="canonical"[^>]*>/,
          () => `<link rel="canonical" href="${url}" />`,
        )
        html = replaceMeta(
          html,
          'name="description"',
          `<meta name="description" content="${desc}" />`,
        )
        html = replaceMeta(
          html,
          'property="og:title"',
          `<meta property="og:title" content="${title}" />`,
        )
        html = replaceMeta(
          html,
          'property="og:description"',
          `<meta property="og:description" content="${desc}" />`,
        )
        html = replaceMeta(
          html,
          'property="og:url"',
          `<meta property="og:url" content="${url}" />`,
        )
        html = replaceMeta(
          html,
          'property="og:image:alt"',
          `<meta property="og:image:alt" content="${imageAlt}" />`,
        )
        html = replaceMeta(
          html,
          'name="twitter:title"',
          `<meta name="twitter:title" content="${title}" />`,
        )
        html = replaceMeta(
          html,
          'name="twitter:description"',
          `<meta name="twitter:description" content="${desc}" />`,
        )
        html = replaceMeta(
          html,
          'name="twitter:image:alt"',
          `<meta name="twitter:image:alt" content="${imageAlt}" />`,
        )

        const routeDir = path.join(dist, route)
        fs.mkdirSync(routeDir, { recursive: true })
        fs.writeFileSync(path.join(routeDir, 'index.html'), html, 'utf8')
        console.log(`[per-route-static-head] wrote ${route}/index.html`)
      }
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  if (command === 'build') {
    const env = loadEnv(mode, process.cwd(), '')
    const missing = REQUIRED_BUILD_ENV.filter((k) => !env[k])
    if (missing.length) {
      throw new Error(
        `\n\n[build aborted] Missing required env vars: ${missing.join(', ')}\n` +
          `Local: set them in .env. CI: set them in repo secrets (GitHub → Settings → Secrets and variables → Actions).\n`,
      )
    }
  }
  return { plugins: [react(), perRouteStaticHead()] }
})
