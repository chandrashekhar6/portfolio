/* ---- script.js ---- */

// ─── NAVBAR SCROLL ───
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Sticky shadow
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active link highlight
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 90;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ─── HAMBURGER MENU ───
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksContainer.classList.toggle('open');
});

// Close mobile nav on link click
navLinksContainer.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksContainer.classList.remove('open');
  });
});

// ─── TYPEWRITER EFFECT ───
const phrases = [
  'Software Engineer',
  'Python Developer',
  'Data Analyst',
  'Problem Solver',
  'B.Tech CSE Student',
];
let phraseIdx = 0;
let charIdx = 0;
let isDeleting = false;
const typeEl = document.getElementById('typewriter');

function typeWriter() {
  const current = phrases[phraseIdx];
  if (isDeleting) {
    charIdx--;
    typeEl.textContent = current.substring(0, charIdx);
  } else {
    charIdx++;
    typeEl.textContent = current.substring(0, charIdx);
  }

  let speed = isDeleting ? 60 : 110;

  if (!isDeleting && charIdx === current.length) {
    speed = 1800; // pause at end
    isDeleting = true;
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    phraseIdx = (phraseIdx + 1) % phrases.length;
    speed = 400;
  }

  setTimeout(typeWriter, speed);
}
typeWriter();

// ─── SCROLL FADE-IN ANIMATION ───
const animatedEls = document.querySelectorAll(
  '.project-card, .skill-category, .cert-card, .timeline-card, ' +
  '.info-card, .stat-item, .extra-card, .contact-item, ' +
  '.about-text, .about-info-cards, .hero-content, .hero-avatar'
);

animatedEls.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver(
  entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Staggered delay for sibling cards
        const siblings = Array.from(entry.target.parentElement?.children || []);
        const idx = siblings.indexOf(entry.target);
        const delay = Math.min(idx * 80, 400);
        setTimeout(() => entry.target.classList.add('visible'), delay);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

animatedEls.forEach(el => observer.observe(el));

// ─── CONTACT FORM ───
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formNote = document.getElementById('formNote');

form.addEventListener('submit', e => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const subject = document.getElementById('subject').value.trim() || 'Portfolio Contact';

  // Basic validation
  if (!name || !email || !message) {
    formNote.textContent = '⚠️ Please fill in all required fields.';
    formNote.className = 'form-note error';
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    formNote.textContent = '⚠️ Please enter a valid email address.';
    formNote.className = 'form-note error';
    return;
  }

  // Open mailto as fallback (replace with EmailJS for production)
  const mailtoLink = `mailto:chandrasekharpinninti96@gmail.com?subject=${encodeURIComponent(subject + ' — from ' + name)}&body=${encodeURIComponent('From: ' + name + ' (' + email + ')\n\n' + message)}`;
  window.open(mailtoLink, '_blank');

  // Visual feedback
  const btnIcon = submitBtn.querySelector('i');
  const btnText = submitBtn.childNodes[submitBtn.childNodes.length - 1];
  btnIcon.className = 'fas fa-check';
  btnText.textContent = ' Opened in email client';
  submitBtn.disabled = true;

  form.reset();
  formNote.textContent = '✅ Opening your email client…';
  formNote.className = 'form-note success';

  setTimeout(() => {
    submitBtn.disabled = false;
    btnIcon.className = 'fas fa-paper-plane';
    btnText.textContent = ' Send Message';
    formNote.textContent = '';
    formNote.className = 'form-note';
  }, 4000);
});

// ─── DYNAMIC COPYRIGHT YEAR ───
const footerYear = document.getElementById('footerYear');
if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}
