/* Check that every language has full-details text for every scheme, with the same
 * number of list items as English, and that every scheme in the data has links.
 * Usage:  node scripts/check_details.js */
const fs = require('fs'), vm = require('vm'), path = require('path');
const docs = path.join(__dirname, '..', 'docs');
const ctx = {}; ctx.window = ctx; vm.createContext(ctx);
const langs = ['en', 'ta', 'hi', 'te', 'kn', 'ml', 'bn', 'mr'];
for (const f of ['schemes.js', 'details.js'].concat(langs.map(l => 'details-' + l + '.js')))
  vm.runInContext(fs.readFileSync(path.join(docs, f), 'utf8'), ctx, { filename: f });
const D = ctx.URIMAI_DETAILS, S = ctx.URIMAI_SCHEMES, en = D.text.en;
let bad = 0; const fail = m => { bad++; console.log('FAIL', m); };
for (const s of S) {
  if (!(s.id in D.LINKS)) fail('no links for ' + s.id);
  if (!D.DOCS[s.id]) fail('no docs list for ' + s.id);
  for (const u of Object.values(D.LINKS[s.id] || {})) if (u && !/^https:\/\/[a-z0-9.-]+\.(gov\.in|nic\.in|com)(\/|$)/.test(u)) fail('odd link ' + u);
}
for (const l of langs) {
  const t = D.text[l]; if (!t) { fail('missing language ' + l); continue; }
  for (const k of Object.keys(en.ui)) if (!t.ui[k]) fail(l + ' ui.' + k);
  for (const k of Object.keys(en.docs)) if (!t.docs[k]) fail(l + ' docs.' + k);
  for (const s of S) {
    const x = t.s[s.id], e = en.s[s.id];
    if (!x) { fail(l + ' scheme ' + s.id); continue; }
    for (const k of ['about', 'get']) if (!x[k]) fail(l + ' ' + s.id + '.' + k);
    for (const k of ['who', 'steps']) if (!x[k] || x[k].length !== e[k].length) fail(l + ' ' + s.id + '.' + k + ' length');
    if (!!x.note !== !!e.note) fail(l + ' ' + s.id + '.note');
  }
}
console.log(bad ? bad + ' problem(s)' : 'details OK: ' + S.length + ' schemes x ' + langs.length + ' languages');
process.exit(bad ? 1 : 0);
