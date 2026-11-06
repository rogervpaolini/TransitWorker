(() => {
  const canvas = document.getElementById('matrix-canvas');
  const ctx = canvas && canvas.getContext('2d');
  const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ<>[]{}/*+-=#$%';
  let drops = [];
  function sizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drops = Array.from({ length: Math.ceil(window.innerWidth / 18) }, () => Math.random() * -35);
  }
  function drawRain() {
    if (!canvas || !ctx) return;
    ctx.fillStyle = 'rgba(3,8,6,.12)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#56ff99';
    ctx.font = '12px IBM Plex Mono, monospace';
    drops.forEach((y, i) => {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, i * 18, y * 18);
      drops[i] = y > canvas.height / 18 && Math.random() > .975 ? -10 : y + .55;
    });
    requestAnimationFrame(drawRain);
  }
  sizeCanvas();
  drawRain();
  window.addEventListener('resize', sizeCanvas);

  const clock = document.getElementById('clock');
  function updateClock() {
    if (!clock) return;
    clock.textContent = new Date().toLocaleTimeString('en-GB', { hour12: false });
  }
  updateClock();
  setInterval(updateClock, 1000);

  const navItems = [...document.querySelectorAll('.side-nav .nav-item')];
  const sections = [...document.querySelectorAll('[id]')].filter((el) => ['overview', 'article', 'closing'].includes(el.id));
  if (sections.length && navItems.length) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navItems.forEach((item) => item.classList.toggle('active', item.getAttribute('href') === `#${visible.target.id}`));
    }, { rootMargin: '-22% 0px -62% 0px', threshold: [0.1, 0.35] });
    sections.forEach((section) => observer.observe(section));
  }

  const form = document.getElementById('contact-form');
  const response = document.getElementById('form-response');
  if (form && response) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      response.textContent = 'TRANSMISSION RECEIVED / We will route a reply to your inbox.';
      form.reset();
    });
  }
})();
