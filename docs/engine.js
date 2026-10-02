/* Urimai eligibility engine, browser edition.
 * A line-for-line port of urimai/rules.py. Same three-valued logic: a fact is
 * true, false, or NOT YET ASKED (null), and unknown never counts as "no".
 * scripts/check_web_parity.py runs this file and the Python engine on the same
 * random profiles and fails if a single verdict or question order differs. */
(function (root) {
  'use strict';

  function evalCond(value, c) {
    if (value === null || value === undefined) return null;
    if ('min' in c && value < c.min) return false;
    if ('max' in c && value > c.max) return false;
    if ('eq' in c && value !== c.eq) return false;
    if ('in' in c && c.in.indexOf(value) === -1) return false;
    if (c.is_true && value !== true) return false;
    if (c.is_false && value !== false) return false;
    return true;
  }

  function assessScheme(profile, s) {
    var exclusions = s.exclusions || [];
    for (var i = 0; i < exclusions.length; i++) {
      var e = exclusions[i];
      if (evalCond(profile[e.field], e) === true) {
        return { id: s.id, verdict: 'excluded', missing: [], failed: [], exclusion: e };
      }
    }
    var failed = [], missing = [], rules = s.rules || [];
    for (var j = 0; j < rules.length; j++) {
      var r = rules[j], ok = evalCond(profile[r.field], r);
      if (ok === false) failed.push(r.field);
      else if (ok === null) missing.push(r.field);
    }
    var verdict = failed.length ? 'unlikely' : (missing.length ? 'possibly_eligible' : 'likely_eligible');
    return { id: s.id, verdict: verdict, missing: missing, failed: failed, exclusion: null };
  }

  /* Ask only about facts that could still flip a scheme INTO eligibility, highest
   * yield first: a field blocking five schemes beats one blocking a single scheme. */
  function assess(profile, schemes) {
    var results = schemes.map(function (s) { return assessScheme(profile, s); });
    var blocking = {};
    results.forEach(function (r) {
      if (r.verdict === 'possibly_eligible') r.missing.forEach(function (f) { blocking[f] = (blocking[f] || 0) + 1; });
    });
    var needed = Object.keys(blocking).sort(function (a, b) {
      return (blocking[b] - blocking[a]) || (a < b ? -1 : a > b ? 1 : 0);
    });
    return { results: results, needed: needed };
  }

  var api = { evalCond: evalCond, assessScheme: assessScheme, assess: assess };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.UrimaiEngine = api;
})(typeof window !== 'undefined' ? window : globalThis);
