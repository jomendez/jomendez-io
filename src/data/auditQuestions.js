/**
 * The 8-Point Business Audit — question bank.
 *
 * Each question is tagged with `minDepth`: the shallowest depth at which
 * the question appears. Filtering by depth picks every question whose
 * minDepth is at or below the selected depth.
 *
 *   simple  → 1 question per dimension  (8 total, ~3 min)
 *   medium  → 2 questions per dimension (16 total, ~7 min)
 *   deep    → 4 questions per dimension (32 total, ~15 min)
 *
 * Question types:
 *   - choice: single-select radio. `options` is an array of strings.
 *             The submitted value is the option's index.
 *   - scale:  1–5 Likert; submitted as a number 1..5
 *   - number: free-form numeric; submitted as a number
 *
 * The dimension keys here MUST match the keys used by the radar chart
 * scores object on audit_submissions. See AUDIT_DIMENSIONS in
 * src/components/AuditRadar/AuditRadar.jsx for the canonical order.
 *
 * TODO: this is a draft question set. Jose may tweak wording / options /
 * order in a follow-up — the data structure is stable so edits are safe.
 */

export const DEPTHS = ['simple', 'medium', 'deep']

const depthRank = (d) => DEPTHS.indexOf(d)

export const DIMENSION_META = [
  { key: 'onlineVisibility',   label: 'Online Visibility',   blurb: 'Can your customers actually find you?' },
  { key: 'leadCapture',        label: 'Lead Capture',        blurb: 'Are you turning interest into contact info?' },
  { key: 'leadResponse',       label: 'Lead Response',       blurb: 'How fast do leads hear back from you?' },
  { key: 'customerRetention',  label: 'Customer Retention',  blurb: 'Are past customers coming back?' },
  { key: 'operationsTime',     label: 'Operations & Time',   blurb: 'Where is your week disappearing?' },
  { key: 'marketingEngine',    label: 'Marketing Engine',    blurb: 'Is content working for you, or are you working for it?' },
  { key: 'financialClarity',   label: 'Financial Clarity',   blurb: 'Do you know your real numbers?' },
  { key: 'techStack',          label: 'Tech Stack',          blurb: 'Are your tools helping or fighting each other?' },
]

export const DEPTH_META = {
  simple: { label: 'Simple',  est: '~3 min',  blurb: '8 questions \u2014 the essentials.' },
  medium: { label: 'Medium',  est: '~7 min',  blurb: '16 questions \u2014 a fuller picture.' },
  deep:   { label: 'Deep',    est: '~15 min', blurb: '32 questions \u2014 the full diagnostic.' },
}

/**
 * The full question bank. Order within a dimension is the order they're
 * shown to the user. minDepth controls which depths include the question.
 */
export const QUESTIONS = [
  // -------- Online Visibility --------
  {
    id: 'visibility-q1',
    dimension: 'onlineVisibility',
    minDepth: 'simple',
    text: 'When someone searches for what you do in your area, where does your business show up?',
    type: 'choice',
    options: [
      'Top of the first page',
      'Somewhere on the first page',
      'Page 2 or beyond',
      'I have no idea',
      'My business doesn\u2019t come up at all',
    ],
  },
  {
    id: 'visibility-q2',
    dimension: 'onlineVisibility',
    minDepth: 'medium',
    text: 'Do you have a Google Business Profile, and is it claimed and complete?',
    type: 'choice',
    options: [
      'Yes, claimed and fully complete',
      'Yes, claimed but not fully filled out',
      'Listed but I haven\u2019t claimed it',
      'I don\u2019t think I have one',
    ],
  },
  {
    id: 'visibility-q3',
    dimension: 'onlineVisibility',
    minDepth: 'deep',
    text: 'How many Google reviews do you have, roughly?',
    type: 'choice',
    options: ['None', '1\u201310', '11\u201350', '51\u2013200', '200+'],
  },
  {
    id: 'visibility-q4',
    dimension: 'onlineVisibility',
    minDepth: 'deep',
    text: 'Are you currently running paid ads (Google, Facebook, Instagram, etc.)?',
    type: 'choice',
    options: [
      'No',
      'Yes, but I\u2019m not sure if they\u2019re working',
      'Yes, and I track results',
      'I tried in the past and stopped',
    ],
  },

  // -------- Lead Capture --------
  {
    id: 'capture-q1',
    dimension: 'leadCapture',
    minDepth: 'simple',
    text: 'When someone visits your website but isn\u2019t ready to buy, can they leave their email or phone for follow-up?',
    type: 'choice',
    options: [
      'Yes, multiple ways',
      'Yes, one form somewhere',
      'Only by booking or calling',
      'My website doesn\u2019t collect anything',
      'I don\u2019t have a website',
    ],
  },
  {
    id: 'capture-q2',
    dimension: 'leadCapture',
    minDepth: 'medium',
    text: 'Do you offer anything (a guide, a discount, a free consult) in exchange for an email?',
    type: 'choice',
    options: [
      'Yes, and I\u2019ve seen it work',
      'Yes, but I\u2019m not sure if it works',
      'No, but I\u2019ve thought about it',
      'No, never',
    ],
  },
  {
    id: 'capture-q3',
    dimension: 'leadCapture',
    minDepth: 'deep',
    text: 'Where do most of your new leads come from?',
    type: 'choice',
    options: [
      'Word of mouth / referrals',
      'Google search',
      'Social media',
      'Paid ads',
      'Walk-ins or local presence',
      'I honestly don\u2019t know',
    ],
  },
  {
    id: 'capture-q4',
    dimension: 'leadCapture',
    minDepth: 'deep',
    text: 'When a new lead reaches out, do you know which channel brought them?',
    type: 'choice',
    options: [
      'Yes, I track it for every lead',
      'Sometimes, when I remember to ask',
      'No \u2014 I just take the lead',
      'I don\u2019t track leads at all',
    ],
  },

  // -------- Lead Response --------
  {
    id: 'response-q1',
    dimension: 'leadResponse',
    minDepth: 'simple',
    text: 'When a new lead contacts you (call, form, message), how long until you respond on average?',
    type: 'choice',
    options: [
      'Within 5 minutes',
      'Within an hour',
      'Same day',
      'Next day or later',
      'Honestly, sometimes I miss them',
    ],
  },
  {
    id: 'response-q2',
    dimension: 'leadResponse',
    minDepth: 'medium',
    text: 'Do leads get any automatic acknowledgment when they reach out?',
    type: 'choice',
    options: [
      'Yes \u2014 auto-reply or text right away',
      'Sometimes, depending on the channel',
      'Only if I personally see it',
      'No automatic anything',
    ],
  },
  {
    id: 'response-q3',
    dimension: 'leadResponse',
    minDepth: 'deep',
    text: 'How do leads typically reach you? (pick the channel they use most)',
    type: 'choice',
    options: [
      'Phone',
      'Text / SMS',
      'Email',
      'Website form',
      'DM on social media',
      'A mix \u2014 no clear primary',
    ],
  },
  {
    id: 'response-q4',
    dimension: 'leadResponse',
    minDepth: 'deep',
    text: 'Do you have someone (or something) covering inbound when you\u2019re not available?',
    type: 'choice',
    options: [
      'Yes \u2014 a team member or service answers',
      'Yes \u2014 automation handles first-touch',
      'No, but it goes to voicemail/inbox',
      'No, missed leads are gone',
    ],
  },

  // -------- Customer Retention --------
  {
    id: 'retention-q1',
    dimension: 'customerRetention',
    minDepth: 'simple',
    text: 'Roughly what percentage of your business comes from repeat or referred customers?',
    type: 'choice',
    options: [
      'More than half',
      'Around 25\u201350%',
      '10\u201325%',
      'Less than 10%',
      'I don\u2019t know',
    ],
  },
  {
    id: 'retention-q2',
    dimension: 'customerRetention',
    minDepth: 'medium',
    text: 'After a job or service, do you follow up with the customer?',
    type: 'choice',
    options: [
      'Yes, automatically',
      'Yes, but only when I remember',
      'Only for big customers',
      'Not really',
    ],
  },
  {
    id: 'retention-q3',
    dimension: 'customerRetention',
    minDepth: 'deep',
    text: 'Do you actively ask customers for reviews or referrals?',
    type: 'choice',
    options: ['Yes, every time', 'Sometimes', 'Rarely', 'Never'],
  },
  {
    id: 'retention-q4',
    dimension: 'customerRetention',
    minDepth: 'deep',
    text: 'Do you collect feedback from customers after a job (survey, rating, etc.)?',
    type: 'choice',
    options: [
      'Yes, automatically',
      'Sometimes, informally',
      'Only when they volunteer it',
      'Never',
    ],
  },

  // -------- Operations & Time --------
  {
    id: 'ops-q1',
    dimension: 'operationsTime',
    minDepth: 'simple',
    text: 'How many hours a week do you spend on admin (invoicing, scheduling, paperwork, follow-ups)?',
    type: 'choice',
    options: ['Under 5', '5\u201310', '10\u201320', '20\u201340', 'More than 40 \u2014 it IS my job'],
  },
  {
    id: 'ops-q2',
    dimension: 'operationsTime',
    minDepth: 'medium',
    text: 'If you took a real two-week vacation, would the business keep running smoothly?',
    type: 'choice',
    options: [
      'Yes, no problem',
      'Mostly, with small hiccups',
      'Things would get messy',
      'It would basically stop',
    ],
  },
  {
    id: 'ops-q3',
    dimension: 'operationsTime',
    minDepth: 'deep',
    text: 'What\u2019s the most repetitive task you do every week \u2014 the one you\u2019d pay good money to never do again?',
    type: 'choice',
    options: [
      'Following up with leads',
      'Scheduling and rescheduling',
      'Invoicing and chasing payments',
      'Posting on social media',
      'Answering the same questions over and over',
      'Something else',
    ],
  },
  {
    id: 'ops-q4',
    dimension: 'operationsTime',
    minDepth: 'deep',
    text: 'Do you have written procedures (SOPs) for how things get done in your business?',
    type: 'choice',
    options: [
      'Yes, and we follow them',
      'Yes, but they\u2019re mostly outdated',
      'A few exist informally',
      'No \u2014 it\u2019s all in my head',
    ],
  },

  // -------- Marketing Engine --------
  {
    id: 'marketing-q1',
    dimension: 'marketingEngine',
    minDepth: 'simple',
    text: 'How often does your business put out new content (posts, reels, videos, emails)?',
    type: 'choice',
    options: [
      'Multiple times a week',
      'Weekly',
      'A few times a month',
      'Rarely',
      'Never / haven\u2019t started',
    ],
  },
  {
    id: 'marketing-q2',
    dimension: 'marketingEngine',
    minDepth: 'medium',
    text: 'Do you have a documented marketing plan for the next 90 days?',
    type: 'choice',
    options: [
      'Yes, written down',
      'Sort of, in my head',
      'No, but I want one',
      'No \u2014 I do whatever feels right',
    ],
  },
  {
    id: 'marketing-q3',
    dimension: 'marketingEngine',
    minDepth: 'deep',
    text: 'How long does it take you to create one piece of content (a post, a reel, an email)?',
    type: 'choice',
    options: [
      'Under 15 minutes',
      '15\u201360 minutes',
      '1\u20133 hours',
      'Several hours',
      'I avoid it entirely',
    ],
  },
  {
    id: 'marketing-q4',
    dimension: 'marketingEngine',
    minDepth: 'deep',
    text: 'Are you using any AI tools to help create content?',
    type: 'choice',
    options: [
      'Yes, regularly and effectively',
      'Yes, occasionally',
      'I\u2019ve tried but it didn\u2019t click',
      'No, but I\u2019m curious',
      'No, and not interested',
    ],
  },

  // -------- Financial Clarity --------
  {
    id: 'financial-q1',
    dimension: 'financialClarity',
    minDepth: 'simple',
    text: 'How often do you actually look at your business\u2019s revenue and expenses?',
    type: 'choice',
    options: ['Weekly', 'Monthly', 'Quarterly', 'Once a year (taxes)', 'Almost never'],
  },
  {
    id: 'financial-q2',
    dimension: 'financialClarity',
    minDepth: 'medium',
    text: 'Do you know roughly what each customer is worth to you over time (lifetime value)?',
    type: 'choice',
    options: [
      'Yes, a real number',
      'A rough estimate',
      'No, but I could figure it out',
      'No idea',
    ],
  },
  {
    id: 'financial-q3',
    dimension: 'financialClarity',
    minDepth: 'deep',
    text: 'Do you know what it costs you to acquire one new customer?',
    type: 'choice',
    options: [
      'Yes \u2014 a tracked number',
      'A rough estimate',
      'Not really',
      'I\u2019ve never thought about it',
    ],
  },
  {
    id: 'financial-q4',
    dimension: 'financialClarity',
    minDepth: 'deep',
    text: 'Are your business and personal finances cleanly separated?',
    type: 'choice',
    options: [
      'Yes \u2014 separate accounts, separate cards, clean books',
      'Mostly separate',
      'Things mix more than they should',
      'Honestly, no',
    ],
  },

  // -------- Tech Stack --------
  {
    id: 'tech-q1',
    dimension: 'techStack',
    minDepth: 'simple',
    text: 'How many software tools / subscriptions do you currently pay for to run the business?',
    type: 'choice',
    options: ['1\u20133', '4\u20136', '7\u201310', 'More than 10', 'I genuinely don\u2019t know'],
  },
  {
    id: 'tech-q2',
    dimension: 'techStack',
    minDepth: 'medium',
    text: 'When a new customer comes in, how many places do you have to enter their info?',
    type: 'choice',
    options: [
      'One \u2014 everything connects',
      'Two',
      'Three or more',
      'Lots of spreadsheets and copy-paste',
    ],
  },
  {
    id: 'tech-q3',
    dimension: 'techStack',
    minDepth: 'deep',
    text: 'Do your booking, invoicing, and customer-records tools talk to each other?',
    type: 'choice',
    options: [
      'Yes, fully integrated',
      'Mostly \u2014 a few manual handoffs',
      'Barely \u2014 lots of double-entry',
      'They\u2019re completely separate',
    ],
  },
  {
    id: 'tech-q4',
    dimension: 'techStack',
    minDepth: 'deep',
    text: 'When something breaks or needs changing in your tech (a form, a workflow, an integration), who fixes it?',
    type: 'choice',
    options: [
      'I have a technical person on call',
      'I figure it out myself eventually',
      'I work around it / live with it',
      'I have no idea where to start',
    ],
  },
]

/**
 * Return the questions appropriate for a given depth, in display order
 * (preserving the order in QUESTIONS, which already groups by dimension).
 */
export const getQuestionsForDepth = (depth) => {
  const cap = depthRank(depth)
  if (cap < 0) throw new Error(`Unknown depth: ${depth}`)
  return QUESTIONS.filter((q) => depthRank(q.minDepth) <= cap)
}

/**
 * Validate a payload of answers against the question bank for a given
 * depth. Used by the Cloud Function on submit. Returns the cleaned
 * answers array, or throws an Error with `code` set so the caller can
 * surface a friendly message.
 */
export const validateAnswers = (depth, answers) => {
  if (!Array.isArray(answers)) {
    const e = new Error('answers must be an array'); e.code = 'invalid-argument'; throw e
  }
  const expected = getQuestionsForDepth(depth)
  const byId = Object.fromEntries(expected.map((q) => [q.id, q]))
  const seen = new Set()
  const cleaned = []
  for (const a of answers) {
    if (!a || typeof a !== 'object') {
      const e = new Error('each answer must be an object'); e.code = 'invalid-argument'; throw e
    }
    const q = byId[a.qid]
    if (!q) {
      const e = new Error(`unknown question: ${a.qid}`); e.code = 'invalid-argument'; throw e
    }
    if (seen.has(a.qid)) {
      const e = new Error(`duplicate answer: ${a.qid}`); e.code = 'invalid-argument'; throw e
    }
    seen.add(a.qid)

    if (q.type === 'choice') {
      const idx = Number(a.value)
      if (!Number.isInteger(idx) || idx < 0 || idx >= q.options.length) {
        const e = new Error(`bad choice index for ${a.qid}`); e.code = 'invalid-argument'; throw e
      }
      cleaned.push({ qid: a.qid, value: idx })
    } else if (q.type === 'scale') {
      const n = Number(a.value)
      if (!Number.isInteger(n) || n < 1 || n > 5) {
        const e = new Error(`bad scale value for ${a.qid}`); e.code = 'invalid-argument'; throw e
      }
      cleaned.push({ qid: a.qid, value: n })
    } else if (q.type === 'number') {
      const n = Number(a.value)
      if (!Number.isFinite(n)) {
        const e = new Error(`bad number value for ${a.qid}`); e.code = 'invalid-argument'; throw e
      }
      cleaned.push({ qid: a.qid, value: n })
    } else {
      const e = new Error(`unknown type for ${a.qid}`); e.code = 'internal'; throw e
    }
  }
  // Require all expected questions answered.
  for (const q of expected) {
    if (!seen.has(q.id)) {
      const e = new Error(`missing answer for ${q.id}`); e.code = 'invalid-argument'; throw e
    }
  }
  return cleaned
}
