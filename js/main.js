



(() => {
  'use strict';
  


  document.documentElement.classList.add('js');
  const D = window.NF_DATA || {};
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));

  




  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      try {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand('copy');
        ta.remove();
        return ok;
      } catch { return false; }
    }
  }

  const state = {
    reduced: matchMedia('(prefers-reduced-motion: reduce)').matches,
    perf: false,
    filter: 'all'
  };

  const store = {
    get(k, fb) { try { const v = localStorage.getItem('nf_' + k); return v === null ? fb : JSON.parse(v); } catch { return fb; } },
    set(k, v) { try { localStorage.setItem('nf_' + k, JSON.stringify(v)); } catch {} }
  };

  













  function initLoader() {
    const loader = $('#loader');
    if (!loader) {
      document.body.classList.remove('no-scroll');
      return;
    }
    if (document.documentElement.classList.contains('intro-seen')) {
      loader.remove();
      document.body.classList.remove('no-scroll');
      return;
    }
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      if (!state.reduced) store.set('introSeen', true);
      finishLoader();
    };
    const skip = $('#skipIntro');
    if (skip) skip.addEventListener('click', finish);
    if (state.reduced) return finish();
    setTimeout(finish, 3000);
  }
  function finishLoader() {
    const loader = $('#loader');
    if (loader) { loader.classList.add('done'); setTimeout(() => loader.remove(), 900); }
    document.body.classList.remove('no-scroll');
     
    const h1 = $('.hero-title');
    if (h1 && !state.reduced) {
      h1.classList.add('glitch-once');
      setTimeout(() => h1.classList.remove('glitch-once'), 560);
    }
  }

   
  function initNav() {
    const nav = $('#navbar'), burger = $('#hamburger'), menu = $('#mobileMenu');
    addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 24), { passive: true });
    const closeMenu = () => { menu.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); };
    burger.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(open));
    });
    $$('a', menu).forEach(a => a.addEventListener('click', closeMenu));
    const links = $$('.nav-link');
    const sections = ['home', 'about', 'skills', 'projects', 'methodology', 'experience', 'writeups', 'contact']
      .map(id => document.getElementById(id)).filter(Boolean);
    const spy = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        links.forEach(l => l.classList.toggle('is-active', l.getAttribute('href') === '#' + e.target.id));
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(s => spy.observe(s));
  }

   
  function initToggles() {
    const themeBtn = $('#themeBtn'), perfBtn = $('#perfBtn'), motionBtn = $('#motionBtn');
    const setPressed = (btn, on) => btn && btn.setAttribute('aria-pressed', String(on));
    if (store.get('bloodMoon', false)) { document.body.classList.add('blood-moon'); setPressed(themeBtn, true); }
    themeBtn && themeBtn.addEventListener('click', () => {
      const on = document.body.classList.toggle('blood-moon');
      store.set('bloodMoon', on); setPressed(themeBtn, on);
      





      if (state.reduced || state.perf) return;
      document.body.classList.remove('theme-pulse');
      void document.body.offsetWidth;  
      document.body.classList.add('theme-pulse');
      const clear = () => document.body.classList.remove('theme-pulse');
      document.body.addEventListener('animationend', clear, { once: true });
      setTimeout(clear, 1200);
    });
    state.perf = store.get('perf', false);
    if (state.perf) { document.body.classList.add('perf'); setPressed(perfBtn, true); }
    perfBtn && perfBtn.addEventListener('click', () => {
      state.perf = document.body.classList.toggle('perf');
      store.set('perf', state.perf); setPressed(perfBtn, state.perf);
    });
    const applyReduced = (on) => {
      state.reduced = on;
      document.body.classList.toggle('reduced', on);
      setPressed(motionBtn, on);
    };
    if (store.get('reduced', state.reduced)) applyReduced(true);
    motionBtn && motionBtn.addEventListener('click', () => applyReduced(!state.reduced));
    







    const mq = matchMedia('(prefers-reduced-motion: reduce)');
    mq.addEventListener('change', e => {
      if (store.get('reduced', null) === null) applyReduced(e.matches);
    });
  }

   
  function initReveal() {
    const io = new IntersectionObserver(entries => {
      entries.forEach((e, idx) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        setTimeout(() => el.classList.add('in'), state.reduced ? 0 : Math.min(idx * 70, 350));
        io.unobserve(el);
      });
    }, { threshold: 0.12 });
    $$('.reveal').forEach(el => io.observe(el));
  }

   
  function renderAbout() {
    const fg = $('#factsGrid');
    if (fg && D.PROFILE) fg.innerHTML = D.PROFILE.facts.map(f =>
      `<li><span class="f-label">${esc(f.label)}</span><span class="f-value">${esc(f.value)}</span></li>`).join('');
    const cp = $('#corePrinciples');
    if (cp && D.PROFILE) cp.innerHTML = D.PROFILE.principles.map(p =>
      `<div class="principle"><span class="p-icon" aria-hidden="true">${p.icon}</span><span><b>${esc(p.title)}</b><p>${esc(p.text)}</p></span></div>`).join('');
    const v = $('#vials');
    if (v && D.PROFILE) {
      D.PROFILE.vials.forEach(x => {
        const row = document.createElement('div');
        row.className = 'vial-row';
        row.innerHTML = `<span class="vial-label">${esc(x.label)}</span><span class="vial-track"><span class="vial-fill" data-v="${x.value}"></span></span><span class="vial-val">${x.value}%</span>`;
        v.appendChild(row);
      });
      const vio = new IntersectionObserver(es => {
        if (es[0].isIntersecting) {
          $$('.vial-fill', v).forEach((f, i) => setTimeout(() => { f.style.width = f.dataset.v + '%'; }, state.reduced ? 0 : i * 140));
          vio.disconnect();
        }
      }, { threshold: 0.4 });
      vio.observe(v);
    }
  }

  






  function initBioRedaction() {
    const bio = $('#aboutBio');
    if (!bio || state.reduced) return;
    bio.classList.add('redact');
    [[0, 36], [32, 36], [64, 36]].forEach(([top, h], i) => {
      const bar = document.createElement('span');
      bar.className = 'redact-bar';
      bar.setAttribute('aria-hidden', 'true');
      bar.style.top = top + '%';
      bar.style.height = h + '%';
      bar.style.transitionDelay = (i * 0.12) + 's';
      bio.appendChild(bar);
    });
    const io = new IntersectionObserver(es => {
      if (!es[0].isIntersecting) return;
      bio.classList.add('in');
      io.disconnect();
    }, { threshold: 0.35 });
    io.observe(bio);
  }

   
  function renderSkills() {
    const wrap = $('#skillCards');
    if (!wrap || !D.SKILLS) return;
    const groups = [...new Set(D.SKILLS.map(skill => skill.category).filter(Boolean))];
    wrap.innerHTML = groups.map((category, groupIndex) => {
      const skills = D.SKILLS
        .map((skill, index) => ({ ...skill, originalIndex: index }))
        .filter(skill => skill.category === category)
        .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));
      return `
        <section class="skill-group" aria-labelledby="skillGroup${groupIndex}">
          <div class="skill-group-heading">
            <span class="skill-group-index mono">SEC-02.${String(groupIndex + 1).padStart(2, '0')}</span>
            <h3 id="skillGroup${groupIndex}">${esc(category)}</h3>
            <span class="skill-group-count mono">${skills.length} SKILLS</span>
          </div>
          <ul class="skill-group-grid">
            ${skills.map(s => `
              <li class="skill-pill status-${esc(s.status.toLowerCase())}" style="--i:${skills.indexOf(s)}"
                  title="${esc(`${s.desc} ${s.status} — ${s.level}%`)}"
                  aria-label="${esc(`${s.name}: ${s.status}, ${s.level}%. ${s.desc}`)}">${esc(s.name)}</li>`).join('')}
          </ul>
        </section>`;
    }).join('');
     
    const groupEls = $$('.skill-group', wrap);
    groupEls.forEach((g, gi) => g.style.setProperty('--g', Math.floor(gi / 2) + (gi % 2) * 0.5));
    if (state.reduced || !('IntersectionObserver' in window)) {
      groupEls.forEach(g => g.classList.add('in'));
    } else {
      const gio = new IntersectionObserver(es => es.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add('in'); gio.unobserve(en.target); }
      }), { threshold: 0.15 });
      groupEls.forEach(g => gio.observe(g));
    }
  }

  function renderSkillRadar() {
    const host = $('#skillRadar');
    if (!host || !D.SKILLS) return;
    const average = skills => skills.length
      ? Math.round(skills.reduce((sum, skill) => sum + skill.level, 0) / skills.length)
      : 0;
    const dimensions = [
      { label: 'NETWORKING', skills: D.SKILLS.filter(skill => skill.category === 'Networking') },
      { label: 'CYBER SECURITY', skills: D.SKILLS.filter(skill => skill.category === 'Cyber Security') },
      { label: 'PROGRAMMING', skills: D.SKILLS.filter(skill => skill.category === 'Programming') },
      { label: 'SECURITY TOOLS', skills: D.SKILLS.filter(skill => skill.category === 'Security / Technical Tools') },
      { label: 'LINUX', skills: D.SKILLS.filter(skill => ['Linux Security', 'Kali Linux'].includes(skill.name)) },
      { label: 'PRACTICAL LABS', skills: D.SKILLS.filter(skill => ['CTF', 'Ethical Hacking Fundamentals'].includes(skill.name)) }
    ].map(dimension => ({ ...dimension, value: average(dimension.skills) }));
    const cx = 190, cy = 166, radius = 108;
    const pointsAt = (scale, index) => {
      const angle = -Math.PI / 2 + index * (Math.PI * 2 / dimensions.length);
      return [
        cx + Math.cos(angle) * radius * scale,
        cy + Math.sin(angle) * radius * scale
      ];
    };
    const pointString = scale => dimensions
      .map((_, index) => pointsAt(scale, index).map(value => value.toFixed(1)).join(','))
      .join(' ');
    const axisLines = dimensions.map((dimension, index) => {
      const [x, y] = pointsAt(1, index);
      return `<line class="radar-axis" x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}"/>`;
    }).join('');
    const labels = dimensions.map((dimension, index) => {
      const [x, y] = pointsAt(1.25, index);
      const anchor = Math.abs(x - cx) < 12 ? 'middle' : x > cx ? 'start' : 'end';
      return `<text class="radar-label" x="${x.toFixed(1)}" y="${y.toFixed(1)}" text-anchor="${anchor}">${dimension.label}</text>`;
    }).join('');
    const values = dimensions.map((dimension, index) => {
      const [x, y] = pointsAt(dimension.value / 100, index);
      return `<circle class="radar-point" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.2"><title>${dimension.label}: ${dimension.value}%</title></circle>`;
    }).join('');
    host.innerHTML = `
      <svg viewBox="0 0 380 330" role="img" aria-labelledby="radarSvgTitle radarSvgDesc">
        <title id="radarSvgTitle">Current skill profile radar chart</title>
        <desc id="radarSvgDesc">${dimensions.map(dimension => `${dimension.label.toLowerCase()}: ${dimension.value}%`).join(', ')}.</desc>
        ${[.2, .4, .6, .8, 1].map(scale => `<polygon class="radar-grid" points="${pointString(scale)}"/>`).join('')}
        ${axisLines}
        ${[25, 50, 75, 100].map(value => `<text class="radar-scale" x="${cx + 5}" y="${cy - radius * value / 100 + 3}">${value}</text>`).join('')}
        <polygon class="radar-area" points="${dimensions.map((dimension, index) => pointsAt(dimension.value / 100, index).map(value => value.toFixed(1)).join(',')).join(' ')}"/>
        ${values}
        ${labels}
      </svg>`;
  }

  

















  function renderConstellation() {
    const box = $('#constellation');
    if (!box || !D.SKILLS || !D.SKILLS.length) return;
    const NS = 'http://www.w3.org/2000/svg';
    const graphNames = [
      'TCP/IP', 'Subnetting', 'Wireshark', 'Nmap', 'Linux Security',
      'Web Security', 'Python', 'Bash', 'Network Security',
      'Ethical Hacking Fundamentals'
    ];
    const skills = graphNames
      .map(name => D.SKILLS.find(skill => skill.name === name))
      .filter(Boolean);
    const n = skills.length;
    if (!n) return;
    const skillIndex = new Map(skills.map((skill, i) => [skill.name, i]));
    const graphConnections = [
      ['TCP/IP', 'Subnetting'], ['TCP/IP', 'Wireshark'], ['TCP/IP', 'Nmap'],
      ['TCP/IP', 'Network Security'], ['Subnetting', 'Nmap'],
      ['Wireshark', 'Nmap'], ['Wireshark', 'Network Security'],
      ['Linux Security', 'Bash'], ['Linux Security', 'Python'],
      ['Linux Security', 'Network Security'], ['Web Security', 'Python'],
      ['Web Security', 'Ethical Hacking Fundamentals'],
      ['Network Security', 'Ethical Hacking Fundamentals']
    ];

    

    const seen = new Set();
    const edges = graphConnections.map(([from, to]) => [
      skillIndex.get(from), skillIndex.get(to)
    ]).filter(([a, b]) => {
      if (a == null || b == null || a === b) return false;
      const key = a < b ? a + '-' + b : b + '-' + a;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

     
    const CX = 50, CY = 50;
    const pts = skills.map((_, i) => {
      const a = (i / n) * Math.PI * 2 - Math.PI / 2;
      const r = i % 2 ? 34 : 42;       
      return [CX + Math.cos(a) * r, CY + Math.sin(a) * r];
    });
     
    const rad = (lv) => 6 + Math.max(0, Math.min(100, lv)) * 0.08;

     
    const adj = skills.map(() => new Set());
    edges.forEach(([a, b]) => { adj[a].add(b); adj[b].add(a); });

    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 100 100');
    


    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');

     
    const edgeEls = edges.map(([a, b]) => {
      const ln = document.createElementNS(NS, 'line');
      ln.setAttribute('x1', pts[a][0]); ln.setAttribute('y1', pts[a][1]);
      ln.setAttribute('x2', pts[b][0]); ln.setAttribute('y2', pts[b][1]);
      ln.setAttribute('class', 'cg-edge');
      ln.dataset.a = a; ln.dataset.b = b;
      

      if (!state.reduced) {
        const len = Math.hypot(pts[b][0] - pts[a][0], pts[b][1] - pts[a][1]);
        ln.style.strokeDasharray = len;
        ln.style.strokeDashoffset = len;
      }
      svg.appendChild(ln);
      return ln;
    });

     
    const signal = document.createElementNS(NS, 'circle');
    signal.setAttribute('r', '1.1');
    signal.setAttribute('class', 'cg-signal');
    signal.setAttribute('cx', pts[0][0]);
    signal.setAttribute('cy', pts[0][1]);
    if (!state.reduced) svg.appendChild(signal);

     
    const nodeEls = [];
    skills.forEach((s, i) => {
      const g = document.createElementNS(NS, 'g');
      g.setAttribute('class', 'cg-node');
      g.setAttribute('tabindex', '0');
      g.setAttribute('role', 'button');
      g.setAttribute('aria-pressed', 'false');
      g.setAttribute('aria-label',
        `${s.name}. Level ${s.level} percent. Tools: ${s.tools.join(', ')}.`);
      g.dataset.i = i;

      const r = rad(s.level);
      const ring = document.createElementNS(NS, 'circle');
      ring.setAttribute('cx', pts[i][0]); ring.setAttribute('cy', pts[i][1]);
      ring.setAttribute('r', r); ring.setAttribute('class', 'cg-node-ring');
      g.appendChild(ring);

      const foc = document.createElementNS(NS, 'circle');
      foc.setAttribute('cx', pts[i][0]); foc.setAttribute('cy', pts[i][1]);
      foc.setAttribute('r', r + 2.2); foc.setAttribute('class', 'cg-focus');
      g.appendChild(foc);

      const glyph = document.createElementNS(NS, 'text');
      glyph.setAttribute('x', pts[i][0]); glyph.setAttribute('y', pts[i][1]);
      glyph.setAttribute('class', 'cg-node-glyph');
      glyph.textContent = s.icon;
      g.appendChild(glyph);

       
      if (!state.reduced) {
        g.style.opacity = '0';
        g.style.transition = 'opacity .4s ease';
      }
      svg.appendChild(g);
      nodeEls.push(g);
    });

    box.appendChild(svg);

     
    const readout = document.createElement('div');
    readout.className = 'cg-readout';
    readout.setAttribute('aria-live', 'polite');
    box.appendChild(readout);

    const hint = document.createElement('p');
    hint.className = 'cg-hint';
    hint.textContent = 'HOVER OR TAB THROUGH NODES — ARROW KEYS NAVIGATE';
    box.appendChild(hint);

     
    let current = -1;
    function select(i) {
      current = i;
      const s = skills[i];
      const conns = [...adj[i]].map(x => skills[x].name);
      readout.innerHTML = `
        <div class="cg-readout-head">
          <span class="cg-readout-icon" aria-hidden="true">${s.icon}</span>
          <span class="cg-readout-name">${esc(s.name)}</span>
          <span class="cg-readout-level">${s.level}%</span>
        </div>
        <p class="cg-readout-desc">${esc(s.desc)}</p>
        <div class="cg-readout-tools">${s.tools.map(t => `<span>${esc(t)}</span>`).join('')}</div>
        <p class="cg-readout-links">LINKED TO: <b>${conns.length ? esc(conns.join(' · ')) : 'no links'}</b></p>`;
       
      nodeEls.forEach((el, j) => {
        const lit = j === i || adj[i].has(j);
        el.classList.toggle('is-lit', lit);
        el.classList.toggle('is-dim', !lit);
        el.setAttribute('aria-pressed', String(j === i));
      });
      edgeEls.forEach(ln => {
        const on = +ln.dataset.a === i || +ln.dataset.b === i;
        ln.classList.toggle('is-lit', on);
        ln.classList.toggle('is-dim', !on);
      });
    }
    function clear() {
      current = -1;
      nodeEls.forEach(el => {
        el.classList.remove('is-lit', 'is-dim');
        el.setAttribute('aria-pressed', 'false');
      });
      edgeEls.forEach(ln => ln.classList.remove('is-lit', 'is-dim'));
      readout.innerHTML = `<p class="cg-readout-desc" style="margin:0">Select a node to inspect a discipline — its level, tooling, and what it connects to.</p>`;
    }
    clear();

     
    nodeEls.forEach((el, i) => {
      el.addEventListener('mouseenter', () => select(i));
      el.addEventListener('focus', () => select(i));
      el.addEventListener('click', () => select(i));
    });
    box.addEventListener('mouseleave', () => { if (current === -1) return; clear(); });

     
    svg.addEventListener('keydown', e => {
      if (!['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'Home', 'End', 'Escape'].includes(e.key)) return;
      e.preventDefault();
      if (e.key === 'Escape') { clear(); return; }
      let next;
      if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = n - 1;
      else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = current < 0 ? 0 : (current + 1) % n;
      else next = current < 0 ? n - 1 : (current - 1 + n) % n;
      nodeEls[next].focus();
      select(next);
    });

    

    if (state.reduced) {
      nodeEls.forEach(el => { el.style.opacity = '1'; });
      edgeEls.forEach(ln => { ln.style.strokeDashoffset = 0; });
    } else {
      const io = new IntersectionObserver(es => {
        if (!es[0].isIntersecting) return;
        io.disconnect();
         
        edgeEls.forEach((ln, k) => {
          ln.style.transition = `stroke-dashoffset .5s ease ${k * 0.04}s`;
          ln.style.strokeDashoffset = 0;
        });
         
        nodeEls.forEach((el, k) => {
          setTimeout(() => { el.style.opacity = '1'; }, 180 + k * 60);
        });
        startSignal();
      }, { threshold: 0.25 });
      io.observe(box);
    }

     
    let signalRaf = null, running = false, seg = 0, t = 0;
    function startSignal() {
      if (state.reduced || state.perf || !signal.parentNode || running) return;
      running = true;
      const step = () => {
        if (!running) return;
        t += 0.012;
        if (t >= 1) { t = 0; seg = (seg + 1) % edges.length; }
        const [a, b] = edges[seg];
        signal.setAttribute('cx', pts[a][0] + (pts[b][0] - pts[a][0]) * t);
        signal.setAttribute('cy', pts[a][1] + (pts[b][1] - pts[a][1]) * t);
        signalRaf = requestAnimationFrame(step);
      };
      signalRaf = requestAnimationFrame(step);
    }
     
    const vis = new IntersectionObserver(es => {
      es.forEach(e => {
        if (state.reduced || state.perf) return;
        if (e.isIntersecting) startSignal();
        else if (running) { running = false; cancelAnimationFrame(signalRaf); }
      });
    }, { threshold: 0 });
    vis.observe(box);

     
    const fb = $('#constellationFallback');
    if (fb) fb.classList.add('is-hidden');
  }

   
  function projectCard(p, i) {
    const cat = (D.PROJECT_CATS && D.PROJECT_CATS[p.cat]) || p.cat;
    const status = (p.status || '').toLowerCase();
    return `
      <article class="project-card reveal" data-cat="${p.cat}" tabindex="0" role="button" aria-haspopup="dialog" aria-label="${esc(p.name)} case study">
        <div class="project-thumb"><span class="pt-number">// ${String(i + 1).padStart(2, '0')}</span><span class="pt-status ${status}">${esc(p.status)}</span><span class="pt-glyph" aria-hidden="true">${p.icon}</span></div>
        ${p.fork ? `<p class="fork-flag" title="${esc(p.upstream ? 'Fork of ' + p.upstream : 'A fork, not original work')}"><span aria-hidden="true">⑂</span> FORK${p.upstream ? ' — ' + esc(p.upstream) : ''}</p>` : ''}
        <div class="project-body">
          <p class="project-cat">${esc(cat)}</p>
          <h3 class="project-name">${esc(p.name)}</h3>
          <p class="project-tagline">${esc(p.tagline)}</p>
          <p class="project-desc">${esc(p.desc)}</p>
          <div class="project-tags">${p.tags.map(t => `<span>#${esc(t)}</span>`).join('')}</div>
          <div class="project-actions">
            <button type="button" class="pbtn primary" data-cs="${i}">View Case Study</button>
            <a class="pbtn" href="${p.url}" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          </div>
        </div>
      </article>`;
  }
  function renderProjects() {
    const grid = $('#projectGrid'), archive = $('#archiveGrid');
    if (!grid || !D.PROJECTS) return;
    const featured = D.PROJECTS.map((p, i) => ({ p, i })).filter(x => x.p.featured);
    grid.innerHTML = featured.map(x => projectCard(x.p, x.i)).join('');
    if (archive) archive.innerHTML = D.PROJECTS.map((p) =>
      `<a class="archive-card" href="${p.url}" target="_blank" rel="noopener noreferrer"><span class="ac-head"><span class="ac-name">${p.icon} ${esc(p.name)}${p.fork ? ' <em class="ac-fork">FORK</em>' : ''}</span><span class="ac-stars">★ ${p.stars}</span></span><span class="ac-desc">${esc(p.desc)}</span></a>`).join('');
    $$('#filterBar .filter-btn').forEach(btn => btn.addEventListener('click', () => {
      $$('#filterBar .filter-btn').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      state.filter = btn.dataset.filter;
      applyFilter();
    }));
    $$('.project-card', grid).forEach(card => {
      card.addEventListener('click', e => { if (!e.target.closest('a')) openModal(card); });
      card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(card); } });
    });
    $$('.pbtn[data-cs]', grid).forEach(b => b.addEventListener('click', e => { e.stopPropagation(); openModal(b.closest('.project-card')); }));
    applyFilter();
  }
  function applyFilter() {
    const cards = $$('#projectGrid .project-card');
    let shown = 0;
    cards.forEach((c, i) => {
      const show = state.filter === 'all' || c.dataset.cat === state.filter;
      c.style.display = show ? '' : 'none';
      if (show) { c.classList.add('in'); shown++; }
    });
  }

   
  let lastFocus = null;
  function openModal(card) {
    const overlay = $('#modalOverlay'), scroll = $('#modalScroll');
    if (!overlay || !card || !D.PROJECTS) return;
    const idx = $$('#projectGrid .project-card').indexOf(card);
    const p = D.PROJECTS.map((x, i) => ({ x, i })).filter(o => o.x.featured)[idx];
    if (!p) return;
    const pr = p.x;
    const cs = pr.caseStudy || {};
    const cat = (D.PROJECT_CATS && D.PROJECT_CATS[pr.cat]) || pr.cat;
    scroll.innerHTML = `
      <p class="ms-cat">${esc(cat)} — ${esc(pr.status)}</p>
      <h3 id="modalTitle">${esc(pr.name)}</h3>
      <p class="ms-tagline">${esc(pr.tagline)}</p>
      ${cs.problem ? `<div class="ms-section"><h4>The Problem</h4><p>${esc(cs.problem)}</p></div>` : ''}
      ${cs.approach ? `<div class="ms-section"><h4>Approach</h4><p>${esc(cs.approach)}</p></div>` : ''}
      ${cs.outcome ? `<div class="ms-section"><h4>Defensive Outcome</h4><p>${esc(cs.outcome)}</p></div>` : ''}
      ${cs.lessons ? `<div class="ms-section"><h4>Lessons Learned</h4><p>${esc(cs.lessons)}</p></div>` : ''}
      ${cs.disclosure ? `<div class="ms-section ms-disclosure">🕊 ${esc(cs.disclosure)}</div>` : ''}
      <div class="ms-section"><h4>Tools &amp; Tags</h4><div class="ms-tools">${pr.tags.map(t => `<span>${esc(t)}</span>`).join('')}</div></div>
      <div class="ms-links"><a class="btn btn-primary" href="${pr.url}" target="_blank" rel="noopener noreferrer">Open on GitHub ↗</a></div>`;
    lastFocus = document.activeElement;
    overlay.hidden = false;
    requestAnimationFrame(() => overlay.classList.add('open'));
    document.body.classList.add('no-scroll');
    $('#modalClose').focus();
  }
  function closeModal() {
    const overlay = $('#modalOverlay');
    if (!overlay || overlay.hidden) return;
    overlay.classList.remove('open');
    document.body.classList.remove('no-scroll');
    setTimeout(() => { overlay.hidden = true; }, 300);
    if (lastFocus) lastFocus.focus();
  }
  function initModal() {
    const overlay = $('#modalOverlay');
    if (!overlay) return;
    $('#modalClose').addEventListener('click', closeModal);
    overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
    document.addEventListener('keydown', e => {
      if (overlay.hidden) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'Tab') {
        const f = $$('button, a[href]', overlay).filter(el => el.offsetParent !== null);
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

   
  function renderHunt() {
    const list = $('#huntStages');
    if (!list || !D.HUNT_CYCLE) return;
    list.innerHTML = D.HUNT_CYCLE.map(s =>
      `<li class="hunt-stage" tabindex="0"><span class="hs-dot" aria-hidden="true">${s.icon}</span><span class="hs-n mono">STAGE ${s.n}</span><span class="hs-name">${esc(s.name)}</span><p class="hs-text">${esc(s.text)}</p></li>`).join('');
    const fill = $('#threadFill'), marker = $('#huntMarker');
    if (!fill || state.reduced) return;
    const io = new IntersectionObserver(es => {
      if (!es[0].isIntersecting) return;
      io.disconnect();
      const track = () => {
        const rect = list.getBoundingClientRect();
        const mid = innerHeight * 0.6;
        let prog = (mid - rect.top) / rect.height;
        prog = Math.max(0, Math.min(1, prog));
        fill.style.width = (prog * 100) + '%';
        if (marker) marker.style.left = (prog * 100) + '%';
      };
      addEventListener('scroll', track, { passive: true });
      track();
    }, { threshold: 0.2 });
    io.observe(list);
  }

   
  function renderExperience() {
    if (!D.EXPERIENCE) return;
    const card = (j, i, last) => `
      <div class="vtl-item${/ongoing|present|now/i.test(j.date) ? ' is-current' : ''}" style="--i:${i}">
        <span class="vtl-dot" aria-hidden="true"></span>
        <div class="vtl-card">
          <p class="vtl-date">${esc(j.date)}${/ongoing/i.test(j.date) ? '<em>CURRENT</em>' : ''}</p>
          <h4 class="vtl-role">${esc(j.role)}</h4>
          <p class="vtl-org">${esc(j.org || j.orgLabel || '')}</p>
          <p class="vtl-desc">${esc(j.desc)}</p>
          ${j.points.length ? `<ul class="vtl-points">${j.points.map(pt => `<li>${esc(pt)}</li>`).join('')}</ul>` : ''}
          ${j.tools.length ? `<div class="vtl-tools">${j.tools.map(t => `<span>${esc(t)}</span>`).join('')}</div>` : ''}
        </div>
      </div>`;
     
    const fill = (sel, countSel, type) => {
      const host = $(sel);
      if (!host) return;
      const items = D.EXPERIENCE.filter(j => j.type === type).reverse();
      host.innerHTML = items.map((j, i) => card(j, i)).join('');
      const c = $(countSel);
      if (c) c.textContent = String(items.length).padStart(2, '0');
    };
    fill('#eduTimeline', '#eduCount', 'education');
    fill('#expTimeline', '#expCount', 'experience');
  }

   
  function renderCerts() {
    const row = $('#statsRow');
    if (row && D.STATS) {
      row.innerHTML = D.STATS.map(s =>
        `<div class="stat"><b data-count="${s.value}" data-suffix="${s.suffix || ''}">0${s.suffix || ''}</b><span>${esc(s.label)}${s.placeholder ? ' <em>[' + esc(s.placeholder) + ']</em>' : ''}</span></div>`).join('');
      const io = new IntersectionObserver(es => {
        if (!es[0].isIntersecting) return;
        io.disconnect();
        $$('b[data-count]', row).forEach(el => {
          const target = +el.dataset.count, suf = el.dataset.suffix;
          if (state.reduced) { el.textContent = target + suf; return; }
          const t0 = performance.now(), dur = 1400;
          const step = (t) => {
            const k = Math.min(1, (t - t0) / dur);
            el.textContent = Math.round(target * (1 - Math.pow(1 - k, 3))) + suf;
            if (k < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        });
      }, { threshold: 0.35 });
      io.observe(row);
    }
    





    const bg = $('#badgeGrid');
    if (bg && D.CERTS) bg.innerHTML = D.CERTS.map(c => {
      if (c.sealed) {
        return `<div class="badge badge-sealed reveal">
          <span class="badge-icon" aria-hidden="true">${c.icon}</span>
          <b>${esc(c.title)}</b>
          <p class="b-meta">${esc(c.target || 'Certification track')}</p>
          <span class="stamp stamp-sealed">Sealed — pending verification</span>
        </div>`;
      }
      return `<div class="badge reveal">
        <span class="badge-icon" aria-hidden="true">${c.icon}</span>
        <b>${esc(c.title)}</b>
        <p class="b-meta">${esc(c.issuer || '')}${c.date ? ' · ' + esc(c.date) : ''}</p>
        ${c.verify ? `<a class="b-verify" href="${esc(c.verify)}" target="_blank" rel="noopener noreferrer">VERIFY ↗</a>` : ''}
      </div>`;
    }).join('');
    const tb = $('#thmBadges');
    if (tb && D.THM_BADGES) tb.innerHTML = D.THM_BADGES.map(b =>
      `<li><span aria-hidden="true">${b.icon}</span>${esc(b.name)}</li>`).join('');
  }

   
  function initScenePrlx() {
    const scene = $('.contact-scene'), sec = $('#contact');
    if (!scene || !sec || state.reduced || document.body.classList.contains('perf')) return;
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0, visible = false;
    const step = () => {
      raf = 0;
      cx += (tx - cx) * 0.08; cy += (ty - cy) * 0.08;
      scene.style.setProperty('--px', cx.toFixed(3));
      scene.style.setProperty('--py', cy.toFixed(3));
      if (visible && (Math.abs(tx - cx) > 0.003 || Math.abs(ty - cy) > 0.003)) raf = requestAnimationFrame(step);
    };
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(es => es.forEach(en => { visible = en.isIntersecting; }), { threshold: 0 }).observe(sec);
    } else { visible = true; }
    window.addEventListener('pointermove', e => {
      if (!visible) return;
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
      if (!raf) raf = requestAnimationFrame(step);
    }, { passive: true });
  }

   
  const BAT_SVG = '<svg viewBox="0 0 40 18" width="W" height="H"><path d="M20 9 C17 3 10 0 1 2 C6 5 8 8 7 13 C11 10 15 10 20 9 C25 10 29 10 33 13 C32 8 34 5 39 2 C30 0 23 3 20 9 Z"/></svg>';  
  function spawnBats() {
    const field = $('#batField');
    if (!field || state.reduced) return;
    const mobile = matchMedia('(max-width: 860px)').matches;
    const count = state.perf ? 0 : (mobile ? 3 : 6);
    for (let i = 0; i < count; i++) {
      const b = document.createElement('div');
      b.className = 'bat' + (i % 2 ? ' light' : '');
      const size = 18 + Math.random() * 22;
      b.innerHTML = BAT_SVG.replace('W', Math.round(size)).replace('H', Math.round(size * 0.45));
      const dur = 14 + Math.random() * 14;
      b.style.opacity = 0.25 + Math.random() * 0.35;
      b.animate([
        { transform: `translate(${-8 + Math.random() * 30}vw, ${8 + Math.random() * 40}vh) rotate(0deg)` },
        { transform: `translate(60vw, ${2 + Math.random() * 30}vh) rotate(6deg)`, offset: 0.35 },
        { transform: `translate(120vw, ${10 + Math.random() * 45}vh) rotate(-5deg)` }
      ], { duration: dur * 1000, delay: -Math.random() * dur * 1000, iterations: Infinity, easing: 'ease-in-out' });
      field.appendChild(b);
      const vis = new IntersectionObserver(es => {
        es.forEach(e => e.target.getAnimations().forEach(a => { state.reduced ? a.pause() : (e.isIntersecting ? a.play() : a.pause()); }));
      });
      vis.observe(b);
      vis.observe(field);  
    }
  }

  function initPointerFX() {
    if (state.reduced || matchMedia('(pointer: coarse)').matches) return;
    const hero = $('#home'), glow = $('#heroGlow'), aura = $('#cursorAura');
    const card = $('#profileCard');
    let px = 0, py = 0, raf = null, magnetRaf = null;
    const apply = () => {
      raf = null;
      if (glow && hero) {
        const r = hero.getBoundingClientRect();
        glow.style.opacity = 1;
        glow.style.left = (px - r.left) + 'px';
        glow.style.top = (py - r.top) + 'px';
      }
      if (aura) { aura.style.opacity = 1; aura.style.left = px + 'px'; aura.style.top = py + 'px'; }  
      if (card && hero) {
        const r = hero.getBoundingClientRect();
        const dx = (px - r.left) / r.width - 0.5, dy = (py - r.top) / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateY(${dx * 5}deg) rotateX(${-dy * 4}deg)`;
      }
      $$('[data-depth]').forEach(el => {
        const d = +el.dataset.depth;
        el.style.translate = `${px * d * -0.6}px ${py * d * -0.6}px`;
      });
    }; 
    hero && hero.addEventListener('pointermove', e => {
      px = e.clientX; py = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    });
    hero && hero.addEventListener('pointerleave', () => {
      if (glow) glow.style.opacity = 0;
      if (card) card.style.transform = '';
      $$('[data-depth]').forEach(el => { el.style.translate = ''; });
    });
    document.addEventListener('pointermove', e => { px = e.clientX; py = e.clientY; if (aura && !raf && !state.perf) raf = requestAnimationFrame(apply); }, { passive: true });
    document.addEventListener('pointerleave', () => { if (aura) aura.style.opacity = 0; });

    





    if (!state.perf) {
      const magnets = $$('.hero-cta .btn');
      magnets.forEach(btn => btn.classList.add('magnetic'));
      const pull = () => {
        magnets.forEach(btn => {
          const r = btn.getBoundingClientRect();
          if (!r.width) return;
          const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
          const dx = px - cx, dy = py - cy;
          const dist = Math.hypot(dx, dy);
          if (dist < 140) {
            const f = (1 - dist / 140) * 8;  
            btn.style.translate = (dx / dist) * f + 'px ' + (dy / dist) * f + 'px';
          } else {
            btn.style.translate = '';
          }
        });
      };
      hero && hero.addEventListener('pointermove', () => { if (!magnetRaf) magnetRaf = requestAnimationFrame(() => { magnetRaf = null; pull(); }); }, { passive: true });
      hero && hero.addEventListener('pointerleave', () => { magnets.forEach(b => { b.style.translate = ''; }); });
    }

    







    const ring = $('#cursorRing');
    if (!ring || state.perf) return;
    let rx = px, ry = py, ringRaf = null;
    const follow = () => {
      rx += (px - rx) * 0.18;
      ry += (py - ry) * 0.18;
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      ringRaf = (Math.abs(px - rx) > 0.4 || Math.abs(py - ry) > 0.4) ? requestAnimationFrame(follow) : null;
    };
    document.addEventListener('pointermove', e => {
      px = e.clientX; py = e.clientY;
      ring.classList.add('on');
      if (!ringRaf) ringRaf = requestAnimationFrame(follow);
    }, { passive: true });
    document.addEventListener('pointerover', e => {
      const hot = e.target.closest('a,button,input,select,textarea,[tabindex]:not([tabindex="-1"])');
      ring.classList.toggle('hot', !!hot);
    }, { passive: true });
    document.addEventListener('pointerleave', () => ring.classList.remove('on'));
  }

  function initScrollFX() {
    const bar = $('#scrollProgress'), top = $('#backTop');
    let raf = null;
    const track = () => {
      raf = null;
      const max = document.documentElement.scrollHeight - innerHeight;
      const frac = max > 0 ? scrollY / max : 0;
      if (bar) bar.style.transform = `scaleY(${frac})`;
      if (top) top.classList.toggle('show', scrollY > 600);

      


      const ticks = $$('.sp-tick');
      for (let i = 0; i < ticks.length; i++) {
        const at = ticks[i].dataset.at;
        const sec = at && document.getElementById(at);
        ticks[i].classList.toggle('is-passed', !!sec && sec.offsetTop <= scrollY + innerHeight * 0.4);
      }
      



      if (ticks.length) {
        const last = ticks[ticks.length - 1];
        const lastSec = last.dataset.at && document.getElementById(last.dataset.at);
        const allPassed = ticks.every(t => t.classList.contains('is-passed'));
        last.classList.toggle('heartbeat', !!(allPassed && lastSec));
      }
    };
    addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(track); }, { passive: true });
    


    buildScrollMinimap();
    let rt = null;
    addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { buildScrollMinimap(); track(); }, 180); }, { passive: true });
    addEventListener('load', () => { buildScrollMinimap(); track(); }, { once: true });
    track();
    top && top.addEventListener('click', () => scrollTo({ top: 0, behavior: state.reduced ? 'auto' : 'smooth' }));
  }

   
  function initTyped() {
    const el = $('#typedRole') || $('#typedText');
    if (!el || !D.PROFILE) return;
    const roleLines = el.closest('[data-roles]')?.dataset.roles;
    const lines = roleLines
      ? roleLines.split('|').map(line => line.trim()).filter(Boolean)
      : (D.PROFILE.typedLines || []);
    if (state.reduced || !lines.length) { el.textContent = lines[0] || ''; return; }
    let li = 0, ci = 0, del = false;
    const step = () => {
      const line = lines[li];
      el.textContent = line.slice(0, ci);
      let delay = del ? 26 : 52;
      if (!del && ci === line.length) { del = true; delay = 2200; }
      else if (del && ci === 0) { del = false; li = (li + 1) % lines.length; delay = 350; }
      else ci += del ? -1 : 1;
      setTimeout(step, delay);
    }; 
    setTimeout(step, 900);
  }

   
  function initForm() {
    const form = $('#contactForm');
    if (!form) return;
    const emailjs = window.emailjs;
    const emailjsConfig = {
      serviceId: 'service_2nc9ou9',
      templateId: 'template_5xd8vcq',
      publicKey: 'BhfyVJrh9wBUxGG0x'
    };
    if (emailjs && typeof emailjs.init === 'function') {
      emailjs.init({ publicKey: emailjsConfig.publicKey });
    }
    const fields = {
      name: { el: $('#cfName'), err: $('#errName'), test: v => v.trim().length >= 2, msg: 'Please enter your name (2+ characters).' },
      email: { el: $('#cfEmail'), err: $('#errEmail'), test: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()), msg: 'Please enter a valid email address.' },
      type: { el: $('#cfType'), err: $('#errType'), test: v => !!v, msg: 'Please select a subject.' },
      message: { el: $('#cfMsg'), err: $('#errMsg'), test: v => v.trim().length >= 10, msg: 'Message needs at least 10 characters.' }
    }; 
    const show = (f, ok) => {
      f.el.closest('.form-field').classList.toggle('invalid', !ok);
      f.err.hidden = ok;
      f.err.textContent = ok ? '' : f.msg;
      f.el.setAttribute('aria-invalid', String(!ok));
    };
    Object.values(fields).forEach(f => f.el.addEventListener('input', () => show(f, f.test(f.el.value))));
    form.addEventListener('submit', async e => {
      e.preventDefault();
      let ok = true, first = null;
      Object.values(fields).forEach(f => {
        const good = f.test(f.el.value);
        show(f, good);
        if (!good && !first) first = f.el;
        ok = ok && good;
      });
      const s = $('#formSuccess'), note = $('.form-note'), submitBtn = form.querySelector('[type="submit"]');
      if (!ok) {
        if (s) s.hidden = true;
        first && first.focus();
        return;
      }
      if (s) {
        s.classList.remove('is-error');
        s.textContent = 'Sending your message…';
        s.hidden = false;
      }
      if (note) note.hidden = true;
      if (submitBtn) submitBtn.disabled = true;
      try {
        if (!emailjs || typeof emailjs.sendForm !== 'function') {
          throw new Error('EmailJS failed to load.');
        }
        await emailjs.sendForm(emailjsConfig.serviceId, emailjsConfig.templateId, form);
        form.reset();
        Object.values(fields).forEach(f => show(f, true));
        if (s) {
          s.classList.remove('is-error');
          s.textContent = 'Your message was sent. Thank you for reaching out.';
        }
      } catch (error) {
        console.error('Contact form could not be sent:', error);
        if (s) {
          s.classList.add('is-error');
          s.textContent = 'Your message could not be sent. Please try again or use a direct contact channel.';
        }
      } finally {
        if (submitBtn) submitBtn.disabled = false;
        if (s) s.scrollIntoView({ block: 'nearest', behavior: state.reduced ? 'auto' : 'smooth' });
      }
    });
  }

   
  function initWriteups() {
    const bar = $('#writeupFilter'), grid = $('#writeupGrid');
    if (!bar || !grid) return;
    const btns = $$('.filter-btn', bar), cards = $$('.writeup-card', grid);
    btns.forEach(btn => btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const f = btn.dataset.filter;
      cards.forEach(c => {
        const show = f === 'all' || c.dataset.category === f;
        c.style.display = show ? '' : 'none';
        if (show) c.classList.add('in');
      });
    }));
  }

  




  function renderContactChannels() {
    const box = $('#contactChannels');
    if (!box) return;
    const P = D.PROFILE || {};

    const icons = {
      email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
      linkedin: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2ZM8.3 18.5H5.7V9.7h2.6v8.8ZM7 8.6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm11.5 9.9h-2.6v-4.3c0-1-.02-2.4-1.5-2.4-1.5 0-1.7 1.1-1.7 2.3v4.4H10V9.7h2.5v1.2h.03c.35-.65 1.2-1.4 2.5-1.4 2.7 0 3.2 1.8 3.2 4.1v5Z"/></svg>',
      github: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .8C5.6.8.5 5.9.5 12.3c0 5.1 3.3 9.4 7.9 11 .6.1.8-.3.8-.6v-2.1c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11 11 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.6 7.9-5.9 7.9-11C23.5 5.9 18.4.8 12 .8Z"/></svg>',
      tryhackme: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M10.705 0C7.54 0 4.902 2.285 4.349 5.291a4.525 4.525 0 0 0-4.107 4.5 4.525 4.525 0 0 0 4.52 4.52h6.761a.625.625 0 1 0 0-1.25H4.761a3.273 3.273 0 0 1-3.27-3.27A3.273 3.273 0 0 1 6.59 7.08a.625.625 0 0 0 .7-1.035 4.488 4.488 0 0 0-1.68-.69 5.223 5.223 0 0 1 5.096-4.104 5.221 5.221 0 0 1 5.174 4.57.625.625 0 1 0 1.243-.145A6.47 6.47 0 0 0 10.705 0z"/></svg>',
      medium: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.21 0A4.201 4.201 0 0 0 0 4.21v15.58A4.201 4.201 0 0 0 4.21 24h15.58A4.201 4.201 0 0 0 24 19.79v-1.093a4.2 4.2 0 0 1-.422.02c-2.577 0-4.027-2.146-4.09-4.832-.063-2.697 1.25-4.685 3.189-5.196.469-.237 1.127-.367 1.664-.367h.023c.021 0 .042.002.063.002V4.21A4.201 4.201 0 0 0 20.21 0ZM4.408 5.583h4.165l3.588 8.435 3.59-8.435h3.864v.146l-.019.004c-.705.16-1.063.397-1.063 1.254h-.003l.003 10.274c.06.676.424.885 1.063 1.03l.02.004v.145h-4.923v-.145l.019-.005c.639-.144.994-.353 1.054-1.03V7.267l-4.745 11.15h-.261L6.15 7.569v9.445c0 .857.358 1.094 1.063 1.253l.02.004v.147H4.405v-.147l.019-.004c.705-.16 1.065-.397 1.065-1.253V6.987c0-.857-.358-1.094-1.064-1.254l-.018-.004z"/></svg>',
      x: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z"/></svg>',
      facebook: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12.06C22 6.48 17.52 2 11.94 2S1.88 6.48 1.88 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.42V9.91c0-2.39 1.42-3.71 3.6-3.71 1.04 0 2.13.19 2.13.19v2.34h-1.2c-1.18 0-1.55.73-1.55 1.48v1.78h2.64l-.42 2.91h-2.22V22c4.78-.76 8.44-4.92 8.44-9.94Z"/></svg>',
      instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".75" fill="currentColor" stroke="none"/></svg>',
      youtube: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6z"/></svg>'
    };
    const tail = (u) => { try { return '@' + decodeURIComponent(u.replace(/\/+$/, '').split('/').pop()); } catch { return ''; } };
    const channels = [];
    if (P.email) channels.push({ icon: icons.email, name: 'Email', meta: P.email, href: 'mailto:' + P.email, note: 'Send an email', mail: true });
    if (P.linkedin) channels.push({ icon: icons.linkedin, name: 'LinkedIn', meta: tail(P.linkedin), href: P.linkedin, note: 'Professional profile' });
    if (P.github) channels.push({ icon: icons.github, name: 'GitHub', meta: tail(P.github), href: P.github, note: 'Code and projects' });
    if (P.tryhackme) channels.push({ icon: icons.tryhackme, name: 'TryHackMe', meta: tail(P.tryhackme), href: P.tryhackme, note: 'Security lab progress' });
    if (P.medium) channels.push({ icon: icons.medium, name: 'Medium', meta: tail(P.medium), href: P.medium, note: 'Articles and writeups' });
    if (P.x) channels.push({ icon: icons.x, name: 'X', meta: tail(P.x), href: P.x, note: 'Updates on X' });
    if (P.facebook) channels.push({ icon: icons.facebook, name: 'Facebook', meta: tail(P.facebook), href: P.facebook, note: 'Facebook profile' });
    if (P.instagram) channels.push({ icon: icons.instagram, name: 'Instagram', meta: tail(P.instagram), href: P.instagram, note: 'Instagram profile' });
    if (P.youtube) channels.push({ icon: icons.youtube, name: 'YouTube', meta: tail(P.youtube), href: P.youtube, note: 'YouTube channel' });
    box.innerHTML = '';
    const h = document.createElement('h3');
    h.className = 'mono';
    h.textContent = 'DIRECT CHANNELS';
    box.appendChild(h);
    channels.forEach(c => {
      const a = document.createElement('a');
      a.className = 'contact-link';
      a.href = c.href;
      if (!c.mail) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
      const i = document.createElement('span');
      i.className = 'cl-icon';
      i.setAttribute('aria-hidden', 'true');
      i.innerHTML = c.icon;
      const wrap = document.createElement('div');
      const b = document.createElement('b');
      b.textContent = c.name;
      const m = document.createElement('i');
      m.textContent = c.meta;
      wrap.append(b, m);
      a.append(i, wrap);
      a.setAttribute('aria-label', c.name + ' — ' + c.note + (c.mail ? '' : ' (opens in a new tab)'));
      box.appendChild(a);
    });
    if (!channels.length) {
      const p = document.createElement('p');
      p.className = 'disclosure-note';
      p.textContent = 'No public channels configured yet.';
      box.appendChild(p);
    }
    




    if (P.pgpKey) {
      const det = document.createElement('details');
      det.className = 'pgp-block';
      const sum = document.createElement('summary');
      sum.className = 'mono';
      sum.textContent = 'PGP PUBLIC KEY ▾';
      const wrap = document.createElement('div');
      wrap.className = 'pgp-body';
      if (P.pgpFingerprint) {
        const fp = document.createElement('p');
        fp.className = 'pgp-fp mono';
        fp.textContent = 'FINGERPRINT  ' + P.pgpFingerprint;
        wrap.appendChild(fp);
      }
      const pre = document.createElement('pre');
      pre.className = 'pgp-key mono';
      pre.textContent = P.pgpKey;
      const copy = document.createElement('button');
      copy.type = 'button';
      copy.className = 'btn btn-ghost pgp-copy';
      copy.textContent = 'COPY KEY';
      copy.addEventListener('click', async () => {
        const ok = await copyText(P.pgpKey);
        copy.textContent = ok ? 'COPIED ✓' : 'COPY FAILED';
        copy.classList.toggle('copied', ok);
        setTimeout(() => { copy.textContent = 'COPY KEY'; copy.classList.remove('copied'); }, 2200);
      });
      wrap.append(pre, copy);
      det.append(sum, wrap);
      box.appendChild(det);
    }
  }

  





  function moonPhase(date) {
    const SYNODIC = 29.530588853;
    const NEW_MOON_2000 = Date.UTC(2000, 0, 6, 18, 14) / 86400000;
    const days = (date.getTime() / 86400000) - NEW_MOON_2000;
    let frac = (days % SYNODIC) / SYNODIC;
    if (frac < 0) frac += 1;
    const idx = Math.round(frac * 8) % 8;
    const PHASES = [
      { glyph: '●', name: 'New Moon' },
      { glyph: '◔', name: 'Waxing Crescent' },
      { glyph: '◑', name: 'First Quarter' },
      { glyph: '◕', name: 'Waxing Gibbous' },
      { glyph: '○', name: 'Full Moon' },
      { glyph: '◕', name: 'Waning Gibbous' },
      { glyph: '◐', name: 'Last Quarter' },
      { glyph: '◔', name: 'Waning Crescent' }
    ];
    return PHASES[idx];
  }

   
  function initFooter() {
    const y = $('#year');
    if (y) y.textContent = new Date().getFullYear();

    



    const q = $('#footerQuote');
    if (q) {
      const lines = (D.PROFILE && D.PROFILE.quotes) || [];
      let pick = null;
      if (lines.length) {
        const n = store.get('quoteIdx', -1);
        pick = (n >= 0 && n < lines.length) ? lines[n] : lines[Math.floor(Math.random() * lines.length)];
        store.set('quoteIdx', lines.indexOf(pick));
      } else if (D.PROFILE && D.PROFILE.quote) {
        pick = D.PROFILE.quote;
      }
      if (pick) q.textContent = '“' + pick + '”';
    }

    

    const mp = $('#moonPhase');
    if (mp) {
      const p = moonPhase(new Date());
      const g = document.createElement('span');
      g.className = 'mp-glyph';
      g.setAttribute('aria-hidden', 'true');
      g.textContent = p.glyph;
      mp.textContent = '';
      mp.append(g, document.createTextNode(p.name.toUpperCase() + ' TONIGHT'));
    }

    ['#privacyLink', '#disclosureLink'].forEach(sel => {
      const a = $(sel);
      a && a.addEventListener('click', e => { e.preventDefault(); a.textContent += ' — placeholder'; setTimeout(() => { a.textContent = a.textContent.replace(' — placeholder', ''); }, 1200); });
    });
  }

  








  function buildScrollMinimap() {
    const strip = $('#scrollProgress'), host = $('#scrollTicks');
    if (!strip || !host) return;
    const sections = $$('section[id]');
    const total = document.documentElement.scrollHeight - innerHeight;
    if (total <= 0) { host.innerHTML = ''; return; }
    host.innerHTML = '';
    sections.forEach(s => {
      const pct = Math.min(100, Math.max(0, (s.offsetTop / total) * 100));
      const t = document.createElement('div');
      t.className = 'sp-tick';
      t.style.top = pct + '%';
      t.dataset.at = s.id;
      host.appendChild(t);
    });
  }

  







  function initPortraitMedia() {
    const imgs = $$('#heroPortrait, #aboutPortrait');
    if (!imgs.length) return;
     
    const av = D.PROFILE && D.PROFILE.avatar;
    if (av) imgs.forEach(img => { if (img.getAttribute('src') !== av) img.src = av; });
    

    const check = async () => {
      const img = imgs[0];
      if (!img || img.tagName !== 'IMG' || !img.complete || !img.naturalWidth) return;
      const cv = document.createElement('canvas');
      cv.width = 64; cv.height = 36;
      const cx = cv.getContext('2d', { willReadFrequently: true });
      const sig = () => { cx.drawImage(img, 0, 0, 64, 36); const d = cx.getImageData(0, 0, 64, 36).data; let s = 0; for (let i = 0; i < d.length; i += 7) s += d[i]; return s; };
      const a = sig(); await new Promise(r => setTimeout(r, 800));
      const b = sig(); await new Promise(r => setTimeout(r, 800));
      const c = sig();
      if (!(a === b && b === c)) return;  
      imgs.forEach(old => {
        const v = document.createElement('video');
        v.muted = true; v.loop = true; v.autoplay = true;
        v.setAttribute('playsinline', '');
        v.className = old.className;
        v.setAttribute('aria-label', old.alt);
        ['assets/elias-motion.webm', 'assets/elias-motion.mp4'].forEach(src => {
          const s = document.createElement('source');
          s.src = src; s.type = src.endsWith('.webm') ? 'video/webm' : 'video/mp4';
          v.appendChild(s);
        });
        old.replaceWith(v);
        v.play().catch(() => {});
      });
    };
    const arm = () => setTimeout(check, 1200);
    if (document.readyState === 'complete') arm();
    else addEventListener('load', arm, { once: true });
  }

  















  function initEasterEggs() {
    const bat = [
      '  ,      ,',
      '  |\\    /|',
      '  |  \\/  |',
      ' ,\'  ¦¦  `.',
      ' ¦¦  ¦¦  ¦¦   N I G H T F A L L',
      '  \\  ¦¦  /    vanilla HTML/CSS/JS — no frameworks, no trackers',
      '   \\ __ /     view source. that is the point.',
      '    \\/\\/      github.com/saikot0x'
    ].join('\n');
    console.log('%c' + bat, 'color:#E63958;font-family:monospace;font-size:11px;line-height:1.35');

    const SEQ = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    let pos = 0;
    document.addEventListener('keydown', e => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      pos = (key === SEQ[pos]) ? pos + 1 : (key === SEQ[0] ? 1 : 0);
      if (pos < SEQ.length) return;
      pos = 0;
      const on = document.body.classList.toggle('blood-moon');
      store.set('bloodMoon', on);
      const themeBtn = $('#themeBtn');
      themeBtn && themeBtn.setAttribute('aria-pressed', String(on));
      spawnBatFrenzy();
    });
  }

  


  function spawnBatFrenzy() {
    const field = $('#batField');
    if (!field || state.reduced) return;
    const count = state.perf ? 2 : 8;
    const spawned = [];
    for (let i = 0; i < count; i++) {
      const b = document.createElement('div');
      b.className = 'bat' + (i % 2 ? ' light' : '');
      const size = 16 + Math.random() * 20;
      b.innerHTML = BAT_SVG.replace('W', Math.round(size)).replace('H', Math.round(size * 0.45));
      b.style.opacity = 0.3 + Math.random() * 0.3;
      const dur = 6 + Math.random() * 5;
      const anim = b.animate([
        { transform: `translate(${-10 + Math.random() * 20}vw, ${15 + Math.random() * 55}vh) rotate(0deg)` },
        { transform: `translate(55vw, ${8 + Math.random() * 50}vh) rotate(5deg)`, offset: 0.5 },
        { transform: `translate(115vw, ${18 + Math.random() * 45}vh) rotate(-4deg)` }
      ], { duration: dur * 1000, delay: i * 220, easing: 'ease-in-out' });
      field.appendChild(b);
      spawned.push({ b, anim });
    }
    const last = spawned[spawned.length - 1];
    const cleanup = () => spawned.forEach(({ b }) => b.remove());
    last.anim.onfinish = cleanup;
    setTimeout(cleanup, 14000);  
  }

   
  document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('no-scroll');
    initNav();
    initToggles();
    initPortraitMedia();
    renderAbout();
    initBioRedaction();
    renderSkills();
    renderSkillRadar();
    renderProjects();
    renderHunt();
    renderExperience();
    renderCerts();
    initWriteups();
    initScenePrlx();
    renderContactChannels();
    spawnBats();
    initPointerFX();
    initScrollFX();
    initTyped();
    initForm();
    initFooter();
    initModal();
    initEasterEggs();
    initReveal();
    initLoader();
  });
})();
