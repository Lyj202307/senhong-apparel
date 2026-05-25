/* Senhong Apparel - Main JS */

// ── Shared nav/footer HTML ────────────────────────────────────────────────
const NAV_HTML = `
<div class="announcement-bar">
  🌍 Global shipping to 150+ countries &nbsp;|&nbsp; ISO 9001 &amp; OEKO-TEX® Certified &nbsp;|&nbsp; <a href="contact.html">Request Free Samples →</a>
</div>
<nav class="site-nav">
  <div class="container">
    <div class="nav-inner">
      <a href="index.html" class="logo">SENHONG<span>.</span></a>
      <ul class="nav-links">
        <li><a href="index.html">Home</a></li>
        <li><a href="products.html">Catalog</a></li>
        <li><a href="custom.html">Custom / OEM</a></li>
        <li><a href="about.html">About Us</a></li>
        <li><a href="size-guide.html">Size Guide</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
      <div class="nav-actions">
        <a href="contact.html" class="btn btn-primary" style="padding:10px 24px;font-size:13px;">Get a Quote</a>
        <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
      </div>
    </div>
  </div>
</nav>
`;

const FOOTER_HTML = `
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <div class="footer-logo">SENHONG<span>.</span></div>
        <p class="footer-about">Since 2010, Senhong Apparel has been crafting premium T-shirts for global brands. OEKO-TEX® certified. Ethically sourced. Delivered worldwide.</p>
        <div class="footer-social">
          <a href="#" class="social-btn"><i class="fab fa-linkedin-in"></i></a>
          <a href="#" class="social-btn"><i class="fab fa-instagram"></i></a>
          <a href="#" class="social-btn"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="social-btn"><i class="fab fa-whatsapp"></i></a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Products</h4>
        <ul>
          <li><a href="products.html">All T-Shirts</a></li>
          <li><a href="products.html#essential">Essential Series</a></li>
          <li><a href="products.html#heavyweight">Heavyweight Series</a></li>
          <li><a href="products.html#oversized">Oversized Series</a></li>
          <li><a href="products.html#organic">Organic Collection</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Services</h4>
        <ul>
          <li><a href="custom.html">OEM / ODM</a></li>
          <li><a href="custom.html#private-label">Private Label</a></li>
          <li><a href="size-guide.html">Size Guide</a></li>
          <li><a href="contact.html">Request Sample</a></li>
          <li><a href="contact.html">Wholesale Account</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Company</h4>
        <ul>
          <li><a href="about.html">Our Factory</a></li>
          <li><a href="about.html#certs">Certifications</a></li>
          <li><a href="about.html#sustainability">Sustainability</a></li>
          <li><a href="contact.html">Contact Us</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 Senhong Apparel Co., Ltd. All rights reserved.</span>
      <div class="footer-badges">
        <span class="footer-badge">OEKO-TEX®</span>
        <span class="footer-badge">ISO 9001</span>
        <span class="footer-badge">BSCI</span>
        <span class="footer-badge">SGS</span>
      </div>
    </div>
  </div>
</footer>
`;

// ── Init ──────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Inject shared nav + footer
  const navPlaceholder = document.getElementById('nav-placeholder');
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (navPlaceholder) navPlaceholder.innerHTML = NAV_HTML;
  if (footerPlaceholder) footerPlaceholder.innerHTML = FOOTER_HTML;

  // Highlight current page nav link
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === currentPage) a.classList.add('active');
  });

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  reveals.forEach(el => io.observe(el));

  // Counter animation
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const cio = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        let start = 0;
        const step = Math.ceil(target / 60);
        const timer = setInterval(() => {
          start = Math.min(start + step, target);
          el.textContent = start.toLocaleString() + suffix;
          if (start >= target) clearInterval(timer);
        }, 25);
        cio.unobserve(el);
      }
    }, { threshold: 0.5 });
    cio.observe(el);
  });

  // FAQ accordion
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const isOpen = answer.classList.contains('open');
      document.querySelectorAll('.faq-a').forEach(a => a.classList.remove('open'));
      document.querySelectorAll('.faq-q span').forEach(s => s.textContent = '+');
      if (!isOpen) {
        answer.classList.add('open');
        btn.querySelector('span').textContent = '−';
      }
    });
  });

  // Mobile menu toggle
  document.addEventListener('click', e => {
    if (e.target.closest('#mobileMenuBtn')) {
      const navLinks = document.querySelector('.nav-links');
      if (navLinks) {
        const isOpen = navLinks.style.display === 'flex';
        navLinks.style.display = isOpen ? '' : 'flex';
        navLinks.style.flexDirection = isOpen ? '' : 'column';
        navLinks.style.position = isOpen ? '' : 'absolute';
        navLinks.style.top = isOpen ? '' : '72px';
        navLinks.style.left = isOpen ? '' : '0';
        navLinks.style.right = isOpen ? '' : '0';
        navLinks.style.background = isOpen ? '' : '#fff';
        navLinks.style.padding = isOpen ? '' : '16px 24px 24px';
        navLinks.style.borderBottom = isOpen ? '' : '1px solid #e2e8f0';
        navLinks.style.zIndex = isOpen ? '' : '999';
      }
    }
  });
});
