// Runs before first paint.
// 1) Skips the intro animation for returning visitors.
// 2) First visit: follow the device theme (dark device = night theme, light device = warm paper).
//    Once the visitor uses the theme button, their choice is saved and always wins.
try {
  if (localStorage.getItem('nf_introSeen') === 'true') {
    document.documentElement.classList.add('intro-seen');
  }
} catch (e) {}

(function () {
  var night = false;
  try {
    var saved = localStorage.getItem('nf_bloodMoon');
    if (saved !== null) night = JSON.parse(saved) === true;
    else night = !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  } catch (e) {}
  if (!night) return;
  // <body> does not exist yet in <head>; add the class the moment it is parsed (before first paint).
  var obs = new MutationObserver(function () {
    if (document.body) { document.body.classList.add('blood-moon'); obs.disconnect(); }
  });
  obs.observe(document.documentElement, { childList: true });
})();
