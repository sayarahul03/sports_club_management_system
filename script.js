/**
 * RAHUL SPORTS CLUB - MASTER JAVASCRIPT
 * Pure Vanilla JavaScript implementation with zero dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initStickyHeaderAndScrollTop();
  initStatsCounter();
  initSportsFilterAndModal();
  initGalleryAndLightbox();
  initTestimonialSlider();
  initFormHandling();
});

/* ==========================================================================
   1. NAVIGATION & MOBILE MENU
   ========================================================================== */
function initNavigation() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDrawer = document.getElementById('mobileNavDrawer');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburgerBtn && mobileDrawer) {
    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      hamburgerBtn.classList.toggle('active');
      mobileDrawer.classList.toggle('open');
      document.body.style.overflow = mobileDrawer.classList.contains('open') ? 'hidden' : '';
    });

    // Close when clicking links inside drawer
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('active');
        mobileDrawer.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close when clicking outside drawer
    document.addEventListener('click', (e) => {
      if (mobileDrawer.classList.contains('open') && !mobileDrawer.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        hamburgerBtn.classList.remove('active');
        mobileDrawer.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // Active Nav Link detection
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPath || (currentPath === '' && linkHref === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* ==========================================================================
   2. STICKY HEADER & SCROLL TO TOP
   ========================================================================== */
function initStickyHeaderAndScrollTop() {
  const header = document.querySelector('.site-header');
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    if (header) {
      if (scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    if (scrollTopBtn) {
      if (scrollY > 350) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/* ==========================================================================
   3. ANIMATED STATISTICS COUNTER
   ========================================================================== */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'), 10);
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 1800; // ms
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out cubic formula
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const currentCount = Math.floor(easeOut * target);

          el.innerHTML = `${currentCount}<span>${suffix}</span>`;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            el.innerHTML = `${target}<span>${suffix}</span>`;
          }
        }

        requestAnimationFrame(updateCounter);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  statNumbers.forEach(stat => observer.observe(stat));
}

/* ==========================================================================
   4. SPORTS FILTERING & DETAILS MODAL
   ========================================================================== */
const sportsDatabase = {
  cricket: {
    title: 'Cricket Academy',
    badge: 'Team Sport',
    desc: 'Comprehensive cricket coaching covering batting technique, spin and pace bowling, fielding drills, and tactical game awareness with state-of-the-art turf pitches and video analysis.',
    level: 'Beginner to Professional',
    duration: '3 to 12 Months',
    timing: 'Morning: 6:00 AM - 8:30 AM | Evening: 4:30 PM - 7:00 PM',
    coach: 'Rahul Sharma (Head Cricket Coach, 10+ Yrs Exp)',
    facilities: '3 International Standard Turf Pitches, 4 Astro-turf Net Cages, Bowling Machine',
    gear: 'Full cricket white kit, bat, pads, gloves, helmet, spiked shoes'
  },
  football: {
    title: 'Football Academy',
    badge: 'Team Sport',
    desc: 'European-style football development emphasizing ball mastery, passing accuracy, agility, positioning, set pieces, and competitive match exposure on FIFA-standard turf.',
    level: 'Grassroots, Youth & Elite',
    duration: '3 to 12 Months',
    timing: 'Morning: 6:00 AM - 8:00 AM | Evening: 5:00 PM - 7:30 PM',
    coach: 'Arjun Reddy (Football Coach, 8+ Yrs Exp)',
    facilities: 'FIFA Standard 11v11 Natural Turf, 7v7 Floodlit Turf Arena, Agility Conditioning Track',
    gear: 'Studded football boots, shin guards, academy jersey & training bib'
  },
  basketball: {
    title: 'Basketball Program',
    badge: 'Team Sport',
    desc: 'Fast-paced basketball coaching focusing on dribbling under pressure, shooting mechanics, pick-and-roll execution, defensive rebounding, and competitive league matches.',
    level: 'Novice to Advanced',
    duration: '3 to 6 Months',
    timing: 'Morning: 6:30 AM - 8:30 AM | Evening: 5:30 PM - 8:00 PM',
    coach: 'David Miller (Basketball Head Coach, 8+ Yrs Exp)',
    facilities: '2 FIBA-Compliant Maple Wood Indoor Courts with Glass Backboards',
    gear: 'Basketball high-traction court shoes, compression wear, sweatbands'
  },
  badminton: {
    title: 'Badminton Academy',
    badge: 'Individual Sport',
    desc: 'High-performance badminton training covering fast footwork drills, jump smashes, drop shots, deception techniques, and singles/doubles game strategies.',
    level: 'All Skill Levels',
    duration: '3 to 12 Months',
    timing: 'Morning: 5:30 AM - 8:30 AM | Evening: 4:00 PM - 9:00 PM',
    coach: 'Priya Kumar (Badminton Coach, 7+ Yrs Exp)',
    facilities: '6 BWF Approved Synthetic Badminton Courts with Anti-Glare Lighting',
    gear: 'Non-marking gum-sole badminton shoes, graphite racket, academy kit'
  },
  tennis: {
    title: 'Lawn Tennis Academy',
    badge: 'Individual Sport',
    desc: 'Master the baseline topspin, serve speeds, volleys, and strategic court positioning on premium synthetic and clay courts with certified ATP-guided coaching.',
    level: 'Junior, Amateur & Elite',
    duration: '3 to 12 Months',
    timing: 'Morning: 6:00 AM - 9:00 AM | Evening: 4:30 PM - 7:30 PM',
    coach: 'Rohan Verma (Lawn Tennis Coach, 8+ Yrs Exp)',
    facilities: '4 Floodlit Acrylic Hard Courts, 2 Red Clay Courts, Ball Launcher',
    gear: 'Tennis racket, hard court tennis shoes, tennis balls & athletic apparel'
  },
  volleyball: {
    title: 'Volleyball Club',
    badge: 'Team Sport',
    desc: 'Specialized coaching for setting, spike power, blocking coordination, libero defense, and team rotation communication on championship sand and hard courts.',
    level: 'Beginner to Advanced',
    duration: '3 to 6 Months',
    timing: 'Evening: 5:00 PM - 7:30 PM',
    coach: 'Vikramjit Sahota (Volleyball Head Coach, 8+ Yrs Exp)',
    facilities: '2 Regulation Indoor Hard Courts, 1 Professional Sand Beach Volleyball Court',
    gear: 'Court shoes with grip, knee pads, breathable sports vest'
  },
  athletics: {
    title: 'Athletics & Track',
    badge: 'Individual Sport',
    desc: 'Track and field development for sprinting, hurdles, long jump, endurance relays, biomechanics optimization, speed acceleration, and stamina building.',
    level: 'All Age Groups',
    duration: 'Ongoing / 6 Months',
    timing: 'Morning: 5:30 AM - 7:30 AM | Evening: 5:00 PM - 7:00 PM',
    coach: 'Sunita Mehra (Athletics & Track Coach, 8+ Yrs Exp)',
    facilities: '400m 8-Lane Synthetic Tartan Track, High Jump & Long Jump Pits',
    gear: 'Spike shoes / running trainers, athletic hydration pack, stopwatch'
  },
  swimming: {
    title: 'Swimming Academy',
    badge: 'Individual Sport',
    desc: 'Comprehensive swimming coaching from foundational water safety and stroke mechanics (Freestyle, Backstroke, Breaststroke, Butterfly) to competitive race pacing.',
    level: 'Learn to Swim to Elite Racing',
    duration: '1 to 6 Months',
    timing: 'Morning: 6:00 AM - 9:00 AM | Evening: 4:00 PM - 8:00 PM',
    coach: 'Ananya Sen (Swimming Coach, 8+ Yrs Exp)',
    facilities: '50m 8-Lane Heated Olympic Pool, 25m Warm-up Pool, Ozone Purified',
    gear: 'Competition swimsuit, anti-fog goggles, silicone swim cap, kickboard'
  },
  fitness: {
    title: 'Strength & Conditioning',
    badge: 'Fitness Program',
    desc: 'Sports-specific functional strength, explosive power, cardiovascular endurance, injury prevention protocols, and hypertrophy conditioning for athletes.',
    level: 'Youth Athletes to Adults',
    duration: 'Monthly / Quarterly / Annual',
    timing: 'Continuous 5:30 AM - 10:00 PM (Flexible Batches)',
    coach: 'Vikram Singh (Strength and Conditioning Coach, 9+ Yrs Exp)',
    facilities: '5,000 sq.ft. High-Performance Strength Lab, Olympic Barbells, Rig Cages',
    gear: 'Flat lifting shoes / trainers, gym towel, weight belt, shaker bottle'
  },
  yoga: {
    title: 'Yoga & Athletic Mobility',
    badge: 'Fitness Program',
    desc: 'Enhance joint mobility, flexibility, breathing capacity, core stability, mental calmness, and rapid muscular recovery tailored for high-intensity athletes.',
    level: 'All Skill Levels',
    duration: 'Monthly / Ongoing',
    timing: 'Morning: 6:00 AM - 7:30 AM | Evening: 6:30 PM - 7:30 PM',
    coach: 'Master K. Ramachandran (Certified Yoga Acharya)',
    facilities: 'Peaceful Outdoor Zen Garden Pavilion & Climate-Controlled Studio',
    gear: 'Yoga mat, yoga strap/block, breathable stretch wear'
  }
};

function initSportsFilterAndModal() {
  const filterBtns = document.querySelectorAll('[data-filter]');
  const sportCards = document.querySelectorAll('.sport-card');
  const modal = document.getElementById('sportDetailsModal');

  // Filter functionality
  if (filterBtns.length && sportCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        sportCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filterValue === 'all' || category.includes(filterValue)) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 10);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(15px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 250);
          }
        });
      });
    });
  }

  // Sports Modal functionality
  if (modal) {
    const modalTitle = document.getElementById('modalSportTitle');
    const modalBody = document.getElementById('modalSportBody');
    const modalCloseBtn = modal.querySelector('.modal-close-btn');

    document.querySelectorAll('[data-sport-details]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const sportKey = btn.getAttribute('data-sport-details');
        const data = sportsDatabase[sportKey];

        if (data) {
          modalTitle.textContent = data.title;
          modalBody.innerHTML = `
            <div style="margin-bottom: 1.25rem;">
              <span class="section-tag" style="margin-bottom: 0.5rem;">${data.badge}</span>
              <p style="color: var(--text-secondary); margin-top: 0.5rem; line-height: 1.7;">${data.desc}</p>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1.5rem; background: #0b111e; padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
              <div>
                <strong style="color: var(--text-muted); font-size: 0.8rem; text-transform: uppercase;">Training Level:</strong>
                <p style="color: #fff; font-weight: 600;">${data.level}</p>
              </div>
              <div>
                <strong style="color: var(--text-muted); font-size: 0.8rem; text-transform: uppercase;">Duration:</strong>
                <p style="color: #fff; font-weight: 600;">${data.duration}</p>
              </div>
              <div>
                <strong style="color: var(--text-muted); font-size: 0.8rem; text-transform: uppercase;">Lead Coach:</strong>
                <p style="color: var(--primary); font-weight: 600;">${data.coach}</p>
              </div>
            </div>

            <div style="margin-bottom: 1.25rem;">
              <h4 style="font-size: 1.05rem; margin-bottom: 0.4rem; color: #fff;">⏰ Batch Timings</h4>
              <p style="color: var(--text-secondary); font-size: 0.92rem;">${data.timing}</p>
            </div>

            <div style="margin-bottom: 1.25rem;">
              <h4 style="font-size: 1.05rem; margin-bottom: 0.4rem; color: #fff;">🏟️ Training Facility</h4>
              <p style="color: var(--text-secondary); font-size: 0.92rem;">${data.facilities}</p>
            </div>

            <div style="margin-bottom: 1.75rem;">
              <h4 style="font-size: 1.05rem; margin-bottom: 0.4rem; color: #fff;">🎽 Recommended Gear</h4>
              <p style="color: var(--text-secondary); font-size: 0.92rem;">${data.gear}</p>
            </div>

            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
              <a href="contact.html?sport=${encodeURIComponent(sportKey)}" class="btn btn-primary" style="flex: 1; text-align: center;">Register For This Sport</a>
              <button type="button" class="btn btn-secondary modal-close-action" style="flex: 1;">Close Details</button>
            </div>
          `;

          modal.classList.add('active');
          document.body.style.overflow = 'hidden';

          modal.querySelector('.modal-close-action')?.addEventListener('click', () => {
            closeSportModal();
          });
        }
      });
    });

    const closeSportModal = () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', closeSportModal);
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeSportModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeSportModal();
      }
    });
  }
}

/* ==========================================================================
   5. GALLERY CATEGORY FILTER & INTERACTIVE LIGHTBOX
   ========================================================================== */
function initGalleryAndLightbox() {
  const galleryFilterBtns = document.querySelectorAll('[data-gallery-filter]');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('galleryLightbox');

  if (!galleryItems.length) return;

  // Filter items
  if (galleryFilterBtns.length) {
    galleryFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        galleryFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-gallery-filter');

        galleryItems.forEach(item => {
          const category = item.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 10);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 250);
          }
        });
      });
    });
  }

  // Lightbox Implementation
  if (lightbox) {
    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const lightboxTitle = lightbox.querySelector('.lightbox-caption-title');
    const lightboxCounter = lightbox.querySelector('.lightbox-counter');
    const closeBtn = lightbox.querySelector('.lightbox-close-btn');
    const prevBtn = lightbox.querySelector('.lightbox-prev-btn');
    const nextBtn = lightbox.querySelector('.lightbox-next-btn');

    let visibleGallery = [];
    let currentIndex = 0;

    const updateVisibleGallery = () => {
      visibleGallery = Array.from(document.querySelectorAll('.gallery-item')).filter(
        item => item.style.display !== 'none'
      );
    };

    const showLightboxIndex = (index) => {
      if (!visibleGallery.length) return;
      if (index < 0) index = visibleGallery.length - 1;
      if (index >= visibleGallery.length) index = 0;

      currentIndex = index;
      const targetItem = visibleGallery[currentIndex];
      const img = targetItem.querySelector('img');
      const title = targetItem.querySelector('h4')?.textContent || 'Sports Academy Activity';
      const category = targetItem.querySelector('span')?.textContent || 'Rahul Sports Club';

      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxTitle.textContent = `${title} (${category})`;
      lightboxCounter.textContent = `Image ${currentIndex + 1} of ${visibleGallery.length}`;

      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    };

    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        updateVisibleGallery();
        const index = visibleGallery.indexOf(item);
        if (index !== -1) {
          showLightboxIndex(index);
        }
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', () => showLightboxIndex(currentIndex - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => showLightboxIndex(currentIndex + 1));

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox-content-wrapper')) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showLightboxIndex(currentIndex - 1);
      if (e.key === 'ArrowRight') showLightboxIndex(currentIndex + 1);
    });
  }
}

/* ==========================================================================
   6. TESTIMONIAL SLIDER / CAROUSEL
   ========================================================================== */
function initTestimonialSlider() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.carousel-dot');
  const container = document.querySelector('.testimonial-carousel');

  if (!slides.length) return;

  let currentSlide = 0;
  let autoPlayTimer = null;

  function showSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;

    currentSlide = index;

    slides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === currentSlide);
    });

    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentSlide);
    });
  }

  function startAutoPlay() {
    stopAutoPlay();
    autoPlayTimer = setInterval(() => {
      showSlide(currentSlide + 1);
    }, 5500);
  }

  function stopAutoPlay() {
    if (autoPlayTimer) clearInterval(autoPlayTimer);
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      showSlide(idx);
      startAutoPlay();
    });
  });

  if (container) {
    container.addEventListener('mouseenter', stopAutoPlay);
    container.addEventListener('mouseleave', startAutoPlay);
  }

  showSlide(0);
  startAutoPlay();
}

/* ==========================================================================
   7. FORM HANDLING & VALIDATION & TOAST
   ========================================================================== */
function initFormHandling() {
  // Tab switching for Contact vs Registration
  const tabBtns = document.querySelectorAll('.tab-btn');
  const formPanels = document.querySelectorAll('.form-panel');

  if (tabBtns.length && formPanels.length) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        formPanels.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const targetTab = btn.getAttribute('data-tab');
        const targetPanel = document.getElementById(targetTab);
        if (targetPanel) targetPanel.classList.add('active');
      });
    });

    // Auto-select registration tab if URL parameter specifies a sport
    const urlParams = new URLSearchParams(window.location.search);
    const sportParam = urlParams.get('sport');
    if (sportParam) {
      const regTabBtn = document.querySelector('[data-tab="registrationPanel"]');
      if (regTabBtn) regTabBtn.click();

      const sportSelect = document.getElementById('regSport');
      if (sportSelect) {
        sportSelect.value = sportParam;
      }
    }
  }

  // Registration Form Validation & Submission
  const regForm = document.getElementById('registrationForm');
  if (regForm) {
    regForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (validateForm(regForm)) {
        const studentName = regForm.querySelector('#regName').value.trim();
        const selectedSport = regForm.querySelector('#regSport').value;
        const experience = regForm.querySelector('#regExperience').value;
        
        showSuccessConfirmationModal({
          title: 'Registration Submitted Successfully! 🎉',
          message: `Congratulations <strong>${studentName}</strong>! Your registration request for <strong>${selectedSport.toUpperCase()} (${experience})</strong> has been received. Our coaching coordinator will contact you within 24 hours to schedule your fitness assessment & trial session.`,
          bookingId: 'RSC-' + Math.floor(100000 + Math.random() * 900000)
        });

        showToast('Registration Successful', 'Welcome to Rahul Sports Club! Check your phone/email for trial details.', 'success');
        regForm.reset();
      }
    });
  }

  // Contact Form Validation & Submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (validateForm(contactForm)) {
        const senderName = contactForm.querySelector('#contactName').value.trim();
        
        showToast('Message Sent!', `Thank you ${senderName}, our sports desk has received your inquiry and will reply shortly.`, 'success');
        contactForm.reset();
      }
    });
  }
}

function validateForm(form) {
  let isValid = true;
  const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');

  inputs.forEach(input => {
    const errorMsg = input.parentElement.querySelector('.form-error-msg');
    let fieldValid = true;
    const value = input.value.trim();

    if (!value) {
      fieldValid = false;
      if (errorMsg) errorMsg.textContent = 'This field is required.';
    } else if (input.type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        fieldValid = false;
        if (errorMsg) errorMsg.textContent = 'Please enter a valid email address.';
      }
    } else if (input.type === 'tel') {
      const phoneRegex = /^[0-9+\-\s()]{7,15}$/;
      if (!phoneRegex.test(value)) {
        fieldValid = false;
        if (errorMsg) errorMsg.textContent = 'Please enter a valid phone number.';
      }
    } else if (input.id === 'regAge') {
      const age = parseInt(value, 10);
      if (isNaN(age) || age < 4 || age > 75) {
        fieldValid = false;
        if (errorMsg) errorMsg.textContent = 'Age must be between 4 and 75.';
      }
    }

    if (!fieldValid) {
      input.classList.add('error');
      if (errorMsg) errorMsg.classList.add('visible');
      isValid = false;
    } else {
      input.classList.remove('error');
      if (errorMsg) errorMsg.classList.remove('visible');
    }

    // Clear error on input
    input.addEventListener('input', () => {
      input.classList.remove('error');
      if (errorMsg) errorMsg.classList.remove('visible');
    }, { once: true });
  });

  return isValid;
}

/* --- Toast Notification System --- */
function showToast(title, message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <div class="toast-icon">${type === 'success' ? '✅' : '⚠️'}</div>
    <div class="toast-content">
      <h5>${title}</h5>
      <p>${message}</p>
    </div>
  `;

  container.appendChild(toast);

  // Trigger animation
  setTimeout(() => toast.classList.add('show'), 20);

  // Auto remove
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 4500);
}

/* --- Success Confirmation Modal --- */
function showSuccessConfirmationModal({ title, message, bookingId }) {
  let modal = document.getElementById('confirmationModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'confirmationModal';
    modal.className = 'app-modal';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-dialog" style="max-width: 520px; text-align: center; padding: 2.5rem 2rem;">
      <div style="width: 70px; height: 70px; border-radius: 50%; background: rgba(16, 185, 129, 0.15); border: 2px solid var(--accent-green); color: var(--accent-green); font-size: 2.2rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem auto;">✓</div>
      <h3 style="font-size: 1.5rem; margin-bottom: 0.75rem; color: #fff;">${title}</h3>
      <p style="color: var(--text-secondary); margin-bottom: 1.5rem; line-height: 1.6;">${message}</p>
      
      <div style="background: #0d131f; padding: 1rem; border-radius: var(--radius-md); border: 1px dashed var(--primary); margin-bottom: 2rem;">
        <span style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">Application Reference No.</span>
        <h4 style="font-size: 1.4rem; color: var(--primary); letter-spacing: 0.08em; margin-top: 0.2rem;">${bookingId}</h4>
      </div>

      <button type="button" class="btn btn-primary" id="closeConfirmBtn" style="width: 100%;">Done & Return</button>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  const closeBtn = modal.querySelector('#closeConfirmBtn');
  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}
