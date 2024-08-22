'use strict';
// https://stackoverflow.com/a/14873282
var erf = function(x) {
  // Save the sign of x
  var sign = x >= 0 ? 1 : -1;
  x = Math.abs(x);
  // Constants
  var a1 = 0.254829592;
  var a2 = -0.284496736;
  var a3 = 1.421413741;
  var a4 = -1.453152027;
  var a5 = 1.061405429;
  var p = 0.3275911;
  // A&S formula 7.1.26
  var t = 1 / (1 + p * x);
  var y =
    1 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  return sign * y; // erf(-x) = -erf(x);
};
var tScoreToPercentile = function(tScore) {
  return 50 * erf((Math.SQRT2 * (tScore - 50)) * 0.05) + 50;
};
// https://stackoverflow.com/a/69510308
var erfinv = function(x) {
  var a = 0.147;
  var b = 2 / (Math.PI * a) + Math.log(1 - Math.pow(x, 2)) / 2;
  var sqrt1 = Math.sqrt(Math.pow(b, 2) - Math.log(1 - Math.pow(x, 2)) / a);
  var sqrt2 = Math.sqrt(sqrt1 - b);
  // https://stackoverflow.com/a/9079549
  return sqrt2 * (x ? (x < 0 ? -1 : 1) : 0); // sqrt2 * Math.sign(x)
};
var percentileToTScore = function(percentile) {
  return 10 * Math.SQRT2 * erfinv(percentile * 0.02 - 1) + 50;
};
// https://stackoverflow.com/a/75954111
var round = function(value, significantFigures) {
  var exponent = Math.floor(Math.log(value) * Math.LOG10E);
  var nIntegers = exponent + 1;
  var precision = Math.pow(10, nIntegers - significantFigures);
  return Math.round(value / precision) * precision;
};
var tScoreInput = document.getElementById('t-score');
var percentileInput = document.getElementById('percentile');
var buttons = document.getElementsByTagName('button');
var toPercentile = buttons[0];
var toTScore = buttons[1];
var convertToPercentile = function() {
  var tScore = +tScoreInput.value;
  var percentile = tScoreToPercentile(tScore);
  percentileInput.value = round(percentile, 15);
};
toPercentile.onclick = function() {
  convertToPercentile();
};
tScoreInput.onkeyup = function(e) {
  e = e || window.event;
  if (e.key === 'Enter' || e.keyCode === 13) {
    convertToPercentile();
  }
};
var convertToTScore = function() {
  var percentile = +percentileInput.value;
  var tScore = percentileToTScore(percentile);
  tScoreInput.value = round(tScore, 15);
};
toTScore.onclick = function() {
  convertToTScore();
};
percentileInput.onkeyup = function(e) {
  e = e || window.event;
  if (e.key === 'Enter' || e.keyCode === 13) {
    convertToTScore();
  }
};
