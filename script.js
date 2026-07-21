  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  navToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.style.display === 'flex';
    mobileMenu.style.display = isOpen ? 'none' : 'flex';
    navToggle.setAttribute('aria-expanded', String(!isOpen));
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => { mobileMenu.style.display = 'none'; });
  });

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  // Animated stat counters
  const counters = document.querySelectorAll('[data-count]');
  const counterIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'), 10);
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 1400;
        const start = performance.now();
        function tick(now){
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target) + suffix;
          if(progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        counterIO.unobserve(el);
      }
    });
  }, { threshold: 0.4 });
  counters.forEach(el => counterIO.observe(el));

  // Header background on scroll
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 20 ? '0 4px 20px rgba(0,0,0,0.25)' : 'none';
  });

  // Form handling (front-end only demo)
  const form = document.getElementById('quoteForm');
  const status = document.getElementById('formStatus');
  const toast = document.getElementById('toast');

  function showToast(msg){
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3600);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const required = form.querySelectorAll('[required]');
    let valid = true;
    required.forEach(field => {
      if(!field.value.trim()){
        valid = false;
        field.style.borderColor = '#C0392B';
      } else {
        field.style.borderColor = '';
      }
    });
    if(!valid){
      status.textContent = 'Please fill in all required fields.';
      return;
    }
    status.textContent = 'Sending request…';
    setTimeout(() => {
      status.textContent = 'Request received — we will follow up within 1 business day.';
      showToast('Quote request submitted. Thank you.');
      form.reset();
    }, 700);
  });