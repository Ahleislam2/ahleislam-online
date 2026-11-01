/* Tabular (civil) Islamic calendar conversion — standard Kuwaiti algorithm.
   NOTE: This is arithmetic, not moon sighting. The local announced date (e.g. Pakistan
   Ruet-e-Hilal) can differ by about 1 day. The site must always show that note.
   Works in browser and Node (UMD). */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.HijriCalc = api;
})(typeof self !== 'undefined' ? self : this, function () {
  function gregorianToJulian(y, m, d) {
    if (m <= 2) { y -= 1; m += 12; }
    var A = Math.floor(y / 100);
    var B = 2 - A + Math.floor(A / 4);
    return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + B - 1524.5;
  }

  var MONTHS = ['Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani',
    'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', "Sha'ban",
    'Ramadan', 'Shawwal', "Dhu al-Qi'dah", 'Dhu al-Hijjah'];

  function gregorianToHijri(date) {
    // JDN = Julian Day Number (JD at noon). The tabular algorithm needs an integer day count.
    var jd = Math.floor(gregorianToJulian(date.getFullYear(), date.getMonth() + 1, date.getDate()) + 0.5);
    var l = jd - 1948440 + 10632;
    var n = Math.floor((l - 1) / 10631);
    l = l - 10631 * n + 354;
    var j = Math.floor((10985 - l) / 5316) * Math.floor((50 * l) / 17719) +
            Math.floor(l / 5670) * Math.floor((43 * l) / 15238);
    l = l - Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) -
            Math.floor(j / 16) * Math.floor((15238 * j) / 43) + 29;
    var month = Math.floor((24 * l) / 709);
    var day = l - Math.floor((709 * month) / 24);
    var year = 30 * n + j - 30;
    return { day: day, month: month, monthName: MONTHS[month - 1], year: year };
  }

  return { gregorianToHijri: gregorianToHijri, MONTHS: MONTHS };
});
