(function () {
  'use strict';

  // ---------- Mobile navigation ----------
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');

  function setNav(open) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('.sr-only').textContent = open ? 'Close menu' : 'Open menu';
    nav.classList.toggle('is-open', open);
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setNav(toggle.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setNav(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        setNav(false);
        toggle.focus();
      }
    });
    window.matchMedia('(min-width: 861px)').addEventListener('change', function (mq) {
      if (mq.matches) setNav(false);
    });
  }

  // ---------- Header shadow on scroll ----------
  var header = document.querySelector('.site-header');
  function onScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  if (header) {
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ---------- Reveal on scroll ----------
  // Only elements that start below the fold are hidden, so nothing already
  // on screen flickers and the page stays readable if this script fails.
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reduceMotion) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    document.querySelectorAll('.reveal').forEach(function (el) {
      if (el.getBoundingClientRect().top > window.innerHeight) {
        el.classList.add('is-pending');
        observer.observe(el);
      }
    });
  }

  // ---------- Contact form ----------
  // Without a backend, the form opens the visitor's email app with the
  // enquiry pre-filled. See README.md for switching to a form service.
  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var invalid = [];
      form.querySelectorAll('[required]').forEach(function (input) {
        var ok = input.checkValidity();
        input.closest('.field').classList.toggle('has-error', !ok);
        input.setAttribute('aria-invalid', String(!ok));
        if (!ok) invalid.push(input);
      });

      if (invalid.length) {
        status.textContent = 'Please fill in your name, a valid email address and a message.';
        status.classList.add('is-error');
        invalid[0].focus();
        return;
      }

      var data = new FormData(form);
      var name = data.get('name').trim();
      var company = (data.get('company') || '').trim();
      var interest = data.get('interest');

      var subject = 'Website enquiry: ' + interest + ' (' + (company || name) + ')';
      var body = [
        'Name: ' + name,
        'Email: ' + data.get('email').trim(),
        'Company: ' + (company || '-'),
        'Area of interest: ' + interest,
        '',
        data.get('message').trim()
      ].join('\n');

      window.location.href = 'mailto:' + form.dataset.recipient +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);

      status.classList.remove('is-error');
      status.textContent = 'Thanks! Your email app should open with the message ready to send.';
    });

    form.addEventListener('input', function (e) {
      var field = e.target.closest('.field');
      if (field && field.classList.contains('has-error') && e.target.checkValidity()) {
        field.classList.remove('has-error');
        e.target.setAttribute('aria-invalid', 'false');
      }
    });
  }

  // ---------- Footer year ----------
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
