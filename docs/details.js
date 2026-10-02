/* Urimai web: the full-details page for each scheme.
 * LINKS holds the official links. Every link was opened and checked on 2 Oct 2026:
 *   apply = the page where a person actually applies or enrols (null = no form exists)
 *   site  = the scheme's official government website
 *   guide = the scheme's page on myScheme (Government of India), which has the full
 *           official write-up in many languages. Only pages confirmed to exist are listed.
 * DOCS lists which documents each scheme needs, as keys into each language's `docs` map.
 * Text per language lives in details-<lang>.js and registers itself on URIMAI_DETAILS.text.
 * Translations other than English and Tamil were made with AI help, like the rest of the page. */
(function (root) {
  'use strict';
  var LINKS = {
    'pm-kisan': { apply: 'https://pmkisan.gov.in/RegistrationFormupdated.aspx', site: 'https://pmkisan.gov.in', guide: 'https://www.myscheme.gov.in/schemes/pm-kisan' },
    'ignoaps': { apply: 'https://www.tnesevai.tn.gov.in', site: 'https://nsap.nic.in', guide: 'https://www.myscheme.gov.in/schemes/ignoapstn' },
    'ignwps': { apply: 'https://www.tnesevai.tn.gov.in', site: 'https://nsap.nic.in', guide: 'https://www.myscheme.gov.in/schemes/ignwpstn' },
    'igndps': { apply: 'https://www.tnesevai.tn.gov.in', site: 'https://nsap.nic.in', guide: 'https://www.myscheme.gov.in/schemes/igndpstn' },
    'ayushman-bharat': { apply: 'https://beneficiary.nha.gov.in', site: 'https://pmjay.gov.in', guide: null, extra: 'https://www.cmchistn.com' },
    'ujjwala': { apply: 'https://www.pmuy.gov.in/ujjwala2.html', site: 'https://pmuy.gov.in', guide: 'https://www.myscheme.gov.in/schemes/pmuy' },
    'tn-magalir-urimai': { apply: 'https://kmut.tn.gov.in', site: 'https://kmut.tn.gov.in', guide: null },
    'tn-free-bus': { apply: null, site: null, guide: null },
    'tn-moovalur': { apply: 'https://penkalvi.tn.gov.in', site: 'https://penkalvi.tn.gov.in', guide: 'https://www.myscheme.gov.in/schemes/pudhumai-penn-scheme' },
    'pmay-g': { apply: 'https://pmayg.dord.gov.in', site: 'https://pmayg.dord.gov.in', guide: 'https://www.myscheme.gov.in/schemes/pmay-g' }
  };
  var DOCS = {
    'pm-kisan': ['aadhaar', 'land', 'bank', 'mobile'],
    'ignoaps': ['aadhaar', 'ration', 'age', 'bank', 'photo', 'address'],
    'ignwps': ['aadhaar', 'ration', 'death', 'age', 'bank', 'photo'],
    'igndps': ['aadhaar', 'ration', 'disability', 'bank', 'photo'],
    'ayushman-bharat': ['aadhaar', 'ration', 'mobile'],
    'ujjwala': ['aadhaar', 'ration', 'bank', 'photo', 'address'],
    'tn-magalir-urimai': ['ration', 'aadhaar', 'bank', 'eb', 'mobile'],
    'tn-free-bus': ['none'],
    'tn-moovalur': ['aadhaar', 'bank', 'school', 'college', 'photo', 'mobile'],
    'pmay-g': ['aadhaar', 'bank', 'jobcard', 'ration', 'mobile']
  };
  var api = { LINKS: LINKS, DOCS: DOCS, CHECKED: '2026-10-02', text: {} };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.URIMAI_DETAILS = api;
})(typeof window !== 'undefined' ? window : globalThis);
