/* Phillips Haircutting & Barber Shop — shared behavior */

/* ---- mobile nav drawer ------------------------------------------------- */
(function () {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;

  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  links.parentElement.appendChild(overlay); // true sibling of the drawer

  const setMenu = (open) => {
    links.classList.toggle('open', open);
    toggle.classList.toggle('active', open);
    overlay.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };

  toggle.addEventListener('click', () => setMenu(!links.classList.contains('open')));
  overlay.addEventListener('click', () => setMenu(false));
  links.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
})();

/* ---- scroll reveal ----------------------------------------------------- */
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  els.forEach((el) => io.observe(el));
})();

/* ---- gallery filter + lightbox ---------------------------------------- */
(function () {
  const filters = document.querySelectorAll('.filter');
  const items = document.querySelectorAll('.g-item');
  filters.forEach((btn) => btn.addEventListener('click', () => {
    filters.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filter;
    items.forEach((it) => {
      it.style.display = (cat === 'all' || it.dataset.cat === cat) ? '' : 'none';
    });
  }));

  const lb = document.getElementById('lightbox');
  if (!lb) return;
  const lbImg = lb.querySelector('img');
  const close = () => { lb.classList.remove('open'); lbImg.removeAttribute('src'); document.body.style.overflow = ''; };
  items.forEach((it) => it.addEventListener('click', () => {
    const img = it.querySelector('img');
    if (!img) return;
    lbImg.src = img.src;
    lbImg.alt = img.alt || '';
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }));
  lb.addEventListener('click', (e) => { if (e.target === lb || e.target.classList.contains('close')) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
})();

/* ---- contact form (Formspree) ----------------------------------------- */
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;
  const success = document.getElementById('formSuccess');
  const ENDPOINT = form.getAttribute('action') || '';
  const CONFIGURED = ENDPOINT.includes('formspree.io/f/') && !ENDPOINT.includes('YOUR_FORM_ID');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (form.querySelector('.hp') && form.querySelector('.hp').value) return; // honeypot
    if (!CONFIGURED) {
      alert('This message form isn\'t connected yet. For now, please call (502) 933-2161 or book online. (Owner: add your Formspree form ID to enable this form.)');
      return;
    }
    try {
      const res = await fetch(ENDPOINT, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (res.ok) { form.style.display = 'none'; if (success) success.classList.add('show'); }
      else { alert('Something went wrong. Please call (502) 933-2161.'); }
    } catch (err) { alert('Network error. Please call (502) 933-2161.'); }
  });
})();

/* ---- footer year ------------------------------------------------------- */
(function () {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
