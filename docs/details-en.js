/* Urimai full-details text: English. See details.js. */
(function (root) {
  var D = root.URIMAI_DETAILS || (root.URIMAI_DETAILS = { text: {} });
  D.text.en = {
    ui: {
      fullDetails: 'Full details and how to apply',
      apply: 'Apply on the official website',
      applyHint: 'Opens the government website in a new tab',
      noForm: 'No form needed. You do not have to apply anywhere.',
      about: 'What is this scheme?', get: 'What you get', who: 'Who can get it',
      docs: 'Keep these documents ready', steps: 'How to apply, step by step', where: 'Where to go in person',
      links: 'Official government links', site: 'Official website', guide: 'Full official guide (myScheme, Government of India)',
      extra: 'Tamil Nadu health insurance (CMCHIS)',
      checked: 'Links checked on 2 October 2026. Rules and amounts can change; always confirm at the office.',
      readAll: 'Read this page aloud', allSchemes: 'See which schemes you may get'
    },
    docs: {
      aadhaar: 'Aadhaar card', ration: 'Ration card (family card)', bank: 'Bank passbook (account linked to Aadhaar)',
      mobile: 'Mobile number linked to Aadhaar', photo: 'Passport size photo', age: 'Age proof (birth certificate, school certificate or Aadhaar)',
      address: 'Address proof', land: 'Land records (patta / chitta) in your name', death: "Husband's death certificate",
      disability: 'Disability certificate or UDID card (80% or more)', eb: 'Electricity bill (EB card number)',
      school: 'School study certificate with EMIS number (Class 6 to 12)', college: 'College admission or bonafide certificate',
      jobcard: 'MGNREGA job card', none: 'No documents needed'
    },
    s: {
      'pm-kisan': {
        about: 'PM-KISAN is a Government of India scheme that gives money directly to farmer families who own farm land. The money goes straight into the bank account linked to your Aadhaar.',
        get: 'Rs 6,000 every year, paid as three instalments of Rs 2,000 into your bank account.',
        who: ['A farmer family (husband, wife and children under 18) that owns farm land in its name in the land records',
          'Not eligible: families where someone pays income tax, is a serving or retired government employee (except Group D / MTS), gets a pension of Rs 10,000 or more a month, or holds a constitutional post',
          'Not eligible: practising doctors, engineers, lawyers, chartered accountants and architects',
          'Aadhaar e-KYC is compulsory to receive the money'],
        steps: ['Press "Apply on the official website" above. It opens the New Farmer Registration page on pmkisan.gov.in.',
          'Choose Rural or Urban farmer, enter your Aadhaar number, mobile number and state, and confirm the OTP.',
          'Fill in your land details (survey number, area) and bank details exactly as in your records, then submit.',
          'The Village Administrative Officer or agriculture office checks your land records and approves.',
          'Finish e-KYC on the same website with an OTP, or at an e-Sevai / CSC centre with your fingerprint.'],
        note: 'Check your payments any time on pmkisan.gov.in under "Know Your Status".'
      },
      'ignoaps': {
        about: 'A monthly pension for poor elderly people, paid by the Government of India together with your state government under the National Social Assistance Programme (NSAP).',
        get: 'A pension every month into your bank account. The central share is Rs 200 a month (age 60 to 79) and Rs 500 (age 80 and above); your state adds its own money, so the final amount depends on the state. In Tamil Nadu, pensioners also get a free saree or dhoti at Pongal and Deepavali.',
        who: ['Age 60 years or more', 'From a Below Poverty Line (BPL) household', 'In Tamil Nadu: the person should have no regular income or family support, as checked by the Tahsildar'],
        steps: ['In Tamil Nadu: go to any e-Sevai centre with the documents, or apply online on the TN e-Sevai website (button above).',
          'The centre fills the form, uploads your documents and takes your fingerprint for verification.',
          'Keep the receipt with your application number.',
          'The VAO or Revenue Inspector may visit your home to check. The Tahsildar (Social Security Scheme) approves.',
          'Other states: apply at your Taluk or Block office, your state e-District website, or a CSC centre.']
      },
      'ignwps': {
        about: 'A monthly pension for poor widows, paid by the Government of India together with your state government under the National Social Assistance Programme (NSAP).',
        get: 'A pension every month into your bank account. The central share is Rs 300 a month; your state adds its own money, so the final amount depends on the state. In Tamil Nadu, pensioners also get a free saree at Pongal and Deepavali.',
        who: ['A widow aged 40 to 79', 'From a Below Poverty Line (BPL) household', 'In Tamil Nadu: she should have no regular income or family support, as checked by the Tahsildar'],
        steps: ['In Tamil Nadu: go to any e-Sevai centre with the documents, or apply online on the TN e-Sevai website (button above).',
          "Carry your husband's death certificate. The centre fills the form, uploads documents and takes your fingerprint.",
          'Keep the receipt with your application number.',
          'The VAO or Revenue Inspector may visit your home to check. The Tahsildar (Social Security Scheme) approves.',
          'Other states: apply at your Taluk or Block office, your state e-District website, or a CSC centre.']
      },
      'igndps': {
        about: 'A monthly pension for poor persons with severe disability, paid by the Government of India together with your state government under the National Social Assistance Programme (NSAP).',
        get: 'A pension every month into your bank account. The central share is Rs 300 a month; your state adds its own money, so the final amount depends on the state.',
        who: ['Age 18 to 79', 'Disability of 80% or more, shown on a government disability certificate or UDID card', 'From a Below Poverty Line (BPL) household'],
        steps: ['If you do not have a disability certificate yet, get one first from the government hospital medical board, or apply for a UDID card at swavlambancard.gov.in.',
          'In Tamil Nadu: go to any e-Sevai centre with the documents, or apply online on the TN e-Sevai website (button above).',
          'The centre fills the form, uploads documents and takes your fingerprint. Keep the receipt.',
          'The Tahsildar (Social Security Scheme) checks and approves.',
          'Other states: apply at your Taluk or Block office, your state e-District website, or a CSC centre.']
      },
      'ayushman-bharat': {
        about: "Ayushman Bharat PM-JAY is the Government of India's free hospital treatment scheme. Eligible families get cashless treatment in government and listed private hospitals. In Tamil Nadu it works together with the Chief Minister's Comprehensive Health Insurance Scheme (CMCHIS).",
        get: 'Free (cashless) hospital treatment up to Rs 5 lakh per family every year, including medicines, tests, 3 days before admission and 15 days after discharge.',
        who: ['Families listed in the SECC 2011 poverty data, or added by the state government',
          'In Tamil Nadu: families covered by CMCHIS (generally annual family income up to Rs 1.2 lakh)',
          'Every person aged 70 or above, whatever the income, can get the Ayushman Vay Vandana card (since October 2024)'],
        steps: ['Press the button above to open beneficiary.nha.gov.in and log in with your mobile number and OTP.',
          'Choose your state and search with your Aadhaar or ration card to see if your family is listed.',
          'If listed, finish Aadhaar e-KYC and download your Ayushman card.',
          'Age 70 or above: choose the Ayushman Vay Vandana option and enrol with Aadhaar e-KYC.',
          'You can also do all this at a CSC or e-Sevai centre, or at the Ayushman desk in a listed hospital.'],
        note: 'Free helpline: 14555.'
      },
      'ujjwala': {
        about: 'Pradhan Mantri Ujjwala Yojana gives cooking gas (LPG) connections to women from poor households, so they can stop cooking with firewood and smoke.',
        get: 'A deposit-free LPG connection in the woman\'s name. Under Ujjwala 2.0 the first refill and the stove are also free. A subsidy on refills is paid into your bank account.',
        who: ['A woman aged 18 or above',
          'From a poor household, for example: SC/ST, PMAY-G house beneficiary, Antyodaya ration card, forest dwellers, or a family that signs a declaration of poverty',
          'Nobody in the household already has an LPG connection'],
        steps: ['Press the button above to open the Ujjwala 2.0 page on pmuy.gov.in.',
          'Choose a gas company (Indane, Bharat Gas or HP Gas) and pick your nearest distributor.',
          'Fill in the form with your Aadhaar, ration card and bank details, then submit.',
          'Or simply go to the nearest gas distributor with the documents and ask for the Ujjwala form.',
          'After the check, the distributor gives you the connection.']
      },
      'tn-magalir-urimai': {
        about: 'A Tamil Nadu government scheme that pays a monthly amount directly to women who head their families, in recognition of their work at home.',
        get: 'Rs 1,000 every month into the woman\'s bank account.',
        who: ['A woman aged 21 or above, living in Tamil Nadu',
          'The woman head of the family on the ration card (if the head is a man, his wife)',
          'Family income below Rs 2.5 lakh a year; land under 5 acres wet or 10 acres dry; home electricity use under 3,600 units a year',
          'Not eligible: income-tax payers, government employees and pensioners, elected representatives, families who own a car'],
        steps: ['New applications are taken only when the government opens a window, usually through special camps and e-Sevai centres. Ask at your ration shop whether a camp is open now.',
          'At the camp, give your ration card, Aadhaar and bank details. Your fingerprint is checked.',
          'Check your application status on kmut.tn.gov.in (button above).',
          'If rejected, you can appeal through an e-Sevai centre within the time given in the SMS.'],
        note: 'After the 2026 election the new government may change the name or amount. Check kmut.tn.gov.in or your ration shop for the latest.'
      },
      'tn-free-bus': {
        about: 'Women and transgender persons travel free in Tamil Nadu government ordinary town buses. It started in 2021 as Magalir Vidiyal Payanam; the new government has announced a new name.',
        get: 'Free travel in government ordinary town buses. The conductor gives you a free (zero fare) ticket.',
        who: ['All women, any age, any income', 'Transgender persons', 'Persons with disabilities, and one person travelling with them'],
        steps: ['No form, no card, no website. Just board a government ordinary town bus.',
          'Tell the conductor. You will get a free ticket.',
          'Express, deluxe and AC buses are not free under this scheme today.']
      },
      'tn-moovalur': {
        about: 'Also called the Pudhumai Penn scheme. Tamil Nadu pays girl students from government schools a monthly amount so they can continue to college.',
        get: 'Rs 1,000 every month into the student\'s own bank account, until she finishes her degree, diploma or ITI course. It can be received along with other scholarships.',
        who: ['Girl students who studied Class 6 to 12 in a Tamil Nadu government school (ask your college if your school type is covered)',
          'Now studying in college: degree, diploma, ITI or professional course', 'No family income limit'],
        steps: ['After joining college, meet the Pudhumai Penn nodal officer or the scholarship section of your college.',
          'Register on penkalvi.tn.gov.in (button above) with your Aadhaar and EMIS number, or the college registers you.',
          'Upload your documents and submit. The college checks and approves them.',
          'The money comes every month into your bank account linked to Aadhaar.']
      },
      'pmay-g': {
        about: 'Pradhan Mantri Awaas Yojana Gramin helps poor rural families who have no house, or live in a kutcha or broken house, build a pucca house.',
        get: 'Rs 1.20 lakh (plains) or Rs 1.30 lakh (hilly and difficult areas), paid in parts into your bank account as the house is built, plus 90 to 95 days of MGNREGA wages and help to build a toilet.',
        who: ['A rural family with no house, or living in a kutcha or broken house',
          'Your name must be in the Awaas+ survey list and approved by the Gram Sabha',
          'Not eligible: families with a pucca house, a car, a government job, or who pay income tax (there are other rules too)'],
        steps: ['Go to your Panchayat secretary or Block office and ask to be added in the Awaas+ survey.',
          'When the survey is open, you can also add yourself with the Awaas+ 2024 mobile app using face authentication (self survey).',
          'The Gram Sabha checks and approves the list.',
          'Check your status and the beneficiary list on pmayg.dord.gov.in (button above).']
      }
    }
  };
})(typeof window !== 'undefined' ? window : globalThis);
