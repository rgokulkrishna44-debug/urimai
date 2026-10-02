/* Free speech -> facts, browser edition of urimai/extract.py's HeuristicExtractor.
 * Conservative on purpose: a field is filled only on an unambiguous signal, because
 * a missing fact becomes a follow-up question while a wrong fact can deny someone
 * a benefit. Tamil number words are parsed with a port of urimai/numerals.py. */
(function (root) {
  'use strict';

  // ---- Tamil cardinals (port of numerals.py) ----
  var UNITS = { 'ஒன்று': 1, 'தொன்று': 1, 'யொன்று': 1, 'இரண்டு': 2, 'யிரண்டு': 2, 'ரெண்டு': 2, 'மூன்று': 3, 'மும்மூன்று': 3,
    'நான்கு': 4, 'நாலு': 4, 'ஐந்து': 5, 'தைந்து': 5, 'யைந்து': 5, 'ஆறு': 6, 'தாறு': 6, 'ஏழு': 7, 'தேழு': 7,
    'எட்டு': 8, 'தெட்டு': 8, 'ஒன்பது': 9, 'தொன்பது': 9 };
  var TEENS = { 'பதினொன்று': 11, 'பன்னிரண்டு': 12, 'பதின்மூன்று': 13, 'பதிமூன்று': 13, 'பதினான்கு': 14, 'பதினைந்து': 15,
    'பதினாறு': 16, 'பதினேழு': 17, 'பதினெட்டு': 18, 'பத்தொன்பது': 19 };
  var TENS = { 'பத்து': 10, 'இருபது': 20, 'முப்பது': 30, 'நாற்பது': 40, 'ஐம்பது': 50, 'அறுபது': 60, 'எழுபது': 70, 'எண்பது': 80, 'தொண்ணூறு': 90 };
  var TENS_STEMS = { 'இருபத்தி': 20, 'இருபத்து': 20, 'இருபத்த': 20, 'முப்பத்தி': 30, 'முப்பத்து': 30, 'முப்பத்த': 30,
    'நாற்பத்தி': 40, 'நாற்பத்து': 40, 'நாற்பத்த': 40, 'ஐம்பத்தி': 50, 'ஐம்பத்து': 50, 'ஐம்பத்த': 50,
    'அறுபத்தி': 60, 'அறுபத்து': 60, 'அறுபத்த': 60, 'எழுபத்தி': 70, 'எழுபத்து': 70, 'எழுபத்த': 70,
    'எண்பத்தி': 80, 'எண்பத்து': 80, 'எண்பத்த': 80, 'தொண்ணூற்றி': 90, 'தொண்ணூற்று': 90 };
  var SCALES = { 'நூறு': 100, 'நூற்று': 100, 'இருநூறு': 200, 'முந்நூறு': 300, 'நானூறு': 400, 'ஐந்நூறு': 500, 'அறுநூறு': 600,
    'எழுநூறு': 700, 'எண்ணூறு': 800, 'தொள்ளாயிரம்': 900, 'ஆயிரம்': 1000, 'ஆயிரத்து': 1000, 'லட்சம்': 100000, 'லட்சத்து': 100000 };
  var FUSED = { 'பத்தாயிரம்': 10000, 'இருபதாயிரம்': 20000, 'முப்பதாயிரம்': 30000, 'நாற்பதாயிரம்': 40000, 'ஐம்பதாயிரம்': 50000,
    'அறுபதாயிரம்': 60000, 'எழுபதாயிரம்': 70000, 'எண்பதாயிரம்': 80000, 'தொண்ணூறாயிரம்': 90000, 'ஓராயிரம்': 1000,
    'ஈராயிரம்': 2000, 'மூவாயிரம்': 3000, 'நாலாயிரம்': 4000, 'ஐயாயிரம்': 5000, 'ஆறாயிரம்': 6000, 'ஏழாயிரம்': 7000,
    'எட்டாயிரம்': 8000, 'ஒன்பதாயிரம்': 9000 };
  var ALL = {};
  [FUSED, SCALES, TEENS, TENS, TENS_STEMS, UNITS].forEach(function (d) {
    Object.keys(d).forEach(function (k) { if (!(k in ALL)) ALL[k] = d[k]; });
  });
  var TOKEN_SRC = Object.keys(ALL).sort(function (a, b) { return b.length - a.length; }).join('|');
  var MULT = { 100: 1, 1000: 1, 100000: 1 };

  function tamilWordsToInt(text) {
    var toks = (text || '').match(new RegExp(TOKEN_SRC, 'g'));
    if (!toks) return null;
    var total = 0, cur = 0;
    toks.forEach(function (t) {
      var v = ALL[t];
      if (MULT[v] && !(t in FUSED)) { cur = (cur || 1) * v; if (v >= 1000) { total += cur; cur = 0; } }
      else if (t in FUSED) total += v;
      else cur += v;
    });
    return (total + cur) || null;
  }

  function findQuantities(text) {
    var out = [], m, re = /\d+(?:\.\d+)?/g;
    while ((m = re.exec(text))) out.push([m.index, m.index + m[0].length, parseFloat(m[0])]);
    var run = new RegExp('(?:' + TOKEN_SRC + ')(?:\\s*(?:' + TOKEN_SRC + '))*', 'g');
    while ((m = run.exec(text))) { var v = tamilWordsToInt(m[0]); if (v !== null) out.push([m.index, m.index + m[0].length, v]); }
    return out.sort(function (a, b) { return a[0] - b[0]; });
  }

  function re(list) { return list && list.length ? new RegExp('(?:' + list.join('|') + ')', 'i') : null; }
  function has(text, list) { var r = re(list); return !!(r && r.test(text)); }

  // The number nearest any label word, within 25 characters (speech drops punctuation).
  function quantityNear(text, words) {
    var r = re(words); if (!r) return null;
    var g = new RegExp(r.source, 'gi'), spots = [], m;
    while ((m = g.exec(text))) { spots.push([m.index, m.index + m[0].length]); if (m[0] === '') g.lastIndex++; }
    if (!spots.length) return null;
    var best = null;
    findQuantities(text).forEach(function (q) {
      spots.forEach(function (s) {
        var gap = q[0] >= s[1] ? q[0] - s[1] : (s[0] >= q[1] ? s[0] - q[1] : 0);
        if (gap <= 25 && (best === null || gap < best[0])) best = [gap, q[2]];
      });
    });
    return best ? best[1] : null;
  }

  function firstNumber(text) {
    var q = findQuantities(text || '');
    return q.length ? q[0][2] : null;
  }

  function extract(text, lex) {
    var t = (text || '').trim(), f = {};
    var age = quantityNear(t, lex.age);
    if (age !== null && age > 0 && age <= 120) f.age = Math.round(age);

    var wF = has(t, lex.widowF), wM = has(t, lex.widowM);
    if (wF && !wM) { f.marital_status = 'widowed'; f.gender = 'female'; }
    else if (wM && !wF) { f.marital_status = 'widowed'; f.gender = 'male'; }
    if (!f.gender) {
      var fe = has(t, lex.female), ma = has(t, lex.male);
      if (fe && !ma) f.gender = 'female'; else if (ma && !fe) f.gender = 'male';
    }
    if (!f.marital_status) {
      if (has(t, lex.unmarried)) f.marital_status = 'unmarried';
      else if (has(t, lex.married)) f.marital_status = 'married';
    }

    var acres = quantityNear(t, lex.acre);
    if (acres !== null && acres >= 0) { f.land_acres = acres; f.is_farmer = true; }
    else if (has(t, lex.farmer)) f.is_farmer = true;

    var vil = has(t, lex.village), town = has(t, lex.town);
    if (vil && !town) f.area_type = 'rural'; else if (town && !vil) f.area_type = 'urban';

    if (has(t, lex.tn)) f.state = 'TN';

    var pct = t.match(/(\d{1,3})\s*%/);
    if (pct && +pct[1] <= 100) f.disability_percent = +pct[1];
    return f;
  }

  // Yes / no / don't know from a short spoken answer. Ambiguous -> null (ask to tap).
  function yesNo(text, lex) {
    var t = (text || '').toLowerCase().trim();
    if (!t) return null;
    if (lex.dk.some(function (w) { return t.indexOf(w.toLowerCase()) !== -1; })) return 'dk';
    var toks = t.split(/[\s,.!?।॥;:]+/).filter(Boolean);
    var isTok = function (w) { w = w.toLowerCase(); return w.indexOf(' ') !== -1 ? t.indexOf(w) !== -1 : toks.indexOf(w) !== -1; };
    var y = lex.yes.some(isTok), n = lex.no.some(isTok);
    return y && !n ? 'yes' : n && !y ? 'no' : null;
  }

  var api = { extract: extract, yesNo: yesNo, firstNumber: firstNumber, findQuantities: findQuantities,
    tamilWordsToInt: tamilWordsToInt, has: has };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.UrimaiExtract = api;
})(typeof window !== 'undefined' ? window : globalThis);
