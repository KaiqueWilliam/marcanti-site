document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  var backdrop = document.querySelector('.nav-backdrop');

  function closeNav() {
    nav.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (toggle && nav && backdrop) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      backdrop.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    backdrop.addEventListener('click', closeNav);
  }

  // On mobile, tapping a parent link with a submenu opens the submenu first
  document.querySelectorAll('.main-nav > ul > li, .main-nav .sub-menu li').forEach(function (li) {
    var submenu = li.querySelector(':scope > .sub-menu');
    var link = li.querySelector(':scope > a');
    if (!submenu || !link) return;
    link.addEventListener('click', function (e) {
      if (window.innerWidth <= 860) {
        if (!li.classList.contains('sub-open')) {
          e.preventDefault();
          document.querySelectorAll('.main-nav .sub-open').forEach(function (open) {
            if (open !== li) open.classList.remove('sub-open');
          });
          li.classList.add('sub-open');
        }
      }
    });
  });

  // Contact form submission
  var form = document.querySelector('.contact-form');
  if (form) {
    var status = form.querySelector('.form-status');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var honeypot = form.querySelector('.hp-field input');
      if (honeypot && honeypot.value) return; // bot trap

      status.textContent = '';
      status.className = 'form-status';
      btn.disabled = true;
      btn.dataset.original = btn.dataset.original || btn.textContent;
      btn.textContent = form.dataset.sending || 'Sending...';

      fetch(form.getAttribute('action'), {
        method: 'POST',
        body: new FormData(form),
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
      })
        .then(function (r) { return r.json().catch(function () { return { ok: r.ok }; }); })
        .then(function (data) {
          if (data && data.ok) {
            status.textContent = form.dataset.success || 'Message sent successfully!';
            status.classList.add('ok');
            form.reset();
          } else {
            status.textContent = form.dataset.error || 'Something went wrong. Please try again or contact us via WhatsApp.';
            status.classList.add('err');
          }
        })
        .catch(function () {
          status.textContent = form.dataset.error || 'Something went wrong. Please try again or contact us via WhatsApp.';
          status.classList.add('err');
        })
        .finally(function () {
          btn.disabled = false;
          btn.textContent = btn.dataset.original;
        });
    });
  }
});
