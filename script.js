// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
  // Мобильное меню
  initMobileMenu();
  
  // Плавная прокрутка
  initSmoothScroll();
  
  // Активная навигация
  initActiveNavigation();
  
  // Обработка изображений
  initImageHandling();
  
  // Инициализация анимаций
  initAnimations();
});

// Мобильное меню
function initMobileMenu() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navList = document.querySelector('.nav-list');
  
  if (mobileMenuBtn && navList) {
      mobileMenuBtn.addEventListener('click', function() {
          navList.classList.toggle('active');
          const icon = this.querySelector('i');
          
          if (icon.classList.contains('fa-bars')) {
              icon.classList.remove('fa-bars');
              icon.classList.add('fa-times');
          } else {
              icon.classList.remove('fa-times');
              icon.classList.add('fa-bars');
          }
      });
      
      // Закрытие меню при клике на ссылку
      const navLinks = document.querySelectorAll('.nav-link');
      navLinks.forEach(link => {
          link.addEventListener('click', function() {
              navList.classList.remove('active');
              const icon = mobileMenuBtn.querySelector('i');
              icon.classList.remove('fa-times');
              icon.classList.add('fa-bars');
          });
      });
  }
}

// Плавная прокрутка к якорям
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
      link.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
              const headerHeight = document.querySelector('.header').offsetHeight;
              const targetPosition = targetElement.offsetTop - headerHeight - 20;
              
              window.scrollTo({
                  top: targetPosition,
                  behavior: 'smooth'
              });
          }
      });
  });
}

// Активная навигация при скролле
function initActiveNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  function highlightNavigation() {
      const scrollPosition = window.scrollY + 150;
      
      sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          const sectionId = section.getAttribute('id');
          const currentPath = window.location.pathname;
          console.log(currentPath);
          if (currentPath == '/index.html' &&  scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
              navLinks.forEach(link => {
                  link.classList.remove('active');
                  if (link.getAttribute('href') === `#${sectionId}`) {
                      link.classList.add('active');
                  }
              });
          }
      });
      
      // Если вверху страницы, делаем активной первую ссылку
      if (scrollPosition < 300) {
          navLinks.forEach(link => link.classList.remove('active'));
          document.querySelector('.nav-link[href="#main"]')?.classList.add('active');
      }
  }
  
  window.addEventListener('scroll', highlightNavigation);
  highlightNavigation(); // Инициализация при загрузке
}

// Обработка изображений (заглушек)
function initImageHandling() {
  const images = document.querySelectorAll('img');
  
  images.forEach(img => {
      // Если изображение не загрузилось
      img.addEventListener('error', function() {
          if (!this.hasAttribute('data-placeholder-set')) {
              const width = this.width || 400;
              const height = this.height || 300;
              const text = this.alt || 'Изображение';
              const color = this.parentElement.classList.contains('product-image') ? 'FF6B35' : 'CCCCCC';
              
              this.src = `https://via.placeholder.com/${width}x${height}/${color}/FFFFFF?text=${encodeURIComponent(text)}`;
              this.setAttribute('data-placeholder-set', 'true');
          }
      });
  });
}

// Инициализация анимаций
function initAnimations() {
  // Анимация появления элементов при скролле
  const animateOnScroll = function() {
      const elements = document.querySelectorAll('.activity-card, .product-card');
      
      elements.forEach(element => {
          const elementPosition = element.getBoundingClientRect().top;
          const screenPosition = window.innerHeight / 1.2;
          
          if (elementPosition < screenPosition) {
              element.style.opacity = '1';
              element.style.transform = 'translateY(0)';
          }
      });
  };
  
  // Установка начальных стилей для анимации
  const cards = document.querySelectorAll('.activity-card, .product-card');
  cards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  
  // Запуск анимации
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Инициализация при загрузке
  
  // Анимация логотипа при скролле
  const header = document.querySelector('.header');
  const logoIcon = document.querySelector('.logo-icon');
  
  window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
          header.style.padding = '5px 0';
          logoIcon.style.fontSize = '20px';
      } else {
          header.style.padding = '15px 0';
          logoIcon.style.fontSize = '24px';
      }
  });
}

// Отправка формы (заглушка)
function submitContactForm(event) {
  event.preventDefault();
  
  const form = event.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  
  // Имитация отправки
  submitBtn.textContent = 'Отправка...';
  submitBtn.disabled = true;
  
  setTimeout(function() {
      alert('Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.');
      form.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
  }, 1500);
  
  return false;
}

// Для использования в других формах на сайте
window.submitContactForm = submitContactForm;


