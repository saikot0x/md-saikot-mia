// Runs before first paint: skips the intro animation for returning visitors.
try {
  if (localStorage.getItem('nf_introSeen') === 'true') {
    document.documentElement.classList.add('intro-seen');
  }
} catch (e) {}
