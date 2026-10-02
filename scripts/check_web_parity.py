"""Prove the web page and the Python API give identical answers.

Generates random applicant profiles (including unknown facts), runs them through
urimai/rules.py and through docs/engine.js (via Node), and fails on any difference in
verdict, missing facts, or follow-up question order.
Usage:  python scripts/check_web_parity.py [count]      (needs node on PATH)"""

import json
import random
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))
from urimai.models import Applicant  # noqa: E402
from urimai.rules import assess, load_schemes  # noqa: E402

N = int(sys.argv[1]) if len(sys.argv) > 1 else 1000
rng = random.Random(42)


def maybe(values):
    return rng.choice(values + [None, None])


def profile():
    return {
        "age": maybe([5, 17, 18, 21, 30, 35, 36, 40, 59, 60, 65, 79, 80, 95]),
        "gender": maybe(["male", "female", "other"]),
        "marital_status": maybe(["married", "widowed", "unmarried", "separated"]),
        "state": maybe(["TN", "KA", "OTHER"]),
        "area_type": maybe(["rural", "urban"]),
        "is_bpl": maybe([True, False]),
        "pays_income_tax": maybe([True, False]),
        "is_farmer": maybe([True, False]),
        "land_acres": maybe([0.0, 0.5, 1.5, 3.5, 6.0]),
        "disability_percent": maybe([0, 40, 79, 80, 100]),
        "is_student": maybe([True, False]),
        "studied_in_govt_school": maybe([True, False]),
        "has_lpg_connection": maybe([True, False]),
        "owns_pucca_house": maybe([True, False]),
    }


profiles = [profile() for _ in range(N)]
schemes = load_schemes()

py = []
for p in profiles:
    a = assess(Applicant(**p), schemes)
    needed_en = a.follow_up_questions_en
    py.append({
        "verdicts": [(r.scheme_id, r.verdict.value, sorted(r.missing_fields)) for r in a.results],
        "needed_count": len(needed_en),
    })

js_src = f"""
const E = require({json.dumps(str(ROOT / 'docs' / 'engine.js'))});
const S = require({json.dumps(str(ROOT / 'docs' / 'schemes.js'))});
const P = JSON.parse(require('fs').readFileSync(0, 'utf8'));
console.log(JSON.stringify(P.map(p => {{
  const a = E.assess(p, S);
  return {{ verdicts: a.results.map(r => [r.id, r.verdict, r.missing.slice().sort()]), needed: a.needed }};
}})));
"""
out = subprocess.run(["node", "-e", js_src], input=json.dumps(profiles), capture_output=True, text=True, check=True)
js = json.loads(out.stdout)

# Python exposes the follow-up order as question text; map it back to field names.
from urimai.rules import FIELD_QUESTIONS_EN  # noqa: E402
q_to_field = {v: k for k, v in FIELD_QUESTIONS_EN.items()}

bad = 0
for i, (a, b) in enumerate(zip(py, js)):
    pv = [[x[0], x[1], x[2]] for x in a["verdicts"]]
    p_needed = [q_to_field.get(q, q) for q in assess(Applicant(**profiles[i]), schemes).follow_up_questions_en]
    if pv != b["verdicts"] or p_needed != b["needed"]:
        bad += 1
        if bad <= 3:
            print("MISMATCH", profiles[i], pv, b["verdicts"], p_needed, b["needed"], sep="\n  ")
print(f"{N} random profiles, {bad} mismatches")
sys.exit(1 if bad else 0)
