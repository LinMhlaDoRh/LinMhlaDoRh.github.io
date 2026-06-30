document.documentElement.classList.add('js');

(function(){
  'use strict';

  var header = document.getElementById('siteHeader');
  var menuToggle = document.getElementById('menuToggle');
  var navMenu = document.getElementById('navMenu');
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav-link'));

  function onScroll(){
    if(!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if(menuToggle && navMenu){
    menuToggle.addEventListener('click', function(){
      var isOpen = navMenu.classList.toggle('is-open');
      menuToggle.classList.toggle('is-open', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  links.forEach(function(link){
    link.addEventListener('click', function(){
      if(navMenu) navMenu.classList.remove('is-open');
      if(menuToggle){
        menuToggle.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  var sections = links.map(function(link){
    return document.querySelector(link.getAttribute('href'));
  }).filter(Boolean);

  if('IntersectionObserver' in window){
    var spy = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          var id = entry.target.getAttribute('id');
          links.forEach(function(link){
            link.classList.toggle('is-active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-44% 0px -48% 0px', threshold: 0.01 });

    sections.forEach(function(section){ spy.observe(section); });

    var revealer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          revealer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(function(el){ revealer.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function(el){ el.classList.add('is-visible'); });
  }

  document.querySelectorAll('.filter-pills button').forEach(function(button){
    button.addEventListener('click', function(){
      document.querySelectorAll('.filter-pills button').forEach(function(item){ item.classList.remove('active'); });
      button.classList.add('active');
    });
  });

  var form = document.getElementById('contactForm');
  var note = document.getElementById('formNote');
  if(form){
    form.addEventListener('submit', function(event){
      event.preventDefault();
      var name = document.getElementById('name').value.trim();
      var email = document.getElementById('email').value.trim();
      var subject = document.getElementById('subject').value.trim();
      var message = document.getElementById('message').value.trim();

      if(!name || !email || !subject || !message){
        if(note) note.textContent = 'Please complete all fields before sending.';
        return;
      }

      var body = [
        'Name: ' + name,
        'Email: ' + email,
        '',
        message
      ].join('\n');

      var mailto = 'mailto:lindamhlangu6@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      if(note) note.textContent = 'Opening your email app now...';
      window.location.href = mailto;
    });
  }

  var year = document.getElementById('year');
  if(year) year.textContent = new Date().getFullYear();
})();
