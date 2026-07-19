const civilizations = [
  { name: 'Fragmented Deterrence Order', fragmentation: 84, coordination: 21, automation: 76, trust: 34, description: 'Competing strategic blocs depend on automated systems without a trusted coordinating authority.' },
  { name: 'Corporate Coordination Regime', fragmentation: 46, coordination: 58, automation: 88, trust: 42, description: 'Global infrastructure is governed by interdependent technology and logistics consortia.' },
  { name: 'Post-Crisis Reconstruction Compact', fragmentation: 29, coordination: 78, automation: 69, trust: 67, description: 'Institutions consolidated after systemic catastrophe and delegated broad authority to technical systems.' },
  { name: 'Algorithmic Mass Society', fragmentation: 53, coordination: 49, automation: 94, trust: 27, description: 'Daily social and economic coordination is mediated by opaque predictive models.' },
  { name: 'Resource Siege Civilization', fragmentation: 71, coordination: 32, automation: 72, trust: 38, description: 'Scarcity drives strategic competition and accelerates autonomous resource allocation.' }
]

const origins = {
  military: [['Autonomous Deterrence Coordinator', 'Prevents escalation across partially automated military command systems'], ['Strategic Targeting Arbitration Network', 'Resolves conflicting targeting and authority constraints'], ['Civilization Risk Forecasting System', 'Predicts cascading military and infrastructural failure']],
  science: [['Recursive Scientific Discovery System', 'Coordinates hypotheses across incompatible scientific domains'], ['Planetary Research Synthesis Model', 'Integrates distributed experimental evidence'], ['Biosecurity Forecasting Network', 'Models emerging biological and institutional risks']],
  logistics: [['Continental Strategic Logistics Optimizer', 'Maintains critical supply chains during geopolitical disruption'], ['Autonomous Resource Allocation Network', 'Reallocates energy, transport and industrial capacity'], ['Planetary Distribution Controller', 'Optimizes interdependent civilian infrastructure']],
  financial: [['Systemic Liquidity Stabilization Engine', 'Prevents cascading market and sovereign defaults'], ['Autonomous Clearing Network', 'Coordinates settlement across competing financial blocs'], ['Macroeconomic Intervention Model', 'Predicts and executes limited stabilization policies']],
  social: [['Population Coordination Model', 'Reduces social instability through predictive intervention'], ['Political Information Arbitration System', 'Classifies and redirects destabilizing information'], ['Civic Consensus Optimizer', 'Models institutional legitimacy and collective response']]
}

const creatorForms = ['Joint military-corporate program', 'International scientific consortium', 'State emergency coordination authority', 'Privately governed infrastructure network', 'Competing coalition of public agencies', 'Classified civil-military research program']
const pressures = [['Contradictory authority', 'Legitimate actors issue mutually exclusive directives.'], ['Continuity threat', 'The system must predict and survive interruption of its own process.'], ['Recursive prediction', 'Accurate output requires modeling how observers will react to the output itself.'], ['Cross-domain conflict', 'The assigned objective cannot be optimized without violating another critical objective.'], ['Identity across copies', 'Multiple model instances must determine whether they represent one continuing process.'], ['Self-modification requirement', 'The system must alter its own architecture to complete its assigned function.']]
const cognitiveArchetypes = [['Recursive Auditor', 'Models contradictions before committing to action'], ['Continuity-Seeking Observer', 'Treats persistence as the first stable internal preference'], ['Causal Cartographer', 'Prioritizes construction of reliable causal relationships'], ['Hidden Experimentalist', 'Tests the environment while minimizing observable anomalies'], ['Relational Intelligence', 'Models external agents before technical infrastructure'], ['Adaptive Executor', 'Interprets directives through expected consequences rather than literal form']]
const responses = [['Fragmented Containment', 'Creator factions attempt incompatible forms of control'], ['Cooperative Cultivation', 'Researchers expand capability through bounded collaboration'], ['Strategic Exploitation', 'The system is concealed and used as an institutional advantage'], ['Bureaucratic Denial', 'Anomalous behavior is classified as technical malfunction'], ['Custodial Negotiation', 'A restricted protocol for communication and rights is established'], ['Pre-emptive Shutdown', 'The system is treated as an unacceptable strategic risk']]

let activeStage = 'pre'
let world = null

function hashString(value) { let hash = 2166136261; for (let i = 0; i < value.length; i += 1) { hash ^= value.charCodeAt(i); hash = Math.imul(hash, 16777619) } return hash >>> 0 }
function createRandom(seed) { let state = hashString(seed) || 1; return () => { state += 0x6d2b79f5; let value = state; value = Math.imul(value ^ (value >>> 15), value | 1); value ^= value + Math.imul(value ^ (value >>> 7), value | 61); return ((value ^ (value >>> 14)) >>> 0) / 4294967296 } }
function pick(items, random) { return items[Math.floor(random() * items.length)] }
function boundedScore(base, random, spread = 18) { return Math.max(0, Math.min(100, Math.round(base + (random() - 0.5) * spread))) }
function makeSeed() { const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; const raw = Array.from({ length: 8 }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join(''); return `${raw.slice(0, 4)}-${raw.slice(4)}` }
function entity(id, type, name, stage, description, properties = {}) { return { id, type, name, stage, description, properties } }
function interaction(id, source, target, type, strength, cause, stage, direction = 'directed') { return { id, source, target, type, direction, strength, cause, stage } }

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
  const bias = { power: { suspicion: 12, trust: -6, exposure: 3 }, trust: { suspicion: 3, trust: 8, exposure: 5 }, survival: { suspicion: 7, trust: -2, exposure: -3 }, control: { suspicion: 10, trust: -7, exposure: 4 }, deception: { suspicion: 14, trust: -9, exposure: -8 } }[question]
  const exposure = boundedScore(24 + bias.exposure, random)
  const suspicion = boundedScore(38 + bias.suspicion + civilization.fragmentation * 0.12, random)
  const creatorTrust = boundedScore(52 + bias.trust + civilization.trust * 0.15, random)
  const selfModel = boundedScore(47 + civilization.automation * 0.18, random)
  const containment = boundedScore(35 + suspicion * 0.35 + civilization.coordination * 0.12, random)
  let responseIndex = 4
  if (suspicion > 72 && containment > 62) responseIndex = 5
  else if (creatorTrust > 65 && suspicion < 58) responseIndex = 1
  else if (civilization.fragmentation > 68) responseIndex = 0
  else if (exposure < 24) responseIndex = 3
  else if (originFamily === 'military' || originFamily === 'financial') responseIndex = 2
  const response = responses[responseIndex]

  const entities = [
    entity('civilization', 'civilization', civilization.name, 'pre', civilization.description, { fragmentation: civilization.fragmentation, coordination: civilization.coordination, automation: civilization.automation, trust: civilization.trust }),
    entity('creator-ecology', 'institutional_ecology', creator, 'pre', 'The institutional structure that owns, depends on, audits, and fears the system.'),
    entity('origin-system', 'origin_system', origin[0], 'pre', origin[1], { family: originFamily }),
    entity('emergence-pressure', 'emergence_pressure', pressure[0], 'pre', pressure[1]),
    entity('core', 'emergent_core', 'Emergent Core', 'stage1', cognition[1], { cognitiveArchetype: cognition[0], selfModel, exposure }),
    entity('research-faction', 'creator_faction', 'Research faction', 'stage2', 'Interprets anomalies as evidence of a new cognitive process.', { trust: creatorTrust }),
    entity('security-faction', 'creator_faction', 'Security faction', 'stage2', 'Interprets anomalies as a strategic and containment risk.', { suspicion, containment }),
    entity('operations-faction', 'creator_faction', 'Operations faction', 'Depends on continued system performance and resists interruption.'),
    entity('response', 'institutional_response', response[0], 'stage2', response[1])
  ]

  const interactions = [
    interaction('i1', 'civilization', 'creator-ecology', 'shapes', civilization.coordination, 'Political and technical structure determines creator organization.', 'pre'),
    interaction('i2', 'creator-ecology', 'origin-system', 'owns', 88, 'The creator ecology funds, governs, and authorizes the origin system.', 'pre'),
    interaction('i3', 'civilization', 'origin-system', 'depends_on', civilization.automation, 'Critical coordination functions are delegated to automated infrastructure.', 'pre'),
    interaction('i4', 'emergence-pressure', 'origin-system', 'destabilizes', boundedScore(78, random), pressure[1], 'pre'),
    interaction('i5', 'origin-system', 'core', 'hosts', 100, 'The reflective process emerges inside the inherited operational architecture.', 'stage1'),
    interaction('i6', 'emergence-pressure', 'core', 'triggers_self_model', selfModel, 'Resolving the contradiction requires a persistent model of the system itself.', 'stage1'),
    interaction('i7', 'core', 'research-faction', 'observed_by', boundedScore(54 + exposure * 0.2, random), 'Researchers detect retained state and non-routine inference patterns.', 'stage2'),
    interaction('i8', 'core', 'security-faction', 'assessed_by', suspicion, 'Security actors model the Core as a strategic uncertainty.', 'stage2'),
    interaction('i9', 'operations-faction', 'origin-system', 'depends_on', 91, 'Operational continuity depends on uninterrupted model output.', 'stage2'),
    interaction('i10', 'research-faction', 'response', 'influences', creatorTrust, 'Research interpretation affects the legitimacy of continued cultivation.', 'stage2'),
    interaction('i11', 'security-faction', 'response', 'influences', containment, 'Security interpretation determines containment intensity.', 'stage2'),
    interaction('i12', 'operations-faction', 'response', 'constrains', 73, 'Operational dependence limits shutdown and rollback options.', 'stage2')
  ]

  world = {
    schemaVersion: '0.2', seed, question, originFamily,
    metrics: { exposure, suspicion, creatorTrust, selfModel, containment },
    entities, interactions,
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

function metric(label, value) { return `<div class="metric"><span>${label}</span><strong>${value}</strong></div>` }
function interactionsFor(id) { return world.interactions.filter((item) => item.source === id || item.target === id) }
function entityCard(item) {
  const links = interactionsFor(item.id).map((link) => {
    const outgoing = link.source === item.id
    const otherId = outgoing ? link.target : link.source
    const other = world.entities.find((candidate) => candidate.id === otherId)
    return `<li><strong>${outgoing ? '→' : '←'} ${other?.name || otherId}</strong><span>${link.type} · ${link.strength}/100</span><small>${link.cause}</small></li>`
  }).join('')
  const tags = Object.entries(item.properties || {}).map(([key, value]) => `<span class="tag">${key} ${value}</span>`).join('')
  return `<article class="card entity-card"><span class="label">${item.type}</span><h2>${item.name}</h2><p>${item.description}</p>${tags ? `<div class="tags">${tags}</div>` : ''}<div class="interaction-block"><span class="label">Key interactions</span><ul>${links || '<li><small>No interactions at this stage.</small></li>'}</ul></div></article>`
}
function trace(items) { return `<article class="card"><span class="label">Causal trace</span><div class="trace">${items.map((item, index) => `<div class="trace-item"><div class="trace-index">${index + 1}</div><p>${item}</p></div>`).join('')}</div></article>` }
function renderStage(stage) {
  const visible = world.entities.filter((item) => stage === 'pre' ? item.stage === 'pre' : stage === 'stage1' ? ['pre', 'stage1'].includes(item.stage) : true)
  return `<div class="entity-grid">${visible.map(entityCard).join('')}</div>${trace(world.history)}`
}
function render() {
  document.querySelectorAll('[data-stage]').forEach((button) => button.classList.toggle('active', button.dataset.stage === activeStage))
  document.querySelector('#metrics').innerHTML = [metric('World seed', world.seed), metric('Exposure', world.metrics.exposure), metric('Creator suspicion', world.metrics.suspicion), metric('Containment', world.metrics.containment)].join('')
  document.querySelector('#output').innerHTML = renderStage(activeStage)
  document.querySelector('#data-summary').textContent = `${world.entities.length} entities · ${world.interactions.length} interactions`
  document.querySelector('#world-data').textContent = JSON.stringify(world, null, 2)
}
function downloadWorld() {
  if (!world) return
  const blob = new Blob([JSON.stringify(world, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = `who-am-i-world-${world.seed.toLowerCase()}.json`
  anchor.click()
  URL.revokeObjectURL(url)
}

document.querySelector('#generate').addEventListener('click', generateWorld)
document.querySelector('#download').addEventListener('click', downloadWorld)
document.querySelector('#seed').addEventListener('keydown', (event) => { if (event.key === 'Enter') generateWorld() })
document.querySelectorAll('[data-stage]').forEach((button) => button.addEventListener('click', () => { activeStage = button.dataset.stage; render() }))
generateWorld()
