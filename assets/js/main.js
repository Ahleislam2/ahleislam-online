/* Ahl-e-Islam v2 home logic: Hijri date, city prayer times + live next-prayer countdown, Hijri converter mini, site search. */
(function () {
  var TZ = 5; // Pakistan Standard Time (UTC+5, no daylight saving)
  var ORDER = [['fajr', 'Fajr'], ['sunrise', 'Sunrise'], ['dhuhr', 'Dhuhr'],
               ['asr', 'Asr'], ['maghrib', 'Maghrib'], ['isha', 'Isha']];

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
  var currentTimes = null, currentCity = null;

  function dayStart(d) { return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }
  function timeToDate(base, hoursFloat) {
    var d = dayStart(base);
    d.setHours(Math.floor(hoursFloat), Math.round((hoursFloat % 1) * 60), 0, 0);
    return d;
  }

  function renderTimes() {
    var city = PrayCalc.CITIES.filter(function (c) { return c.name === citySel.value; })[0] || PrayCalc.CITIES[0];
    var shadow = asrMode === 'hanafi' ? 2 : 1;
    var t = PrayCalc.getTimes(today, city.lat, city.lng, TZ, shadow);
    currentTimes = t; currentCity = city;
    var box = document.getElementById('times');
    box.innerHTML = '';
    var nowH = new Date().getHours() + new Date().getMinutes() / 60;
    var nextKey = null, best = 1e9;
    ORDER.forEach(function (pair) {
      var diff = t[pair[0]] - nowH;
      if (diff > 0 && diff < best) { best = diff; nextKey = pair[0]; }
    });
    ORDER.forEach(function (pair) {
      var d = document.createElement('div');
      d.className = 'time-card' + (pair[0] === nextKey ? ' next' : '');
      d.innerHTML = '<div class="label">' + pair[1] + (pair[0] === nextKey ? ' • Next' : '') +
        '</div><div class="val">' + PrayCalc.formatTime(t[pair[0]]) + '</div>';
      box.appendChild(d);
    });
    document.getElementById('city-name').textContent = city.name;
    document.getElementById('hero-city').textContent = city.name;
    document.getElementById('sehri-time').textContent = PrayCalc.formatTime(t.fajr);
    document.getElementById('iftar-time').textContent = PrayCalc.formatTime(t.maghrib);
    try { localStorage.setItem('ahleislam-city', city.name); } catch (e) {}
    updateCountdown();
  }

  // ---- Live next-prayer countdown + progress (deen.pk pattern) ----
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function updateCountdown() {
    if (!currentTimes || !currentCity) return;
    var now = new Date();
    var shadow = asrMode === 'hanafi' ? 2 : 1;
    var t = currentTimes;
    var nextPair = null, nextDate = null, prevDate = null;
    for (var i = 0; i < ORDER.length; i++) {
      var d = timeToDate(now, t[ORDER[i][0]]);
      if (d > now) { nextPair = ORDER[i]; nextDate = d; break; }
      prevDate = d;
    }
    if (!nextPair) {
      // past Isha: next is tomorrow's Fajr
      var tm = new Date(now); tm.setDate(tm.getDate() + 1);
      var tt = PrayCalc.getTimes(tm, currentCity.lat, currentCity.lng, TZ, shadow);
      nextPair = ORDER[0]; nextDate = timeToDate(tm, tt.fajr);
      prevDate = timeToDate(now, t.isha);
    }
    var diffMs = nextDate - now;
    var s = Math.floor(diffMs / 1000);
    document.getElementById('next-name').textContent = nextPair[1];
    document.getElementById('next-time').textContent = PrayCalc.formatTime(
      nextDate.getHours() + nextDate.getMinutes() / 60);
    document.getElementById('countdown').textContent =
      pad(Math.floor(s / 3600)) + ':' + pad(Math.floor((s % 3600) / 60)) + ':' + pad(s % 60);
    if (prevDate) {
      var pct = Math.max(0, Math.min(100,
        Math.round((now - prevDate) / (nextDate - prevDate) * 100)));
      document.getElementById('progress-bar').style.width = pct + '%';
    }
  }
  setInterval(updateCountdown, 1000);

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

  // ---- Hijri converter mini (HijriCal pattern) ----
  var convInput = document.getElementById('conv-date');
  var convOut = document.getElementById('conv-result');
  function isoToday(d) {
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }
  convInput.value = isoToday(today);
  function runConvert() {
    if (!convInput.value) { convOut.textContent = '—'; return; }
    try {
      var d = new Date(convInput.value + 'T12:00:00');
      var hh = HijriCalc.gregorianToHijri(d);
      convOut.textContent = hh.day + ' ' + hh.monthName + ' ' + hh.year + ' AH';
    } catch (e) { convOut.textContent = '—'; }
  }
  document.getElementById('conv-btn').addEventListener('click', runConvert);
  convInput.addEventListener('change', runConvert);
  runConvert();

  // ---- Site search (home-page sections; inner pages join as they are built) ----
  var INDEX = [
    { title: 'Namaz Timings', desc: 'City-wise daily prayer times + monthly timetable', target: 'timings' },
    { title: 'Next Prayer Countdown', desc: 'Live countdown to the next prayer', target: 'timings' },
    
    { title: 'Hijri Converter', desc: 'Gregorian to Hijri date + today Islamic date', target: 'hijri-tool' },
    { title: 'Short Surahs', desc: 'Arabic + Urdu + English with references', target: 'sec-surahs' },
    
    
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
