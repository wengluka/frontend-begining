document.addEventListener('DOMContentLoaded', function () {
  const yearNodes = document.querySelectorAll('[data-year]');
  yearNodes.forEach(function (node) {
    node.textContent = new Date().getFullYear();
  });

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#navbar a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === 'index.html' && href === 'first.html')) {
      link.classList.add('active');
    }
  });

  const themeToggle = document.getElementById('themeToggle');
  const setTheme = function (isDark) {
    document.body.classList.toggle('dark-mode', isDark);
    if (themeToggle) {
      themeToggle.textContent = isDark ? '☀️' : '🌙';
      themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }
    try {
      localStorage.setItem('ugobest-theme', isDark ? 'dark' : 'light');
    } catch (error) {
      console.warn('Theme storage unavailable:', error);
    }
  };

  let storedTheme = 'light';
  try {
    storedTheme = localStorage.getItem('ugobest-theme') || 'light';
  } catch (error) {
    console.warn('Theme storage unavailable:', error);
  }

  const prefersDarkScheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(storedTheme === 'dark' || (storedTheme === 'light' && prefersDarkScheme));

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const nextTheme = !document.body.classList.contains('dark-mode');
      setTheme(nextTheme);
    });
  }

  const slides = document.querySelectorAll('.slide');
  if (slides.length > 1) {
    let activeIndex = 0;

    const showSlide = function (index) {
      slides.forEach(function (slide, slideIndex) {
        slide.classList.toggle('active', slideIndex === index);
      });
    };

    setInterval(function () {
      activeIndex = (activeIndex + 1) % slides.length;
      showSlide(activeIndex);
    }, 3500);
  }

  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length) {
    const animateStat = function (element) {
      const target = Number(element.dataset.target || 0);
      const duration = 1400;
      const start = performance.now();

      function updateFrame(timestamp) {
        const progress = Math.min((timestamp - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(target * eased);
        element.textContent = value;

        if (progress < 1) {
          requestAnimationFrame(updateFrame);
        } else {
          element.textContent = target;
        }
      }

      requestAnimationFrame(updateFrame);
    };

    const statsObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateStat(entry.target);
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    statNumbers.forEach(function (item) {
      statsObserver.observe(item);
    });
  }

  const artistCards = document.querySelectorAll('.artist-card, .gallery-item');
  artistCards.forEach(function (card) {
    card.addEventListener('mouseenter', function () {
      card.classList.add('is-hovered');
    });
    card.addEventListener('mouseleave', function () {
      card.classList.remove('is-hovered');
    });
  });

  const galleryImages = document.querySelectorAll('.gallery-item img');
  if (galleryImages.length) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = '<img src="" alt="Expanded artist image"><button type="button" class="close-lightbox" aria-label="Close image">×</button>';
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('img');
    const closeLightbox = lightbox.querySelector('.close-lightbox');

    galleryImages.forEach(function (img) {
      img.addEventListener('click', function () {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('open');
      });
    });

    closeLightbox.addEventListener('click', function () {
      lightbox.classList.remove('open');
    });

    lightbox.addEventListener('click', function (event) {
      if (event.target === lightbox) {
        lightbox.classList.remove('open');
      }
    });
  }

  const registerForm = document.querySelector('.register-form');
  if (registerForm) {
    const showToast = function (message, type) {
      const toast = document.createElement('div');
      toast.className = 'toast ' + type;
      toast.textContent = message;
      document.body.appendChild(toast);

      setTimeout(function () {
        toast.classList.add('show');
      }, 10);

      setTimeout(function () {
        toast.classList.remove('show');
        setTimeout(function () {
          toast.remove();
        }, 400);
      }, 2500);
    };

    registerForm.addEventListener('submit', function (event) {
      const requiredFields = registerForm.querySelectorAll('input[required], select[required], textarea[required]');
      let isValid = true;

      requiredFields.forEach(function (field) {
        if (!field.value || !field.value.trim()) {
          field.classList.add('invalid');
          isValid = false;
        } else {
          field.classList.remove('invalid');
        }
      });

      if (!isValid) {
        event.preventDefault();
        showToast('Please complete all required fields correctly.', 'error');
        return;
      }

      event.preventDefault();
      showToast('Application submitted successfully. We will be in touch soon!', 'success');
      registerForm.reset();
    });
  }

  const applyButtons = document.querySelectorAll('[data-apply-button]');
  applyButtons.forEach(function (button) {
    button.addEventListener('click', function (event) {
      if (button.tagName.toLowerCase() === 'a') {
        event.preventDefault();
      }
      window.location.href = 'register.html';
    });
  });
});
