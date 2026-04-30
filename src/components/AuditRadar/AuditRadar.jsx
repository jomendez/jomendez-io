/**
 * AuditRadar — the signature visual for the 8-Point Business Audit.
 *
 * Eight axes, concentric rings, and a sample "score" polygon that gives the
 * impression of a real audit in progress without claiming to be anyone's
 * actual data. Built as inline SVG so it inherits color from CSS variables
 * and scales cleanly on every breakpoint via viewBox.
 *
 * The accompanying labeled list lives next to the chart in Landing.jsx —
 * keeping that list out of the SVG means: (a) it's selectable text for
 * accessibility, and (b) on mobile the chart can shrink without the labels
 * overlapping each other.
 */

const DIMENSIONS = [
  'Online Visibility',
  'Lead Capture',
  'Lead Response',
  'Customer Retention',
  'Operations & Time',
  'Marketing Engine',
  'Financial Clarity',
  'Tech Stack',
]

// Sample scores out of 100, ordered to match DIMENSIONS. These are
// illustrative only — they should look like a believable mid-audit
// snapshot, not a perfect octagon and not a flat line.
const SAMPLE_SCORES = [62, 48, 36, 72, 52, 66, 58, 44]

const SIZE = 600
const CENTER = SIZE / 2
const MAX_R = 220
const RINGS = 4

// Axis angles, starting at the top (-90deg) and going clockwise.
const angleFor = (i) => -Math.PI / 2 + (i * Math.PI * 2) / DIMENSIONS.length

const polar = (cx, cy, r, theta) => [
  cx + r * Math.cos(theta),
  cy + r * Math.sin(theta),
]

const ringPoints = (r) =>
  DIMENSIONS.map((_, i) => {
    const [x, y] = polar(CENTER, CENTER, r, angleFor(i))
    return `${x.toFixed(2)},${y.toFixed(2)}`
  }).join(' ')

const scorePoints = SAMPLE_SCORES.map((score, i) => {
  const r = (score / 100) * MAX_R
  const [x, y] = polar(CENTER, CENTER, r, angleFor(i))
  return `${x.toFixed(2)},${y.toFixed(2)}`
}).join(' ')

const AuditRadar = ({ className = '', ariaLabel = 'The 8-Point Business Audit radar chart' }) => {
  return (
    <svg
      className={`audit-radar ${className}`.trim()}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      role="img"
      aria-label={ariaLabel}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{ariaLabel}</title>

      {/* Concentric ring polygons (graph background) */}
      <g className="audit-radar__rings">
        {Array.from({ length: RINGS }, (_, idx) => {
          const r = ((idx + 1) / RINGS) * MAX_R
          return (
            <polygon
              key={r}
              points={ringPoints(r)}
              fill={idx === RINGS - 1 ? 'var(--audit-ring-fill, rgba(52,82,255,0.04))' : 'none'}
              stroke="var(--audit-ring-stroke, rgba(11,13,16,0.16))"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          )
        })}
      </g>

      {/* Axis spokes */}
      <g className="audit-radar__axes">
        {DIMENSIONS.map((_, i) => {
          const [x, y] = polar(CENTER, CENTER, MAX_R, angleFor(i))
          return (
            <line
              key={i}
              x1={CENTER}
              y1={CENTER}
              x2={x}
              y2={y}
              stroke="var(--audit-axis-stroke, rgba(11,13,16,0.18))"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          )
        })}
      </g>

      {/* Score polygon */}
      <polygon
        className="audit-radar__score"
        points={scorePoints}
        fill="var(--audit-score-fill, rgba(52,82,255,0.18))"
        stroke="var(--audit-score-stroke, #3452FF)"
        strokeWidth="2"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />

      {/* Score points */}
      <g className="audit-radar__points">
        {SAMPLE_SCORES.map((score, i) => {
          const r = (score / 100) * MAX_R
          const [x, y] = polar(CENTER, CENTER, r, angleFor(i))
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="5"
              fill="var(--audit-score-stroke, #3452FF)"
            />
          )
        })}
      </g>

      {/* Axis labels with leader numerals (mono micro) */}
      <g className="audit-radar__labels">
        {DIMENSIONS.map((label, i) => {
          const [x, y] = polar(CENTER, CENTER, MAX_R + 44, angleFor(i))
          // Anchor labels horizontally so they don't run off the side
          const cosA = Math.cos(angleFor(i))
          const anchor = cosA > 0.25 ? 'start' : cosA < -0.25 ? 'end' : 'middle'
          return (
            <g key={label}>
              <text
                x={x}
                y={y - 8}
                textAnchor={anchor}
                className="audit-radar__label-num"
                fill="var(--audit-label-num, #3452FF)"
              >
                {String(i + 1).padStart(2, '0')}
              </text>
              <text
                x={x}
                y={y + 10}
                textAnchor={anchor}
                className="audit-radar__label"
                fill="var(--audit-label, #0B0D10)"
              >
                {label}
              </text>
            </g>
          )
        })}
      </g>

      {/* Center dot */}
      <circle
        cx={CENTER}
        cy={CENTER}
        r="4"
        fill="var(--audit-center, rgba(11,13,16,0.4))"
      />
    </svg>
  )
}

export default AuditRadar
export { DIMENSIONS as AUDIT_DIMENSIONS }
