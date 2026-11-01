/* Ahl-e-Islam home page logic: Hijri date, city prayer times, site search. */
(function () {
  var TZ = 5; // Pakistan Standard Time (UTC+5, no daylight saving)

  // ---- Today's dates ----
  var today = new Date();
  var gregStr = today.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  document.getElementById('greg-date').textContent = gregStr;
  try {
    var h = HijriCalc.gregorianToHijri(today);
    document.getElementById('hijri-date').textContent =
      h.day + ' ' + h.monthName + ' ' + h.year + ' AH';
  } catch (e) {
    document.getElementById('hijri-date').textContent = 'Hijri date (tabular calc)';
  }

  // ---- Prayer times ----
  var citySel = document.getElementById('city');
  PrayCalc.CITIES.forEach(function (c) {
    var o = document.createElement('option');
    o.value = c.name; o.textContent = c.name;
    citySel.appendChild(o);
  });
  var saved = null;
  try { saved = localStorage.getItem('ahleislam-city'); } catch (e) {}
  citySel.value = (saved && PrayCalc.CITIES.some(function (c) { return c.name === saved; }))
    ? saved : 'Karachi';
  var asrMode = 'hanafi'; // default per blueprint (Hanafi/Shafi toggle)

  function renderTimes() {
    var city = PrayCalc.CITIES.filter(function (c) { return c.name === citySel.value; })[0] || PrayCalc.CITIES[0];
    var shadow = asrMode === 'hanafi' ? 2 : 1;
    var t = PrayCalc.getTimes(today, city.lat, city.lng, TZ, shadow);
    var order = [['fajr', 'Fajr'], ['sunrise', 'Sunrise'], ['dhuhr', 'Dhuhr'],
                 ['asr', 'Asr'], ['maghrib', 'Maghrib'], ['isha', 'Isha']];
    var box = document.getElementById('times');
    box.innerHTML = '';
    // next prayer highlight
    var nowH = today.getHours() + today.getMinutes() / 60;
    var nextKey = null, best = 1e9;
    order.forEach(function (pair) {
      var diff = t[pair[0]] - nowH;
      if (diff > 0 && diff < best) { best = diff; nextKey = pair[0]; }
    });
    order.forEach(function (pair) {
      var d = document.createElement('div');
      d.className = 'time-card' + (pair[0] === nextKey ? ' next' : '');
      d.innerHTML = '<div class="label">' + pair[1] + (pair[0] === nextKey ? ' • Next' : '') +
        '</div><div class="val">' + PrayCalc.formatTime(t[pair[0]]) + '</div>';
      box.appendChild(d);
    });
    document.getElementById('city-name').textContent = city.name;
    try { localStorage.setItem('ahleislam-city', city.name); } catch (e) {}
  }
  citySel.addEventListener('change', renderTimes);
  document.getElementById('asr-hanafi').addEventListener('click', function () {
    asrMode = 'hanafi';
    this.classList.add('active');
    document.getElementById('asr-shafi').classList.remove('active');
    renderTimes();
  });
  document.getElementById('asr-shafi').addEventListener('click', function () {
    asrMode = 'shafi';
    this.classList.add('active');
    document.getElementById('asr-hanafi').classList.remove('active');
    renderTimes();
  });
  renderTimes();

  // ---- Site search (home-page sections; inner pages join as they are built) ----
  var INDEX = [
    { title: 'Namaz Timings', desc: 'City-wise daily prayer times + monthly timetable', target: 'timings' },
    { title: 'Zakat Calculator', desc: 'Cash, gold, silver, trade goods — 2.5% with tola nisab', target: 'sec-zakat' },
    { title: 'Hijri Converter', desc: 'Gregorian to Hijri date + today Islamic date', target: 'sec-hijri' },
    { title: 'Short Surahs', desc: 'Arabic + Urdu + English with references', target: 'sec-surahs' },
    { title: 'Hadith', desc: 'Famous Hadith with authentic book references only', target: 'sec-hadith' },
    { title: 'Khatam Sharif', desc: 'Dua + tariqa + fazilat, with references', target: 'sec-khatam' },
    { title: 'Samundri namaz timing', desc: 'Today prayer times for Samundri', target: 'timings', city: 'Samundri' },
    { title: 'Karachi namaz timing', desc: 'Today prayer times for Karachi', target: 'timings', city: 'Karachi' },
    { title: 'Lahore namaz timing', desc: 'Today prayer times for Lahore', target: 'timings', city: 'Lahore' }
  ];
  var input = document.getElementById('site-search');
  var sugg = document.getElementById('suggest');
  input.addEventListener('input', function () {
    var q = input.value.trim().toLowerCase();
    if (q.length < 2) { sugg.style.display = 'none'; return; }
    var hits = INDEX.filter(function (it) {
      return it.title.toLowerCase().indexOf(q) !== -1 || it.desc.toLowerCase().indexOf(q) !== -1;
    }).slice(0, 6);
    if (!hits.length) { sugg.style.display = 'none'; return; }
    sugg.innerHTML = '';
    hits.forEach(function (it) {
      var d = document.createElement('div');
      d.innerHTML = it.title + '<small>' + it.desc + '</small>';
      d.addEventListener('click', function () {
        if (it.city) { citySel.value = it.city; renderTimes(); }
        var el = document.getElementById(it.target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        sugg.style.display = 'none';
      });
      sugg.appendChild(d);
    });
    sugg.style.display = 'block';
  });
  document.addEventListener('click', function (e) {
    if (e.target !== input) sugg.style.display = 'none';
  });
})();
