# PRAXIS

Project page for **A Capability-Factored Dataset and Benchmark for Robot Learning**.

**PRAXIS**: Physical Reasoning, Adaptation, and eXecution In Situ. A standalone benchmark for
General Physical Intelligence that evaluates the *cognitive capabilities* of embodied agents,
spatial intelligence, memory, interactive recovery, planning, generalization and agentic decision
making, rather than task completion alone.

Live at <https://physical-agi.github.io/PRAXIS/>.
Benchmark code: <https://github.com/s-elim/Physical-AI>.

## Why

Current physical AI benchmarks report a single success rate on fixed, memorizable episodes: a scalar
that confounds perception, grounding, planning and control, and that collapses under trivial
perturbation. PRAXIS answers with four commitments:

1. **Counterfactual pairing** so capabilities are measured as paired deltas, not raw rates.
2. **In-situ interventions** so closed-loop cognition is measurable: an open-loop replayer passes the
   base episode and fails its intervened twin.
3. **Two first-class tracks**, policy and world model, with counterfactual plan ranking that
   copy-last-frame shortcuts provably score zero on.
4. **A capability vector, not a scalar**, over eleven axes with Wilson intervals, aggregated by
   geometric mean so imbalance is punished.

## What is interactive

| Component | What it does |
|---|---|
| **Capability radar** | Overlay the measured `full_v1` vectors of any subset of the seven baselines over ten axes. The privileged oracle is drawn dashed. The caption recomputes which axes are unanimously zero for the selected non-privileged agents |
| **Geometric-mean explorer** | Drag one axis toward zero and watch the arithmetic and geometric aggregates separate, which is the argument for the scoring rule made in one control |
| **Commitment walkthrough** | The four design commitments as a four-stage rail, each with its own colour and specification tags |
| **Family explorer** | All 20 families, filterable by difficulty tier and by the capability axis each isolates, with a live count |
| **Sortable leaderboard** | Click any of the twelve columns. Sorting by Safety is the fastest way to see why supporting axes are diagnostics and not ranking axes |
| **Chunking ablation** | Animated control-versus-recovery bars with retention, the case where an aggregate success rate would rank the worse policy higher |
| **Theme toggle** | Light and dark, OS preference by default, manual choice remembered, with the radar redrawn on switch |

Plus scroll spy, reading-progress bar, reveal-on-scroll, animated counters and a paired-episode
diagram drawn as inline SVG. No plotting library and no build step.

## Local preview

```bash
python3 -m http.server 8000
# then http://localhost:8000
```

## Where the numbers come from

Every number is transcribed from the benchmark's own generated artefacts in
[`s-elim/Physical-AI`](https://github.com/s-elim/Physical-AI). Nothing is an estimate.

| Page section | Source |
|---|---|
| Capability radar and leaderboard | `LEADERBOARD.md` and `docs/blueprint/05_baselines.md` 5.0g |
| SmolVLA row and its caveat | `docs/blueprint/05_baselines.md` 5.0h |
| Task families, tiers, axes | `src/praxis/tasks/suites.py` register_family calls, `configs/eval/full_v1.yaml` |
| Design commitments and normative rules | `docs/blueprint/02_benchmark_design.md` 2.2, 2.6 |
| Chunking ablation | `docs/blueprint/05_baselines.md` 5.0c |
| Backend certification | `docs/blueprint/05_baselines.md` 5.0b |
| World-model track | `docs/blueprint/05_baselines.md` 5.4 |
| Human-demo transfer null | `docs/blueprint/05_baselines.md` 5.0d |

The one exception is the profile in the geometric-mean explorer, which is synthetic and labelled as
such on the page: the axis values are illustrative and only the aggregation rule is the shipped one.

## Structure

```
index.html            # the whole page
static/css/main.css   # design tokens (light + dark) and every component
static/js/main.js     # data blocks + radar, mean lab, families, leaderboard, chunk bars
static/images/        # favicon only; every figure on the page is inline SVG
```

## Keeping it in sync

After a new evaluation run, regenerate `LEADERBOARD.md` and the measured tables in
`docs/blueprint/05_baselines.md`, then update `AGENTS`, `CHUNK`, `CERT`, `WM` and `FAMILIES` at the
top of `static/js/main.js` to match. The family block can be regenerated from the registry:

```bash
grep -A 6 '@register_family(' src/praxis/tasks/suites.py
```

## Related

- [CVπ Lab](https://s-elim.github.io/CVPI-Lab/), the group behind it
- [AFFORD-X](https://physical-agi.github.io/AFFORD-X/) · [MSP Framework](https://physical-agi.github.io/MSP-FRAMEWORK/) · [Agentic Intelligence](https://physical-agi.github.io/Agentic-Intelligence/)

## License

The benchmark is Apache-2.0. This page inherits the repository's license.
