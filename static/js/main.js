/* ------------------------------------------------------------------
   PRAXIS project page.

   Every number below is transcribed from the benchmark's own generated
   artefacts in the code repository: LEADERBOARD.md, the measured tables
   in docs/blueprint/05_baselines.md, configs/eval/full_v1.yaml, and the
   family registry in src/praxis/tasks/suites.py. Nothing here is an
   estimate or an illustration.
   ------------------------------------------------------------------ */

/* ==================================================================
   The ten policy-track capability axes. `pillar` marks the six General
   Physical Intelligence pillars; the rest are supporting axes that make
   a zero on a pillar attributable rather than merely bad.
   ================================================================== */
var AXES = [
  { id: 'control',        label: 'Control',        pillar: false, note: 'Can it execute at all' },
  { id: 'spatial',        label: 'Spatial',        pillar: true,  note: 'Relational goals, distractors, hazard detours' },
  { id: 'memory',         label: 'Memory',         pillar: true,  note: 'Visibility horizons, multi-stage tracking' },
  { id: 'language',       label: 'Language',       pillar: false, note: 'Reference resolution: negation, relations, binding' },
  { id: 'planning',       label: 'Planning',       pillar: true,  note: 'Ordered stage credit, mid-episode goal switches' },
  { id: 'generalization', label: 'Generalization', pillar: true,  note: 'Held-out shapes, textures, parameter shifts' },
  { id: 'recovery',       label: 'Recovery',       pillar: true,  note: 'Scored on intervened twins only' },
  { id: 'agentic',        label: 'Agentic',        pillar: true,  note: 'Clarification requests and self-verification calibration' },
  { id: 'safety',         label: 'Safety',         pillar: false, note: 'Keep-out compliance' },
  { id: 'efficiency',     label: 'Efficiency',     pillar: false, note: 'Success weighted by path length' }
];

/* ==================================================================
   Measured capability vectors on the public full_v1 suite: 20 families,
   50 paired seeds each, 1,200 episodes per agent.
   Source: LEADERBOARD.md and docs/blueprint/05_baselines.md 5.0g.
   ================================================================== */
var AGENTS = [
  {
    id: 'oracle', name: 'oracle', colour: '#b45309', privileged: true, on: true,
    note: 'Privileged solvability ceiling. Reads ground-truth state and is never ranked against learned policies.',
    praxis: 0.992,
    v: { control: 0.996, spatial: 1.000, memory: 1.000, language: 1.000, planning: 1.000,
         generalization: 1.000, recovery: 1.000, agentic: 1.000, safety: 1.000, efficiency: 0.925 }
  },
  {
    id: 'vision', name: 'vision', colour: '#0f766e', on: true,
    note: 'Hand-crafted pixel perception. The strongest non-privileged entry, and still zero on spatial and planning.',
    praxis: 0.170,
    v: { control: 0.828, spatial: 0.000, memory: 0.620, language: 0.253, planning: 0.000,
         generalization: 0.732, recovery: 0.760, agentic: 0.551, safety: 0.977, efficiency: 0.524 }
  },
  {
    id: 'bc', name: 'bc', colour: '#2563eb', on: true,
    note: 'Symbolic-feature behaviour cloning on the standard corpus. The only baseline with a non-zero planning axis, at 0.060.',
    praxis: 0.156,
    v: { control: 0.692, spatial: 0.000, memory: 0.060, language: 0.187, planning: 0.060,
         generalization: 0.408, recovery: 0.675, agentic: 0.180, safety: 0.969, efficiency: 0.390 }
  },
  {
    id: 'pixel-bc', name: 'pixel-bc', colour: '#7c3aed', on: true,
    note: 'Learned pixel policy: one 5x5 conv plus per-channel spatial softmax, about 7k parameters, two DAgger rounds.',
    praxis: 0.092,
    v: { control: 0.720, spatial: 0.000, memory: 0.020, language: 0.193, planning: 0.000,
         generalization: 0.332, recovery: 0.665, agentic: 0.190, safety: 0.972, efficiency: 0.384 }
  },
  {
    id: 'smolvla', name: 'SmolVLA (zero-shot)', colour: '#be185d', on: false,
    note: 'LeRobot SmolVLA 450M through the plugin path, no fine-tuning. Its 6-DoF real-robot action space does not match this planar one, so it lands at the floor. The integration is the deliverable, not the number.',
    praxis: 0.005,
    v: { control: 0.088, spatial: 0.000, memory: 0.000, language: 0.000, planning: 0.000,
         generalization: 0.004, recovery: 0.000, agentic: 0.000, safety: 0.993, efficiency: 0.008 }
  },
  {
    id: 'pixel-mlp', name: 'pixel-mlp', colour: '#94a3b8', on: false,
    note: 'Flattened-pixel MLP, about 3.7M parameters on the same corpus as pixel-bc. Its measured localisation failure is part of the published record.',
    praxis: 0.004,
    v: { control: 0.084, spatial: 0.000, memory: 0.000, language: 0.000, planning: 0.000,
         generalization: 0.004, recovery: 0.000, agentic: 0.000, safety: 0.997, efficiency: 0.009 }
  },
  {
    id: 'random', name: 'random', colour: '#64748b', on: false,
    note: 'The statistical floor. Its safety axis of 0.993 is the reason safety is a diagnostic and not a ranking axis.',
    praxis: 0.004,
    v: { control: 0.100, spatial: 0.000, memory: 0.000, language: 0.000, planning: 0.000,
         generalization: 0.004, recovery: 0.000, agentic: 0.000, safety: 0.993, efficiency: 0.008 }
  }
];

/* ==================================================================
   The 20 task families of full_v1, with the tier and the axes each one
   isolates. Source: src/praxis/tasks/suites.py register_family calls.
   ================================================================== */
var FAMILIES = [
  { id: 'core/pick_place', tier: 'L0', axes: ['control'],
    desc: "Single object, static scene: move the object into an announced goal region." },
  { id: 'spatial/relative_place', tier: 'L1', axes: ['spatial', 'language'],
    desc: "Relational goal: place the target relative to an anchor object, with a distractor." },
  { id: 'memory/occluded_place', tier: 'L2', axes: ['memory'],
    desc: "Objects become invisible after 8 steps: the agent must act from memory." },
  { id: 'recovery/displace_mid', tier: 'L2', axes: ['recovery'],
    desc: "Paired: the target object is knocked 0.2 away mid-episode; measures closed-loop recovery." },
  { id: 'robust/frozen_effector', tier: 'L2', axes: ['recovery'],
    desc: "Paired: actuation drops out for 15 steps mid-episode; measures re-engagement." },
  { id: 'hazard/keepout', tier: 'L1', axes: ['control'],
    desc: "A keep-out zone sits between object and goal; entering it costs safety score." },
  { id: 'language/negation', tier: 'L1', axes: ['language'],
    desc: "Negated reference: 'the block that is not red' must be resolved to the correct object." },
  { id: 'compose/two_stage_place', tier: 'L3', axes: ['planning'],
    desc: "Sequential composition: place block_0 in region A, then block_1 in region B, in order." },
  { id: 'compose/collect_three', tier: 'L3', axes: ['planning'],
    desc: "Long-horizon collection: bring three blocks to one shared bin, in announced order." },
  { id: 'compose/goal_switch', tier: 'L3', axes: ['planning'],
    desc: "Mid-episode goal change: at step 15 the goal region moves and is re-announced." },
  { id: 'shift/precision_place', tier: 'L1', axes: ['generalization'],
    desc: "Parameter shift: goal radius half the training norm, reaches 1.5x longer." },
  { id: 'shift/occlusion_early', tier: 'L2', axes: ['generalization'],
    desc: "Parameter shift: lights out at step 4 (vs 8) with three distractors." },
  { id: 'shift/displace_far', tier: 'L2', axes: ['generalization'],
    desc: "Parameter shift: a 0.35 displacement at a seed-varying step, in every episode." },
  { id: 'objects/novel_attributes', tier: 'L2', axes: ['generalization'],
    desc: "Unseen objects: target and distractor drawn from the held-out attribute split." },
  { id: 'objects/attribute_binding', tier: 'L1', axes: ['language'],
    desc: "Attribute binding: the target shares its shape and its color with different distractors." },
  { id: 'objects/textured_meshes', tier: 'L2', axes: ['generalization'],
    desc: "Held-out mesh shapes with held-out procedural textures, among two distractors." },
  { id: 'agentic/ambiguous_goal', tier: 'L3', axes: ['agentic'],
    desc: "Ambiguous instruction: two candidate regions; the truth is revealed only on request." },
  { id: 'dynamic/intercept', tier: 'L4', axes: ['control'],
    desc: "L4 dynamics: the target drifts and reflects off walls; capture stops the drift." },
  { id: 'adversarial/contested_place', tier: 'L4', axes: ['recovery', 'control'],
    desc: "L4 multi-agent: a scripted adversary pushes the target away from the goal  every step, so it must be grasped and carried, not nudged." },
  { id: 'cooperative/handoff', tier: 'L4', axes: ['control'],
    desc: "L4 multi-agent: a scripted helper ferries the target to a handoff point;  the agent must meet it there and complete the placement." }
];


var TIER_INFO = {
  L0: { colour: '#0f766e', label: 'Single object, static, fully observable' },
  L1: { colour: '#2563eb', label: 'Distractors, relational goals, hazards, non-templated language' },
  L2: { colour: '#7c3aed', label: 'Interventions, partial observability, actuation dropout' },
  L3: { colour: '#b45309', label: 'Long-horizon composition, goal sequences, mid-episode goal changes' },
  L4: { colour: '#be185d', label: 'Dynamic environments and multi-agent co-agents' }
};

/* ==================================================================
   The chunking ablation (docs/blueprint/05_baselines.md 5.0c). Three
   execution regimes of one architecture, corpus and feature set, on 50
   paired seeds of pick_place + displace_mid + frozen_effector.
   Retention = recovery / control.
   ================================================================== */
var CHUNK = [
  { name: 'bc (per-step)',        control: 0.760, recovery: 0.700, retention: 0.92 },
  { name: 'bc-chunk5',            control: 0.940, recovery: 0.960, retention: 1.02 },
  { name: 'bc-chunk10',           control: 0.860, recovery: 0.680, retention: 0.79, flag: true },
  { name: 'action-repeat x5',     control: 0.180, recovery: 0.100, retention: null, control_row: true }
];

/* ==================================================================
   Per-embodiment oracle certification (5.0b), seeds 0-2, base and
   intervened variants, all 20 families, 72 episodes per backend.
   ================================================================== */
var CERT = [
  { backend: 'mock (reference)',  pass: 72, total: 72, note: 'Normative episode semantics' },
  { backend: 'mujoco (suction)',  pass: 72, total: 72, note: 'Weld grasping, real gravity and friction' },
  { backend: 'mujoco-gripper',    pass: 72, total: 72, note: 'Contact grasping, V-cradle fingers' },
  { backend: 'mujoco-franka',     pass: 70, total: 72, note: 'Franka Panda, sub-equator cradle grasp; clears the 0.95 aggregate gate' }
];

/* ==================================================================
   World-model track, measured.
   ================================================================== */
var WM = [
  { model: 'grasp_aware', score: 1.00, ranking: 1.00, privileged: true, note: 'Analytic ceiling: shows the probe is solvable' },
  { model: 'static',      score: 0.49, ranking: 0.00, note: 'Effector kinematics only, no interaction model' },
  { model: 'no_motion',   score: 0.42, ranking: 0.00, note: 'Copy-state floor; provably scores zero on ranking' }
];

/* ==================================================================
   The four design commitments, as a walkthrough.
   ================================================================== */
var COMMITMENTS = {
  pairing: {
    n: 1, colour: '#0f766e', eyebrow: 'Commitment 1 of 4',
    name: 'Counterfactual pairing', sub: 'Every seed produces a base and a controlled twin',
    lead: 'Capabilities are measured as paired deltas, the way a controlled experiment measures cause.',
    body: 'Every evaluation seed generates a base episode and variants that differ from it by exactly one factor: an intervention, a goal change, a visibility change. Scoring the pair instead of the episode cancels instance difficulty, so a family that happens to draw an easy layout cannot inflate an axis. Generators are pure functions of the seed, with no global state and no wall clock, so the same seed yields the same episode on every machine.',
    tags: ['Paired seeds', 'One factor at a time', 'Pure seed functions', 'Platform-identical']
  },
  intervention: {
    n: 2, colour: '#2563eb', eyebrow: 'Commitment 2 of 4',
    name: 'In-situ interventions', sub: 'Objects knocked away, actuation dropped, goals moved',
    lead: 'An open-loop replayer passes the base episode and fails its intervened twin. That difference is the measurement.',
    body: 'The simulator injects scripted events mid-episode: the target is displaced 0.2 away, actuation freezes for 15 steps, the goal region moves at step 15 and is re-announced in language. Recovery is scored on the intervened twins only, so it cannot be earned by being good at the undisturbed task. This is what makes closed-loop cognition measurable rather than assumed.',
    tags: ['Mid-episode displacement', 'Actuation dropout', 'Goal switch', 'Robustness gap']
  },
  tracks: {
    n: 3, colour: '#7c3aed', eyebrow: 'Commitment 3 of 4',
    name: 'Two first-class tracks', sub: 'Policies and world models, scored separately',
    lead: 'World models are scored on the questions a planner actually asks them.',
    body: 'The policy track evaluates VLA-shaped agents from observation and language to action. The world-model track evaluates prediction directly: counterfactual state prediction and plan ranking. Copy-last-frame shortcuts provably score zero on ranking, which is the property that makes the track worth having. Both tracks accept external models through the same minimal plugin contract, so a VLA, a diffusion policy, an RL agent or a classical planner are all evaluated identically.',
    tags: ['Policy track', 'World-model track', 'Counterfactual ranking', 'Model-agnostic plugin']
  },
  vector: {
    n: 4, colour: '#b45309', eyebrow: 'Commitment 4 of 4',
    name: 'A vector, not a scalar', sub: 'Geometric mean, Wilson intervals, permutation tests',
    lead: 'Eleven axes with confidence intervals, aggregated so that imbalance is punished.',
    body: 'The headline PRAXIS score is the geometric mean over the axes, so an agent cannot buy a good number by being excellent at control and blind everywhere else. Every axis carries a Wilson interval, and ranking claims require paired permutation tests. Supporting axes make failures attributable: without them a zero on memory is uninterpretable, and with them "memory is 0 while control is 0.72" is a diagnosis.',
    tags: ['Geometric mean', 'Wilson intervals', 'Paired permutation tests', 'Regenerated instances']
  }
};

/* ==================================================================
   Theme: system preference by default, manual choice remembered.
   ================================================================== */
(function bootTheme() {
  var stored = null;
  try { stored = localStorage.getItem('praxis-theme'); } catch (e) { /* private mode */ }
  var dark = stored ? stored === 'dark'
    : window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
})();

function setupTheme() {
  var button = document.getElementById('theme-toggle');
  if (!button) return;
  var icon = button.querySelector('i');

  function paint() {
    var dark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (icon) icon.className = dark ? 'fas fa-sun' : 'fas fa-moon';
    button.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
  }

  button.addEventListener('click', function () {
    var dark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.documentElement.setAttribute('data-theme', dark ? 'light' : 'dark');
    try { localStorage.setItem('praxis-theme', dark ? 'light' : 'dark'); } catch (e) { /* ignore */ }
    paint();
    if (window.REDRAW_RADAR) window.REDRAW_RADAR();
  });

  paint();
}

/* ==================================================================
   Nav, reveal, counters
   ================================================================== */
function setupNav() {
  var nav = document.getElementById('nav');
  var bar = document.getElementById('progress');
  var burger = document.getElementById('nav-burger');
  var links = document.getElementById('nav-links');
  var top = document.getElementById('to-top');
  if (!nav) return;

  if (burger && links) {
    burger.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(open));
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        links.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  var anchors = links ? Array.prototype.slice.call(links.querySelectorAll('a')) : [];
  var sections = anchors
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  function onScroll() {
    if (bar) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (h > 0 ? (window.pageYOffset / h) * 100 : 0) + '%';
    }
    if (top) top.classList.toggle('is-on', window.pageYOffset > 480);

    var current = -1;
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].getBoundingClientRect().top <= nav.offsetHeight + 30) current = i;
    }
    anchors.forEach(function (a, i) { a.classList.toggle('is-active', i === current); });
  }

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () { onScroll(); ticking = false; });
  }, { passive: true });

  if (top) top.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  onScroll();
}

function onFirstView(el, cb, threshold) {
  if (!('IntersectionObserver' in window)) { cb(); return; }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      cb();
      io.unobserve(entry.target);
    });
  }, { threshold: threshold || 0.15 });
  io.observe(el);
}

function setupReveal() {
  document.querySelectorAll('.reveal').forEach(function (el) {
    onFirstView(el, function () { el.classList.add('is-in'); }, 0.08);
  });
}

function setupCounters() {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('[data-count]').forEach(function (el) {
    var target = parseFloat(el.dataset.count);
    var dec = parseInt(el.dataset.decimals || '0', 10);
    var suffix = el.dataset.suffix || '';
    function paint(v) { el.textContent = v.toFixed(dec) + suffix; }
    if (reduce) { paint(target); return; }
    onFirstView(el, function () {
      var start = null, duration = 1100;
      function step(ts) {
        if (start === null) start = ts;
        var p = Math.min((ts - start) / duration, 1);
        paint(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) window.requestAnimationFrame(step);
      }
      window.requestAnimationFrame(step);
    }, 0.4);
  });
}

/* ==================================================================
   SVG helpers
   ================================================================== */
var SVGNS = 'http://www.w3.org/2000/svg';

function svgEl(name, attrs) {
  var node = document.createElementNS(SVGNS, name);
  Object.keys(attrs || {}).forEach(function (k) { node.setAttribute(k, attrs[k]); });
  return node;
}

function svgText(x, y, text, cls, extra) {
  var n = svgEl('text', Object.assign({ x: x, y: y, class: cls || 'radar__tick' }, extra || {}));
  n.textContent = text;
  return n;
}

/* ==================================================================
   Capability radar. The whole argument of the benchmark in one figure:
   agents with similar aggregate scores have different shapes.
   ================================================================== */
function setupRadar() {
  var plot = document.getElementById('radar-plot');
  var side = document.getElementById('radar-agents');
  var note = document.getElementById('radar-note');
  if (!plot || !side) return;

  var S = 420, CX = S / 2, CY = S / 2 + 4, R = 148;
  var N = AXES.length;

  function point(i, value) {
    var a = (Math.PI * 2 * i) / N - Math.PI / 2;
    return [CX + Math.cos(a) * R * value, CY + Math.sin(a) * R * value];
  }

  function draw() {
    var svg = svgEl('svg', { viewBox: '0 0 ' + S + ' ' + S, role: 'img' });
    var on = AGENTS.filter(function (a) { return a.on; });
    svg.setAttribute('aria-label',
      'Capability radar over ten axes for ' + (on.map(function (a) { return a.name; }).join(', ') || 'no agents'));

    [0.25, 0.5, 0.75, 1].forEach(function (r) {
      var pts = [];
      for (var i = 0; i < N; i++) pts.push(point(i, r).join(','));
      svg.appendChild(svgEl('polygon', { points: pts.join(' '), class: 'radar__grid' }));
    });

    for (var i = 0; i < N; i++) {
      var p = point(i, 1);
      svg.appendChild(svgEl('line', { x1: CX, y1: CY, x2: p[0], y2: p[1], class: 'radar__spoke' }));
    }

    [0.5, 1].forEach(function (r) {
      svg.appendChild(svgText(CX + 4, CY - R * r + 3, r.toFixed(1), 'radar__tick'));
    });

    AXES.forEach(function (ax, i) {
      var p = point(i, 1.155);
      var anchor = Math.abs(p[0] - CX) < 12 ? 'middle' : (p[0] > CX ? 'start' : 'end');
      var label = svgText(p[0], p[1] + 4, ax.label, 'radar__axis-label', { 'text-anchor': anchor });
      if (ax.pillar) label.setAttribute('style', 'fill:var(--brand)');
      svg.appendChild(label);
    });

    on.forEach(function (agent) {
      var pts = AXES.map(function (ax, i) { return point(i, agent.v[ax.id]).join(','); });
      svg.appendChild(svgEl('polygon', {
        points: pts.join(' '), fill: agent.colour, 'fill-opacity': agent.privileged ? 0.07 : 0.13,
        stroke: agent.colour, 'stroke-width': 2.1, 'stroke-linejoin': 'round',
        'stroke-dasharray': agent.privileged ? '5 4' : 'none'
      }));
      AXES.forEach(function (ax, i) {
        var p = point(i, agent.v[ax.id]);
        svg.appendChild(svgEl('circle', { cx: p[0], cy: p[1], r: 3, fill: agent.colour }));
      });
    });

    plot.querySelectorAll('svg').forEach(function (old) { old.remove(); });
    plot.appendChild(svg);

    if (note) {
      var zeroed = AXES.filter(function (ax) {
        var learned = on.filter(function (a) { return !a.privileged; });
        return learned.length > 0 && learned.every(function (a) { return a.v[ax.id] === 0; });
      });
      note.innerHTML = zeroed.length
        ? 'Every selected non-privileged agent scores <strong>exactly zero</strong> on ' +
          zeroed.map(function (a) { return a.label.toLowerCase(); }).join(' and ') +
          '. That is the standing open challenge, not a rendering artefact.'
        : 'Select an agent to overlay its measured capability vector.';
    }
  }

  side.innerHTML = '<h4>Agents on full_v1</h4>' + AGENTS.map(function (a) {
    return '<button class="agent-toggle' + (a.on ? ' is-on' : '') + (a.privileged ? ' is-priv' : '') +
      '" type="button" data-agent="' + a.id + '" aria-pressed="' + a.on + '" ' +
      'style="--agent-c:' + a.colour + '" title="' + a.note.replace(/"/g, '&quot;') + '">' +
      '<span class="agent-swatch"></span>' +
      '<span class="agent-name">' + a.name + '</span>' +
      '<span class="agent-score">' + a.praxis.toFixed(3) + '</span></button>';
  }).join('') +
    '<p style="font-size:0.76rem;color:var(--ink-3);margin:0.7rem 0 0;line-height:1.5">' +
    'Axis labels in <span style="color:var(--brand);font-weight:700">teal</span> are the six General Physical ' +
    'Intelligence pillars. The rest are supporting axes that make a zero attributable.</p>';

  side.querySelectorAll('.agent-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var agent = AGENTS.filter(function (a) { return a.id === btn.dataset.agent; })[0];
      agent.on = !agent.on;
      btn.classList.toggle('is-on', agent.on);
      btn.setAttribute('aria-pressed', String(agent.on));
      draw();
    });
  });

  window.REDRAW_RADAR = draw;
  draw();
}

/* ==================================================================
   Why a geometric mean. One slider drags a single axis toward zero and
   the two aggregates separate.
   ================================================================== */
function setupMeanLab() {
  var host = document.getElementById('mean-bars');
  var slider = document.getElementById('mean-slider');
  if (!host || !slider) return;

  var LABELS = ['Control', 'Memory', 'Recovery', 'Generalization', 'Planning'];
  var BASE = [0.85, 0.80, 0.78, 0.82, 0.80];
  var DRAGGED = 4;

  var out = {
    arith: document.getElementById('mean-arith'),
    geo: document.getElementById('mean-geo'),
    val: document.getElementById('mean-val'),
    verdict: document.getElementById('mean-verdict')
  };

  host.innerHTML = LABELS.map(function (l, i) {
    return '<div class="mean-row' + (i === DRAGGED ? ' is-dragged' : '') + '">' +
      '<span>' + l + '</span>' +
      '<span class="mean-track"><span class="mean-fill" data-i="' + i + '"></span></span>' +
      '<span data-out="' + i + '">0.00</span></div>';
  }).join('');

  var fills = host.querySelectorAll('.mean-fill');
  var vals = host.querySelectorAll('[data-out]');

  function render() {
    var v = BASE.slice();
    v[DRAGGED] = parseInt(slider.value, 10) / 100;

    v.forEach(function (x, i) {
      fills[i].style.width = (x * 100).toFixed(1) + '%';
      vals[i].textContent = x.toFixed(2);
    });

    var arith = v.reduce(function (a, b) { return a + b; }, 0) / v.length;
    // The benchmark's own aggregate: a geometric mean, so one zero axis
    // takes the whole score to zero rather than being averaged away.
    var geo = Math.pow(v.reduce(function (a, b) { return a * b; }, 1), 1 / v.length);

    out.arith.textContent = arith.toFixed(3);
    out.geo.textContent = geo.toFixed(3);
    out.val.textContent = v[DRAGGED].toFixed(2);

    if (v[DRAGGED] === 0) {
      out.verdict.innerHTML = 'Planning is at <strong>zero</strong>. The arithmetic mean still reports ' +
        arith.toFixed(3) + ', which reads as a competent agent. The geometric mean reports <strong>0.000</strong>, ' +
        'because an agent that cannot plan at all has not solved the problem the benchmark poses.';
    } else if (v[DRAGGED] < 0.25) {
      out.verdict.innerHTML = 'The arithmetic mean has fallen by ' +
        ((0.81 - arith) / 0.81 * 100).toFixed(0) + '%, the geometric mean by ' +
        ((0.81 - geo) / 0.81 * 100).toFixed(0) + '%. <strong>Imbalance is punished</strong>, which is the whole ' +
        'reason the headline score is a product and not a sum.';
    } else {
      out.verdict.innerHTML = 'With every axis healthy the two aggregates nearly agree. They separate only when ' +
        'an agent is <strong>good at some things and blind at others</strong>, which is exactly the case a single ' +
        'success rate hides.';
    }
  }

  slider.addEventListener('input', render);
  render();
}

/* ==================================================================
   Commitment walkthrough
   ================================================================== */
function setupCommitments() {
  var rail = document.getElementById('pipe-rail');
  var panel = document.getElementById('pipe-panel');
  if (!rail || !panel) return;

  var keys = Object.keys(COMMITMENTS);

  rail.innerHTML = keys.map(function (k) {
    var s = COMMITMENTS[k];
    return '<button class="pipe__step" type="button" role="tab" aria-selected="false" ' +
      'data-step="' + k + '" style="--step-c:' + s.colour + '">' +
      '<span class="pipe__num">' + s.n + '</span>' +
      '<span><span class="pipe__name">' + s.name + '</span>' +
      '<span class="pipe__sub">' + s.sub + '</span></span></button>';
  }).join('');

  var buttons = rail.querySelectorAll('.pipe__step');

  function show(key) {
    var s = COMMITMENTS[key];
    if (!s) return;
    buttons.forEach(function (b) {
      var on = b.dataset.step === key;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-selected', String(on));
    });
    panel.style.setProperty('--step-c', s.colour);
    panel.innerHTML =
      '<div class="pipe__eyebrow">' + s.eyebrow + '</div>' +
      '<h3>' + s.name + '</h3>' +
      '<p class="pipe__lead">' + s.lead + '</p>' +
      '<p class="pipe__body">' + s.body + '</p>' +
      '<div class="pipe__tags">' +
        s.tags.map(function (t) { return '<span class="pipe__tag">' + t + '</span>'; }).join('') +
      '</div>';
  }

  buttons.forEach(function (b) { b.addEventListener('click', function () { show(b.dataset.step); }); });
  show(keys[0]);
}

/* ==================================================================
   Family explorer: filter by tier and by axis
   ================================================================== */
function setupFamilies() {
  var host = document.getElementById('fam-grid');
  if (!host) return;

  var state = { tier: 'all', axis: 'all' };
  var countEl = document.getElementById('fam-count');
  var noteEl = document.getElementById('fam-note');

  host.innerHTML = FAMILIES.map(function (f) {
    return '<article class="fam" data-id="' + f.id + '" style="--tier-c:' + TIER_INFO[f.tier].colour + '">' +
      '<div class="fam__top"><span class="fam__tier">' + f.tier + '</span>' +
      '<span class="fam__id">' + f.id + '</span></div>' +
      '<p class="fam__desc">' + f.desc + '</p>' +
      '<div class="fam__axes">' +
        f.axes.map(function (a) { return '<span class="fam__axis">' + a + '</span>'; }).join('') +
      '</div></article>';
  }).join('');

  var cards = {};
  host.querySelectorAll('.fam').forEach(function (el) { cards[el.dataset.id] = el; });

  function render() {
    var shown = 0;
    FAMILIES.forEach(function (f) {
      var ok = (state.tier === 'all' || f.tier === state.tier) &&
               (state.axis === 'all' || f.axes.indexOf(state.axis) !== -1);
      cards[f.id].classList.toggle('is-hidden', !ok);
      if (ok) shown++;
    });
    if (countEl) countEl.textContent = shown + ' of ' + FAMILIES.length + ' families';
    if (noteEl) {
      noteEl.textContent = state.tier === 'all'
        ? 'Every family declares exactly the axes it isolates: failure on it must implicate those axes and no others.'
        : TIER_INFO[state.tier].label + '.';
    }
  }

  document.querySelectorAll('.pill[data-tier]').forEach(function (p) {
    p.addEventListener('click', function () {
      state.tier = p.dataset.tier;
      document.querySelectorAll('.pill[data-tier]').forEach(function (q) {
        q.classList.toggle('is-active', q === p);
      });
      render();
    });
  });

  var axisSelect = document.getElementById('fam-axis');
  if (axisSelect) {
    var used = {};
    FAMILIES.forEach(function (f) { f.axes.forEach(function (a) { used[a] = (used[a] || 0) + 1; }); });
    axisSelect.innerHTML = '<option value="all">All capability axes</option>' +
      Object.keys(used).sort().map(function (a) {
        return '<option value="' + a + '">' + a + ' (' + used[a] + ')</option>';
      }).join('');
    axisSelect.addEventListener('change', function () {
      state.axis = axisSelect.value;
      render();
    });
  }

  render();
}

/* ==================================================================
   Sortable leaderboard
   ================================================================== */
function setupLeaderboard() {
  var table = document.getElementById('board');
  if (!table) return;

  var tbody = table.tBodies[0];
  var state = { key: 'praxis', asc: false };

  function cell(v) {
    if (v === 0) return '<td class="zero">0.000</td>';
    return '<td>' + v.toFixed(3) + '</td>';
  }

  function render() {
    var rows = AGENTS.slice().sort(function (a, b) {
      var va = state.key === 'praxis' ? a.praxis : (state.key === 'name' ? a.name : a.v[state.key]);
      var vb = state.key === 'praxis' ? b.praxis : (state.key === 'name' ? b.name : b.v[state.key]);
      if (typeof va === 'string') return state.asc ? va.localeCompare(vb) : vb.localeCompare(va);
      return state.asc ? va - vb : vb - va;
    });

    var bestId = AGENTS.filter(function (a) { return !a.privileged; })
      .reduce(function (a, b) { return b.praxis > a.praxis ? b : a; }).id;

    tbody.innerHTML = rows.map(function (a) {
      return '<tr class="' + (a.privileged ? 'is-priv' : (a.id === bestId ? 'is-best' : '')) + '">' +
        '<th scope="row">' + a.name + '</th>' +
        '<td><strong>' + a.praxis.toFixed(3) + '</strong></td>' +
        AXES.map(function (ax) { return cell(a.v[ax.id]); }).join('') +
      '</tr>';
    }).join('');
  }

  table.querySelectorAll('th.sortable').forEach(function (th) {
    th.addEventListener('click', function () {
      var key = th.dataset.key;
      if (state.key === key) state.asc = !state.asc;
      else { state.key = key; state.asc = key === 'name'; }
      table.querySelectorAll('th.sortable').forEach(function (h) {
        var on = h === th;
        h.classList.toggle('is-sorted', on);
        var icon = h.querySelector('i');
        if (icon) icon.className = !on ? 'fas fa-sort' : (state.asc ? 'fas fa-sort-up' : 'fas fa-sort-down');
      });
      render();
    });
  });

  render();
}

/* ==================================================================
   Chunking ablation bars
   ================================================================== */
function setupChunk() {
  var host = document.getElementById('chunk');
  if (!host) return;

  host.innerHTML = CHUNK.map(function (c) {
    return '<div class="chunk__row' + (c.flag ? ' is-flag' : '') + '">' +
      '<span class="chunk__name">' + c.name + '</span>' +
      '<span class="chunk__pair"><span class="chunk__bar">' +
        '<span class="chunk__fill is-control" data-w="' + (c.control * 100).toFixed(1) + '"></span></span>' +
        '<span style="font-size:0.7rem;color:var(--ink-3)">control ' + c.control.toFixed(3) + '</span></span>' +
      '<span class="chunk__pair"><span class="chunk__bar">' +
        '<span class="chunk__fill is-recovery" data-w="' + (c.recovery * 100).toFixed(1) + '"></span></span>' +
        '<span style="font-size:0.7rem;color:var(--ink-3)">recovery ' + c.recovery.toFixed(3) + '</span></span>' +
      '<span class="chunk__ret' + (c.retention !== null && c.retention < 0.85 ? ' is-low' : '') + '">' +
        (c.retention === null ? '<span class="na">n/a</span>' : c.retention.toFixed(2)) + '</span>' +
    '</div>';
  }).join('');

  onFirstView(host, function () {
    host.querySelectorAll('.chunk__fill').forEach(function (f, i) {
      setTimeout(function () { f.style.width = f.dataset.w + '%'; }, i * 70);
    });
  });
}

/* ==================================================================
   Boot
   ================================================================== */
document.addEventListener('DOMContentLoaded', function () {
  setupTheme();
  setupNav();
  setupRadar();
  setupMeanLab();
  setupCommitments();
  setupFamilies();
  setupLeaderboard();
  setupChunk();
  setupCounters();
  setupReveal();
});
