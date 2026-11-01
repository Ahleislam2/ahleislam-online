/* Ahl-e-Islam language toggle: English <-> Urdu (script, RTL). Own translations of our own content. */
(function () {
  var DICT = {
    brandTag: { en: 'Namaz • Zakat • Hijri • Quran • Hadith — one clean site, authentic references',
                ur: 'نماز • زکوٰۃ • ہجری • قرآن • حدیث — ایک صاف ستھری سائٹ، مستند حوالوں کے ساتھ' },
    navHome: { en: 'Home', ur: 'ہوم' },
    navNamaz: { en: 'Namaz', ur: 'نماز' },
    navHijri: { en: 'Hijri', ur: 'ہجری' },
    navZakat: { en: 'Zakat', ur: 'زکوٰۃ' },
    navKhatam: { en: 'Khatam', ur: 'ختم' },
    navSurahs: { en: 'Surahs', ur: 'سورتیں' },
    navHadith: { en: 'Hadith', ur: 'حدیث' },
    searchPh: { en: 'Search the site — try “Khatam Sharif”, “Zakat”, “Lahore namaz”… ',
                ur: 'سائٹ میں تلاش کریں — مثلاً “ختم شریف”، “زکوٰۃ”، “لاہور نماز”… ' },
    todayLabel: { en: 'Today’s date', ur: 'آج کی تاریخ' },
    hijriNote: { en: 'Hijri date computed (tabular) — local moon-sighting date can differ by about 1 day',
                 ur: 'ہجری تاریخ حسابی (جدولی) ہے — مقامی چاند دیکھنے کی تاریخ 1 دن آگے پیچھے ہو سکتی ہے' },
    nextLabel: { en: 'Next prayer', ur: 'اگلی نماز' },
    sehri: { en: 'Sehri', ur: 'سحری' },
    iftar: { en: 'Iftar', ur: 'افطاری' },
    timingsTitle: { en: "Today's Namaz Timings", ur: 'آج کی نماز کے اوقات' },
    timingsSub: { en: 'Aaj ki namaz ke auqaat — select your city. Asr method can be switched Hanafi / Shafi.',
                  ur: 'آج کی نماز کے اوقات — اپنا شہر منتخب کریں۔ عصر کا طریقہ حنفی / شافعی بدلا جا سکتا ہے۔' },
    asrHanafi: { en: 'Asr: Hanafi', ur: 'عصر: حنفی' },
    asrShafi: { en: 'Asr: Shafi', ur: 'عصر: شافعی' },
    method: { en: 'Method: University of Islamic Sciences, Karachi — Fajr & Isha at 18°. Times are calculated on this page (no external API), so they stay free and fast. Small differences from your local masjid timetable (1–3 minutes) are normal — method and rounding differ.',
              ur: 'طریقہ: جامعہ علوم اسلامیہ کراچی — فجر و عشاء 18 درجے پر۔ اوقات اسی صفحے پر حسابی طریقے سے نکالے جاتے ہیں (کوئی بیرونی API نہیں)، اس لیے مفت اور تیز ہیں۔ اپنی مقامی مسجد کے اوقات سے 1 تا 3 منٹ کا فرق معمول کی بات ہے — طریقہ اور راؤنڈنگ مختلف ہوتی ہے۔' },
    convTitle: { en: 'Hijri Date Converter', ur: 'ہجری تاریخ کنورٹر' },
    convSub: { en: 'Kisi bhi Gregorian tareekh ka Hijri date nikalein — result upar, wazahat neeche.',
               ur: 'کسی بھی عیسوی تاریخ کی ہجری تاریخ نکالیں — نتیجہ اوپر، وضاحت نیچے۔' },
    convLabel: { en: 'Gregorian date', ur: 'عیسوی تاریخ' },
    convBtn: { en: 'Convert', ur: 'کنورٹ کریں' },
    convNote: { en: 'Tabular (calculated) Hijri date. Pakistan me elan-shuda (moon-sighting) date 1 din aage-peeche ho sakti hai — is liye har page par ye note saaf likha hoga.',
                ur: 'جدولی (حسابی) ہجری تاریخ۔ پاکستان میں اعلان شدہ (چاند دیکھنے کی) تاریخ 1 دن آگے پیچھے ہو سکتی ہے — اس لیے ہر صفحے پر یہ نوٹ صاف لکھا ہوگا۔' },
    hadithLabel: { en: 'Hadith of the Day', ur: 'آج کی حدیث' },
    hadithText: { en: '“Actions are but by intentions.” — har amal ka daromadar niyyat par hai.',
                  ur: 'اعمال کا دارومدار نیتوں پر ہے۔' },
    hadithRef: { en: 'Sahih al-Bukhari 1 • Daily rotation — a new Hadith every day, with book + number.',
                  ur: 'صحیح بخاری 1 • روزانہ تبدیلی — ہر دن ایک نئی حدیث، کتاب + نمبر کے ساتھ۔' },
    cardZakatT: { en: 'Zakat Calculator', ur: 'زکوٰۃ کیلکولیٹر' },
    cardZakatD: { en: 'Cash, gold, silver, trade goods — 2.5%, gold nisab 7.5 tola / silver nisab 52.5 tola, aap apni aaj ki rates daalein.',
                  ur: 'نقدی، سونا، چاندی، تجارتی مال — 2.5 فیصد، سونے کا نصاب 7.5 تولہ / چاندی کا نصاب 52.5 تولہ، آپ آج کے ریٹ خود ڈالیں۔' },
    cardZakatE: { en: 'Tola + PKR, with the Sarafa rate date shown.',
                  ur: 'تولہ + PKR، صرافہ ریٹ کی تاریخ کے ساتھ۔' },
    cardZakatTag: { en: 'Tool', ur: 'ٹول' },
    cardHijriT: { en: 'Hijri Converter', ur: 'ہجری کنورٹر' },
    cardHijriD: { en: 'Gregorian ↔ Hijri, poore saal ki table, notable dates — Pakistan local basis ke sath.',
                  ur: 'عیسوی ↔ ہجری، پورے سال کی ٹیبل، اہم تاریخیں — پاکستان کی مقامی بنیاد کے ساتھ۔' },
    cardHijriE: { en: 'Ruet-e-Hilal local date, with the ±1 day note stated clearly.',
                  ur: 'رویتِ ہلال مقامی تاریخ، ±1 دن کا نوٹ صاف لکھا ہوا۔' },
    cardHijriTag: { en: 'Mini tool upar live hai', ur: 'منی ٹول اوپر لائیو ہے' },
    cardSurahT: { en: 'Short Surahs + 4 Qul', ur: 'چھوٹی سورتیں + 4 قل' },
    cardSurahD: { en: 'All small Surahs — Arabic (asli text, image nahi) + Urdu + English, har Surah ka apna page.',
                  ur: 'تمام چھوٹی سورتیں — عربی (اصلی ٹیکسٹ، تصویر نہیں) + اردو + انگریزی، ہر سورت کا اپنا صفحہ۔' },
    cardSurahE: { en: 'Urdu + English translations beside the original Arabic text.',
                  ur: 'اصل عربی ٹیکسٹ کے ساتھ اردو + انگریزی ترجمہ۔' },
    cardSurahTag: { en: 'Library', ur: 'لائبریری' },
    cardHadithT: { en: 'Hadith', ur: 'حدیث' },
    cardHadithD: { en: 'Famous Hadith only — har hadith ke sath authentic book + number, verified before publishing.',
                   ur: 'صرف مشہور احادیث — ہر حدیث کے ساتھ مستند کتاب + نمبر، شائع کرنے سے پہلے تصدیق شدہ۔' },
    cardHadithE: { en: 'Hamara edge: sirf hadith nahi, samajh bhi — topic-wise articles, daily rotation, Roman Urdu option.',
                   ur: 'ہمارا ایج: صرف حدیث نہیں، سمجھ بھی — موضوع وار مضامین، روزانہ تبدیلی، رومن اردو آپشن۔' },
    cardHadithTag: { en: 'Library', ur: 'لائبریری' },
    cardKhatamT: { en: 'Khatam Sharif', ur: 'ختم شریف' },
    cardKhatamD: { en: 'Complete guide: dua, step-by-step tariqa, fazilat — with references, for Isal-e-Sawab.',
                   ur: 'مکمل گائیڈ: دعا، قدم بہ قدم طریقہ، فضیلت — حوالوں کے ساتھ، ایصالِ ثواب کے لیے۔' },
    cardKhatamE: { en: 'Short + long version, Arabic + transliteration + translation, printable.',
                   ur: 'چھوٹا + لمبا ورژن، عربی + تلفظ + ترجمہ، پرنٹ ایبل۔' },
    cardKhatamTag: { en: 'Pehla topic page', ur: 'پہلا ٹاپک صفحہ' },
    cardRamT: { en: 'Ramadan 2027', ur: 'رمضان 2027' },
    cardRamD: { en: 'Sehr & Iftar timetables for every city — publishing before Ramadan 2027, in sha Allah.',
                ur: 'ہر شہر کی سحر و افطار ٹائم ٹیبل — رمضان 2027 سے پہلے شائع ہوگی، ان شاء اللہ۔' },
    cardRamE: { en: 'Hamara edge: har sheher ka alag page + monthly table — chhote sheher pehle (Samundri, Gojra, Toba Tek Singh).',
                ur: 'ہمارا ایج: ہر شہر کا الگ صفحہ + ماہانہ ٹیبل — چھوٹے شہر پہلے (سمندری، گوجرہ، ٹوبہ ٹیک سنگھ)۔' },
    cardRamTag: { en: 'January 2027', ur: 'جنوری 2027' },
    trust1T: { en: 'Karachi method', ur: 'کراچی طریقہ' },
    trust1D: { en: '18° / 18°, Hanafi + Shafi Asr', ur: '18° / 18°، حنفی + شافعی عصر' },
    trust2T: { en: 'Quran text', ur: 'قرآن ٹیکسٹ' },
    trust2D: { en: 'Tanzil (CC-BY 3.0), unchanged', ur: 'تنزیل (CC-BY 3.0)، بغیر تبدیلی' },
    trust3T: { en: 'Translations', ur: 'تراجم' },
    trust3D: { en: 'Public-domain, credited by name', ur: 'پبلک ڈومین، نام کے ساتھ کریڈٹ' },
    trust4T: { en: 'Honest dates', ur: 'ایماندار تاریخیں' },
    trust4D: { en: 'Hijri ±1 day note on every page', ur: 'ہر صفحے پر ہجری ±1 دن کا نوٹ' },
    footer: { en: 'Ahl-e-Islam (ahleislam.online) — an evergreen Islamic tools and learning site. Quran Arabic text on future pages comes from the Tanzil project (CC-BY 3.0, text unchanged, with credit and link). Translations are public-domain works, credited by translator name. No account needed to use the tools.',
              ur: 'اہلِ اسلام (ahleislam.online) — ایک ایورگرین اسلامی ٹولز اور لرننگ سائٹ۔ آئندہ صفحات پر قرآن کا عربی ٹیکسٹ تنزیل پراجیکٹ سے ہوگا (CC-BY 3.0، بغیر تبدیلی، کریڈٹ اور لنک کے ساتھ)۔ تراجم پبلک ڈومین کام ہیں، مترجم کے نام کے ساتھ کریڈٹ دیا جائے گا۔ ٹولز استعمال کے لیے کسی اکاؤنٹ کی ضرورت نہیں۔' },
    heroTag: { en: 'Namaz timings, Zakat, Hijri, Quran and Hadith — one clean, authentic Islamic site.',
               ur: 'نماز کے اوقات، زکوٰۃ، ہجری، قرآن اور حدیث — ایک صاف، مستند اسلامی سائٹ' },
    secEyebrow: { en: 'Explore the sections', ur: 'حصے دیکھیں' },
    ramBanEyebrow: { en: 'Ramadan 2027', ur: 'رمضان 2027' },
    ramBanT: { en: 'Ramadan 2027 — Sehr & Iftar timetables',
               ur: 'رمضان 2027 — سحر و افطار ٹائم ٹیبل' },
    ramBanD: { en: 'Sehr and Iftar timetables for every city, publishing in January 2027 — before Ramadan begins, in sha Allah.',
               ur: 'ہر شہر کی سحر و افطار ٹائم ٹیبل جنوری 2027 میں شائع ہوگی — رمضان شروع ہونے سے پہلے، ان شاء اللہ۔' },
    ramBanNote: { en: '1 Ramadan 1448 is expected around 8 February 2027, subject to moon sighting. Timings use the Karachi method (18°/18°).',
                  ur: '1 رمضان 1448 کی توقع تقریباً 8 فروری 2027 ہے، چاند دیکھنے پر منحصر ہے۔ اوقات کراچی طریقے (18°/18°) کے مطابق ہوں گے۔' },
    footSections: { en: 'Sections', ur: 'حصے' },
    footTrust: { en: 'Method & honesty', ur: 'طریقہ اور ایمانداری' },
    footTrustD: { en: 'Namaz times are calculated on-page (Karachi method, 18°/18°). Hijri dates are tabular — the local moon-sighting date can differ by about 1 day. Hadith are published only with book, number and grade.',
                  ur: 'نماز کے اوقات اسی صفحے پر حسابی طریقے سے نکالے جاتے ہیں (کراچی طریقہ، 18°/18°)۔ ہجری تاریخیں جدولی ہیں — مقامی چاند دیکھنے کی تاریخ 1 دن آگے پیچھے ہو سکتی ہے۔ احادیث صرف کتاب، نمبر اور درجے کے ساتھ شائع کی جاتی ہیں۔' },
    nextTag: { en: 'Next', ur: 'اگلی' }
  };

  var PRAYERS = {
    fajr: { en: 'Fajr', ur: 'فجر' }, sunrise: { en: 'Sunrise', ur: 'طلوعِ آفتاب' },
    dhuhr: { en: 'Dhuhr', ur: 'ظہر' }, asr: { en: 'Asr', ur: 'عصر' },
    maghrib: { en: 'Maghrib', ur: 'مغرب' }, isha: { en: 'Isha', ur: 'عشاء' }
  };
  var CITIES_UR = { 'Karachi': 'کراچی', 'Lahore': 'لاہور', 'Islamabad': 'اسلام آباد',
    'Rawalpindi': 'راولپنڈی', 'Faisalabad': 'فیصل آباد', 'Multan': 'ملتان',
    'Peshawar': 'پشاور', 'Quetta': 'کوئٹہ', 'Samundri': 'سمندری', 'Gojra': 'گوجرہ',
    'Toba Tek Singh': 'ٹوبہ ٹیک سنگھ', 'Jhang': 'جھنگ', 'Sahiwal': 'ساہیوال',
    'Sargodha': 'سرگودھا', 'Sialkot': 'سیالکوٹ', 'Gujranwala': 'گوجرانوالہ',
    'Bahawalpur': 'بہاولپور', 'Hyderabad': 'حیدرآباد', 'Sukkur': 'سکھر' };
  var MONTHS_UR = { 'Muharram': 'محرم', 'Safar': 'صفر', 'Rabi al-Awwal': 'ربیع الاول',
    'Rabi al-Thani': 'ربیع الثانی', 'Jumada al-Awwal': 'جمادی الاولی',
    'Jumada al-Thani': 'جمادی الثانی', 'Rajab': 'رجب', "Sha'ban": 'شعبان',
    'Ramadan': 'رمضان', 'Shawwal': 'شوال', "Dhu al-Qi'dah": 'ذوالقعدہ',
    'Dhu al-Hijjah': 'ذوالحجہ' };

  var current = 'en';
  try { current = localStorage.getItem('ahleislam-lang') || 'en'; } catch (e) {}
  if (current !== 'ur') current = 'en';

  function t(key) {
    var d = DICT[key];
    return d ? (d[current] || d.en) : '';
  }
  function prayerName(key) { var p = PRAYERS[key]; return p ? (p[current] || p.en) : key; }
  function cityName(name) { return current === 'ur' ? (CITIES_UR[name] || name) : name; }
  function hijriStr(h) {
    if (current === 'ur') return h.day + ' ' + (MONTHS_UR[h.monthName] || h.monthName) + ' ' + h.year + ' ہجری';
    return h.day + ' ' + h.monthName + ' ' + h.year + ' AH';
  }
  function getLang() { return current; }

  function applyStatic() {
    document.documentElement.lang = current === 'ur' ? 'ur' : 'en';
    document.documentElement.dir = current === 'ur' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-t]').forEach(function (el) {
      var key = el.getAttribute('data-t');
      if (key === 'searchPh') { el.placeholder = t(key); return; }
      el.textContent = t(key);
    });
    ['lang-en', 'lang-ur'].forEach(function (id) {
      var b = document.getElementById(id);
      if (b) b.classList.toggle('active', (id === 'lang-ur') === (current === 'ur'));
    });
  }
  function setLang(lang) {
    current = lang === 'ur' ? 'ur' : 'en';
    try { localStorage.setItem('ahleislam-lang', current); } catch (e) {}
    applyStatic();
    if (typeof window.onLangChange === 'function') window.onLangChange(current);
  }
  function init() {
    applyStatic();
    var en = document.getElementById('lang-en'), ur = document.getElementById('lang-ur');
    if (en) en.addEventListener('click', function () { setLang('en'); });
    if (ur) ur.addEventListener('click', function () { setLang('ur'); });
  }

  window.SiteLang = { t: t, prayerName: prayerName, cityName: cityName,
    hijriStr: hijriStr, getLang: getLang, setLang: setLang, init: init, applyStatic: applyStatic };
})();
