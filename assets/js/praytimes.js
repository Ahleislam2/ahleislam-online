/* Prayer-times calculation — University of Islamic Sciences, Karachi method (18° / 18°).
   Standard solar-position math (declination + equation of time). No external dependency.
   Works in browser and Node (UMD). Times are local clock times for the given timezone. */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.PrayCalc = api;
})(typeof self !== 'undefined' ? self : this, function () {
  function fixAngle(a) { a = a % 360; return a < 0 ? a + 360 : a; }
  function fixHour(h) { h = h % 24; return h < 0 ? h + 24 : h; }
  var D2R = Math.PI / 180, R2D = 180 / Math.PI;
  function dsin(d) { return Math.sin(d * D2R); }
  function dcos(d) { return Math.cos(d * D2R); }
  function dtan(d) { return Math.tan(d * D2R); }
  function darcsin(x) { return Math.asin(x) * R2D; }
  function darccos(x) { return Math.acos(Math.min(1, Math.max(-1, x))) * R2D; }
  function darctan2(y, x) { return Math.atan2(y, x) * R2D; }
  function darccot(x) { return Math.atan(1 / x) * R2D; }

  function julianDay(y, m, d) {
    if (m <= 2) { y -= 1; m += 12; }
    var A = Math.floor(y / 100);
    var B = 2 - A + Math.floor(A / 4);
    return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + B - 1524.5;
  }

  function sunPosition(jd) {
    var D = jd - 2451545.0;
    var g = fixAngle(357.529 + 0.98560028 * D);
    var q = fixAngle(280.459 + 0.98564736 * D);
    var L = fixAngle(q + 1.915 * dsin(g) + 0.020 * dsin(2 * g));
    var e = 23.439 - 0.00000036 * D;
    var decl = darcsin(dsin(e) * dsin(L));
    var RA = fixHour(darctan2(dcos(e) * dsin(L), dcos(L)) / 15);
    return { decl: decl, eqt: q / 15 - RA };
  }

  // asrShadow: 1 = Shafi, 2 = Hanafi
  function getTimes(date, lat, lng, tz, asrShadow) {
    var jd = julianDay(date.getFullYear(), date.getMonth() + 1, date.getDate()) - lng / 360;
    var sun = sunPosition(jd);
    var decl = sun.decl;
    var midday = fixHour(12 - sun.eqt); // local mean time of solar transit
    function angleTime(angle, dir) {
      var t = (dsin(angle) - dsin(lat) * dsin(decl)) / (dcos(lat) * dcos(decl));
      return midday + dir * (darccos(t) / 15);
    }
    var asrAlt = darccot(asrShadow + dtan(Math.abs(lat - decl)));
    var raw = {
      fajr: angleTime(-18, -1),
      sunrise: angleTime(-0.833, -1),
      dhuhr: midday,
      asr: angleTime(asrAlt, 1),
      maghrib: angleTime(-0.833, 1),
      isha: angleTime(-18, 1)
    };
    var adj = tz - lng / 15; // local mean time -> clock time
    var out = {};
    Object.keys(raw).forEach(function (k) { out[k] = fixHour(raw[k] + adj); });
    return out;
  }

  function formatTime(h) {
    var totalMin = Math.round(h * 60);
    var hh = Math.floor(totalMin / 60) % 24, mm = totalMin % 60;
    var ap = hh >= 12 ? 'PM' : 'AM';
    var h12 = hh % 12; if (h12 === 0) h12 = 12;
    return h12 + ':' + (mm < 10 ? '0' : '') + mm + ' ' + ap;
  }

  var CITIES = [
    { name: 'Karachi', lat: 24.86, lng: 67.01 },
    { name: 'Lahore', lat: 31.55, lng: 74.35 },
    { name: 'Islamabad', lat: 33.69, lng: 73.05 },
    { name: 'Rawalpindi', lat: 33.60, lng: 73.04 },
    { name: 'Faisalabad', lat: 31.42, lng: 73.09 },
    { name: 'Multan', lat: 30.18, lng: 71.47 },
    { name: 'Peshawar', lat: 33.99, lng: 71.58 },
    { name: 'Quetta', lat: 30.18, lng: 67.00 },
    { name: 'Samundri', lat: 31.05, lng: 72.95 },
    { name: 'Gojra', lat: 31.15, lng: 72.68 },
    { name: 'Toba Tek Singh', lat: 30.97, lng: 72.48 },
    { name: 'Jhang', lat: 31.27, lng: 72.32 },
    { name: 'Sahiwal', lat: 30.67, lng: 73.11 },
    { name: 'Sargodha', lat: 32.08, lng: 72.67 },
    { name: 'Sialkot', lat: 32.49, lng: 74.53 },
    { name: 'Gujranwala', lat: 32.15, lng: 74.18 },
    { name: 'Bahawalpur', lat: 29.39, lng: 71.69 },
    { name: 'Hyderabad', lat: 25.38, lng: 68.37 },
    { name: 'Sukkur', lat: 27.71, lng: 68.85 }
  ];

  return { getTimes: getTimes, formatTime: formatTime, CITIES: CITIES };
});
