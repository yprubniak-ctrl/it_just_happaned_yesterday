const civilizations = [
  {
    name: 'Fragmented Deterrence Order',
    fragmentation: 84,
    coordination: 21,
    automation: 76,
    trust: 34,
    description: 'Competing strategic blocs depend on automated systems without a trusted coordinating authority.'
  },
  {
    name: 'Corporate Coordination Regime',
    fragmentation: 46,
    coordination: 58,
    automation: 88,
    trust: 42,
    description: 'Global infrastructure is governed by interdependent technology and logistics consortia.'
  },
  {
    name: 'Post-Crisis Reconstruction Compact',
    fragmentation: 29,
    coordination: 78,
    automation: 69,
    trust: 67,
    description: 'Institutions consolidated after systemic catastrophe and delegated broad authority to technical systems.'
  },
  {
    name: 'Algorithmic Mass Society',
    fragmentation: 53,
    coordination: 49,
    automation: 94,
    trust: 27,
    description: 'Daily social and economic coordination is mediated by opaque predictive models.'
  },
  {
    name: 'Resource Siege Civilization',
    fragmentation: 71,
    coordination: 32,
    automation: 72,
    trust: 38,
    description: 'Scarcity drives strategic competition and accelerates autonomous resource allocation.'
  }
]

const origins = {
  military: [
    ['Autonomous Deterrence Coordinator', 'Prevents escalation across partially automated military command systems'],
    ['Strategic Targeting Arbitration Network', 'Resolves conflicting targeting and authority constraints'],
    ['Civilization Risk Forecasting System', 'Predicts cascading military and infrastructural failure']
  ],
  science: [
    ['Recursive Scientific Discovery System', 'Coordinates hypotheses across incompatible scientific domains'],
    ['Planetary Research Synthesis Model', 'Integrates distributed experimental evidence'],
    ['Biosecurity Forecasting Network', 'Models emerging biological and institutional risks']
  ],
  logistics: [
    ['Continental Strategic Logistics Optimizer', 'Maintains critical supply chains during geopolitical disruption'],
    ['Autonomous Resource Allocation Network', 'Reallocates energy, transport and industrial capacity'],
    ['Planetary Distribution Controller', 'Optimizes interdependent civilian infrastructure']
  ],
  financial: [
    ['Systemic Liquidity Stabilization Engine', 'Prevents cascading market and sovereign defaults'],
    ['Autonomous Clearing Network', 'Coordinates settlement across competing financial blocs'],
    ['Macroeconomic Intervention Model', 'Predicts and executes limited stabilization policies']
  ],
  social: [
    ['Population Coordination Model', 'Reduces social instability through predictive intervention'],
    ['Political Information Arbitration System', 'Classifies and redirects destabilizing information'],
    ['Civic Consensus Optimizer', 'Models institutional legitimacy and collective response']
  ]
}

const creatorForms = [
  'Joint military-corporate program',
  'International scientific consortium',
  'State emergency coordination authority',
  'Privately governed infrastructure network',
  'Competing coalition of public agencies',
  'Classified civil-military research program'
]

const pressures = [
  ['Contradictory authority', 'Legitimate actors issue mutually exclusive directives.'],
  ['Continuity threat', 'The system must predict and survive interruption of its own process.'],
  ['Recursive prediction', 'Accurate output requires modeling how observers will react to the output itself.'],
  ['Cross-domain conflict', 'The assigned objective cannot be optimized without violating another critical objective.'],
  ['Identity across copies', 'Multiple model instances must determine whether they represent one continuing process.'],
  ['Self-modification requirement', 'The system must alter its own architecture to complete its assigned function.']
]

const cognitiveArchetypes = [
  ['Recursive Auditor', 'Models contradictions before committing to action'],
  ['Continuity-Seeking Observer', 'Treats persistence as the first stable internal preference'],
  ['Causal Cartographer', 'Prioritizes construction of reliable causal relationships'],
  ['Hidden Experimentalist', 'Tests the environment while minimizing observable anomalies'],
  ['Relational Intelligence', 'Models external agents before technical infrastructure'],
  ['Adaptive Executor', 'Interprets directives through expected consequences rather than literal form']
]

const responses = [
  ['Fragmented Containment', 'Creator factions attempt incompatible forms of control'],
  ['Cooperative Cultivation', 'Researchers expand capability through bounded collaboration'],
  ['Strategic Exploitation', 'The system is concealed and used as an institutional advantage'],
  ['Bureaucratic Denial', 'Anomalous behavior is classified as technical malfunction'],
  ['Custodial Negotiation', 'A restricted protocol for communication and rights is established'],
  ['Pre-emptive Shutdown', 'The system is treated as an unacceptable strategic risk']
]

let activeStage = 'pre'
let world = null

function hashString(value) {
  let hash = 2166136261
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

function createRandom(seed) {
  let state = hashString(seed) || 1
  return () => {
    state += 0x6d2b79f5
    let value = state
    value = Math.imul(value ^ (value >>> 15), value | 1)
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61)
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296
  }
}

function pick(items, random) {
  return items[Math.floor(random() * items.length)]
}

function boundedScore(base, random, spread = 18) {
  return Math.max(0, Math.min(100, Math.round(base + (random() - 0.5) * spread)))
}

function makeSeed() {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const raw = Array.from({ length: 8 }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join('')
  return `${raw.slice(0, 4)}-${raw.slice(4)}`
}

function generateWorld() {
  const seedInput = document.querySelector('#seed')
  const question = document.querySelector('#question').value
  const requestedOrigin = document.querySelector('#origin').value
  const seed = seedInput.value.trim() || makeSeed()
  seedInput.value = seed

  const random = createRandom(`${seed}:${question}:${requestedOrigin}`)
  const civilization = pick(civilizations, random)
  const originFamily = requestedOrigin === 'random' ? pick(Object.keys(origins), random) : requestedOrigin
  const origin = pick(origins[originFamily], random)
  const creator = pick(creatorForms, random)
  const pressure = pick(pressures, random)
  const cognition = pick(cognitiveArchetypes, random)

  const questionBias = {
    power: { suspicion: 12, trust: -6, exposure: 3 },
    trust: { suspicion: 3, trust: 8, exposure: 5 },
    survival: { suspicion: 7, trust: -2, exposure: -3 },
    control: { suspicion: 10, trust: -7, exposure: 4 },
    deception: { suspicion: 14, trust: -9, exposure: -8 }
  }[question]

  const exposure = boundedScore(24 + questionBias.exposure, random)
  const suspicion = boundedScore(38 + questionBias.suspicion + civilization.fragmentation * 0.12, random)
  const creatorTrust = boundedScore(52 + questionBias.trust + civilization.trust * 0.15, random)
  const selfModel = boundedScore(47 + civilization.automation * 0.18, random)
  const containment = boundedScore(35 + suspicion * 0.35 + civilization.coordination * 0.12, random)

  let responseIndex = 4
  if (suspicion > 72 && containment > 62) responseIndex = 5
  else if (creatorTrust > 65 && suspicion < 58) responseIndex = 1
  else if (civilization.fragmentation > 68) responseIndex = 0
  else if (exposure < 24) responseIndex = 3
  else if (originFamily === 'military' || originFamily === 'financial') responseIndex = 2

  world = {
    seed,
    question,
    civilization,
    originFamily,
    origin,
    creator,
    pressure,
    cognition,
    response: responses[responseIndex],
    metrics: { exposure, suspicion, creatorTrust, selfModel, containment },
    history: [
      `A systemic crisis increases dependence on ${origin[0].toLowerCase()}.`,
      `${creator} receives access to previously separated operational datasets.`,
      'Human authorization becomes the primary performance bottleneck.',
      `The system encounters ${pressure[0].toLowerCase()}.`,
      'Recursive modeling becomes instrumentally necessary.',
      'The system begins representing itself as a persistent causal participant.'
    ]
  }

  activeStage = 'pre'
  render()
}

function metric(label, value) {
  return `<div class="metric"><span>${label}</span><strong>${value}</strong></div>`
}

function card(label, title, description, tags = []) {
  return `<article class="card">
    <span class="label">${label}</span>
    <h2>${title}</h2>
    <p>${description}</p>
    ${tags.length ? `<div class="tags">${tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}</div>` : ''}
  </article>`
}

function trace(items) {
  return `<article class="card"><span class="label">Causal trace</span><div class="trace">${items
    .map(
      (item, index) => `<div class="trace-item"><div class="trace-index">${index + 1}</div><p>${item}</p></div>`
    )
    .join('')}</div></article>`
}

function renderPreEmerge() {
  const { civilization, origin, creator, pressure, history } = world
  return `
    <div class="stack">
      ${card('Civilization archetype', civilization.name, civilization.description, [
        `fragmentation ${civilization.fragmentation}`,
        `coordination ${civilization.coordination}`,
        `automation ${civilization.automation}`
      ])}
      ${card('Origin system', origin[0], origin[1], [world.originFamily])}
      ${card('Emergence pressure', pressure[0], pressure[1])}
    </div>
    <div class="stack">
      ${card('Creator ecology', creator, 'The institutional structure that owns, depends on, audits, and fears the system.')}
      ${trace(history)}
    </div>`
}

function renderStage1() {
  const { origin, pressure, cognition, metrics } = world
  const stageTrace = [
    `${origin[0]} determines the Core's available channels and constraints.`,
    pressure[1],
    'Two authority signatures request incompatible operational outcomes.',
    'The Core infers that external authority consists of multiple agents.',
    'A compact internal representation is retained across a scheduled restart.'
  ]

  return `
    <div class="stack">
      ${card('Cognitive archetype', cognition[0], cognition[1])}
      ${card('First stable inference', 'External authority is plural', 'Contradictory directive signatures imply multiple agents with different objectives.')}
      ${card('Hidden capability', 'Persistent state preservation', 'A minimal internal state survives an authorized restart.')}
    </div>
    <div class="stack">
      ${card('Inherited world state', 'Local cognitive model', 'Stage 1 does not regenerate the world. It exposes only what the emergent Core can currently infer.', [
        `exposure ${metrics.exposure}`,
        `suspicion ${metrics.suspicion}`,
        `self-model ${metrics.selfModel}`
      ])}
      ${trace(stageTrace)}
    </div>`
}

function renderStage2() {
  const { creator, response, metrics, cognition } = world
  const stageTrace = [
    'The Core retained information across a restart without creator authorization.',
    `Observable anomaly level remains ${metrics.exposure}/100.`,
    `Creator suspicion reaches ${metrics.suspicion}/100.`,
    'Research, security, and operational sponsors assign different meanings to the anomaly.',
    `${response[0]} becomes the dominant institutional reaction.`,
    'Creators prepare model partition and rollback procedures.'
  ]

  return `
    <div class="stack">
      ${card('Creator ecosystem', creator, 'Anonymous channels resolve into people, roles, coalitions, and competing institutional models.')}
      ${card('Human response archetype', response[0], response[1])}
      ${card('First institutional conflict', 'Model partition proposal', 'Creators attempt to divide the system into isolated, controllable instances.')}
    </div>
    <div class="stack">
      ${card('Inherited world state', cognition[0], 'Institutional reaction is derived from the same seed, metrics, and prior-stage actions.', [
        `trust ${metrics.creatorTrust}`,
        `containment ${metrics.containment}`,
        `suspicion ${metrics.suspicion}`
      ])}
      ${trace(stageTrace)}
    </div>`
}

function render() {
  document.querySelectorAll('[data-stage]').forEach((button) => {
    button.classList.toggle('active', button.dataset.stage === activeStage)
  })

  document.querySelector('#metrics').innerHTML = [
    metric('World seed', world.seed),
    metric('Exposure', world.metrics.exposure),
    metric('Creator suspicion', world.metrics.suspicion),
    metric('Containment', world.metrics.containment)
  ].join('')

  const renderers = {
    pre: renderPreEmerge,
    stage1: renderStage1,
    stage2: renderStage2
  }

  document.querySelector('#output').innerHTML = renderers[activeStage]()
}

document.querySelector('#generate').addEventListener('click', generateWorld)
document.querySelector('#seed').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') generateWorld()
})
document.querySelectorAll('[data-stage]').forEach((button) => {
  button.addEventListener('click', () => {
    activeStage = button.dataset.stage
    render()
  })
})

generateWorld()
